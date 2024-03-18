class PubSub {
  constructor() {
    this.registerHooks = {}
  }

  register = (key, func) => {
    this.registerHooks[key] = func
  }

  unRegister = key => {
    delete this.registerHooks[key]
  }

  publish = key => {
    if (key in this.registerHooks) {
      this.registerHooks[key]()
    }
  }
}

export const saveKeys = {
  form: "form",
  config: "config",
}

export const pubsub = new PubSub()