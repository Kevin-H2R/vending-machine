import { useMachineContext } from "@/utils/MachineContext"

const CashButton = ({amount}: {amount: number}) => {

  const {
    setInsertedCash,
    insertedCash,
    cardInserted,
    coinsAvailability,
    setCoinsAvailability
  } = useMachineContext()

  const addValue = () => {
    // limiting to 50000 just for the sake of big number sides effect
    if (cardInserted || insertedCash > 50000) return
    const copy = {...coinsAvailability}
    copy[amount] += 1
    setCoinsAvailability(copy)
    setInsertedCash(insertedCash + amount)
  }
  return <button className={ cardInserted ?
    'bg-gray-300 border-gray-400 text-gray-600 p-2':
    'bg-white border-gray-700 p-2 text-black'}
  onClick={addValue}>{amount} KRW</button>
}

export default CashButton
