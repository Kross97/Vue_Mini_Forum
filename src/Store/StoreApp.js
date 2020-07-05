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
  }),
  mutations: {
    addPost(state, post) {
      state.ids = [...state.ids, post.id];
      Vue.set(state.entities, post.id, post);
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
  },
};

const comments = {
  state: () => ({
    ids: [],
    entities: {},
  }),
  mutations: {
    addComment(state, comment) {
      state.ids = [...state.ids, comment.id];
      Vue.set(comment.entities, comment.id, comment);
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
