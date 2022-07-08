const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    teacher_id: { type: Schema.Types.ObjectId },
    remove_user_id: { type: Array},

    school_id: { type: Schema.Types.ObjectId },
    subject_id: { type: Schema.Types.ObjectId },
    startTime: { type:Date },
    endTime: { type:Date },
    startDate: { type:Date },
    endDate: { type:Date },
    all_dates: { type: Array},
    days: { type: Array},
    stream_id: { type: Schema.Types.ObjectId },
    year: { type: String },
    class: { type: String },
    class_location: { type: String },




}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});


schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('time_tables', schema);


 