interface DiceProps {
  value: number;
  isHeld: boolean;
  holdDice: () => void;
}

function Dice({ value, isHeld, holdDice }: DiceProps) {
  const diceStyle = isHeld ? "bg-gray-200" : "bg-white"
  return (
    <div 
      onClick={holdDice}
      className={`w-16 h-16 flex items-center justify-center ${diceStyle} border-2 border-gray-300 rounded-md shadow-md`}
    >
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  )
}

export default Dice
