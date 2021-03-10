const express = require('express');
const { protect } = require('../middleware/auth');
const { getCourses, getCourse, addCourse, deleteCourse, updateCourse } = require('../controllers/courses');

const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses).post(protect, addCourse);
router.route('/:id').get(getCourse).delete(protect, deleteCourse).put(protect, updateCourse);

module.exports = router;