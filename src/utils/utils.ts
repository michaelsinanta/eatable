export function formatVoteCount(voteCount?: number) {
  if (voteCount === undefined) {
    return "No reviews";
  } else if (voteCount >= 1000000) {
    return `${(voteCount / 1000000).toFixed(1)}m+ Reviews`;
  } else if (voteCount >= 1000) {
    return `${(voteCount / 1000).toFixed(1)}k+ Reviews`;
  } else {
    return `${voteCount} Reviews`;
  }
}

export function formatPrice(price?: number) {
  if (price === undefined) {
    return "No price available";
  } else if (price >= 1000000) {
    return `${(price / 1000000).toFixed(price % 1000000 ? 1 : 0)}m`;
  } else if (price >= 1000) {
    return `${(price / 1000).toFixed(price % 1000 ? 1 : 0)}k`;
  } else {
    return `${price}`;
  }
}
