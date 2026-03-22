import ProductDetail from "@/components/ProductDetail/ProductDetail"

export async function generateStaticParams(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/get-all`)

  const data = await res.json()

  return data.products.map(p => ({
    slug: p._id
  }))
}

const page = async({params}) => {

  const {slug} = await params

  return (
    <div>
        <ProductDetail slug={slug} />
    </div>
  )
}

export default page