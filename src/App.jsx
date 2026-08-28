import React, { useMemo, useState } from 'react';
import { ArrowRight, BarChart3, Check, ChevronRight, CircleAlert, Gauge, LoaderCircle, Search, ShieldCheck, Sparkles, Target, Trophy } from 'lucide-react';
import { createPrototypeResult, SAMPLE_RESULT, VISIBILITY_LAYERS } from './lib/aiBrandVisibilityPrototype.js';

const layerIcons = [Search, Sparkles, ShieldCheck, BarChart3, Target];
const priorityLabels = { P1: 'High priority', P2: 'Medium priority', P3: 'Build next' };

function Pill({ children, tone = 'indigo' }) {
  const tones = {
    indigo: 'border-indigo-400/30 bg-indigo-400/10 text-indigo-200',
    emerald: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
    amber: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
  };
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

function LayerScore({ layer, index }) {
  const Icon = layerIcons[index];
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3"><span className="rounded-xl bg-indigo-500/15 p-2 text-indigo-300"><Icon size={18} /></span><h3 className="font-semibold text-white">{layer.name}</h3></div>
        <strong className="text-xl text-white">{layer.score}<span className="text-sm font-medium text-slate-500">/20</span></strong>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500" style={{ width: `${layer.score * 5}%` }} /></div>
      <p className="mt-3 text-sm leading-6 text-slate-400">{layer.question}</p>
    </article>
  );
}

function RecommendationCard({ item }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-950/45 p-5">
      <div className="flex flex-wrap items-center gap-2"><Pill tone={item.priority === 'P1' ? 'amber' : 'indigo'}>{item.priority}</Pill><span className="text-xs text-slate-500">{item.layer}</span></div>
      <h4 className="mt-4 text-lg font-semibold text-white">{item.what}</h4>
      <p className="mt-2 text-sm leading-6 text-slate-400">{item.why}</p>
      <div className="mt-4 flex gap-4 text-xs text-slate-300"><span>Impact: <b className="text-white">{item.impact}</b></span><span>Effort: <b className="text-white">{item.effort}</b></span></div>
    </article>
  );
}

export default function App() {
  const [domain, setDomain] = useState('');
  const [brandName, setBrandName] = useState('');
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const grouped = useMemo(() => result ? ['P1', 'P2', 'P3'].map((priority) => ({ priority, items: result.recommendations.filter((item) => item.priority === priority) })) : [], [result]);

  const analyze = (event) => {
    event.preventDefault();
    if (!domain.trim()) return;
    setStatus('loading');
    setResult(null);
    window.setTimeout(() => {
      setResult(createPrototypeResult({ domain, brandName }));
      setStatus('done');
      window.requestAnimationFrame(() => document.querySelector('#analyzer-results')?.scrollIntoView({ behavior: 'smooth' }));
    }, 900);
  };

  const loadSample = () => {
    setDomain('northstar.example');
    setBrandName('Northstar Studio');
    setResult(SAMPLE_RESULT);
    setStatus('done');
    window.requestAnimationFrame(() => document.querySelector('#analyzer-results')?.scrollIntoView({ behavior: 'smooth' }));
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#070b1b] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(79,70,229,0.22),transparent_34%),radial-gradient(circle_at_90%_20%,rgba(37,99,235,0.14),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between"><a href="https://www.digitalplatform271.com" className="flex items-center gap-2 text-sm font-semibold text-white"><span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500"><Gauge size={19} /></span>Digital Platform 271</a><Pill>Hackathon prototype</Pill></nav>

        <section className="mx-auto max-w-4xl pb-16 pt-20 text-center sm:pt-28">
          <Pill tone="emerald">Free · No login · Under one minute</Pill>
          <h1 className="mt-7 text-4xl font-black tracking-tight text-white sm:text-6xl">AI Brand Visibility <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Analyzer</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">See how well AI can find, understand, trust, cite, and recommend your brand.</p>
          <form onSubmit={analyze} className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white/10 bg-white/[0.055] p-4 text-left shadow-2xl shadow-indigo-950/40 backdrop-blur sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-slate-200">Website or domain *<input required value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="yourbrand.com" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-indigo-400" /></label>
              <label className="text-sm font-medium text-slate-200">Brand name <span className="font-normal text-slate-500">Optional</span><input value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="Your Brand" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-indigo-400" /></label>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button type="submit" disabled={status === 'loading'} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3.5 font-semibold text-white disabled:opacity-70">{status === 'loading' ? <><LoaderCircle className="animate-spin" size={18} />Analyzing visible signals…</> : <>Analyze Brand <ArrowRight size={18} /></>}</button>
              <button type="button" onClick={loadSample} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3.5 font-semibold text-white"><Sparkles size={18} className="text-violet-300" />Try Sample Brand</button>
            </div>
            <p className="mt-4 text-center text-xs leading-5 text-slate-500">Prototype only: deterministic demo logic. No submitted website is crawled and no external AI platform is queried.</p>
          </form>
        </section>

        <section className="pb-24"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-300">The five-layer framework</p><h2 className="mt-2 text-3xl font-bold text-white">From being found to being recommended</h2><div className="mt-8 grid gap-4 md:grid-cols-5">{VISIBILITY_LAYERS.map((layer, index) => { const Icon = layerIcons[index]; return <article key={layer.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"><span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500/15 text-indigo-300"><Icon size={19} /></span><h3 className="mt-4 font-semibold text-white">{layer.name}</h3><p className="mt-2 text-sm font-medium text-indigo-200">{layer.question}</p><p className="mt-3 text-sm leading-6 text-slate-500">{layer.description}</p></article>; })}</div></section>

        {result && <section id="analyzer-results" className="border-t border-white/10 py-20">
          <div><div className="flex flex-wrap gap-2"><Pill tone={result.isSample ? 'amber' : 'indigo'}>{result.isSample ? 'Sample data' : 'Simulated result'}</Pill><Pill>{result.domain}</Pill></div><h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Visibility snapshot for {result.brandName}</h2><p className="mt-3 max-w-2xl leading-7 text-slate-400">{result.interpretation}</p></div>
          <div className="mt-10 grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
            <article className="rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/20 to-blue-500/5 p-7"><p className="text-sm font-semibold uppercase tracking-[0.15em] text-indigo-200">Prototype AI Visibility Estimate</p><div className="mt-5 text-7xl font-black tracking-tight text-white">{result.overall}<span className="text-2xl text-slate-500"> / 100</span></div><p className="mt-7 text-sm leading-6 text-slate-300"><CircleAlert className="mr-2 inline text-amber-300" size={17} />Directional score generated locally from deterministic demo logic.</p></article>
            <div className="grid gap-4 sm:grid-cols-2">{result.layers.map((layer, index) => <LayerScore key={layer.key} layer={layer} index={index} />)}</div>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <article className="rounded-3xl border border-amber-400/20 bg-amber-400/[0.055] p-7"><Pill tone="amber">Biggest bottleneck</Pill><div className="mt-5 flex items-start gap-4"><Target className="text-amber-300" /><div><h3 className="text-2xl font-bold text-white">{result.bottleneck.name}</h3><p className="mt-2 leading-7 text-slate-400">At {result.bottleneck.score}/20, this is the clearest constraint on recommendation confidence.</p></div></div></article>
            <article className="rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.05] p-7"><Pill tone="emerald">Strongest area</Pill><div className="mt-5 flex items-start gap-4"><Trophy className="text-emerald-300" /><div><h3 className="text-2xl font-bold text-white">{result.strongest.name}</h3><p className="mt-2 leading-7 text-slate-400">At {result.strongest.score}/20, this is the strongest current foundation.</p></div></div></article>
          </div>
          <section className="mt-16"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-300">Start here</p><h3 className="mt-2 text-3xl font-bold text-white">Three quick wins</h3><div className="mt-6 grid gap-4 md:grid-cols-3">{result.quickWins.map((item) => <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><Check className="text-emerald-300" size={20} /><h4 className="mt-4 font-semibold text-white">{item.title}</h4><p className="mt-2 text-sm leading-6 text-slate-400">{item.why}</p></article>)}</div></section>
          <section className="mt-16"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-300">Action roadmap</p><h3 className="mt-2 text-3xl font-bold text-white">Prioritized recommendations</h3><div className="mt-8 space-y-10">{grouped.map((group) => <div key={group.priority}><div className="mb-4 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-500/15 font-bold text-indigo-200">{group.priority}</span><h4 className="text-lg font-semibold text-white">{priorityLabels[group.priority]}</h4><ChevronRight className="text-slate-600" size={18} /></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{group.items.map((item) => <RecommendationCard key={item.title} item={item} />)}</div></div>)}</div></section>
          <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-center text-sm leading-6 text-slate-400"><b className="text-slate-200">Prototype disclosure:</b> Results are simulated and directional. No website was crawled and no external AI system was queried.</div>
        </section>}
      </div>
    </main>
  );
}
