"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const recallQuestions = [
  { id: 1, question: "Why is the cornea transparent?", answer: "Collagen fibrils in the stroma are homogeneous in diameter and aligned at a constant spacing shorter than the wavelength of visible light — this causes destructive interference of scattered light, allowing transmission. Avascularity also prevents light scattering from red blood cells." },
  { id: 2, question: "What are the 5 layers of the cornea from anterior to posterior?", answer: "Epithelium → Bowman layer → Stroma → Descemet membrane → Endothelium. (Mnemonic: Every Bad Student Deserves Education)" },
  { id: 3, question: "What fraction of the eye's total refractive power does the cornea contribute?", answer: "More than two-thirds (~67%) of total refractive power. The lens accounts for the remaining ~33%." },
  { id: 4, question: "Where do corneal epithelial stem cells reside and what is the XYZ model?", answer: "Limbal stem cells reside in the basal layer at the palisades of Vogt. XYZ model: X = basal cell proliferation, Y = centripetal migration of transient amplifying cells, Z = desquamation. Z = X + Y must be maintained for homeostasis." },
  { id: 5, question: "How does the corneal endothelium maintain stromal transparency?", answer: "Via active fluid pumping (Na⁺/K⁺-ATPase and bicarbonate transport) that counteracts osmotic imbibition of water into the stroma. Failure causes stromal swelling → collagen fibril disruption → opacity and bullous keratopathy." },
  { id: 6, question: "What nerve supplies corneal sensation and what happens when it is damaged?", answer: "Ophthalmic division of the trigeminal nerve (CN V1) via long ciliary nerves. Damage causes neurotrophic keratopathy — painless persistent epithelial defects that fail to heal due to loss of trophic neuropeptides (substance P, IGF-1) and reduced blink reflex." },
  { id: 7, question: "What are the 3 essential functions of the tear film?", answer: "Lubrication (prevents mechanical damage from blinking), Protection (antimicrobial proteins: lysozyme, lactoferrin, IgA), and Refraction (provides the first and smoothest refracting surface of the eye — irregularities cause visual distortion)." },
  { id: 8, question: "What is the primary structural component of the corneal stroma and what percentage of corneal dry weight is it?", answer: "Type I collagen, constituting more than 70% of corneal dry weight. Proteoglycans (keratan sulfate, dermatan sulfate) fill the spaces between fibrils and regulate fibril diameter and spacing — critical for transparency." },
  { id: 9, question: "What is the physiologic role of the Bowman layer?", answer: "Its role remains unclear — many mammals lack a Bowman layer yet have normal corneal epithelial structure. It does NOT regenerate after injury. It may provide mechanical resistance and act as a barrier to epithelial downgrowth." },
  { id: 10, question: "Why can the cornea survive without blood vessels?", answer: "Oxygen arrives via the tear film (from atmosphere anteriorly) and from aqueous humor (posteriorly). Nutrients diffuse from limbal vessels at the periphery and from aqueous humor. Avascularity is essential — vessels would scatter light and destroy transparency." },
  { id: 11, question: "What are the key differences between the corneal and conjunctival epithelium?", answer: "Corneal epithelium is non-keratinized, stratified squamous (5–7 cell layers), with no goblet cells and tight junctions forming an effective barrier. Conjunctival epithelium is non-keratinizing stratified columnar/squamous with goblet cells (secrete MUC5AC) and is more permeable — used for drug absorption." },
  { id: 12, question: "What is the role of conjunctival goblet cells and what happens when they are lost?", answer: "Goblet cells secrete soluble mucin MUC5AC, which is the primary gel-forming mucin of the tear film. Loss (as in Stevens-Johnson syndrome, cicatricial pemphigoid, chemical burns) causes mucin-deficient dry eye with poor tear film stability despite adequate aqueous production." },
  { id: 13, question: "What is tear film osmolarity and why is it clinically important?", answer: "Normal tear osmolarity is ~305 mOsm/L. In dry eye disease, reduced aqueous production or increased evaporation leads to hyperosmolarity (>308 mOsm/L). Hyperosmolarity activates MAP kinase and NF-κB pathways → inflammatory cytokines → epithelial damage → perpetuates the vicious cycle of dry eye." },
  { id: 14, question: "What are the three layers of the tear film and what does each contribute?", answer: "Lipid layer (outermost, from meibomian glands): prevents evaporation, provides surface tension. Aqueous layer (middle, from lacrimal gland): contains electrolytes, growth factors, antibodies, oxygen. Mucin layer (innermost, from goblet cells): converts hydrophobic epithelial surface to hydrophilic, anchors tear film." },
  { id: 15, question: "What collagen types are found in the corneal stroma and what are their roles?", answer: "Type I collagen (major structural component, ~70% dry weight), Type V collagen (regulates fibril diameter — critical for transparency), Type VI collagen (anchors keratocytes to matrix). Type IV collagen is in Descemet membrane and basement membranes, not the stroma proper." },
  { id: 16, question: "What is the limbal stem cell niche and what structures comprise it?", answer: "The limbal stem cell niche is the microenvironment that maintains LSC quiescence and self-renewal. It includes: palisades of Vogt (interdigitations of limbal stroma), limbal epithelial crypts (proposed actual niche site), rich vascular and neural supply, and stromal mesenchymal cells that provide growth factors and ECM signals." },
  { id: 17, question: "What is the embryological origin of the corneal stroma, endothelium, and Descemet membrane?", answer: "All three derive from neural crest cells (neuroectoderm). The corneal epithelium derives from surface ectoderm. Understanding this is key: congenital anomalies like Peters anomaly, Axenfeld-Rieger syndrome, and congenital hereditary endothelial dystrophy (CHED) all involve neural crest cell dysfunction." },
  { id: 18, question: "How do keratocytes respond to corneal injury and what determines whether healing or scarring occurs?", answer: "Injured epithelium releases IL-1 and FasL → keratocyte apoptosis in wound zone → quiescent keratocytes activate into fibroblasts → if TGF-β is high (e.g., deep stromal wound), fibroblasts transdifferentiate to myofibroblasts → αSMA expression → opaque scar. Low TGF-β → transparent repair." },
  { id: 19, question: "What is the corneal endothelial cell density at birth vs. normal adult, and what is the threshold for decompensation?", answer: "At birth: ~3,500–4,000 cells/mm². Normal adult: ~2,000–2,500 cells/mm². Decompensation threshold: ~500 cells/mm² (though this varies). Endothelial cells do NOT proliferate in vivo — they spread and enlarge to compensate for cell loss (polymegethism and pleomorphism)." },
  { id: 20, question: "What is the role of matrix metalloproteinases (MMPs) in corneal disease?", answer: "MMPs (especially MMP-1, -2, -9) degrade stromal collagen. In normal wound healing, MMPs facilitate epithelial migration. In pathology: excess MMP-9 in dry eye disease damages the epithelial glycocalyx; Pseudomonas and S. aureus activate MMPs causing rapid stromal melting (keratolysis). MMP inhibition (doxycycline, EDTA) is used therapeutically." },
  { id: 21, question: "What nerve fibers terminate in the corneal epithelium and at what cell layer?", answer: "Long ciliary nerves (from CN V1) enter the deep peripheral stroma radially, lose myelination near the limbus, course anteriorly, penetrate Bowman layer, and form a subepithelial plexus. Free nerve endings terminate at the wing cell level of the epithelium — making the cornea the most densely innervated surface tissue in the body." },
  { id: 22, question: "What is substance P and what is its role in corneal physiology?", answer: "Substance P is a neuropeptide released by trigeminal nerve endings in the cornea. It promotes epithelial cell migration, proliferation, and adhesion to fibronectin — essential for wound healing. Trigeminal nerve damage → depletion of substance P → impaired epithelial healing → neurotrophic keratopathy." },
  { id: 23, question: "What distinguishes the lipid layer composition of the tear film and which glands produce it?", answer: "Meibomian glands (modified sebaceous glands in the tarsal plate) secrete meibum. It contains ~95% nonpolar lipids (wax esters, cholesterol esters) and ~5% amphipathic lipids (OAHFAs — the major surfactants). Meibomian gland dysfunction (MGD) → evaporative dry eye, the most common dry eye subtype." },
  { id: 24, question: "What is the plica semilunaris and what is its clinical relevance?", answer: "The plica semilunaris is a crescent-shaped fold of conjunctiva at the medial canthus, representing the vestigial third eyelid (nictitating membrane). Fine fibrous strips from the medial rectus insert into it. It accommodates eye movement in adduction. Foreign bodies frequently lodge here — always evert and inspect." },
  { id: 25, question: "What proteoglycans are present in the corneal stroma and what is their function?", answer: "Keratan sulfate proteoglycans (lumican, keratocan, mimecan) and dermatan sulfate proteoglycans (decorin, biglycan). They regulate collagen fibril diameter and interfibrillar spacing — critical for maintaining the precise arrangement needed for transparency. In corneal scarring, proteoglycan composition changes → disrupted fibril arrangement → opacity." },
];

export default function PartPage() {
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
        <Link href="/topic/cornea/books/cornea-mannis" className="text-slate-400 hover:text-white transition-colors text-sm">
          ← Cornea (Mannis)
        </Link>
        <span className="text-slate-700">|</span>
        <div>
          <h1 className="text-base font-semibold leading-tight">Part 1: Basic Science</h1>
          <p className="text-xs text-slate-500">Cornea · Sclera · Ocular Adnexa · Anatomy · Physiology</p>
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
          <p className="text-xs text-slate-600 mb-6">Each session gives you a fresh set of questions. Correct answers earn XP and grow your kingdom.</p>
          <button
            onClick={() => router.push("/topic/cornea/books/cornea-mannis/part1/mcq")}
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
