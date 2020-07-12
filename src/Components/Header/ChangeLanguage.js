import { VSelect } from 'vuetify/lib';
import header from '../../Styles/Header/Header.sass';

export const ChangeLanguage = {
  template: `
   <v-select
    class=${header.languages}
    autofocus
    :items="items"
    hint="выберите язык"
    :value="items[0]"
    v-on:change="changeLanguage"
   >
   </v-select>
  `,
  components: {
    'v-select': VSelect,
  },
  data() {
    return {
      items: ['Русский', 'English', 'Український'],
    };
  },
  methods: {
    changeLanguage(e) {
      switch (e) {
        case 'Русский':
          this.$vuetify.lang.current = 'ru';
          break;
        case 'English':
          this.$vuetify.lang.current = 'en';
          break;
        default:
          this.$vuetify.lang.current = 'uk';
      }
    },
  },
};
