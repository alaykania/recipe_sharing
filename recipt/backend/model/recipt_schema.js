const mongoose=require('mongoose');

const formschema=new mongoose.Schema(
    {
        
       
       
        
        ingredients:{type:String,required:true},
        steps:{type:String,required:true},
        imagePath:{type:String},
        name:{type:String,required:true}
       
    }
);

const Form =mongoose.model("Form",formschema);

 module.exports=Form;