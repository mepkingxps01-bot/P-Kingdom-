"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

export default function BookPage() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const router = useRouter();

  const toggleReveal = (id: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

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
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-cyan-400 uppercase tracking-widest">Recall Questions</span>
          <span className="text-xs text-slate-600">({recallQuestions.length} questions)</span>
        </div>
        <p className="text-xs text-slate-500 mb-8">Read each question, recall in your head, then click 🔍 to reveal.</p>

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

        <div className="mt-10 border-t border-slate-800 pt-8 text-center">
          <p className="text-sm text-slate-400 mb-2">Done recalling? Test yourself with board-level MCQs.</p>
          <p className="text-xs text-slate-600 mb-6">Correct answers earn XP and grow your Cornea Kingdom.</p>
          <button
            onClick={() => router.push("/topic/cornea/books/cornea-mannis/mcq")}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 active:scale-95 transition-all text-white font-bold px-10 py-4 rounded-2xl text-base shadow-lg shadow-cyan-950/60"
          >
            <span className="text-xl">🏰</span>
            Build Kingdom
          </button>
        </div>
      </section>
    </main>
  );
}
