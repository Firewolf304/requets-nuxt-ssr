import { defineNuxtRouteMiddleware, useRuntimeConfig } from '#imports';

export default defineNuxtRouteMiddleware((to, from) => {
    const conf = useRuntimeConfig();
    const l = conf.public.depricatedPaths;
    console.log(l)
    const reg = l.map(path => new RegExp(path));
    console.log(reg);

    const isDeprecated = reg.some(regex => regex.test(to.path));
    if (isDeprecated) {
        return clearError({ statusCode: 404, message: 'Undefined link' });
    }
});