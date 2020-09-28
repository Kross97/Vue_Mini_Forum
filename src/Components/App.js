import { VApp, VThemeProvider, VAlert } from 'vuetify/lib';
import { mapActions } from 'vuex';
import { Header } from './Header/Header';
import { AddPost } from './Header/AddPost';
import { ListPost } from './List/ListPost';
import { FormsEdit } from './Forms/FormsEdit';
import app from '../Styles/App/App.sass';
import { store } from '../Store/StoreApp';

export const App = {
  name: 'AppComponent',
  store,
  template: `
<v-app id="inspire">
  <v-theme-provider root>
    <div>
      <header-app :toggleShow="changeStateShowForm">
      </header-app>
      <list-posts></list-posts>
      <forms-edit></forms-edit>
      <add-post
        :toggle="changeStateShowForm"
        :toggleAlert="changeStateShowAlert"
        v-if="isShowFormAddPost">
      </add-post>
      <v-alert
      v-show="isShowAlert"
      dismissible
      border="bottom"
      icon="mdi-vuetify"
      type="success"
      prominent
      width="22%"
      class=${app.alert}
      >
        Пост успешно добавленн!
      </v-alert>
    </div>
  </v-theme-provider>
</v-app>
  `,
  data() {
    return {
      isShowFormAddPost: false,
      isShowAlert: false,
    };
  },
  components: {
    'header-app': Header,
    'list-posts': ListPost,
    'add-post': AddPost,
    'forms-edit': FormsEdit,
    'v-app': VApp,
    'v-theme-provider': VThemeProvider,
    'v-alert': VAlert,
  },
  methods: {
    ...mapActions(['loadingPosts']),
    changeStateShowAlert() {
      this.isShowAlert = true;
      setTimeout(() => this.isShowAlert = false, 3400);
    },
    changeStateShowForm() {
      this.isShowFormAddPost = !this.isShowFormAddPost;
    },
  },
  beforeCreate() {
    if (this.$router.currentRoute.path !== '/') {
      this.$router.replace('/');
    }
  },
  mounted() {
    this.loadingPosts();
  },
};
