import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
let TotalQuestions = 0;
let UserScore = 0;
const ScoreDashboard = () => {
  const [allQuiz, setAllQuiz] = useState([]);
  const [viewScore, setviewScore] = useState(false);
  const getAllAttemptQuiz = async () => {
    const { user } = JSON.parse(localStorage.getItem("auth"));
    const { data } = await axios.post("/api/v1/auth/attemptQuiz", {
      user_id: user.id,
    });
    setAllQuiz(data.AllQuizes);
  };
  const handleScore = async (QuizName) => {
    const map1 = new Map();
    const { user } = JSON.parse(localStorage.getItem("auth"));
    const getQuizQuestions = async () => {
      const { data } = await axios.post("/api/v1/auth/attemptQuizQuestions", {
        QuizName: QuizName,
      });

      TotalQuestions = data.AllQuiz.length;

      for (let i = 0; i < data.AllQuiz.length; i++) {
        map1.set(data.AllQuiz[i]._id, data.AllQuiz[i].Answer);
      }
    };
    getQuizQuestions();
    const data2 = await axios.post("/api/v1/auth/userAttemptQuizQuestions", {
      user_id: user.id,
      QuizName: QuizName,
    });

    for (let i = 0; i < data2.data.AllQuiz.length; i++) {
      if (
        map1.get(data2.data.AllQuiz[i].answers[0].questionId) ===
        data2.data.AllQuiz[i].answers[0].chosenOption
      ) {
        UserScore++;
      }
    }

    setviewScore(true);
  };
  useEffect(() => {
    getAllAttemptQuiz();
  }, []);
  return (
    <Layout>
      <div className="container">
        <h3>Your Quiz Attempts</h3>

        {allQuiz?.map((quiz, c) => (
          <div key={quiz._id} className="container">
            <h5>
              {c + 1} - {quiz.QuizName}
            </h5>
            {viewScore ? (
              <>
                <h4>Your Score :</h4>
                <div className=" ">
                  {" "}
                  <h5>Correct Answers : {UserScore}</h5>
                  <h5>Total Questions : {TotalQuestions}</h5>
                  <h5>Accuracy : {(UserScore / TotalQuestions) * 100}%</h5>
                </div>
              </>
            ) : (
              <>
                {" "}
                <button
                  style={{
                    marginRight: "10px",
                    borderRadius: "10px",
                    borderColor: "blue",
                    padding: "10px",
                  }}
                  onClick={() => handleScore(quiz.QuizName)}
                >
                  View Score
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ScoreDashboard;
