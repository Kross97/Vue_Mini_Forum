import {
  VTextField,
  VTextarea,
  VBtn,
  VForm,
} from 'vuetify/lib';
import { mapActions } from 'vuex';
import forms from '../../Styles/Forms/Forms.sass';

export const FormEditPost = {
  name: 'FormsEditPost',
  props: ['post'],
  template: `<v-form
    v-model="valid"
    class=${forms.formItem}
    v-on:submit.prevent="changeDataPost"
  >
    <p>{{ $vuetify.lang.t('$vuetify.formEdit.titlePost') }}</p>
      <v-text-field
           :label="$vuetify.lang.t('$vuetify.formAdd.labelName')"
           clearable
           v-model="postData.userName"
           required
           :counter="11"
           :rules="nameRules"
         >
         </v-text-field>
      <v-text-field
           v-model="postData.thema"
           :label="$vuetify.lang.t('$vuetify.formAdd.labelComment')"
           required
           clearable
           :counter="16"
           :rules="themaRules"
         >
         </v-text-field>
      <v-textarea
         height="52px"
         outlined
         clearable
         no-resize
         v-model="postData.text"
         :rules="textRules"
         :label="$vuetify.lang.t('$vuetify.formAdd.labelText')"
       >
       </v-textarea>
   <v-btn
     height="52px"
     width="25%"
     type="reset"
     @click="resetBtn"
     :loading="loadingReset"
   >
   <template v-slot:loader>
       <span>Reset...</span>
   </template>
     {{ $vuetify.lang.t('$vuetify.formAdd.btnRest') }}
   </v-btn>
   <v-btn
     height="52px"
     width="25%"
     :disabled="!valid"
     type="submit"
   >
     {{ $vuetify.lang.t('$vuetify.formEdit.button') }}
   </v-btn>
  </v-form>
`,
  data() {
    return {
      loadingReset: false,
      postData: this.post,
      valid: false,
      nameRules: [
        (v) => (v !== '' && v != null) || 'Имя должно быть заполненно!',
        (v) => (v != null && v.length <= 11) || 'Имя не должно быть длиннее 11 символов',
      ],
      themaRules: [
        (v) => (v !== '' && v != null) || 'Тема должна быть заполненна!',
        (v) => (v != null && v.length <= 16) || 'Тема не должна быть длиннее 16 символов',
      ],
      textRules: [
        (v) => (v !== '' && v != null) || 'Текст должен быть заполнен!',
      ],
    };
  },
  methods: {
    ...mapActions(['updatepost']),
    resetBtn() {
      this.postData.text = '';
      this.postData.thema = '';
      this.postData.userName = '';
      this.loadingReset = true;
      setTimeout(() => this.loadingReset = false, 300);
    },
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
      this.updatepost({ updatePost, updateUser });
      this.$router.replace('/');
      this.postData = {
        userName: '',
        thema: '',
        text: '',
        disabledInput: true,
      };
    },
  },
  components: {
    'v-text-field': VTextField,
    'v-textarea': VTextarea,
    'v-btn': VBtn,
    'v-form': VForm,
  },
};
