import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      default: "",
      trim: true,
    },
    degree: {
      type: String,
      default: "",
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      default: "",
      trim: true,
    },
    startDate: {
      type: String,
      default: "",
    },
    endDate: {
      type: String,
      default: "",
    },
    grade: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      default: "",
      trim: true,
    },
    position: {
      type: String,
      default: "",
      trim: true,
    },
    location: {
      type: String,
      default: "",
      trim: true,
    },
    startDate: {
      type: String,
      default: "",
    },
    endDate: {
      type: String,
      default: "",
    },
    currentlyWorking: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    technologies: [
      {
        type: String,
      },
    ],
    githubLink: {
      type: String,
      default: "",
    },
    liveLink: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const certificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    organization: {
      type: String,
      default: "",
    },
    issueDate: {
      type: String,
      default: "",
    },
    credentialLink: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    template: {
      type: String,
      enum: ["classic", "modern", "professional", "minimal"],
      default: "modern",
    },

    personalInfo: {
      fullName: {
        type: String,
        default: "",
      },
      email: {
        type: String,
        default: "",
      },
      phone: {
        type: String,
        default: "",
      },
      address: {
        type: String,
        default: "",
      },
      linkedin: {
        type: String,
        default: "",
      },
      github: {
        type: String,
        default: "",
      },
      portfolio: {
        type: String,
        default: "",
      },
    },

    objective: {
      type: String,
      default: "",
    },

    skills: [
      {
        type: String,
      },
    ],

    education: [educationSchema],

    experience: [experienceSchema],

    projects: [projectSchema],

    certifications: [certificationSchema],

    languages: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;