import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  id: Number,
  customerName: String,
  customerContact: String,
  totalPrice: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  items: {
    type: Array,
    default: [{}],
  },
});

export const Order = mongoose.model('Order', orderSchema);
