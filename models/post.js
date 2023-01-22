const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId ;
//--------------for date ---------------


//------------------------------------------
const postSchema = new Schema({

    name : {type :String , required : true},
    location : {type :String , required : true},
    likes : {type :Number ,default : 0},
    description :{type :String , required : true},
    postimage : {type : String , required : true},
    // date : {type: Date, }
 
},{timestamps:true})

const postModel = mongoose.model('userposts',postSchema);

module.exports = postModel ;

//https://github.com/SAMUDRALAARAVIND/node_insta_clone