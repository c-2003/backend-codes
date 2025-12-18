import {Router} from 'express'
import { addLectureToCourseById, createCourse, getAllCourses, getLecturesByCourseId, removeCourse, removeLectureFromCourseById, updateCourse } from '../controllers/course-controller.js';
import {isLoggedIn,  authorizedRoles } from '../middlewares/auth_middle.js';
import upload from '../middlewares/Multer-middle.js';

const router = Router();

router.get('/',getAllCourses);
router.post('/',isLoggedIn, authorizedRoles('ADMIN'),
    upload.single("thumbnail"),createCourse);
router.delete('/',isLoggedIn, authorizedRoles('ADMIN'),removeLectureFromCourseById)

router.get('/:id',isLoggedIn, authorizedRoles('ADMIN'),getLecturesByCourseId);
router.put('/:id',isLoggedIn, authorizedRoles('ADMIN'),updateCourse)
router.delete('/:id',isLoggedIn, authorizedRoles('ADMIN'),removeCourse)
router.post('/:id',isLoggedIn, authorizedRoles('ADMIN'),upload.single("lecture"),addLectureToCourseById);

export  default router
