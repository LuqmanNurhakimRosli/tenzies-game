interface DiceProps {
  value: number;
  isHeld: boolean;
  holdDice: () => void;
}

type DotPositions = {
  [key: number]: string[]
}

function Dice({ value, isHeld, holdDice }: DiceProps) {
  const diceStyle = isHeld ? "bg-green-200" : "bg-white"
  
  return (
    <div onClick={holdDice}  
      className={`w-16 h-16 ${diceStyle} border-2 border-gray-300 rounded-lg shadow-md 
      cursor-pointer hover:shadow-lg transition-shadow grid grid-cols-3 grid-rows-3 gap-0.5 p-2`}>
      {[...Array(value)].map((_, i) => (
        <div key={i} 
          className={`rounded-full bg-black w-2.5 h-2.5 
          ${getDotPosition(value, i)}`}
        />
      ))}
    </div>
  )
}

function getDotPosition(value: number, index: number): string {
  const positions: DotPositions = {
    1: ["col-start-2 col-span-1 row-start-2"],
    2: ["col-start-1 row-start-1", "col-start-3 row-start-3"],
    3: ["col-start-1 row-start-1", "col-start-2 row-start-2", "col-start-3 row-start-3"],
    4: ["col-start-1 row-start-1", "col-start-3 row-start-1", 
        "col-start-1 row-start-3", "col-start-3 row-start-3"],
    5: ["col-start-1 row-start-1", "col-start-3 row-start-1", 
        "col-start-2 row-start-2",
        "col-start-1 row-start-3", "col-start-3 row-start-3"],
    6: ["col-start-1 row-start-1", "col-start-3 row-start-1",
        "col-start-1 row-start-2", "col-start-3 row-start-2",
        "col-start-1 row-start-3", "col-start-3 row-start-3"]
  }
  
  if (!positions[value] || !positions[value][index]) {
    return "";
  }
  
  return positions[value][index];
}

export default Dice