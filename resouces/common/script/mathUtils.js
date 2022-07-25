/**
 * [a, b]間に存在するxを[c, d]間に線形補間した時の値を返す。
 * @param {number} x 元々の数
 * @param {number} a 元々の範囲の下限
 * @param {number} b 元々の範囲の上限
 * @param {number} c 新しい範囲の下限
 * @param {number} d 新しい範囲の上限
 * @return {number} 補間後の値
 */

 export const lerp = (x, a, b, c, d) => {
  return ((x - a) * (d - c)) / (b - a) + c;
};

/**
 * 入力値が最小・最大値を超えないように打ち止めされた値を返す。
 * @param {number} x 入力値
 * @param {number} minValue 最小値
 * @param {number} maxValue 最大値
 */
export const clamp = (x, minValue, maxValue) => {
  return Math.max(Math.min(x, maxValue), minValue);
};

export const randomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const mix = (a, b, c) => {
  return (a * (1 - c)) + (b * c);
}

export const coeffPerOneFrame = (coeff, deltaTime, fps = 60) => {
  const frameStretch = deltaTime / (1000 / fps);
  const correctedCoeff = 1 - (1 - coeff) * frameStretch;
  return correctedCoeff;
}