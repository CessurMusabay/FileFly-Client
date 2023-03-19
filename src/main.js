import './assets/main.css'
import "primevue/resources/themes/vela-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import {createApp} from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {createRouter, createWebHistory} from "vue-router";

import UploadForm from "@/components/UploadForm.vue";
import DownloadFile from "@/components/DownloadFile.vue";
import PageNotFound from "@/components/PageNotFound.vue";

const routes = [
    {path: '/', component: UploadForm, name: 'root'},
    {path: '/file/:id', component: DownloadFile, name: 'file'},
    {path: '/:pathMatch(.*)*', component: PageNotFound}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


axios.defaults.baseURL = "http://127.0.0.1:8000/"

const app = createApp(App)
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')
