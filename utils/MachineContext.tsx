import { createContext, ReactNode, useContext, useState } from "react";
import { ProductSlot } from "./types";

type MachineContextProps = {
  cardInserted: boolean
  selectedSlot: number | null
  insertedCash: number
  setCardInserted: (value: boolean) => void
  setSelectedSlot: (numero: number | null) => void
  setInsertedCash: (value: number) => void
  products: ProductSlot[]
  setProducts: (products: ProductSlot[]) => void
  coinsAvailability: {[key: number]: number}
  setCoinsAvailability: (availabities: {[key: number]: number}) => void
}

const MachineContext = createContext<MachineContextProps | undefined>(undefined)

const MachineProvider = ({children}: {children: ReactNode}) => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [cardInserted, setCardInserted] = useState<boolean>(false)
  const [insertedCash, setInsertedCash] = useState<number>(0)
  const [coinsAvailability, setCoinsAvailability] = useState<{[key: number]: number}>({
    100: 10,
    500: 10,
    1000: 10,
    5000: 10,
    10000: 10
  })

  // I hard-coded those, fetching it from a DB would be preferable
  const productList: ProductSlot[] = [
    {name: 'Cola', price: 1100, quantity: 10},
    {name: 'Water', price: 600, quantity: 1},
    {name: 'Coffee', price: 700, quantity: 10},
    {name: 'Cola', price: 1100, quantity: 10},
    {name: 'Coffee', price: 700, quantity: 10},
    {name: 'Cola', price: 1100, quantity: 10},
    {name: 'Cola', price: 1100, quantity: 10},
    {name: 'Water', price: 600, quantity: 10},
    {name: 'Coffee', price: 700, quantity: 10},
    {name: 'Coffee', price: 700, quantity: 10},
    {name: 'Water', price: 600, quantity: 10},
  ]


  const [products, setProducts] = useState(productList)
  return <MachineContext.Provider value={{
    selectedSlot, cardInserted, insertedCash,
    setCardInserted, setSelectedSlot, setInsertedCash,
    products, setProducts,
    coinsAvailability, setCoinsAvailability
  }}>
    {children}
  </MachineContext.Provider>
}

const useMachineContext = (): MachineContextProps => {
  const context = useContext(MachineContext);
  if (!context) {
    throw new Error('must be used inside a MachineProvider');
  }
  return context;
};

export { MachineProvider, useMachineContext };
