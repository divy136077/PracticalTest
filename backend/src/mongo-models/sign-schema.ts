import mongoose, {Schema } from "mongoose";

const SignupSchema = new Schema({

    FirstName:{
        type: String,
       
    },
    LastName:{
        type:String,
        
    },
    Email:{
        type:String,
        required:true,
        unique:true
        
    },
    Password:{
        type:String,
        required:true
    },
    ConformPassword:{
        type:String,
        required:true
    },

})

const signUp = mongoose.model( "signUp" , SignupSchema )

export default signUp ;