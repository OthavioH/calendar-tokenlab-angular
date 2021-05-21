const {Schema,model} = require('mongoose');
const Users = require('./Users');

const EventSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    startDate:{
        type:String,
        required:true,
    },
    endDate:{
        type: String,
        required: true,
    },
    startTime:{
        type:String,
        required:true,
    },
    endTime:{
        type:String,
        required:true,
    },
    author: {
        type: String,
        required: true,
    },
    participants: {
        type: Array,
        required: true,
    }
},{
    timestamps:true
});

module.exports = model('Event',EventSchema);