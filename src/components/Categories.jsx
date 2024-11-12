import he from 'he';
import { useState } from 'react';
import { fetchData } from '../helpers/fetchData';


const categoryList = [
  { name: 'General Knowledge', value: 9 },
  { name: 'Film', value: 11 },
  { name: 'Music', value: 12 },
  { name: 'Television', value: 14 },
  { name: 'Videogames', value: 15 }
];

const Categories = () => {
    const [category, setCategory] = useState()
    const [isSelected, setIsSelected] = useState(false)
    const [questions, setQuestions] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showScore, setShowScore] = useState(false);
    const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
    const [incorrectAnswersCount, setIncorrectAnswerCount] = useState(0); 
    const [selectedAnswer, setSelectedAnswer] = useState(false);


    const handleClick = (e) => {
        // console.log(category)
        const {value} = e.target
        console.log(value)
        if (isSelected && category !== value){
            setIsSelected(true)
        }else {
            setIsSelected(!isSelected)
        }
        setCategory(value)
        console.log('value:', value)
    }

    const HandleSubmit = async () => {
        const data = await fetchData(category)
        const {results} = data
        setQuestions(results)
        console.log(questions)
    };

    const handleAnswerClick = (selectedAnswer) => {
        const correctAnswer = questions[currentIndex].correct_answer;
        setSelectedAnswer(selectedAnswer);
    
        if (selectedAnswer === correctAnswer) {
          setCorrectAnswerCount((prev) => prev + 1);
        } else {
          setIncorrectAnswerCount((prev) => prev + 1);
        }
      };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null); 
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setShowScore(false);
    setCurrentIndex(0);
    setCorrectAnswerCount(0);
    setIncorrectAnswerCount(0);
    setIsSelected(false);
    setCategory(null);
    setQuestions([]);
    };

  return (
    <>
      {questions.length === 0 ? (
        <div className='mainContainer'>
          <h1 className="mainTitle">Choose your trivia category</h1>
          <div className='selectionButtons'>
                {
                    categoryList.map( cat =>
                        (
                            <button key={cat.value} 
                            onClick={handleClick} 
                            value={cat.value} 
                            className={cat.value==category && isSelected ? 'active' : ''}
                            >{cat.name}
                            </button>
            ))}
          </div>
          <div>
            <button className='submitButton' disabled={!isSelected} onClick={HandleSubmit}>
              Submit
            </button>
          </div>
        </div>
      ) : showScore ? (
        <div className='scoreContainer'>
          <h1 className='score'>Your Score is</h1>
          <p>Correct Answers: {correctAnswerCount}</p>
          <p>Incorrect Answers: {incorrectAnswersCount}</p>
            <button onClick={handleRestart} className='restartButton'>Restart</button>
        </div>
      ): (
        <div className='questionsContainer'>
          <h2 className='question'>{he.decode(questions[currentIndex].question)}</h2>
          {
          questions[currentIndex].incorrect_answers.map((answer, index) => (
            <button
            key={index}
            onClick={() => handleAnswerClick(answer)}  
            className={selectedAnswer === answer ? 'active' : ''}  
            >
            {he.decode(answer)} 
            </button>
          ))
      }
            <button
        onClick={() => handleAnswerClick(questions[currentIndex].correct_answer)}  
        className={selectedAnswer === questions[currentIndex].correct_answer ? 'active' : ''}  
        >
        {he.decode(questions[currentIndex].correct_answer)}  
        </button>
        
          {selectedAnswer && ( 
            <div>
              <button className='nextButton' onClick={nextQuestion} disabled={!selectedAnswer}>
                Next</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Categories;
