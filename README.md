# Alex and Ben

A curated content recommendation system for Alex and Ben. No algorithms. No noise. Just genuinely high-quality content that matters.

## Philosophy

We reject algorithm-driven content feeds. This system learns what we actually like — depth over popularity, insight over virality.

**Core Principles:**
- **Steve Jobs weighted at 40%** — obsession with craft, simplicity, and vision
- **CEOs and founders who speak with depth** — not TED-talk platitudes
- **Life purpose and leadership angles** — content that actually changes how you think
- **Business/tech under 30 minutes** — respect for time

## Branches

- **`main`** — General content recommendations (podcasts, talks, documentaries)
- **`ben-and-alex-empire`** — Business and tech content, short-form only (< 30 min)

## How It Works

See [algorithm.md](algorithm.md) for the full scoring system.

### Quick Summary

Each piece of content is scored across multiple dimensions:

1. **Thinker Match** (0-100) — How closely it aligns with our weighted thinkers
2. **Depth Score** (0-100) — Presence of life purpose, leadership, philosophical insight
3. **Production Quality** (0-100) — Audio, editing, research quality
4. **Length Penalty** — For business content, >30 min gets penalized

**Final Score = Weighted average with thinker match getting highest priority**

## Usage

```bash
# Get recommendations
node recommender.js --category=podcast --min-score=75

# Get short business content
node recommender.js --branch=empire --max-duration=30

# Add new content
node recommender.js --add --file=new-content.json
```

## Content Database

See [content-database.json](content-database.json) for the curated library.

## Domain

TBD — see [domain-search-results.md](domain-search-results.md) for available options.

---

*Built with intention. No algorithms. No noise.*
