type CoreObject = THREE.WebGLRenderer | THREE.Camera;

type Store = {
  [key: string]: CoreObject
}

class CoreStore {
  private store: Store = {};
  constructor() {}

  setObject(key: string, coreObject: CoreObject) {
    this.store[key] = coreObject;
  }

  getObject(key: string)  {
    return this.store[key];
  }
}
export const coreStore = new CoreStore();