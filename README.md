# AI Visibility Audit Hackathon

Public hackathon repository for **Digital Platform 271's AI Brand Visibility Analyzer**.

The prototype helps a user enter a brand website/domain and receive an AI visibility assessment across five layers:

1. AI Presence
2. AI Understanding
3. AI Authority
4. Citation Authority
5. Recommendation Readiness

It is designed to answer three practical questions:

- Where is the brand weak?
- Why does that weakness matter?
- What should be fixed first?

## Live prototype

**AI Brand Visibility Analyzer**  
https://www.digitalplatform271.com/ai-brand-visibility-analyzer

**AI Visibility Audit**  
https://www.digitalplatform271.com/audit

## Demo video

https://youtube.com/shorts/OvVoiGtlHwE?si=EXwnYZhlCmfFxWWF

## Hackathon

Submitted for the **BITSoM Vertex Builders Pitch Fest 2026**, Open AI Innovation challenge.

## Run locally

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Source structure

- `src/App.jsx` — standalone analyzer interface
- `src/lib/aiBrandVisibilityPrototype.js` — deterministic demo scoring and recommendation logic
- `src/index.css` — Tailwind entry styles
- `vite.config.js` — Vite + React configuration

## How the prototype works

The current hackathon prototype uses a deterministic scoring approach to provide a repeatable diagnostic across the five AI visibility layers. It surfaces:

- an overall AI visibility score
- five framework scores
- the primary bottleneck
- quick wins
- prioritized remediation actions

The prototype is intentionally transparent: it does **not** crawl the submitted website or query external AI platforms. Scores are simulated to demonstrate the product workflow and five-layer decision model.

The roadmap extends this into live AI monitoring, evidence capture, citation tracking and ongoing recommendation-readiness measurement.

## Product direction

Digital Platform 271 is building an AI visibility workflow that moves from:

**Free diagnostic → Paid audit and remediation → Continuous AI visibility monitoring**

The goal is to help brands understand not only whether AI systems can find them, but whether those systems have enough evidence and confidence to recommend them.

## Safety and repository scope

This public repository is intentionally isolated from production systems. It does not contain:

- payment credentials
- Supabase service keys
- `.env` secrets
- customer data
- private production configuration
- private paid-report logic

## Built by

**Sanchari Sarkar**  
Digital Platform 271  
https://www.digitalplatform271.com

---

Hackathon prototype repository. Production systems remain separate.
