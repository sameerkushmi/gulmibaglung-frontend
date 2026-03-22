import EditUser from "@/components/AdminLayout/Users/EditUser"

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/all`);
  const data = await res.json();

  const users = data?.users || [];

  return users.map((u) => ({
    id: u._id.toString(),
  }));
}

const page = async ({ params }) => {

  const { id } = await params
  return (
    <div>
      <EditUser id={id} />
    </div>
  )
}

export default page