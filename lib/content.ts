// Question content keyed by `${topicId}/${partId}`.
// Recall = self-test flashcards; MCQ = board-style vignette pool.

export type RecallQ = { id: number; question: string; answer: string };
export type MCQ = {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

// ── Retina · Part 1 · Viral & Necrotizing Retinitis (CMV retinitis · ARN · PORN)
// Source: Ryan's Retina, Section 4 (Inflammatory Disease/Uveitis), Ch. 82.
const RETINA_VIRAL_RECALL: RecallQ[] = [
  { id: 1, question: "What is the most common retinal finding in HIV/AIDS, and is it infectious?", answer: "Cotton-wool spots — noninfectious nerve fiber layer infarcts seen in 50–75% of AIDS patients. They are transient (ophthalmoscopically visible ~6–12 weeks) and require no treatment. AIDS must be considered in the differential of cotton-wool spots occurring without hypertension or diabetes." },
  { id: 2, question: "At what CD4 count does the risk of CMV retinitis markedly increase?", answer: "Below 50/µL. Screening is reasonable below CD4 50–100/µL. In the HAART era, some patients develop CMV retinitis at CD4 >100/µL because of incomplete restoration of the immune repertoire against CMV." },
  { id: 3, question: "Describe the classic fundus appearance of posterior-pole CMV retinitis.", answer: "Full-thickness white intraretinal necrosis and areas of infiltrate along the vascular arcades, with prominent retinal hemorrhages within the necrotic area or along its leading (advancing) edge — the hemorrhagic 'brushfire' border." },
  { id: 4, question: "How does peripheral CMV retinitis differ from posterior-pole disease?", answer: "Peripheral CMV is more granular and has a less intense white appearance, and may lack hemorrhage. Patients may report only floaters, with or without a visual field deficit." },
  { id: 5, question: "What is 'smoldering' CMV retinitis?", answer: "A low grade of retinitis border activity associated with slow progression. It is difficult to recognize without prior wide-angle fundus photographs, which are more sensitive than indirect ophthalmoscopy for detecting progression." },
  { id: 6, question: "What characterizes reactivation of CMV retinitis?", answer: "Reopacification of the border of a previously healed lesion, followed by advancement of the leading edge." },
  { id: 7, question: "Does CMV retinitis usually produce heavy vitritis, and why does that matter for the differential?", answer: "No — in the immunosuppressed host CMV shows minimal inflammatory cells and little vitritis; choroidal involvement is also rare. Prominent vitritis with occlusive vasculitis should raise suspicion for acute retinal necrosis instead." },
  { id: 8, question: "What CNS association does CMV retinitis carry, and how does lesion location affect it?", answer: "CMV encephalitis. The risk is much higher when the retinitis involves the peripapillary region (up to 75% of peripapillary cases had encephalitis; relative risk ~13% for peripapillary vs 9.5% overall)." },
  { id: 9, question: "Name the four FDA-approved drugs for CMV retinitis.", answer: "Ganciclovir, valganciclovir, cidofovir, and foscarnet. (Fomivirsen was approved but is no longer available.)" },
  { id: 10, question: "Why is ganciclovir far more active against CMV than acyclovir, and what enzyme activates it?", answer: "CMV lacks a viral thymidine kinase. Ganciclovir is monophosphorylated by the CMV UL97 phosphotransferase and then converted to its active triphosphate, which inhibits viral DNA elongation. It is phosphorylated much more efficiently than acyclovir, accounting for its greater anti-CMV activity." },
  { id: 11, question: "What is the major dose-limiting toxicity of systemic ganciclovir, and what worsens it?", answer: "Granulocytopenia (neutropenia), occurring in up to one-third of patients; it is exacerbated by concurrent zidovudine (AZT). It is generally reversible, and G-CSF/GM-CSF can help." },
  { id: 12, question: "What is valganciclovir and its key pharmacologic advantage?", answer: "The valine ester (oral prodrug) of ganciclovir. The ester greatly enhances gut absorption — bioavailability ~60% vs ~6% for oral ganciclovir — giving plasma ganciclovir levels comparable to IV dosing. Typical dosing is 900 mg twice daily for induction and 900 mg daily for maintenance; diarrhea is the most common adverse effect." },
  { id: 13, question: "How does foscarnet's mechanism differ from ganciclovir's?", answer: "Foscarnet is a pyrophosphate analog that directly inhibits the viral DNA polymerase by preventing pyrophosphate exchange. It does NOT require phosphorylation or activation by viral or cellular enzymes." },
  { id: 14, question: "What are the principal toxicities of foscarnet?", answer: "Nephrotoxicity (dose-limiting; requires saline hydration and dose adjustment for renal function) and electrolyte disturbance — especially symptomatic hypocalcemia, which can cause arrhythmias and seizures and is worsened by concurrent IV pentamidine. Neutropenia is less common than with ganciclovir (14% vs 34%)." },
  { id: 15, question: "In the Foscarnet–Ganciclovir CMV Retinitis Trial, what surprising difference emerged?", answer: "Both drugs controlled the retinitis equally, but foscarnet conferred a survival advantage (median ~12.6 vs 8.5 months), attributed in part to foscarnet's direct anti-HIV activity. However, foscarnet was less well tolerated." },
  { id: 16, question: "What is cidofovir, its dosing advantage, and its characteristic ocular toxicities?", answer: "A nucleotide analog (HPMPC) with a long duration of action — IV weekly induction then biweekly, or intravitreal every 5–6 weeks. It characteristically causes iritis (up to ~50%, reduced to ~18% with oral probenecid) and ocular hypotony from ciliary body atrophy. Systemic nephrotoxicity (proximal tubule) requires probenecid plus saline hydration." },
  { id: 17, question: "Which CMV genes mediate resistance to the anti-CMV drugs?", answer: "UL97 mutations → low-level ganciclovir resistance; UL97 + UL54 mutations → high-level ganciclovir resistance; UL54 (DNA polymerase) mutations → foscarnet and cidofovir resistance. Ganciclovir-resistant strains (UL97) often remain foscarnet-sensitive." },
  { id: 18, question: "What is the mechanism of fomivirsen?", answer: "An antisense oligonucleotide complementary to CMV mRNA of the major immediate-early region (IE2), inhibiting production of essential viral proteins. It does NOT target the DNA polymerase. Given intravitreally; no longer available." },
  { id: 19, question: "Why must a ganciclovir intraocular device (implant) be combined with systemic therapy?", answer: "Local therapy does not treat systemic CMV, so implant-alone carries a higher risk of contralateral CMV retinitis and extraocular CMV disease; oral valganciclovir is added. Implants also carry an early (first 2 months) retinal detachment risk and ~1% endophthalmitis risk." },
  { id: 20, question: "What is the mechanism and typical timing of retinal detachment in CMV retinitis?", answer: "Rhegmatogenous RD from breaks in atrophic/necrotic retina (active or healed), median time ~18 months. Risk factors: extent of peripheral disease, retinitis activity, and involvement of anterior retina near the vitreous base. HAART reduced RD incidence by ~60%." },
  { id: 21, question: "What is immune recovery uveitis (IRU)?", answer: "An intraocular inflammatory response (iritis, vitritis, macular edema, epiretinal membrane, cataract) in eyes with healed CMV retinitis after immune reconstitution on HAART. Larger retinitis surface area and prior cidofovir use increase risk. It is treated with periocular or intravitreal corticosteroids." },
  { id: 22, question: "Contrast the causative organism and host immune status of CMV retinitis, ARN, and PORN.", answer: "CMV retinitis: cytomegalovirus, very low CD4 (<50/µL). ARN: usually VZV (HSV possible), relatively preserved immunity (CD4 usually >60/µL). PORN: nearly always VZV, profound immunosuppression (CD4 <50/µL)." },
  { id: 23, question: "Describe the clinical picture of acute retinal necrosis (ARN).", answer: "A fulminant panuveitis with confluent, well-demarcated peripheral retinitis (deep retinal whitening, minimal hemorrhage, rapid progression), prominent anterior uveitis, occlusive retinal and choroidal vasculitis, vitritis, and papillitis. Retinal detachment with multiple breaks in the necrotic retina is a common sequela, often with PVR." },
  { id: 24, question: "How does PORN differ clinically from ARN?", answer: "Progressive outer retinal necrosis shows early patchy, multifocal DEEP OUTER retinal lesions with characteristic perivascular clearing, and notably ABSENT vascular inflammation with minimal or no vitritis (versus ARN's prominent vasculitis and vitritis). It progresses extremely rapidly, with severe vision loss and retinal detachment in up to 70%." },
  { id: 25, question: "Outline treatment principles for ARN and PORN.", answer: "ARN: prompt IV acyclovir (10 mg/kg q8h) followed by oral maintenance (valacyclovir/famciclovir/acyclovir); consider prophylactic barrier laser; early combination IV antivirals can arrest disease. PORN: high-dose combination therapy (IV plus intravitreal ganciclovir and foscarnet, ± oral valganciclovir) because IV acyclovir monotherapy gives poor results (NLP in ~67%); ART is important and laser demarcation may reduce detachment." },
];

const RETINA_VIRAL_MCQ: MCQ[] = [
  { id: 1, question: "A 32-year-old man with AIDS (CD4 12/µL) reports floaters and a peripheral field defect. Fundus shows a granular white area of retinal necrosis along a vascular arcade with hemorrhage at its advancing border. Most likely diagnosis?", options: ["Toxoplasmic retinochoroiditis", "Cytomegalovirus retinitis", "Acute retinal necrosis", "Cotton-wool spots"], correct: 1, explanation: "Full-thickness white retinal necrosis with hemorrhage at the leading edge in a patient with CD4 <50/µL is classic CMV retinitis. Toxoplasmosis shows a focal lesion with overlying dense vitritis ('headlight in the fog'); ARN has prominent vitritis and occlusive vasculitis and occurs at higher CD4 counts." },
  { id: 2, question: "Below which CD4 count does the risk of CMV retinitis markedly increase?", options: ["200/µL", "100/µL", "50/µL", "350/µL"], correct: 2, explanation: "The risk rises sharply below 50/µL. Screening is reasonable below CD4 50–100/µL." },
  { id: 3, question: "A previously healed CMV lesion border becomes re-opacified and begins to advance. This represents:", options: ["Immune recovery uveitis", "Reactivation of CMV retinitis", "Progressive outer retinal necrosis", "Serous macular exudation"], correct: 1, explanation: "Reactivation is defined by reopacification of the healed border followed by advancement of the leading edge." },
  { id: 4, question: "Which feature most argues AGAINST CMV retinitis and FOR acute retinal necrosis?", options: ["Full-thickness necrosis", "Prominent occlusive vasculitis and dense vitritis", "Retinal hemorrhage", "Peripheral location"], correct: 1, explanation: "In the immunosuppressed host CMV shows minimal vitritis; ARN features a fulminant panuveitis with occlusive vasculitis and prominent vitritis." },
  { id: 5, question: "Ganciclovir is much more active against CMV than acyclovir because:", options: ["It directly inhibits DNA polymerase without phosphorylation", "It is phosphorylated by the CMV UL97 phosphotransferase (CMV lacks a viral thymidine kinase)", "It targets IE2 messenger RNA", "It is a pyrophosphate analog"], correct: 1, explanation: "CMV lacks a thymidine kinase; the UL97 kinase performs the first phosphorylation of ganciclovir. Option A describes foscarnet, C describes fomivirsen, and D describes foscarnet." },
  { id: 6, question: "The major dose-limiting toxicity of systemic ganciclovir is:", options: ["Nephrotoxicity", "Granulocytopenia (neutropenia)", "Hypocalcemia", "Iritis"], correct: 1, explanation: "Granulocytopenia occurs in up to one-third of patients and is worsened by concurrent zidovudine (AZT)." },
  { id: 7, question: "Which drug is a pyrophosphate analog that inhibits viral DNA polymerase without requiring intracellular phosphorylation?", options: ["Ganciclovir", "Valganciclovir", "Foscarnet", "Cidofovir"], correct: 2, explanation: "Foscarnet directly blocks pyrophosphate exchange at the viral DNA polymerase and needs no activation by viral or cellular enzymes." },
  { id: 8, question: "A patient on IV foscarnet develops perioral tingling, carpopedal spasm, and a seizure. The most likely cause is:", options: ["Hypocalcemia", "Hyperkalemia", "Neutropenia", "Lactic acidosis"], correct: 0, explanation: "Foscarnet chelates divalent cations, causing symptomatic hypocalcemia (arrhythmias, seizures); the risk is increased by concurrent IV pentamidine." },
  { id: 9, question: "Valganciclovir's principal advantage over oral ganciclovir is:", options: ["It is a different drug class", "Much higher oral bioavailability (~60% vs ~6%), giving IV-comparable levels", "It carries no risk of neutropenia", "It inhibits the DNA polymerase directly"], correct: 1, explanation: "The valine ester dramatically improves gut absorption; once absorbed it is cleaved to ganciclovir, so it shares ganciclovir's toxicity profile (including neutropenia)." },
  { id: 10, question: "Intravitreal or IV cidofovir characteristically causes which ocular side effects?", options: ["Iritis and ocular hypotony", "Cataract and angle-closure glaucoma", "Optic neuritis", "Band keratopathy"], correct: 0, explanation: "Cidofovir causes iritis (reduced from ~50% to ~18% with oral probenecid) and hypotony due to ciliary body atrophy." },
  { id: 11, question: "To reduce cidofovir nephrotoxicity, you administer:", options: ["Allopurinol", "Probenecid and IV saline hydration", "Mannitol", "Acetazolamide"], correct: 1, explanation: "Probenecid blocks proximal tubular uptake of cidofovir, and saline loading reduces nephrotoxicity." },
  { id: 12, question: "High-level ganciclovir resistance in CMV typically involves mutations in:", options: ["UL97 alone", "UL54 alone", "Both UL97 and UL54", "The thymidine kinase gene"], correct: 2, explanation: "UL97 alone → low-level ganciclovir resistance; UL97 + UL54 → high-level resistance; UL54 alone → foscarnet/cidofovir resistance. CMV has no thymidine kinase gene of the relevant type." },
  { id: 13, question: "A ganciclovir-resistant CMV strain caused by a UL97 mutation would be expected to:", options: ["Also be resistant to foscarnet", "Remain susceptible to foscarnet", "Respond only to acyclovir", "Be untreatable"], correct: 1, explanation: "Foscarnet resistance is mediated by UL54 (DNA polymerase) mutations, so UL97 ganciclovir-resistant strains usually remain foscarnet-sensitive." },
  { id: 14, question: "Fomivirsen exerts its anti-CMV effect by:", options: ["Inhibiting the DNA polymerase", "Antisense binding to CMV IE2 (immediate-early) mRNA", "Blocking the UL97 kinase", "Chelating pyrophosphate"], correct: 1, explanation: "Fomivirsen is an antisense oligonucleotide targeting the major immediate-early (IE2) mRNA, blocking essential viral protein production; it does not act on the DNA polymerase." },
  { id: 15, question: "Why is a ganciclovir intraocular device typically combined with systemic (oral valganciclovir) therapy?", options: ["To reduce cataract formation", "Because local therapy does not treat systemic CMV or protect the fellow eye", "To lower intraocular pressure", "To speed healing of the injection wound"], correct: 1, explanation: "The implant treats only the eye it is in; implant-alone raises the risk of contralateral CMV retinitis and extraocular CMV disease, so systemic therapy is added." },
  { id: 16, question: "Which is the main early ocular risk in the first 2 months after ganciclovir implant placement?", options: ["Endophthalmitis in 20%", "Rhegmatogenous retinal detachment", "Choroidal neovascularization", "Vitreous hemorrhage from the implant strut"], correct: 1, explanation: "Retinal detachment risk is substantially higher in the first 2 months after insertion; endophthalmitis risk is on the order of ~1%." },
  { id: 17, question: "Retinal detachment in CMV retinitis is best described as:", options: ["Tractional from fibrovascular proliferation", "Exudative from a choroidal leak", "Rhegmatogenous from breaks in necrotic/atrophic retina", "Serous from RPE dysfunction"], correct: 2, explanation: "Breaks form in atrophic necrotic retina (active or healed). Median time to detachment is ~18 months; HAART reduced the incidence by ~60%." },
  { id: 18, question: "Surgical repair of CMV-related rhegmatogenous retinal detachment most often uses:", options: ["Pneumatic retinopexy", "Scleral buckle alone", "Pars plana vitrectomy with silicone oil", "Laser demarcation alone"], correct: 2, explanation: "Because of multiple posterior breaks in fragile necrotic retina and frequent PVR, vitrectomy with silicone oil tamponade is typically required." },
  { id: 19, question: "A patient with previously healed CMV retinitis starts HAART; CD4 rises to 150. He now develops vitritis, macular edema, and an epiretinal membrane. The diagnosis is:", options: ["Reactivation of CMV", "Immune recovery uveitis", "New acute retinal necrosis", "Bacterial endophthalmitis"], correct: 1, explanation: "Immune reconstitution produces an inflammatory response to residual CMV antigen in healed lesions — immune recovery uveitis." },
  { id: 20, question: "First-line management of vision-threatening immune recovery uveitis is:", options: ["Systemic ganciclovir", "Periocular or intravitreal corticosteroids", "Intravitreal antibiotics", "Immediate vitrectomy"], correct: 1, explanation: "IRU is an inflammatory (not actively infectious) process in a healed lesion, managed with corticosteroids." },
  { id: 21, question: "In acute retinal necrosis (ARN), the most common causative virus is:", options: ["Cytomegalovirus", "Varicella-zoster virus", "Epstein–Barr virus", "HIV"], correct: 1, explanation: "ARN is most often caused by VZV; HSV can also cause it. CMV was once presumed but not confirmed." },
  { id: 22, question: "Which cluster of features is typical of ARN rather than CMV retinitis?", options: ["Minimal vitritis with hemorrhagic posterior lesions", "Prominent anterior uveitis, occlusive vasculitis, vitritis, and papillitis", "Deep outer-retinal lesions without any vasculitis", "Isolated cotton-wool spots"], correct: 1, explanation: "ARN is a fulminant panuveitis; CMV in the immunosuppressed is comparatively quiet, and PORN lacks vasculitis/vitritis." },
  { id: 23, question: "Preferred initial therapy for acute retinal necrosis is:", options: ["Oral doxycycline", "IV acyclovir (e.g., 10 mg/kg q8h) followed by oral antiviral maintenance", "Intravitreal antibiotics", "Systemic corticosteroids alone"], correct: 1, explanation: "Prompt IV acyclovir, then oral valacyclovir/famciclovir/acyclovir maintenance; prophylactic barrier laser is often considered. Steroids are adjunctive and avoided in advanced HIV immunosuppression." },
  { id: 24, question: "A frequent and serious sequela of acute retinal necrosis is:", options: ["Rhegmatogenous retinal detachment with multiple peripheral breaks and PVR", "Central retinal artery occlusion", "Anterior ischemic optic neuropathy", "Bacterial corneal ulcer"], correct: 0, explanation: "Retinal detachment develops in a large fraction of ARN eyes, with multiple breaks in necrotic retina and frequent proliferative vitreoretinopathy." },
  { id: 25, question: "Progressive outer retinal necrosis (PORN) is nearly always caused by:", options: ["HSV-1", "Varicella-zoster virus", "Cytomegalovirus", "Toxoplasma gondii"], correct: 1, explanation: "PORN is a herpetic retinitis variant nearly always caused by VZV, often with associated dermatomal zoster." },
  { id: 26, question: "Which finding best distinguishes PORN from ARN?", options: ["Prominent vitritis and occlusive vasculitis", "Deep multifocal outer-retinal opacification with perivascular clearing and minimal/absent vitritis", "Hemorrhage at the leading edge", "A requirement for high CD4 counts"], correct: 1, explanation: "PORN characteristically has deep outer retinal lesions with perivascular clearing and little to no inflammation, unlike the vasculitis and vitritis of ARN." },
  { id: 27, question: "PORN characteristically occurs in patients with:", options: ["CD4 > 200/µL", "Profound immunosuppression, CD4 < 50/µL", "Normal immune function", "Isolated neutropenia"], correct: 1, explanation: "PORN occurs in profoundly immunosuppressed patients (CD4 <50/µL), whereas ARN tends to occur at relatively higher CD4 counts (>60/µL)." },
  { id: 28, question: "Why does IV acyclovir monotherapy give poor visual outcomes in PORN?", options: ["It cannot cross the blood–retina barrier", "Extremely rapid necrosis plus frequent acyclovir resistance (often on prior acyclovir prophylaxis) — NLP in ~67%", "It is directly retinotoxic", "VZV is always intrinsically acyclovir-resistant"], correct: 1, explanation: "Engström et al. reported no light perception in 67% of eyes within 4 weeks on IV acyclovir alone, attributed to fulminant progression and acyclovir resistance." },
  { id: 29, question: "The current preferred approach for PORN is:", options: ["IV acyclovir alone", "Combination IV plus intravitreal antivirals (ganciclovir + foscarnet) with ART, ± laser demarcation", "Observation", "Corticosteroids alone"], correct: 1, explanation: "Combination IV and intravitreal ganciclovir/foscarnet with antiretroviral therapy improved outcomes (e.g., 20/80 or better in ~45%); laser demarcation may reduce detachment." },
  { id: 30, question: "Cotton-wool spots in an HIV patient without hypertension or diabetes:", options: ["Require urgent antiviral therapy", "Are noninfectious nerve fiber layer infarcts that are transient and need no treatment", "Indicate active CMV retinitis", "Are pathognomonic for ARN"], correct: 1, explanation: "Cotton-wool spots are the most common retinal finding in HIV (50–75%), are noninfectious NFL infarcts that resolve over 6–12 weeks, and need no treatment — though AIDS should be considered in the differential." },
];

// ── Cornea · Part 1 · Basic Science (moved from the part page; unchanged content)
const CORNEA_BASIC_RECALL: RecallQ[] = [
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

const CORNEA_BASIC_MCQ: MCQ[] = [
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

export const RECALL: Record<string, RecallQ[]> = {
  "cornea/part1": CORNEA_BASIC_RECALL,
  "retina/part1": RETINA_VIRAL_RECALL,
};

export const MCQS: Record<string, MCQ[]> = {
  "cornea/part1": CORNEA_BASIC_MCQ,
  "retina/part1": RETINA_VIRAL_MCQ,
};

export function getRecall(topicId: string, partId: string): RecallQ[] {
  return RECALL[`${topicId}/${partId}`] ?? [];
}

export function getMcqPool(topicId: string, partId: string): MCQ[] {
  return MCQS[`${topicId}/${partId}`] ?? [];
}
