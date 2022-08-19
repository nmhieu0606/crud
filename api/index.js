const express = require('express')

// Create express instnace
const app = express()

// Init body-parser options (inbuilt with express)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Require & Import API routes
const users = require('./routes/users')
const articles = require('./routes/articles')
const khachhang = require('./routes/khachhang')
const sanpham =require('./routes/sanpham')
const danhmuc =require('./routes/danhmuc')
const hoadon=require('./routes/hoadon')
// Use API Routes
app.use(users)
app.use(articles)
app.use(khachhang)
app.use(sanpham)
app.use(danhmuc)
app.use(hoadon)
// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
