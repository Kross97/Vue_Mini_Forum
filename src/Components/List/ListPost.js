import { mapActions } from 'vuex';
import list from '../../Styles/List/List.sass';
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
  watch: {
    allPosts(val, oldVal) {
      if (val.length > oldVal.length) {
        this.loadingPosts();
      }
    },
  },
  methods: {
    ...mapActions(['loadingPosts']),
  },
  components: {
    'post-item': PostItem,
  },
};
