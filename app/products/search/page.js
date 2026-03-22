import { Suspense } from "react";
import ProductSearch from "@/components/ProductSearch/ProductSearch"

const page = () => {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
        <ProductSearch/>
    </Suspense>
  )
}

export default page