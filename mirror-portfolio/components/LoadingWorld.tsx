"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AssetSlot } from "./AssetSlot";
import { useAudio } from "./AudioManager";

const ASSETS = {
  loading_bg_loop: "ASSET_URL__REPLACE_ME",
  loading_character: "ASSET_URL__REPLACE_ME",
  ui_decal_1: "ASSET_URL__REPLACE_ME",
  ui_decal_2: "ASSET_URL__REPLACE_ME",
  ui_decal_3: "ASSET_URL__REPLACE_ME",
  ui_decal_4: "ASSET_URL__REPLACE_ME",
  ui_decal_5: "ASSET_URL__REPLACE_ME",
  ui_decal_6: "ASSET_URL__REPLACE_ME"
};

type LoadingWorldProps = {
  onAccess: () => void;
};

export function LoadingWorld({ onAccess }: LoadingWorldProps) {
  const [progress, setProgress] = useState(0.12);
  const { enabled, setEnabled, volume, setVolume, playUiClick, playGateOpen, playAmbientA } = useAudio();

  useEffect(() => {
    playAmbientA();
  }, [playAmbientA]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.07 + Math.random() * 0.12;
        if (next > 0.92) {
          return 0.15;
        }
        return next;
      });
    }, 900);
    return () => window.clearInterval(interval);
  }, []);

  const bootLines = useMemo(
    () => [
      "Boot sequence engaged",
      "Verifying access lattice",
      "Observer channel synced",
      "Signal integrity stable",
      "Waiting for gate input"
    ],
    []
  );

  return (
    <section className="world loading-world">
      <div className="loading-background">
        <AssetSlot label="loading_bg_loop" url={ASSETS.loading_bg_loop} className="background-slot" />
      </div>
      <div className="loading-grid">
        <div className="loading-panel">
          <div className="panel-header">
            <div>
              <h1>Access Monitor</h1>
              <p>Observer channel active</p>
            </div>
            <div className="signal-indicator">
              <span className="signal-dot" />
              <span>Activity detected</span>
            </div>
          </div>
          <div className="status-grid">
            <div className="status-block">
              <h2>System Status</h2>
              <ul>
                {bootLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="status-block">
              <h2>Gate Integrity</h2>
              <div className="meter">
                <div className="meter-bar" style={{ width: `${Math.round(progress * 100)}%` }} />
              </div>
              <div className="meter-values">
                <span>Sync {Math.round(progress * 100)}%</span>
                <span>Threshold 100%</span>
              </div>
              <div className="status-tags">
                <span>Lock channel: armed</span>
                <span>Sector: 07</span>
              </div>
            </div>
          </div>
          <div className="access-gate">
            <div className="gate-core">
              <div className="gate-rings">
                <span />
                <span />
                <span />
              </div>
              <button
                type="button"
                className="gate-trigger"
                onClick={() => {
                  playGateOpen();
                  onAccess();
                }}
                onMouseEnter={playUiClick}
              >
                <span>Access Gate</span>
                <span className="gate-sub">Authorize inversion</span>
              </button>
            </div>
            <div className="gate-footer">
              <div>
                <strong>Clearance:</strong> Pending
              </div>
              <div>
                <strong>Scan:</strong> Live
              </div>
            </div>
          </div>
        </div>
        <div className="loading-side">
          <div className="side-card">
            <h3>Subject Frame</h3>
            <AssetSlot label="loading_character" url={ASSETS.loading_character} height="220px" />
            <p>Subject presence confirmed. Do not disengage view.</p>
          </div>
          <div className="side-card">
            <h3>Sound Control</h3>
            <div className="sound-control">
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(event) => {
                    setEnabled(event.target.checked);
                    playUiClick();
                  }}
                />
                <span>Audio enabled</span>
              </label>
              <label className="slider">
                <span>Volume</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
                />
              </label>
            </div>
            <div className="surveillance-panel">
              <h4>Observer feed</h4>
              <p>Signal strength stable. Monitoring continues.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="loading-decals">
        {Object.entries(ASSETS)
          .filter(([key]) => key.startsWith("ui_decal"))
          .map(([key, url]) => (
            <AssetSlot key={key} label={key} url={url} className="decal" />
          ))}
      </div>
    </section>
  );
}
