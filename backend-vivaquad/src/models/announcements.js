const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    school_id: { type: Schema.Types.ObjectId },
    title: { type: String },
    message: { type: String },

}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});


schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('announcements', schema);
