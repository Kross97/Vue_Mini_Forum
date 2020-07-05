import post from '../../Styles/List/PostItem.scss';
import { FormComment } from './FormComment';
import { CommentItem } from './CommentItem';

export const PostItem = {
  props: { post: Object },
  template: `<div @click="setPostOnEdit" class=${post.container}>
  <article>
    <span>{{ userName }}</span>
    <span>{{ post.thema }}</span>
  </article>
   <p class=${post.text}>{{ post.text }}</p>
   <button class=${post.btnRemove} @click.stop="removePost" type="button"></button>
   <button class=${post.btnAddComment} @click.stop="showFormComment" type="button">Добавить комментарий</button>
   <button v-show="allCommentsIds.length !== 0" @click.stop="showListComments" class=${post.btnAddComment} type="button">Посмотреть комментарии</button>
   <form-comment v-if="isShowFormComment" :showFormComment="showFormComment" :postId="post.id" :commentsIds="post.comments"></form-comment>
    <div v-if="isShowListComments">
      <comment-item v-for="idComm of allCommentsIds" :key="idComm" :postId="post.id" :commentsIds="post.comments" :idComm="idComm"></comment-item>
    </div>
  </div>`,
  data() {
    return {
      isShowFormComment: false,
      isShowListComments: false,
    };
  },
  methods: {
    showListComments() {
      this.isShowFormComment = false;
      this.isShowListComments = !this.isShowListComments;
    },
    setPostOnEdit() {
      this.$store.commit('setPostOnEdit', this.post.id);
    },
    removePost() {
      this.$store.commit('setPostOnEdit', 0);
      this.$store.dispatch('deletePost', { postId: this.post.id, userId: this.post.user, commentsIds: this.post.comments });
    },
    showFormComment() {
      this.isShowListComments = false;
      this.isShowFormComment = !this.isShowFormComment;
    },
  },
  computed: {
    userName() {
      this.user = this.$store.state.users.entities[this.post.user];
      return this.user.name;
    },
    allCommentsIds() {
      return this.$store.state.posts.entities[this.post.id].comments;
    },
  },
  components: {
    'form-comment': FormComment,
    'comment-item': CommentItem,
  },
};
