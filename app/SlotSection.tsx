import MachineSlot from "@/components/MachineSlot"
import { useMachineContext } from "@/utils/MachineContext"

const SlotSection = () => {
  const {products} = useMachineContext()
  return <div className="flex basis-2/3 grow-0 flex-wrap">
      {products.map((product, index) => <MachineSlot
        key={'product_' + index} product={product} index={index} />)}
  </div>
}

export default SlotSection
