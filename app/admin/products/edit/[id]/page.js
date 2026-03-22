import EditProduct from "@/components/AdminLayout/Products/EditProduct"

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/get-all`);

  const data = await res.json();

  return data.products.map((p) => ({
    id: p._id.toString(),
  }));
}

const page = async ({ params }) => {
  const { id } = await params
  return (
    <div>
      <EditProduct id={id} />
    </div>
  )
}

export default page