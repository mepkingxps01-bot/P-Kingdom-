// MEQ (Modified Essay Question) mock exam — Neuro-Ophthalmology + Uveitis.
// Blueprint: 11 stations, 200 marks, 2 hours. Each station is a case that
// unfolds part by part; a part's `reveal` (new information) is shown only after
// the previous part has been answered. Every part carries its model answer as a
// marking scheme (`key`), shown at the end of that part once it is submitted.
//
// Sources: CMU lecture decks 2026 — Neuro-ophthalmic Emergency, Pupillary
// Disorders, EOM Abnormalities/Diplopia (L. Hansapinyo); Optic Nerve Diseases,
// Eyelid & Facial Abnormality, Common Drug Use in Neuro-oph (P. Kulniwatcharoen);
// Common Uveitic Diseases (K. Pathanapitoon); Posterior Uveitis; Complications
// of Uveitis (A. Apivatthakakul); AAO BCSC Sections 5 & 9.
// Images under /public/meq are cropped from those decks.

export type MeqImage = { src: string; caption: string };

// One line of the marking scheme. `marks` is the maximum for that line; the
// self-marking UI lets the candidate award 0…marks (partial credit).
export type MeqKey = { point: string; marks: number };

export type MeqPart = {
  id: string;
  reveal?: string; // new information shown before this part's question
  images?: MeqImage[];
  prompt: string;
  marks: number;
  key: MeqKey[];
  pearl?: string; // teaching note shown under the marking scheme
};

export type MeqStation = {
  no: number;
  slug: string;
  title: string;
  kingdom: "neuro-oph" | "uveitis";
  marks: number;
  minutes: number; // suggested time, proportional to marks (120 min / 200 marks)
  stem: string;
  images?: MeqImage[];
  parts: MeqPart[];
};

export const MEQ_DURATION_MIN = 120;

export const MEQ_STATIONS: MeqStation[] = [
  // ─────────────────────────────────────────────────────────────── 1
  {
    no: 1,
    slug: "emergencies",
    title: "Neuro-ophthalmic Emergencies",
    kingdom: "neuro-oph",
    marks: 15,
    minutes: 9,
    stem: "A 74-year-old woman woke up 2 days ago with painless, severe loss of vision in her right eye. VA: OD hand motions, OS 20/20. There is a right RAPD. The fundus of the right eye is shown.",
    images: [{ src: "/meq/gca-disc.jpg", caption: "Right fundus" }],
    parts: [
      {
        id: "1a",
        prompt: "Describe the optic disc. What is the most likely diagnosis, and what is the most important differential diagnosis?",
        marks: 3,
        key: [
          { point: "Diffuse chalky-white (pallid) optic disc swelling", marks: 1 },
          { point: "Arteritic AION secondary to giant cell arteritis (GCA)", marks: 1 },
          { point: "Differential: non-arteritic AION (NAION) — usually hyperemic, sectoral swelling in a crowded 'disc at risk'", marks: 1 },
        ],
      },
      {
        id: "1b",
        prompt: "List FOUR symptoms or signs you would specifically ask about or examine to support your diagnosis.",
        marks: 4,
        key: [
          { point: "New-onset headache, especially temporal", marks: 1 },
          { point: "Jaw claudication (most specific symptom)", marks: 1 },
          { point: "Scalp tenderness; tender, thickened or pulseless temporal artery", marks: 1 },
          { point: "Polymyalgia rheumatica, weight loss, fever, malaise — or preceding transient visual loss / diplopia", marks: 1 },
        ],
        pearl: "About 20% of GCA is 'occult' — visual loss without systemic symptoms. Do not let a quiet history reassure you.",
      },
      {
        id: "1c",
        reveal: "ESR 92 mm/h, CRP 48 mg/L, platelets 520,000/µL.",
        prompt: "Outline your immediate management.",
        marks: 4,
        key: [
          { point: "Start high-dose corticosteroids immediately — do NOT wait for the biopsy", marks: 1 },
          { point: "With visual loss: IV methylprednisolone 1 g/day for 3–5 days, then oral prednisolone ~1 mg/kg/day", marks: 1 },
          { point: "Temporal artery biopsy (≥1.5–2 cm) within 1–2 weeks of starting steroids (or temporal artery ultrasound)", marks: 1 },
          { point: "Goal is to protect the fellow eye; co-manage with rheumatology; gastric & bone protection", marks: 1 },
        ],
      },
      {
        id: "1d",
        prompt: "Name TWO other neuro-ophthalmic presentations of GCA, and TWO points in her long-term management.",
        marks: 4,
        key: [
          { point: "Any two: CRAO / cilioretinal artery occlusion, PION, diplopia (CN III/IV/VI or EOM ischemia), ocular ischemic syndrome, amaurosis fugax", marks: 2 },
          { point: "Slow steroid taper over 12–18 months guided by symptoms and ESR/CRP", marks: 1 },
          { point: "Steroid-sparing therapy (tocilizumab); osteoporosis prophylaxis and monitoring of steroid side effects", marks: 1 },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── 2
  {
    no: 2,
    slug: "pupil",
    title: "Pupillary Disorders",
    kingdom: "neuro-oph",
    marks: 15,
    minutes: 9,
    stem: "A 52-year-old man, a 40-pack-year smoker, noticed that one upper eyelid has been drooping for several months. He also has aching pain in the shoulder and inner arm on the same side.",
    images: [{ src: "/meq/horner.jpg", caption: "Primary position, room light" }],
    parts: [
      {
        id: "2a",
        prompt: "Describe the findings. What is the diagnosis? In which lighting condition will the anisocoria be greater?",
        marks: 3,
        key: [
          { point: "Mild ptosis (1–2 mm, Müller muscle) with miosis on the same side", marks: 1 },
          { point: "Horner syndrome (oculosympathetic paresis)", marks: 1 },
          { point: "Anisocoria greater in DIM light (dilation lag of the small pupil)", marks: 1 },
        ],
      },
      {
        id: "2b",
        prompt: "How would you confirm the diagnosis pharmacologically, and how would you localize the lesion?",
        marks: 4,
        key: [
          { point: "Apraclonidine 0.5–1%: reversal of anisocoria — the Horner pupil dilates (denervation supersensitivity of α1 receptors) and the lid elevates", marks: 1 },
          { point: "OR cocaine 4–10%: the Horner pupil fails to dilate (no norepinephrine at the synapse)", marks: 1 },
          { point: "Hydroxyamphetamine 1%: pupil dilates → 1st/2nd-order (preganglionic); fails to dilate → 3rd-order (postganglionic)", marks: 1 },
          { point: "Wait at least 24–72 h between cocaine/apraclonidine and hydroxyamphetamine testing", marks: 1 },
        ],
      },
      {
        id: "2c",
        reveal: "Hydroxyamphetamine dilates the affected pupil. A chest radiograph is taken.",
        images: [{ src: "/meq/chest-xray.jpg", caption: "Chest radiograph (PA)" }],
        prompt: "What does the chest X-ray show? Which neuron is involved? Give TWO other causes of a lesion at this level.",
        marks: 4,
        key: [
          { point: "Apical (superior sulcus) lung opacity — Pancoast tumor (most often squamous cell carcinoma)", marks: 1 },
          { point: "Second-order (preganglionic) neuron, over the lung apex", marks: 1 },
          { point: "Any two: neuroblastoma (children), aortic aneurysm/dissection, mediastinal tumour or lymphadenopathy (lymphoma, TB), neck surgery/thyroidectomy, chest tube / central line, brachial plexus trauma", marks: 2 },
        ],
      },
      {
        id: "2d",
        prompt: "A different patient presents with an ACUTE painful Horner syndrome and ipsilateral neck pain. What must you exclude, and how? How does the work-up differ in a child with an acquired Horner syndrome?",
        marks: 4,
        key: [
          { point: "Internal carotid artery dissection (3rd-order Horner with neck/face/orbit pain, ± amaurosis fugax, dysgeusia)", marks: 1 },
          { point: "Urgent CTA or MRA of head and neck (MRI with fat-saturated axial neck)", marks: 1 },
          { point: "Same-day stroke/neurology referral; antithrombotic therapy to prevent stroke", marks: 1 },
          { point: "Child: exclude neuroblastoma — urine catecholamines (VMA/HVA) plus MRI brain/neck/chest. Congenital Horner → iris heterochromia (lighter iris on the affected side)", marks: 1 },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── 3
  {
    no: 3,
    slug: "eom",
    title: "EOM Abnormalities",
    kingdom: "neuro-oph",
    marks: 15,
    minutes: 9,
    stem: "A 58-year-old woman with hypertension presents with sudden binocular diplopia, a droopy left eyelid and a severe headache that began yesterday. Nine-gaze photographs are shown (the lid is held up in the gaze positions).",
    images: [{ src: "/meq/cn3-nine-gaze.jpg", caption: "Nine diagnostic positions of gaze" }],
    parts: [
      {
        id: "3a",
        prompt: "Describe the ocular motility findings and localize the lesion.",
        marks: 3,
        key: [
          { point: "Left ptosis with the eye 'down and out' in primary position", marks: 1 },
          { point: "Limited adduction, elevation and depression of the left eye; abduction (CN VI) preserved; intorsion on attempted downgaze (CN IV intact)", marks: 1 },
          { point: "Left oculomotor (CN III) palsy", marks: 1 },
        ],
      },
      {
        id: "3b",
        reveal: "The left pupil is 7 mm and poorly reactive; the right is 3 mm and brisk.",
        prompt: "What is the significance of this pupil finding? What is the most important diagnosis to exclude, and why is the pupil affected?",
        marks: 4,
        key: [
          { point: "Pupil-involving CN III palsy", marks: 1 },
          { point: "Posterior communicating artery (PComm) aneurysm until proven otherwise", marks: 1 },
          { point: "Pupillomotor fibres run superficially (dorsomedial) in the nerve, so compression affects them early; microvascular ischaemia hits the core and usually spares the pupil", marks: 1 },
          { point: "Risk of rupture / subarachnoid haemorrhage — a life-threatening emergency", marks: 1 },
        ],
      },
      {
        id: "3c",
        prompt: "What investigation(s) would you order, how urgently, and what happens next if positive?",
        marks: 4,
        key: [
          { point: "Emergency (same-day) CTA or MRA of the brain", marks: 1 },
          { point: "CTA/MRA detect most aneurysms ≥3–5 mm; catheter digital subtraction angiography (DSA) is the gold standard if non-invasive imaging is negative but suspicion remains high", marks: 1 },
          { point: "Age >50: also ESR/CRP to consider GCA", marks: 1 },
          { point: "Positive → urgent neurosurgical / neurointerventional referral (endovascular coiling or clipping)", marks: 1 },
        ],
      },
      {
        id: "3d",
        prompt: "Contrast this with a 65-year-old diabetic with a complete, PUPIL-SPARING CN III palsy. How would you manage that patient, and what is the significance of aberrant regeneration?",
        marks: 4,
        key: [
          { point: "Presumed microvascular (ischaemic) palsy: control BP/glucose/lipids and observe closely; check the pupil again in the first week", marks: 1 },
          { point: "Expect spontaneous recovery within ~8–12 weeks", marks: 1 },
          { point: "Image if: age <50, partial palsy with incomplete pupil sparing, other cranial nerve or neurological signs, progression, or no recovery by 3 months", marks: 1 },
          { point: "Aberrant regeneration (lid–gaze dyskinesia, pupil constriction on adduction) does NOT follow microvascular palsy → implies compression (aneurysm, tumour) → image", marks: 1 },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── 4
  {
    no: 4,
    slug: "eyelid-facial",
    title: "Eyelid / Facial Abnormalities",
    kingdom: "neuro-oph",
    marks: 15,
    minutes: 9,
    stem: "A 45-year-old man woke up unable to close his right eye. His mouth droops to the right, food collects in his right cheek, and he cannot wrinkle the right side of his forehead.",
    parts: [
      {
        id: "4a",
        prompt: "Is this an upper or lower motor neuron facial palsy? Explain, and give the most likely diagnosis.",
        marks: 3,
        key: [
          { point: "Lower motor neuron (peripheral) CN VII palsy — the forehead is involved", marks: 1 },
          { point: "The upper face receives bilateral cortical input, so a supranuclear (UMN) lesion spares the forehead", marks: 1 },
          { point: "Bell palsy (idiopathic) — a diagnosis of exclusion", marks: 1 },
        ],
      },
      {
        id: "4b",
        prompt: "List FOUR features in the history or examination that would make you doubt Bell palsy or change your management.",
        marks: 4,
        key: [
          { point: "Ear pain / vesicles in the ear canal or palate → Ramsay Hunt syndrome (VZV)", marks: 1 },
          { point: "Hearing loss, vertigo or other cranial nerve deficits → cerebellopontine angle / brainstem lesion", marks: 1 },
          { point: "Bilateral palsy → Lyme, sarcoidosis, Guillain-Barré, leukaemia, basal meningitis", marks: 1 },
          { point: "Slowly progressive, recurrent, or no recovery by 3–4 months; facial twitching; parotid mass → tumour → MRI", marks: 1 },
        ],
      },
      {
        id: "4c",
        prompt: "Outline the management, including protection of the eye.",
        marks: 4,
        key: [
          { point: "Oral corticosteroids started within 72 h (e.g. prednisolone 7–10 days)", marks: 1 },
          { point: "Antivirals add uncertain benefit; consider them in severe palsy and give them for Ramsay Hunt", marks: 1 },
          { point: "Corneal protection: frequent lubricants, ointment and taping/moisture chamber at night; check Bell phenomenon and corneal sensation (CN V)", marks: 1 },
          { point: "If exposure keratopathy persists or the cornea is anaesthetic: tarsorrhaphy, botulinum-induced protective ptosis, or upper-lid gold/platinum weight", marks: 1 },
        ],
      },
      {
        id: "4d",
        reveal: "Six months later his eye closes. But when he smiles, the right eye narrows involuntarily, and his right eye waters while he eats.",
        prompt: "Explain these two phenomena and their treatment. How would you distinguish them from hemifacial spasm?",
        marks: 4,
        key: [
          { point: "Synkinesis from aberrant regeneration of the facial nerve", marks: 1 },
          { point: "'Crocodile tears' (gusto-lacrimal reflex) — salivary fibres misdirected to the lacrimal gland", marks: 1 },
          { point: "Treatment: botulinum toxin injection (to orbicularis / lacrimal gland)", marks: 1 },
          { point: "Hemifacial spasm: unilateral, episodic clonic spasms that persist during sleep, usually from vascular compression at the CN VII root exit zone → MRI/MRA; treat with botulinum toxin or microvascular decompression", marks: 1 },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── 5
  {
    no: 5,
    slug: "optic-nerve",
    title: "Optic Nerve Diseases",
    kingdom: "neuro-oph",
    marks: 15,
    minutes: 9,
    stem: "A 26-year-old woman (BMI 36 kg/m²) has had daily headaches for 2 months, worse when lying down, with pulsatile tinnitus and episodes of seconds-long 'grey-outs' when she stands up. VA is 20/20 in both eyes. Both optic discs look similar; one is shown.",
    images: [{ src: "/meq/disc-swelling.jpg", caption: "Optic disc" }],
    parts: [
      {
        id: "5a",
        prompt: "Describe the disc. What do you call bilateral disc swelling of this kind, and give ONE way to distinguish it from pseudopapilledema.",
        marks: 3,
        key: [
          { point: "Elevated disc with blurred margins, obscured vessels at the margin, peripapillary nerve fibre layer oedema", marks: 1 },
          { point: "Papilledema — disc swelling caused by raised intracranial pressure", marks: 1 },
          { point: "Any one: vessels obscured at the margin (true oedema), hyperaemia/haemorrhage/exudate, absent SVP; drusen are autofluorescent / hyperreflective on B-scan, OCT or CT", marks: 1 },
        ],
      },
      {
        id: "5b",
        prompt: "What investigations would you order, in what order, and what findings would you expect?",
        marks: 4,
        key: [
          { point: "Urgent MRI brain with contrast + MR venography BEFORE lumbar puncture — exclude mass, hydrocephalus and cerebral venous sinus thrombosis", marks: 1 },
          { point: "MRI signs of raised ICP (any two): empty sella, flattened posterior globe, distended perioptic subarachnoid space ± tortuous optic nerve, transverse sinus stenosis", marks: 1 },
          { point: "Lumbar puncture in lateral decubitus: opening pressure ≥25 cmH₂O (≥28 in children) with normal CSF composition", marks: 1 },
          { point: "Baseline perimetry (enlarged blind spot) and OCT RNFL for monitoring", marks: 1 },
        ],
      },
      {
        id: "5c",
        prompt: "State the diagnostic criteria for idiopathic intracranial hypertension (modified Dandy / Friedman).",
        marks: 4,
        key: [
          { point: "Papilledema", marks: 1 },
          { point: "Normal neurological examination except for cranial nerve (VI) palsy", marks: 1 },
          { point: "Normal neuroimaging — no mass, hydrocephalus or abnormal enhancement; no venous sinus thrombosis", marks: 1 },
          { point: "Normal CSF composition with elevated opening pressure", marks: 1 },
        ],
      },
      {
        id: "5d",
        prompt: "How would you manage her? When is surgery indicated, and which options are available?",
        marks: 4,
        key: [
          { point: "Weight loss of 6–10% body weight (consider bariatric surgery)", marks: 1 },
          { point: "Acetazolamide (IIHTT: up to 4 g/day with diet improved field and papilledema); watch for paraesthesia, metabolic acidosis and renal stones", marks: 1 },
          { point: "Alternatives: topiramate (also helps migraine), furosemide; stop causative drugs (tetracyclines, vitamin A/retinoids)", marks: 1 },
          { point: "Fulminant or progressive visual loss despite treatment → optic nerve sheath fenestration, CSF shunt (LP/VP), or venous sinus stenting", marks: 1 },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── 6
  {
    no: 6,
    slug: "drugs",
    title: "Drug Use in Neuro-oph",
    kingdom: "neuro-oph",
    marks: 10,
    minutes: 6,
    stem: "A 30-year-old nurse noticed her left pupil was 'huge' this morning. She feels well. Left pupil 8 mm, non-reactive to light and near; right pupil 4 mm, normal. Lids and ocular movements are normal.",
    parts: [
      {
        id: "6a",
        prompt: "Give the THREE most important differential diagnoses.",
        marks: 3,
        key: [
          { point: "Pharmacologic mydriasis — anticholinergic (atropine, scopolamine patch, plants) or adrenergic (phenylephrine)", marks: 1 },
          { point: "Tonic (Adie) pupil", marks: 1 },
          { point: "CN III palsy — unlikely as an isolated sign with normal lids and EOM, but must be considered", marks: 1 },
        ],
      },
      {
        id: "6b",
        prompt: "Describe how pilocarpine is used to differentiate these, including the concentrations and the interpretation.",
        marks: 4,
        key: [
          { point: "Dilute pilocarpine 0.1% (0.0625–0.125%): a tonic pupil constricts (cholinergic denervation supersensitivity); a normal pupil does not", marks: 1 },
          { point: "Pilocarpine 1%: fails to constrict → pharmacologic blockade by an anticholinergic agent", marks: 1 },
          { point: "Pilocarpine 1% constricts the pupil in CN III palsy and in tonic pupil (neural, not receptor, problem)", marks: 1 },
          { point: "Instil in both eyes and compare after 30–45 min; test before any other drops", marks: 1 },
        ],
      },
      {
        id: "6c",
        reveal: "A different patient has variable ptosis and diplopia, worse in the evening.",
        prompt: "Name a bedside test and a drug used for symptomatic treatment, and list TWO drug classes that can worsen this condition.",
        marks: 3,
        key: [
          { point: "Ice-pack test (≥2 mm lid improvement after 2–5 min) — or sleep / edrophonium test with atropine ready for bradycardia", marks: 1 },
          { point: "Pyridostigmine (acetylcholinesterase inhibitor)", marks: 1 },
          { point: "Any two: aminoglycosides, fluoroquinolones, macrolides, β-blockers (incl. topical timolol), magnesium, botulinum toxin, statins, immune checkpoint inhibitors", marks: 1 },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── 7
  {
    no: 7,
    slug: "neuro-imaging",
    title: "Neuro-imaging",
    kingdom: "neuro-oph",
    marks: 15,
    minutes: 9,
    stem: "Three short scenarios. Read each image and answer the questions.",
    parts: [
      {
        id: "7a",
        reveal: "Case A — A 48-year-old man develops a sudden, severe headache with vomiting, followed by bilateral visual loss and diplopia. He looks drowsy.",
        images: [{ src: "/meq/mri-sellar.jpg", caption: "Case A — MRI (axial T1, coronal and sagittal)" }],
        prompt: "Describe the imaging finding and give the diagnosis.",
        marks: 2,
        key: [
          { point: "Sellar/suprasellar mass with hyperintense (haemorrhagic) signal elevating/compressing the chiasm", marks: 1 },
          { point: "Pituitary apoplexy — haemorrhage/infarction of a pituitary macroadenoma", marks: 1 },
        ],
      },
      {
        id: "7b",
        prompt: "Case A — What is your emergency management?",
        marks: 3,
        key: [
          { point: "IV hydrocortisone (stress-dose steroids) for acute adrenal insufficiency", marks: 1 },
          { point: "Fluids, electrolytes (Na) and a full pituitary hormone panel", marks: 1 },
          { point: "Urgent neurosurgery: transsphenoidal decompression for severe/deteriorating vision or reduced consciousness", marks: 1 },
        ],
      },
      {
        id: "7c",
        reveal: "Case B — A 68-year-old man with atrial fibrillation (not anticoagulated) suddenly 'can't see things on his right'. Visual acuity is normal.",
        images: [{ src: "/meq/vf-mri-occipital.jpg", caption: "Case B — Visual fields (A: left eye, B: right eye) and axial T2 MRI" }],
        prompt: "Describe the visual field defect and the MRI, and localize the lesion.",
        marks: 2,
        key: [
          { point: "Congruous right homonymous hemianopia with macular sparing", marks: 1 },
          { point: "Left occipital lobe infarct (posterior cerebral artery territory)", marks: 1 },
        ],
      },
      {
        id: "7d",
        prompt: "Case B — Which MRI sequence is most sensitive in the first hours, and what is the next step in management?",
        marks: 3,
        key: [
          { point: "Diffusion-weighted imaging (DWI); CT may be normal within the first 6 h", marks: 1 },
          { point: "Cardioembolic work-up: ECG/Holter, echocardiography; carotid imaging", marks: 1 },
          { point: "Acute stroke team referral (thrombolysis/thrombectomy window), secondary prevention with anticoagulation; driving advice", marks: 1 },
        ],
      },
      {
        id: "7e",
        reveal: "Case C — A 28-year-old woman had painful loss of vision in her left eye 1 week ago, with pain on eye movement. Her disc looks normal.",
        images: [{ src: "/meq/mri-flair.jpg", caption: "Case C — MRI brain (axial and sagittal FLAIR)" }],
        prompt: "Describe the MRI and state its significance.",
        marks: 2,
        key: [
          { point: "Multiple periventricular ovoid T2/FLAIR hyperintensities perpendicular to the ventricles ('Dawson fingers')", marks: 1 },
          { point: "Demyelination — high risk of multiple sclerosis (optic neuritis as a clinically isolated syndrome)", marks: 1 },
        ],
      },
      {
        id: "7f",
        prompt: "Case C — How does this MRI change her prognosis and management? Cite the relevant trials.",
        marks: 3,
        key: [
          { point: "ONTT: 15-year MS risk ~72% with ≥1 brain lesion vs ~25% with a normal MRI", marks: 1 },
          { point: "IV methylprednisolone (1 g/day × 3 days, then oral taper) speeds recovery but does not change final VA; oral prednisone alone increases recurrence", marks: 1 },
          { point: "Refer to neurology for disease-modifying therapy (CHAMPS: interferon reduces conversion to MS); McDonald 2024 now includes the optic nerve as a site", marks: 1 },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── 8
  {
    no: 8,
    slug: "anterior-intermediate",
    title: "Anterior & Intermediate Uveitis",
    kingdom: "uveitis",
    marks: 25,
    minutes: 15,
    stem: "A 52-year-old immunocompetent Thai man has had recurrent attacks of mild redness, haloes and blurred vision in the RIGHT eye for 3 years. Each attack had IOP of 40–50 mmHg and was treated as 'glaucomatocyclitic crisis' with topical steroids; attacks are now more frequent. Today: VA 20/40, IOP 38 mmHg, mild cells, no posterior synechiae. The left eye is normal.",
    images: [{ src: "/meq/kp-slitlamp.jpg", caption: "Right eye, slit lamp" }],
    parts: [
      {
        id: "8a",
        prompt: "Describe the slit-lamp findings. How would you classify this uveitis?",
        marks: 4,
        key: [
          { point: "Localized corneal (stromal/epithelial) oedema", marks: 1 },
          { point: "Coin-shaped / ring-like cluster of KPs (coin lesion); small-to-medium nodular or linear KPs", marks: 1 },
          { point: "Mild anterior chamber reaction, no posterior synechiae", marks: 1 },
          { point: "Unilateral, recurrent hypertensive anterior uveitis (IOP spikes out of proportion to inflammation)", marks: 1 },
        ],
      },
      {
        id: "8b",
        prompt: "List the differential diagnosis of hypertensive anterior uveitis.",
        marks: 5,
        key: [
          { point: "Herpes simplex and varicella zoster anterior uveitis (sectoral iris atrophy)", marks: 1 },
          { point: "Cytomegalovirus anterior uveitis / endotheliitis", marks: 1 },
          { point: "Posner-Schlossman syndrome (glaucomatocyclitic crisis)", marks: 1 },
          { point: "Toxoplasmosis (with or without visible retinochoroiditis)", marks: 1 },
          { point: "Sarcoidosis or syphilis; also Fuchs uveitis syndrome (rubella)", marks: 1 },
        ],
        pearl: "Mnemonic HOTPS: Herpes, Other (rubella), Toxoplasma, Posner-Schlossman, Syphilis/Sarcoid.",
      },
      {
        id: "8c",
        prompt: "What investigations would you perform to establish the cause? Comment on timing and interpretation.",
        marks: 5,
        key: [
          { point: "Anterior chamber tap for PCR (CMV, HSV, VZV ± rubella)", marks: 1 },
          { point: "Best done during an active attack / IOP spike and before starting antivirals", marks: 1 },
          { point: "A negative PCR does not exclude viral aetiology (low viral load, short-lived DNA release) — repeat the tap or use the Goldmann-Witmer coefficient", marks: 1 },
          { point: "Syphilis serology (treponemal + non-treponemal) and chest X-ray (TB/sarcoid)", marks: 1 },
          { point: "HIV/immune status — CMV anterior uveitis typically affects immunocompetent middle-aged men", marks: 1 },
        ],
      },
      {
        id: "8d",
        reveal: "Aqueous PCR is positive for CMV DNA.",
        prompt: "Outline the treatment and long-term issues.",
        marks: 6,
        key: [
          { point: "Ganciclovir-based therapy: oral valganciclovir 900 mg twice daily (induction ~6 weeks), then taper", marks: 1 },
          { point: "Topical ganciclovir — 0.15% gel or compounded 2% drops — for maintenance", marks: 1 },
          { point: "Intravitreal ganciclovir as an option for severe / non-responsive cases", marks: 1 },
          { point: "IOP control with aqueous suppressants (β-blocker, CAI, α2-agonist)", marks: 1 },
          { point: "Use topical steroids sparingly; prolonged high-dose steroid worsens viral replication", marks: 1 },
          { point: "High recurrence after stopping treatment → long-term topical therapy; monitor endothelial cell count; glaucoma surgery often needed", marks: 1 },
        ],
      },
      {
        id: "8e",
        reveal: "A different patient: a 25-year-old woman with bilateral floaters. Vitreous cells 2+, inferior 'snowballs' and a white exudate over the inferior pars plana. Anterior chamber is quiet.",
        prompt: "Name the condition and its SUN classification. List associated diseases, the main vision-threatening complication, and the stepwise treatment.",
        marks: 5,
        key: [
          { point: "Intermediate uveitis — primary site of inflammation is the vitreous; 'pars planitis' when snowbank/snowballs and no systemic disease", marks: 1 },
          { point: "Associations: multiple sclerosis, sarcoidosis", marks: 1 },
          { point: "Exclude infection: syphilis, TB, Lyme (± toxocara in children)", marks: 1 },
          { point: "Main cause of visual loss: cystoid macular oedema (also vitreous haemorrhage, RD, cataract)", marks: 1 },
          { point: "Treat when vision-threatening: periocular/intravitreal steroid → systemic steroid / IMT (e.g. MTX, adalimumab) → peripheral laser/cryo or vitrectomy for refractory disease", marks: 1 },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── 9
  {
    no: 9,
    slug: "posterior",
    title: "Update in Posterior Uveitis",
    kingdom: "uveitis",
    marks: 25,
    minutes: 15,
    stem: "A 38-year-old man has had blurred vision and photopsia in his right eye for 2 weeks. VA OD 20/200, OS 20/20. Mild anterior chamber and vitreous cells OD. A healed skin rash on his palms was noticed a month ago.",
    images: [
      { src: "/meq/posterior-fundus.jpg", caption: "Right fundus" },
      { src: "/meq/posterior-faf.jpg", caption: "Fundus autofluorescence" },
      { src: "/meq/posterior-oct.jpg", caption: "OCT through the macula" },
    ],
    parts: [
      {
        id: "9a",
        prompt: "Describe the multimodal imaging and give the diagnosis.",
        marks: 4,
        key: [
          { point: "Large, yellowish, placoid macular lesion at the level of the RPE", marks: 1 },
          { point: "FAF: hyperautofluorescent lesion with stippling", marks: 1 },
          { point: "OCT: disruption of the ellipsoid zone/outer retina with nodular RPE hyperreflectivity", marks: 1 },
          { point: "Acute syphilitic posterior placoid chorioretinitis (ASPPC) — ocular syphilis", marks: 1 },
        ],
      },
      {
        id: "9b",
        prompt: "How would you confirm the diagnosis serologically? What other tests are mandatory?",
        marks: 5,
        key: [
          { point: "Both treponemal (TPHA/TP-PA, FTA-ABS, EIA/CLIA) and non-treponemal (VDRL/RPR) tests", marks: 1 },
          { point: "Reverse-sequence algorithm: treponemal immunoassay first → if positive, RPR → if discordant, a second treponemal test (TP-PA)", marks: 1 },
          { point: "RPR/VDRL titre reflects disease activity and is used for follow-up", marks: 1 },
          { point: "HIV testing (and other STIs)", marks: 1 },
          { point: "Lumbar puncture (CSF VDRL, cells, protein) — ocular syphilis is managed as neurosyphilis", marks: 1 },
        ],
      },
      {
        id: "9c",
        prompt: "Outline the treatment.",
        marks: 5,
        key: [
          { point: "Treat as neurosyphilis", marks: 1 },
          { point: "IV aqueous penicillin G 18–24 MU/day (3–4 MU every 4 h) for 10–14 days", marks: 1 },
          { point: "Penicillin allergy → desensitization (penicillin remains preferred)", marks: 1 },
          { point: "Warn about the Jarisch-Herxheimer reaction", marks: 1 },
          { point: "Adjunctive topical/systemic steroids only under antibiotic cover; follow RPR at 3, 6, 12 months; partner notification", marks: 1 },
        ],
      },
      {
        id: "9d",
        prompt: "Toxoplasmosis and tuberculosis are the other common infectious causes of posterior uveitis in Thailand. Compare their typical fundus features, diagnosis and treatment.",
        marks: 6,
        key: [
          { point: "Toxoplasma: focal necrotizing retinochoroiditis adjacent to a pigmented scar — 'headlight in the fog'", marks: 1 },
          { point: "Treat if: lesion near the fovea or disc, >1 DD, severe vitritis, immunocompromise, pregnancy, congenital", marks: 1 },
          { point: "Classic triple therapy (pyrimethamine + sulfadiazine + folinic acid) or TMP-SMX; oral steroid only after 24–48 h of antimicrobials", marks: 1 },
          { point: "TB: serpiginous-like (multifocal) choroiditis, choroidal tubercles/tuberculoma, occlusive retinal vasculitis", marks: 1 },
          { point: "TB work-up: IGRA/TST and chest X-ray/CT; COTS consensus guides when to start ATT", marks: 1 },
          { point: "Anti-TB therapy (quadruple regimen) for ≥6–9 months, with steroids to control inflammation", marks: 1 },
        ],
      },
      {
        id: "9e",
        prompt: "Before giving systemic immunosuppression to a patient with presumed non-infectious posterior uveitis, what must you exclude, and why?",
        marks: 5,
        key: [
          { point: "Screen for syphilis and TB in every patient", marks: 1 },
          { point: "Steroids alone can make infection worse: toxoplasmosis, syphilis, ARN/CMV retinitis", marks: 1 },
          { point: "Atypical, widespread toxoplasmosis can occur in immunocompromised / steroid-treated patients", marks: 1 },
          { point: "Viral retinitis (ARN/PORN) → aqueous/vitreous PCR and urgent antivirals", marks: 1 },
          { point: "Masquerade — primary vitreoretinal lymphoma in older patients → vitreous biopsy", marks: 1 },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────── 10
  {
    no: 10,
    slug: "complications",
    title: "Ocular Complications in Uveitis",
    kingdom: "uveitis",
    marks: 25,
    minutes: 15,
    stem: "A 9-year-old girl with ANA-positive oligoarticular juvenile idiopathic arthritis (JIA) has had chronic bilateral anterior uveitis since age 4, treated intermittently with topical steroids. Her right VA has gradually dropped to 20/200.",
    images: [
      { src: "/meq/cornea-band.jpg", caption: "Right eye, external photograph" },
      { src: "/meq/macula-oct.jpg", caption: "OCT, right macula" },
    ],
    parts: [
      {
        id: "10a",
        prompt: "Identify the THREE complications shown, and name TWO other complications of chronic anterior uveitis.",
        marks: 5,
        key: [
          { point: "Band keratopathy (calcium in the interpalpebral cornea)", marks: 1 },
          { point: "Cataract (complicated / posterior subcapsular)", marks: 1 },
          { point: "OCT: cystoid macular oedema — intraretinal cysts in the outer plexiform/inner nuclear layers", marks: 1 },
          { point: "Any two others: posterior synechiae, glaucoma/ocular hypertension, hypotony, epiretinal membrane, amblyopia (in a child)", marks: 2 },
        ],
      },
      {
        id: "10b",
        prompt: "Describe the pathology, causes and management of band keratopathy.",
        marks: 5,
        key: [
          { point: "Calcium deposition in the epithelial basement membrane, Bowman layer and anterior stroma; starts at the limbus with a clear (lucid) interval and 'Swiss-cheese' holes", marks: 1 },
          { point: "Ocular causes: chronic uveitis (especially JIA), phthisis, silicone oil; systemic: hypercalcaemia (sarcoid, hyperparathyroidism, vitamin D excess), renal failure", marks: 1 },
          { point: "Treat when vision is affected or the eye is irritated", marks: 1 },
          { point: "Epithelial debridement + chelation with EDTA (~0.05 M / 3%)", marks: 1 },
          { point: "Phototherapeutic keratectomy (PTK) as an alternative or adjunct", marks: 1 },
        ],
      },
      {
        id: "10c",
        prompt: "She needs cataract surgery. Outline your pre-, intra- and post-operative plan.",
        marks: 6,
        key: [
          { point: "Eye quiet for at least 3 months before surgery", marks: 1 },
          { point: "Pre-op: intensify topical steroid ± oral prednisolone 0.5–1 mg/kg for ~1 week; continue IMT", marks: 1 },
          { point: "Intra-op: synechiolysis and pupil expansion (iris hooks / ring), gentle handling, complete cortex removal", marks: 1 },
          { point: "IOL: single-piece hydrophobic acrylic in the bag — or leave aphakic in poorly controlled JIA", marks: 1 },
          { point: "Intra-op or end-of-case steroid: intracameral/sub-Tenon triamcinolone or dexamethasone", marks: 1 },
          { point: "Post-op: frequent topical steroid; monitor for flare, CME, IOP, posterior capsule opacification; treat amblyopia", marks: 1 },
        ],
      },
      {
        id: "10d",
        reveal: "Six months later her IOP is 34 mmHg.",
        prompt: "List the mechanisms of raised IOP in uveitis and outline the management.",
        marks: 5,
        key: [
          { point: "Inflammatory: trabeculitis, cells/debris blocking the meshwork", marks: 1 },
          { point: "Steroid-induced ocular hypertension; angle closure from posterior synechiae (iris bombé) or PAS", marks: 1 },
          { point: "Medical: β-blocker, CAI, α2-agonist first-line; prostaglandins with caution; miotics contraindicated", marks: 1 },
          { point: "Pupillary block → Nd:YAG laser or surgical peripheral iridotomy", marks: 1 },
          { point: "Surgery: glaucoma drainage device (Ahmed/Baerveldt) preferred — trabeculectomy has a high failure rate in uveitic and paediatric eyes", marks: 1 },
        ],
      },
      {
        id: "10e",
        prompt: "How would you treat her cystoid macular oedema, and what is the role of systemic immunomodulatory therapy?",
        marks: 4,
        key: [
          { point: "Control inflammation; topical steroid + topical NSAID", marks: 1 },
          { point: "Periocular/intravitreal triamcinolone or dexamethasone implant (watch IOP); oral acetazolamide", marks: 1 },
          { point: "Methotrexate is first-line steroid-sparing therapy in JIA uveitis", marks: 1 },
          { point: "Adalimumab for refractory disease (SYCAMORE trial)", marks: 1 },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────── 11
  {
    no: 11,
    slug: "panuveitis",
    title: "Panuveitis",
    kingdom: "uveitis",
    marks: 25,
    minutes: 15,
    stem: "A 40-year-old Thai woman had headache, neck stiffness and tinnitus, followed 1 week later by sudden blurred vision in both eyes. VA: 20/200 both eyes. Anterior chamber and vitreous cells 1+. No history of eye surgery or trauma.",
    images: [{ src: "/meq/panuveitis-fundus.jpg", caption: "Right and left fundus" }],
    parts: [
      {
        id: "11a",
        prompt: "Describe the fundus findings and give the most likely diagnosis.",
        marks: 4,
        key: [
          { point: "Serous (exudative) retinal detachment — inferior bullous RD in the right eye, multifocal subretinal fluid/yellowish dots in the left", marks: 1 },
          { point: "Optic disc hyperaemia/swelling", marks: 1 },
          { point: "Vogt-Koyanagi-Harada (VKH) disease, acute uveitic stage", marks: 1 },
          { point: "Sympathetic ophthalmia unlikely — no penetrating trauma or surgery", marks: 1 },
        ],
      },
      {
        id: "11b",
        prompt: "Which investigations support the diagnosis? Describe the expected findings.",
        marks: 5,
        key: [
          { point: "FFA: multiple pinpoint leaks at the RPE that pool into the subretinal space ('starry sky'), with disc leakage", marks: 1 },
          { point: "ICGA: hypofluorescent dark dots (choroidal granulomas)", marks: 1 },
          { point: "OCT: subretinal fluid with septae/membranes (bacillary layer detachment), thickened choroid", marks: 1 },
          { point: "B-scan: diffuse low-to-medium reflective choroidal thickening (useful with media opacity)", marks: 1 },
          { point: "Exclude syphilis and TB; CSF pleocytosis supports the diagnosis but LP is not routine", marks: 1 },
        ],
      },
      {
        id: "11c",
        prompt: "Outline the Revised Diagnostic Criteria and the clinical stages of VKH.",
        marks: 5,
        key: [
          { point: "RDC: no history of penetrating trauma/surgery; no other ocular disease; bilateral involvement", marks: 1 },
          { point: "Neurological/auditory findings and integumentary signs → complete, incomplete or probable VKH", marks: 1 },
          { point: "Prodromal stage: headache, meningism, tinnitus, dysacusis", marks: 1 },
          { point: "Acute uveitic stage: bilateral ERD, disc hyperaemia, shallow AC; convalescent stage: sunset glow, Sugiura sign, vitiligo, poliosis", marks: 1 },
          { point: "Chronic-recurrent stage: granulomatous anterior uveitis; associated with HLA-DR4 in pigmented races", marks: 1 },
        ],
      },
      {
        id: "11d",
        reveal: "She was treated with oral prednisolone, which she stopped herself after 2 months. Eight months later her fundi look like this.",
        images: [{ src: "/meq/panuveitis-late.jpg", caption: "Right and left fundus, 8 months later" }],
        prompt: "What is this appearance? How should VKH be treated to prevent it?",
        marks: 6,
        key: [
          { point: "'Sunset glow' fundus — choroidal depigmentation of the convalescent/chronic stage; marks inadequately controlled disease", marks: 1 },
          { point: "Early, high-dose systemic corticosteroid: oral prednisolone 1–1.5 mg/kg/day or IV methylprednisolone 1 g/day × 3 days then oral", marks: 1 },
          { point: "Slow taper over at least 6 months", marks: 1 },
          { point: "Early (first-line) IMT with steroids — e.g. MTX, azathioprine, MMF, cyclosporine — fewer recurrences and less sunset glow", marks: 1 },
          { point: "Biologics (adalimumab) for refractory disease", marks: 1 },
          { point: "Topical steroid and cycloplegia for anterior uveitis; periocular/intravitreal steroid for recurrences", marks: 1 },
        ],
      },
      {
        id: "11e",
        prompt: "Give the differential diagnosis of panuveitis, and contrast sympathetic ophthalmia and Behçet uveitis with VKH. Name TWO late complications of VKH.",
        marks: 5,
        key: [
          { point: "Infectious: syphilis, TB, toxoplasmosis, endophthalmitis", marks: 1 },
          { point: "Non-infectious: VKH, Behçet disease, sarcoidosis, sympathetic ophthalmia", marks: 1 },
          { point: "Sympathetic ophthalmia: follows penetrating trauma or surgery to the exciting eye; same histopathology (Dalen-Fuchs nodules); enucleate within ~2 weeks only if the injured eye has no visual potential", marks: 1 },
          { point: "Behçet: recurrent non-granulomatous panuveitis with hypopyon and occlusive retinal vasculitis; oral/genital ulcers; no ERD", marks: 1 },
          { point: "VKH complications (any two): cataract, glaucoma, CNV, subretinal fibrosis", marks: 1 },
        ],
      },
    ],
  },
];

export const MEQ_TOTAL_MARKS = MEQ_STATIONS.reduce((s, st) => s + st.marks, 0);

export function getStation(no: number): MeqStation | undefined {
  return MEQ_STATIONS.find((s) => s.no === no);
}
