import OrderDetails from "@/components/AdminLayout/Orders/OrderDetails."
import { Suspense } from "react"

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OrderDetails />
      </Suspense>
    </div>
  )
}

export default page