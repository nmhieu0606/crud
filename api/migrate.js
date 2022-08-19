const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

// Create Connection
con.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("MySQL connected as id " + con.threadId);
});

// Create Database
const db_name = "nuxt_mysql";
con.query(
  "CREATE DATABASE IF NOT EXISTS " +
    db_name +
    " character set UTF8mb4 collate utf8mb4_bin",
  function(err, result) {
    if (err) throw err;
    console.log(`Database "${db_name}" created.`);

    // Select db
    con.changeUser({ database: db_name }, function(err) {
      if (err) throw err;
      console.log(`Database "${db_name}" selected.`);

      // Process on Database
      processDatabase();
    });
  }
);

// Process on Database
function processDatabase() {
  Promise.all([
    createArticlesTable(),
    createUsersTable(),
    createKhachHangTable(),
    createSanPhamTable(),
    createDanhMucTable(),
    createHoaDonTable()
    // add more methods here
  ]).then(() => {
    con.end();
    console.log("MySQL connection closed.");
  });
}

// Create Articles Table
function createArticlesTable() {
  let tablename = "articles";
  let sql = `CREATE TABLE IF NOT EXISTS ${tablename} (

      id INT AUTO_INCREMENT NOT NULL,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      body TEXT NOT NULL,
      date_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      date_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

      PRIMARY KEY (id)
  )`;
  return createTableHelper(sql, tablename);
}

// Create Users Table
function createUsersTable() {
  let tablename = "users";
  let sql = `CREATE TABLE IF NOT EXISTS ${tablename}(

      id INT AUTO_INCREMENT NOT NULL ,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      date_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      date_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
     
  )`;
  return createTableHelper(sql, tablename);
}
function createDanhMucTable() {
  let tablename = "danhmuc";
  let sql = `CREATE TABLE IF NOT EXISTS ${tablename}(
    id INT AUTO_INCREMENT NOT NULL,
    danhmuc VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  )`;
  return createTableHelper(sql, tablename);
}

function createKhachHangTable() {
  let tablename = "khachhang";
  let sql = `CREATE TABLE IF NOT EXISTS ${tablename}(
    id INT AUTO_INCREMENT NOT NULL,
    hovaten VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    diachi VARCHAR(255) NOT NULL,
    sdt VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
    

  )`;
  return createTableHelper(sql, tablename);
}
function createSanPhamTable() {
  let tablename = "sanpham";
  let sql = `CREATE TABLE IF NOT EXISTS ${tablename}(
    id INT AUTO_INCREMENT NOT NULL,
    tensp VARCHAR(255) NOT NULL,
    giatien FLOAT NOT NULL,
    danhmuc_id INT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (danhmuc_id) REFERENCES danhmuc(id)
  )`;
  return createTableHelper(sql, tablename);
}
function createHoaDonTable(){
  let tablename="hoadon";
  let sql=`CREATE TABLE IF NOT EXISTS ${tablename}(
    id INT AUTO_INCREMENT NOT NULL,
    khachhang_id INT NOT NULL ,
    nhanvien_id INT NOT NULL,
    chitiet_hd JSON,
    
    tongtien FLOAT,
    PRIMARY KEY(id),
    FOREIGN KEY (khachhang_id) REFERENCES khachhang(id),
    FOREIGN KEY (nhanvien_id) REFERENCES users(id)
  )`;
  return createTableHelper(sql,tablename);

}

// Create Table Helper
function createTableHelper(sql, tablename) {
  return new Promise((resolve, reject) => {
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log(`Table "${tablename}" created.`);
      resolve(result);
    });
  });
}
