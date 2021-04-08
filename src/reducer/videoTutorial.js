const initialState = {
  videos: [],
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'set':
      return {
        videos: action.data
      };
    break;
    case 'clean':
      return {
        videos: []
      };
    break;
    default: return state;
  }
}
