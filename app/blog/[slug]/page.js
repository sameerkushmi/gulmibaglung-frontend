import BlogDetail from "@/components/Blog/BlogDetail"

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/get-all`);

  const data = await res.json();

  return data.map((b) => ({
    slug: b._id.toString(),
  }));
}

const BlogDetailPage = async ({ params }) => {

  const { slug } = await params
  return (
    <div>
      <BlogDetail slug={slug} />
    </div>
  )
}

export default BlogDetailPage