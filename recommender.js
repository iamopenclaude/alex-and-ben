#!/usr/bin/env node

/**
 * Alex and Ben Content Recommender
 * 
 * Usage:
 *   node recommender.js --category=podcast --min-score=75
 *   node recommender.js --branch=empire --max-duration=30
 *   node recommender.js --thinker=jobs
 *   node recommender.js --list-all
 */

const fs = require('fs');
const path = require('path');

// Load content database
const contentPath = path.join(__dirname, 'content-database.json');
const database = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));

// Thinker weights
const THINKER_WEIGHTS = {
  jobs: 0.40,
  ceoFounder: 0.25,
  peterson: 0.15,
  aboff: 0.10,
  west: 0.10
};

// Scoring weights
const SCORE_WEIGHTS = {
  thinkerMatch: 0.35,
  depthScore: 0.30,
  productionQuality: 0.20,
  formatScore: 0.15
};

/**
 * Calculate thinker match score based on indicators
 */
function calculateThinkerMatch(indicators) {
  let score = 0;
  let totalWeight = 0;

  for (const [thinker, weight] of Object.entries(THINKER_WEIGHTS)) {
    if (indicators[thinker] && indicators[thinker].length > 0) {
      // More indicators = higher score, capped at 100
      const indicatorScore = Math.min(100, 60 + (indicators[thinker].length * 10));
      score += indicatorScore * weight;
      totalWeight += weight;
    }
  }

  // Normalize if not all thinkers present
  return totalWeight > 0 ? score / totalWeight : 50;
}

/**
 * Calculate format score with duration penalty for business content
 */
function calculateFormatScore(duration, branch) {
  if (branch === 'ben-and-alex-empire') {
    // Linear penalty after 30 minutes
    if (duration <= 30) return 100;
    if (duration <= 45) return 75;
    if (duration <= 60) return 50;
    return 25;
  }
  
  // Main branch: no penalty, score based on density perception
  return duration <= 60 ? 95 : 85;
}

/**
 * Calculate final score for a content item
 */
function calculateScore(item) {
  const thinkerMatch = calculateThinkerMatch(item.indicators);
  const formatScore = calculateFormatScore(item.duration, item.branch);
  
  let score = (
    thinkerMatch * SCORE_WEIGHTS.thinkerMatch +
    item.scores.depthScore * SCORE_WEIGHTS.depthScore +
    item.scores.productionQuality * SCORE_WEIGHTS.productionQuality +
    formatScore * SCORE_WEIGHTS.formatScore
  );

  // Apply anti-indicator penalties
  if (item.indicators.antiIndicators && item.indicators.antiIndicators.length > 0) {
    const penalty = item.indicators.antiIndicators.length * 30;
    score -= penalty;
  }

  return Math.max(0, Math.round(score));
}

/**
 * Get recommendations based on filters
 */
function getRecommendations(options = {}) {
  let results = database.content.map(item => ({
    ...item,
    calculatedScore: calculateScore(item)
  }));

  // Filter by branch
  if (options.branch) {
    const branchMap = {
      'empire': 'ben-and-alex-empire',
      'main': 'main'
    };
    results = results.filter(item => item.branch === (branchMap[options.branch] || options.branch));
  }

  // Filter by category/type
  if (options.category) {
    results = results.filter(item => item.type === options.category);
  }

  // Filter by thinker
  if (options.thinker) {
    results = results.filter(item => 
      item.indicators[options.thinker] && item.indicators[options.thinker].length > 0
    );
  }

  // Filter by max duration
  if (options.maxDuration) {
    results = results.filter(item => item.duration <= parseInt(options.maxDuration));
  }

  // Filter by min score
  if (options.minScore) {
    results = results.filter(item => item.calculatedScore >= parseInt(options.minScore));
  }

  // Sort by calculated score
  results.sort((a, b) => b.calculatedScore - a.calculatedScore);

  return results;
}

/**
 * Format duration as HH:MM or MM
 */
function formatDuration(minutes) {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

/**
 * Print recommendations
 */
function printRecommendations(results) {
  console.log('\n🎬 ALEX AND BEN RECOMMENDATIONS\n');
  console.log('=' .repeat(70));

  if (results.length === 0) {
    console.log('\nNo content matches your criteria.\n');
    return;
  }

  results.forEach((item, index) => {
    const score = item.calculatedScore;
    const scoreEmoji = score >= 90 ? '🌟' : score >= 80 ? '✨' : score >= 70 ? '👍' : '•';
    const branch = item.branch === 'ben-and-alex-empire' ? '[EMPIRE]' : '[MAIN]';
    
    console.log(`\n${scoreEmoji} ${item.title}`);
    console.log(`   ${branch} ${item.creator} • ${formatDuration(item.duration)} • Score: ${score}`);
    console.log(`   ${item.type.toUpperCase()} | Tags: ${item.tags.join(', ')}`);
    if (item.notes) {
      console.log(`   💭 ${item.notes}`);
    }
    console.log(`   🔗 ${item.url}`);
  });

  console.log('\n' + '='.repeat(70));
  console.log(`\nFound ${results.length} recommendations\n`);
}

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--list-all') {
      options.listAll = true;
    } else if (arg === '--category' && args[i + 1]) {
      options.category = args[i + 1];
      i++;
    } else if (arg === '--branch' && args[i + 1]) {
      options.branch = args[i + 1];
      i++;
    } else if (arg === '--thinker' && args[i + 1]) {
      options.thinker = args[i + 1];
      i++;
    } else if (arg === '--max-duration' && args[i + 1]) {
      options.maxDuration = args[i + 1];
      i++;
    } else if (arg === '--min-score' && args[i + 1]) {
      options.minScore = args[i + 1];
      i++;
    } else if (arg === '--help' || arg === '-h') {
      showHelp();
      process.exit(0);
    }
  }

  return options;
}

/**
 * Show help
 */
function showHelp() {
  console.log(`
Alex and Ben Content Recommender

Usage:
  node recommender.js [options]

Options:
  --list-all              List all content in database
  --category <type>       Filter by type: podcast, interview, speech, lecture, documentary
  --branch <name>         Filter by branch: main, empire
  --thinker <name>        Filter by thinker: jobs, ceoFounder, peterson, aboff, west
  --max-duration <min>    Maximum duration in minutes
  --min-score <score>     Minimum recommendation score (0-100)
  --help, -h              Show this help

Examples:
  node recommender.js --branch=empire --max-duration=30
  node recommender.js --thinker=jobs --min-score=85
  node recommender.js --category=podcast
`);
}

/**
 * Show algorithm explanation
 */
function showAlgorithm() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════╗
║                    ALEX AND BEN RECOMMENDATION ALGORITHM                 ║
╠══════════════════════════════════════════════════════════════════════════╣

THINKER WEIGHTS:
  • Steve Jobs          40%  → Craft, simplicity, vision, saying no
  • CEOs/Founders       25%  → Operators with depth: Buffett, Thiel, Altman
  • Jordan Peterson     15%  → Responsibility, meaning, confronting chaos
  • Virgil Abloh        10%  → Cross-disciplinary, curiosity, art
  • Kanye West          10%  → Creative audacity, rejecting limits

SCORING WEIGHTS:
  • Thinker Match       35%  → Alignment with weighted thinkers
  • Depth Score         30%  → Life purpose, leadership, philosophy
  • Production Quality  20%  → Audio, editing, research
  • Format Score        15%  → Duration penalties for business content

FORMULA:
  Score = (ThinkerMatch × 0.35) 
        + (DepthScore × 0.30) 
        + (ProductionQuality × 0.20) 
        + (FormatScore × 0.15)
        - AntiIndicatorPenalties

EMPIRE BRANCH RULE:
  Business/tech content >30 min gets penalized:
    • 30 min or less: 100 points
    • 45 min: 75 points
    • 60 min: 50 points
    • 90+ min: 25 points

THRESHOLDS:
  • 90-100: Must watch — exceptional alignment
  • 80-89:  Highly recommended — strong match
  • 70-79:  Worth your time — solid content
  • 60-69:  Background worthy — if you have time
  • <60:    Excluded from recommendations

╚══════════════════════════════════════════════════════════════════════════╝
`);
}

// Main execution
const options = parseArgs();

if (options.listAll) {
  delete options.listAll;
  const results = getRecommendations(options);
  printRecommendations(results);
} else if (Object.keys(options).length === 0) {
  // Default: show algorithm and top recommendations
  showAlgorithm();
  console.log('\n📊 TOP RECOMMENDATIONS (Score 85+)\n');
  const topPicks = getRecommendations({ minScore: 85 });
  printRecommendations(topPicks);
} else {
  const results = getRecommendations(options);
  printRecommendations(results);
}
