// TODO: MODIFY FUNCTIONS FOR OUR LOGIC
import Student from '../model/Student.js';
import express from 'express';
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
            records: req.body.records
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

export const updateStudent = async (req, res) => {
    if (!req?.body?.rollNo) {
        return res.status(400).json({ 'message': 'Roll no is required.' });
    }

    const student = await Student.findOne({ rollNo: req.body.rollNo }).exec();
    if (!student) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    if (req.body?.firstname) student.firstname = req.body.firstname;
    if (req.body?.lastname) student.lastname = req.body.lastname;
    if (req.body?.rollNo) student.rollNo = req.body.rollNo;
    if (req.body?.class) student.class = req.body.class;
    if (req.body?.dept) student.dept = req.body.dept;
    if (req.body?.graduationYear) student.graduationYear = req.body.graduationYear;
    if (req.body?.semester) student.semester = req.body.semester;
    if (req.body?.records) student.records = req.body.records;
    const result = await student.save();
    res.json(result);
}

export const deleteStudent = async (req, res) => {
    if (!req?.body?.rollNo) return res.status(400).json({ 'message': 'Roll No required.' });

    const student = await Student.findOne({ rollNo: req.body.rollNo }).exec();
    if (!student) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    const result = await student.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

export const getStudent = async (req, res) => {
    if (!req?.params?.rollNo) return res.status(400).json({ 'message': 'Student roll no. required.' });

    const student = await Student.findOne({ rollNo: req.params.rollNo }).exec();
    if (!student) {
        return res.status(204).json({ "message": `No employee matches ID ${req.params.id}.` });
    }
    res.json(student);
}

export default router;