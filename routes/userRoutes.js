const express = require("express");
const {
  LoginController,
  RegisterController,
  addQuestionController,
  getAllQuizController,
  addQuizNameController,
  getQuizNameController,
  getQuizQuestionsContoller,
  getOthersQuizController,
  getAttemptQuizQuestionsContoller,
  getAttemptQuizContoller,
  addAttemptQuizContoller,
  getAttemptQuizQuestionsController,
  addAttemptQuizQuestionsController,
  getuserAttemptQuizQuestionsController,
  getuserAttempt,
} = require("../controllers/userController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddlewares");

const Router = express.Router();

Router.post("/login", LoginController);
Router.post("/register", RegisterController);
Router.post("/add-question", addQuestionController);
Router.post("/get-quizName", getQuizNameController);
Router.post("/add-quizName", addQuizNameController);
Router.post("/all-quiz", getAllQuizController);
Router.post("/get-quizQues", getQuizQuestionsContoller);
Router.post("/get-othersQuiz", getOthersQuizController);
Router.post("/get-attemptQuiz", getAttemptQuizQuestionsContoller);
Router.post("/add-attemptQuiz", addAttemptQuizContoller);
Router.post("/attemptQuiz", getAttemptQuizContoller);
Router.post("/attemptQuizQuestions", getAttemptQuizQuestionsController);
Router.post("/add-attemptQuizQuestions", addAttemptQuizQuestionsController);
Router.post("/userAttemptQuizQuestions", getuserAttemptQuizQuestionsController);
Router.post("/alreadyattempt", getuserAttempt);

Router.get("/user-auth", requireSignIn, (req, res) => {
  res.send({
    ok: true,
  });
});
Router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.send({
    ok: true,
  });
});
module.exports = Router;
