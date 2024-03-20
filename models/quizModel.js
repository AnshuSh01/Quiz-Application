const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    QuizName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const QuizModel = mongoose.model("Quiz-Names", quizSchema);

module.exports = QuizModel;
