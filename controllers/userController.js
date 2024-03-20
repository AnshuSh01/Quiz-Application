const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/helper");
const userModel = require("../models/userModel");
const QuestionModel = require("../models/questionModel");
const QuizModel = require("../models/quizModel");
const AttemptQuizModel = require("../models/attemptQuizModel");
const UserAttemptQuesModel = require("../models/userAttemptQuestionsModel");

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        msg: "Something went wrong",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(500).send({
        success: false,
        msg: "Unregistered user",
      });
    }
    const valid_user = await comparePassword(password, user.password);
    if (!valid_user) {
      return res.status(500).send({
        success: false,
        msg: "Invalid credentials",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      success: true,
      msg: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        id: user._id,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "error while login  ",
    });
  }
};

const RegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(500).send({
        success: false,
        msg: "Something went wrong",
      });
    }
    const HashPass = await hashPassword(password);
    const newuser = await new userModel({ name, email, password: HashPass });
    await newuser.save();

    return res.status(200).send({
      success: true,
      msg: "Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "error while Register  ",
    });
  }
};

const addQuestionController = async (req, res) => {
  try {
    const {
      QuizName,
      user_id,
      Question,
      Answer,
      Option1,
      Option2,
      Option3,
      Option4,
    } = req.body;
    const ques_data = await new QuestionModel({
      QuizName,
      user_id,
      Question,
      Answer,
      Option1,
      Option2,
      Option3,
      Option4,
    });
    await ques_data.save();

    return res.status(200).send({
      success: true,
      msg: "Question added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "error while adding Question",
    });
  }
};
const addQuizNameController = async (req, res) => {
  try {
    const { QuizName, user_id } = req.body;
    const quiz = await new QuizModel({ QuizName, user_id });
    await quiz.save();
    res.status(200).send({
      success: true,
      msg: "Question added successfully",
      quiz,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "error while adding Question",
    });
  }
};
const getQuizNameController = async (req, res) => {
  try {
    const { QuizName } = req.body;
    const quiz = await QuizModel.findOne({ QuizName: QuizName });

    if (quiz) {
      res.status(200).send({
        success: true,
      });
    } else {
      res.status(200).send({
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "error while adding Question",
    });
  }
};

const getAllQuizController = async (req, res) => {
  try {
    const { id } = req.body;

    const quizzes = await QuizModel.find({ user_id: id });

    return res.status(200).send({
      success: true,
      msg: "Get all quiz successfully",
      quizzes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "error while getting all Quiz  ",
    });
  }
};
const getQuizQuestionsContoller = async (req, res) => {
  try {
    const { user_id, QuizName } = req.body;

    const AllQuestions = await QuestionModel.find({
      user_id: user_id,
      QuizName: QuizName,
    });
    console.log(AllQuestions);
    return res.status(200).send({
      success: true,
      msg: "Get all quiz Quest successfully",
      AllQuestions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "error while getting all Quiz Question",
    });
  }
};

const getAttemptQuizQuestionsContoller = async (req, res) => {
  try {
    const { user_id, QuizName } = req.body;
    const AllQuestions = await QuestionModel.find({
      user_id: { $ne: user_id },
      QuizName: QuizName,
    });

    return res.status(200).send({
      success: true,
      msg: "Get all quiz Quest successfully",
      AllQuestions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "error while getting all Quiz Question",
    });
  }
};
const getOthersQuizController = async (req, res) => {
  try {
    const { user_id } = req.body;
    const AllQuiz = await QuizModel.find({ user_id: { $ne: user_id } });

    return res.status(200).send({
      success: true,
      msg: "Get all quiz Quest successfully",
      AllQuiz,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "error while getting getOthersQuizController  ",
    });
  }
};
const getAttemptQuizContoller = async (req, res) => {
  try {
    const { user_id } = req.body;
    const AllQuizes = await AttemptQuizModel.find({
      user_id: user_id,
    });

    return res.status(200).send({
      success: true,
      msg: "Get all quiz  successfully",
      AllQuizes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "error while getting all attempt Quiz ",
    });
  }
};
const addAttemptQuizContoller = async (req, res) => {
  try {
    const { user_id, QuizName } = req.body;
    const AllQuizes = await new AttemptQuizModel({
      user_id: user_id,
      QuizName: QuizName,
    });
    await AllQuizes.save();
    return res.status(200).send({
      success: true,
      msg: "add attempt quiz successfully",
      AllQuizes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "error while add all attempt Quiz ",
    });
  }
};
const getAttemptQuizQuestionsController = async (req, res) => {
  try {
    const { QuizName } = req.body;
    const AllQuiz = await QuestionModel.find({ QuizName });

    return res.status(200).send({
      success: true,
      msg: "Get all quiz Quest successfully",
      AllQuiz,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "error while getting getAttempQuizQuestionsController  ",
    });
  }
};
const addAttemptQuizQuestionsController = async (req, res) => {
  try {
    const { QuizName, user_id, answers } = req.body;
    const AllQues = await new UserAttemptQuesModel({
      QuizName,
      user_id,
      answers,
    });
    await AllQues.save();
    return res.status(200).send({
      success: true,
      msg: "add all quiz Quest successfully",
      AllQues,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "error while getting addAttemptQuizQuestionsController  ",
    });
  }
};

const getuserAttemptQuizQuestionsController = async (req, res) => {
  try {
    const { user_id, QuizName } = req.body;
    const AllQuiz = await UserAttemptQuesModel.find({
      user_id: user_id,
      QuizName: QuizName,
    });
    console.log(AllQuiz);
    return res.status(200).send({
      success: true,
      msg: "Successful get userattmptquizQuest",
      AllQuiz,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "error while getting getuserAttemptQuizQuestionsController  ",
    });
  }
};

const getuserAttempt = async (req, res) => {
  try {
    const { user_id, QuizName } = req.body;
    const AllQuiz = await AttemptQuizModel.findOne({
      user_id: user_id,
      QuizName: QuizName,
    });

    if (AllQuiz) {
      return res.status(200).send({
        success: true,
      });
    } else {
      return res.status(200).send({
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "error while getting getuserAttemptQuiz Controller  ",
    });
  }
};
module.exports = {
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
};
