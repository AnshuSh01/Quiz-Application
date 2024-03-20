const mongoose = require("mongoose");

const AttemptQuesSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    QuizName: {
      type: String,
      required: true,
    },
    answers: [
      {
        userId: String,
        questionId: String,
        chosenOption: String,
      },
    ],
  },
  { timestamps: true }
);

const UserAttemptQuesModel = mongoose.model("Attempt-Quest", AttemptQuesSchema);

module.exports = UserAttemptQuesModel;
