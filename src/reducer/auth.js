import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'auth':
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    break;
    case 'logout':
      return {
        isAuthenticated: !isEmpty(action.user),
        user: {}
      };
    break;
    default: return state;
  }
}
