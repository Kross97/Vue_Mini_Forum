import post from '../../Styles/List/PostItem.scss';

export const PostItem = {
  props: { post: Object },
  template: `<div class=${post.container}>
  <article>
    <span>{{ user.name }}</span>
    <span>{{ post.thema }}</span>
    <p>{{ userPost }}</p>
  </article>
   <p class=${post.text}>{{ post.text }}</p>
  </div>`,
  data: () => ({
    user: {
      name: '',
    },
  }),
  computed: {
    userPost() {
      this.user = this.$store.state.users.entities[this.post.user];
      console.log('USER', this.user);
      console.log('POST', this.post);
      console.log('STATE', this.$store.state);
      // return this.user;
    },
  },
};
