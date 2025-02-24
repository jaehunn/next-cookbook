import AllPosts from "./all-posts";
import Footer from "./footer";

/**
 * Route (app)                              Size     First Load JS
 * ┌ ○ /                                    333 B           106 kB
 * └ ○ /_not-found                          979 B           106 kB
 * + First Load JS shared by all            105 kB
 *   ├ chunks/4bd1b696-f414345eef8ea63b.js  52.9 kB
 *   ├ chunks/517-a57e62003aabb69c.js       50.5 kB
 *   └ other shared chunks (total)          1.86 kB
 *
 * .next/server/app/index.html 이 생성된 것을 확인.
 *
 * .next/server 와 .next/static 은 무슨 폴더를 말하는 것일까.
 * .next/server 는 서버 사이드에서 생성된 결과물
 * .next/static 은 클라이언트 사이드에서 로드될 결과물
 *
 * http://localhost:3000/_next/static/chunks/app/page-7a6dd3d6cae437aa.js 가 Footer 컴포넌트가 된다.
 * 이 파일은 클라이언트 청크로 빠져서 클라이언트에서 로드가 된다.
 */

export default function HomePage() {
  return (
    <div>
      Home Page
      <AllPosts />
      <Footer />
    </div>
  );
}
