"use client";

import { useState } from "react";
import Link from "next/link";

const recallQuestions = [
  {
    id: 1,
    question: "Why is the cornea transparent?",
    answer: "The cornea is avascular and its collagen fibrils in the stroma are homogeneous in diameter and aligned at a constant distance from each other — this precise regular arrangement allows light to pass through without scattering.",
  },
  {
    id: 2,
    question: "What are the 5 layers of the cornea?",
    answer: "Epithelium → Bowman layer → Stroma → Descemet membrane → Endothelium. (Remember: Every Bad Student Deserves Education)",
  },
  {
    id: 3,
    question: "What fraction of the eye's total refractive power does the cornea account for?",
    answer: "The cornea accounts for more than two-thirds (≈ 67%) of the total refractive power of the eye.",
  },
  {
    id: 4,
    question: "Where do corneal epithelial stem cells reside and why is this location important?",
    answer: "Limbal stem cells reside in the basal cell layer at the limbus (palisades of Vogt). They maintain corneal epithelial homeostasis through centripetal migration (X+Y=Z model: proliferation + centripetal movement = desquamation).",
  },
  {
    id: 5,
    question: "How does the corneal endothelium maintain stromal transparency?",
    answer: "The endothelium regulates corneal hydration via active ion pumping (Na⁺/K⁺-ATPase). It keeps the stroma in a state of relative dehydration — excess water would swell the stroma and scatter light, causing opacity.",
  },
  {
    id: 6,
    question: "What nerve supplies corneal sensation and why does this matter clinically?",
    answer: "The ophthalmic division of the trigeminal nerve (CN V1). The cornea is one of the most densely innervated tissues in the body. Trigeminal dysfunction (e.g., neurotrophic keratopathy) causes loss of protective sensation and impairs epithelial healing.",
  },
  {
    id: 7,
    question: "What is the role of the tear film in corneal physiology?",
    answer: "The tear film provides oxygen, nutrients, and regulatory factors (growth factors, cytokines, immunoglobulins) to the avascular epithelium. It also maintains a smooth refracting surface and acts as a first line of defense against pathogens.",
  },
  {
    id: 8,
    question: "What is the primary structural component of the corneal stroma?",
    answer: "Type I collagen (predominantly) and proteoglycans. Keratocytes are the resident stromal cells responsible for synthesizing and degrading collagen and proteoglycans to maintain stromal architecture.",
  },
  {
    id: 9,
    question: "What occupies one-third of the ocular tunic and what structural role does it play?",
    answer: "The cornea occupies one-third of the ocular tunic (sclera = two-thirds). Together they form the outer shell of the eye — the cornea as the transparent window, the sclera as the opaque dark box that enables image formation on the retina.",
  },
  {
    id: 10,
    question: "Why can the cornea survive without blood vessels?",
    answer: "The cornea receives oxygen via the tear film (from atmosphere) and nutrients via the aqueous humor posteriorly and limbal vasculature at its periphery. Avascularity is essential for transparency — blood vessels would scatter light.",
  },
];

const mcqQuestions = [
  {
    id: 1,
    question: "Which layer of the cornea is responsible for regulating corneal hydration?",
    options: ["Epithelium", "Bowman layer", "Stroma", "Endothelium"],
    correct: 3,
  },
  {
    id: 2,
    question: "The cornea accounts for approximately what percentage of the eye's total refractive power?",
    options: ["33%", "50%", "67%", "85%"],
    correct: 2,
  },
  {
    id: 3,
    question: "Where do limbal stem cells reside?",
    options: ["Central corneal epithelium", "Bowman layer", "Basal layer at the limbus", "Descemet membrane"],
    correct: 2,
  },
  {
    id: 4,
    question: "What nerve provides sensation to the cornea?",
    options: ["Facial nerve (CN VII)", "Oculomotor nerve (CN III)", "Ophthalmic division of trigeminal (CN V1)", "Abducens nerve (CN VI)"],
    correct: 2,
  },
  {
    id: 5,
    question: "Which collagen type predominates in the corneal stroma?",
    options: ["Type II collagen", "Type I collagen", "Type IV collagen", "Type VII collagen"],
    correct: 1,
  },
  {
    id: 6,
    question: "What maintains the regular arrangement of collagen fibrils that allows corneal transparency?",
    options: ["Corneal vasculature", "Uniform fibril diameter and spacing", "Bowman layer structure", "Epithelial tight junctions"],
    correct: 1,
  },
  {
    id: 7,
    question: "Which structure forms the transition zone between the cornea and sclera?",
    options: ["Conjunctiva", "Tenon capsule", "Limbus", "Palpebral fissure"],
    correct: 2,
  },
  {
    id: 8,
    question: "The posterior surface of the cornea is bathed by:",
    options: ["Tear fluid", "Vitreous humor", "Aqueous humor", "Synovial fluid"],
    correct: 2,
  },
  {
    id: 9,
    question: "In the XYZ model of corneal epithelial homeostasis, what does Y represent?",
    options: ["Proliferation of basal cells", "Centripetal movement of cells", "Cell desquamation", "Stem cell division"],
    correct: 1,
  },
  {
    id: 10,
    question: "Loss of which corneal layer's function would MOST directly cause stromal edema?",
    options: ["Epithelium", "Bowman layer", "Keratocytes", "Endothelium"],
    correct: 3,
  },
];

export default function BookPage() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [showMCQ, setShowMCQ] = useState(false);
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const toggleReveal = (id: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSelect = (qId: number, optIdx: number) => {
    if (submitted) return;
    setSelected((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = () => {
    let correct = 0;
    mcqQuestions.forEach((q) => {
      if (selected[q.id] === q.correct) correct++;
    });
    const pct = correct / mcqQuestions.length;
    let xp = mcqQuestions.reduce((acc, q) => {
      if (selected[q.id] === q.correct) return acc + 3;
      return acc + 1;
    }, 0);
    if (pct === 1) xp += 20;
    else if (pct >= 0.8) xp += 10;
    setXpEarned(xp);
    setSubmitted(true);
  };

  const correctCount = mcqQuestions.filter((q) => selected[q.id] === q.correct).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center gap-3">
        <Link href="/topic/cornea/books" className="text-slate-400 hover:text-white transition-colors text-sm">
          ← Books
        </Link>
        <span className="text-slate-700">|</span>
        <div>
          <h1 className="text-base font-semibold leading-tight">Cornea: Fundamentals, Diagnosis and Management</h1>
          <p className="text-xs text-slate-500">Mannis & Holland · 5th Edition · Part I: Basic Science</p>
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-cyan-400 uppercase tracking-widest">Recall Questions</span>
          <span className="text-xs text-slate-600">— read each question, recall in your head, then reveal</span>
        </div>
        <p className="text-xs text-slate-500 mb-8">Click 🔍 to reveal the answer after you've tried to recall it.</p>

        <div className="space-y-4">
          {recallQuestions.map((q) => (
            <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium leading-relaxed flex-1">
                  <span className="text-slate-500 mr-2">{q.id}.</span>
                  {q.question}
                </p>
                <button
                  onClick={() => toggleReveal(q.id)}
                  className="text-xl flex-shrink-0 hover:scale-110 transition-transform"
                  title={revealed.has(q.id) ? "Hide answer" : "Reveal answer"}
                >
                  {revealed.has(q.id) ? "🔓" : "🔍"}
                </button>
              </div>
              {revealed.has(q.id) && (
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <p className="text-sm text-cyan-200 leading-relaxed">{q.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {!showMCQ && (
          <div className="mt-10 text-center">
            <p className="text-sm text-slate-400 mb-4">Done recalling? Test yourself and earn XP to grow your kingdom.</p>
            <button
              onClick={() => setShowMCQ(true)}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 active:scale-95 transition-all text-white font-bold px-8 py-4 rounded-2xl text-base shadow-lg shadow-cyan-950/60"
            >
              🏰 Build Kingdom
            </button>
          </div>
        )}

        {showMCQ && (
          <div className="mt-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-lg">🏰</span>
              <h2 className="text-base font-semibold">Build Kingdom — MCQ Challenge</h2>
              <span className="text-xs text-slate-500 ml-auto">{Object.keys(selected).length}/{mcqQuestions.length} answered</span>
            </div>

            <div className="space-y-5">
              {mcqQuestions.map((q) => (
                <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                  <p className="text-sm font-medium mb-3">
                    <span className="text-slate-500 mr-2">{q.id}.</span>
                    {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt, idx) => {
                      const isSelected = selected[q.id] === idx;
                      const isCorrect = idx === q.correct;
                      let style = "border-slate-700 text-slate-300 hover:border-cyan-700 hover:bg-cyan-950/30";
                      if (submitted) {
                        if (isCorrect) style = "border-green-600 bg-green-950/40 text-green-300";
                        else if (isSelected && !isCorrect) style = "border-red-600 bg-red-950/40 text-red-300";
                        else style = "border-slate-800 text-slate-600";
                      } else if (isSelected) {
                        style = "border-cyan-500 bg-cyan-950/40 text-cyan-300";
                      }
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelect(q.id, idx)}
                          className={`w-full text-left text-sm px-4 py-2.5 rounded-lg border transition-all ${style}`}
                        >
                          <span className="text-slate-500 mr-2">{String.fromCharCode(65 + idx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={Object.keys(selected).length < mcqQuestions.length}
                className="mt-6 w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all text-white font-semibold py-3.5 rounded-xl text-sm"
              >
                Submit Answers
              </button>
            ) : (
              <div className="mt-6 bg-slate-900 border border-cyan-800/40 rounded-2xl p-6 text-center">
                <p className="text-3xl mb-2">🏰</p>
                <p className="text-lg font-bold text-cyan-300">+{xpEarned} XP earned!</p>
                <p className="text-sm text-slate-400 mt-1">
                  {correctCount}/{mcqQuestions.length} correct
                  {correctCount === mcqQuestions.length && " — Perfect! 🎉"}
                  {correctCount >= 8 && correctCount < mcqQuestions.length && " — Great job!"}
                </p>
                <div className="mt-4 flex gap-3 justify-center">
                  <Link
                    href="/topic/cornea"
                    className="bg-cyan-600 hover:bg-cyan-500 transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
                  >
                    View Kingdom
                  </Link>
                  <button
                    onClick={() => { setSubmitted(false); setSelected({}); setShowMCQ(false); setRevealed(new Set()); }}
                    className="border border-slate-700 hover:border-slate-500 transition-colors text-slate-300 text-sm px-5 py-2.5 rounded-xl"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
