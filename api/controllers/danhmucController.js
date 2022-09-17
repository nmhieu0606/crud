const con = require("../db");
const validation = require("express-validator");
const { response, json } = require("express");

module.exports.list = function(req, res, next) {
  con.query("select * from danhmuc ", function(err, result, fields) {
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

  con.query("select * from danhmuc where id=?", [id], function(
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
  const danhmuc = {};
  // initialize record

  danhmuc.danhmuc = req.body.danhmuc;

  con.query("UPDATE danhmuc SET ? WHERE id=?", [danhmuc, id], function(
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
  const danhmuc = {};
  danhmuc.danhmuc = req.body.danhmuc;

  con.query("insert into danhmuc set ?", danhmuc, function(
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
    return res.json({
      message: "success"
    });
  });
};
module.exports.delete = function(req, res, next) {
  var id = req.params.id;
  con.query("delete from danhmuc where id=?", id, function(
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
