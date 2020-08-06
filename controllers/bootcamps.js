const Bootcamp = require("../models/Bootcamp");

//Controller methods are middleware functions which are used to connect to a specific HTTP route and perform the desired operation as mentioned in the function itself

//@Description:-  Get all the bootcamps
//@route          GET /api/v1/bootcamps
//@access         Public
exports.getBootcamps = async (req, res, next) => {
  const bootcamp = await Bootcamp.find();
  res.status(200).json({
    success: true,
    count: bootcamp.length,
    data: bootcamp,
  });
};

//@Description:-  Get a single bootcamp
//@route          GET /api/v1/bootcamps/:id
//@access         Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      //return keyword is used to avoid headers already set error
      return res.status(400).json({ success: false });
    }
    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//@Description:-  Create a new Bootcamp
//@route          POST /api/v1/bootcamps
//@access         Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//@Description:-  Update a bootcamp
//@route          PUT /api/v1/bootcamps/:id
//@access         Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(400).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//@Description:-  Delete a bootcamp
//@route          DELETE /api/v1/bootcamps/:id
//@access         Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(200).json({ success: false });
  }
};
