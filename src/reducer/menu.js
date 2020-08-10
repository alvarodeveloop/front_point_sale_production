const initialState = {
  modules : [],
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'setMenu':
      return Object.assign({},state,{
        modules: action.menu
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
