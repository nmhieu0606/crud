const config=require('../config');
const Router=require('express');
const router=Router();
const sanphamController=require('../controllers/sanphamController');
const { route } = require('./khachhang');
router.get('/sanpham',sanphamController.list);
router.post('/sanpham',sanphamController.create);
router.get('/sanpham/:id',sanphamController.show);
router.put('/sanpham/:id',sanphamController.update);
router.delete('/sanpham/:id',sanphamController.delete);
router.get('/sanpham/timkiem/:tensp',sanphamController.search);
module.exports=router;

