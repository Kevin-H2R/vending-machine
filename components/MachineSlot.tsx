import { Product } from "@/utils/types"


type MachineSlotType = {
  product: Product
  index: number,
  selected: boolean
}

const MachineSlot = ({product, index, selected}: MachineSlotType) => {
  return <div className={"flex flex-col border p-5" + (selected ? ' bg-green-800' : '') }>
    <div className="flex">{product.name}</div>
    <div className="flex">{product.price} KRW</div>
    <div className="flex">Available: {product.quantity}</div>
    <div className="flex mt-5 items-center">
      <span>N°:</span>
      <span className="text-xl ml-2">{index}</span>
    </div>
  </div>
}

export default MachineSlot
