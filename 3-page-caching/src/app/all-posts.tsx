export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default async function AllPosts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    // data cache 되어야 pag efull route cache 조건에 만족한다.
    cache: "force-cache",
  });

  if (!response.ok) {
    return <p>Failed to fetch posts</p>;
  }

  const posts: Post[] = await response.json();

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
