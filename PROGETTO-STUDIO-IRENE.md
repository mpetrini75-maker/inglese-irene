# 📚 Progetto Studio Irene — Guida del progetto

> Nota di partenza da incollare nel progetto **"Studio Irene"** di Cowork.
> Serve a Claude come contesto stabile: obiettivi, priorità, materiali e workflow.

---

## 🎯 Obiettivo

Aiutare Irene nello studio trasformando i materiali scolastici in lezioni su misura,
con memoria persistente delle sessioni.

**Catena di lavoro:**
materiali scolastici → **NotebookLM** (RAG / "memoria infinita") → lezioni mirate → **Obsidian** (note durature)

---

## 🔴 Priorità attuali

| Priorità | Materia | Scadenza | Note |
|----------|---------|----------|------|
| 1 | **Fisica** | Esame **fine agosto 2026** | Da affrontare per prima |
| 2 | Inglese | In corso | App di allenamento grammaticale (repo `inglese-irene`) |

> Aggiorna questa tabella quando cambiano scadenze o materie.

---

## 🧩 Strumenti e connettori da collegare

- **NotebookLM** — già impostato (skill `notebooklm-py` per accesso RAG completo).
  - Notebook dedicato: **"Recap sessioni Claude"** per i recap.
- **Obsidian** — vault delle note di studio.
- (Eventuali) Google Drive / file scolastici come fonte materiali.

---

## 🔄 Workflow per ogni sessione di studio

1. **Carica il materiale** del capitolo (PDF, appunti, slide) in NotebookLM.
2. **Studia con Claude**: spiegazioni, esercizi, schemi su misura.
3. **Riusa, non ricreare**: se un materiale/esercizio esiste già, copialo o adattalo
   — non riscriverlo da zero.
4. **A fine capitolo**: crea una nota **recap** nel notebook "Recap sessioni Claude"
   (cosa fatto, punti chiave, dubbi aperti, prossimi passi).
5. **Salva le note durature** in Obsidian.

---

## 🧠 Regole / preferenze già attive (memoria)

- **Una materia per sessione** per restare focalizzati e consumare meno contesto.
- **YouTube**: WebFetch non legge i video → usare `yt-dlp` + pulizia VTT per le trascrizioni.
- **Non duplicare** contenuti esistenti: copia/riusa.
- **Recap obbligatorio** a fine capitolo nel notebook dedicato.

---

## 📂 Materiali / link

> Inserisci qui i link ai materiali, al vault Obsidian, ai notebook e alle cartelle.

- Notebook NotebookLM principale: _(link)_
- Notebook "Recap sessioni Claude": _(link)_
- Vault Obsidian: _(percorso/link)_
- Cartella materiali scolastici: _(percorso/link)_

---

## ✅ Prossimi passi

- [ ] Collegare i connettori (NotebookLM, Obsidian/Drive) nel progetto Cowork
- [ ] Caricare i primi materiali di **Fisica**
- [ ] Definire il calendario di studio fino a fine agosto 2026
- [ ] Prima sessione di studio Fisica
