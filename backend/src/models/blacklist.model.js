const mongoose = require('mongoose')

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true, "token is required for blacklisting"],

    }
    },
    {
        timestamps:true
    })

    const tokenblacklistModel= mongoose.model("tokenblacklisting",blacklistTokenSchema)
    module.exports= tokenblacklistModel