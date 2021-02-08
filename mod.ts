import {Application} from "./dep.ts"

const app = new Application()
const PORT = 8000

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