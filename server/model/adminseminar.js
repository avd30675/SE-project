var mongoose = require('mongoose');

var Schema1  = mongoose.Schema;

var bookingsschema= new Schema1(
    {
    user_name:String,
    start:Date,
    end:Date
    },
    {
        timestamps:true
    }
);

var view = new Schema1({
    hall:{
        type:Number,
        required:true,
        unique:true
    },
    capacity:{
        type:Number,
        required:true
    },
    bookings:[bookingsschema]   

    
});

const seminar = mongoose.model('seminar',view) ;
const seminarbooking= mongoose.model('seminarbooking',bookingsschema);

module.exports={seminar,seminarbooking}