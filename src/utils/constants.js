export const NOTIFICATION_SYSTEM_STYLE = {
  NotificationItem: {
    DefaultStyle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      borderRadius: '4px',
      fontSize: '14px',
    },

    success: {
      borderTop: 0,
      backgroundColor: '#45b649',
      WebkitBoxShadow: 0,
      MozBoxShadow: 0,
      boxShadow: 0,
    },

    error: {
      borderTop: 0,
      backgroundColor: '#f85032',
      WebkitBoxShadow: 0,
      MozBoxShadow: 0,
      boxShadow: 0,
    },

    warning: {
      borderTop: 0,
      backgroundColor: '#ffd700',
      WebkitBoxShadow: 0,
      MozBoxShadow: 0,
      boxShadow: 0,
    },

    info: {
      borderTop: 0,
      background: 'linear-gradient(to right, #6a82fb, #fc5c7d)',
      WebkitBoxShadow: 0,
      MozBoxShadow: 0,
      boxShadow: 0,
    },
  },

  Title: {
    DefaultStyle: {
      margin: 0,
      padding: 0,
      paddingRight: 5,
      color: '#fff',
      display: 'inline-flex',
      fontSize: 20,
      fontWeight: 'bold',
      // left: '15px',
      // position: 'absolute',
      // top: '50%',
    },
  },

  MessageWrapper: {
    DefaultStyle: {
      display: 'block',
      color: '#fff',
      width: '100%',
    },
  },

  Dismiss: {
    DefaultStyle: {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'inherit',
      fontSize: 20,
      color: '#f2f2f2',
      position: 'relative',
      margin: 0,
      padding: 0,
      background: 'none',
      borderRadius: 0,
      opacity: 1,
      width: 20,
      height: 20,
      textAlign: 'initial',
      float: 'none',
      top: 'unset',
      right: 'unset',
      lineHeight: 'inherit',
    },
  },

  Action: {
    DefaultStyle: {
      background: '#fff',
      borderRadius: '2px',
      padding: '6px 20px',
      fontWeight: 'bold',
      margin: '10px 0 0 0',
      border: 0,
    },

    success: {
      backgroundColor: '#45b649',
      color: '#fff',
    },

    error: {
      backgroundColor: '#f85032',
      color: '#fff',
    },

    warning: {
      backgroundColor: '#ffd700',
      color: '#fff',
    },

    info: {
      backgroundColor: '#00c9ff',
      color: '#fff',
    },
  },

  ActionWrapper: {
    DefaultStyle: {
      margin: 0,
      padding: 0,
    },
  },
};
export const ARRAY_MONTH = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]

export const ARRAY_COLORS = [
  "rgb(39, 107, 21)",
  "rgb(21, 26, 88)",
  "rgb(133, 124, 124)",
  "rgb(147, 52, 12)",
  "rgb(233, 166, 87)",
  "rgb(68, 208, 162)",
  "rgb(213, 235, 39)"
]

export let OBJECT_COTIZATION = {
  business_name_transmitter: '',
  rut_transmitter: '',
  address_transmitter: '',
  country_transmitter: '',
  email_transmitter: '',
  phone_transmitter: '',
  comment: '',
  date_issue_invoice: '',
  type_effect: true,
  type_api: true,
  rut_client: '',
  business_name_client: '',
  address_client: '',
  name_contact: '',
  phone_contact: '',
  email_contact: '',
  name_seller: '',
  phone_seller: '',
  email_seller: '',
  total_with_iva : true , // si esta en true en el total de las cotizaciones se muestra iva si no el iva va en los productos y no se muestra el iva al final
  price_list: "",
  type_invoicing: 1,
  status: 1,
  ref: '',
  discount_global: '',
  way_of_payment: "Contado",
  days_expiration: '',
  type: 1,
  comuna_client: '',
  city_client: '',
  spin_client: '',
  comuna_transmitter: '',
  actividad_economica_client: '',
  actividad_economica_transmitter: '',
  address_client_array: [],
  address_transmitter_array : [],
  actividad_economica_transmitter_array: [],
  actividad_economica_client_array: [],
  spin_client_array : [],
  spin_transmitter: '',
  spin_transmitter_array: [],
  type_sale_transmitter_array: [],
  type_sale_transmitter: '',
  type_buy_client_array: [],
  type_buy_client : '',
  facturaId: '',
  token : '',
  searchReceptorDefault : false,
  fetchTransmitter: false,
  type_transfer: '',
  rut_client_search: '', // rut para buscar el receptor en las guias
  rut_transfer: '',
  patent_transfer: '',
  rut_driver: '',
  name_driver: '',
}

export const API_FACTURACION = true
//export const API_URL = 'https://api-app.anclick.tech/'
//export const FRONT_URL = 'https://app.anclick.tech/create_quotitation'
export const API_URL = 'http://localhost:5000/'
export const FRONT_URL = 'http://localhost:3000/quotitation/create_quotitation'
