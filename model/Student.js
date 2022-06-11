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
    rollNo: {
        type: Number,
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
    subject: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
});


const Student  = mongoose.model('Student', studentSchema);

export default Student;