const express = require("express");
const auth = require("../middleware/auth");
const getData = express.Router();
const Order = require("../modals/order");
const Item = require("../modals/items");
const User = require("../modals/user");


getData.post("/getorderdata", auth, async (req, res) => {
    if (req.user.type != "admin") {
      return res.json({ success: false, msg: "Auth failed! You are not an Admin" });
    }
    try{
     Order.find({orderStatus:req.body.orderStatus}).then((orders)=>{
         if(orders.length===0){
             return res.json({success:true,msg:"no order with this status"})
         }
         res.json({success:true,orders:orders})
     })
     
    }catch(e){res.json({success:false,msg:"something went wrong"})}
  });

  getData.post("/getdileveryperson", auth, async (req, res) => {
    if (req.user.type != "admin") {
      return res.json({ success: false, msg: "Auth failed! You are not an Admin" });
    }
    try{
     User.find({type:'delivery'}).then((users)=>{
         if(users.length===0){
             return res.json({success:true,msg:"no user with this found"})
         }
         res.json({success:true,data:users})
     })
     
    }catch(e){res.json({success:false,msg:"something went wrong"})}
  });

module.exports = getData;
