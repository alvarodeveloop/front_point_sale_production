import React from 'react'
import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay'
import Loader from './shared/Loader'

// Layouts
import MainContainer from './containers/MainContainer'
import AuthContainer from './containers/AuthContainer'
import AuthPasswordContainer from './containers/AuthPasswordContainer'
import BlankContainer from './containers/BlankContainer'

// Lazy load component
const lazy = (cb) => loadable(() => pMinDelay(cb(), 200), { fallback: <Loader /> })

// ---
// Default application layout

export const DefaultLayout = MainContainer

// ---
// Document title template

export const titleTemplate = '%s - React Starter'

// ---
// Routes
//
// Note: By default all routes use { "exact": true }. To change this
// behaviour, pass "exact" option explicitly to the route object



export const defaultRoute = '/'
export const routes = [
  {
    path: '/',
    component: lazy(() => import('./containers/AuthContainer')),
    layout: AuthContainer
  },
  {
    path: '/user/list',
    component: lazy(() => import('./pages/UserListPage'))
  },{
    path: '/user/create/:id?',
    component: lazy(() => import('./pages/UserCreatePage'))
  },
  {
    path: '/sale/sale_history',
    component: lazy(() => import('./pages/HistorySalePage'))
  },
  {
    path: '/sale/normal_sale',
    component: lazy(() => import('./pages/SalePageParent'))
  },
  {
    path: '/quotitation/search_quotitation',
    component: lazy(() => import('./pages/CotizacionSearchPage'))
  },
  {
    path: '/config/config_general_form/:id?',
    component: lazy(() => import('./pages/ConfigGeneralFormPage'))
  },
  {
    path: '/config/config_general',
    component: lazy(() => import('./pages/ConfigGeneralPage'))
  },
  {
    path: '/config/config_store',
    component: lazy(() => import('./pages/ConfigStorePage'))
  },
  {
    path: '/clients',
    component: lazy(() => import('./pages/ClientPage'))
  },
  {
    path: '/config/config_store_form/:id?',
    component: lazy(() => import('./pages/ConfigStoreFormPage'))
  },
  {
    path: '/dashboard',
    component: lazy(() => import('./pages/DashboardPage'))
  },
  {
    path: '/flowCash/inbox',
    component: lazy(() => import('./pages/FlowCashPage'))
  },
  {
    path: '/flowCash/reportGeneralFlowCash',
    component: lazy(() => import('./pages/FlowCashReportGeneralPage'))
  },
  {
    path: '/flowCash/reportDetailFlowCash',
    component: lazy(() => import('./pages/FlowCashReportDetailPage'))
  },
  {
    path: '/inventary',
    component: lazy(() => import('./pages/InventaryPage'))
  },
  {
    path: '/product/form/:id?',
    component: lazy(() => import('./pages/ProductFormPage'))
  },
  {
    path: '/provider/list',
    component: lazy(() => import('./pages/ProviderPage'))
  },
  {
    path: '/provider/form/:id?',
    component: lazy(() => import('./pages/ProviderFormPage'))
  },
  {
    path: '/provider/represent/:id',
    component: lazy(() => import('./pages/ProviderRepresentPage'))
  },
  {
    path: '/quotitation/create_quotitation/:id?',
    component: lazy(() => import('./pages/CotizationPage'))
  },
  {
    path: '/invoicePrintPage/:id',
    component: lazy(() => import('./pages/InvoicePrintPage')),
    layout: BlankContainer
  },
  {
    path: '/privacy_politic',
    component: lazy(() => import('./pages/PrivacyPoliticPage')),
    layout: BlankContainer
  },
  {
    path: '/terms_conditions',
    component: lazy(() => import('./pages/TermsConditionsPage')),
    layout: BlankContainer
  },
  {
    path: '/login/register',
    component: lazy(() => import('./pages/SignUpPage')),
    layout: BlankContainer
  },
  {
    path: '/sale/dispatchs',
    component: lazy(() => import('./pages/SaleDispatchPage'))
  },
  {
    path: '/cashRegister',
    component: lazy(() => import('./pages/CashRegisterPage'))
  },
  {
    path: '/branch_office',
    component: lazy(() => import('./pages/BranchOfficePage'))
  }
]
