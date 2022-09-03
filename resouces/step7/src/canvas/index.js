import CanvasText from "./canvasText";

export default class Canvas {
  constructor(selector) {
    // this.$roots = Array.from(document.querySelectorAll(selector));

    const textTexture = new CanvasText();
    console.log(textTexture);
  }
}