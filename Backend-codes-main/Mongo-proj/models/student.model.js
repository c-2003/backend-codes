const mongoose =  require ( 'mongoose' );


// schema
const studentSchema = new mongoose.Schema({
    name: String,
    age:Number,
});


// go head  and create the model using the schema
module.exports = mongoose.model('Student', studentSchema);