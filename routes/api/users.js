import { Router } from 'express';
const router = Router();
import { getAllUsers, deleteUser, getUser } from '../../controllers/usersController.js';
import ROLES from '../../config/roles.js';
import verifyRoles from '../../middleware/verifyRoles.js';

router.route('/')
    .get(verifyRoles(ROLES.Admin), getAllUsers)
    .delete(verifyRoles(ROLES.Admin), deleteUser);

router.route('/:id')
    .get(verifyRoles(ROLES.Admin), getUser);

export default router;