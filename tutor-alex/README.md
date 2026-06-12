# 🇬🇧 Olivia — English Tutor per Irene

Chat di conversazione in inglese con **Olivia**, un tutor IA paziente e incoraggiante, costruita come pagina statica singola (nessuna build, nessun Node/Python richiesto).

## Struttura dei file

```
tutor-alex/
├── index.html   ← tutta l'app (UI + logica + prompt del tutor)
└── README.md    ← questo file
```

## Come si lancia

**Opzione A — server statico locale (consigliata):**

```powershell
cd tutor-alex
python -m http.server 8080
# poi apri http://localhost:8080
```

(oppure `npx serve .` se preferisci Node)

**Opzione B — doppio click su `index.html`** (funziona nella maggior parte dei browser; se l'import del modulo viene bloccato, usa l'opzione A).

## Primo avvio

1. Al primo avvio l'app chiede la **chiave API Anthropic** (da [console.anthropic.com](https://console.anthropic.com/settings/keys)).
2. La chiave viene salvata **solo nel browser** (localStorage) — non finisce mai nel codice né nel repository. Non committare mai la chiave.
3. Olivia saluta e la conversazione parte subito.

## Funzionalità

- **Chat in streaming** con Claude (`claude-opus-4-8`) via SDK ufficiale `@anthropic-ai/sdk` (ESM da CDN).
- **Pannello di controllo** (sidebar, a scomparsa su mobile):
  - Argomento del giorno: Free Chat, Traveling, Daily Routine, Job Interview, School & Friends, Food & Cooking.
  - Livello: Beginner / Intermediate (cambia lessico, ritmo e velocità della voce).
- **My Corrections 💡**: tutte le sezioni "Quick Tip 💡" generate da Olivia vengono estratte automaticamente e raccolte nella sidebar, così Irene le ripassa a colpo d'occhio.
- **Voce di Olivia (TTS)**: toggle per la lettura automatica delle risposte + bottone "🔊 listen" su ogni messaggio (Web Speech API, voce inglese, velocità ridotta per il livello Beginner).
- **Rete di sicurezza in italiano**: se Irene chiede aiuto in italiano o si blocca, Olivia risponde brevemente in italiano e poi torna all'inglese (regola nel system prompt).

## Note tecniche

- Il system prompt del tutor è in `index.html`, funzione `buildSystemPrompt()` — argomento e livello vengono iniettati lì a ogni richiesta.
- Il marcatore `Quick Tip 💡:` è imposto dal prompt in forma esatta, così l'app può estrarre le correzioni in modo affidabile.
- La cronologia chat vive solo nella sessione corrente (refresh = nuova conversazione); chiave API e preferenza voce restano salvate.
