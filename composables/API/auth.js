import axios from "axios";

const error_template = (reason = "", message = "Error API", system = true) => { return {reason: reason, message : message, system: system}; };
const authApi = axios.create({
    baseURL: '/api/auth'
})

export const getLogin = (id, api_key) => {
    
}

export const getTest = (id, api_key) => {
    const error = useError();
    const config = useRuntimeConfig();
    let status = false;
    try {
        const resp = useFetch(`${config.public.baseURL}/api/auth/test`, {
            headers: {
                Cookie: `id=${id}`,
                'X-API-KEY' : api_key,
            },
        });
        status = resp.status === 200
        error.value = error_template(message = resp.data)
    } catch(err) {
        error.value = createError()
    }
    if(error.value) console.error(`Error test ${error.value}`)
    return { status, error };
};