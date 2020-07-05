import now from 'lodash/now';
import comm from '../../Styles/List/Comments.scss';

export const FormComment = {
  props: ['showFormComment', 'commentsIds', 'postId'],
  template: `<form class="${comm.commentForm}" v-on:submit.prevent="addNewComment" >
      <input type="text" v-model="userName" placeholder="Введите имя пользователя" />
      <input type="text" v-model="text" placeholder="Введите текст комментария" />
      <button type="submit">Добавить</button>
  </form>`,
  data() {
    return {
      userName: '',
      text: '',
    };
  },
  methods: {
    addNewComment() {
      const comment = {
        id: now(),
        user: {
          id: now(),
          name: this.userName,
        },
        text: this.text,
      };
      this.$store.dispatch('addNewComment', comment);
      this.$store.commit('changeDataPost', { postId: this.postId, changes: { comments: [...this.commentsIds, comment.id] } });
      this.userName = '';
      this.text = '';
      this.showFormComment();
    },
  },
};
