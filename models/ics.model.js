import mongoose from "mongoose"
import {Schema} from "mongoose"

const icsSchema = new Schema({
    villaId : {
        type : String,
        required : true,
        unique : true
    },
    icsContent:{
        type : String
    }
},{
    timestamps: true
});

module.exports = mongoose.models.ics || mongoose.model('ics', icsSchema);