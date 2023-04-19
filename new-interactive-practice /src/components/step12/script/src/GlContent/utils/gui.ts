import { GUI } from 'lil-gui';

const gui = new GUI();
gui.close();
gui.onChange(event => {
  const controller = event.controller;
  controller.updateDisplay();
});
export default gui;