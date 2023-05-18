import React, { useState, useEffect } from 'react'
import './App.css'
import Introduction from '/components/Introduction'
import Form from '/components/Form'
import { nanoid } from "nanoid";

function App() {
  const [startQuiz, setStartQuiz] = useState(false)
  const [resetQuiz, setResetQuiz] = useState(false)
  const [apiData, setApiData] = useState([])
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [questionsSubmitted, setQuestionsSubmited] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setLoading(true)
      fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
      .then(res => res.json())
      .then(data => {
  
        setApiData(data.results.map(question => {
          const incorrectAnswersArr = question.incorrect_answers
          const correctAnswer = question.correct_answer
          return {
            question:question.question,
            id:nanoid(),
            correctAnswer:correctAnswer,
            selected:null,
            allAnswers:addAnswerRandomly(incorrectAnswersArr, correctAnswer)
          }
        }))
        setLoading(false)
      })
  },[resetQuiz])
  
  function addAnswerRandomly(array, element){
    const randomIndex = Math.floor(Math.random()* (array.length + 1))
    array.splice(randomIndex, 0, element)
    return array
  }
     
  const questions = apiData.length > 0 ? apiData.map(q => {
    return (
      <Form
        key={q.id}
        data={q}
        handleInputChange={handleInputChange}
        questionsSubmitted={questionsSubmitted}
      />
    )
  }): null;

  function start(){
    setStartQuiz(true)
  }

  function handleInputChange(e){
    const {name, value} = e.target
    setApiData(prevApiData => {
      return prevApiData.map(question => {
        if (question.id === name) {
          return {
            ...question, 
            selected:value
          }
        } else {
          return question
        }
      })
    })
  }

  function handleSubmit(event){
    event.preventDefault()
    setQuestionsSubmited(true)
    handleCorrectAnswer()
  }

  function handleCorrectAnswer() {
    setCorrectAnswers(0);
  
    setApiData(prevApiData => prevApiData.map(question => {
      if (question.selected === question.correctAnswer) {
        setCorrectAnswers(prevCount => prevCount + 1);
      }
      return question;
    }));
  }

  function playAgain(){
    setQuestionsSubmited(false)
    setCorrectAnswers(0)
    setApiData([])
    setResetQuiz(prev => !prev)
  }

  useEffect(() => {
    console.log(apiData);
  }, [apiData]);
 
  return (
    <main>
      {!startQuiz ? (
        <Introduction startBtn={start} />
      ) : (
        <section>
          {loading ? (
            <div className='spinner'></div>
          ) : (
            <section className='form'>
              {questions}
              <div className='format'>
                {questionsSubmitted ? (
                  <p>You scored {correctAnswers}/5 correct answers</p>
                ) : (
                  ""
                )}
                {questionsSubmitted ? (
                  <button onClick={playAgain} type="button">Play again</button>
                ) : (
                  <button onClick={handleSubmit} type="submit">Check Answers</button>
                )}
              </div>
            </section>
          )}
        </section>
      )}
    </main>
  );
}

export default App
