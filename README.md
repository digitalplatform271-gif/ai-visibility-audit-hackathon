# AI Brand Visibility Analyzer

**A free AI visibility diagnostic prototype by Digital Platform 271**

[![AI Brand Visibility Analyzer demo](https://img.youtube.com/vi/OvVoiGtlHwE/maxresdefault.jpg)](https://youtube.com/shorts/OvVoiGtlHwE?si=EXwnYZhlCmfFxWWF)

*Click the preview above to watch the short product demo.*

The **AI Brand Visibility Analyzer** helps brands understand whether their website provides enough signals for AI systems to discover, understand, evaluate, cite and potentially recommend the brand.

It evaluates five layers of AI visibility:

1. AI Presence
2. AI Understanding
3. AI Authority
4. Citation Authority
5. Recommendation Readiness

It is designed to answer three practical questions:

- Where is the brand weak?
- Why does that weakness matter?
- What should be fixed first?

## Who it is for

- D2C and ecommerce brands
- Founders and marketing teams
- SEO and GEO professionals
- Businesses evaluating their readiness for AI-driven search and recommendations

## Why this exists

Traditional SEO can help a brand become discoverable, but AI recommendation systems also need clear evidence, authority, context and decision-useful information.

The AI Brand Visibility Analyzer was created to demonstrate how these different layers can be evaluated separately, so brands can move beyond simple discoverability and understand what may be limiting citation and recommendation readiness.

## Live prototype

**AI Brand Visibility Analyzer**  
https://www.digitalplatform271.com/ai-brand-visibility-analyzer

**AI Visibility Audit**  
https://www.digitalplatform271.com/audit

## Documentation

- [Methodology](docs/methodology.md) — explains the five-layer framework, prototype logic, limitations and research connection.
- [Citation metadata](CITATION.cff) — standardized citation information for the project.

## Related research

The framework is informed by **Digital Platform 271's AI Visibility Benchmark 2026**, which evaluated 30 Indian D2C brands across 53 website signals and five AI visibility dimensions.

Research:  
https://www.digitalplatform271.com/research

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

## Citation

If you reference the Analyzer, framework or related research in an article, presentation or research project, please cite:

**Sarkar, S. (2026). AI Brand Visibility Analyzer. Digital Platform 271.**

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
Founder, Digital Platform 271  
https://www.digitalplatform271.com

---

Hackathon prototype repository. Production systems remain separate.
