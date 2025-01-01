import React from 'react'

function Dice(props) {

  return (
    <div className="w-16 h-16 flex items-center justify-center bg-white border-2 border-gray-300 rounded-md shadow-md">
      <h2 className="text-2xl font-bold">{props.value}  </h2>
    </div>
  )
}

export default Dice
