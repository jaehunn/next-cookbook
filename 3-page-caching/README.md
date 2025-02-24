# Page Caching

- Full Route Cache

  - 빌드 시점에 페이지를 캐싱한다. (SSG)
  - /a 를 빌드 시점에 렌더링 해놓고 next server, full route cache 에 SET
  - 런타임에서 요청된 페이지는 항상 HIT 된 페이지가 된다.
  - Dynamic Page 복기, 빌드 시점에 생성되기 어려운 페이지
    - 클라이언트 컴포넌트는 분류 기준이 되지 않음. 무조건 동적 페이지.
    - 데이터 캐시가 될 수 없는 상황이면 Dynamic Page
    - 동적함수: headers(), cookies(), Page Props... 를 사용하면 Dynamic Page (브라우저 환경 의존)
    - 페이지를 구성하는 서버 컴포넌트들을 체크해보면 되겠다.

- 결론

  - 데이터 캐시가 무조건 되어야하고 동적 수를 안쓰면 Static Page
  - 하나라도 만족하지 못하면 Dynamic Page 가 된다.
  - Dynamic Page 가 되더라도 RM 될 수 있고, DC 될 수 있음. (물론 서버 컴포넌트에 한해서)

- Page Revalidate

  - 먼저 첫 페이지 요청은 FR 은 없으니까 MISS -> RM -> DC -> 백엔드 서버에서 데이터를 불러오면, DC SET -> RM SET -> FR SET 순서로 설정된다.
  - HIT 되다가 Revalidate 경과 후에 발생한 페이지 요청은
  - STALE 한 페이지를 일단 반환하고, Revalidate Data 를 DC SET -> FR SET 한다.
  - 이후 3초 전까지 다시 페이지를 HIT 시킬 수 있다.

- 결론

  - fetch() revalidate 설정된 컴포넌트가 있으면 DC 가 갱신되면서 FR 도 갱신된다.

- SSG 생성

  - build 시 Client Component 에서 클라이언트 훅을 사용하고 있다면 Suspense 되어야한다 useSearchParams() 는 쿼리스트링이 있을때 비동기로 동작함. 즉 Suspense fallback 으로 대체하여 서버 측에서 useSearchParams() 코드가 제외되어야한다.
  - 되도록이면 FR 페이지로 만드는게 좋다. force-cache 를 체크해보고 동적 함수가 필요한지 체크해보자.
  - 주의) revalidate 옵션은 Dynamic Page 로 설정하는 옵션은 아니다.
  - useSearchParams() 를 썼지만 Suspense fallback 으로 SSG 를 도왔고 빌드 시점에 생성된 페이지가 Full Route Cache 되었다. 물론 useSearchParams() 는 별도 클라이언트 청크로 빠져서 클라이언트에서 로드가 되겠지.
  - 이해해야 할 것은 온전히 하나의 페이지가 정적으로 생성되지않아도 페이지(일부)가 SSG 되었다고 말할 수 있고, 페이지 캐싱되었다고까지 말할 수 있는 것.
  - 동적 함수를 포기할 수 없는 상황에서는 Dynamic Page 가 불가피하다. 그래서 Dynamic Page + Data Cache 만 지정하는 방식도 있겠다.
  - searchParams 와 useSearchParams() 간 차이는 무엇일까.
    - searchParams 는 동적인 값으로 Dynamic Page 의 조건이 된다. 매 요청마다 서버에서 새로 렌더링한다. Pre-render 되므로 SEO 유리.
    - useSearchParams() + Suspense 조합은 Static Page 를 만들 수 있다. 매 요청마다 클라이언트에서 렌더링한다.
  - 동적 경로 페이지는 어떻게 SSG 할 수 있을까?
    - generateStaticParams 를 사용해서 Path Params 를 미리 만들어주면 된다.
    - Path Params 를 설정할 수 있다는 말은 보여질 페이지를 이미 다 안다는 것이다.
    - 당연히 예측할 수 없는 Path Params 는 어떤 것을 보고 미리 생성시킬 수가 없다.
  - dynamicParams = false 키워드로 동적 경로를 가지지않음을 나타낼 수 있다. 정의하지않은 경로로 접근하면 페이지 로직을 수행하지 않고 404 페이지를 렌더링한다.

- Route Segment

  - Route Segment 로 페이지를 강제로 dynamic, static 하게 지정할 수 있다.
  - auto -> 기본값 알아서 추론된다.
  - force-dynamic -> 무조건 dynamic, (full route cache 를 쓰지 않겠다.)
  - force-static -> 무조건 static (dynamic 페이지를 강제로 static 으로 만든다? > 의도대로 동작하지 않겠다.)
    - 실제 page props 인 searchParams 는 undefined 로 설정됨.
  - error -> 강제로 static 으로 변경한다. force-static 와 다르게 static page 가 될 수 없으면 오류를 발생시킴.
  - 그냥 쓰지말고 추론되도록 하는 것이 권장된다. +error 로 설정하고 개발에서 강제할 수 있겠다.

- Client Router Cache
  - 브라우저에 저장되는 캐시인데. 페이지 이동을 효율적으로 하기 위해서 페이지 일부 데이터를 보관하는 용도.
  - 다른 경로를 가지는 페이지를 요청할 때 공통 레이아웃을 두 번 요청할 수 있다.
    - 브라우저는 HTML + JS bundle + RSC Payload 를 받는데.
    - RSC Payload 마다 동일한 Server Component 들이 포함할 것. -> 비효율적
  - Next.js 는 클라이언트 단에서 중복된 RSC Payload 를 캐싱한다. (Next Server 아님)
  - 라우팅 이동 간에는 캐싱되는데. 리프레시하면 캐싱이 초기화된다. 브라우저에 의존.
