import forms from '../../Styles/Forms/Forms.scss';

export const FormEditPost = {
  name: 'FormsEditPost',
  props: ['post'],
  template: `<form class=${forms.formItem} v-on:submit.prevent="changeDataPost">
   <p>Форма редактирования поста</p>
   <label>Имя пользователя:
     <input type="text" :disabled="postData.disabledInput" v-model="postData.userName" />
   </label>
   <label>Тема:
     <input type="text" :disabled="postData.disabledInput" v-model="postData.thema" />
   </label>
   <label>Текст поста:
     <input type="text" :disabled="postData.disabledInput" v-model="postData.text" />
   </label>
   <button :class="{ '${forms.btnDisabled}': postData.disabledInput}" :disabled="postData.disabledInput" type="reset">Сбросить</button>
   <button :class="{ '${forms.btnDisabled}': postData.disabledInput}" :disabled="postData.disabledInput" type="submit">Изменить</button>
  </form>`,
  data() {
    return {
      postData: this.post,
    };
  },
  methods: {
    changeDataPost() {
      const updatePost = {
        postId: this.postData.postId,
        changes: {
          thema: this.postData.thema,
          text: this.postData.text,
        },
      };

      const updateUser = {
        userId: this.postData.userId,
        changes: {
          name: this.postData.userName,
        },
      };
      this.$store.commit('setPostOnEdit', 0);
      this.$store.commit('changeDataPost', updatePost);
      this.$store.commit('changeDataUser', updateUser);
      this.postData = {
        userName: '',
        thema: '',
        text: '',
        disabledInput: true,
      };
    },
  },
};
