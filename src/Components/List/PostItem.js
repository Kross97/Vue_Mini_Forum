import {
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VBtn,
  VIcon,
} from 'vuetify/lib';
import { mapActions } from 'vuex';
import post from '../../Styles/List/PostItem.sass';
import FormComment from './FormComment.vue';
import { CommentItem } from './CommentItem';

export const PostItem = {
  props: { post: Object },
  template: `<v-card
    @click="setPostOnEdit"
    :loading="editProcess"
    class=${post.container}
  >
  <v-card-title class=${post.title}>
    <span>{{ userName }}</span>
    <span>{{ post.thema }}</span>
  </v-card-title>
   <v-card-text class=${post.text}>
    {{ post.text }}
  </v-card-text>
  <v-card-actions>
    <v-btn
    fab
    class=${post.btnRemove}
    @click.stop="removePost">
      <v-icon width="25px" dark>mdi-minus</v-icon>
  </v-btn>
    <v-btn
      class=${post.btnAddComment}
      @click.stop="showFormComment"
      width="34%"
      height="48px"
    >
    {{ $vuetify.lang.t('$vuetify.dataComment.addComment') }}
    </v-btn>
    <v-btn
      v-show="allCommentsIds.length !== 0"
      @click.stop="showListComments"
      width="34%"
      height="48px"
      class=${post.btnAddComment}
      >
        {{ $vuetify.lang.t('$vuetify.dataComment.showComment') }}
    </v-btn>
  </v-card-actions>
   <form-comment v-if="isShowFormComment" :showFormComment="showFormComment" :postId="post.id" :commentsIds="post.comments"></form-comment>
    <div v-if="isShowListComments">
      <comment-item v-for="idComm of allCommentsIds" :key="idComm" :postId="post.id" :commentsIds="post.comments" :idComm="idComm"></comment-item>
    </div>
  </v-card>`,
  data() {
    return {
      isShowFormComment: false,
      isShowListComments: false,
    };
  },
  methods: {
    ...mapActions(['loadingPosts']),
    showListComments() {
      this.isShowFormComment = false;
      this.isShowListComments = !this.isShowListComments;
    },
    setPostOnEdit() {
      if (this.$router.currentRoute.path !== '/post') {
        this.$router.replace('/post');
      }
      this.$store.commit('setCommentOnEdit', 0);
      this.$store.commit('setPostOnEdit', this.post.id);
    },
    removePost() {
      this.$store.commit('setPostOnEdit', 0);
      this.$store.dispatch('deletePost', { postId: this.post.id, userId: this.post.user, commentsIds: this.post.comments });
    },
    showFormComment() {
      this.isShowListComments = false;
      this.isShowFormComment = !this.isShowFormComment;
    },
  },
  computed: {
    editProcess() {
      const idEditing = this.$store.state.posts.idPostEdit;
      return idEditing === this.post.id ? 'error' : false;
    },
    userName() {
      this.user = this.$store.state.users.entities[this.post.user];
      return this.user.name;
    },
    allCommentsIds() {
      return this.$store.state.posts.entities[this.post.id].comments;
    },
  },
  watch: {
    allCommentsIds(ids, oldIds) {
      if (ids.length > oldIds.length) {
        this.loadingPosts();
      }
    },
  },
  components: {
    'form-comment': FormComment,
    'comment-item': CommentItem,
    'v-card': VCard,
    'v-card-title': VCardTitle,
    'v-card-text': VCardText,
    'v-card-actions': VCardActions,
    'v-btn': VBtn,
    'v-icon': VIcon,
  },
};
