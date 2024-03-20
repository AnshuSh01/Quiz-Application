const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    QuizName: {
      type: String,
      required: true,
    },
    Question: {
      type: String,
      required: true,
    },
    Option1: {
      type: String,
      required: true,
    },

    Option2: {
      type: String,
      required: true,
    },
    Option3: {
      type: String,
      required: true,
    },

    Option4: {
      type: String,
      required: true,
    },

    Answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const QuestionModel = mongoose.model("Quiz-Questions", questionSchema);

module.exports = QuestionModel;
