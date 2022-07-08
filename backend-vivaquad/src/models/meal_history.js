const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user_id: { type: Schema.Types.ObjectId },
    swiper_id: { type: Schema.Types.ObjectId },
    hall_id: { type: Schema.Types.ObjectId },

   

}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});


schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('meal_histories', schema);
