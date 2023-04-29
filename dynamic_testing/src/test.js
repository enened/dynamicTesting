import Question from "./question.js"
import {useState, useContext} from 'react';
import axios from 'axios';
import {Context} from "./context.js"

function Test(props){
    const {userId} = useContext(Context)
    const [score, setScore] = useState(0)


    // send test info to backend to save in database
    const saveTest = ()=>{
        axios.post("http://127.0.0.1:5000/saveTest", {userId: userId, test: props.test, testName: props.testName, score: score + '/' + Object.keys(props.test).length}).then((response)=>{
            if (response.data == 'ok'){
                alert('Successfully saved')
            }
        })
    }

    return(
        <div>  
            {/* show test name */}
            <h2>{props.testName.charAt(0).toUpperCase()+props.testName.slice(1)}</h2>
            
            {/* show test questions */}
            {Object.keys(props.test).map((key, index)=>{

                return (
                    <div key={index}>
                        <Question question = {props.test[key]} index = {index} setScore = {setScore}/>
                    </div>
                  );
            })}

            {/* show score */}
            <p>{score} / {Object.keys(props.test).length}</p>

            {/* show save test button if logged in */}
            {userId && <button className="normalButton" onClick={saveTest}>Save test</button>}
        </div>
    )
}

export default Test