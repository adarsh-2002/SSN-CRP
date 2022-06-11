// TODO: MODIFY FUNCTIONS FOR OUR LOGIC
import Student from '../model/Student.js';
import express, { query } from 'express';
import { Router } from 'express';
const router = express.Router();

export const getAllStudents = async (req, res) => {
    const students = await Student.find();
    if (!students) return res.status(204).json({ 'message': 'No students found.' });
    res.json(students);
}

export const createNewStudent = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname || !req?.body?.rollNo) {
        return res.status(400).json({ 'message': 'Firstname, lastname and roll number are required fields!' });
    }
    try {
        console.log(req.body)
        const result = await Student.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            rollNo: req.body.rollNo,
            class: req.body.class,
            dept: req.body.dept,
            graduationYear: req.body.graduationYear,
            semester: req.body.semester,
            subject: req.body.subject,
            marks: req.body.marks
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

export const updateStudent = async (req, res) => {
    // if (!req?.body?.rollNo) {
    //     return res.status(400).json({ 'message': 'Roll no is required.' });
    // }
    const query = {}
    console.log(req.body)
    if(req.body.rollNo != '' && req.body.rollNo != null) query["rollNo"] = req.body.rollNo;
    if(req.body.firstname != '' && req.body.firstname != null) query["firstname"] = req.body.firstname;
    if(req.body.lastname != '' && req.body.lastname != null) query["lastname"] = req.body.lastname;
    if(req.body.dept != '' && req.body.dept != null) query["dept"] = req.body.dept;
    if(req.body.semester != '' && req.body.semester != null) query["semester"] = req.body.semester;
    if(req.body.subject != '' && req.body.subject != null) query["subject"] = req.body.subject;
    console.log(query)
    const result = await Student.updateMany(query, { $set: { marks: req.body.marks } }).exec();
    res.json(result);
}

export const deleteStudent = async (req, res) => {
    const query = {}
    console.log(req.query)
    if(req.body.rollNo != '' && req.body.rollNo != null) query["rollNo"] = req.body.rollNo;
    if(req.body.firstname != '' && req.body.firstname != null) query["firstname"] = req.body.firstname;
    if(req.body.lastname != '' && req.body.lastname != null) query["lastname"] = req.body.lastname;
    if(req.body.dept != '' && req.body.dept != null) query["dept"] = req.body.dept;
    if(req.body.semester != '' && req.body.semester != null) query["semester"] = req.body.semester;
    if(req.body.subject != '' && req.body.subject != null) query["subject"] = req.body.subject;
    console.log(query)
    const result = await Student.deleteMany(query).exec();
    res.json(result);
}

export const getStudent = async (req, res) => {
    const query = {}
    if(req.query.rollNo != '' && req.query.rollNo != null) query["rollNo"] = req.query.rollNo;
    if(req.query.firstname != '' && req.query.firstname != null) query["firstname"] = req.query.firstname;
    if(req.query.lastname != '' && req.query.lastname != null) query["lastname"] = req.query.lastname;
    if(req.query.dept != '' && req.query.dept != null) query["dept"] = req.query.dept;
    if(req.query.semester != '' && req.query.semester != null) query["semester"] = req.query.semester;
    if(req.query.subject != '' && req.query.subject != null) query["subject"] = req.query.subject;
    if(req.query.class != '' && req.query.class != null) query["class"] = req.query.class;
    console.log(query)
    const student = await Student.find(query).exec();
    if (!student) {
        return res.status(204).json({ "message": `No student matches ID ${req.params.rollNo}.` });
    }
    res.json(student);
}

export default router;