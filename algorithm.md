# Alex and Ben Recommendation Algorithm

## Overview

This algorithm scores content based on alignment with our core thinkers, depth of insight, production quality, and format constraints. It deliberately rejects popularity metrics — a video with 10M views scores the same as one with 1K if the content quality is equal.

## Thinker Weights

Our foundational thinkers, weighted by influence on our taste:

| Thinker | Weight | Why |
|---------|--------|-----|
| **Steve Jobs** | 40% | Obsession with craft, simplicity, vision, and saying no |
| **CEOs/Founders (Depth)** | 25% | Operators who speak from experience: Buffett, Munger, Thiel, Hoffman, Altman, etc. |
| **Jordan Peterson** | 15% | Responsibility, meaning, confronting chaos |
| **Virgil Abloh** | 10% | Curiosity, cross-disciplinary thinking, "everything I do is art" |
| **Kanye West** | 10% | Creative audacity, rejecting limits, vision over validation |

**Total: 100%**

## Scoring Dimensions

### 1. Thinker Match Score (0-100) — 35% of final score

How closely does the content align with our weighted thinkers?

**Jobs Indicators (40% weight):**
- Focus on simplicity and removing complexity
- "One more thing" moments of insight
- Product/craft obsession
- Willingness to be misunderstood
- Design-first thinking
- Saying no to good ideas for great ones

**CEO/Founder Indicators (25% weight):**
- First-hand operational experience
- Specific stories, not general advice
- Intellectual honesty about failures
- Long-term thinking over quarterly pressures
- Contrarian but reasoned positions

**Peterson Indicators (15% weight):**
- Responsibility as the path to meaning
- Confronting chaos/darkness
- Archetypal patterns in business/life
- Self-authoring narratives

**Abloh Indicators (10% weight):**
- Cross-disciplinary connections
- Curiosity-driven exploration
- Challenging category boundaries
- "Question everything" approach

**West Indicators (10% weight):**
- Creative confidence without apology
- Rejecting imposed limitations
- Vision-first execution
- Controversial but earnest

**Scoring:**
- Strong presence of multiple indicators: 80-100
- Moderate presence: 50-79
- Weak/absent: 0-49

### 2. Depth Score (0-100) — 30% of final score

Measures substantive insight vs. surface-level content.

**Life Purpose Indicators:**
- Explicit discussion of meaning/mission
- Personal stories of transformation
- Existential framing of work
- Legacy thinking (what will matter in 10 years?)

**Leadership Indicators:**
- Decision-making under uncertainty
- Building culture (not just tactics)
- Personal costs of leadership
- Developing others

**Philosophical Indicators:**
- First principles thinking
- Challenging conventional wisdom
- Historical context
- Mental models and frameworks

**Scoring:**
- Multiple depth indicators present: 80-100
- Some depth: 50-79
- Surface-level: 0-49

### 3. Production Quality (0-100) — 20% of final score

Raw production value — we won't waste time on poor audio or lazy editing.

| Factor | Weight |
|--------|--------|
| Audio quality | 30% |
| Editing tightness | 25% |
| Research depth | 25% |
| Visual quality (if video) | 20% |

**Scoring:**
- Professional/excellent: 80-100
- Good enough: 50-79
- Distracting: 0-49

### 4. Format Score (0-100) — 15% of final score

Different weights for different branches.

**Main Branch:**
- No length penalties
- Format flexibility
- Full score based on content density

**Ben and Alex Empire Branch (Business/Tech):**
- **Duration penalty:** Linear penalty after 30 minutes
  - 30 min = 100
  - 45 min = 75
  - 60 min = 50
  - 90+ min = 25
- **Density bonus:** Higher scores for tight, information-dense content

## Anti-Indicators (Automatic Reductions)

Content gets penalized or excluded for:

- **Generic self-help tropes** ("5 habits of successful people")
- **Surface-level interviews** (no follow-up questions, PR answers)
- **Hype without substance** (crypto/NFT bro content unless genuinely insightful)
- **Politics as performance** (partisan ranting without nuance)
- **Bro culture** (aggression as a substitute for insight)
- **Sensationalism** (clickbait framing, manufactured conflict)

**Penalty:** -30 to -50 points, or exclusion

## Final Score Calculation

```
FINAL SCORE = 
  (Thinker Match × 0.35) +
  (Depth Score × 0.30) +
  (Production Quality × 0.20) +
  (Format Score × 0.15)

MINUS any anti-indicator penalties
```

**Recommendation Thresholds:**
- 90-100: Must watch — exceptional alignment
- 80-89: Highly recommended — strong match
- 70-79: Worth your time — solid content
- 60-69: Background worthy — okay if you have time
- <60: Excluded from recommendations

## Learning System

The algorithm improves through feedback:

1. **Explicit ratings** — Thumbs up/down after consuming
2. **Completion tracking** — Did we finish it?
3. **Re-watch flags** — Content worth returning to
4. **Pattern extraction** — Which indicators predict enjoyment?

Over time, the thinker weights and indicator definitions refine based on actual preferences vs. stated preferences.

## Example Scoring

### Example 1: Jobs Stanford Commencement
- Thinker Match: 95 (pure Jobs, multiple indicators)
- Depth Score: 90 (life purpose, legacy, meaning)
- Production: 85 (simple but effective)
- Format: 95 (15 min, perfect density)
- Anti-indicators: None

**Score: 91.5** — Must watch

### Example 2: Random Business Podcast
- Thinker Match: 40 (generic founder, no depth)
- Depth Score: 35 (surface-level tactics)
- Production: 70 (decent audio, loose editing)
- Format: 60 (45 min, somewhat bloated)
- Anti-indicators: Generic tropes (-30)

**Score: 44** — Excluded

## Implementation

See [recommender.js](recommender.js) for the code implementation.
