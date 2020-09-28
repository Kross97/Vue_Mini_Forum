/* eslint-disable no-param-reassign */
import Vuex from 'vuex';
import Vue from 'vue';
import { normalize, schema } from 'normalizr';
import { getPosts, addPost, deletePost, updatePost } from '../../api/posts';
import { addComment, deleteComment, updateComment } from '../../api/comments';

Vue.use(Vuex);

const userSchema = new schema.Entity('users');

const commentSchema = new schema.Entity('comments', {
  user: userSchema,
});

const postSchema = new schema.Entity('posts', {
  user: userSchema,
  comments: [commentSchema],
});

const posts = {
  state: () => ({
    ids: [],
    entities: {},
    idPostEdit: 0,
  }),
  mutations: {
    addPost(state, post) {
      state.ids = [...state.ids, post.id];
      Vue.set(state.entities, post.id, post);
    },
    removePost(state, postId) {
      Vue.delete(state.ids, state.ids.indexOf(postId));
      Vue.delete(state.entities, postId);
    },
    setPostOnEdit(state, postId) {
      state.idPostEdit = postId;
    },
    changeDataPost(state, update) {
      state.entities[update.postId] = { ...state.entities[update.postId], ...update.changes };
    },
    loadingPosts(state, { posts, ids }) {
      state.entities = posts;
      state.ids = ids;
    },
  },
  getters: {
    allPosts: (state) => (
      state.ids.map((id) => state.entities[id])
    ),
  },
  actions: {
    async updatepost(context, dataPost) {
      const message = await updatePost('/updatepost', dataPost);
      console.log('Update post: ', message);
      context.commit('setPostOnEdit', 0);
      context.commit('changeDataPost', dataPost.updatePost);
      context.commit('changeDataUser', dataPost.updateUser);
    },
    async addPost(context, post) {
      const message = await addPost('/addpost', post);
      console.log('Add post: ', message);
      const data = normalize(post, postSchema);
      context.commit('addPost', data.entities.posts[post.id]);
      context.commit('addUser', data.entities.users[post.user.id]);
    },
    async deletePost(context, dataRemove) {
      const message = await deletePost(`/deletepost/${dataRemove.postId}`);
      console.log('Delete post: ', message);
      context.commit('removePost', dataRemove.postId);
      context.commit('removeUser', dataRemove.userId);
    },
    async loadingPosts(context) {
      const postsData = await getPosts('/posts');
      console.log('Posts for server: ', postsData);
      const allPosts = normalize(postsData, [postSchema]);
      context.commit('setPostOnEdit', 0);
      allPosts.entities.posts && context.commit('loadingPosts', { posts: allPosts.entities.posts, ids: allPosts.result });
      allPosts.entities.users && context.commit('loadingUsers', allPosts.entities.users);
      allPosts.entities.comments && context.commit('loadingComments', allPosts.entities.comments);
    },
  },
};
const users = {
  state: () => ({
    ids: [],
    entities: {},
  }),
  mutations: {
    addUser(state, user) {
      state.ids = [...state.ids, user.id];
      Vue.set(state.entities, user.id, user);
    },
    removeUser(state, userId) {
      Vue.delete(state.ids, state.ids.indexOf(userId));
      Vue.delete(state.entities, userId);
    },
    changeDataUser(state, update) {
      state.entities[update.userId] = { ...state.entities[update.userId], ...update.changes };
    },
    loadingUsers(state, allUsers) {
      state.entities = allUsers;
      state.ids = Object.keys(allUsers);
    },
  },
};

const comments = {
  state: () => ({
    ids: [],
    entities: {},
    idCommentOnEdit: 0,
  }),
  mutations: {
    addComment(state, comment) {
      state.ids = [...state.ids, comment.id];
      Vue.set(state.entities, comment.id, comment);
    },
    removeComment(state, commId) {
      Vue.delete(state.ids, state.ids.indexOf(commId));
      Vue.delete(state.entities, commId);
    },
    setCommentOnEdit(state, commId) {
      state.idCommentOnEdit = commId;
    },
    changeDataComment(state, update) {
      state.entities[update.commId] = { ...state.entities[update.commId], ...update.changes };
    },
    loadingComments(state, allComments) {
      state.entities = allComments;
      state.ids = Object.keys(allComments);
    },
  },
  actions: {
    async updateComment(context, commentData) {
      const message = await updateComment('/updatecomment', commentData);
      console.log('Update comment: ', message);
      context.commit('setCommentOnEdit', 0);
      context.commit('changeDataComment', commentData.commentUpdate);
      context.commit('changeDataUser', commentData.userUpdate);
    },
    async addNewComment(context, comment) {
      await addComment('/addcomment', comment);
      const data = normalize(comment, commentSchema);
      context.commit('addComment', data.entities.comments[comment.id]);
      context.commit('addUser', data.entities.users[comment.user.id]);
    },
    async removeComment(context, commentId) {
      await deleteComment(`/deletecomment/${commentId}`);
      context.commit('removeComment', commentId);
    },
  },
};

export const store = new Vuex.Store({
  modules: {
    posts,
    users,
    comments,
  },
});
