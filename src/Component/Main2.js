import React, { useRef } from 'react';
import { useState , useEffect} from 'react';
import Text from './Text';
import Speed from './Speed';

const paratext = ['Typing is all about muscle memory, so the only way to improve is to practice typing regularly. We created TheTypingCat to give you a tool to learn and practice touch typing in the most effective way. The process of developing proper habits requires you to train your fingers periodically and to be patient. You should first focus foremost on accuracy, ergonomics, and high typing speed will come with time. Not to overwork yourself. Remember, it is a marathon, not a sprint, it is better to take ten minutes exercises daily than a single one hour run.', 'joy fwefrtg df',
'shemul fsad cfvg',
'imran fesfd bg',
'sadi dfbg efrbg']

const getText = () => paratext[Math.floor(Math.random() * 5)].split(' ')

const Main2 = () => {
    const [inputText, setInputText] = useState('')
    const text = useRef(getText())
    const [textWord, settextWord] = useState('')
    const [i , seti] = useState(0)
    

    const setinput = (e) => {
        const xvalue = e.target.value;
        setInputText(xvalue)
        

        if(xvalue !== ' '){
            var word = xvalue.split(' ').slice(-1)
            console.log(text.current[i] === word[0] ? 'siam' : 'notsiam')
        }
        
        else{
            word = ''
        } 
    }

    return (
        <div>
            <div>
                <p>{text.current.map((v, i)=>{
                    return <span>{v} </span>
                })} </p>
                <br></br>
                <textarea value={inputText} onChange={setinput}></textarea>
                <br></br>
                {inputText} <br>
                </br>{textWord}
            </div>
        </div>
    );
};

export default Main2;