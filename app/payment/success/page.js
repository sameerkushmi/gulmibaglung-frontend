import Success from "@/components/Payment/Success/Success"
import { Suspense } from "react"

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Verifying payment...</div>}>
        <Success />
      </Suspense>
    </div>
  )
}

export default page