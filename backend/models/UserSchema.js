const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true]
    },
   email:
    {
        type: String,
        required: [true]

    },
    password:
    {
        type: String,
        required: [true]
    },
    mobile:
    {
        type: String,
        required: [true]
    },
    age:
    {
        type: Number,
        required: [true]
    },
    gender:
    {
        type: String,
        required: [true]

    },
    shift:
    {   
        type: String,
        default:"0"
    },
    createdAt:
    {
        type: Date,
        default: Date.now
    },
    updatedAt:
    {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);