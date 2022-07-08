const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user_id: { type: Schema.Types.ObjectId },
    payment_status: { type: Boolean, default: false },
    amount: { type: Number, },
    stripe_id: { type: String }, 
    currency: { type: String }, 
    payment_method: { type: String }, 
    receipt_url: { type: String }, 
    balance_transaction: { type: String }, 
    email: { type: String }, 
    payment_method_details: { type: String },
},{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});


schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('stripe_payments', schema);
