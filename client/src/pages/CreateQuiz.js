import React, { useEffect, useState } from "react";
import "../ComponentsCSS/CreateQuiz.css";
import Layout from "../Components/Layout";

import { Modal, Form, Input, Select } from "antd";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const CreateQuiz = () => {
  const [showModal, setShowModal] = useState(false);
  const [QuizName, setQuizName] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [quizes, setQuizes] = useState([]);
  const [viewQuiz, setViewQuiz] = useState(false);
  const [viewQuizName, setViewQuizName] = useState("");
  const [QuizQuestions, setQuizQuestions] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const handleAddQuestion = () => {
    setShowModal(true);
  };
  const getAllQuiz = async () => {
    const { user } = JSON.parse(localStorage.getItem("auth"));
    const { data } = await axios.post("/api/v1/auth/all-quiz", {
      id: user.id,
    });

    const userQuizzes = data.quizzes;
    setQuizes(userQuizzes);
  };
  const handleSubmit = async (values) => {
    const { Answer } = values;
    const { user } = JSON.parse(localStorage.getItem("auth"));

    if (!Answer) {
      toast.error("Please add your answer for evaluation");
    } else {
      if (!QuizName) {
        toast.error("Please enter quiz name");
      } else {
        const isexistQuiz = await axios.post("/api/v1/auth/get-quizName", {
          QuizName,
        });
        console.log(isexistQuiz.data);
        if (!isexistQuiz.data.success) {
          const { data } = await axios.post("/api/v1/auth/add-quizName", {
            QuizName: QuizName,
            user_id: user.id,
          });
        }
        const { data } = await axios.post("/api/v1/auth/add-question", {
          ...values,
          user_id: user.id,
          QuizName,
        });
        setShowModal(false);
        form.resetFields();
        toast.success(data.msg);
      }
    }
  };
  const HandleViewQuiz = async (QuizName) => {
    setViewQuiz(true);
    setViewQuizName(QuizName);
    const { user } = JSON.parse(localStorage.getItem("auth"));
    const { data } = await axios.post("/api/v1/auth/get-quizQues", {
      user_id: user.id,
      QuizName: QuizName,
    });
    setQuizQuestions(data.AllQuestions);
  };
  const handleViewAnswer = () => {
    setShowAnswer(true);
  };
  const handleOnCancel = () => {
    setViewQuiz(false);
    setShowAnswer(false);
  };
  useEffect(() => {
    getAllQuiz();
  }, [quizes]);
  return (
    <>
      <Layout>
        {viewQuiz ? (
          <>
            {" "}
            <div className="container">
              <h2>CreateQuiz</h2>
              <div className="container">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Enter Quiz Name:
                </label>
                <input
                  style={{ marginLeft: "4px", marginTop: "10px" }}
                  type="text"
                  id=""
                  aria-describedby="emailHelp"
                  value={QuizName}
                  onChange={(e) => setQuizName(e.target.value)}
                  required
                />
              </div>

              <button
                className="container"
                style={{
                  borderRadius: 10,
                  backgroundColor: "blue",
                  color: "white",
                }}
                onClick={handleAddQuestion}
              >
                Add Question
              </button>
              <div className="container">
                <h3>Your Quizzes</h3>
              </div>
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
                      }}
                    >
                      View Quiz
                    </button>
                    <button
                      style={{ borderRadius: "10px", borderColor: "blue" }}
                    >
                      Delete Quiz
                    </button>
                  </div>
                ))}
              </div>
              <Modal
                title={viewQuizName}
                open={viewQuiz}
                onCancel={handleOnCancel}
                footer={false}
              >
                {" "}
                <div className="d-flex align-items-center pt-3">
                  <div id="prev">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleViewAnswer()}
                    >
                      View Answers
                    </button>
                  </div>
                </div>
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
                        <label className=" ">
                          Option 1 : {quizQues.Option1}
                        </label>
                        <label className=" ">
                          Option 2 : {quizQues.Option2}
                        </label>
                        <label className=" ">
                          Option 3 : {quizQues.Option3}
                        </label>
                        <label className=" ">
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
              </Modal>
            </div>
          </>
        ) : (
          <>
            <div className="container">
              <h2>CreateQuiz</h2>
              <div className="container">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Enter Quiz Name:
                </label>
                <input
                  style={{ marginLeft: "4px", marginTop: "10px" }}
                  type="text"
                  id=""
                  aria-describedby="emailHelp"
                  value={QuizName}
                  onChange={(e) => setQuizName(e.target.value)}
                  required
                />
              </div>

              <button
                className="container"
                style={{
                  borderRadius: 10,
                  backgroundColor: "blue",
                  color: "white",
                }}
                onClick={handleAddQuestion}
              >
                Add Question
              </button>
              <div className="container">
                <h3>Your Quizzes</h3>
              </div>
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
                        padding: "10px",
                      }}
                    >
                      View Quiz
                    </button>
                    <button
                      style={{
                        borderRadius: "10px",
                        borderColor: "blue",
                        padding: "10px",
                      }}
                    >
                      Delete Quiz
                    </button>
                  </div>
                ))}
              </div>
              <Modal
                title="Add Question"
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={false}
              >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                  <Form.Item label="Enter Question Statement" name={"Question"}>
                    <TextArea type="text" required />
                  </Form.Item>

                  <Form.Item label="Enter Option 1" name={"Option1"}>
                    <Input type="text" required />
                  </Form.Item>
                  <Form.Item label="Enter Option 2" name={"Option2"}>
                    <Input type="text" required />
                  </Form.Item>
                  <Form.Item label="Enter Option 3" name={"Option3"}>
                    <Input type="text" required />
                  </Form.Item>
                  <Form.Item label="Enter Option 4" name={"Option4"}>
                    <Input type="text" required />
                  </Form.Item>
                  <Form.Item label="Select Correct Answer" name={"Answer"}>
                    <Select>
                      <Select.Option value="1">Option 1</Select.Option>
                      <Select.Option value="2">Option 2</Select.Option>
                      <Select.Option value="3">Option 3</Select.Option>
                      <Select.Option value="4">Option 4</Select.Option>
                    </Select>
                  </Form.Item>

                  <div className="d-flex justify-content-end ">
                    <button type="submit" className="btn btn-primary">
                      ADD
                    </button>
                  </div>
                </Form>
              </Modal>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default CreateQuiz;
