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
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required' });
    }

    try {
        const result = await Student.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

export const updateStudent = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const student = await Student.findOne({ _id: req.body.id }).exec();
    if (!student) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    if (req.body?.firstname) student.firstname = req.body.firstname;
    if (req.body?.lastname) student.lastname = req.body.lastname;
    const result = await student.save();
    res.json(result);
}

export const deleteStudent = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Employee ID required.' });

    const student = await Student.findOne({ _id: req.body.id }).exec();
    if (!student) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    const result = await student.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

export const getStudent = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Employee ID required.' });

    const student = await Student.findOne({ _id: req.params.id }).exec();
    if (!student) {
        return res.status(204).json({ "message": `No employee matches ID ${req.params.id}.` });
    }
    res.json(student);
}

export default router;