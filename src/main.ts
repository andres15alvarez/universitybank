import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi.mjs'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './routers/router'

const universityBankTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#085F63'
  }
}

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'universityBankTheme',
    themes: {
      universityBankTheme
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  components,
  directives
})

createApp(App).use(vuetify).use(router).mount('#app')
