require("dns").setServers(["8.8.8.8"]) 
const { default: mongoose } = require("mongoose")

async function connectDB() {
    try{
   await  mongoose.connect(process.env.MONGOOSE_URI)
   console.log("connected to Database")
   }catch(err){
   console.error('Error connecting to MongoDB:',err)}
}

module.exports= connectDB