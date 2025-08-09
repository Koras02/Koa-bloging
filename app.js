const Koa = require("koa");
const Router = require("koa-router");
const serve = require("koa-static");
const livereload = require("koa-livereload");
const livereloadServer = require("livereload");

const app = new Koa();
const router = new Router();

// 1. LiveReload 서버 실행 (public 디렉토리 감시)
const liveServer = livereloadServer.createServer();
liveServer.watch(__dirname + "/public");

// 2. Koa-LiveReload 미들웨어 설정
app.use(livereload());

// 3. 정적 파일 서비스 (HTML, CSS, JS 등)
app.use(serve(__dirname + "/public"));

// 4. 라우팅 설정
router.get("/api", (ctx) => {
  ctx.body = { message: "API is working!" };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
