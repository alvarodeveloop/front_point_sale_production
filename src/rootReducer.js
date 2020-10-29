import { combineReducers } from 'redux';
import auth from './reducer/auth';
import sale from './reducer/sale';
import configs from './reducer/configs';
import menu from './reducer/menu';
import enterpriseSucursal from './reducer/enterpriseSucursal';
import theme from './store/reducers/themeStore';

export default combineReducers({
  auth,
  sale,
  configs,
  menu,
  theme,
  enterpriseSucursal
});
