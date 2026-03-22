import EditBlog from "@/components/AdminLayout/Blogs/EditBlog"

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/get-all`);

  const data = await res.json();

  return data.map((b) => ({
    id: b._id.toString(),
  }));
}

const page = async({ params }) => {
  const { id } = await params
  return (
    <div>
      <EditBlog id={id} />
    </div>
  )
}

export default page