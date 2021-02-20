import {Application, send} from "./dep.ts"

import api from "./api.ts"

const app = new Application()
const PORT = 8000

app.use(async (ctx, next) => {
    // access downstream middleware
    await next();
    const responseTime = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} - ${ctx.request.url} - Response: ${ctx.response.status} - Response Time: ${responseTime}`)
});
app.use(async(ctx, next) => {
    const start = Date.now();
    // access downstream middleware
    await next();
    const delta = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${delta}ms`);
});
app.use(api.routes())

app.use(async (ctx) => {
    const filePath = ctx.request.url.pathname
    const fileWhitelist = [
        "/index.html",
        "/javascripts/script.js",
        "/stylesheets/style.css",
        "/images/favicon.png",
    ]
    if(fileWhitelist.includes(filePath)) {
        await send(ctx, filePath, {root: `${Deno.cwd()}/public`, })
    }
    
});

if(import.meta.main) {
await app.listen({
    port: PORT
})
}