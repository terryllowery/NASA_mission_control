import {Router} from './dep.ts'

import * as planets from "./models/planets.ts"

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

router.get("/planets", (ctx) => {
    ctx.response.body = planets.getAllPlanets()
})

export default router