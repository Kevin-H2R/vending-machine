import { Product } from "@/utils/types"


const MachineSlot = ({product, index}: {product: Product, index: number}) => {
  return <div className="flex flex-col border p-5">
    <div className="flex">{product.name}</div>
    <div className="flex">{product.price} KRW</div>
    <div className="flex mt-5 items-center">
      <span>N°:</span>
      <span className="text-xl ml-2">{index}</span>
    </div>
  </div>
}

export default MachineSlot
