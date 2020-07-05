/* eslint-disable no-param-reassign */
import Vuex from 'vuex';
import Vue from 'vue';
import { normalize, schema } from 'normalizr';

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
  },
  getters: {
    allPosts: (state) => (
      state.ids.map((id) => state.entities[id])
    ),
  },
  actions: {
    addPost: (context, post) => {
      const data = normalize(post, postSchema);
      context.commit('addPost', data.entities.posts[post.id]);
      context.commit('addUser', data.entities.users[post.user.id]);
    },
    deletePost: (context, dataRemove) => {
      context.commit('removePost', dataRemove.postId);
      context.commit('removeUser', dataRemove.userId);
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
  },
  actions: {
    addNewComment(context, comment) {
      const data = normalize(comment, commentSchema);
      context.commit('addComment', data.entities.comments[comment.id]);
      context.commit('addUser', data.entities.users[comment.user.id]);
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
