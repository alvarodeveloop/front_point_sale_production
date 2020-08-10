export const setConfigStore = data => {
    return {
      type: 'setConfigStore',
      configStore: data
    }
}

export const setConfig = data => {
    return {
      type: 'setConfig',
      config: data
    }
}

export const removeConfig = () => {
    return {
      type: 'removeConfig',
    }
}
