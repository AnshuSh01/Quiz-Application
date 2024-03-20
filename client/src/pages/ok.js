import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { Modal } from "antd";

const AttemptQuiz = () => {
  const [AllQuizes, setAllQuizes] = useState([]);
  const [QuizQuestions, setQuizQuestions] = useState([]);
  const [AttemptQuiz, setAttemptQuiz] = useState(false);
  const [showResult, setshowResult] = useState(false);
  const [QuizName, setQuizName] = useState("");
  const handleOthersQuiz = async () => {
    const { user } = JSON.parse(localStorage.getItem("auth"));
    const { data } = await axios.post("/api/v1/auth/get-othersQuiz", {
      user_id: user.id,
    });
    setAllQuizes(data.AllQuiz);
    console.log(data.AllQuiz);
  };
  const HandleViewQuiz = async (Name) => {
    setAttemptQuiz(true);
    setQuizName(Name);
    const { user } = JSON.parse(localStorage.getItem("auth"));
    const { data } = await axios.post("/api/v1/auth/get-attemptQuiz", {
      user_id: user.id,
      QuizName: QuizName,
    });

    setQuizQuestions(data.AllQuestions);
  };
  const handleOnCancel = () => {
    setAttemptQuiz(false);
  };
  useEffect(() => {
    handleOthersQuiz();
  }, []);
  return (
    <Layout>
      {" "}
      {AttemptQuiz ? (
        <>
          {" "}
          <Modal
            title={QuizName}
            open={AttemptQuiz}
            onCancel={handleOnCancel}
            footer={false}
          >
            {" "}
            {QuizQuestions?.map((quizQues, c) => (
              <div classname="container mt-sm-5 my-1" key={quizQues._id}>
                <div classname="question ml-sm-5 pl-sm-5 pt-2">
                  <div classname="py-2 h5">
                    <b>
                      {" "}
                      Q - {c + 1} {quizQues.Question}
                    </b>
                  </div>
                  <div
                    classname="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3"
                    id="options"
                  >
                    <label classname="options">
                      Option 1 : {quizQues.Option1}
                      <input type="radio" name="radio" />
                      <span classname="checkmark"></span>
                    </label>
                    <label classname="options">
                      Option 2 : {quizQues.Option2}
                      <input type="radio" name="radio" />
                      <span classname="checkmark"></span>
                    </label>
                    <label classname="options">
                      Option 3 : {quizQues.Option3}
                      <input type="radio" name="radio" />
                      <span classname="checkmark"></span>
                    </label>
                    <label classname="options">
                      Option 4 : {quizQues.Option4}
                      <input type="radio" name="radio" />
                      <span classname="checkmark"></span>
                    </label>
                  </div>
                </div>
                {showResult ? (
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
          </Modal>
        </>
      ) : (
        <>
          {" "}
          <div className="container" style={{ marginBottom: "80px" }}>
            {AllQuizes?.map((quiz, c) => (
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
                    padding: "5px",
                  }}
                >
                  Attempt Quiz
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
};

export default AttemptQuiz;
