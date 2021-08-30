import React, { useEffect } from 'react';
import { useState} from 'react';
import { useRef } from 'react'; 
import '../App.css';

const paratext = ['Typing is all about muscle memory, so the only way to improve is to practice typing regularly. We created TheTypingCat to give you a tool to learn and practice touch typing in the most effective way. The process of developing proper habits requires you to train your fingers periodically and to be patient. You should first focus foremost on accuracy, ergonomics, and high typing speed will come with time. Not to overwork yourself. Remember, it is a marathon, not a sprint, it is better to take ten minutes exercises daily than a single one hour run.', 'joy f',
'shemul f',
'imran f',
'sadi f']



const getText = () => paratext[Math.floor(Math.random() * 5)].split(' ')

const Timer = (props) =>{
    const[timerSpeed , settimerSpeed] = useState(0)

   

    useEffect(() =>{
        let timervar;
        if(props.timeCheck){
            timervar = setInterval(() =>{
                settimerSpeed(oldone => oldone + 1)
            }, 1000)
        }
        return () => {
            clearInterval(timervar)
            
        }
        

    }, [props.timeCheck])

    return <div style={{display: 'flex'}}>
        <div className='info'><b>{timerSpeed}</b>
         <p>Secound</p>
        </div>
        
         <br></br>

        <div  className='info'><b>{((props.correctword / (timerSpeed/60)) || 0).toFixed(2)}</b> <p> Wpm</p> </div>
    </div>
}

function Word (props) {

    const {text, active, correct} = props;

    if(props.correct === true){
        return <span className='correct'>{props.text} </span>
    }

    if(props.correct === false){
        return <span className='incorrect'>{props.text} </span>
    }

    if(props.active){
        return <span className='active'>{props.text} </span>
    }

    return <span>{props.text} </span>
}

const Main = () => {
    const [input, setinput] = useState('')
    const text = useRef(getText())
    const [activeWord, setactiveWord] = useState(0)
    const [correct, setcorrect] = useState([])
    const [timerCheck, settimerCheck] = useState(false)
    const [resetCount, setresetCount] = useState(0)
    const [resetStatus, setresetStatus] = useState(false)

    const [outputText, setoutputText] = useState([])
    const [typedText, settypedText] = useState(0)


    const processInput = (e) => {
        const value = e.target.value
        settypedText(prevone => prevone+1)

        setoutputText(data => {
            const newRes = [...data]
            newRes[activeWord] = value
            return newRes
        })

        if(activeWord === text.current.length){
            setinput('completed')
            return
        }

        if(!timerCheck){
            settimerCheck(true)
        }
        
        console.log(value)
        if(value.endsWith(' ')){

            if(activeWord === text.current.length-1){
                
                settimerCheck(false)
                
            }

            setactiveWord(index => index + 1)
            console.log(activeWord)
            setinput('')

            const word = value.trim();
            console.log(word)
            if(word === text.current[activeWord]){
                setcorrect(data => {
                    const newRes = [...data]
                    newRes[activeWord] = true
                    return newRes
                })
                console.log(correct[activeWord])
                
            }
            else{
                setcorrect(data => {
                    const newRes = [...data]
                    newRes[activeWord] = false
                    return newRes
                })
            }
        }
        else{
            setinput(value)
        }

        
    }

    const reset = () =>{
        setresetCount(prevOne => prevOne+ 1)
       
        setinput('');
        setactiveWord(0);
        setcorrect([])
        settimerCheck(false);
        setresetStatus(true)
        setoutputText([])
    }

    return (
        <div className='maindiv'>

            <div style={{display:'flex' , marginLeft: '33%'}}>
                <Timer timeCheck={timerCheck}
                    correctword={correct.filter(Boolean).length}
                    
                />
                <div className='info'><b>{typedText}</b> <p>Typed Char</p> </div>
            </div>
            
            <input 
            placeholder = 'Type Here'
                type='text'
                value={input}
                onChange={processInput}
            ></input>
            <div style ={{display: 'flex'}}>
                <div className='text'>
                    <p>{text.current.map((v , i) =>{
                        return <Word 
                                    text={v} 
                                    active={i === activeWord}
                                    correct = {correct[i]}
                                />
                        })}
                    </p>
                </div>
                <div  className='text'>

                    <p style={{color: 'blue'}}><b>{outputText}</b></p>
                </div>
            </div>

            {correct.val}
            <br></br>
            <p><b>You Tried : <span style={{color: 'cadetblue'}}>{resetCount}</span> Time</b></p>
            
           
            <button className='btn' onClick={reset}>Reset</button>
            
        </div>
    );
};

export default Main;