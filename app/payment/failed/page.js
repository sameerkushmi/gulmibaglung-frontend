import Failed from "@/components/Payment/Failed/Failed"
import { Suspense } from "react"

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Processing payment result...</div>}>
        <Failed />
      </Suspense>
    </div>
  )
}

export default page