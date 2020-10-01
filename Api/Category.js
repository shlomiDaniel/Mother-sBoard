const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
// const Category= require('../Models/Product');

const Category = require('../Models/Category');

router.get("/",(req,res)=>{
    Category.find().then(data=>{
     // console.log({data:data.filter(name==="gpu")});
      res.json({
        CategoryName:data
      });
    });
  });
module.exports = router;

