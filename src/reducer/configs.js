const initialState = {
  config_store: null,
  config: null
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'setConfigStore':
      return Object.assign({},state,{
        configStore: action.configStore
      })
    break;
    case 'setConfig':
      return Object.assign({},state,{
        config: action.config
      })
    break;
    case 'removeConfig':
      return Object.assign({},{},{
        config: null,
        configStore: null
      })
    break;
    default: return state;
  }
}
