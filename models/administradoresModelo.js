const{Schema,model}=require('mongoose')


const AdminSchema=new Schema({

    usuario:{
        type:String,
        require:true,
        
        
    },
    pass:{
        type:String,
        require:true
    },
    mail:{
        
        type:String,
        require:true,
        unique:true
        
    }

    
})



module.exports=model("Admin",AdminSchema)