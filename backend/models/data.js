const mongoose=require("mongoose")
const DataSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    videoFile:{
         type:String,
         required:true
    }
})
const Datas=mongoose.model("Data",DataSchema)
module.exports=Datas;