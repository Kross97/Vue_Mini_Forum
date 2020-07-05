import { Header } from './Header/Header';
import { AddPost } from './Header/AddPost';
import { ListPost } from './List/ListPost';
import { FormsEdit } from './Forms/FormsEdit';
import app from '../Styles/App/App.scss';
import { store } from '../Store/StoreApp';

export const App = {
  name: 'AppComponent',
  store,
  template: `
  <div class=${app.container}>
      <header-app :toggle="changeStateShowForm">
      </header-app>
      <list-posts></list-posts>
      <forms-edit></forms-edit>
      <add-post
        :toggle="changeStateShowForm"
        v-if="isShowFormAddPost">
      </add-post>
  </div>`,
  data() {
    return {
      isShowFormAddPost: false,
    };
  },
  components: {
    'header-app': Header,
    'list-posts': ListPost,
    'add-post': AddPost,
    'forms-edit': FormsEdit,
  },
  methods: {
    changeStateShowForm() {
      this.isShowFormAddPost = !this.isShowFormAddPost;
    },
  },
};
