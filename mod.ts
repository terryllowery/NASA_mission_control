import {Application} from "./dep.ts"

const app = new Application()
const PORT = 8000

app.use(async (ctx, next) => {
    await next();
    const responseTime = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} - ${ctx.request.url} - Response: ${ctx.response.status} - Response Time: ${responseTime}`)
});
app.use(async(ctx, next) => {
    const start = Date.now();
    await next();
    const delta = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${delta}ms`);
})
app.use((ctx) => {
    ctx.response.body = `
        #     #    #     #####     #    
        ##    #   # #   #     #   # #   
        # #   #  #   #  #        #   #  
        #  #  # #     #  #####  #     # 
        #   # # #######       # ####### 
        #    ## #     # #     # #     # 
        #     # #     #  #####  #     # `
})

if(import.meta.main) {
await app.listen({
    port: PORT
})
}