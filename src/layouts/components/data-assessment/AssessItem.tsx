import { useStore } from '@nanostores/react';
import type { AssessItemType } from './StepProvider';
import { answersStore } from "./StepProvider";
import React from 'react';

type Props = {
  questionId: number;
  item: AssessItemType;
};


function AssessItem({ questionId, item }: Props) {
  const $answers = useStore(answersStore);
  //console.log("Rendering with answers:", $answers);
  const selectedAnswer = $answers[questionId] || '';
  //console.log("Selected answer for question", questionId, ":", selectedAnswer);

  function saveAnswer(questionId: number, answer: string) {
    //console.log("Set question " + questionId + " to " + answer)
    answersStore.setKey(questionId, answer);
  }


  return (
    <form>
      <div>
        <h1>Frage {questionId}</h1>
        <h3>{item.question}</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {item.answers.map((option) => (
            <li key={`question-${questionId}-option-${option}`} style={{ marginBottom: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  key={`radio-${questionId}-${option}`}
                  type="radio"
                  name={`frage-${questionId}`}
                  value={option}
                  defaultChecked={selectedAnswer === option}
                  onChange={() => saveAnswer(questionId, option)}
                  style={{ marginRight: '10px' }}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}

export default AssessItem;
