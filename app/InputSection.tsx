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
    products,
    setProducts,
    coinsAvailability,
    setCoinsAvailability
  } = useMachineContext()

  const [errorText, setErrorText] = useState("Welcome")
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (selectedSlot === null) {
      return
    }

    if (cardInserted) {
      handleCardPayment()
      return
    }
    const diff = products[selectedSlot].price - insertedCash
    if (diff < 0) {
      try {
        handleCashPayment()
      } catch (error) {

      }
      return
    }
    setErrorText(`Insert card or ${diff} KRW more`)

  }, [cardInserted, insertedCash, selectedSlot, products])

  useEffect(() => {
    if (processing) {
      setErrorText("Processing...")
    }
  }, [processing])


  const handleCardPayment = () => {
    if (!selectedSlot) return
    setProcessing(true)
    // simulating asking confirmation to the bank with 1sec timeout
    setTimeout(() => {
      setProcessing(false)
      setProducts(products.map((product, index) => {
        if (index !== selectedSlot) return product
        product.quantity -= 1
        return product
      }))
      setSelectedSlot(null)
      setCardInserted(false)
      setErrorText("Payment accepted, thank you")
    }, 3000);
  }

  const handleCashPayment = () => {
    if (!selectedSlot) return
    setProcessing(true)
    let diff = insertedCash - products[selectedSlot].price
    // First intuiton was to use DP, but it is actually overkill in that situation
    // regarding korean won bills and coins values. Greedy algo will work fine.
    const coins = [10000, 5000, 1000, 500, 100]
    const usedCoins = []
    const availabities = {...coinsAvailability}
    let found = false
    while (diff > 0) {
      console.log(diff)
      found = false
      for (let i = 0; i < coins.length; ++i) {
        console.log(availabities[coins[i]])
        if (coins[i] <= diff && availabities[coins[i]] > 0) {
          usedCoins.push(coins[i])
          --availabities[coins[i]]
          diff -= coins[i]
          found = true
          break
        }
      }
      if (!found) {
        throw new Error("Impossible to give cash back");
      }
    }
    setCoinsAvailability(availabities)
    // TODO: add customers coins to the machine availabilities
    setProcessing(false)

  }

  const onNumeroChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    try {
      if (!value) {
        setErrorText("Welcome")
        setSelectedSlot(null)
        return
      }
      const number = Number.parseInt(value)
      if (number < products.length && number >= 0) {
        if (products[number].quantity < 1) {
          setErrorText("This product is not available anymore")
          setSelectedSlot(null)
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
        onChange={onNumeroChange} readOnly={processing} value={selectedSlot ?? ''}
        />

      <button className={`py-4 px-2 border rounded
        ${(cardInserted || processing) ? 'bg-gray-300 border-gray-400 text-gray-600' :
         'bg-white border-gray-700 text-black hover:bg-gray-100'}`}
         onClick={() => {
          if (processing) return
          setCardInserted(!cardInserted)
          }}>
          { cardInserted ? 'Remove ' : 'Insert ' }card
      </button>

      {!processing && <div className="flex flex-wrap gap-2">
        {[100, 500, 1000, 5000, 10000].map(amount => <CashButton key={'cash_' + amount} amount={amount}/>)}
      </div>}

      <div className="flex items-center">
        <span>Inserted Cash:</span>
        <div className="text-xl font-bold ml-5">{insertedCash} KRW</div>
      </div>
      <button className="bg-red-400 p-3" onClick={() => {
        if (processing) return
        setInsertedCash(0)
        }}>
        Get my money back
      </button>
      <div className="flex gap-4">{Object.keys(coinsAvailability).map((coin) => <div
        key={'coin_' + coin}
        className="flex"
      >
        <span>{coin}</span>:<span className="ml-2">{coinsAvailability[Number.parseInt(coin)]}</span>
      </div>)}</div>
    </div>
}

export default InputSection
