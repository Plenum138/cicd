const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    school_name: { type: String, required: true },
    address: { type: String, required: true },
    media: {type: 'String',   required: true },
    loginid: { type: Schema.Types.ObjectId }
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('schools', schema);