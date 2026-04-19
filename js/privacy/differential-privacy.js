/**
 * Draw a random number from Laplace(0, scale) using the inverse-CDF method
 * over a uniform sample from Math.random().
 */
function laplaceNoise(scale) {
  const u = Math.random() - 0.5;
  return -scale * Math.sign(u) * Math.log(1 - 2 * Math.abs(u));
}

/**
 * Return a differentially-private approximation of a count by adding
 * Laplace(1/epsilon) noise, clamped at zero and rounded to an integer.
 */
function addNoiseToCount(trueCount, epsilon) {
  return Math.max(0, Math.round(trueCount + laplaceNoise(1 / epsilon)));
}

/**
 * Sum a numeric field across records and return the DP-noisy total.
 * Epsilon controls the privacy/utility trade-off (higher = less noise).
 */
function noisyAggregate(records, field, epsilon) {
  let sum = 0;
  records.forEach(r => { sum += Number(r[field]) || 0; });
  return Math.max(0, Math.round(sum + laplaceNoise(1 / epsilon)));
}
