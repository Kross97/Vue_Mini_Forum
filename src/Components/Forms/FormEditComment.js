import {
  VTextField,
  VTextarea,
  VBtn,
  VForm,
} from 'vuetify/lib';
import { mapActions } from 'vuex';
import forms from '../../Styles/Forms/Forms.sass';

export const FormEditComment = {
  name: 'FormsEditComment',
  props: ['comment'],
  template: `<v-form
      v-model="valid"
      class=${forms.formItem}
      @submit.prevent="changeDataComment"
    >
   <p>{{ $vuetify.lang.t('$vuetify.formEdit.titleComment') }}</p>
     <v-text-field
        :rules="nameRules"
        clearable
        :label="$vuetify.lang.t('$vuetify.formAdd.labelName')"
        :disabled="commentData.disabledInput"
        v-model="commentData.userName">
     </v-text-field>
     <v-textarea
        height="65px"
        clearable
        :style="{ 'margin-top': '55px' }"
        :rules="textRules"
        counter="11"
        :label="$vuetify.lang.t('$vuetify.formAdd.labelComment')"
        :disabled="commentData.disabledInput"
        no-resize
        v-model="commentData.text"
      >
      </v-textarea>

   <v-btn
    :class="{'${forms.btnDisabled}': commentData.disabledInput }"
    :disabled="!valid"
    type="submit"
    >
      {{ $vuetify.lang.t('$vuetify.formEdit.button') }}
    </v-btn>
  </v-form>`,
  methods: {
    ...mapActions(['updateComment']),
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
      this.updateComment({ commentUpdate, userUpdate });
      this.commentData = { userName: '', text: '', disabledInput: true };
    },
  },
  data() {
    return {
      valid: false,
      commentData: this.comment,
      nameRules: [
        (v) => (v !== '' && v != null) || 'Имя должно быть заполненно!',
        (v) => (v != null && v.length <= 11) || 'Имя не должно быть длиннее 11 символов',
      ],
      textRules: [
        (v) => (v !== '' && v != null) || 'Текст должен быть заполнен!',
      ],
    };
  },
  components: {
    'v-text-field': VTextField,
    'v-textarea': VTextarea,
    'v-btn': VBtn,
    'v-form': VForm,
  },
};
