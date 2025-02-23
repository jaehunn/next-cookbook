# App Router

Page Routing

- Dynamic Route
- Catch All Segment
- Optional Catch All Segment

Layout

- Route Groups

React Server Component (React v18^)

- React Server Component 가 없었던 Page Router 는?
- 렌더링 플로우

  - Client -> Server
  - Server 에서 JS 실행 및 렌더링
  - Client 에 HTML 반환 (FCP)
  - Sever 에서 JS Bundle 반환
  - Client 에서 JS Bundle 실행 (Hydration)
  - Client 에서 상호작용 가능 (TTI)

- JS Bundle 로 제공한 Client React Component 는 서버에서 한번 클라이언트에서 1번 -> 총 2번이 실행된다.

- Hydration 이 필요하지않은 컴포넌트(Server Component)는 Bundle 에서 제외하자.
- 서버 컴포넌트는 서버에서 한 번 실행되고 클라이언트는 서버 컴포넌트의 존재를 알지 못한다.

- Client Component: Pre-render &Hydration
- Server Component: Pre-render

- 주의 사항

  - 서버 컴포넌트에는 브라우저 코드가 포함되면 안된다.
  - 클라이언트 컴포넌트는 서버에서도 실행된다.
  - 클라이언트 컴포넌트에서 서버 컴포넌트를 import 할 수 없다.
  - 서버 컴포넌트에서는 클라이언트 컴포넌트에 직렬화되지 않는 Props 는 전달하지 못한다. (= 함수)
    - 복잡한 구조의 데이터를 네트워크 상으로 전송하기 위해 단순한 형태로 변경하는 것을 직렬화라고 한다.
    - JS 함수는 직렬화가 불가능하다. 함수 컨텍스트 환경을 모두 표현하는 것이 불가능하다. (렉시컬 스코프, 클로저 등)

- 서버 컴포넌트는 Pre-rendering 에서 한 번 실행된다.
  - 이 때 HTML 을 구성할 때 서버 컴포넌트만 따로 먼저 실행한다. 서버 컴포넌트는 RSC Payload JSON 문자열로 직렬화된다. 렌더링된 결과, 클라이언트 컴포넌트들의 위치, 클라이언트 컴포넌트로 전달하는 Props.
  - RSC Payload 가 만들어지고 클라이언트 컴포넌트가 렌더링되어서 Pre-rendered HTML 이 만들어진다.
  - 함수 Prop은 직렬화하지 못하므로 Runtime Error 가 발생한다.

Navigating

- Request -> JS Bundle -> JS Execution -> Rendering

  - Request 가 일어나기 전 JS Bundle 을 미리 로드할 수 있다 (Pre-fetching)
  - App Router
    - JS Bundle + RSC Payload 이 Pre-fetching 되어야한다.
    - Hydration 을 위한 JS Bundle 이므로 Pre-render 이후에 발생하는 것이다.
  - `<Link/>` 컴포넌트로 설정한 페이지는 Pre-fetching 된다.
  - Production Mode 에서 동작한다. (build -> start)

- next/navigation 의 useRouter()
