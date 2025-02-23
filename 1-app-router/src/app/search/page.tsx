import ClientComponent from "./client-component";
import ServerComponent from "./server-component";

interface SearchPageProps {
  searchParams: Promise<{ q: string }>;
}

// React Server Component(= page.tsx) 는 어떻게 async 키워드를 사용할 수 있는가?
// 서버 컴포넌트는 서버에서 실행된다.
// 데이터베이스 조회, API 호출 등 비동기 작업을 수행할 수 있으므로 비동기 작업에 대한 렌더링이 가능하다.

// 그럼 왜 Client Component 는 왜 동기적으로 실행되어야 하는가.
// 클라이언트 컴포넌트는 브라우저 환경에서 실행된다. 렌더링이 동기적으로 일어나야한다. 왜?
// React 는 컴포넌트 트리를 탐색하고 DOM 을 업데이트한다. 두 과정이 비동기 처리된다면 중단될 수 있다.
// 동기적 렌더링 흐름을 유지하고 useEffect() 내 에서 비동기 작업을 수행해야한다.

export default async function Page({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;

  // http://localhost:3000/search?q=2 접근
  console.log(q); // 2

  return (
    <div>
      Search Page: {q}
      <ClientComponent />
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
