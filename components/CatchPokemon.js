import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewPokemon } from './../redux/user/userSlice';

const CatchPokemon = ({
    id
}) => {
    const dispatch = useDispatch();

    const questions = [
        {
            'question': '1 + 5 = ?',
            'answer': '6',
            'options': [
                '1',
                '2',
                '3',
                '6'
            ]
        },
        {
            'question': '2 + 5 = ?',
            'answer': '7',
            'options': [
                '1',
                '2',
                '3',
                '7'
            ]
        },
        {
            'question': '12 x 2 = ?',
            'answer': '24',
            'options': [
                '72',
                '14',
                '24',
                '22'
            ]
        },  
    ];

    const [isStarting, setIsStarting] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [counter, setCounter] = useState(3);
    const [isCorrect, setIsCorrect] = useState(null);

    useEffect(() => {
        //get random question from questions array
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

        setSelectedQuestions(randomQuestion);
    }, []);

    useEffect(() => {
        if(isStarting){
            if(counter > 0){
                setTimeout(() => {
                    setCounter(counter - 1);
                }, 1000);
            }else{
                setShowOptions(true);
            }
        }
    }, [isStarting, counter]);

    const startCatching = () => {
        setIsStarting(true);
    }

    const chooseAnswer = (answer) => {
        if(answer === selectedQuestions.answer){
            setIsCorrect(true);
            dispatch(addNewPokemon(id))
        }else{
            setIsCorrect(false);
        }
    }

    /* question and options */
    const Question = () => {
        return (
            <div>
                <div className="alert alert-warning">
                    Please answer the following question:
                    <h3>{ selectedQuestions.question }</h3>
                </div>
                <b>answer:</b>
                {
                    showOptions ? (
                        <div className="row">
                            {
                                selectedQuestions.options.map((option, index) => (
                                    <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
                                        <button onClick={() => chooseAnswer(option)} className="btn btn-light border w-100">{ option }</button>
                                    </div>
                                ))
                            }
                        </div>
                    ) : 
                    (
                        <div className="text-center h3">Ready?! {counter}</div>
                    )
                }
            </div>
        )
    }

    return (
        <>
            { isStarting ? (
                isCorrect === null ? <Question /> :
                isCorrect ? <div className="alert alert-success">You caught the pokemon!</div> :
                <div className="alert alert-danger">You failed to catch the pokemon!</div>
            ) : (
                <button onClick={() => startCatching()} type="button" className="btn btn-warning w-100">CATCH NOW!</button>
            ) }
        </>
    )
}

export default CatchPokemon;