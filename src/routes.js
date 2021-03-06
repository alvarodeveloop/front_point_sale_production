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
    path: '/product/listProduct',
    component: lazy(() => import('./pages/ListProductPage'))
  },
  {
    path: '/product/listProduct/:id',
    component: lazy(() => import('./pages/ProductListDetailPage'))
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
  },
  {
    path: '/quotitation/invoicing/:id?',
    component: lazy(() => import('./pages/CotizationInvoicingPage'))
  },
  {
    path: '/sale_note/sale_note_search',
    component: lazy(() => import('./pages/SaleNoteSearchPage'))
  },
  {
    path: '/sale_note/sale_note_search_by_ref/:ref',
    component: lazy(() => import('./pages/SaleNoteByRefPage'))
  },
  {
    path: '/sale_note/sale_note_create/:id?',
    component: lazy(() => import('./pages/SaleNotePage'))
  },
  {
    path: '/enterprise',
    component: lazy(() => import('./pages/EnterprisePage'))
  },
  {
    path: '/enterprise/form/:id?',
    component: lazy(() => import('./pages/EnterpriseFormPage'))
  },
  {
    path: '/planes',
    component: lazy(() => import('./pages/PlanPage'))
  },
  {
    path: '/invoice/invoice_search',
    component: lazy(() => import('./pages/InvoicePage'))
  },
  {
    path: '/invoice/invoice_search_by_ref/:ref',
    component: lazy(() => import('./pages/InvoiceByRefPage'))
  },
  {
    path: '/invoice/create_invoice',
    component: lazy(() => import('./pages/InvoiceCreatePage'))
  },
  {
    path: '/invoice/create_invoice_by_sale_note/:id',
    component: lazy(() => import('./pages/InvoiceBySaleNotePage'))
  },
  {
    path: '/invoice/invoice_bond/:id',
    component: lazy(() => import('./pages/InvoiceBondPage'))
  },
  {
    path: '/sale_note/sale_note_bond/:id',
    component: lazy(() => import('./pages/SaleNoteBondPage'))
  },
  {
    path: '/bill/bill_bonds/:id',
    component: lazy(() => import('./pages/SaleNoteBondPage'))
  },
  {
    path: '/bill/bill_search',
    component: lazy(() => import('./pages/BillSearchPage'))
  },
  {
    path: '/bill/bill_search_by_ref/:ref',
    component: lazy(() => import('./pages/BillSearchByRefPage'))
  },
  {
    path: '/bill/bill_create',
    component: lazy(() => import('./pages/BillPage'))
  },
  {
    path: '/bill/bill_bond/:id',
    component: lazy(() => import('./pages/BillBondsPage'))
  },
  {
    path: '/quotitation/sale_note_create/:id',
    component: lazy(() => import('./pages/CotizationSaleNotePage'))
  },
  {
    path: '/quotitation/bill_create/:id',
    component: lazy(() => import('./pages/CotizationBillPage'))
  },
  {
    path: '/guide/guide_create',
    component: lazy(() => import('./pages/GuideDispatchPage'))
  },
  {
    path: '/guide/guide_search',
    component: lazy(() => import('./pages/GuideDispatchSearchPage'))
  },
  {
    path: '/guide/guide_search_by_ref/:ref',
    component: lazy(() => import('./pages/GuideDispatchSearchByRefPage'))
  },
  {
    path: '/quotitation/guide/:id',
    component: lazy(() => import('./pages/CotizationGuidePage'))
  },
  {
    path: '/guide/guide_invoice/:id',
    component: lazy(() => import('./pages/GuideInvoicePage'))
  },
  {
    path: '/formDataPage',
    component: lazy(() => import('./pages/FormDataPage'))
  },
  {
    path: '/config_aidy',
    component: lazy(() => import('./pages/ConfigAidyPage'))
  },
  {
    path: '/profile',
    component: lazy(() => import('./pages/ProfilePage'))
  },
  {
    path: '/days_extended',
    component: lazy(() => import('./pages/ExtendendedDaysPage'))
  },
  {
    path: '/payments_invoice',
    component: lazy(() => import('./pages/PaymentAdminPage'))
  },
  {
    path: '/cashBox/:id',
    component: lazy(() => import('./pages/CashBoxDetailPage'))
  },
  {
    path: '/videoTutorials',
    component: lazy(() => import('./pages/VideoTutorialPage'))
  },
  {
    path: '/buyOrder/create/:id?',
    component: lazy(() => import('./pages/BuyOrderPage'))
  },
  {
    path: '/buyOrder/view',
    component: lazy(() => import('./pages/BuyOrderSearchPage'))
  },
  {
    path: '/buyOrder/bond/:id',
    component: lazy(() => import('./pages/BuyOrderBondPage'))
  },
]
