export const setMenu = data => {
    return {
      type: 'setMenu',
      menu: data
    }
}

export const removeMenu = () => {
    return {
      type: 'removeMenu',
    }
}
