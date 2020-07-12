import { VBtn, VAlert } from 'vuetify/lib';
import header from '../../Styles/Header/Header.sass';
import { ChangeLanguage } from './ChangeLanguage';

export const Header = {
  props: ['toggleShow'],
  template: `<header class=${header.container}>
      <v-btn
        @click="toggle"
        :loading="loading"
        width="15%"
        height="75px"
      >
          {{ $vuetify.lang.t('$vuetify.base.changePost') }}
      </v-btn>
      <div class=${header.logo}></div>
      <select-lng></select-lng>
   </header>`,
  components: {
    'select-lng': ChangeLanguage,
    'v-btn': VBtn,
    'v-alert': VAlert,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    styles() {
      const { themes: { dark, light }, isDark } = this.$vuetify.theme;
      return isDark ? dark : light;
    },
  },
  methods: {
    toggle() {
      this.loading = true;
      const context = this;
      setTimeout(() => context.loading = false, 2000);
      this.toggleShow();
    },
  },
};
