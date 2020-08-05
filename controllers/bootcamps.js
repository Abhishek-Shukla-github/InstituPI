//Controller methods are middleware functions which are used to connect to a specific HTTP route and perform the desired operation as mentioned in the function itself

//@Description:-  Get all the bootcamps
//@route          GET /api/v1/bootcamps
//@access         Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, data: { msg: "Show all bootcamps" } });
};

//@Description:-  Get a single bootcamp
//@route          GET /api/v1/bootcamps/:id
//@access         Public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, data: { msg: "Show a single bootcamp" } });
};

//@Description:-  Create a new Bootcamp
//@route          POST /api/v1/bootcamps
//@access         Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, data: { msg: "Add a new bootcamp" } });
};

//@Description:-  Update a bootcamp
//@route          PUT /api/v1/bootcamps/:id
//@access         Private
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: { msg: `Edit a bootcamp:- ${req.params.id}` },
  });
};

//@Description:-  Delete a bootcamp
//@route          DELETE /api/v1/bootcamps/:id
//@access         Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: { msg: `Delete a bootcamp:- ${req.params.id}` },
  });
};
