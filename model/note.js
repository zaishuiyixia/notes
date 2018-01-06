/*
* @Author: Administrator
* @Date:   2017-12-26 13:22:20
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-27 01:59:07
*/
var path = require('path');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(undefined,undefined,undefined,{
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.resolve(__dirname,'../database/database.sqlite')
});

/*
做测试看看数据库是否链接成功

sequelize
  .authenticate()
  .then(function() {
    console.log('Connection has been established successfully.');
  })
  .catch(function(err) {
    console.error('Unable to connect to the database:', err);
  });

*/

var Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING
  },
  uid: {
    type: Sequelize.STRING
  }
});

// Note.sync({force: true});
// // force: true will drop the table if it already exists
// Note.sync({force: true}).then(function () {
//   // Table created
//   return Note.create({
//     text: 'hello world'
//   });
// });

Note.sync();

module.exports.Note = Note;