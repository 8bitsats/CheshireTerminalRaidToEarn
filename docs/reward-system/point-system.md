# Point System

The GRIN Raid point system is designed to reward both content creation and engagement. Points are accumulated through various activities and converted to SOL rewards at the end of each raid.

## Base Points

### Tweet Components
| Component | Points |
|-----------|---------|
| $grin cashtag | 1 point |
| #grin hashtag | 1 point |
| @cheshiregpt mention | 1 point |

### Engagement Points
| Action | Points |
|--------|---------|
| Like received | 0.1 points |
| Retweet received | 0.2 points |
| Comment received | 0.15 points |

## Multipliers

### Follower-based Multipliers
| Tier | Requirement | Multiplier |
|------|------------|------------|
| Base | <100 followers | 1x |
| Mid | 100+ followers | 1.5x |
| Top | 1000+ followers | 2x |

## Point Calculation

```
Final Points = (Base Points + Engagement Points) × Follower Multiplier
```

### Example Calculation

For a user with 150 followers (1.5x multiplier):
- Tweet with all components: 3 base points
- 10 likes: 1 point
- 5 retweets: 1 point
- 3 comments: 0.45 points
- Total: (3 + 1 + 1 + 0.45) × 1.5 = 8.175 points