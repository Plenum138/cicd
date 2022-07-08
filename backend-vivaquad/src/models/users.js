const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    mobile_number: {
        type: String,
        unique: true,

    },
    meal: {
        type: Number,
        default: 0

    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String
    }, // 'USER'  'ADMIN'
    otp: {
        type: String,
        default: null
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    user_status: {
        type: Boolean,
        default: false
    },
    isAccountVerified: {
        type: Boolean,
        default: true
    },
    avatar: {
        type: String,
        default: null
    },
    id_card: {
        type: Array,                                   
        default: []
       
    },
    dob: {
        type: String
    },
    firebase_token: {
        type: String,
        default: null
    },
    last_login_time: {
        type: Date,
        default: null
    }, // for login history
    no_of_loggedin: {
        type: Number,
        default: 0
    },
    school_id: { type: Schema.Types.ObjectId, default: null },
    hall_id: { type: Schema.Types.ObjectId, default: null },
    employee_type: {
        type: Schema.Types.ObjectId, default: null
    },
    section: {
        type: String
    },
    isNotification: {
        type: Boolean,
        default: true

    },
    stream_id: {
        type: Schema.Types.ObjectId, default: null
    },
    year: {
        type: String, default: ''
    },
    class_name: {
        type: String, default: ''
    },
    payment_status: { type: Boolean, default: false},
},
{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('users', schema);