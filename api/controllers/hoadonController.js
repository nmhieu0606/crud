const con = require("../db");
const validation = require("express-validator");
const { response, json } = require("express");

module.exports.list = function(req, res, next) {
  con.query("select * from hoadon ", function(err, result, fields) {
    if (err) {
      return res.status(500).json({
        message: "Lỗi load danh sách",
        err: err
      });
    }
    if (result.length > 0) {
      return res.status(200).json(result);
    }
  });
};

module.exports.show = function(req, res, next) {
  var id = req.params.id;

  con.query("select * from hoadon where id=?", [id], function(
    err,
    result,
    fields
  ) {
    if (err) {
      return res.status(500).json({
        message: "Lỗi load danh sách",
        err: err
      });
    }
    if (result.length > 0) {
      return res.json(result[0]);
    }
  });
};

module.exports.update = function(req, res, next) {
  var id = req.params.id;
  const hoadon = {};
  // initialize record

  hoadon.khachhang_id = req.body.khachhang_id;
  hoadon.nhanvien_id = req.body.nhanvien_id;


  con.query("UPDATE hoadon SET ? WHERE id=?", [hoadon, id], function(
    err,
    result,
    fields
  ) {
    if (err) {
      return res.status(500).json({
        message: "Lỗi load danh sách",
        err: err
      });
    }

    return res.status(200).json({
      message: "Update thành công"
    });
  });
};

module.exports.create = function(req, res, next) {
  let d=new Date();
  const hoadon = {};
  hoadon.khachhang_id = req.body.khachhang_id;
  hoadon.nhanvien_id = req.body.nhanvien_id;
  hoadon.chitiet_hd = req.body.chitiet_hd;
  hoadon.tongtien = req.body.tongtien;
  hoadon.ngaylap=d;
  

  con.query("insert into hoadon set ?", hoadon, function(
    err,
    result,
    fields
  ) {
    if (err) {
      return res.status(500).json({
        message: "Lỗi thêm khách hàng",
        err: err
      });
    }
    return res.status(200).json({
      message: "success"
    });
  });
};
module.exports.delete = function(req, res, next) {
  var id = req.params.id;
  con.query("delete from hoadon where id=?", id, function(
    err,
    result,
    fields
  ) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({
      message: "Xóa khách hàng thành công"
    });
  });
};
