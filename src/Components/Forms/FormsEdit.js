import forms from '../../Styles/Forms/Forms.scss';
import { FormEditPost } from './FormEditPost';
import { FormEditComment } from './FormEditComment';

export const FormsEdit = {
  name: 'AllFormsEdit',
  template: `
  <div class=${forms.container}>
    <form-post :key="postOnEdit.postId + 'post'" :post="postOnEdit"></form-post>
    <form-comment :key="commentOnEdit.commId + 'comm'" :comment="commentOnEdit"></form-comment>
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
          disabledInput: false,
        };
      }
      return {
        postId: '',
        userId: '',
        userName: '',
        thema: '',
        text: '',
        disabledInput: true,
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
