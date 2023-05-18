import React, { useState } from 'react'
import he from 'he' 

export default function Form(props){
    
    function renderStyles(option){
        const {correctAnswer, selected} = props.data

        if(props.questionsSubmitted) {
            if(option == selected){
                if(option == correctAnswer){
                    return "correct-answer"
                }else if (option != correctAnswer){
                    return "incorrect-answer"
                }
            } else if (option == correctAnswer){
                return "correct-answer"
            } else if (option != correctAnswer){
                return "unselected-answer"
            }
                
            }
        }

    const radioInputs = props.data.allAnswers.map((answer, index)=> {
        const propertyId = props.data.id
        const decodedAnswer = he.decode(answer)

        return (
            <React.Fragment key={index}>
                <input
                    type="radio"
                    name={propertyId}
                    id={answer}
                    value={answer}
                    onChange={props.handleInputChange}
                    disabled={props.questionsSubmitted}
                />
                <label id={renderStyles(answer)} htmlFor={answer}>{decodedAnswer}</label>
            </React.Fragment>
        )
    })

    return (
        <>
            <fieldset>
                <legend dangerouslySetInnerHTML={{__html: props.data.question}}></legend>
                {radioInputs}
            </fieldset>
            <hr/>
        </>
      );
}