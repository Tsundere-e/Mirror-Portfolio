"use client";

import React, { useMemo } from "react";
import { PROJECTS, Project } from "../data/projects";
import { AssetSlot } from "./AssetSlot";
import { useAudio } from "./AudioManager";

const ASSETS = {
  inverted_bg_loop: "ASSET_URL__REPLACE_ME",
  fracture_texture: "ASSET_URL__REPLACE_ME",
  glitch_gif_1: "ASSET_URL__REPLACE_ME",
  glitch_gif_2: "ASSET_URL__REPLACE_ME",
  glitch_gif_3: "ASSET_URL__REPLACE_ME",
  glitch_gif_4: "ASSET_URL__REPLACE_ME",
  blood_gif_1: "ASSET_URL__REPLACE_ME",
  blood_gif_2: "ASSET_URL__REPLACE_ME",
  blood_gif_3: "ASSET_URL__REPLACE_ME"
};

type InvertedWorldProps = {
  activeId: string;
  lockedId: string | null;
  onHover: (id: string) => void;
  onLock: (id: string) => void;
  onUnlock: () => void;
};

export function InvertedWorld({ activeId, lockedId, onHover, onLock, onUnlock }: InvertedWorldProps) {
  const { playUiClick, playGlitchBurst, playAmbientB } = useAudio();

  const activeProject = useMemo<Project>(() => {
    return PROJECTS.find((project) => project.id === activeId) ?? PROJECTS[0];
  }, [activeId]);

  return (
    <section className="world inverted-world">
      <div className="inverted-background">
        <AssetSlot label="inverted_bg_loop" url={ASSETS.inverted_bg_loop} className="background-slot" />
      </div>
      <header className="inverted-header">
        <div>
          <h1>Inverted Archive</h1>
          <p>Shattered feed confirmed. Observer channel locked.</p>
        </div>
        <div className="header-status">
          <span className="header-tag">Signal breach</span>
          <span className="header-tag">Watchline live</span>
          <button
            type="button"
            className="header-action"
            onClick={() => {
              playGlitchBurst();
              onUnlock();
            }}
          >
            Release lock
          </button>
        </div>
      </header>
      <div className="inverted-shell">
        <aside className="inverted-nav">
          <div className="nav-header">
            <h2>Subject list</h2>
            <span>Tracking {PROJECTS.length}</span>
          </div>
          <ul>
            {PROJECTS.map((project) => (
              <li key={project.id}>
                <button
                  type="button"
                  className={project.id === activeId ? "is-active" : ""}
                  onMouseEnter={() => onHover(project.id)}
                  onFocus={() => onHover(project.id)}
                  onClick={() => {
                    playUiClick();
                    onLock(project.id);
                  }}
                >
                  <span>{project.title}</span>
                  <span className="nav-year">{project.year}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="nav-footer">
            <p>Observer channel: persistent</p>
            <p>Audio response: manual</p>
          </div>
        </aside>
        <main className="inverted-grid">
          <div className="grid-header">
            <h2>Fractured projects</h2>
            <p>Hover to preview. Click to lock focus.</p>
          </div>
          <div className="grid">
            {PROJECTS.map((project) => (
              <button
                key={project.id}
                type="button"
                className={`grid-card ${project.id === activeId ? "is-active" : ""}`}
                onMouseEnter={() => onHover(project.id)}
                onFocus={() => onHover(project.id)}
                onClick={() => {
                  playUiClick();
                  onLock(project.id);
                }}
              >
                <AssetSlot label="thumb" url="ASSET_URL__REPLACE_ME" height="120px" />
                <div className="grid-card-info">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.shortHook}</p>
                  </div>
                  <span className="grid-year">{project.year}</span>
                </div>
                <div className="grid-tags">
                  {project.tags.map((tag) => (
                    <span key={`${project.id}-${tag}`}>{tag}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </main>
        <aside className="inverted-details">
          <div className="details-header">
            <div>
              <h2>{activeProject.title}</h2>
              <p>{activeProject.shortHook}</p>
            </div>
            <div className="details-lock">
              <span>{lockedId ? "Locked" : "Live"}</span>
            </div>
          </div>
          <div className="details-media">
            <AssetSlot label="showcase" url="ASSET_URL__REPLACE_ME" height="180px" />
            <div className="details-gifs">
              {activeProject.mediaSlots
                .filter((slot) => slot.startsWith("gif"))
                .map((slot) => (
                  <AssetSlot key={slot} label={slot} url="ASSET_URL__REPLACE_ME" height="72px" />
                ))}
            </div>
          </div>
          <ul className="details-list">
            {activeProject.descriptionBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <div className="details-links">
            <a href={activeProject.links.demoUrl ?? "ASSET_URL__REPLACE_ME"}>Live demo</a>
            <a href={activeProject.links.codeUrl ?? "ASSET_URL__REPLACE_ME"}>Source code</a>
          </div>
          <div className="details-surveillance">
            <div>
              <span>Observer frequency</span>
              <strong>Stable</strong>
            </div>
            <div>
              <span>Threat index</span>
              <strong>Elevated</strong>
            </div>
          </div>
        </aside>
      </div>
      <div className="inverted-decals">
        <AssetSlot label="fracture_texture" url={ASSETS.fracture_texture} className="decal" />
        <div className="decal-row">
          {Object.entries(ASSETS)
            .filter(([key]) => key.startsWith("glitch_gif"))
            .map(([key, url]) => (
              <AssetSlot key={key} label={key} url={url} className="decal" />
            ))}
        </div>
        <div className="decal-row">
          {Object.entries(ASSETS)
            .filter(([key]) => key.startsWith("blood_gif"))
            .map(([key, url]) => (
              <AssetSlot key={key} label={key} url={url} className="decal" />
            ))}
        </div>
      </div>
      <button
        type="button"
        className="ambient-trigger"
        onClick={() => {
          playAmbientB();
        }}
      >
        Start ambient channel
      </button>
    </section>
  );
}
