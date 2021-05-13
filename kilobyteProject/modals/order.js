const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const orderSchema = mongoose.Schema({
  order: { type: JSON, 
          required: true, 
          trim: true },
  costumerId: { 
    type: ObjectId  , 
              required: true, 
              trim: true },
  orderStatus: {
      type:String,
      trim: true,
      required: true
      
  },
  cancelReason:{
    type:String,
    trim:true
  }
});


const Item = mongoose.model("Order", orderSchema);
module.exports = Item