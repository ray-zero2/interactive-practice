import { GUI } from 'lil-gui';

const KEY = {
  preset: 'guiPreset'
};

const gui = new GUI();
const savePreset = () => {
  const preset = gui.save();
  sessionStorage.setItem(KEY.preset, JSON.stringify(preset));
}

const loadPreset = () => {
  const preset = JSON.parse(sessionStorage.getItem(KEY.preset) || '{}');
  if(Object.keys(preset).length === 0) return;
  gui.load(preset);
}

const exportPreset = () => {
  const preset = gui.save();
  const presetStr = JSON.stringify(preset);
  sessionStorage.setItem(KEY.preset, JSON.stringify(preset));
  const blob = new Blob([presetStr], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'preset.json';
  a.click();
  URL.revokeObjectURL(url);
}

const importPreset = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files![0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const presetStr = (e.target as FileReader).result as string;
      const preset = JSON.parse(presetStr);
      gui.load(preset);
    }
    reader.readAsText(file);
  }
  input.click();
}

const IO = gui.addFolder('I/O');
IO.add({ savePreset }, 'savePreset');
IO.add({ loadPreset }, 'loadPreset');
IO.add({ exportPreset }, 'exportPreset');
IO.add({ importPreset }, 'importPreset');
IO.close();

gui.close();
export default gui;