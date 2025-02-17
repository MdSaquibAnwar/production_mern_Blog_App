const mongoose = require('mongoose')
const connectdb = async  () => {
 try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`connect to mongodb database ${mongoose.connection.host}`.bgMagenta.white)
 }
 catch(error){
    console.log(`mongo connected error ${error}`.bgRed.white);
 }
}
module.exports = connectdb;