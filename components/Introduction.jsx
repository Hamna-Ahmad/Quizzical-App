import React from 'react'

export default function Introduction(props){
    return (
        <section className="intro">
            <h1 className='intro--title typewriter'> Quizzical</h1>
            <p className='intro--description'>
            Put yourself to the test by participating in a trivia challenge, where you can earn points for each correct answer and aim to surpass your previous achievements!</p>
            <button className="start-quiz-btn" onClick={props.startBtn}>Start Quiz</button>
        </section>
    )
}