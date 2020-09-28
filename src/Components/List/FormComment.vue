<template>
<v-form
    v-model="valid"
    :class="$style.commentForm"
    v-on:submit.prevent="addNewComment"
  >
    <v-text-field
      v-model="userName"
      :counter="11"
      clearable
      :rules="nameRules"
      required

      :label="$vuetify.lang.t('$vuetify.formAdd.labelName')"
      :placeholder="$vuetify.lang.t('$vuetify.formAdd.titleUser')">
    </v-text-field>
    <v-textarea
      v-model="text"
      :no-resize=true
      clearable
      :rules="textRules"
      :label="$vuetify.lang.t('$vuetify.formAdd.labelText')"
      :placeholder="$vuetify.lang.t('$vuetify.formAdd.titleComment')"
    >
    </v-textarea>
    <v-btn
      :class="$style.btnAdd"
      :disabled="!valid"
      type="submit"
    >
      {{ $vuetify.lang.t('$vuetify.formAdd.btnAdd')}}
    </v-btn>
</v-form>
</template>

<script>
import {
  VTextField,
  VTextarea,
  VBtn,
  VForm,
} from 'vuetify/lib';
import now from 'lodash/now';
import { mapActions } from 'vuex';

export default {
  props: ['showFormComment', 'commentsIds', 'postId'],
  data() {
    return {
      userName: '',
      text: '',
      valid: false,
      nameRules: [
        (v) => (v !== '' && v != null) || 'Имя должно быть заполненно!',
        (v) => (v != null && v.length <= 11) || 'Имя не должно быть длиннее 11 символов',
      ],
      textRules: [
        (v) => (v !== '' && v != null) || 'Текст должен быть заполнен!',
      ],
    };
  },
  methods: {
    ...mapActions(['loadingPosts']),
    addNewComment() {
      const comment = {
        id: now(),
        postId: this.postId,
        user: {
          id: now(),
          name: this.userName,
        },
        text: this.text,
      };
      this.loadingPosts();
      this.$store.dispatch('addNewComment', comment);
      this.$store.commit('changeDataPost', { postId: this.postId, changes: { comments: [...this.commentsIds, comment.id] } });
      this.userName = '';
      this.text = '';
      this.showFormComment();
    },
  },
  components: {
    'v-text-field': VTextField,
    'v-textarea': VTextarea,
    'v-btn': VBtn,
    'v-form': VForm,
  },
};
</script>
<style module lang="sass" src='../../Styles/List/Comments.sass'></style>
