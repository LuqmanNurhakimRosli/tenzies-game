import React from 'react'
import { nanoid } from 'nanoid'
import Dice from './Components/Dice'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls, setRolls] = React.useState(0)
  const [timer, setTimer] = React.useState(0)
  const [bestTime, setBestTime] = React.useState(() => 
    localStorage.getItem('bestTime') ? Number(localStorage.getItem('bestTime')) : Infinity
  )
  const [isActive, setIsActive] = React.useState(false)

  // Timer effect
  React.useEffect(() => {
    let interval: number | undefined;
    
    if (isActive && !tenzies) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1)
      }, 1000)
    }
    
    return () => clearInterval(interval)
  }, [isActive, tenzies])

  // Check winning condition
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)

    if (allHeld && allSameValue) {
      setTenzies(true)
      setIsActive(false)
      if (timer < bestTime) {
        setBestTime(timer)
        localStorage.setItem('bestTime', timer.toString())
      }
    }
  }, [dice, timer, bestTime])

  function diceGenerate(){
    return {
      value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for ( let i = 0; i < 12; i++){
      newDice.push(diceGenerate())
    }
    return newDice
  }

  function rollDice() {
    if (!tenzies) {
      setRolls(prev => prev + 1)
      if (!isActive) setIsActive(true)
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : diceGenerate()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setRolls(0)
      setTimer(0)
      setIsActive(false)
    }
  }

  function holdDIce(id: string) {
    setDice (prevDice => prevDice.map( dice => 
      dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
    ))
  }


  const diceElement = dice.map( precDice => 
    <Dice key={precDice.id} 
    value={precDice.value}  
    isHeld={precDice.isHeld}
    holdDice= {() => holdDIce(precDice.id)}
    />
   )

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-8">
      {tenzies && <Confetti />}
      <h1 className="text-5xl font-bold mb-4 text-blue-800">Tenzies</h1>
      <div className="max-w-md text-center mb-8">
        <p className="text-gray-700 mb-4">
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </p>
        <div className="flex justify-center gap-8 text-sm">
          <div className="bg-white px-4 py-2 rounded-full shadow">
            Rolls: <span className="font-bold">{rolls}</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow">
            Time: <span className="font-bold">{timer}s</span>
          </div>
          {bestTime < Infinity && (
            <div className="bg-white px-4 py-2 rounded-full shadow">
              Best: <span className="font-bold">{bestTime}s</span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-8 p-8 bg-blue-50 rounded-xl shadow-lg">
        {diceElement}
      </div>
      <button 
        onClick={rollDice}
        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full 
          font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  )
}

export default App