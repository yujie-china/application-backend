import registerIcons from "@/global/register-icons"
import "normalize.css"
import { createApp } from "vue"
import App from "./App.vue"
import "./assets/css/index.less"
import "./mock/index.ts"
import router from "./router"
import pinia from "./store"

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(registerIcons)
app.mount("#app")
