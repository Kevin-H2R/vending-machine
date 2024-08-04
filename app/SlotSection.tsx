import MachineSlot from "@/components/MachineSlot"
import { useMachineContext } from "@/utils/MachineContext"

const SlotSection = () => {
  const {products, selectedSlot} = useMachineContext()
  return <div className="flex flex-wrap">
      {products.map((product, index) => <MachineSlot
        key={'product_' + index} product={product} index={index} selected={selectedSlot === index} />)}
  </div>
}

export default SlotSection
