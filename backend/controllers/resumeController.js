import Resume from "../models/Resume.js";

/*
====================================================
@desc    Create Resume
@route   POST /api/resumes
@access  Private
====================================================
*/

const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      ...req.body,
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Resume created successfully.",
      resume,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
====================================================
@desc    Get All Resumes of Logged-in User
@route   GET /api/resumes
@access  Private
====================================================
*/

const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user._id,
    }).sort({
      updatedAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
====================================================
@desc    Get Resume By ID
@route   GET /api/resumes/:id
@access  Private
====================================================
*/

const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    return res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
====================================================
@desc    Update Resume
@route   PUT /api/resumes/:id
@access  Private
====================================================
*/

const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Resume updated successfully.",
      resume: updatedResume,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
====================================================
@desc    Delete Resume
@route   DELETE /api/resumes/:id
@access  Private
====================================================
*/

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    await resume.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume,
};