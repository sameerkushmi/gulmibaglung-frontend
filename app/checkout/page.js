import Checkout from "@/components/Checkout/Checkout"
import { Suspense } from "react"

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading checkout...</div>}>
        <Checkout />
      </Suspense>
    </div>
  )
}

export default page