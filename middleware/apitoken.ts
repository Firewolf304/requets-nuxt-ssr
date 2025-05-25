export default defineNuxtRouteMiddleware(async (event) => {
    const config = useRuntimeConfig();
    const token = useCookie('SHORT-API-KEY', {
        watch: true,
        secure: true
    });
    console.log(token.value)
    if(token.value) {
        console.log("Existing token:", token.value);
        try{
            const res = await $fetch(`${config.public.baseURL}/api/auth/api-key`, {
                method: 'GET',
                headers: {
                    'SHORT-API-KEY': token.value,
                    'User-Agent' : useRequestHeader("User-Agent") || ""
                },
            });
            token.value = res?.session
        } catch(err) {
            token.value = undefined
        }
        console.log("KEY: ", token.value)
    }
    if (!token.value) {
        console.log("Refresh key")
        try {
            const res = await $fetch(`${config.public.baseURL}/api/auth/api-key`, {
                method: 'POST',
                headers: {
                    'X-API-KEY': config.API_KEY,
                    'User-Agent' : config.API_USER_AGENT || "",
                    'Set-User-Agent' : useRequestHeader("User-Agent") || "null",
                    "Sec-Ch-Ua" : useRequestHeader("Sec-Ch-Ua") || "",
                    "Sec-Ch-Ua-Platform" : useRequestHeader("Sec-Ch-Ua-Platform") || "",
                },
            })
            console.log(res)
            token.value = res.session; 
            //refreshCookie('SHORT-API-KEY');
            console.log(`NEY KEY: ${token.value}`)
        } catch (err) {
                console.error('Ошибка при получении токена', err)
        }
    }
})
