import {
  VTextField,
  VTextarea,
  VBtn,
  VForm,
} from 'vuetify/lib';
import now from 'lodash/now';
import add from '../../Styles/AddPost/AddPost.sass';

export const AddPost = {
  props: { toggle: Function, toggleAlert: Function },
  template: `
  <div>
   <div @click="toggle" class=${add.background}></div>
   <div>
    <v-form
    v-model="valid"
    v-on:submit="addNewPost"
    class=${add.formAdd}
    :class="formThema"
   >
       <v-text-field
            :label="$vuetify.lang.t('$vuetify.formAdd.labelName')"
            clearable
            v-model="userName"
            required
            :counter="11"
            :rules="nameRules"
          >
          </v-text-field>
       <v-text-field
            v-model="thema"
            :label="$vuetify.lang.t('$vuetify.formAdd.labelThema')"
            required
            clearable
            :counter="16"
            :rules="themaRules"
          >
          </v-text-field>
       <v-textarea
          outlined
          clearable
          no-resize
          v-model="text"
          :rules="textRules"
          :label="$vuetify.lang.t('$vuetify.formAdd.labelText')"
        >
        </v-textarea>
    <v-btn
      height="52px"
      width="25%"
      type="reset"
      class=${add.btnReset}
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
      type="submit"
      :disabled="!valid"
      class=${add.btnAdd}
    >
      {{ $vuetify.lang.t('$vuetify.formAdd.btnAdd') }}
    </v-btn>
   </v-form>
   </div>
  </div>
  `,
  data: () => ({
    userName: '',
    thema: '',
    text: '',
    valid: true,
    loadingReset: false,
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
  }),
  computed: {
    formThema() {
      const thema = this.$vuetify.theme.isDark;
      return thema ? add.formDark : add.formLight;
    },
  },
  components: {
    'v-text-field': VTextField,
    'v-textarea': VTextarea,
    'v-btn': VBtn,
    'v-form': VForm,
  },
  methods: {
    resetBtn() {
      this.loadingReset = true;
      const context = this;
      setTimeout(() => context.loadingReset = false, 700);
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
      this.$store.dispatch('addPost', post);
      this.toggle();
      this.toggleAlert();
    },
  },
};
