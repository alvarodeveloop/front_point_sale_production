import { combineReducers } from 'redux'
import theme from './themeStore'
import auth from 'reducer/auth'
import configs from 'reducer/configs'
import menu from 'reducer/menu'
import sale from 'reducer/sale'
export default combineReducers({
  theme,
  auth,
  configs,
  menu,
  sale
})
