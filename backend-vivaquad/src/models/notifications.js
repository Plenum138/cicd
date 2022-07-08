const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user_id: { type: Schema.Types.ObjectId },
    announcement_id: { type: Schema.Types.ObjectId ,default : null },
    title: { type: String },
    message: { type: String },
    type: { type: String },
    status: { type: Number, default: 0 }, 

}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});


schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('notifications', schema);


