"use client";

import React, { useState } from "react";
import { LoadingWorld } from "./LoadingWorld";
import { InvertedWorld } from "./InvertedWorld";
import { TransitionOverlay } from "./TransitionOverlay";
import { AudioProvider } from "./AudioManager";
import { PROJECTS } from "../data/projects";

export type WorldState = "loading" | "inverted";

export function WorldShell() {
  const [world, setWorld] = useState<WorldState>("loading");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeId, setActiveId] = useState(PROJECTS[0]?.id ?? "");
  const [lockedId, setLockedId] = useState<string | null>(null);

  return (
    <AudioProvider>
      <div className={`world-shell ${world}`} aria-live="polite">
        {world === "loading" && (
          <LoadingWorld
            onAccess={() => {
              if (isTransitioning) {
                return;
              }
              setIsTransitioning(true);
            }}
          />
        )}
        {world === "inverted" && (
          <InvertedWorld
            activeId={activeId}
            lockedId={lockedId}
            onHover={(id) => {
              if (lockedId) {
                return;
              }
              setActiveId(id);
            }}
            onLock={(id) => {
              setActiveId(id);
              setLockedId(id);
            }}
            onUnlock={() => {
              setLockedId(null);
            }}
          />
        )}
        <TransitionOverlay
          active={isTransitioning}
          onMidpoint={() => {
            setWorld("inverted");
          }}
          onDone={() => {
            setIsTransitioning(false);
          }}
        />
      </div>
    </AudioProvider>
  );
}
