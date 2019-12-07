// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public

exports.getBootcamps = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: 'Show all bootcamps',
    hello: req.hello,
  });
};

// @desc    Get single bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public

exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    data: {
      success: true,
      msg: `Got bootcamp with id ${req.params.id}`,
    },
  });
};

// @desc    Create single bootcamps
// @route   POST /api/v1/bootcamps
// @access  Public

exports.createBootcamp = (req, res, next) => {
  res.status(200).json({
    data: {
      success: true,
      msg: 'Created a new bootcamp',
    },
  });
};

// @desc    Update single bootcamps
// @route   PUT /api/v1/bootcamps/:id
// @access  Private

exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    data: {
      success: true,
      msg: `Updated bootcamp ${req.params.id}`,
    },
  });
};

// @desc    Delete single bootcamps
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private

exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    data: {
      success: true,
      msg: `Deleted bootcamp ${req.params.id}`,
    },
  });
};
