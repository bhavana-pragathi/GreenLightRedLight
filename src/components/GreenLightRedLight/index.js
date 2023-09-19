import {Component} from 'react'
import './index.css'

class GreenLightRedLight extends Component{
    //maintain all the state
    state={startedGame: false, name: '', email: '', number: '', level: 'Easy', bgColor:'green', score: 0, timerTime: 40, gameOver: false, gameWon: false}

    //maintain the change of color in particular intervals
    componentDidMount() {
        this.colorChange = setInterval(this.generateColor, 1500)
    }

    //component will unomount once timer is clear
    componentWillUnmount() {
        clearInterval(this.colorChange);
    }

    onSubmitForm=event=>{
        event.preventDefault()
        const {name, email, number}=this.state
        if(name.trim()!=='' && email.trim()!=='' && number.trim()!==''){
            this.setState({startedGame: true})
        }else{
            alert('Please enter the details!!!')
        }
    }

    onChangeName=event=>{
        this.setState({name: event.target.value})
    }

    onChangeEmail=event=>{
        this.setState({email: event.target.value})
    }

    onChangeNumber=event=>{
        this.setState({number: event.target.value})
    }

    onChangeLevel=event=>{
        this.setState({level: event.target.value})
    }

    //generate the random color
    generateColor=()=>{
        const randomColor = Math.floor(Math.random() * 2);
        this.setState({
            bgColor: randomColor === 0 ? 'green' : 'red',
        });
    }

    //set the game timer to moderate the time limit of the game to win or lose
    gameTimer=() => {
        const {timerTime}=this.state
        const timer = setInterval(() => {
          timerTime((prevTime) => prevTime - 1);
        }, 1000);
        if(timerTime===0){
            clearInterval(timer)
            this.setState({ gameOver: true });
        }
        else{
            this.onClickColor()
        }

    }

    //event handler to click the color and based on the level the game difficulty is changed
    onClickColor=()=>{
        const {bgColor, gameOver, level, score}=this.state
        if(gameOver) return
        if(bgColor==='green'){
            if(level==='Easy'){
                this.setState(prevState=>({
                    score: prevState.score+1
                }))
                if(score===10){
                    clearInterval(this.colorChange);
                    this.setState({ gameWon: true });
                }
            }
            if(level==='Medium'){
                this.setState(prevState=>({
                    score: prevState.score+1
                }))
                if(score===15){
                    clearInterval(this.colorChange);
                    this.setState({ gameWon: true });
                }
            }
            if(level==='Hard'){
                this.setState(prevState=>({
                    score: prevState.score+1
                }))
                if(score===25){
                    clearInterval(this.colorChange);
                    this.setState({ gameWon: true });
                }
            }
        }
        else{
            this.setState({ gameOver: true });
        }
    }

    render(){
        const {startedGame, bgColor, score, gameOver, gameWon, name}=this.state
        return(
            <div className='main-bg'>
                {startedGame? (
                    //once game is started the page content will change to game page from the form
                    <div className='main-bg'>
                        {gameOver?(
                            //if the timelimit is over or the clicked on the wrong color then game is over else game won content appears 
                            <div>
                                <h1>Game Over!</h1>
                            </div>    
                        ):(
                            <div className='content-div'>
                                {gameWon?(
                                    <div>
                                        <h1>You Win!</h1>
                                    </div>
                                ):(
                                    <div className='content-div'>
                                        <h1 className='name'>Hi {name}</h1>
                                        <h1 className='score-para'>Score: {score}</h1>
                                        <div onClick={this.onClickColor} style={{backgroundColor: bgColor, border: 'none', width: '200px', height: '200px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '18px'}}>
                                            Click the Color!
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ):(
                    <form onSubmit={this.onSubmitForm} className='card-div'>
                        <h1 className='heading'>Please Enter your Details to
                            <br/>
                            Start the Game
                        </h1>
                        <div className='label-input'>
                            <label htmlFor='label-name' className='label'>Name</label>
                            <input onChange={this.onChangeName} id='label-name' className='input' type='text' placeholder='Enter your Name'/>
                        </div>
                        <div className='label-input'>
                            <label htmlFor='label-email' className='label'>Email</label>
                            <input onChange={this.onChangeEmail} id='label-email' className='input' type='text' placeholder='Enter your Email'/>
                        </div>
                        <div className='label-input'>
                            <label htmlFor='label-num' className='label'>Mobile Number</label>
                            <input onChange={this.onChangeNumber} id='label-num' className='input' type='text' placeholder='Enter your Mobile Number'/>
                        </div>
                        <div className='label-input'>
                            <label htmlFor='label-option' className='label'>Difficulty Level</label>
                            <select onChange={this.onChangeLevel} name='level' id='label-option' className='input'>
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>
                        <button className='enter-button' type='submit'>Start Game</button>
                    </form>
                )}
            </div>
        )
    }
}

export default GreenLightRedLight