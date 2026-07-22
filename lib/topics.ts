export type TopicConfig = {
  id: string;
  name: string;
  xpColumn: string;
  scene: "cornea" | "retina";
  // Tailwind class fragments (kept as full literals so they survive JIT purge)
  accentText: string;
  accentHover: string; // full literal, e.g. "group-hover:text-cyan-300" (kept whole so Tailwind's scanner keeps it)
  accentBright: string; // brighter accent, e.g. "text-cyan-400"
  answerText: string; // reveal-answer text, e.g. "text-cyan-200"
  optionHover: string; // MCQ option idle hover, full literal
  optionSelected: string; // MCQ option selected state, full literal
  mcqGradient: string; // Build-Kingdom CTA gradient, full literal
  resultBorder: string; // result card border, e.g. "border-cyan-800/40"
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
    accentBright: "text-cyan-400",
    answerText: "text-cyan-200",
    optionHover: "hover:border-cyan-700 hover:bg-cyan-950/20",
    optionSelected: "border-cyan-500 bg-cyan-950/30 text-cyan-200",
    mcqGradient: "from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 shadow-cyan-950/60",
    resultBorder: "border-cyan-800/40",
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
    accentBright: "text-amber-400",
    answerText: "text-amber-200",
    optionHover: "hover:border-amber-700 hover:bg-amber-950/20",
    optionSelected: "border-amber-500 bg-amber-950/30 text-amber-200",
    mcqGradient: "from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600 shadow-amber-950/60",
    resultBorder: "border-amber-800/40",
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
      {
        id: "part4",
        title: "Part 4: Dry Eye & Ocular Allergy Medications",
        subtitle: "Artificial Tears · Secretagogues · Anti-Inflammatories · Antihistamines · Mast Cell Stabilizers · Steroids · Immunomodulators",
        questions: 30,
        mcq: 30,
        status: "available",
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
        title: "Part 1: Viral & Necrotizing Retinitis",
        subtitle: "CMV Retinitis · Acute Retinal Necrosis (ARN) · Progressive Outer Retinal Necrosis (PORN)",
        questions: 25,
        mcq: 30,
        status: "available",
      },
      {
        id: "part2",
        title: "Part 2: Retinal Imaging & Diagnostics",
        subtitle: "Anatomy · Physiology · OCT · Angiography · Autofluorescence · Electrophysiology",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part3",
        title: "Part 3: Retinal & Choroidal Vascular Disease",
        subtitle: "Diabetic Retinopathy · Vein & Artery Occlusions · Retinopathy of Prematurity",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part4",
        title: "Part 4: Age-Related Macular Degeneration",
        subtitle: "Drusen · Geographic Atrophy · Choroidal Neovascularisation · Anti-VEGF",
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
  "bcsc-retina": {
    id: "bcsc-retina",
    title: "BCSC Section 12: Retina and Vitreous",
    author: "American Academy of Ophthalmology",
    edition: "2023–2024",
    parts: [
      {
        id: "part1",
        title: "Part 1: Fluorescein & ICG Angiography",
        subtitle: "Dye Properties · Angiographic Phases · Hyper/Hypofluorescence Patterns · CNV & CME · ICG · Adverse Effects",
        questions: 25,
        mcq: 30,
        status: "available",
      },
      {
        id: "part2",
        title: "Part 2: Acquired Macular Disorders",
        subtitle: "Age-Related Macular Degeneration · CSC · Macular Hole · Epiretinal Membrane · VMT",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part3",
        title: "Part 3: Retinal Vascular Disease",
        subtitle: "Diabetic Retinopathy · Vein & Artery Occlusions · Retinopathy of Prematurity · Sickle Cell",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part4",
        title: "Part 4: Hereditary Retinal & Choroidal Dystrophies",
        subtitle: "Retinitis Pigmentosa · Stargardt · Cone Dystrophies · Choroideremia · Best Disease",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part5",
        title: "Part 5: Intraocular Inflammation & Infection",
        subtitle: "Posterior Uveitis · White Dot Syndromes · Endophthalmitis · Viral Retinitis",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part6",
        title: "Part 6: Retinal Detachment & Vitreoretinal Surgery",
        subtitle: "Rhegmatogenous · Tractional · PVR · Vitrectomy · Scleral Buckling · Tamponade",
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

export function getPart(bookId: string, partId: string): Part | undefined {
  return getBookDetail(bookId).parts.find((p) => p.id === partId);
}
