class Device {
  constructor() {
    this.isSp = /iphone|android|ipad/.test(navigator.userAgent.toLowerCase());
  }

  get isMovile() {
    return this.isSp
  }
  get isPc() {
    return !this.isSp
  }
}

export const device = new Device();