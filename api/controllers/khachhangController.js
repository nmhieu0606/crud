const con = require("../db");
const validation = require("express-validator");
const { response, json } = require("express");

module.exports.list = function(req, res, next) {
  con.query("select *from khachhang ", function(err, result, fields) {
    if (err) {
      return res.status(500).json({
        message: "Lỗi load danh sách",
        err: err
      });
    }
  });
};

module.exports.list = function(req, res, next) {
  con.query("select *from khachhang ", function(err, result, fields) {
    if (err) {
      return res.status(500).json({
        message: "Lỗi load danh sách",
        err: err
      });
    }
    if (result.length > 0) {
      return res.json(result);
    } else {
      return res.json([]);
    }
  });
};
module.exports.create = function(req, res, next) {
  const khachhang = {};
  khachhang.hovaten = req.hovaten.body;
  khachhang.email = req.email.body;
  khachhang.diachi = req.diachi.body;
  khachhang.sdt = req.sdt.body;

  con.query("insert into khachhang set ?",khachhang,function(err,result,fields){
    if(err){
        return res.status(500).json({
            message:'Lỗi c'

        });
    }
  });
};
