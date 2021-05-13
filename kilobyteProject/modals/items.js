const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  item: { type: String, 
          required: true, 
          trim: true },
  quantity: { type: Number, 
              required: true, 
              trim: true },
});


const Item = mongoose.model("Item", itemSchema);
module.exports = Item