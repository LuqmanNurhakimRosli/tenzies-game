import React from 'react'
import Dice from './Components/Dice' 

function App() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Tenzies</h1>
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Dice value='1' />
        <Dice value='1' />
        <Dice value='1' />
        <Dice value='1' />
        <Dice value='1' />
        <Dice value='1' />
        <Dice value='1' />
        <Dice value='1' />
        <Dice value='1' />
        <Dice value='1' />
        <Dice value='1' />
        <Dice value='1' />
      </div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Roll</button>
    </main>
  )
}

export default App