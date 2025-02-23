interface BlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: BlogPageProps) {
  const { id } = await params;

  // Dynamic Route
  // URL Path Parameter 에 따라 Blog 페이지를 렌더링
  // http://localhost:3000/blog/1 접근
  console.log(id); // 1

  // http://localhost:3000/blog/1/1 접근
  // 404 page

  // [...id] 처럼 Catch All Segment 로 생성할 수 있다.
  // http://localhost:3000/blog/1/1/1 접근
  console.log(id); // [ '1', '1', '1' ]

  // http://localhost:3000/blog 로 접근
  // 404 page

  // [[...id]] Optional Catch All Segment 로 생성하면 book/ 이라는 경로만 만족하면 페이지가 렌더링된다.
  console.log(id); // undefined

  return <div>Blog Page: {id}</div>;
}
