import comment from '../../Styles/List/Comments.scss';

export const CommentItem = {
  props: ['idComm', 'commentsIds', 'postId'],
  template: `<div v-on:click.stop="setCommentOnEdit" class=${comment.container}>
   <span>{{ commentUser.name }}</span>
   <span>{{ commentUser.text }}</span>
   <button @click.stop="removeComment(commentUser)" type="button"></button>
  </div>`,
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
  },
};
