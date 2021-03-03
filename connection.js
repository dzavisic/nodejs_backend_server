var mysql = require('mysql');

function Connection() {
  this.pool = null;

  // 0 - localhost database
  // 1 (or any) - online
  var online = 1;

  if(online){
    this.init = function() {
      this.pool = mysql.createPool({
        connectionLimit: 250,
        host: 'put hostname or ip here',
        user: 'username (root)',
        password: 'pswd',
        database: 'name of database'
      });
    };
  }else{
    this.init = function() {
      this.pool = mysql.createPool({
        connectionLimit: 250,
        host: 'put hostname or ip here',
        user: 'username (root)',
        password: 'pswd',
        database: 'name of database'
      });
    };
  }

  this.getConnection = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  };
}


module.exports = new Connection();
