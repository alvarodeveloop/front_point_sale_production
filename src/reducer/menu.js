const initialState = {
  modules : [],
  displayMessageNav : false
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'setMenu':
      return Object.assign({},state,{
        modules: action.menu
      })
    break;
    case 'setDisplayMessage':
      return Object.assign({},state,{
        displayMessageNav: action.display
      })
    break;
    case 'removeMenu':
      return Object.assign({},state,{
        modules: []
      })
    break;
    default: return state;
  }
}
