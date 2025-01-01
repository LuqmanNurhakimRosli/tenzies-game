import React from 'react'
import Dice from './Components/Dice' 


function App() {
  const [dice, setDice] = React.useState(allNewDice())

  function reset() {
    setDice(allNewDice())
  }

  function allNewDice() {
    const newDice = []
    for ( let i = 0; i < 12; i++){
      newDice.push(Math.ceil(Math.random() * 6))
    }
    return newDice
  }

    //ini ada key id
  const diceElement = dice.map((value, index) => (
     <Dice key={index} value={value} />
  ))

  //ini tanpa key id
  const diceEle = dice.map( die => 
    <Dice value={die} />
   )

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Tenzies</h1>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {diceElement}
        {diceEle}
      </div>
      <button onClick={reset}
      className="px-4 py-2 bg-blue-500 text-white rounded-md">Roll</button>
    </main>
  )
}

export default App