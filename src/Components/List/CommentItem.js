import { VCard, VCardTitle, VCardText } from 'vuetify/lib';
import comment from '../../Styles/List/Comments.sass';

export const CommentItem = {
  props: ['idComm', 'commentsIds', 'postId'],
  template: `<v-card
    :loading="editProcess"
    v-on:click.stop="setCommentOnEdit"
    class=${comment.container}
    >
   <v-card-title>{{ commentUser.name }}</v-card-title>
   <v-card-text>{{ commentUser.text }}</v-card-text>
   <button @click.stop="removeComment(commentUser)" type="button"></button>
  </v-card>`,
  methods: {
    removeComment(dataComment) {
      const removeCommentInList = {
        postId: this.postId,
        changes: {
          comments: this.commentsIds.filter((commId) => commId !== this.idComm),
        },
      };
      this.$store.commit('setCommentOnEdit', 0);
      this.$store.commit('changeDataPost', removeCommentInList);
      this.$store.commit('removeComment', this.idComm);
      this.$store.commit('removeUser', dataComment.userId);
    },
    setCommentOnEdit() {
      if (this.$router.currentRoute.path !== '/comment') {
        this.$router.replace('/comment');
      }
      this.$store.commit('setPostOnEdit', 0);
      this.$store.commit('setCommentOnEdit', this.idComm);
    },
  },
  computed: {
    commentUser() {
      const currentComment = this.$store.state.comments.entities[this.idComm];
      const commentUser = this.$store.state.users.entities[currentComment.user];
      return {
        userId: commentUser.id,
        name: commentUser.name,
        text: currentComment.text,
      };
    },
    editProcess() {
      const idEditing = this.$store.state.comments.idCommentOnEdit;
      return idEditing === this.idComm ? 'error' : false;
    },
  },
  components: {
    'v-card': VCard,
    'v-card-title': VCardTitle,
    'v-card-text': VCardText,
  },
};
