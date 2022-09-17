const { json } = require("express");
const con = require("../db");
const PAGE_SIZE = 5

module.exports.list = function (req, res) {

  var limit = 5;
  let sum, tongsopage;
  var request = req.query.page;

  con.query("select count(id) as sum_sanpham from sanpham", function (err, result) {
    if (err) {
      return res.status(500).json({
        mess: "Lỗi load danh sách",
        err: err
      });
    } else {
      sum = result[0];
    }
  });

  if (request) {
    var page = parseInt(request)
    if (page < 1) {
      page = 1;
    }
    var offset = (page - 1) * PAGE_SIZE;


    con.query("select * from sanpham limit " + limit + " offset " + offset, function (err, result) {
      if (err) {
        return res.status(500).json({
          mess: "Lỗi load danh sách",
          err: err
        });
      } else {
        return res.status(200).json({
          tongsopage: Math.ceil(sum.sum_sanpham / PAGE_SIZE),
          data: result,
        });
      }
    });



  }
  else {
    con.query("select * from sanpham", function (err, result) {
      if (err) {
        return res.status(500).json({
          mess: "Lỗi load danh sách",
          err: err
        });
      } else {
        return res.status(200).json({
          tongsopage: Math.ceil(sum.sum_sanpham / PAGE_SIZE),
          data: result,
        });
      }
    });

  }

};

module.exports.create = function (req, res) {
  var sanpham = {};
  sanpham.tensp = req.body.tensp;
  sanpham.giatien = req.body.giatien;
  sanpham.danhmuc_id = req.body.danhmuc_id;
  con.query("insert into sanpham set ?", sanpham, function (err, result) {
    if (err) {
      return res.status(500).json({
        mess: "Lỗi thêm sản phẩm",
        err: err
      });
    } else {
      return res.status(200).json({
        mess: "Thêm mới thành công"
      });
    }
  });
};
module.exports.show = function (req, res) {
  var id = req.params.id;
  con.query("select *from sanpham where id=?", id, function (err, result) {
    if (err) {
      return res.status(500).json({
        mess: "Lỗi show",
        err: err
      });
    } else {
      return res.status(200).json(result[0]);
    }
  });
};
module.exports.delete = function (req, res) {
  var id = req.params.id;
  con.query("delete from sanpham where id=?", id, function (err, result) {
    if (err) {
      return res.status(500).json({
        mess: "Lỗi show",
        err: err
      });
    } else {
      return res.status(200).json(result[0]);
    }
  });
};
module.exports.update = function (req, res) {
  var id = req.params.id;
  var sanpham = {};
  sanpham.tensp = req.body.tensp;
  sanpham.giatien = req.body.giatien;
  sanpham.danhmuc_id = req.body.danhmuc_id;
  con.query("update sanpham set ? where id=?", [sanpham, id], function (err, result) {
    if (err) {
      return res.status(500).json({
        mess: "Lỗi update",
        err: err
      });
    } else {
      return res.status(200).json({
        'mess': 'Update thành công',
      });
    }
  })
};
module.exports.search = function (req, res) {
  var tensp = req.params.tensp;

  con.query("select * from sanpham where tensp Like '%" + tensp + "%' ", tensp, function (err, result) {
    if (err) {
      return res.status(500).json({
        mess: "Lỗi update",
        err: err
      });
    }
    else {
      return res.status(200).json(result);

    }

  });
}
