import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({

    Message: {
        type: String,

    },
    File: {
        type: String,

    },
})

const user = mongoose.model("user", userSchema)

export default user;