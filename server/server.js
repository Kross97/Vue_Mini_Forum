const express = require('express');
const cors = require('cors');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

/* установка базы данных в mySql
 sudo mysql
 create user user_name
 create database database_name
 grant all on database_name.* to user_name
 flush privileges
 */

/* получение пользователей в MySql
  use mysql
  select user from user
  show grants for %username%
*/

/* получение порта в MySql
 show variables like 'port'
*/

const sequelize = new Sequelize('forumDb2', 'nekit', '', {
  dialect: 'mysql',
  host: 'database',
  port: 3306,
  define: {
    timestamps: false,
  },
});

const Post = sequelize.define('post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  thema: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Comment = sequelize.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Comment.hasOne(User, { onDelete: 'cascade' });
Post.hasOne(User, { onDelete: 'cascade' });
Post.hasMany(Comment, { onDelete: 'cascade' });

sequelize.sync({ force: true });

const app = express();

app.use(cors());
// app.options('*', cors());

app.get('/', (request, response) => {
  response.send('<h2>Vue + Express!</h2>');
});

app.put('/updatecomment', jsonParser, (request, response) => {
  const { commentUpdate, userUpdate } = request.body;
  Comment.update({
    text: commentUpdate.changes.text,
  }, {
    where: {
      id: commentUpdate.commId,
    },
  });

  User.update({
    name: userUpdate.changes.name,
  }, {
    where: {
      id: userUpdate.userId,
    },
  });

  response.send('Comment update success');
});

app.put('/updatepost', jsonParser, (request, response) => {
  const { updatePost, updateUser } = request.body;
  Post.update({
    text: updatePost.changes.text,
    thema: updatePost.changes.thema,
  }, {
    where: {
      id: updatePost.postId,
    },
  });

  User.update({
    name: updateUser.changes.name,
  }, {
    where: {
      id: updateUser.userId,
    },
  });

  response.send('Post update success');
});

app.delete('/deletecomment/:commId', (request, response) => {
  const idComm = request.params.commId;
  Comment.destroy({
    where: {
      id: idComm,
    },
  }).then((comment) => {
    response.send(`Post deleted success, postId: ${comment}`);
  });
});

app.delete('/deletepost/:postId', (request, response) => {
  const idPost = request.params.postId;
  Post.destroy({
    where: {
      id: idPost,
    },
  }).then((post) => {
    response.send(`Comment deleted success, postId: ${post}`);
  });
});

app.post('/addcomment', jsonParser, (request, response) => {
  const comm = request.body;
  console.log('COMMENT-SERVER', comm);
  Post.findByPk(comm.postId).then((post) => {
    post.createComment({ text: comm.text }).then((comment) => {
      comment.createUser({ name: comm.user.name }).then(() => {
        response.send('Comment added succes');
      });
    });
  });
});

app.post('/addpost', jsonParser, async (request, response) => {
  const post = request.body;
  const postData = await Post.create({
    text: post.text,
    thema: post.thema,
  });

  User.create({
    name: post.user.name,
  }).then((user) => {
    postData.setUser(user);
  });
  response.send('added post success');
});

app.get('/posts', (request, response) => {
  Post.findAll({
    include: [{
      model: User,
      attributes: ['id', 'name'],
    },
    {
      model: Comment,
      attributes: ['id', 'text'],
      include: [{
        model: User,
        attributes: ['id', 'name'],
      }],
    }],
  }).then((posts) => {
    response.send(posts);
  });
});

app.listen(3000);
