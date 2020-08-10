export const login = data => {
    return {
      type: 'auth',
      user: data
    }
}

export const logout = () => {
    return {
      type: 'logout',
      user: null
    }
}
