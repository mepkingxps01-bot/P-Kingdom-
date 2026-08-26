export type TopicConfig = {
  id: string;
  name: string;
  xpColumn: string;
  scene: "cornea" | "retina" | "academy" | "uveitis";
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
  uveitis: {
    id: "uveitis",
    name: "Uveitis",
    xpColumn: "uveitis_xp",
    scene: "uveitis",
    accentText: "text-rose-300",
    accentHover: "group-hover:text-rose-300",
    accentBright: "text-rose-400",
    answerText: "text-rose-200",
    optionHover: "hover:border-rose-700 hover:bg-rose-950/20",
    optionSelected: "border-rose-500 bg-rose-950/30 text-rose-200",
    mcqGradient: "from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 shadow-rose-950/60",
    resultBorder: "border-rose-800/40",
    badge: "bg-rose-900/50 text-rose-300",
    bar: "bg-rose-500/60",
    buttonBg: "bg-rose-600 hover:bg-rose-500 shadow-rose-950/50",
    sceneBorder: "border-rose-900/30",
  },
  "basic-science": {
    id: "basic-science",
    name: "Basic Science",
    xpColumn: "basic_science_xp",
    scene: "academy",
    accentText: "text-violet-300",
    accentHover: "group-hover:text-violet-300",
    accentBright: "text-violet-400",
    answerText: "text-violet-200",
    optionHover: "hover:border-violet-700 hover:bg-violet-950/20",
    optionSelected: "border-violet-500 bg-violet-950/30 text-violet-200",
    mcqGradient: "from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 shadow-violet-950/60",
    resultBorder: "border-violet-800/40",
    badge: "bg-violet-900/50 text-violet-300",
    bar: "bg-violet-500/60",
    buttonBg: "bg-violet-600 hover:bg-violet-500 shadow-violet-950/50",
    sceneBorder: "border-violet-900/30",
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
        questions: 56,
        mcq: 60,
        status: "available",
      },
    ],
  },
  "retina-vitreous": {
    id: "retina-vitreous",
    title: "Retina & Vitreous",
    author: "Ryan's Retina · AAO BCSC 12",
    edition: "Combined Study Deck",
    parts: [
      {
        id: "part1",
        title: "Chapter 1: Viral & Necrotizing Retinitis",
        subtitle: "CMV Retinitis · Acute Retinal Necrosis (ARN) · Progressive Outer Retinal Necrosis (PORN)",
        questions: 25,
        mcq: 30,
        status: "available",
      },
      {
        id: "part2",
        title: "Chapter 2: Fluorescein & ICG Angiography",
        subtitle: "Dye Properties · Angiographic Phases · Hyper/Hypofluorescence Patterns · CNV & CME · ICG · Adverse Effects",
        questions: 25,
        mcq: 30,
        status: "available",
      },
      {
        id: "part3",
        title: "Chapter 3: Central Serous Chorioretinopathy",
        subtitle: "CSC · Pachychoroid Spectrum · Dot & Smokestack Leaks · FAF / EDI-OCT / ICGA · Verteporfin PDT",
        questions: 28,
        mcq: 48,
        status: "available",
      },
      {
        id: "part4",
        title: "Chapter 4: Hypertensive Retinopathy & Choroidopathy",
        subtitle: "FIPTs · Cotton-Wool Spots · Modified Scheie Grades · Malignant HTN · Choriocapillaris Nonperfusion",
        questions: 22,
        mcq: 32,
        status: "available",
      },
      {
        id: "part5",
        title: "Chapter 5: Retinal Artery Occlusion (CRAO)",
        subtitle: "CRAO · Cherry-Red Spot · Cilioretinal Sparing · Hollenhorst Plaques · GCA · Stroke Workup · tPA · NVI",
        questions: 30,
        mcq: 44,
        status: "available",
      },
      {
        id: "part6",
        title: "Chapter 6: Retinal Imaging & Diagnostics",
        subtitle: "Anatomy · Physiology · OCT · OCT Angiography · Autofluorescence · Electrophysiology",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part7",
        title: "Chapter 7: Diabetic Retinopathy & Vein Occlusions",
        subtitle: "Diabetic Retinopathy · BRVO · CRVO · Retinopathy of Prematurity · Sickle Cell",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part8",
        title: "Chapter 8: AMD & Acquired Macular Disorders",
        subtitle: "Drusen · Geographic Atrophy · Choroidal Neovascularisation · Anti-VEGF · Macular Hole · ERM · VMT",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part9",
        title: "Chapter 9: Hereditary Dystrophies & Degenerations",
        subtitle: "Retinitis Pigmentosa · Stargardt · Cone Dystrophies · Choroideremia · Best Disease",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part10",
        title: "Chapter 10: Intraocular Inflammation & Infection",
        subtitle: "Posterior Uveitis · White Dot Syndromes · Endophthalmitis",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part11",
        title: "Chapter 11: Retinal Detachment & Vitreoretinal Surgery",
        subtitle: "Rhegmatogenous · Tractional · PVR · Vitrectomy · Scleral Buckling · Tamponade",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
    ],
  },
  "bcsc-uveitis": {
    id: "bcsc-uveitis",
    title: "BCSC Section 9: Uveitis and Ocular Inflammation",
    author: "American Academy of Ophthalmology",
    edition: "2023–2024",
    parts: [
      {
        id: "part1",
        title: "Chapter 1: Ocular Toxoplasmosis",
        subtitle: "T. gondii Life Cycle · Congenital vs Acquired · Headlight in the Fog · PORT · Serology · Triple Therapy · TMP-SMX",
        questions: 34,
        mcq: 50,
        status: "available",
      },
      {
        id: "part2",
        title: "Chapter 2: Toxocariasis & Helminthic Uveitis",
        subtitle: "Toxocara canis/cati · Visceral vs Ocular Larva Migrans · Granuloma · DUSN",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part3",
        title: "Chapter 3: Viral Uveitis",
        subtitle: "HSV · VZV · CMV · Acute Retinal Necrosis · Fuchs Uveitis Syndrome",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part4",
        title: "Chapter 4: Anterior Uveitis & HLA-B27 Disease",
        subtitle: "Spondyloarthropathies · JIA · Tubulointerstitial Nephritis · Lens-Induced",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part5",
        title: "Chapter 5: Sarcoidosis",
        subtitle: "Granulomatous Uveitis · Candle-Wax Drippings · ACE · Chest Imaging · Biopsy",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part6",
        title: "Chapter 6: VKH & Sympathetic Ophthalmia",
        subtitle: "Vogt–Koyanagi–Harada · Serous Detachments · Sunset-Glow Fundus · Sympathetic Ophthalmia",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part7",
        title: "Chapter 7: Behçet & White Dot Syndromes",
        subtitle: "Behçet Disease · Birdshot · MEWDS · APMPPE · Serpiginous · MFC",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part8",
        title: "Chapter 8: Scleritis & Episcleritis",
        subtitle: "Anterior & Posterior Scleritis · Necrotizing Disease · Systemic Vasculitis Associations",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
    ],
  },
  "bcsc-fundamentals": {
    id: "bcsc-fundamentals",
    title: "BCSC Section 2: Fundamentals & Principles of Ophthalmology",
    author: "American Academy of Ophthalmology",
    edition: "2023–2024",
    parts: [
      {
        id: "part1",
        title: "Part 1: Pharmacokinetics & Ocular Drug Delivery",
        subtitle: "PK vs PD · Bioavailability · Tear-Film Kinetics · Eyedrops & Ointments · Injection Routes · Implants (Ozurdex/PDS) · Diagnostic Dyes · Anti-VEGF · Pharmacogenetics",
        questions: 72,
        mcq: 88,
        status: "available",
      },
      {
        id: "part2",
        title: "Part 2: Glaucoma Pharmacology — Complete Drug Guide",
        subtitle: "Target IOP (Lower/Higher Factors) & Trials · Prostaglandins · β-Blockers · α-Agonists · CAIs · Miotics · ROCK & EP2 · Fixed Combos · Systemic & Hyperosmotic · Pregnancy · First-Line & Adherence",
        questions: 54,
        mcq: 81,
        status: "available",
      },
      {
        id: "part3",
        title: "Part 3: Cornea Essentials — Anatomy & Physiology",
        subtitle: "Globe · Tear Film · Cornea (5 Layers) · Optics & Dimensions · Metabolism & Pathways · Hydration & Transparency · Drug Permeability · Slit-Lamp, Dyes, Pachymetry, Specular Microscopy & Imaging",
        questions: 112,
        mcq: 136,
        status: "available",
      },
      {
        id: "part4",
        title: "Part 4: Aqueous Humor & Anterior Segment Anatomy",
        subtitle: "Blood–Aqueous Barrier · NPE Secretion · Goldmann Equation · Composition · AC Angle · Trabecular Meshwork · Schlemm Canal · Iris · Ciliary Body · Choroid",
        questions: 76,
        mcq: 102,
        status: "available",
      },
      {
        id: "part5",
        title: "Part 5: Ocular Embryology & Development",
        subtitle: "Germ Layers · Cell of Origin · Optic Cup & Embryonic Fissure · Lens/Cornea/Retina/Uvea/Optic Nerve · Congenital Anomalies · Developmental Chronology",
        questions: 50,
        mcq: 68,
        status: "available",
      },
      {
        id: "part6",
        title: "Part 6: Vitreous & Retina Fundamentals",
        subtitle: "Vitreous Anatomy/Embryology/Biochemistry · Collagen, Hyaluronan, Lipids & Fibrillin · Liquefaction, PVD & Vitreolysis · Retinal Layers · RPE · Macula & Fovea · Blood Supply · Surgical Topography",
        questions: 50,
        mcq: 70,
        status: "available",
      },
      {
        id: "part7",
        title: "Part 7: Optics — Vergence & IOL Calculations",
        subtitle: "Vergence (U+D=V) · Single & Two-Lens Problems · Curved Surfaces · Reduced Vergence · Mirrors · Corneal/Lens Power · Keratometry · Thick Lens · IOL Power (SRK, Vergence, Post-LASIK)",
        questions: 24,
        mcq: 56,
        status: "available",
      },
      {
        id: "part8",
        title: "Part 8: Pharmacodynamics & Drug Actions",
        subtitle: "Receptors · Agonists & Antagonists · Autonomic Agents · Dose-Response",
        questions: 0,
        mcq: 0,
        status: "coming",
      },
      {
        id: "part9",
        title: "Part 9: Biochemistry, Metabolism & Genetics",
        subtitle: "Ocular Biochemistry · Free Radicals · Inheritance · Molecular Genetics",
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
