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

export function metersToKilometers(meters?: number | null): string {
  if (meters === undefined || meters === null) {
    return "No conversion available";
  } else {
    return (meters / 1000).toFixed(2);
  }
}

export function metersToMinutes(
  meters?: number | null,
  speedMetersPerMinute: number = 1000,
): string {
  if (meters === undefined || meters === null) {
    return "No conversion available";
  } else {
    const minutes = meters / speedMetersPerMinute;
    return Math.round(minutes).toString();
  }
}
