<script setup>
    import { ref, onMounted } from 'vue'
    import { getTest } from '~/composables/API/auth'

    const id = useCookie('id')?.value || ''
    const visible = ref(true)
    const authorized = ref(false)
    const text = ref('')

    const login = () => {
        // Логика для авторизации
        //await navigateTo({path: "/login"})
        console.log('Авторизация')
    }

    const logout = () => {
        // Логика для выхода
        console.log('Выход')
        authorized.value = false
        text.value = ''
    }

    onMounted(async () => {
        try {
            const { data } = await getTest(id)
            if (data === 'Hello') {
                text.value = data
                authorized.value = true
            } else {
                text.value = ''
                authorized.value = false
            }
        } catch (error) {
            console.error('Ошибка запроса:', error)
            authorized.value = false
        }
    })
</script>

<template>
  <CNavbar expand="lg" color="danger" class="bg-light">
    <CContainer fluid>
      <CNavbarBrand href="#">Navbar-ADMIN</CNavbarBrand>
      <CNavbarToggler @click="visible = !visible" />
      <CCollapse class="navbar-collapse" :visible="visible">
        <CNavbarNav>
          <CNavItem>
            <CNavLink href="#" active>Home</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Link</CNavLink>
          </CNavItem>
          <CNavItem v-if="authorized">
            <CNavLink href="#">Авторизован: {{ text }}</CNavLink>
          </CNavItem>
        </CNavbarNav>
        <CNavbarNav class="ms-auto">
          <CNavItem v-if="!authorized">
            <CButton @click="login" color="primary">Авторизация</CButton>
          </CNavItem>
          <CNavItem v-if="authorized">
            <CButton @click="logout" color="danger">Выход</CButton>
          </CNavItem>
        </CNavbarNav>
      </CCollapse>
    </CContainer>
  </CNavbar>
</template>
