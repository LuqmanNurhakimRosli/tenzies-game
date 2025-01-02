import React from 'react'
import { nanoid } from 'nanoid'
import Dice from './Components/Dice'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every( die => die.isHeld)
    const firstValue = dice[0].value

  const allSameValue = dice.every (die => die.value === firstValue)

  if(allHeld && allSameValue) {
    setTenzies(true)
    console.log("You won!")
  }
    
  }, [dice])



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
    if (!tenzies ){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
          die :
          diceGenerate()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
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
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {tenzies && <Confetti />}
      <h1 className="text-4xl font-bold mb-8">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {diceElement}
      </div>
      <button onClick={rollDice}
      className="px-4 py-2 bg-blue-500 text-white rounded-md">
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  )
}

export default App