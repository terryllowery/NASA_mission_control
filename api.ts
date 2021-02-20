import {Router} from './dep.ts'

const router = new Router()

router.get("/", (ctx) => {
    ctx.response.body = `
    #     #    #     #####     #    
    ##    #   # #   #     #   # #   
    # #   #  #   #  #        #   #  
    #  #  # #     #  #####  #     # 
    #   # # #######       # ####### 
    #    ## #     # #     # #     # 
    #     # #     #  #####  #     # 
           Mission Control API`
})

export default router