import './App.css';
import Header from './components/header.jsx'
import Footer from "./components/footer.jsx"
import React, { useState } from "react";
import soccer_data from "./data/soccer.js"
import nba_data from "./data/nba.js"
import PlayerCard from "./components/playercard";
import soccer_clubs from "./clubs.js"
import nba_clubs from "./nba_clubs.js"
import Select from 'react-select';
import ExpandingMessage from "./components/dropdown_message.jsx"
import ToggleButton from './components/toggle.jsx';

function App() {

  //create state variables

  //state variables for screen changing
  const [startScreen, setStartScreen] = useState(true);
  const [soccerScreen, setSoccerScreen] = useState(false);
  const [nbaScreen, setNBAscreen] = useState(false);

  //state variables for handling guesses on infinite
  const [solution, setSolution] = useState(null);
  const [solution2, setNumbers] = useState(null);
  const [guess, setGuess] = useState(null);
  const [attempt, setAttempt] = useState(1);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isCorrectColor, setIsCorrectColor] = useState("red");
  const [secondAttempt, setSecondAttempt] = useState("false");
  const [thirdAttempt, setThirdAttempt] = useState("false");
  const [fourthAttempt, setFourthAttempt] = useState("false");
  const [fifthAttempt, setFifthAttempt] = useState("false");
  const [guesses, setGuesses] = useState([]);

  // Define the array
const used_teams = [];

// Save the array in local storage
localStorage.setItem('myArray', JSON.stringify(used_teams));

  //data for all things is null to start
  let data = null;
  let clubs = null;

  function callFunctionAtTime(time, callback) {
    // Convert time string to Date object
    const [hour, minute] = time.split(':').map(Number);
    const now = new Date();
    const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
  
    // Calculate time until scheduled time
    const timeUntilScheduledTime = scheduledTime.getTime() - now.getTime();
  
    // Call callback function after the specified time has elapsed
    setTimeout(callback, timeUntilScheduledTime);
  }
  
  function myFunction() {
    //console.log("Function called at " + new Date());
  }
  
  // Call myFunction at 11:30


  function isCurrentDateInEST(date) {
    // Create a new Date object for the current time in EST
    const estNow = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
  
    // Create a new Date object from the input date parameter
    const inputDate = new Date(date);

  
    // Get the year, month, and day of each date
    const estYear = new Date(estNow).getFullYear();
    const estMonth = new Date(estNow).getMonth();
    const estDay = new Date(estNow).getDate();
    const inputYear = inputDate.getFullYear();
    const inputMonth = inputDate.getMonth();
    const inputDay = inputDate.getDate();
  
    // Check if the year, month, and day of the input date match the current date in EST
    return estYear === inputYear && estMonth === inputMonth && estDay === inputDay;
  }

  const newGame = () => {
    if (soccerScreen) {
      data = soccer_data;
    }
    if (nbaScreen) {
      data = nba_data;
    }
    resetData();
    newGuess();
  }

  const newSoccerGame = () => {
    resetData();
    newGuess();
  }

  // callFunctionAtTime("1:58", newSoccerGame);
  // callFunctionAtTime("1:59", newSoccerGame);
  // callFunctionAtTime("2:00", newSoccerGame);

  const resetData = () => {
    setSecondAttempt("false");
    setThirdAttempt("false");
    setFourthAttempt("false");
    setFifthAttempt("false");
    setAttempt(1);
    setIsCorrect(null);

  }
  //function to handle the change to soccer page
  const handleSoccerClick = () => {
    setStartScreen(false);
    setSoccerScreen(true);
    setNBAscreen(false);
    data = soccer_data;
    clubs = soccer_clubs;
    resetData();
    newGuess();
  };

  //function to handle the change back to home page
  const handleHomeClick = () => {
    setStartScreen(true);
    setSoccerScreen(false);
    setNBAscreen(false);
  };

    //function to handle the change to basketball page
  const handleNBAclick = () => {
    setStartScreen(false);
    setSoccerScreen(false);
    setNBAscreen(true);
    data = nba_data;
    resetData();
    newGuess();
  };

  //function to handle guesses
  const handleGuess = (selectedOption) => {
    // Set the current guess to the selected option value
    setGuess(selectedOption.value);
    if (attempt < 6) {
        // Check if the selected option value is correct
        if (selectedOption.value === solution.club) {
            setIsCorrectColor("green");
            setIsCorrect("Correct");
            setSecondAttempt("true");
            setThirdAttempt("true");
            setFourthAttempt("true");
            setFifthAttempt("true");
            setGuess(null);
            // Increment the score by 1
            const currentScore = localStorage.getItem('score') || 0;
            localStorage.setItem('score', parseInt(currentScore) + 1);
        } else {
            setAttempt(attempt + 1);
            setIsCorrect("Incorrect");
        }
        // Add the guess to the guesses array
        setGuesses([...guesses, selectedOption.value]);
  
        // Set the second, third, fourth and fifth attempts to true
        if (attempt >= 1) {
            setSecondAttempt("true");
        }
        if (attempt >= 2) {
            setThirdAttempt("true");
        }
        if (attempt >= 3) {
            setFourthAttempt("true");
        }
        if (attempt >= 4) {
            setFifthAttempt("true");
        }
  
        // Check if the guess is incorrect and the attempt is 5
        if (attempt >= 5 && selectedOption.value !== solution.club) {
            setIsCorrect("Unable");
            setGuess(null);
        }

        if (attempt >= 5 || selectedOption.value === solution.club) {
          const used_teams = JSON.parse(localStorage.getItem('used_teams')) || [];
          used_teams.push(solution.club)
          localStorage.setItem('used_teams', JSON.stringify(used_teams));
        }
    }
  
  };

  const newGuess = () => {
    const used_teams = JSON.parse(localStorage.getItem('used_teams')) || [];
  let randomSolution;

  do {
    const randomNumber = Math.floor(Math.random() * data.solutions.length); 
    randomSolution = data.solutions[randomNumber];
  } while (used_teams.includes(randomSolution));

  used_teams.push(randomSolution);
  localStorage.setItem('used_teams', JSON.stringify(used_teams));

  const arr = [];
  while (randomSolution.players.length >= 5 && arr.length < 5) {
    const r = Math.floor(Math.random() * randomSolution.players.length);
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  arr.sort((a, b) => a - b); // sort in increasing order
    setSolution(randomSolution);
    setNumbers(arr);
  }
  

  return (
    <div className="App">

      <Header/>
      <div>
    </div>
      {(startScreen) ? (
        <div>
          <br></br>
          <center>
            <br></br>
          <ExpandingMessage/>
            </center>
        <div className = "center-div">
        <main>
        <button className = "button-1" onClick={handleSoccerClick}>
            <img src= "https://static.thenounproject.com/png/2039196-200.png" alt="Soccer" />
        </button>

        <button className = "button-1" onClick={handleNBAclick}>
          <img src= "https://images.ctfassets.net/v3n26e09qg2r/3Q7dRCFKRz0J8mRZ8SIR0Z/78ff27249f6eef5aa51120f29d579432/nba_1200.png" alt="NBA" />
        </button>
        
        {/* <center>
        <ToggleButton onText="∞" offText="Daily" />
        </center> */}


        </main>
      </div>
      </div>)
      : null}

      {(soccerScreen) ? (
      <div className = "container2">
        <button className="home-button" onClick={handleHomeClick}>
          <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="Home" />
        </button>

        
        <div className="container">
        <PlayerCard data={solution.players[solution2[0]]} show={true}></PlayerCard>
        <PlayerCard data={solution.players[solution2[1]]} show={secondAttempt} />
        <PlayerCard data={solution.players[solution2[2]]} show={thirdAttempt} />
        <PlayerCard data={solution.players[solution2[3]]} show={fourthAttempt} />
        <PlayerCard data={solution.players[solution2[4]]} show={fifthAttempt} />
        </div>
        <center>
        {(isCorrect !== "Correct" && attempt < 6) ? (
    <div>
    <center>
    <div>
      <br></br>
    <label className = "bolden2" htmlFor="clubs" style={{ fontWeight: "bold" }}>Guess:</label>
    <br></br>
    <br></br>
    <center>
    <div class="container-sm" style={{width: '300px'}}>
          <Select
            style = "dropdown"
            options={soccer_clubs}
            onChange={handleGuess}
          />
    </div>
    </center>
    </div>
    </center>
  </div> ) : null
    
  
  }
    {isCorrect === "Incorrect" && (
      <center>
      <p className = "alert-stop fade-in">Your guess was incorrect!</p>
      </center>
    )}
    {isCorrect === "Unable" && (
      <center>
      <p className = "alert-stop fade-in">
        Unable to guess. Correct answer was {solution.club}
      </p>
      <button className="new-button" onClick={newGame}>
  <img src="https://cdn-icons-png.flaticon.com/512/399/399422.png" alt="New Game" />
  </button>
      </center>
    )}
    {isCorrect === "Correct" && (
      <div>
      <center>
      <p className = "alert-go fade-in" >{solution.club} in {attempt} attempts</p>
      </center>
      <button className="new-button" onClick={newGame}>
    <img src="https://cdn-icons-png.flaticon.com/512/399/399422.png" alt="New Game" />
    </button>
      </div>
      
  
    )}
    </center>
      </div>
  
      ) : null}

    {(nbaScreen) ? (
      <div className = "container2">
      <button className="home-button" onClick={handleHomeClick}>
          <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="Home" />
        </button>
      <div className="container">
      <PlayerCard data={solution.players[solution2[0]]} show={true}></PlayerCard>
      <PlayerCard data={solution.players[solution2[1]]} show={secondAttempt} />
      <PlayerCard data={solution.players[solution2[2]]} show={thirdAttempt} />
      <PlayerCard data={solution.players[solution2[3]]} show={fourthAttempt} />
      <PlayerCard data={solution.players[solution2[4]]} show={fifthAttempt} />
      </div>
      <center>
      {(isCorrect !== "Correct" && attempt < 6) ? (
<div>
  <center>
  <div>
    <br></br>
  <label className = "bolden2" htmlFor="clubs" style={{ fontWeight: "bold" }}>Guess:</label>
  <br></br>
  <br></br>
  <center>
  <div class="container-sm" style={{width: '300px'}}>
        <Select
          style = "dropdown"
          options={nba_clubs}
          onChange={handleGuess}
        />
  </div>
  </center>
  </div>
  </center>
</div> ) : (
  null
)}
  {isCorrect === "Incorrect" && (
    <center>
    <p className = "alert-stop fade-in">Your guess was incorrect!</p>
    </center>
  )}
  {isCorrect === "Unable" && (

    <center>
    <p className = "alert-stop fade-in">
      Unable to guess. Correct answer was {solution.club}
    </p>
    <button className="new-button" onClick={newGame}>
  <img src="https://cdn-icons-png.flaticon.com/512/399/399422.png" alt="New Game" />
  </button>
    </center>
  )}
  {isCorrect === "Correct" && (
    <div>
    <center>
    <p className = "alert-go fade-in" >{solution.club} in {attempt} attempts</p>
    </center>
    <button className="new-button" onClick={newGame}>
  <img src="https://cdn-icons-png.flaticon.com/512/399/399422.png" alt="New Game" />
  </button>
    </div>
  )}
  </center>
    </div>
      ) : null}


      <Footer/>

    </div>
  );
}

export default App;
