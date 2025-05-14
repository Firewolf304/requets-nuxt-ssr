<script setup>
    import { ref } from 'vue'
    import { getTest } from '~/composables/API/auth';
    const config = useRuntimeConfig()
    const id = useCookie('id')?.value || '';
    const visible = ref(true)
    const authorized = ref(false)
    
    const { data, error } = await getTest(id, config.API_KEY)

    if (!error.value) {
        text.value = data.value || 'Нет данных'
    } else {
        text.value = ""
        console.error('Ошибка запроса:', error.value)
    }
    
</script>
<template>
    <CNavbar expand="lg" color-scheme="light" class="bg-light">
        <CContainer fluid>
            <CNavbarBrand href="#">Navbar</CNavbarBrand>
            <CNavbarToggler @click="visible = !visible"/>
            <CCollapse class="navbar-collapse" :visible="visible">
                <CNavbarNav>
                    <CNavItem>
                        <CNavLink href="#" active>Home</CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="#">Link</CNavLink>
                    </CNavItem>
                    
                </CNavbarNav>
            </CCollapse>
        </CContainer>
    </CNavbar>
</template>

<style>

</style>