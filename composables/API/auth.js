import axios from "axios";

//const error_template = (reason = "", message = "Error API", system = true) => { return {reason: reason, message : message, system: system}; };
const authApi = axios.create({
    baseURL: '/api/auth'
})

export const getLogin = (id, api_key) => {
    
}
const postLogin = async (login, password) => {
  try {
    const body = btoa(JSON.stringify({ login: login, password: password }));
    const config = useRuntimeConfig();
    const router = useRouter();
    const res = await $fetch(`${config.public.baseURL}/api/auth/login`, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        'SHORT-API-KEY': useCookie('SHORT-API-KEY').value
      },
    });

    if (res?.accepted && res?.status === 200) {
      useCookie('id').value = res.id_session;
      useCookie('user_id').value = res.user_id;
      useCookie('user').value = res.user;
      await router.push('/admin');
    } else {
      alert('Неверный логин или пароль');
    }
  } catch (err) {
    console.error('Ошибка авторизации:', err);
    alert('Ошибка авторизации');
  }
};

export const getTest = async (id, api_key) => {
    //const error = useError("")
    const config = useRuntimeConfig();
    let status = false;
    try {
        const resp = await useFetch(`${config.public.baseURL}/api/auth/test`, {
            headers: {
                Cookie: `id=${id}`,
                'SHORT-API-KEY' : useCookie("SHORT-API-KEY") || '',
            },
        });
        status = resp.status === 200
        //error.value = createError()
    } catch(err) {
        console.log(`error Test: ${err}`)
        //error.value = createError()
    }
    //if(error.value) console.error(`Error test ${error.value}`)
    return { status };
};