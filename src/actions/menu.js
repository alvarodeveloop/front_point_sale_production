export const setMenu = data => {
    return {
      type: 'setMenu',
      menu: data
    }
}

export const setDisplayMessage = display => {
    return {
      type: 'setDisplayMessage',
      display
    }
}

export const removeMenu = () => {
    return {
      type: 'removeMenu',
    }
}
