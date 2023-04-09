const {Schema,model } = require("mongoose");

const mongoosePaginate=require('mongoose-paginate-v2')

const ArticuloSchema=new Schema({
    title: {
        type:String,
        required:true,
    },
    extracto:{
        type:String,
        required:true,
    },
    descripcion:{
        type:String,
        required:true,
     },
     image:{
        type:String,
        
    }

})


ArticuloSchema.plugin(mongoosePaginate)

module.exports=model("articulos",ArticuloSchema)