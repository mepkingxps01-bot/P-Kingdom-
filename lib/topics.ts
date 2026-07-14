export type TopicConfig = {
  id: string;
  name: string;
  xpColumn: string;
  scene: "cornea" | "retina";
  // Tailwind class fragments (kept as full literals so they survive JIT purge)
  accentText: string;
  badge: string;
  bar: string;
  buttonBg: string;
  sceneBorder: string;
};

export const TOPICS: Record<string, TopicConfig> = {
  cornea: {
    id: "cornea",
    name: "Cornea",
    xpColumn: "cornea_xp",
    scene: "cornea",
    accentText: "text-cyan-300",
    badge: "bg-cyan-900/50 text-cyan-300",
    bar: "bg-cyan-500/60",
    buttonBg: "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-950/50",
    sceneBorder: "border-cyan-900/30",
  },
  retina: {
    id: "retina",
    name: "Retina",
    xpColumn: "retina_xp",
    scene: "retina",
    accentText: "text-amber-300",
    badge: "bg-amber-900/50 text-amber-300",
    bar: "bg-amber-500/60",
    buttonBg: "bg-amber-600 hover:bg-amber-500 shadow-amber-950/50",
    sceneBorder: "border-amber-900/30",
  },
};

export function getTopic(id: string): TopicConfig {
  return TOPICS[id] ?? TOPICS.cornea;
}
