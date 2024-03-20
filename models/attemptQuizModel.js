const mongoose = require("mongoose");

const AttemptQuizSchema = new mongoose.Schema(
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

const AttemptQuizModel = mongoose.model("Attempt-Quizes", AttemptQuizSchema);

module.exports = AttemptQuizModel;
