"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const AUDIO_PLACEHOLDER = "AUDIO_URL__REPLACE_ME";

type AudioContextValue = {
  unlocked: boolean;
  enabled: boolean;
  volume: number;
  setEnabled: (value: boolean) => void;
  setVolume: (value: number) => void;
  playUiClick: () => void;
  playGateOpen: () => void;
  playGlitchBurst: () => void;
  playAmbientA: () => void;
  playAmbientB: () => void;
};

const AudioContext = createContext<AudioContextValue | null>(null);

const createAudio = (url: string, loop = false) => {
  if (!url || url === AUDIO_PLACEHOLDER) {
    return null;
  }
  const audio = new Audio(url);
  audio.loop = loop;
  audio.preload = "auto";
  return audio;
};

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [volume, setVolume] = useState(0.6);

  const uiClickRef = useRef<HTMLAudioElement | null>(null);
  const gateOpenRef = useRef<HTMLAudioElement | null>(null);
  const glitchRef = useRef<HTMLAudioElement | null>(null);
  const ambientARef = useRef<HTMLAudioElement | null>(null);
  const ambientBRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    uiClickRef.current = createAudio(AUDIO_PLACEHOLDER);
    gateOpenRef.current = createAudio(AUDIO_PLACEHOLDER);
    glitchRef.current = createAudio(AUDIO_PLACEHOLDER);
    ambientARef.current = createAudio(AUDIO_PLACEHOLDER, true);
    ambientBRef.current = createAudio(AUDIO_PLACEHOLDER, true);
  }, []);

  useEffect(() => {
    const handleUnlock = () => {
      setUnlocked(true);
      window.removeEventListener("pointerdown", handleUnlock);
      window.removeEventListener("keydown", handleUnlock);
    };
    window.addEventListener("pointerdown", handleUnlock);
    window.addEventListener("keydown", handleUnlock);
    return () => {
      window.removeEventListener("pointerdown", handleUnlock);
      window.removeEventListener("keydown", handleUnlock);
    };
  }, []);

  useEffect(() => {
    const audios = [uiClickRef.current, gateOpenRef.current, glitchRef.current, ambientARef.current, ambientBRef.current];
    audios.forEach((audio) => {
      if (audio) {
        audio.volume = volume;
      }
    });
  }, [volume]);

  const safePlay = useCallback(
    (audio: HTMLAudioElement | null) => {
      if (!audio || !unlocked || !enabled) {
        return;
      }
      audio.currentTime = 0;
      void audio.play();
    },
    [enabled, unlocked]
  );

  const safeLoop = useCallback(
    (audio: HTMLAudioElement | null) => {
      if (!audio || !unlocked || !enabled) {
        return;
      }
      void audio.play();
    },
    [enabled, unlocked]
  );

  const value = useMemo<AudioContextValue>(
    () => ({
      unlocked,
      enabled,
      volume,
      setEnabled,
      setVolume,
      playUiClick: () => safePlay(uiClickRef.current),
      playGateOpen: () => safePlay(gateOpenRef.current),
      playGlitchBurst: () => safePlay(glitchRef.current),
      playAmbientA: () => safeLoop(ambientARef.current),
      playAmbientB: () => safeLoop(ambientBRef.current)
    }),
    [enabled, safeLoop, safePlay, unlocked, volume]
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
}
