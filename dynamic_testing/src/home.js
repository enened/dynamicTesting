import Test from "./test.js"
import Help from "./help.js"
import Login from './login.js'
import Signup from './signup.js'
import {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {Context} from "./context.js"

function Home(){
    const {userId, setUserId, page, setPage} = useContext(Context)
    const [loading, setLoading] = useState(false);
    const [test, setTest] = useState();
    const [testType, setTestType] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [tests, setTests] = useState([]);



    // get test from backend  
    const getTest = (e, type) =>{
        
        if (e){
            e.preventDefault()
        }

        setTest()
        if (type.trim().length > 0 && !loading){
            setLoading(true)
            setTestType(type)
            axios.post("http://127.0.0.1:5000/getTest", {type: type}).then((response)=>{
                setTest(response.data)
                setLoading(false)
            })
        } 
    }

    const getTests = ()=>{
        if (userId){
            axios.post("http://127.0.0.1:5000/getTests", {userId: userId}).then((response)=>{
                setTests(response.data)
            })
        }
    }

    const getTestInfo = (testId, testName)=>{
        axios.post("http://127.0.0.1:5000/getTestInfo", {testId: testId}).then((response)=>{
            setTest(response.data)
            setTestType(testName)
            setPage('test')
        })
    }


    useEffect(()=>{
        getTests()
    }, [userId])


    return(
        <div>
            
            {/* header */}
            <div className='header'>
                {page != 'help' ? 
                <button className='helpButton' onClick={()=>setPage('help')}>Help</button> 
                :                 
                <button className='helpButton' onClick={()=>{setPage('test')}}>Back</button>
                }
                 
                <h1 style={{'margin':'auto'}}>Test Maker Pro</h1>

                {/* Login and sign up buttons */}
                {!userId ? 
                    <>
                        {page != 'login' ? 
                            <button onClick={()=>{setPage('login')}} className='loginButton'>Login</button>
                            :                 
                            <button className='helpButton' onClick={()=>{setPage('test')}}>Back</button>
                        }

                        {page != 'signup' ? 
                            <button onClick={()=>{setPage('signup')}} className='loginButton'>Sign Up</button>
                            :                 
                            <button className='helpButton' onClick={()=>{setPage('test')}}>Back</button>
                        }
                    </>

                    :
                    <>
                        <button className='loginButton' onClick={()=>{setUserId()}}>Logout</button>
                        {page != 'savedTests' ? 
                            <button className='helpButton' onClick={()=>{setPage('savedTests'); getTests()}}>Saved Tests</button>
                            :                 
                            <button className='helpButton' onClick={()=>{setPage('test')}}>Back</button>
                        }
                    </>
                }
            </div>



            {/* show test and search bar */}
            {page == 'test' &&
                <>  

                    {/* Search bar */}
                    <div id="searchBarDiv">
                        <label id="searchBarLabel" htmlFor="searchBar">Enter type of test to generate: </label>
                        <br/>
                        <form onSubmit={(e)=>{getTest(e, searchQuery)}}>
                            <input type="text" className="searchBar" placeholder="Subject, Number of questions, etc." onChange={(e)=>(setSearchQuery(e.target.value))}/>
                            <button className='normalButton' type='submit'>Search</button>
                        </form>
                    </div>

                    {/* show test if it exists */}
                    {test && 
                        <>
                            <Test test={test} testName = {testType}/>
                            <button className="normalButton" onClick={(e)=>{getTest(e, testType)}}>Generate new test</button>
                        </>
                    }
                </>
            }

            
            {/* show loading */}
            {loading && <p className='inform'>Loading...</p>}

            {/* show help page */}
            {page == 'help' && <Help/>}
            
            {/* show login page */}
            {page == 'login' && <Login/>}

            {/* show signup page */}
            {page == 'signup' && <Signup/>}

            {page == 'savedTests' && 
                <>
                    <h2>Saved Tests: </h2>
                    {tests.map((val, index)=>{
                        return(
                            <div className="testsListSlide" onClick={()=>(getTestInfo(val[0], val[2]))}>
                                <p className = "testsSlideInfo">{val[2]}</p>
                                <p className = "testsSlideInfo">Score: {val[3]}</p>
                            </div>
                        )
                    })}
                </>

            }

        </div>
    )
}

export default Home