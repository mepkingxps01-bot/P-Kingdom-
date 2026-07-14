export type TopicConfig = {
  id: string;
  name: string;
  xpColumn: string;
  scene: "cornea" | "retina";
  // Tailwind class fragments (kept as full literals so they survive JIT purge)
  accentText: string;
  accentHover: string; // full literal, e.g. "group-hover:text-cyan-300" (kept whole so Tailwind's scanner keeps it)
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
    accentHover: "group-hover:text-cyan-300",
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
    accentHover: "group-hover:text-amber-300",
    badge: "bg-amber-900/50 text-amber-300",
    bar: "bg-amber-500/60",
    buttonBg: "bg-amber-600 hover:bg-amber-500 shadow-amber-950/50",
    sceneBorder: "border-amber-900/30",
  },
};

export function getTopic(id: string): TopicConfig {
  return TOPICS[id] ?? TOPICS.cornea;
}

export type Part = {
  id: string;
  title: string;
  subtitle: string;
  questions: number;
  mcq: number;
  status: "available" | "coming";
};

export type BookDetail = {
  id: string;
  title: string;
  author: string;
  edition: string;
  parts: Part[];
};

export const BOOK_DETAILS: Record<string, BookDetail> = {
  "cornea-mannis": {
    id: "cornea-mannis",
    title: "Cornea: Fundamentals, Diagnosis and Management",
    author: "Mannis & Holland",
    edition: "5th Edition",
    parts: [
      {
        id: "part1",
        title: "Part 1: Basic Science",
        subtitle: "Cornea · Sclera · Ocular Adnexa · Anatomy · Physiology · Pathophysiologic Responses",
        questions: 25,
        mcq: 30,
        status: "available",
      },
      {
        id: "part2",
        title: "Part 2: Corneal Diseases",
        subtitle: "Infections · Dystrophies · Ectasias · Degenerations",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part3",
        title: "Part 3: Surgery",
        subtitle: "Keratoplasty · Refractive Surgery · Ocular Surface Reconstruction",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
    ],
  },
  "ryans-retina": {
    id: "ryans-retina",
    title: "Ryan's Retina",
    author: "Sadda, Sarraf, Freund et al.",
    edition: "7th Edition",
    parts: [
      {
        id: "part1",
        title: "Part 1: Retinal Imaging & Diagnostics",
        subtitle: "Anatomy · Physiology · OCT · Angiography · Autofluorescence · Electrophysiology",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part2",
        title: "Part 2: Retinal & Choroidal Vascular Disease",
        subtitle: "Diabetic Retinopathy · Vein & Artery Occlusions · Retinopathy of Prematurity",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part3",
        title: "Part 3: Age-Related Macular Degeneration",
        subtitle: "Drusen · Geographic Atrophy · Choroidal Neovascularisation · Anti-VEGF",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part4",
        title: "Part 4: Inflammation, Infection & Uveitis",
        subtitle: "Posterior Uveitis · Endophthalmitis · White Dot Syndromes",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part5",
        title: "Part 5: Degenerations & Dystrophies",
        subtitle: "Retinitis Pigmentosa · Inherited Retinal Disease · Macular Dystrophies",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part6",
        title: "Part 6: Retinal Detachment & Surgery",
        subtitle: "Rhegmatogenous · Tractional · Vitrectomy · Scleral Buckling · Macular Surgery",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
    ],
  },
};

export function getBookDetail(bookId: string): BookDetail {
  return BOOK_DETAILS[bookId] ?? BOOK_DETAILS["cornea-mannis"];
}
