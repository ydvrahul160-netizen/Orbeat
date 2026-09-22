const  mongoose = require('mongoose');



const musicSchema = new mongoose.Schema({
    uri:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    coverImage:{
        type: String,
    },
    artist:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true,
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    comments:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        text:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    }],
    playCount:{
        type:Number,
        default:0
    }

}, { timestamps:true })

musicSchema.index({ title: "text" });
musicSchema.index({ artist: 1, createdAt: -1 });


const musicModel = mongoose.model("music", musicSchema);

module.exports = musicModel;
