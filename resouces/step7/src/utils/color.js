/**
 * @author JuthaDDA
 * @see [RegExp の複数行記述，RegExp 内での変数参照がしたいので，
 *     正規表現を結合する関数を作った - Qiita
 *     ](https://qiita.com/juthaDDA/items/f1093b968faa3d810c1c)
 * @param {RegExp[]} regExps - Babel (< 7.11.0) を使う場合は,
 *     名前付きキャプチー・グループを含むと正しく変換されない.
 *     `@babel/plugin-transform-named-capturing-groups-regex` (< 7.10.4) も未対応.
 * @param {string}   [flags]
 * @return {RegExp}
 */
 const concatRegExps = ( regExps, flags ) => {
  return RegExp(
      regExps.reduce( ( acc, cur ) => acc + cur.source, '' ),
      flags,
  );
};

/**
* @author juthaDDA
* @see ['rgb\[a\](R, G, B\[, A\])' を正規表現で処理して，
*     各値をメンバーとしてもつオブジェクトを返す関数 - Qiita](
*     https://qiita.com/juthaDDA/items/d81f45295095eb4563f4)
* @param {string} rgba - 'rgb[a](R, G, B[, A])' 形式.
* @return {{red:number,green:number,blue:number,alpha:number}}
*/
export const rgbaStr2obj = ( rgba ) => {
  /**
   * ` /[+-]?\d*\.?\d+/` は実数（整数部の 0 省略可）の正規表現.
   *
   * @see [数値とマッチする正規表現 - Qiita](
   *     https://qiita.com/BlueSilverCat/items/f35f9b03169d0f70818b)
   */
  const regExp = concatRegExps( [
      /^rgba?\( *([+-]?\d*\.?\d+) *, *([+-]?\d*\.?\d+) *, */, // rgb[a](R, G,
      /([+-]?\d*\.?\d+)(?: *, *([+-]?\d*\.?\d+) *)?\)$/, // B[, A])
  ] );

  const result = regExp.exec( rgba );
  if ( ! result ) { return null; }

  const { 1: red, 2: green, 3: blue, 4: alpha } = result;
  if ( ! ( red && green && blue ) ) { return null; }

  const { min, max } = Math;
  return {
      red  : max( min( Number( red ), 255 ), 0 ),
      green: max( min( Number( green ), 255 ), 0 ),
      blue : max( min( Number( blue ), 255 ), 0 ),
      alpha: alpha ? max( min( Number( alpha ), 1 ), 0 ) : 1,
  };
};
