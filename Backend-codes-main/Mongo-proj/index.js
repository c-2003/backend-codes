const mongoose = require ( 'mongoose' );
const studentModel = require("./models/student.model")
// write the code to connect with Mongodb //
mongoose.connect('mongodb://localhost/test')

const db = mongoose.connection; // start connection with  database 

db.once ('error', ()=>{
    console.log( 'Error connecting to MongoDB')});

db.once ('open', () => {
    console.log("Connected to MongoDB")
    init()
} )

    async function  init(){
    // logic to insert data in the db 
    const student ={
        name :"max",
        age: 35,
    }
    const std_obj = await studentModel.create(student);
    console.log(std_obj);
}
