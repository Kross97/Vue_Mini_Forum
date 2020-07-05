import header from '../../Styles/Header/Header.scss';

export const Header = {
  props: ['toggle'],
  template: `<header class=${header.container}>
      <button @click="toggle" type="button">Добавить пост</button>
      <div class=${header.logo}></div>
   </header>`,
};
