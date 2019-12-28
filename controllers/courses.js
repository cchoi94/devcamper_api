const Course = require('../models/Course');
const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');

// @desc    Get courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public

exports.getCourses = async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description',
    });
  }

  try {
    const courses = await query;

    res.status(200).json({
      sucess: true,
      count: courses.length,
      data: courses,
    });
  } catch (err) {
    next(err);
  }
};
// @desc    Get a single courses
// @route   GET /api/v1/courses/:id
// @access  Public

exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate({
      path: 'bootcamp',
      select: 'name description',
    });

    if (!course) {
      return next(
        new ErrorResponse(`No course with the id of ${req.params.id}`),
        404
      );
    }

    res.status(200).json({
      sucess: true,
      data: course,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add course
// @route   POST /api/v1/bootcamps/:bootcampId/courses/
// @access  Private

exports.addCourse = async (req, res, next) => {
  try {
    req.body.bootcamp = req.params.bootcampId;

    const bootcamp = await Bootcamp.findById(req.body.bootcamp);

    if (!bootcamp) {
      return next(
        new ErrorResponse(`No course with the id of ${req.params.bootcampId}`),
        404
      );
    }

    const course = await Course.create(req.body);

    res.status(200).json({
      sucess: true,
      data: course,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update course
// @route   PUT /api/v1/courses/:id
// @access  Private

exports.updateCourse = async (req, res, next) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return next(
        new ErrorResponse(`No course with the id of ${req.params.id}`),
        404
      );
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      sucess: true,
      data: course,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete course
// @route   DELETE /api/v1/courses/:id
// @access  Private

exports.deleteCourse = async (req, res, next) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return next(
        new ErrorResponse(`No course with the id of ${req.params.id}`),
        404
      );
    }

    await course.remove();

    res.status(200).json({
      sucess: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
