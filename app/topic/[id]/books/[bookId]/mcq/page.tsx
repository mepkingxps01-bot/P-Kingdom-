"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const mcqQuestions = [
  {
    id: 1,
    question: "A 58-year-old man with a history of herpes zoster ophthalmicus presents with a painless corneal ulcer that fails to heal despite appropriate antibiotic therapy. Slit-lamp examination reveals a smooth-edged epithelial defect with no stromal infiltrate. Corneal sensation is markedly reduced. Which of the following best explains the pathophysiology of this condition?",
    options: [
      "Viral replication within corneal epithelial cells causing direct cytopathic damage",
      "Loss of trophic support from trigeminal nerve endings impairing epithelial healing and tear secretion",
      "Autoimmune T-cell mediated destruction of limbal stem cells",
      "Endothelial pump failure leading to stromal edema and epithelial breakdown",
    ],
    correct: 1,
    explanation: "Neurotrophic keratopathy results from trigeminal nerve damage (CN V1). The cornea is the most densely innervated tissue; nerve endings provide not just sensation but essential trophic factors for epithelial maintenance. Without neural input, healing fails. The painless nature is the key clinical clue — not bacterial infection.",
  },
  {
    id: 2,
    question: "A researcher is studying corneal transparency. She notes that unlike the sclera, the corneal stroma maintains optical clarity despite being composed primarily of collagen. Which structural feature is MOST responsible for corneal transparency?",
    options: [
      "The absence of proteoglycans between collagen fibrils",
      "Collagen fibrils of uniform diameter arranged at regular spacing shorter than the wavelength of visible light",
      "The high water content of the stroma that prevents light absorption",
      "The presence of large-diameter collagen bundles oriented parallel to the visual axis",
    ],
    correct: 1,
    explanation: "Transparency requires that light waves scattered by individual fibrils cancel each other by destructive interference. This occurs only when fibrils are uniformly sized and spaced at distances less than half the wavelength of visible light. The sclera has irregular fibril diameters and spacing — hence opacity.",
  },
  {
    id: 3,
    question: "A 72-year-old woman undergoes Descemet membrane endothelial keratoplasty (DMEK) for Fuchs endothelial dystrophy. Preoperatively, her cornea shows diffuse guttae and microcystic epithelial edema. Which of the following best explains why endothelial dysfunction causes epithelial edema?",
    options: [
      "Endothelial cells secrete cytokines that directly damage the epithelial tight junctions",
      "Failure of endothelial Na⁺/K⁺-ATPase pump causes stromal water accumulation that propagates anteriorly through the cornea",
      "Loss of Descemet membrane structural integrity allows aqueous humor to flood the stroma",
      "Decreased aqueous humor production reduces nutrient supply to the epithelium",
    ],
    correct: 1,
    explanation: "The endothelium actively pumps fluid out of the stroma into the anterior chamber. When this fails (as in Fuchs), the stroma swells with water. Edema propagates anteriorly — first subepithelial bullae, then microcystic epithelial edema, causing the painful bullous keratopathy seen in advanced disease.",
  },
  {
    id: 4,
    question: "A 35-year-old woman with Stevens-Johnson syndrome develops bilateral limbal stem cell deficiency (LSCD). Slit-lamp examination shows conjunctivalization of the corneal surface with superficial vascularization. Which of the following is the MOST likely reason her cornea is vascularized?",
    options: [
      "Inflammatory cytokines from the conjunctiva directly stimulate corneal stromal angiogenesis",
      "Destruction of limbal stem cells allows conjunctival epithelium to migrate onto the corneal surface, bringing its native vasculature",
      "Stromal collagen disorganization following recurrent erosions permits vessel ingrowth",
      "Loss of endothelial pump function leads to hypoxic stimulus for neovascularization",
    ],
    correct: 1,
    explanation: "Limbal stem cells (LSCs) located at the palisades of Vogt act as a barrier preventing conjunctival epithelial migration onto the cornea. When LSCs are destroyed, conjunctival cells — which are naturally vascularized — invade the corneal surface. This is the hallmark of LSCD: pannus formation and conjunctivalization.",
  },
  {
    id: 5,
    question: "During surgical planning for penetrating keratoplasty, the surgeon notes that the adult recipient cornea measures 12.5 mm horizontally but only 11 mm vertically. What embryological and anatomical process best accounts for this difference?",
    options: [
      "Asymmetric neural crest cell migration during development resulting in greater horizontal collagen deposition",
      "Superior and inferior scleralization of the corneal periphery creating a transversely oval shape",
      "Differential limbal stem cell density between horizontal and vertical meridians",
      "Extraocular muscle traction on the sclera flattening the vertical corneal diameter",
    ],
    correct: 1,
    explanation: "The adult cornea is transversely oval (wider horizontally) because the superior and inferior peripheral cornea undergoes scleralization — the transition zone between cornea and sclera extends further superiorly and inferiorly. This is a normal developmental finding, not pathologic.",
  },
  {
    id: 6,
    question: "A 28-year-old contact lens wearer presents with a central corneal ulcer. Corneal scraping cultures grow Pseudomonas aeruginosa. Which component of the corneal defense system has most likely been breached to allow this infection?",
    options: [
      "Corneal endothelium — the primary immune barrier of the cornea",
      "Bowman layer — which normally prevents bacterial penetration into the stroma",
      "The epithelial barrier — including tight junctions, desmosomes, and antimicrobial tear film components",
      "Stromal keratocytes — which normally phagocytose bacteria on contact",
    ],
    correct: 2,
    explanation: "The corneal epithelium and tear film form the primary mechanical and chemical defense. Contact lens wear disrupts the epithelial barrier (microtrauma, hypoxia, altered tear dynamics) and reduces lysozyme/lactoferrin concentrations. Once the epithelium is breached, Pseudomonas — with its collagenase — can rapidly destroy the stroma.",
  },
  {
    id: 7,
    question: "A 19-year-old is evaluated after a chemical burn with sodium hydroxide. Which of the following correctly ranks the anterior corneal structures from MOST to LEAST vulnerable to alkali penetration?",
    options: [
      "Epithelium > Bowman layer > Stroma",
      "Stroma > Bowman layer > Epithelium",
      "Bowman layer > Stroma > Epithelium",
      "Stroma > Epithelium > Bowman layer",
    ],
    correct: 0,
    explanation: "Alkali (saponification of lipid membranes) rapidly penetrates the epithelium first, then crosses Bowman layer, and enters the stroma. The epithelium, lacking significant barrier to alkali, is breached almost immediately. Unlike acid burns (which self-limit via protein precipitation), alkali continues penetrating deeper — hence alkali burns are more devastating.",
  },
  {
    id: 8,
    question: "A patient with a history of chronic topical steroid use develops superficial punctate keratopathy and poor corneal wound healing. Biopsy shows thinned epithelium with reduced cell layers. Which growth factor, normally present in tear fluid, is MOST critical for corneal epithelial maintenance and repair?",
    options: [
      "Vascular endothelial growth factor (VEGF)",
      "Epidermal growth factor (EGF) and hepatocyte growth factor (HGF)",
      "Transforming growth factor-beta (TGF-β)",
      "Platelet-derived growth factor (PDGF)",
    ],
    correct: 1,
    explanation: "EGF (from lacrimal gland) and HGF (from stroma and aqueous) are the primary mitogens for corneal epithelial cells. They are present in tear fluid and aqueous humor and act via tyrosine kinase receptors to drive proliferation, migration, and differentiation. Chronic steroids impair epithelial healing partly by suppressing these pathways.",
  },
  {
    id: 9,
    question: "A researcher studying corneal wound healing observes that keratocytes adjacent to a stromal wound undergo apoptosis within hours, then repopulate the wound by day 3–5. What is the MOST important functional role of keratocyte apoptosis in the early wound healing response?",
    options: [
      "To release collagenase enzymes that debride necrotic tissue from the wound bed",
      "To remove activated keratocytes that could otherwise produce excessive scar tissue, and to clear space for migration of adjacent keratocytes",
      "To trigger limbal stem cell mobilization through apoptotic signaling cascades",
      "To prevent viral replication within injured stromal cells",
    ],
    correct: 1,
    explanation: "Early keratocyte apoptosis is a regulated response to epithelial injury signals (IL-1, FasL from epithelium). It clears the wound zone, allowing activated keratocytes from the periphery to migrate in and begin repair. Dysregulation of this process — excessive myofibroblast differentiation — leads to stromal scarring (haze after PRK).",
  },
  {
    id: 10,
    question: "A 45-year-old man with aniridia presents for evaluation. He has 20/200 vision bilaterally with corneal pannus and recurrent erosions. Genetic testing confirms a PAX6 mutation. Which of the following best explains his corneal findings?",
    options: [
      "PAX6 mutation causes primary endothelial dysfunction leading to stromal edema",
      "PAX6 haploinsufficiency leads to abnormal limbal stem cell development and maintenance, resulting in LSCD",
      "The absence of iris tissue causes ultraviolet phototoxicity to the corneal epithelium",
      "PAX6 mutation disrupts type I collagen synthesis causing stromal thinning and pannus formation",
    ],
    correct: 1,
    explanation: "PAX6 is the master transcription factor for ocular development. In aniridia, PAX6 haploinsufficiency leads to qualitatively deficient limbal stem cells — they fail to maintain the corneal epithelial surface. This causes LSCD, conjunctivalization, and pannus — a major cause of vision loss in aniridia beyond the iris defect itself.",
  },
];

export default function MCQPage() {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSelect = (qId: number, optIdx: number) => {
    if (submitted) return;
    setSelected((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = () => setSubmitted(true);

  const correctCount = mcqQuestions.filter((q) => selected[q.id] === q.correct).length;
  const xp = mcqQuestions.reduce((acc, q) => {
    if (selected[q.id] === q.correct) return acc + 3;
    return acc + 1;
  }, 0) + (correctCount === mcqQuestions.length ? 20 : correctCount >= 8 ? 10 : 0);

  const answered = Object.keys(selected).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center gap-3">
        <Link href="/topic/cornea/books/cornea-mannis" className="text-slate-400 hover:text-white transition-colors text-sm">
          ← Recall Questions
        </Link>
        <span className="text-slate-700">|</span>
        <div className="flex items-center gap-2">
          <span className="text-lg">🏰</span>
          <h1 className="text-base font-semibold">Build Kingdom — Board Exam MCQ</h1>
        </div>
        {!submitted && (
          <span className="ml-auto text-xs text-slate-500">{answered}/{mcqQuestions.length} answered</span>
        )}
      </header>

      <section className="max-w-2xl mx-auto px-6 py-8">
        {!submitted && (
          <p className="text-xs text-slate-500 mb-8 border border-slate-800 rounded-lg px-4 py-3 bg-slate-900/50">
            ⚡ Residency board-level questions — clinical vignette format. Each correct answer earns <span className="text-cyan-400 font-medium">+3 XP</span>. Perfect score earns a bonus <span className="text-yellow-400 font-medium">+20 XP</span>.
          </p>
        )}

        <div className="space-y-6">
          {mcqQuestions.map((q) => (
            <div key={q.id} className={`bg-slate-900 border rounded-xl p-5 transition-colors ${submitted && selected[q.id] === q.correct ? "border-green-800/50" : submitted && selected[q.id] !== q.correct ? "border-red-900/50" : "border-slate-800"}`}>
              <p className="text-sm font-medium leading-relaxed mb-4">
                <span className="text-slate-500 mr-2">{q.id}.</span>
                {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, idx) => {
                  const isSelected = selected[q.id] === idx;
                  const isCorrect = idx === q.correct;
                  let style = "border-slate-700 text-slate-300 hover:border-cyan-700 hover:bg-cyan-950/20";
                  if (submitted) {
                    if (isCorrect) style = "border-green-600 bg-green-950/40 text-green-200 font-medium";
                    else if (isSelected) style = "border-red-600 bg-red-950/40 text-red-300";
                    else style = "border-slate-800 text-slate-600";
                  } else if (isSelected) {
                    style = "border-cyan-500 bg-cyan-950/30 text-cyan-200";
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(q.id, idx)}
                      className={`w-full text-left text-sm px-4 py-3 rounded-lg border transition-all ${style}`}
                    >
                      <span className="text-slate-500 mr-2 font-mono">{String.fromCharCode(65 + idx)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <div className="mt-4 pt-3 border-t border-slate-700">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <span className="text-cyan-400 font-medium">Explanation: </span>
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={answered < mcqQuestions.length}
            className="mt-8 w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all text-white font-bold py-4 rounded-xl text-sm"
          >
            {answered < mcqQuestions.length ? `Answer all questions (${answered}/${mcqQuestions.length})` : "Submit Answers"}
          </button>
        ) : (
          <div className="mt-8 bg-slate-900 border border-cyan-800/40 rounded-2xl p-8 text-center">
            <p className="text-4xl mb-3">🏰</p>
            <p className="text-2xl font-bold text-cyan-300 mb-1">+{xp} XP earned!</p>
            <p className="text-sm text-slate-400 mb-1">
              {correctCount}/{mcqQuestions.length} correct
              {correctCount === mcqQuestions.length && " — Perfect score! 🎉"}
              {correctCount >= 8 && correctCount < mcqQuestions.length && " — Great job!"}
              {correctCount < 8 && " — Keep studying!"}
            </p>
            <p className="text-xs text-slate-600 mb-6">Your Cornea Kingdom has grown.</p>
            <div className="flex gap-3 justify-center">
              <Link
                href="/topic/cornea"
                className="bg-cyan-600 hover:bg-cyan-500 transition-colors text-white text-sm font-semibold px-6 py-3 rounded-xl"
              >
                View Kingdom
              </Link>
              <button
                onClick={() => { setSubmitted(false); setSelected({}); }}
                className="border border-slate-700 hover:border-slate-500 transition-colors text-slate-300 text-sm px-6 py-3 rounded-xl"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
