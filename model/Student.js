import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    dept: {
        type: String,
        required: true
    },
    graduationYear: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    records: {
        grades: [{
            subject: String,
            marks: Number
        }]
    }
});


const Student  = mongoose.model('Student', studentSchema);

export default Student;