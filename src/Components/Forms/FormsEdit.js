import forms from '../../Styles/Forms/Forms.sass';
import { FormEditPost } from './FormEditPost';
import { FormEditComment } from './FormEditComment';

export const FormsEdit = {
  name: 'AllFormsEdit',
  template: `
  <div class=${forms.container}>
    <router-view
      :key="postOnEdit.postId + commentOnEdit.commId"
      :comment="commentOnEdit"
      :post="postOnEdit"
    >
   </router-view>
 </div>`,
  computed: {
    postOnEdit() {
      const { idPostEdit } = this.$store.state.posts;
      if (idPostEdit !== 0) {
        const postOnChange = this.$store.state.posts.entities[idPostEdit];
        const userOnChange = this.$store.state.users.entities[postOnChange.user];
        return {
          postId: postOnChange.id,
          userId: postOnChange.user,
          userName: userOnChange.name,
          thema: postOnChange.thema,
          text: postOnChange.text,
        };
      }
      return {
        postId: '',
        userId: '',
        userName: '',
        thema: '',
        text: '',
      };
    },
    commentOnEdit() {
      const { idCommentOnEdit } = this.$store.state.comments;
      if (idCommentOnEdit !== 0) {
        const commentOnChange = this.$store.state.comments.entities[idCommentOnEdit];
        const userOnChange = this.$store.state.users.entities[commentOnChange.user];
        return {
          commId: commentOnChange.id,
          userId: commentOnChange.user,
          userName: userOnChange.name,
          text: commentOnChange.text,
          disabledInput: false,
        };
      }
      return {
        commId: '',
        userId: '',
        userName: '',
        text: '',
        disabledInput: true,
      };
    },
  },
  components: {
    'form-post': FormEditPost,
    'form-comment': FormEditComment,
  },
};
