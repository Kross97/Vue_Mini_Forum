import list from '../../Styles/List/List.scss';
import { PostItem } from './PostItem';

export const ListPost = {
  template: `<aside class=${list.container}>
   <template v-show="allPosts.length !== 0">
     <post-item v-for="post of allPosts" :key="post.id" :post="post"></post-item>
   </template>
  </aside>`,
  computed: {
    allPosts() {
      return this.$store.getters.allPosts;
    },
  },
  components: {
    'post-item': PostItem,
  },
};
