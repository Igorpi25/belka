import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import ru from 'vuetify/es5/locale/ru'
import en from 'vuetify/es5/locale/en'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: false,
    },
    themes: {
      light: {
        primary: '#16a0ce',
        secondary: '#a3a3a3',
        accent: '#404040',
        error: '#BF3A40',
        info: '#2196F3',
        success: '#48BB78',
        warning: '#fb8c00'
      },
    },
  },
  icons: {
    iconfont: 'mdiSvg',
  },
  lang: {
    locales: { ru, en },
    current: process.env.VUE_APP_I18N_LOCALE || 'ru'
  },
})
