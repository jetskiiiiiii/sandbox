export default async function CreatePageLoad({
  params
}: {
  params: Promise<{ post_id: string }>
}) {
  const { post_id } = await params

  return (
    <div>My post: {post_id}</div>
  )
}
