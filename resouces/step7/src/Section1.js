import SmoothSection from "./SmoothSection";

export default class Section1 extends SmoothSection {
  constructor(selector) {
    const id = 'section1';
    super(selector, id);
    
    

    this.init();
  }
}