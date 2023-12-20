import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

const app = createApp(App);

app.use(router);

app.mount("#app");
