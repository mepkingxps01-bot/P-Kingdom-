"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

const questionPool: Question[] = [
  {
    id: 1,
    question: "A 58-year-old with herpes zoster ophthalmicus has a painless corneal ulcer unresponsive to antibiotics. Corneal sensation is absent. Which mechanism best explains the non-healing?",
    options: ["Viral replication causing direct cytopathic epithelial damage", "Loss of trophic neuropeptides (substance P, IGF-1) impairing epithelial maintenance", "Autoimmune T-cell destruction of limbal stem cells", "Endothelial pump failure causing epithelial edema"],
    correct: 1,
    explanation: "Neurotrophic keratopathy results from trigeminal denervation. Corneal nerves provide trophic support (substance P, IGF-1) essential for epithelial healing — not just sensation. The painless nature is the diagnostic key. Antibiotics are ineffective because the pathology is neurogenic, not infectious.",
  },
  {
    id: 2,
    question: "A researcher notes that unlike sclera, corneal stroma is transparent despite being primarily collagen. Which structural property is MOST responsible?",
    options: ["Absence of proteoglycans between fibrils", "Uniform fibril diameter and spacing less than half the wavelength of visible light", "High stromal water content preventing light absorption", "Large-diameter fibrils oriented parallel to the visual axis"],
    correct: 1,
    explanation: "Transparency requires destructive interference of scattered light waves. This occurs only when fibrils are uniform in diameter and spaced at distances <200 nm (less than half wavelength of visible light ~400 nm). Scleral fibrils are irregular in diameter and randomly spaced — hence opaque.",
  },
  {
    id: 3,
    question: "A 72-year-old with Fuchs endothelial dystrophy has diffuse guttae and microcystic epithelial edema. Why does endothelial failure cause epithelial changes?",
    options: ["Endothelial cytokines directly disrupt epithelial tight junctions", "Failed Na⁺/K⁺-ATPase pump causes stromal water accumulation propagating anteriorly", "Descemet membrane rupture allows aqueous to flood the stroma", "Reduced aqueous production depletes epithelial nutrients"],
    correct: 1,
    explanation: "The endothelium actively pumps fluid into the anterior chamber against an osmotic gradient. Failure (Fuchs) allows water to accumulate in the stroma. Edema propagates anteriorly: stromal edema → subepithelial bullae → microcystic epithelial edema → painful bullous keratopathy in advanced stages.",
  },
  {
    id: 4,
    question: "A 35-year-old with Stevens-Johnson syndrome develops corneal pannus and vascularization. What is the MOST direct cause?",
    options: ["Inflammatory cytokines stimulate corneal stromal angiogenesis", "Limbal stem cell destruction allows vascularized conjunctival epithelium to invade the cornea", "Collagen disorganization after erosions permits vessel ingrowth", "Endothelial failure causes hypoxic stimulus for neovascularization"],
    correct: 1,
    explanation: "Limbal stem cells act as a barrier preventing conjunctival epithelial migration onto the cornea. When destroyed (LSCD from SJS, chemical burns, aniridia), conjunctival cells — which bring their native vasculature — invade the corneal surface. This is the hallmark of LSCD: pannus, vascularization, and conjunctivalization.",
  },
  {
    id: 5,
    question: "A contact lens wearer presents with a Pseudomonas corneal ulcer. Which component of the corneal defense barrier was MOST likely breached?",
    options: ["Corneal endothelium — primary immune barrier", "Bowman layer — blocks bacterial penetration into stroma", "Epithelial tight junctions and antimicrobial tear film proteins", "Stromal keratocytes — normally phagocytose bacteria"],
    correct: 2,
    explanation: "The corneal epithelium and tear film (lysozyme, lactoferrin, IgA) form the primary defense. Contact lens wear disrupts this via microtrauma, hypoxia, and altered tear dynamics. Pseudomonas uniquely secretes collagenase and exotoxins that cause rapid stromal melt once the epithelial barrier is breached.",
  },
  {
    id: 6,
    question: "A 19-year-old sustains a sodium hydroxide (alkali) ocular burn. Why is alkali more penetrating and destructive than acid?",
    options: ["Alkali has a higher molecular weight allowing deeper tissue penetration", "Alkali causes saponification of membrane lipids, enabling continued penetration without self-limiting protein precipitation", "Alkali activates corneal MMP-9 while acid does not", "Alkali selectively destroys Bowman layer, removing the natural barrier to deeper penetration"],
    correct: 1,
    explanation: "Acid burns cause protein precipitation at the injury site that limits further penetration (self-limiting). Alkali saponifies cell membrane lipids, allowing continued penetration into deeper structures including the anterior chamber. This is why alkali burns are ophthalmic emergencies requiring immediate and prolonged irrigation.",
  },
  {
    id: 7,
    question: "A patient has Fuchs dystrophy with endothelial cell density of 450 cells/mm². A normal young adult has approximately how many endothelial cells/mm²?",
    options: ["500–800 cells/mm²", "2,000–2,500 cells/mm²", "4,000–5,000 cells/mm²", "8,000–10,000 cells/mm²"],
    correct: 1,
    explanation: "Normal adult corneal endothelial density is ~2,000–2,500 cells/mm². Decompensation typically occurs below ~500 cells/mm². Critically, endothelial cells do NOT regenerate in vivo — remaining cells spread and enlarge (polymegethism and pleomorphism) to cover the defect, reducing functional reserve further.",
  },
  {
    id: 8,
    question: "A 28-year-old with aniridia (PAX6 mutation) develops corneal pannus. What is the primary pathophysiology?",
    options: ["PAX6 mutation causes primary endothelial dysfunction", "PAX6 haploinsufficiency results in qualitatively abnormal limbal stem cells unable to maintain the corneal surface", "Iris absence exposes cornea to UV phototoxicity", "PAX6 mutation disrupts type I collagen synthesis"],
    correct: 1,
    explanation: "PAX6 is the master transcription factor for ocular development. PAX6 haploinsufficiency (aniridia) causes qualitatively deficient LSCs — they lack normal self-renewal capacity. The corneal surface degenerates over years, leading to LSCD with pannus and conjunctivalization — a major cause of vision loss independent of the iris defect.",
  },
  {
    id: 9,
    question: "A researcher studies corneal wound healing and observes that keratocytes near the wound undergo apoptosis within 6 hours. What triggers this?",
    options: ["Direct mechanical trauma from the injury", "IL-1α and FasL released from wounded epithelial cells signal keratocyte apoptosis", "Aqueous humor cytokines reaching the stroma via endothelial gaps", "Reactive oxygen species from neutrophils infiltrating the wound"],
    correct: 1,
    explanation: "Injured corneal epithelium releases IL-1α (stored in epithelial cells) and FasL, which diffuse into the stroma and trigger keratocyte apoptosis within hours. This clears the wound zone for subsequent keratocyte repopulation by peripheral cells. Dysregulation — excess TGF-β — drives myofibroblast transformation and stromal haze.",
  },
  {
    id: 10,
    question: "An ophthalmology resident notes corneal nerve fibers lose their myelination shortly after entering the cornea. What is the clinical significance of this?",
    options: ["Demyelinated fibers transmit only pain, not touch or temperature", "Unmyelinated corneal nerve endings allow confocal microscopy visualization and explain why corneal sensation is purely via free nerve endings", "Loss of myelin prevents viral spread along corneal nerves", "Demyelination increases nerve fiber vulnerability to herpes simplex virus latency"],
    correct: 1,
    explanation: "Corneal nerve fibers lose their myelin sheath within 1–2 mm of limbal entry. This means all corneal innervation is via unmyelinated free nerve endings (the densest in the body). These can be visualized in vivo by confocal microscopy. Their loss correlates directly with decreased corneal sensation.",
  },
  {
    id: 11,
    question: "A dry eye patient has normal Schirmer test results but severely reduced tear film breakup time (TBUT < 5 seconds). Which layer of the tear film is MOST likely deficient?",
    options: ["Aqueous layer — from lacrimal gland", "Mucin layer — from conjunctival goblet cells", "Lipid layer — from meibomian glands", "Electrolyte component — from accessory lacrimal glands"],
    correct: 2,
    explanation: "Normal aqueous production (normal Schirmer) with rapid tear film breakup indicates evaporative dry eye due to meibomian gland dysfunction (MGD). The lipid layer prevents aqueous evaporation. Without it, tears evaporate rapidly → TBUT shortens → hyperosmolarity → ocular surface inflammation. MGD is the most common cause of dry eye.",
  },
  {
    id: 12,
    question: "During corneal transplant surgery, the surgeon notes the recipient stroma appears hazy with an irregular surface. Histology shows disrupted proteoglycan composition. Which proteoglycans are normally critical for stromal transparency?",
    options: ["Aggrecan and versican (large aggregating proteoglycans)", "Lumican and keratocan (small leucine-rich keratan sulfate proteoglycans)", "Perlecan and agrin (heparan sulfate proteoglycans)", "Syndecan and glypican (membrane-bound proteoglycans)"],
    correct: 1,
    explanation: "Lumican and keratocan are the predominant corneal keratan sulfate proteoglycans. They regulate collagen fibril diameter and interfibrillar spacing. In corneal scars, proteoglycan composition reverts to non-corneal types (dermatan sulfate), disrupting fibril spacing → opacity. This is the molecular basis of corneal scarring.",
  },
  {
    id: 13,
    question: "A 45-year-old woman with Sjögren syndrome has severe dry eye with markedly reduced goblet cells on impression cytology. Which mucin is MOST critically depleted?",
    options: ["MUC1 (transmembrane mucin of corneal glycocalyx)", "MUC5AC (secreted gel-forming mucin from goblet cells)", "MUC16 (transmembrane mucin providing barrier function)", "MUC4 (transmembrane mucin of conjunctival glycocalyx)"],
    correct: 1,
    explanation: "MUC5AC is the primary gel-forming secreted mucin of the tear film, produced exclusively by conjunctival goblet cells. It is responsible for tear film viscosity and stability. Its depletion in Sjögren syndrome (immune-mediated goblet cell destruction) causes mucin-deficient dry eye with poor TBUT despite relatively preserved aqueous production.",
  },
  {
    id: 14,
    question: "A 55-year-old man develops corneal melt (keratolysis) following a Pseudomonas ulcer despite 48 hours of fluoroquinolone therapy. Which pathophysiologic mechanism is driving the rapid stromal destruction?",
    options: ["Continued Pseudomonas replication producing direct proteolytic enzymes", "Pseudomonas-activated plasmin generates MMP-1 from infected myofibroblasts, synergistically degrading stromal collagen", "Neutrophil-derived reactive oxygen species degrading collagen fibrils", "IL-1-mediated keratocyte apoptosis leaving acellular stroma susceptible to autolysis"],
    correct: 1,
    explanation: "S. aureus and Pseudomonas activate the plasminogen/plasmin system in the cornea. Plasmin directly degrades ECM but also activates MMP-1 from myofibroblasts, creating a cascade of collagen destruction. This explains why bacterial keratitis can rapidly progress to perforation even with appropriate antibiotics — the inflammatory cascade must also be targeted.",
  },
  {
    id: 15,
    question: "A 32-year-old undergoes PRK for myopia correction. Six weeks postoperatively, she develops subepithelial haze. What cellular event is MOST responsible?",
    options: ["Persistent epithelial defect releasing proteases that degrade Bowman layer", "TGF-β diffusing from tears drives keratocyte-to-myofibroblast transformation in the anterior stroma", "Epithelial hyperplasia filling the ablation zone and scattering light", "Inadequate keratocyte repopulation leaving acellular stroma that scatters light"],
    correct: 1,
    explanation: "PRK disrupts Bowman layer, allowing TGF-β from tears to penetrate the anterior stroma. TGF-β drives keratocyte differentiation into myofibroblasts (α-SMA positive), which produce disorganized ECM — opaque subepithelial haze. LASIK creates a stromal flap preserving Bowman layer, reducing TGF-β access — hence less haze.",
  },
  {
    id: 16,
    question: "Tear film osmolarity is measured at 320 mOsm/L (normal <308 mOsm/L). This hyperosmolarity initiates which inflammatory cascade?",
    options: ["Complement activation via the lectin pathway targeting goblet cell surface antigens", "Activation of MAP kinase (p38, JNK) and NF-κB pathways releasing IL-1, TNF-α, and MMP-9", "TLR-4 activation by osmotic stress proteins triggering innate immune response", "NLRP3 inflammasome activation releasing IL-18 from epithelial cells"],
    correct: 1,
    explanation: "Tear hyperosmolarity directly activates MAP kinase signaling (p38, JNK, ERK) and NF-κB in corneal epithelial cells. This releases pro-inflammatory cytokines (IL-1, TNF-α) and MMP-9, which degrades the epithelial glycocalyx. The resulting epithelial damage increases evaporation → further hyperosmolarity — the vicious cycle of dry eye disease.",
  },
  {
    id: 17,
    question: "Which statement best describes the embryological origin of the corneal endothelium?",
    options: ["Mesoderm — endothelium shares lineage with vascular endothelium throughout the body", "Neural crest cells (neuroectoderm) — which also form the stroma and Descemet membrane", "Surface ectoderm — the same origin as the corneal epithelium", "Periocular mesenchyme of mixed mesodermal and neural crest origin"],
    correct: 1,
    explanation: "The corneal endothelium, stroma, and Descemet membrane all derive from neural crest cells that migrate into the anterior segment during weeks 5–8 of gestation. This explains why conditions affecting neural crest development (Peters anomaly, Axenfeld-Rieger, CHED) involve both endothelium and stroma simultaneously.",
  },
  {
    id: 18,
    question: "A patient with cicatricial pemphigoid has severe conjunctival scarring with subconjunctival fibrosis. Which mechanism best explains the progressive scarring?",
    options: ["IgG autoantibodies against BP180 causing direct conjunctival cell lysis", "Chronic TGF-β release from injured epithelium driving subconjunctival fibroblast-to-myofibroblast transformation", "Complement-mediated destruction of goblet cells releasing pro-fibrotic signals", "IL-17-mediated neutrophil infiltration causing proteolytic degradation and subsequent fibrosis"],
    correct: 1,
    explanation: "In mucous membrane pemphigoid, autoantibody-mediated epithelial injury persistently releases TGF-β. This drives subconjunctival fibroblasts to myofibroblasts, which contract and deposit disorganized collagen — producing the symblepharon, fornix shortening, and entropion characteristic of advanced disease.",
  },
  {
    id: 19,
    question: "Confocal microscopy in a patient with keratoconus shows reduced subbasal nerve plexus density. Which clinical finding would you MOST expect?",
    options: ["Increased intraocular pressure from impaired aqueous outflow", "Reduced corneal sensation with paradoxically increased pain sensitivity (neuropathic pain)", "Elevated corneal endothelial cell density compensating for nerve loss", "Decreased corneal transparency due to nerve-induced collagen changes"],
    correct: 1,
    explanation: "Reduced subbasal nerve plexus density in keratoconus correlates with decreased corneal sensation (esthesiometry). Paradoxically, neuropathic changes can cause heightened pain sensitivity (allodynia) even with reduced mechanical sensation. This is clinically relevant — reduced sensation may mask contact lens complications.",
  },
  {
    id: 20,
    question: "A surgeon plans to harvest a conjunctival autograft for pterygium surgery. The graft is taken from the superotemporal bulbar conjunctiva. Which cell type in the graft is MOST responsible for its success in preventing recurrence?",
    options: ["Conjunctival fibroblasts providing structural support", "Limbal epithelial stem cells and their trophic influence on the ocular surface", "Goblet cells restoring mucin production to the pterygium bed", "Antigen-presenting Langerhans cells preventing UV-mediated recurrence"],
    correct: 1,
    explanation: "Conjunctival autograft success depends critically on including limbal tissue from the graft margin. Limbal stem cells transferred with the graft repopulate the surgical site and prevent conjunctival epithelium from re-growing over the cornea. Bare sclera techniques have high recurrence; autografts including limbal tissue have the lowest recurrence rates.",
  },
  {
    id: 21,
    question: "Which statement about the Bowman layer is CORRECT?",
    options: ["It is a true basement membrane secreted by the basal epithelial cells", "It is an acellular condensation of the anterior stroma that does not regenerate after injury", "It plays an essential role in corneal transparency that has been confirmed in all mammalian species studied", "It contains type IV collagen as its primary structural component"],
    correct: 1,
    explanation: "The Bowman layer is an acellular condensation of the anterior stroma — not a true basement membrane. It does NOT regenerate after injury (replaced by fibrous tissue/scar). Many mammals (rabbits, cats) lack a Bowman layer yet have normal corneal structure, suggesting it is not essential for transparency or epithelial organization.",
  },
  {
    id: 22,
    question: "A patient has severe aqueous deficient dry eye from lacrimal gland destruction. Measurement shows tear film thickness of 1.5 µm (normal 2–5.5 µm). What is the MOST important consequence for corneal function?",
    options: ["Reduced oxygen delivery causing hypoxic epithelial damage", "Increased exposure to environmental UV radiation causing photokeratitis", "Disruption of the first refracting surface causing irregular astigmatism and visual distortion", "Loss of IgA allowing bacterial colonization of the corneal surface"],
    correct: 2,
    explanation: "The tear film is the FIRST refracting surface light encounters. Even minor irregularities in tear film quality dramatically degrade optical quality (measured by double-pass aberrometry). This is why dry eye patients complain of fluctuating vision that improves transiently after blinking — the blink restores a smooth refracting surface.",
  },
  {
    id: 23,
    question: "A 60-year-old diabetic patient has delayed corneal epithelial healing after cataract surgery. Which factor MOST directly explains his impaired epithelial wound healing?",
    options: ["Hyperglycemia reducing epithelial cell glycolysis and ATP production", "Diabetic autonomic neuropathy reducing corneal nerve density and trophic factor release", "Advanced glycation end-products cross-linking Bowman layer collagen, impeding cell migration", "Hyperglycemia-induced overexpression of MMP-9 degrading the epithelial basement membrane"],
    correct: 1,
    explanation: "Diabetic keratopathy is primarily a neurotrophic condition. Diabetes causes corneal neuropathy (reduced subbasal nerve density correlating with peripheral neuropathy severity) → reduced substance P, NGF, and IGF-1 → impaired epithelial proliferation and migration. This explains the high rate of epithelial complications in diabetic patients after any ocular surgery.",
  },
  {
    id: 24,
    question: "The stroma constitutes what percentage of total corneal thickness?",
    options: ["50%", "70%", "90%", "95%"],
    correct: 2,
    explanation: "The stroma constitutes more than 90% of total corneal thickness — approximately 500 µm of the ~550 µm total. It consists of ~200 collagen lamellae, each containing parallel fibrils at angles to adjacent lamellae. This orthogonal arrangement provides mechanical strength while maintaining the precise fibril spacing required for transparency.",
  },
  {
    id: 25,
    question: "A patient undergoes total conjunctival resection for ocular surface squamous neoplasia. Postoperatively, she develops persistent epithelial defects and dry eye. Which function of the conjunctiva is MOST responsible for these complications?",
    options: ["Conjunctival vascular supply to the avascular limbus", "Goblet cell mucin secretion and limbal stem cell reservoir support", "Lymphatic drainage preventing corneal edema", "Immune surveillance via subepithelial lymphocytes"],
    correct: 1,
    explanation: "The conjunctiva provides two critical functions lost with resection: goblet cells (MUC5AC for tear film stability) and the limbal niche microenvironment that supports LSCs. Without goblet cell mucins, the tear film destabilizes. Without conjunctival support of the limbal niche, LSC function is compromised — causing epithelial instability and persistent defects.",
  },
  {
    id: 26,
    question: "In the XYZ model of corneal epithelial homeostasis, what happens if Y (centripetal movement) ceases while X (proliferation) continues?",
    options: ["The epithelium thins centrally and accumulates excess cells peripherally", "Central epithelial cells accumulate, become dysplastic, and develop features of squamous metaplasia", "Limbal stem cells exhaust prematurely due to compensatory overproliferation", "The Z component (desquamation) increases to compensate, maintaining overall balance"],
    correct: 2,
    explanation: "If centripetal movement stops (e.g., limbal stem cell deficiency) while basal cells still proliferate, LSCs are forced into excessive asymmetric division without the normal amplifying cell migration to distribute the load. This depletes the LSC pool prematurely — the basis of iatrogenic LSCD from repeated pterygium surgery or chronic topical medication toxicity.",
  },
  {
    id: 27,
    question: "A corneal specimen shows disrupted collagen fibril arrangement with areas of fibril fusion and irregular spacing. Which corneal disease does this pattern MOST suggest?",
    options: ["Keratoconus — characterized by fibril thinning and proteoglycan loss", "Fuchs endothelial dystrophy — characterized by posterior collagen deposition (guttae)", "Lattice corneal dystrophy — characterized by amyloid deposits distorting fibril arrangement", "Macular corneal dystrophy — caused by defective keratan sulfate synthesis disrupting fibril spacing"],
    correct: 3,
    explanation: "Macular corneal dystrophy (CHST6 mutation) impairs keratan sulfate sulfation → defective proteoglycans cannot maintain normal fibril spacing → fibrils are irregular in diameter and spacing throughout the full stromal thickness → diffuse stromal haze from birth. Unlike granular/lattice dystrophies, macular involves the full stroma and has autosomal recessive inheritance.",
  },
  {
    id: 28,
    question: "A patient reports that their vision improves for a few seconds after each blink then gradually blurs until the next blink. Which diagnostic test would MOST specifically quantify this complaint?",
    options: ["Schirmer test — measures aqueous tear production volume", "Tear film breakup time (TBUT) — measures time to first dry spot formation", "Tear osmolarity — measures electrolyte concentration imbalance", "Impression cytology — measures goblet cell density"],
    correct: 1,
    explanation: "The described symptom is classic for evaporative dry eye — tear film instability causing visual fluctuation. TBUT directly measures this: fluorescein is instilled, the patient blinks once and holds open; the time to first dark spot (dry area) is measured. Normal TBUT >10 seconds; <5 seconds indicates significant instability.",
  },
  {
    id: 29,
    question: "Which collagen type is the primary component of Descemet membrane and the corneal basement membranes?",
    options: ["Type I collagen — the same as the bulk stroma", "Type IV collagen — the characteristic collagen of all basement membranes", "Type VII collagen — anchoring fibrils at the epithelial-stromal junction", "Type XVIII collagen — providing anti-angiogenic properties"],
    correct: 1,
    explanation: "Type IV collagen is the characteristic collagen of all basement membranes in the body, forming a sheet-like network rather than fibrils. Descemet membrane (the endothelial basement membrane) thickens throughout life from ~3 µm at birth to ~10–12 µm in adults, and continues to thicken abnormally in Fuchs dystrophy (producing guttae) and CHED.",
  },
  {
    id: 30,
    question: "A 40-year-old patient develops neurotrophic keratopathy following acoustic neuroma resection. Which treatment directly targets the pathophysiologic mechanism of non-healing?",
    options: ["Topical fluoroquinolone to prevent superinfection of the epithelial defect", "Cenegermin (recombinant human nerve growth factor) eye drops to restore epithelial trophic support", "Topical corticosteroids to reduce neurogenic inflammation", "Amniotic membrane transplant to provide a structural scaffold for epithelial migration"],
    correct: 1,
    explanation: "Cenegermin (recombinant human NGF, Oxervate) directly replaces the trophic support lost after trigeminal nerve damage. NGF binds TrkA receptors on corneal epithelial cells, promoting proliferation, differentiation, and migration. It received FDA approval in 2018 as the first drug specifically targeting the pathophysiology of neurotrophic keratopathy.",
  },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MCQPage() {
  const questions = useMemo(() => shuffle(questionPool).slice(0, 10), []);
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qId: number, optIdx: number) => {
    if (submitted) return;
    setSelected((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    const correct = questions.filter((q) => selected[q.id] === q.correct).length;
    const earned = questions.reduce((acc, q) => acc + (selected[q.id] === q.correct ? 3 : 1), 0)
      + (correct === questions.length ? 20 : correct >= 8 ? 10 : 0);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from("xp").select("cornea_xp").eq("user_id", user.id).single();
      const prev = data?.cornea_xp ?? 0;
      await supabase.from("xp").upsert({ user_id: user.id, cornea_xp: prev + earned, updated_at: new Date().toISOString() });
    }
  };

  const correctCount = questions.filter((q) => selected[q.id] === q.correct).length;
  const xp = questions.reduce((acc, q) => acc + (selected[q.id] === q.correct ? 3 : 1), 0)
    + (correctCount === questions.length ? 20 : correctCount >= 8 ? 10 : 0);
  const answered = Object.keys(selected).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center gap-3">
        <Link href="/topic/cornea/books/cornea-mannis/part1" className="text-slate-400 hover:text-white transition-colors text-sm">
          ← Recall Questions
        </Link>
        <span className="text-slate-700">|</span>
        <div className="flex items-center gap-2">
          <span className="text-lg">🏰</span>
          <h1 className="text-base font-semibold">Build Kingdom — Board Exam MCQ</h1>
        </div>
        {!submitted && (
          <span className="ml-auto text-xs text-slate-500">{answered}/{questions.length} answered</span>
        )}
      </header>

      <section className="max-w-2xl mx-auto px-6 py-8">
        {!submitted && (
          <div className="text-xs text-slate-500 mb-8 border border-slate-800 rounded-lg px-4 py-3 bg-slate-900/50">
            ⚡ Board-level clinical vignettes · 10 questions selected randomly from a pool of {questionPool.length} · fresh set every session
            <span className="ml-2 text-cyan-400">+3 XP per correct · +20 XP bonus for perfect score</span>
          </div>
        )}

        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q.id} className={`bg-slate-900 border rounded-xl p-5 transition-colors ${submitted && selected[q.id] === q.correct ? "border-green-800/50" : submitted && selected[q.id] !== undefined && selected[q.id] !== q.correct ? "border-red-900/50" : "border-slate-800"}`}>
              <p className="text-sm font-medium leading-relaxed mb-4">
                <span className="text-slate-500 mr-2">{idx + 1}.</span>
                {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, i) => {
                  const isSelected = selected[q.id] === i;
                  const isCorrect = i === q.correct;
                  let style = "border-slate-700 text-slate-300 hover:border-cyan-700 hover:bg-cyan-950/20 cursor-pointer";
                  if (submitted) {
                    if (isCorrect) style = "border-green-600 bg-green-950/40 text-green-200 font-medium cursor-default";
                    else if (isSelected) style = "border-red-600 bg-red-950/40 text-red-300 cursor-default";
                    else style = "border-slate-800 text-slate-600 cursor-default";
                  } else if (isSelected) {
                    style = "border-cyan-500 bg-cyan-950/30 text-cyan-200";
                  }
                  return (
                    <button key={i} onClick={() => handleSelect(q.id, i)} className={`w-full text-left text-sm px-4 py-3 rounded-lg border transition-all ${style}`}>
                      <span className="text-slate-500 mr-2 font-mono">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <div className="mt-4 pt-3 border-t border-slate-700">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <span className="text-cyan-400 font-medium">Explanation: </span>{q.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {!submitted ? (
          <button onClick={handleSubmit} disabled={answered < questions.length} className="mt-8 w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all text-white font-bold py-4 rounded-xl text-sm">
            {answered < questions.length ? `Answer all questions (${answered}/${questions.length})` : "Submit Answers"}
          </button>
        ) : (
          <div className="mt-8 bg-slate-900 border border-cyan-800/40 rounded-2xl p-8 text-center">
            <p className="text-4xl mb-3">🏰</p>
            <p className="text-2xl font-bold text-cyan-300 mb-1">+{xp} XP earned!</p>
            <p className="text-sm text-slate-400 mb-1">
              {correctCount}/{questions.length} correct
              {correctCount === questions.length && " — Perfect score! 🎉"}
              {correctCount >= 8 && correctCount < questions.length && " — Great job!"}
              {correctCount < 8 && " — Keep studying!"}
            </p>
            <p className="text-xs text-slate-600 mb-6">Your Cornea Kingdom has grown.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/topic/cornea" className="bg-cyan-600 hover:bg-cyan-500 transition-colors text-white text-sm font-semibold px-6 py-3 rounded-xl">
                View Kingdom
              </Link>
              <Link href="/topic/cornea/books/cornea-mannis/part1/mcq" className="border border-slate-700 hover:border-slate-500 transition-colors text-slate-300 text-sm px-6 py-3 rounded-xl">
                New Questions
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
