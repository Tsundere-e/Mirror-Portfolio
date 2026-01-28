export type Project = {
  id: string;
  title: string;
  year: string;
  tags: string[];
  shortHook: string;
  descriptionBullets: string[];
  mediaSlots: string[];
  links: { demoUrl?: string; codeUrl?: string };
};

export const PROJECTS: Project[] = [
  {
    id: "signal-vault",
    title: "Signal Vault",
    year: "2024",
    tags: ["UI", "Simulation", "Systems"],
    shortHook: "A monitored archive where signals are sorted by threat level.",
    descriptionBullets: [
      "Built layered panels with live status feedback.",
      "Encoded threat tiers into color and motion cues.",
      "Designed quick-scan controls for rapid review."
    ],
    mediaSlots: ["thumb", "showcase", "gif1", "gif2"],
    links: { demoUrl: "ASSET_URL__REPLACE_ME", codeUrl: "ASSET_URL__REPLACE_ME" }
  },
  {
    id: "gate-sentinel",
    title: "Gate Sentinel",
    year: "2023",
    tags: ["Interactive", "UX", "Control"],
    shortHook: "A lock interface that reacts to unauthorized presence.",
    descriptionBullets: [
      "Prototyped tactile controls for access clearance.",
      "Implemented alert escalation sequences.",
      "Balanced readability with tension."
    ],
    mediaSlots: ["thumb", "showcase", "gif1"],
    links: { demoUrl: "ASSET_URL__REPLACE_ME" }
  },
  {
    id: "fracture-grid",
    title: "Fracture Grid",
    year: "2024",
    tags: ["Visual", "Glitch", "Grid"],
    shortHook: "A grid that distorts when the observer draws near.",
    descriptionBullets: [
      "Mapped grid states to faux signal corruption.",
      "Layered texture slots for fracture overlays.",
      "Added resilient layouts for long lists."
    ],
    mediaSlots: ["thumb", "showcase", "gif1", "gif2"],
    links: { demoUrl: "ASSET_URL__REPLACE_ME", codeUrl: "ASSET_URL__REPLACE_ME" }
  },
  {
    id: "trace-echo",
    title: "Trace Echo",
    year: "2022",
    tags: ["Story UI", "Telemetry"],
    shortHook: "Telemetric echoes reveal hidden movement patterns.",
    descriptionBullets: [
      "Designed silent notification layers.",
      "Created readable alert logs with priority cues.",
      "Designed a watchline panel for scanning."
    ],
    mediaSlots: ["thumb", "showcase"],
    links: { codeUrl: "ASSET_URL__REPLACE_ME" }
  },
  {
    id: "redline-override",
    title: "Redline Override",
    year: "2023",
    tags: ["Prototype", "Control"],
    shortHook: "Override console for unstable system breaches.",
    descriptionBullets: [
      "Paired hard edges with emergency controls.",
      "Displayed critical thresholds in real time.",
      "Highlighted safe paths with muted tones."
    ],
    mediaSlots: ["thumb", "showcase", "gif1"],
    links: { demoUrl: "ASSET_URL__REPLACE_ME" }
  },
  {
    id: "watcher-lens",
    title: "Watcher Lens",
    year: "2024",
    tags: ["Visual", "Surveillance"],
    shortHook: "A lens dashboard that keeps focus on the target.",
    descriptionBullets: [
      "Built a multi-panel focus HUD.",
      "Created reactive focus queues.",
      "Adjusted brightness for long viewing."
    ],
    mediaSlots: ["thumb", "showcase", "gif1", "gif2"],
    links: { demoUrl: "ASSET_URL__REPLACE_ME", codeUrl: "ASSET_URL__REPLACE_ME" }
  },
  {
    id: "pulse-array",
    title: "Pulse Array",
    year: "2021",
    tags: ["Experimental", "Signal"],
    shortHook: "Signal pulses shift when the array is disturbed.",
    descriptionBullets: [
      "Converted sensor input into readable wave states.",
      "Balanced pulse density with clarity.",
      "Maintained stable controls on mobile."
    ],
    mediaSlots: ["thumb", "showcase"],
    links: { codeUrl: "ASSET_URL__REPLACE_ME" }
  },
  {
    id: "cipher-room",
    title: "Cipher Room",
    year: "2022",
    tags: ["Narrative", "Interaction"],
    shortHook: "A sealed room interface that logs every action.",
    descriptionBullets: [
      "Designed a locked-room access map.",
      "Created log panels with checksum entries.",
      "Displayed monitored access counts."
    ],
    mediaSlots: ["thumb", "showcase", "gif1"],
    links: { demoUrl: "ASSET_URL__REPLACE_ME" }
  },
  {
    id: "silent-breach",
    title: "Silent Breach",
    year: "2023",
    tags: ["UX", "Alert"],
    shortHook: "Silent breach tracker with escalating alert bands.",
    descriptionBullets: [
      "Built layered alert bands with clear hierarchy.",
      "Created a lockable inspection panel.",
      "Designed calm reading zones beside high alert zones."
    ],
    mediaSlots: ["thumb", "showcase", "gif1", "gif2"],
    links: { demoUrl: "ASSET_URL__REPLACE_ME", codeUrl: "ASSET_URL__REPLACE_ME" }
  },
  {
    id: "mirror-stack",
    title: "Mirror Stack",
    year: "2024",
    tags: ["Layout", "Monitoring"],
    shortHook: "Stacked monitoring layout with shifting priorities.",
    descriptionBullets: [
      "Arranged multi-column layouts for scanning.",
      "Optimized detail panes for quick inspection.",
      "Maintained stability under heavy data density."
    ],
    mediaSlots: ["thumb", "showcase"],
    links: { demoUrl: "ASSET_URL__REPLACE_ME" }
  }
];
