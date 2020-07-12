import Vue from 'vue';
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import { App } from './Components/App';
import { FormEditPost } from './Components/Forms/FormEditPost';
import { FormEditComment } from './Components/Forms/FormEditComment';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/post', component: FormEditPost },
    { path: '/comment', component: FormEditComment },
  ],
});

new Vue({
  el: '#app',
  router,
  vuetify,
  render: (h) => h(App),
});
