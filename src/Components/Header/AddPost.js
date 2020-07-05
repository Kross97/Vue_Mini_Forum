import now from 'lodash/now';
import add from '../../Styles/AddPost/AddPost.scss';

export const AddPost = {
  props: { toggle: Function },
  template: `
  <div>
   <div @click="toggle" class=${add.background}></div>
   <form v-on:reset="resetForm"  v-on:submit="addNewPost" class=${add.formAdd}>
     <label>
       Имя пользователя:
       <input
       class=${add.input}
       v-bind:class="{ '${add.inputError}': errorValidForm.inputName }"
       type="text"
       v-model="userName"
       placeholder="введите имя пользователя"
       />
       <p v-bind:style="{ color: 'red', margin: 0, 'font-size': '15px'}" v-show="errorValidForm.inputName">Имя некоректно!</p>
     </label>
     <label>
       Название темы:
       <input class=${add.input} v-bind:class="{ '${add.inputError}': errorValidForm.inputThema }" type="text" v-model="thema" placeholder="введите название темы" />
       <p v-bind:style="{ color: 'red', margin: 0, 'font-size': '15px'}" v-show="errorValidForm.inputThema">Тема некоректна!</p>
     </label>
     <label>
       Текст:
       <textarea class=${add.textarea} v-bind:class="{ '${add.inputError}': errorValidForm.inputText }" type="text" v-model="text" placeholder="введите текст"></textarea>
       <p v-bind:style="{ color: 'red', margin: 0, 'font-size': '15px'}" v-show="errorValidForm.inputText">Текст некоректен!</p>
    </label>
     <button type="reset">Сбросить</button>
     <button type="submit">Добавить</button>
   </form>
  </div>
  `,
  data: () => ({
    userName: '',
    thema: '',
    text: '',
    errorValidForm: {
      inputName: false,
      inputThema: false,
      inputText: false,
    },
  }),
  methods: {
    resetForm() {
      this.userName = '';
      this.thema = '';
      this.text = '';
    },
    addNewPost(e) {
      e.preventDefault();
      const post = {
        id: now(),
        user: {
          id: now(),
          name: this.userName,
        },
        thema: this.thema,
        text: this.text,
        comments: [],
      };
      console.log('Отправленный пост', post);
      this.$store.dispatch('addPost', post);
      this.resetForm();
      this.toggle();
    },
  },
  watch: {
    userName(val) {
      if (val === '' || val.length > 11) {
        this.errorValidForm.inputName = true;
      } else {
        this.errorValidForm.inputName = false;
      }
    },
    thema(val) {
      if (val === '' || val.length > 17) {
        this.errorValidForm.inputThema = true;
      } else {
        this.errorValidForm.inputThema = false;
      }
    },
    text(val) {
      if (val === '') {
        this.errorValidForm.inputText = true;
      } else {
        this.errorValidForm.inputText = false;
      }
    },
  },
};
