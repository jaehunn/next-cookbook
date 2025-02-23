// App Router 에서 모든 컴포넌트는 서버 컴포넌트가 디폴트 값이다.

// JS 를 이용한 상호작용이 있어야한다면 Client Component 로 개발하고, 나머지는 Server Component 로 개발한다.
// Link 로 이동하는 건 HTML 고유의 기능이므로 JS 상호작용으로 분류할 수 없다.

export default function Page(props: unknown) {
  console.log(Object.keys(props ?? {})); // [ 'params', 'searchParams' ]

  // secretKey 는 브라우저에서 알지 못한다.
  const secretKey = "secret";
  console.log(secretKey);

  // 정말로 JS Bundle 로 포함되지않는지 확인하고 싶다면?
  // next build
  // ○ /                                    157 B           105 kB (Static)

  // TODO: .next 에 생성되는 파일들에 대해서 확인해보자.

  return <div>Home Page</div>;
}
