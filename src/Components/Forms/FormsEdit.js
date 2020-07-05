import forms from '../../Styles/Forms/Forms.scss';

export const FormsEdit = {
  template: `
  <div class=${forms.container}>
  <form class=${forms.formItem}>
   <p>Форма редактирования поста</p>
   <label>Имя пользователя:
     <input type="text" />
   </label>
   <label>Тема:
     <input type="text" />
   </label>
   <label>Текст поста:
     <input type="text"/>
   </label>
   <button type="reset">Сбросить</button>
   <button type="submit">Изменить</button>
  </form>
  <form class=${forms.formItem}>
   <p>Форма редактирования комментария</p>
   <label>Имя пользователя:
     <input type="text" />
   </label>
   <label>Текст комментария:
     <input type="text" />
   </label>
   <button type="submit">Изменить</button>
  </form>
 </div>`,
};
