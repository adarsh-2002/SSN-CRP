import { Router } from 'express';
const router = Router();
import { getAllStudents, createNewStudent, updateStudent, deleteStudent, getStudent } from '../../controllers/studentsController.js';
import ROLES from '../../config/roles.js';
import verifyRoles from '../../middleware/verifyRoles.js';

router.route('/')
    .get(getAllStudents)
    .post(createNewStudent)
    .put(verifyRoles(ROLES.Admin), updateStudent)
    .delete(verifyRoles(ROLES.Admin), deleteStudent);

router.route('/search')
    .get(getStudent);

export default router; 