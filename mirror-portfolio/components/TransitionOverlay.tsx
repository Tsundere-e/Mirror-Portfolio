"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { AssetSlot } from "./AssetSlot";

const PLACEHOLDER_URL = "ASSET_URL__REPLACE_ME";

type TransitionOverlayProps = {
  active: boolean;
  onMidpoint: () => void;
  onDone: () => void;
};

export function TransitionOverlay({ active, onMidpoint, onDone }: TransitionOverlayProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const noiseRef = useRef<HTMLDivElement | null>(null);
  const fractureRef = useRef<HTMLDivElement | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const triggeredRef = useRef(false);
  const midpointRef = useRef(false);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!active || triggeredRef.current) {
      return;
    }
    triggeredRef.current = true;
    midpointRef.current = false;
    doneRef.current = false;

    const timeline = gsap.timeline({
      onComplete: () => {
        doneRef.current = true;
        triggeredRef.current = false;
        onDone();
      }
    });

    timeline.set(rootRef.current, { pointerEvents: "auto", opacity: 1 });
    timeline.fromTo(noiseRef.current, { opacity: 0 }, { opacity: 0.85, duration: 0.2 });
    timeline.to(noiseRef.current, { opacity: 0.55, duration: 0.2 });
    timeline.fromTo(fractureRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 }, "<");
    timeline.fromTo(
      sheetRef.current,
      { rotateY: -70, opacity: 0, transformOrigin: "left center" },
      {
        rotateY: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        onUpdate: () => {
          if (!midpointRef.current && timeline.progress() > 0.5) {
            midpointRef.current = true;
            onMidpoint();
          }
        }
      },
      "<"
    );

    timeline.to(rootRef.current, { opacity: 0, duration: 0.25, delay: 0.05 });

    gsap.fromTo(
      rootRef.current,
      { x: 0 },
      { x: 6, duration: 0.08, yoyo: true, repeat: 2, ease: "power1.inOut" }
    );

    return () => {
      timeline.kill();
    };
  }, [active, onDone, onMidpoint]);

  return (
    <div ref={rootRef} className={`transition-overlay ${active ? "is-active" : ""}`} aria-hidden={!active}>
      <div ref={noiseRef} className="transition-noise" />
      <div ref={fractureRef} className="transition-fracture">
        <AssetSlot label="fracture_texture" url={PLACEHOLDER_URL} />
      </div>
      <div ref={sheetRef} className="transition-sheet">
        <div className="sheet-inner">
          <div className="sheet-grid" />
        </div>
      </div>
    </div>
  );
}
