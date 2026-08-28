export const VISIBILITY_LAYERS = [
  { key: 'presence', name: 'AI Presence', question: 'Can AI find your brand?', description: 'Checks whether your brand has a clear, crawlable footprint across the open web.' },
  { key: 'understanding', name: 'AI Understanding', question: 'Does AI understand what you offer?', description: 'Looks for clear entities, products, services, audiences, and structured context.' },
  { key: 'authority', name: 'AI Authority', question: 'Does your brand demonstrate expertise?', description: 'Assesses visible expertise, credibility, proof, and accountable authorship.' },
  { key: 'citation', name: 'Citation Authority', question: 'Is there evidence AI could cite?', description: 'Reviews the availability of reliable first-party and independent evidence.' },
  { key: 'readiness', name: 'Recommendation Readiness', question: 'Can AI confidently recommend you?', description: 'Combines trust, differentiation, evidence, and product clarity.' },
];

const recommendationSeed = [
  { priority: 'P1', title: 'Publish evidence-led customer outcomes', why: 'Specific, verifiable outcomes give AI systems stronger support for recommendation claims.', layer: 'Recommendation Readiness', impact: 'High', effort: 'Medium' },
  { priority: 'P1', title: 'Earn relevant third-party citations', why: 'Independent mentions help corroborate your expertise beyond your own website.', layer: 'Citation Authority', impact: 'High', effort: 'Medium' },
  { priority: 'P1', title: 'Clarify product positioning on key pages', why: 'A concise audience, problem, solution, and differentiation statement reduces ambiguity.', layer: 'AI Understanding', impact: 'High', effort: 'Low' },
  { priority: 'P2', title: 'Add review proof near decision points', why: 'Visible reviews and testimonials strengthen trust where visitors compare options.', layer: 'Recommendation Readiness', impact: 'High', effort: 'Low' },
  { priority: 'P2', title: 'Add FAQ and organization schema', why: 'Structured facts make important brand and offer details easier to interpret.', layer: 'AI Understanding', impact: 'High', effort: 'Low' },
  { priority: 'P2', title: 'Strengthen expert author profiles', why: 'Named authors with relevant credentials connect useful content to accountable expertise.', layer: 'AI Authority', impact: 'Medium', effort: 'Low' },
  { priority: 'P3', title: 'Create a consistent brand facts page', why: 'A canonical facts page reduces conflicting descriptions across channels.', layer: 'AI Presence', impact: 'Medium', effort: 'Low' },
  { priority: 'P3', title: 'Refresh dated proof and statistics', why: 'Current sources make supporting evidence more useful and credible.', layer: 'Citation Authority', impact: 'Medium', effort: 'Medium' },
];

const scoreFrom = (value, offset, span = 8) => 10 + ((value + offset) % span);
const effortRank = { Low: 0, Medium: 1, High: 2 };
const impactRank = { High: 0, Medium: 1, Low: 2 };

export function getLayerExtremes(layers) {
  const ordered = [...layers].sort((a, b) => b.score - a.score);
  return { strongest: ordered[0], weakest: ordered[ordered.length - 1] };
}

export function prioritizeRecommendations(layers) {
  const rankedLayers = [...layers].sort((a, b) => a.score - b.score);
  const layerRank = new Map(rankedLayers.map((layer, index) => [layer.name, index]));
  const secondLayerName = rankedLayers[1]?.name;
  let secondLayerP1Assigned = false;

  const recommendations = recommendationSeed
    .map((item) => ({ ...item, what: item.title }))
    .sort((a, b) => (
      layerRank.get(a.layer) - layerRank.get(b.layer)
      || effortRank[a.effort] - effortRank[b.effort]
      || impactRank[a.impact] - impactRank[b.impact]
    ))
    .map((item) => {
      const rank = layerRank.get(item.layer);
      let priority = rank === 0 ? 'P1' : rank <= 2 ? 'P2' : 'P3';
      if (item.layer === secondLayerName && !secondLayerP1Assigned) {
        priority = 'P1';
        secondLayerP1Assigned = true;
      }
      return { ...item, priority };
    });

  const weakestLayerName = rankedLayers[0]?.name;
  const weakestQuickWin = recommendations.find((item) => item.layer === weakestLayerName);
  const quickWins = [
    ...(weakestQuickWin ? [weakestQuickWin] : []),
    ...recommendations.filter((item) => item !== weakestQuickWin && item.effort === 'Low' && item.impact === 'High'),
    ...recommendations.filter((item) => item !== weakestQuickWin && item.effort === 'Low' && item.impact !== 'High'),
  ].slice(0, 3);

  return { recommendations, quickWins };
}

export function createPrototypeResult({ domain = 'northstar.example', brandName = 'Northstar Studio', sample = false } = {}) {
  const cleanDomain = domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '') || 'example.com';
  const displayName = brandName.trim() || cleanDomain.split('.')[0].replace(/(^|[-_])\w/g, (match) => match.replace(/[-_]/, ' ').toUpperCase());
  const seed = sample ? 31 : [...cleanDomain].reduce((total, char) => total + char.charCodeAt(0), 0);
  const sampleScores = [18, 16, 14, 11, 9];
  const layers = VISIBILITY_LAYERS.map((layer, index) => ({
    ...layer,
    score: sample ? sampleScores[index] : scoreFrom(seed, index * 11),
  }));
  const overall = layers.reduce((total, layer) => total + layer.score, 0);
  const { strongest, weakest } = getLayerExtremes(layers);
  const { recommendations, quickWins } = prioritizeRecommendations(layers);

  return {
    brandName: displayName,
    domain: cleanDomain,
    isSample: sample,
    overall,
    layers,
    strongest,
    weakest,
    bottleneck: weakest,
    interpretation: `${overall >= 75 ? 'Strong' : overall >= 60 ? 'Promising' : 'Developing'} AI visibility foundation, but ${weakest.name} is limiting recommendation potential.`,
    quickWins,
    recommendations,
  };
}

export const SAMPLE_RESULT = createPrototypeResult({ domain: 'northstar.example', brandName: 'Northstar Studio', sample: true });
