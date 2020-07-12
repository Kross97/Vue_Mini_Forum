import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ru from './locales/ru';
import en from './locales/en';
import uk from './locales/uk';

Vue.use(Vuetify);

Vuetify.config.silent = true;

export default new Vuetify({
  lang: {
    locales: { ru, en, uk },
    current: 'ru',
  },
  icons: {
    iconfont: 'mdiSvg',
  },
  theme: {
    dark: true,
    themes: {
      light: {
        ccc: '#b71c1c',
      },
      dark: {
        ccc: '#8c9eff',
      },
    },
  },
  breakpoint: {
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
  },
});
