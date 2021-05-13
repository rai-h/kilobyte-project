const express = require("express");
const auth = require("../middleware/auth");
const orderRouter = express.Router();
const Order = require("../modals/order");
const Item = require("../modals/items");
const User = require("../modals/user");

orderRouter.post("/orders", auth, async (req, res) => {
  const reqOrder = req.body.order;
  console.log(req.body.order);
  // orderlist
  cancelOrders = [];
  confirmOrders = [];
  var count = 0;
  // Item.find()

  try {
    reqOrder.forEach(async (element, index) => {
      const itmekey = Object.keys(element)[0];
      console.log(index);
      Item.findOne({ item: itmekey }).then(async function (item) {
        if (!item) {
          order = await Order({
            costumerId: req.user["_id"],
            order: element,
            orderStatus: "canceled",
          });
          order.cancelReason = "No such item";
          cancelOrders.push(order);
          //   console.log(cancelOrder)
        } else if (!(item.quantity >= element[itmekey])) {
          order = await Order({
            costumerId: req.user["_id"],
            order: element,
            orderStatus: "canceled",
          });
          order.cancelReason = "Out of Stock";
          cancelOrders.push(order);
          //   console.log(response)
        } else {
          order = await Order({
            costumerId: req.user["_id"],
            order: element,
            orderStatus: "booked",
          });
          // console.log(order)
          confirmOrders.push(order);
        }

        // console.log({'success':true,'cancelOrder':cancelOrders,'confirmOrders':confirmOrders})
        order.save().then(async () => {
          count = count + 1;
          if (count === reqOrder.length) {
            return res.json({
              success: true,
              cancelOrders: cancelOrders,
              confirmOrders: confirmOrders,
            });
          }
        });
      });
    });
  } catch (e) {
    console.log(e);
    res.json({ success: false, msg: "something went wrong" });
  }

 
});
orderRouter.post("/update/orderstatus", auth, async (req, res) => {
    console.log(req.user.type != "delivery"&&req.user.type != "admin")
    if (req.user.type != "delivery" && req.user.type != "admin") {
      return res.json({ success: false, msg: "Auth failed! You are not an Admin or delivery person" });
    }
    try{
     Order.findOneAndUpdate({_id:req.body.orderId},{orderStatus:req.body.updatedStatus},{new:true}).then((order)=>{
         if(!order){
             return res.json({success:true,msg:"no order with this _id"})
         }
         res.json({success:true,order:order})
     })
     
    }catch(e){res.json({success:false,msg:"something went wrong"})}
  });

  

module.exports = orderRouter;
