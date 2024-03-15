import { Schema, mongoose } from "mongoose";

const postSchema = new Schema({

    title: {
        type: String,
        required: true,
    },
    image: {
        type: String, // sdk url for image
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
    

},{timestamps: true})

export const Post = mongoose.model("Post", postSchema)