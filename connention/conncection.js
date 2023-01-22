const mongoose = require('mongoose')

const server = async()=>{
   mongoose.set('strictQuery', false);
   await mongoose.connect('mongodb://Rohit:rohit@ac-pm5bttv-shard-00-00.vrcqw6n.mongodb.net:27017,ac-pm5bttv-shard-00-01.vrcqw6n.mongodb.net:27017,ac-pm5bttv-shard-00-02.vrcqw6n.mongodb.net:27017/?ssl=true&replicaSet=atlas-pd64sh-shard-0&authSource=admin&retryWrites=true&w=majority',(e)=>{

      if(e){
        console.log(e);
      }else{
        console.log("connected to mongodb");
      }
   })
}

module.exports = server