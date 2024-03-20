import React, { useEffect, useState } from "react";
import "../ComponentsCSS/CreateQuiz.css";
import Layout from "../Components/Layout";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import toast from "react-hot-toast";
const array = [];

const AttemptQuiz = () => {
  const navigate = useNavigate();

  const [quizes, setQuizes] = useState([]);
  const [viewQuiz, setViewQuiz] = useState(false);
  const [viewQuizName, setViewQuizName] = useState("");
  const [QuizQuestions, setQuizQuestions] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const [quizData, setquizData] = useState([]);
  const getAllQuiz = async () => {
    const { user } = JSON.parse(localStorage.getItem("auth"));
    const { data } = await axios.post("/api/v1/auth/get-othersQuiz", {
      user_id: user.id,
    });
    setQuizes(data.AllQuiz);
  };
  const HandleViewQuiz = async (QuizName) => {
    setViewQuiz(true);
    setViewQuizName(QuizName);
    const { user } = JSON.parse(localStorage.getItem("auth"));
    const { data } = await axios.post("/api/v1/auth/get-attemptQuiz", {
      user_id: user.id,
      QuizName: QuizName,
    });

    setQuizQuestions(data.AllQuestions);
  };

  const handleOnCancel = () => {
    setViewQuiz(false);
    setShowAnswer(false);
  };
  const handleClick = (QuizQuest_id, chosenAnswer) => {
    const { user } = JSON.parse(localStorage.getItem("auth"));
    if (array.length == 0) {
      array.push({
        userId: user.id,
        questionId: QuizQuest_id,
        chosenOption: chosenAnswer,
      });
    } else {
      let checkIndex = -1;
      for (let index = 0; index < array.length; index++) {
        const QuestID = array[index].questionId;
        if (QuestID === QuizQuest_id) {
          checkIndex = index;
          break;
        }
      }
      if (checkIndex !== -1) {
        array[checkIndex] = {
          userId: user.id,
          questionId: QuizQuest_id,
          chosenOption: chosenAnswer,
        };
      } else {
        array.push({
          userId: user.id,
          questionId: QuizQuest_id,
          chosenOption: chosenAnswer,
        });
      }
    }
  };
  const handleSubmit = async (Name) => {
    const { user } = JSON.parse(localStorage.getItem("auth"));

    const AlreadyAttempt = await axios.post("/api/v1/auth/alreadyattempt", {
      user_id: user.id,
      QuizName: Name,
    });
    console.log(AlreadyAttempt.data);
    if (AlreadyAttempt.data.success) {
      toast.error("Already Attempted");
    } else {
      const { data } = await axios.post("/api/v1/auth/add-attemptQuiz", {
        user_id: user.id,
        QuizName: Name,
      });
      setquizData(array);

      const {} = await axios.post("/api/v1/auth/add-attemptQuizQuestions", {
        user_id: user.id,
        QuizName: Name,
        answers: array,
      });

      toast.success("Quiz Submitted Successfully");
      navigate("/dashboard/user");
    }
  };
  useEffect(() => {
    getAllQuiz();
    //console.log(Option1);
  }, [quizes]);
  return (
    <>
      <Layout>
        {viewQuiz ? (
          <>
            {" "}
            <Modal
              title={viewQuizName}
              open={viewQuiz}
              onCancel={handleOnCancel}
              footer={false}
            >
              {" "}
              Attempt all questions*
              {QuizQuestions?.map((quizQues, c) => (
                <div className="container mt-sm-5 my-1" key={quizQues._id}>
                  <div className="question ml-sm-5 pl-sm-5 pt-2">
                    <div className="py-2 h5">
                      <b>
                        Q - {c + 1} {quizQues.Question}
                      </b>
                    </div>
                    <div
                      className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3"
                      id="options"
                    >
                      <label className="options">
                        <div>
                          <input
                            type="radio"
                            name={`radio_${c}`}
                            onChange={() => handleClick(quizQues._id, "1")}
                            required
                          />
                          <span className="checkmark" />
                        </div>
                        Option 1 : {quizQues.Option1}{" "}
                      </label>
                      <label className="options">
                        <div>
                          <input
                            required
                            type="radio"
                            name={`radio_${c}`}
                            onChange={() => handleClick(quizQues._id, "2")}
                          />
                          <span className="checkmark" />
                        </div>
                        Option 2 : {quizQues.Option2}{" "}
                      </label>
                      <label className="options">
                        <div>
                          <input
                            required
                            type="radio"
                            name={`radio_${c}`}
                            onChange={() => handleClick(quizQues._id, "3")}
                          />
                          <span className="checkmark" />
                        </div>
                        Option 3 : {quizQues.Option3}
                      </label>
                      <label className="options">
                        <div>
                          <input
                            required
                            type="radio"
                            name={`radio_${c}`}
                            onChange={() => handleClick(quizQues._id, "4")}
                          />
                          <span className="checkmark" />
                        </div>
                        Option 4 : {quizQues.Option4}
                      </label>
                    </div>
                  </div>
                  {showAnswer ? (
                    <>
                      <div className="d-flex align-items-center pt-3">
                        <div id="prev">Answer = Option {quizQues.Answer}</div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
              <div className="d-flex justify-content-end ">
                <button
                  onClick={() => handleSubmit(viewQuizName)}
                  type="submit"
                  className="btn btn-primary"
                >
                  SUBMIT QUIZ
                </button>
              </div>
            </Modal>
          </>
        ) : (
          <>
            <div className="container">
              <div className="container" style={{ marginBottom: "80px" }}>
                {quizes?.map((quiz, c) => (
                  <div key={quiz._id} className="container">
                    {" "}
                    <h5>
                      {c + 1} - {quiz.QuizName}
                    </h5>
                    <button
                      onClick={() => HandleViewQuiz(quiz.QuizName)}
                      style={{
                        marginRight: "10px",
                        borderRadius: "10px",
                        borderColor: "blue",
                        padding: "14px",
                      }}
                    >
                      Attempt Quiz
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default AttemptQuiz;
