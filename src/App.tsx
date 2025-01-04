import React from 'react'
import { nanoid } from 'nanoid'
import Dice from './Components/Dice'


function App() {
  const [dice, setDice] = React.useState(allNewDice())

  function reset() {
    setDice(allNewDice())
  }

  function allNewDice() {
    const newDice = []
    for ( let i = 0; i < 12; i++){
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }


  const diceElement = dice.map( precDice => 
    <Dice key={precDice.id} 
    value={precDice.value}  
    isHeld={precDice.isHeld}
    />
   )

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Tenzies</h1>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {diceElement}
      </div>
      <button onClick={reset}
      className="px-4 py-2 bg-blue-500 text-white rounded-md">Roll</button>
    </main>
  )
}

export default App