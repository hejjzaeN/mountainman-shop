import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  id: String,
  createdOn: Date,
  customerName: String,
  customerContact: String,
  price: Number
});

export const Order = mongoose.model('Order', orderSchema);
