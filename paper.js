"use strict";

/* ------------------------------------------------------------------ data */


const TRACE = [
  { m: -19.3572, render: "TUM", pNorm: 0.000 },
  { m: -13.4178, out: 38996, in: 31425, a: 5.838069, render: "TUM", pNorm: 0.000 },
  { m:  -7.1728, out: 43076, in: 31425, a: 5.464266, render: "TUM", pNorm: 0.000 },
  { m:  -3.1869, out: 42793, in: 31425, a: 3.305787, render: "TUM", pNorm: 0.000 },
  { m:   6.1472, out: 38611, in: 31425, a: 9.532416, render: "NORM", pNorm: 0.588 },
  { m:   9.7276, out: 46852, in: 38309, a: 3.450701, render: "NORM", pNorm: 0.548 },
  { m:  13.0741, out: 32901, in: 38309, a: 3.778341, render: "NORM", pNorm: 0.999 },
  { m:  16.0716, out: 38753, in: 40317, a: 4.262510, render: "NORM", pNorm: 1.000 }
];

const PANELS = {
  belder: {
    tab: "ECM and top genes",
    paper: "Belder et al., 2025 · 49 paired tumour–normal specimens",
    cohort: { patients: 49, tiles: 686, per: 14, seeds: 4 },
    reports: "Belder and colleagues measured gene expression in 49 colorectal cancers and, for each, a piece of healthy bowel lining from the same patient. Because the measurement is made on a ground-up piece of tissue, they had a pathologist mark regions of the slide that were about 90 % tumour cells and cut only those regions out. Comparing tumour with healthy tissue, the most consistently changed group of genes was the extracellular matrix: the scaffold of collagens and related proteins that sits between cells, which carcinoma greatly expands by recruiting fibroblasts to lay it down. From that group they picked four genes whose high expression also predicted shorter survival, and confirmed each by a second method in the same patients and in 64 more: THBS2 (thrombospondin-2), FN1 (fibronectin) and the collagen chains COL1A1 and COL5A1. The study also lists the ten genes it found most raised in tumour and the ten most reduced; we score those as two further sets, so the result does not rest on four chosen genes.",
    sets: {
      ecm: {
        label: "Prognostic ECM signature",
        title: "Extracellular-matrix signature",
        desc: "The four matrix genes the study validated, all higher in tumour than in healthy tissue; expected to fall under the tumour-to-healthy edit.",
        agree: "4 / 4",
        stats: { dz: 2.40, slides: 98.0, empP: "2.4e-3", q: "6.7e-10" },
        genes: [["THBS2",1.292],["FN1",2.115],["COL1A1",2.278],["COL5A1",0.850]],
        observe: "We matched 49 TCGA patients to the study on sex, stage and tumour side, and to mimic the marked-out tumour regions took 14 spread-out tiles per patient that the classifier calls tumour with probability above 0.90. All four genes fall after the edit. The paired effect against the random displacement is 2.40  The random displacement also lowers FN1 and COL1A1, so part of the collagen drop is non-specific and the edit beats it by about one standard deviation on each; for THBS2 and COL5A1 the random arm does nothing. On the other two cohorts the same four genes fall 4 / 4."
      },
      up: {
        label: "Ten genes most elevated in tumours",
        title: "The study’s ten most up-regulated genes",
        desc: "The ten genes with the largest increase in tumour over healthy tissue in the study, 9.6- to 20-fold; expected to fall under the edit.",
        agree: "9 / 10",
        stats: { dz: 2.72, slides: 100, empP: "3.7e-3", q: "6.7e-10" },
        genes: [["THBS2",1.292],["COL10A1",0.630],["FAP",1.386],["INHBA",1.662],["GRIN2D",1.389],["MMP11",1.244],["SULF1",1.423],["BGN",1.441],["SPP1",0.612],["H19",-0.961]],
        observe: "Nine of the ten fall. The exception is H19, which goes the wrong way: it rises a little after the edit, in 76 % of patients, while almost every other gene falls, so relative to the median gene it stands about one standard deviation against the study’s direction. The random displacement raises it by the same amount. The paired effect against the random arm is 2.72 and every patient scores the edited images above the randomly displaced ones. FAP and GRIN2D are also lowered by the random displacement; SULF1, BGN, INHBA and THBS2 are almost untouched by it. The same nine fall and H19 misses in the same way on the Slattery cohort; on the Zhang cohort H19 misses again and SPP1 is a second, narrow miss."
      },
      down: {
        label: "Ten genes most reduced in tumours",
        title: "The study’s ten most down-regulated genes",
        desc: "The ten genes with the largest loss in tumour relative to healthy tissue in the study, 17- to 39-fold; expected to rise under the edit.",
        agree: "10 / 10",
        stats: { dz: 3.84, slides: 100, empP: "1.0e-5", q: "6.7e-10" },
        genes: [["SLC26A3",3.196],["CLCA1",3.826],["CA2",3.493],["SLC4A4",2.266],["CLCA4",5.730],["MS4A12",4.074],["CEACAM7",4.005],["CHGA",2.583],["CA1",5.120],["SCNN1B",3.272]],
        observe: "All ten rise, and this is the largest effect anywhere in the study: a mean aligned effect of 3.76 against 0.18 for the random arm, with CLCA4, CA1, MS4A12, CEACAM7 and CLCA1 each above 3.8. The paired effect against the random displacement is 3.84 and every patient favours the edited images. SLC26A3, the study’s single most reduced gene, is also the lead gene of the mineral-absorption set from Zhang et al. and rises there too. All ten rise on the other two cohorts as well, with effects of 3.67 and 3.41 against random."
      }
    }
  },
  wnt: {
    tab: "WNT signalling",
    paper: "Slattery et al., 2018 · 217 paired specimens",
    cohort: { patients: 217, tiles: 1736, per: 8, seeds: 4 },
    reports: "Slattery and colleagues studied 217 people with colorectal cancer from two population-based studies in Utah and Northern California. For each patient they took a piece of the tumour and a piece of healthy bowel lining beside it and sequenced the RNA of both, then asked how the genes of one pathway had changed. WNT signalling is the messaging system of the crypt: it tells the cells at the bottom to keep dividing and, as its signal fades toward the surface, lets them stop and mature. In about 80 % of colorectal cancers a mutation, usually in the APC gene, jams that signal on, which is why WNT is the textbook pathway for this disease. Of 138 WNT-pathway genes, 59 changed at least 1.5-fold in tumour with statistical significance: 32 rose and 27 fell. The rises are what a jammed pathway looks like: β-catenin itself (CTNNB1), its transcription partner LEF1, and the genes it switches on, among them MYC, CCND1, AXIN2, NKD1, NOTUM and MMP7. The falls are mostly the pathway’s inputs and brakes: nine WNT ligands, the secreted inhibitors SFRP1 and SFRP5, and genes of the pathway’s non-canonical calcium arm such as CAMK2A and PRKCB. The study’s own interest was in the microRNAs that might drive these changes; we use only its table of changed genes. One of the 59 (CSNK2A1P, a pseudogene) is not among HistoPrism’s outputs, leaving 58.",
    sets: {
      all: {
        label: "All 58 genes",
        title: "Suppression versus restoration",
        desc: "Share of genes moving in the direction the study predicts, for the 31 genes raised in tumour, the 27 reduced, and all 58 together.",
        agree: "49 / 58",
        stats: { dz: 1.84, slides: 97.7, empP: "1.0e-5", q: "2.3e-37" },
        aggregate: true,
        genes: [["Raised in tumour", 29, 31], ["Reduced in tumour", 20, 27], ["All genes", 49, 58]],
        observe: "We matched 217 TCGA patients to the study’s own table of patient characteristics, exactly on sex, colon versus rectal site, stage, microsatellite instability and KRAS and BRAF mutation counts, and to within a quarter of a year on mean age, with eight tumour tiles per patient. Taking all 58 genes together, 49 move beyond the median gene in the direction the study predicts, the edit beats the random displacement with a paired effect of 1.84, and 97.7 % of patients favour the edited images. The aggregate hides an asymmetry between the two halves: almost all of the effect comes from the genes raised in tumour, which the edit lowers, while the genes reduced in tumour, which the edit would have to raise, do not respond. The other two gene sets show each half on its own, with its own comparison against the random arm."
      },
      up: {
        label: "31 genes raised in tumour",
        title: "The tumour’s WNT programme is switched off",
        desc: "The 31 genes the study found at least 1.5-fold higher in tumour, ordered by the study’s fold change with the largest first; expected to fall under the edit.",
        agree: "29 / 31",
        stats: { dz: 2.92, slides: 100, empP: "1.0e-5", q: "2.1e-37" },
        genes: [["NOTUM",0.049],["MMP7",0.117],["WNT2",1.057],["NKD1",1.761],["SFRP4",1.250],["NKD2",0.946],["WNT11",0.890],["AXIN2",1.953],["WIF1",0.387],["DKK2",1.317],["MYC",2.600],["FOSL1",-0.040],["FZD10",1.320],["LEF1",1.411],["WNT3",0.051],["CCND1",0.840],["DKK4",0.725],["FZD3",1.285],["WNT7B",-0.707],["CSNK2A2",1.996],["PLCB4",2.175],["PLCB1",1.833],["GPC4",2.060],["RUVBL1",2.194],["WNT5A",0.480],["BAMBI",0.613],["TP53",1.457],["CACYBP",1.547],["CTNNB1",1.799],["CCND2",1.291],["ROCK2",1.132]],
        observe: "Twenty-nine of the 31 fall further than the median gene; the exceptions are WNT7B, which does not move, and FOSL1, which falls only as far as the median gene. The paired effect against the random displacement is 2.92 and every patient favours the edited images. The largest absolute drops are in the pathway’s core: MYC falls by 1.04 in log expression, CTNNB1 by 0.90 and AXIN2 by 0.72, with PLCB4, NKD1 and TP53 close behind. The random displacement also lowers many of these genes, and for MYC, AXIN2, CTNNB1, LEF1 and WNT2 almost as much, so the edit’s specific contribution there is the gap between the two arms, about half a standard deviation averaged over the 31; RUVBL1, PLCB1, CSNK2A2, CACYBP, TP53, DKK2, NKD2 and CCND1 fall under the edit and barely at all under random. Some of the study’s largest fold changes hardly register: NOTUM (19-fold in the study), MMP7 (13-fold), WNT3 and FOSL1 fall no more than the median gene does. The result repeats on the other two cohorts, 27 and 26 of 31, with NOTUM, MMP7 and FOSL1 among the misses on both."
      },
      down: {
        label: "27 genes reduced in tumour",
        title: "The healthy WNT programme is not restored",
        desc: "The 27 genes the study found at least 1.5-fold lower in tumour, ordered by the study’s fold change with the most reduced first; expected to rise under the edit.",
        agree: "20 / 27",
        stats: { dz: -0.78, slides: 20.7, empP: "4.5e-2", q: "1.0" },
        genes: [["SFRP1",0.989],["PPP3R2",0.364],["CAMK2A",1.162],["PRKCB",0.430],["WNT5B",0.216],["WNT1",1.226],["MAPK10",0.083],["WNT10B",0.351],["PRKACB",0.996],["WNT2B",0.515],["WNT9A",0.893],["CAMK2B",0.219],["DAAM2",1.424],["TBL1Y",-0.537],["TCF7L1",0.146],["NFATC1",-0.043],["SFRP5",1.756],["WNT4",0.564],["PRKACG",0.441],["PLCB2",0.594],["RAC2",-0.844],["WNT10A",0.891],["PRICKLE2",0.389],["CAMK2D",-0.760],["WNT16",-0.128],["WNT8B",-0.617],["SOX17",-0.206]],
        observe: "Twenty of the 27 end above the median gene, but only 11 rise in absolute terms and those rises are tiny: no gene moves by more than 0.06 in log expression, against drops of up to 1.0 in the other half; most of the twenty count as favourable only because the median gene falls. Against the random displacement this half fails: the paired effect is −0.78 and only 21 % of patients favour the edited images, meaning that moving the token the same distance in an arbitrary direction raises these genes at least as much as the edit does. A few genes do rise more after the edit than after random: SFRP1, SFRP5, CAMK2A, PRKACB and DAAM2. Seven of the nine WNT ligands, PRKCB and MAPK10 are as flat or flatter under the edit as under random, and RAC2, CAMK2D and SOX17 move the wrong way. The other two cohorts behave the same, 21 and 19 of 27 above the median gene with the paired effect against random negative on both."
      }
    }
  },
  zhang: {
    tab: "ER stress and mineral absorption",
    paper: "Zhang et al., 2019 · single-cell reanalysis, 11 patients",
    cohort: { patients: 11, tiles: 88, per: 8, seeds: 4 },
    reports: "Zhang and colleagues did not collect tissue themselves. They reanalysed a public dataset from Li et al. (2017), in which eleven colorectal tumours and matched healthy mucosa were dissociated into single cells and each cell’s RNA sequenced. Keeping only the epithelial cells, 272 from tumour and 160 from healthy tissue, they trained a classifier to tell the two apart, kept the 342 genes it relied on most, split those into genes higher in tumour cells and genes higher in healthy cells, and asked which known pathways each list was enriched for. Among genes higher in tumour cells the pathways were the ribosome, nine ribosomal proteins, and protein processing in the endoplasmic reticulum: seven heat-shock chaperones and stress-response genes (HSPA5, HSPA1B, HSPA6, HSP90AA1, HSP90AB1, HSPH1, PPP1R15A) that fold and repair proteins under stress, which fast-growing cancer cells depend on. Among genes higher in healthy cells the strongest pathway was mineral absorption: SLC26A3, the chloride–bicarbonate exchanger of the colon surface, and six metallothioneins, small zinc-binding proteins abundant in mature colon cells. Three more healthy-cell pathways concern salt, water and bicarbonate transport, and one is oxidative phosphorylation, the mitochondrial energy chain. We pre-registered the two headline pathways and score the other four as further sets here. Because the study compares single cells, it is the one of the three whose contrast is purely between epithelial cells, with no stroma on either side.",
    sets: {
      er: {
        label: "Protein processing in the ER",
        title: "Protein processing in the endoplasmic reticulum",
        desc: "Seven chaperone and stress-response genes the study found higher in tumour epithelial cells; expected to fall under the edit.",
        agree: "7 / 7",
        stats: { dz: 1.92, slides: 100, empP: "4.1e-2", q: "2.3e-3" },
        genes: [["HSPA5",0.586],["HSPA1B",0.046],["HSPA6",0.160],["HSP90AA1",0.752],["HSP90AB1",1.546],["HSPH1",0.851],["PPP1R15A",0.204]],
        observe: "Our cohort is eleven TCGA patients with stage II or III colorectal cancer and both a tumour and a healthy-tissue slide, chosen from eighteen eligible patients for image quality and epithelial yield before any gene prediction was seen. We edit eight tumour tiles per patient that the classifier calls tumour with probability above 0.90. All seven genes fall and every patient favours the edited images over the random displacement, but the effects are modest: a mean aligned effect of 0.59 against zero for the random arm. HSP90AB1, HSP90AA1 and HSPH1 carry most of it; HSPA1B barely moves, and for HSPA6 the random displacement does slightly more than the edit. The chance that a random set of seven genes scores this well is 4 %, the highest of any set. HistoPrism reads all seven higher in the real tumour slides than in the real healthy-tissue slides of these same patients. The set stays 7 / 7 with larger effects on the 49- and 217-patient cohorts, 2.95 and 2.53 against random."
      },
      mineral: {
        label: "Mineral absorption",
        title: "Mineral absorption",
        desc: "SLC26A3 and six metallothioneins the study found lower in tumour epithelial cells; expected to rise under the edit.",
        agree: "7 / 7",
        stats: { dz: 1.78, slides: 100, empP: "2.3e-4", q: "2.3e-3" },
        genes: [["SLC26A3",3.446],["MT1E",2.087],["MT1F",2.328],["MT1G",2.573],["MT1M",3.547],["MT1X",0.895],["MT2A",0.683]],
        observe: "All seven genes rise, with a mean aligned effect of 2.22 against −0.20 for the random arm and SLC26A3 and MT1M above 3.4. Every patient favours the edited images. MT1X and MT2A move the right way but their individual changes are not significant; six of the seven rise in every one of the four diffusion seeds taken separately, MT2A in three. SLC26A3 is also Belder et al.’s single most reduced gene in tumour and rises on that cohort too. The result replicates on the larger cohorts, 7 / 7 on both with effects of 1.82 and 1.62 against random. On the real tumour and healthy-tissue slides of these same eleven patients, HistoPrism reads five of the seven higher in healthy tissue."
      },
      transport: {
        label: "Salt and bicarbonate transport",
        title: "Three more healthy-cell pathways: salt, water and bicarbonate",
        desc: "The study’s other pathways lower in tumour cells, pooled: aldosterone-regulated sodium reabsorption, pancreatic secretion and nitrogen metabolism, 13 genes after removing the shared CA2 and SLC26A3, which already anchors the mineral set; expected to rise.",
        agree: "13 / 13",
        stats: { dz: 2.99, slides: 100, empP: "1.0e-5", q: "2.3e-3" },
        genes: [["HSD11B2",3.029],["NR3C2",4.333],["SCNN1A",1.488],["SCNN1G",2.624],["SGK1",1.991],["NEDD4L",0.676],["PLA2G10",2.602],["CLCA1",2.751],["CLCA4",4.113],["SLC4A4",2.430],["CA2",3.977],["CA1",3.942],["CA7",4.830]],
        observe: "All 13 rise, with the largest effect anywhere in this study: a mean aligned effect of 2.98 against −0.04 for the random arm, every patient favouring the edited images, and ten of the 13 above 2.4. CA7, NR3C2, CLCA4, CA2 and CA1 lead. Five of the 13 (CLCA1, CLCA4, CA1, CA2, SLC4A4) are also among the ten genes Belder et al. found most reduced in tumour, and the edit raises them on that cohort too. The set replicates 12 / 13 on each of the other two cohorts, 2.81 and 3.46 against random, NEDD4L the one miss on each."
      },
      ribosome: {
        label: "Ribosome",
        title: "Ribosomal genes fall, but so do they under any displacement",
        desc: "Nine ribosomal protein genes the study found higher in tumour epithelial cells; expected to fall under the edit.",
        agree: "9 / 9",
        stats: { dz: 1.96, slides: 90.9, empP: "1.0e-5", q: "2.7e-3" },
        genes: [["RPS4Y1",0.475],["RPS18",2.275],["RPS27A",1.614],["RPL7",1.710],["RPL13",1.947],["RPL18A",1.796],["RPL21",1.207],["RPL23",1.882],["RPL38",2.020]],
        observe: "All nine fall, and by a lot: eight of them by 0.8 to 1.3 in log expression, the largest raw changes of any set in the study. But the random displacement lowers them nearly as much, a mean aligned effect of 1.66 against 1.13 for random, so the edit’s specific contribution is about half a standard deviation; 91 % of patients favour the edit. RPS4Y1 is the weakest of the nine here and the one miss on the other two cohorts, where eight of nine fall but the margin over random is smaller and a random gene set matches the score about one time in five."
      },
      oxphos: {
        label: "Oxidative phosphorylation",
        title: "Oxidative phosphorylation moves the wrong way",
        desc: "Seven mitochondrial respiratory-chain genes the study found lower in tumour epithelial cells; expected to rise under the edit. Three are shown under their current symbols (ATP5F1C, ATP5MC1, ATP5PD; the study prints ATP5C1, ATP5G1, ATP5H).",
        agree: "1 / 7",
        stats: { dz: -1.84, slides: 9.1, empP: "8.2e-1", q: "1.0" },
        genes: [["NDUFB1",-0.143],["COX6B1",-0.946],["COX7A2",-0.081],["COX7C",-0.369],["ATP5F1C",-0.086],["ATP5MC1",-0.355],["ATP5PD",0.452]],
        observe: "Only ATP5PD ends above the median gene, and none of the seven rises in absolute terms: all fall after the edit, six of them by more than the median gene, while the random displacement leaves them at or above the median. Against the random arm the set fails outright: the paired effect is −1.84 and one patient in eleven favours the edit. The failure repeats on the other two cohorts, 0 / 7 on both. This is the one set in the three studies where the edit contradicts the paper."
      }
    }
  }
};

/* --------------------------------------------------------------- helpers */

const $ = (sel) => document.querySelector(sel);
const fmt = (v, d = 1) => v.toFixed(d);

/* -------------------------------------------------------------- progress */

function initProgress() {
  const bar = $("#progress");
  const tick = () => {
    const span = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = span > 0 ? `${Math.min(100, (window.scrollY / span) * 100)}%` : "0%";
  };
  tick();
  addEventListener("scroll", tick, { passive: true });
  addEventListener("resize", tick);
}

/* --------------------------------------------------------------- drawers */

function initDrawers() {
  const all = [...document.querySelectorAll("details")];
  const btn = $("#expandAll");
  if (!all.length) return;

  const allOpen = () => all.every((d) => d.open);
  const sync = () => {
    if (!btn) return;
    const open = allOpen();
    btn.textContent = open ? "Collapse all detail" : "Expand all detail";
    btn.setAttribute("aria-expanded", String(open));
  };
  const setAll = (open) => { all.forEach((d) => { d.open = open; }); sync(); };

  // MathJax measures from font metrics, but a drawer that has never been
  // painted can still mis-size a wide display equation on first reveal.
  all.forEach((d) => d.addEventListener("toggle", () => {
    if (d.open && !d.dataset.typeset && window.MathJax?.typesetPromise) {
      d.dataset.typeset = "1";
      window.MathJax.typesetPromise([d]).catch(() => {});
    }
    sync();
  }));

  btn?.addEventListener("click", () => setAll(!allOpen()));

  // A link into a closed drawer should open it, so anchors inside the folded
  // sections keep working from the contents list and cross-references. This
  // runs only on in-page navigation: every drawer starts closed on load, even
  // when the URL still carries a hash from an earlier visit.
  const reveal = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    const target = id && document.getElementById(id);
    if (!target) return;
    let changed = false;
    for (let d = target.closest("details"); d; d = d.parentElement?.closest("details")) {
      if (!d.open) { d.open = true; changed = true; }
    }
    if (changed) requestAnimationFrame(() => target.scrollIntoView({ behavior: "instant", block: "start" }));
  };
  addEventListener("hashchange", reveal);
  sync();

  let restore = null;
  addEventListener("beforeprint", () => {
    restore = all.map((d) => d.open);
    all.forEach((d) => { d.open = true; });
  });
  addEventListener("afterprint", () => {
    if (!restore) return;
    all.forEach((d, i) => { d.open = restore[i]; });
    restore = null;
    sync();
  });
}

/* ------------------------------------------------------------------- toc */

function initToc() {
  const links = [...document.querySelectorAll(".toc a")];
  const map = new Map();
  links.forEach((a) => {
    const el = document.querySelector(a.getAttribute("href"));
    if (el) map.set(el, a);
  });
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.remove("here"));
      map.get(e.target)?.classList.add("here");
    });
  }, { rootMargin: "-72px 0px -70% 0px", threshold: 0 });
  map.forEach((_, el) => obs.observe(el));
}

/* -------------------------------------------------------------- spectrum */

/* Channel-averaged radial power of the normalised GigaPath latent, one entry per
   rounded shell of the 14x14 grid, read from the profile tensor Stage 2 loads. */
const LATENT_POWER = [64.5710, 2.3061, 1.2571, 0.7701, 0.6272,
                      0.5549, 0.5329, 0.4981, 0.4758, 0.4660, 0.4624];
/* Bins per shell. These are far from uniform and Eq. 12 normalises with them, so the
   curve below would be wrong if the shells were weighted equally. */
const SHELL_BINS = [1, 8, 12, 16, 32, 28, 40, 30, 20, 8, 1];
const GAIN_MIN = 0.25, GAIN_MAX = 4;

function spectrumSeries() {
  const N = SHELL_BINS.reduce((s, n) => s + n, 0);
  let src = LATENT_POWER.map(Math.sqrt);
  const scale = Math.sqrt(
    src.reduce((s, a, i) => s + SHELL_BINS[i] * a * a, 0) / N);
  src = src.map((a) => a / scale);

  // White endpoint: S_q = 1 on every bin, so A_q is flat and already unit-normalised.
  const tgt = src.map(() => 1);
  const raw = src.map((a, i) => tgt[i] / Math.max(a, 1e-12));
  const gain = raw.map((g) => Math.min(GAIN_MAX, Math.max(GAIN_MIN, g)));
  return { src, tgt, raw, gain, N };
}

function drawSpectrum() {
  const { src, tgt, raw, gain, N } = spectrumSeries();
  const W = 720, H = 258, padL = 50, padR = 16, padT = 16, padB = 38;
  const rMax = LATENT_POWER.length - 1;
  const lo = 0.1, hi = 10;

  const x = (r) => padL + (r / rMax) * (W - padL - padR);
  const y = (v) => H - padB -
    ((Math.log10(Math.max(v, lo)) - Math.log10(lo)) /
     (Math.log10(hi) - Math.log10(lo))) * (H - padT - padB);
  const path = (vals) => vals.map((v, i) =>
    `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const dots = (vals, fill) => vals.map((v, i) =>
    `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="2.1" fill="${fill}"/>`).join("");

  const grid = [0.125, 0.25, 0.5, 1, 2, 4, 8].map((t) => `
    <line x1="${padL}" x2="${W - padR}" y1="${y(t)}" y2="${y(t)}" stroke="#ebe8e2"/>
    <text x="${padL - 8}" y="${y(t) + 3.5}" text-anchor="end" font-size="10" fill="#9aa0a6">${t}</text>`).join("");
  const xticks = Array.from({ length: rMax + 1 }, (_, r) =>
    `<text x="${x(r)}" y="${H - padB + 15}" text-anchor="middle" font-size="10" fill="#9aa0a6">${r}</text>`).join("");

  const clippedShells = raw.filter((g) => g < GAIN_MIN || g > GAIN_MAX).length;
  const clippedBins = SHELL_BINS.reduce(
    (s, n, i) => s + (raw[i] < GAIN_MIN || raw[i] > GAIN_MAX ? n : 0), 0);

  $("#spectrumPlot").innerHTML = `
  <svg viewBox="0 0 ${W} ${H}" role="img">
    ${grid}${xticks}
    <line x1="${padL}" x2="${padL}" y1="${padT}" y2="${H - padB}" stroke="#d8d5ce"/>
    <line x1="${padL}" x2="${W - padR}" y1="${H - padB}" y2="${H - padB}" stroke="#d8d5ce"/>
    <line x1="${padL}" x2="${W - padR}" y1="${y(GAIN_MIN)}" y2="${y(GAIN_MIN)}" stroke="#7a2d24" stroke-dasharray="3 3"/>
    <line x1="${padL}" x2="${W - padR}" y1="${y(GAIN_MAX)}" y2="${y(GAIN_MAX)}" stroke="#7a2d24" stroke-dasharray="3 3"/>
    <text x="${W - padR - 2}" y="${y(GAIN_MIN) - 4}" text-anchor="end" font-size="9" fill="#7a2d24">clip 0.25</text>
    <text x="${W - padR - 2}" y="${y(GAIN_MAX) - 4}" text-anchor="end" font-size="9" fill="#7a2d24">clip 4</text>

    <path d="${path(src)}" fill="none" stroke="#6b8299" stroke-width="1.6" stroke-dasharray="5 3"/>
    <path d="${path(tgt)}" fill="none" stroke="#2b4257" stroke-width="1.6"/>
    <path d="${path(gain)}" fill="none" stroke="#7a2d24" stroke-width="2"/>
    ${dots(src, "#6b8299")}${dots(gain, "#7a2d24")}

    <line x1="${x(0)}" x2="${x(0)}" y1="${y(raw[0])}" y2="${y(gain[0])}"
          stroke="#7a2d24" stroke-width="1" stroke-dasharray="2 2"/>
    <circle cx="${x(0)}" cy="${y(raw[0])}" r="2.6" fill="#fff" stroke="#7a2d24" stroke-width="1.2"/>
    <text x="${x(0) + 7}" y="${y(raw[0]) + 3}" font-size="9" fill="#7a2d24">
      unclipped ${raw[0].toFixed(3)}
    </text>
    <text x="${x(0) + 7}" y="${y(src[0]) + 3}" font-size="9" fill="#6b8299">
      DC ${src[0].toFixed(2)}
    </text>

    <text x="${W - padR}" y="${padT + 10}" text-anchor="end" font-size="10" fill="#6d7178">
      normalised amplitude and gain (log scale)
    </text>
    <text x="${(W + padL) / 2}" y="${H - 4}" text-anchor="middle" font-size="10" fill="#9aa0a6">
      rounded radial shell r
    </text>
  </svg>
  <div class="key" style="padding-left:0;border:0">
    <span><i style="background:#6b8299"></i>measured source amplitude A_z</span>
    <span><i style="background:#2b4257"></i>white endpoint amplitude A_q</span>
    <span><i style="background:#7a2d24"></i>applied gain g_q</span>
  </div>`;

  $("#spectrumStatus").textContent =
    `Measured GigaPath latent, white endpoint. Clip active on ${
      clippedShells} of ${LATENT_POWER.length} shells, ${clippedBins} of ${N} bins.`;
}

function initSpectrum() {
  drawSpectrum();
}

const state = { panel: "belder", set: "ecm" };

/* ----------------------------------------------------------------- swaps */

function drawTrace(step) {
  const plural = step === 1 ? "" : "s";
  const img = $("#traceRender");
  img.src = `img/trace/step_${step}.png`;
  img.alt = step === 0
    ? "Image generated from the unedited conditioning token"
    : `Image generated after ${step} concept exchange${plural}`;
  $("#traceRenderLabel").textContent = step === 0
    ? "generated, before editing"
    : `generated, after ${step} exchange${plural}`;
}

function initSwaps() {
  TRACE.forEach((_, i) => { const im = new Image(); im.src = `img/trace/step_${i}.png`; });
  const r = $("#swapRange");
  r.addEventListener("input", () => drawTrace(Number(r.value)));
  drawTrace(0);
}

/* ---------------------------------------------------------- swap browser */

const SB = { tile: 0, step: 0 };

function sbConceptSide(kind, id, amount) {
  const c = SWAPS.concepts[String(id)];
  const strip = c.tiles.map((f) => `<img src="img/swaps/concepts/${f}" alt="" loading="lazy">`).join("");
  return `<div class="sb-side ${kind}">
    <div class="sb-side-head">
      <span class="tag">${kind === "out" ? "removed" : "added"} · ${amount.toFixed(2)} activation units</span>
      <b>${c.name}</b>
      <small>concept #${id.toLocaleString()} · fires mostly on NCT-CRC ${c.cls} tiles</small>
    </div>
    <div class="sb-strip">${strip}</div>
  </div>`;
}

function drawSwaps() {
  const tile = SWAPS.tiles[SB.tile];
  const step = Math.min(SB.step, tile.n);
  const steps = tile.steps;
  const lo = -25, hi = 21, span = hi - lo;
  const pos = (v) => ((hi - v) / span) * 100;

  // Past ten exchanges the column labels collide, so only even steps are labelled.
  const every = steps.length > 10 ? 2 : 1;
  const cols = steps.map((t, i) => {
    const zero = pos(0), y = pos(t.m);
    const tick = i === 0 ? "src" : (i % every === 0 || i === tile.n ? i : "");
    return `<div class="mcol ${t.m >= 0 ? "pos" : ""} ${i === step ? "on" : ""}">
      <div class="mbar" style="top:${t.m >= 0 ? y : zero}%;height:${Math.abs(y - zero)}%"></div>
      <label>${tick}</label>
    </div>`;
  }).join("");
  const PAD_TOP = 14, PLOT_H = 212;
  const rulePx = (v) => (PAD_TOP + (pos(v) / 100) * PLOT_H).toFixed(1);
  const chart = $("#sbChart");
  chart.style.gridTemplateColumns = `repeat(${steps.length}, 1fr)`;
  chart.innerHTML = cols +
    `<div class="mrule" style="top:${rulePx(0)}px"><span>50% normal-mucosa probability</span></div>
     <div class="mrule thresh" style="top:${rulePx(SWAPS.stopMargin)}px"><span>stop: median real-normal score</span></div>`;

  const t = steps[step];
  $("#sbReal").src = `img/swaps/${tile.key}/real.jpg`;
  const img = $("#sbRender");
  img.src = `img/swaps/${tile.key}/step_${step}.png`;
  img.alt = step === 0 ? "Halo render of the unedited token" : `Halo render after exchange ${step}`;
  const pct = (t.rNorm * 100).toFixed(t.rNorm > 0.995 || t.rNorm < 0.005 ? 1 : 0);
  $("#sbRenderLabel").textContent = (step === 0 ? "render, source token" : `render, exchange ${step}`) +
    ` · classified ${t.render} (${pct} % NORM)`;
  $("#sbTileLabel").textContent = `${tile.label} · ${step === 0 ? "source token" : `after exchange ${step} of ${tile.n}`}`;
  $("#sbMargin").textContent = `${t.m >= 0 ? "+" : "−"}${Math.abs(t.m).toFixed(2)}`;

  const box = $("#sbExchange");
  if (step === 0) {
    box.innerHTML = `<p class="sb-empty">Source tumour token, ${Math.abs(t.m).toFixed(2)} score units below the 50% normal-mucosa probability threshold. ` +
      `The edit will take ${tile.n} exchanges to reach the stopping threshold; move the slider to see the first.</p>`;
  } else {
    const note = t.m >= SWAPS.stopMargin ? "The token has reached the median score of real normal-mucosa tiles, so editing stops."
      : t.m >= 0 ? "The token has at least 50% predicted probability of normal mucosa, but has not reached the stopping score."
      : "The token has less than 50% predicted probability of normal mucosa.";
    box.innerHTML = sbConceptSide("out", t.out, t.a) + sbConceptSide("in", t.in, t.a) + `<p class="sb-note">${note}</p>`;
  }
}

function initSwapBrowser() {
  if (typeof SWAPS === "undefined" || !$("#sbTiles")) return;
  const range = $("#sbRange");
  const tabs = $("#sbTiles");
  tabs.innerHTML = SWAPS.tiles.map((t, i) => ({ t, i })).sort((a, b) => b.t.n - a.t.n).map(({ t, i }) =>
    `<button type="button" class="sb-tile ${i === 0 ? "on" : ""}" role="tab" aria-selected="${i === 0}" data-i="${i}">
      <img src="img/swaps/${t.key}/real.jpg" alt="" width="72" height="72"><span>${t.n} exchanges</span>
    </button>`).join("");
  const pick = (i) => {
    SB.tile = i; SB.step = 0;
    const tile = SWAPS.tiles[i];
    tabs.querySelectorAll(".sb-tile").forEach((b) => {
      const on = Number(b.dataset.i) === i;
      b.classList.toggle("on", on); b.setAttribute("aria-selected", on);
    });
    range.max = tile.n; range.value = 0;
    $("#sbRangeEnd").textContent = `exchange ${tile.n}`;
    tile.steps.forEach((_, k) => { const im = new Image(); im.src = `img/swaps/${tile.key}/step_${k}.png`; });
    drawSwaps();
  };
  tabs.addEventListener("click", (e) => {
    const b = e.target.closest(".sb-tile");
    if (b) pick(Number(b.dataset.i));
  });
  range.addEventListener("input", () => { SB.step = Number(range.value); drawSwaps(); });
  pick(0);
}

/* --------------------------------------------------------------- compare */

function initCompare() {
  document.querySelectorAll("[data-compare]").forEach((frame) => {
    const cell = frame.closest(".compare-cell") || frame.parentElement;
    const range = cell.querySelector("[data-compare-range]");
    const top = frame.querySelector(".compare-top");
    const rule = frame.querySelector(".compare-rule");

    const paint = (v) => {
      top.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
      rule.style.left = `${v}%`;
    };
    const sync = () => paint(Number(range.value));

    // Dragging anywhere on the image moves the divider; the range input stays
    // as the keyboard-accessible control and single source of truth.
    const fromPointer = (e) => {
      const r = frame.getBoundingClientRect();
      const v = Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100));
      range.value = String(Math.round(v));
      paint(v);
    };
    frame.addEventListener("pointerdown", (e) => {
      frame.setPointerCapture(e.pointerId);
      frame.classList.add("dragging");
      fromPointer(e);
    });
    frame.addEventListener("pointermove", (e) => {
      if (frame.hasPointerCapture(e.pointerId)) fromPointer(e);
    });
    const release = (e) => {
      if (frame.hasPointerCapture(e.pointerId)) frame.releasePointerCapture(e.pointerId);
      frame.classList.remove("dragging");
    };
    frame.addEventListener("pointerup", release);
    frame.addEventListener("pointercancel", release);

    range.addEventListener("input", sync);
    sync();
  });
}

/* ---------------------------------------------------------------- panels */

function drawPanel() {
  const panel = PANELS[state.panel];
  // A study can contribute several gene sets to one tab; the active set supplies
  // everything below the shared "what the study reports" text.
  const sets = panel.sets || null;
  if (sets && !(state.set in sets)) state.set = Object.keys(sets)[0];
  const p = sets ? { ...panel, ...sets[state.set] } : panel;
  const setHost = $("#panelSets");
  setHost.hidden = !sets;
  if (sets) {
    setHost.innerHTML = `<span>Gene set</span>` + Object.entries(sets).map(([k, s]) =>
      `<button role="tab" aria-selected="${k === state.set}" class="${k === state.set ? "on" : ""}" data-set="${k}">${s.label}</button>`).join("");
    setHost.querySelectorAll("button").forEach((b) =>
      b.addEventListener("click", () => { state.set = b.dataset.set; drawPanel(); }));
  }
  $("#panelPaper").textContent = p.paper;
  $("#panelTitle").textContent = p.title;
  $("#panelDesc").textContent = p.desc;
  $("#panelAgree").textContent = p.agree;

  const chart = $("#geneChart");
  const key = $("#chartKey");

  if (p.aggregate) {
    chart.innerHTML = p.genes.map(([label, hit, n]) => `
      <div class="gene agg">
        <strong>${label}</strong>
        <div class="track" title="${hit} of ${n} genes agreed on the centred measure">
          <span class="fill" style="left:0;width:${(hit / n) * 100}%"></span>
        </div>
        <span>${hit} / ${n}</span>
      </div>`).join("");
    key.innerHTML = `<span><i></i>Genes agreeing on the centred measure</span>`;
  } else {
    // Stored effects are direction-aligned; restore the centred expression sign.
    const expectedDirection = ["ecm", "up", "er", "ribosome"].includes(state.set) ? -1 : 1;
    $("#panelDesc").textContent = `These genes were ${expectedDirection < 0 ? 'elevated' : 'reduced'} in colorectal tumours relative to healthy tissue. Agreement with the tumour-to-healthy edit therefore appears as ${expectedDirection < 0 ? 'leftward' : 'rightward'} bars.`;
    const max = Math.max(...p.genes.map(([, v]) => Math.abs(v)));
    chart.innerHTML = `<div class="gene gene-axis" aria-label="Centred effect axis"><span></span><div><span>Lower centred effect ←</span><b>0</b><span>→ Higher centred effect</span></div><span></span></div>` + p.genes.map(([g, v]) => {
      const effect = v * expectedDirection;
      const w = Math.max(1, (Math.abs(v) / max) * 48);
      const side = effect >= 0 ? `left:50%;width:${w}%` : `right:50%;width:${w}%`;
      return `<div class="gene">
        <strong>${g}</strong>
        <div class="track" title="${g}: centred effect ${effect.toFixed(3)}; study-derived tumour-to-healthy direction: ${expectedDirection < 0 ? 'decrease' : 'increase'}">
          <span class="fill ${v < 0 ? "neg" : ""}" style="${side}"></span>
        </div>
        <span>${effect > 0 ? "+" : ""}${effect.toFixed(3)}</span>
      </div>`;
    }).join("");
    key.innerHTML = `<span><i></i>Agrees with study</span>
                     <span><i class="neg"></i>Disagrees with study</span>`;
  }

}

function initPanels() {
  const host = $("#panelTabs");
  const render = () => {
    host.innerHTML = Object.entries(PANELS).map(([k, p]) =>
      `<button role="tab" aria-selected="${k === state.panel}" class="${k === state.panel ? "on" : ""}" data-panel="${k}">${p.tab}</button>`).join("");
    host.querySelectorAll("button").forEach((b) =>
      b.addEventListener("click", () => { state.panel = b.dataset.panel; render(); drawPanel(); }));
  };
  render();
  drawPanel();
}

/* ------------------------------------------------------------------ boot */

initProgress();
initDrawers();
initToc();
initSpectrum();
initSwaps();
initSwapBrowser();
initCompare();
initPanels();
