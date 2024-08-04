import CashButton from "@/components/CashButton"
import { useMachineContext } from "@/utils/MachineContext"
import { useEffect, useState } from "react"

const InputSection = () => {
  const {
    selectedSlot,
    setSelectedSlot,
    cardInserted,
    setCardInserted,
    insertedCash,
    setInsertedCash,
    products
  } = useMachineContext()

  const [errorText, setErrorText] = useState("Welcome")

  useEffect(() => {
    if (selectedSlot === null) {
      return
    }

    if (cardInserted) {
      // next step
      handleCardPayment()
      return
    }
    const diff = products[selectedSlot].price - insertedCash
    if (diff < 0) {
      handleCashPayment()
      return
    }
    setErrorText(`Insert card or ${diff} KRW more`)

  }, [cardInserted, insertedCash, selectedSlot, products])


  const handleCardPayment = () => {
    // simulating asking confirmation to the bank with 1sec timeout
    setTimeout(() => {

    }, 1000);
  }

  const handleCashPayment = () => {

  }

  const onNumeroChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    try {
      if (!value) {
        setErrorText("Welcome")
        return
      }
      const number = Number.parseInt(value)
      if (number < products.length && number >= 0) {
        if (cardInserted) {
          // next step
          return
        }
        setSelectedSlot(number)
        return
      }
      setSelectedSlot(null)
      setErrorText("Invalid product number")
    } catch (error) {
      console.log("Not a Number")
      setSelectedSlot(null)
    }
  }

  return <div className="flex flex-col gap-4">
      Screen:
      <div className="border p-6 h-72">
        {errorText}
      </div>
      <input type="number" placeholder="Product n°" className="text-black"
        onChange={onNumeroChange}
        />
      <button className={`py-4 px-2 border rounded
        ${cardInserted ? 'bg-gray-300 border-gray-400 text-gray-600' :
         'bg-white border-gray-700 text-black hover:bg-gray-100'}`}
         onClick={() => setCardInserted(!cardInserted)}>
          { cardInserted ? 'Remove ' : 'Insert ' }card
      </button>
      <div className="flex flex-wrap gap-2">
        {[100, 500, 1000, 5000, 10000].map(amount => <CashButton key={'cash_' + amount} amount={amount}/>)}
      </div>
      <div className="flex items-center">
        <span>Inserted Cash:</span>
        <div className="text-xl font-bold ml-5">{insertedCash} KRW</div>
      </div>
      <button className="bg-red-400 p-3" onClick={() => setInsertedCash(0)}>
        Get my money back
      </button>
    </div>
}

export default InputSection
