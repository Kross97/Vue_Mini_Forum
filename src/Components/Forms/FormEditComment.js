import forms from '../../Styles/Forms/Forms.scss';

export const FormEditComment = {
  name: 'FormsEditComment',
  props: ['comment'],
  template: `<form class=${forms.formItem} @submit.prevent="changeDataComment">
   <p>Форма редактирования комментария</p>
   <label>Имя пользователя:
     <input type="text" :disabled="commentData.disabledInput" v-model="commentData.userName" />
   </label>
   <label>Текст комментария:
     <input type="text" :disabled="commentData.disabledInput" v-model="commentData.text" />
   </label>
   <button :class="{'${forms.btnDisabled}': commentData.disabledInput }" :disabled="commentData.disabledInput" type="submit">Изменить</button>
  </form>`,
  methods: {
    changeDataComment() {
      const commentUpdate = {
        commId: this.comment.commId,
        changes: {
          text: this.commentData.text,
        },
      };
      const userUpdate = {
        userId: this.comment.userId,
        changes: {
          name: this.commentData.userName,
        },
      };
      this.$store.commit('setCommentOnEdit', 0);
      this.$store.commit('changeDataComment', commentUpdate);
      this.$store.commit('changeDataUser', userUpdate);
      this.commentData = { userName: '', text: '', disabledInput: true };
    },
  },
  data() {
    return {
      commentData: this.comment,
    };
  },
};
