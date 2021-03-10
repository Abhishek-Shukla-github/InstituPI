const express = require("express");
// Include other resource routers
const courseRouter = require('./courses');

//Object Destructuring and obtaining the controller functions here from bootcamps methods
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require("../controllers/bootcamps");

const router = express.Router();
const { protect } = require('../middleware/auth');
// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router.route('/:id/photo').put(protect, bootcampPhotoUpload);
//Associating controller methods with the appropriate routes
router.route("/").get(getBootcamps).post(protect, createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(protect, deleteBootcamp);

module.exports = router;
