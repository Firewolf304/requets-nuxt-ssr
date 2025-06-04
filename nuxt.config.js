// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    app: {
        baseURL: process.env.NODE_ENV === 'development' ? (process.env.BASE_PREFIX || '/dev/') : '/',
    },
    routeRules: {
        "/" : {
            ssr:true,
        }
    },
    hooks: {
        'pages:extend'(routes) {
            for (const route of routes) {
                if (route.path.startsWith('/admin')) {
                    routes.push({...route, path: route.path.replace('/admin', '/prefix-admin-panel')});
                }
            }
        }
    },
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    devServer: {
        port: 3001,
        host: '127.0.0.1',
    },
    modules: ['@nuxt/content', '@nuxt/scripts', '@nuxtjs/tailwindcss'],
    build: {
        transpile: ['vue-types', '@coreui/vue']
    },
    runtimeConfig: {
        API_KEY: process.env.API_KEY,
        REDIS_URL: process.env.REDIS_URL,
        API_USER_AGENT: process.env.API_USER_AGENT,
        public:{
            baseURL: process.env.API_URL || 'http://127.0.0.1:85',
            depricatedPaths: [
                '/admin/*'
            ]
        }
    }
})
console.log(`STATUS = ${process.env.NODE_ENV } | PREFIX = ${process.env.BASE_PREFIX || '/dev/'}`)