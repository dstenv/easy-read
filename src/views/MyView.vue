<template>
    <div class="my">
        <MyUserVue v-if="isLogin"/>
        <NoUserVue v-if="!isLogin"/>
    </div>
</template>

<script setup lang="ts">

import MyUserVue from '@/components/My/MyUser.vue';
import NoUserVue from '@/components/My/NoUser.vue';

import { onBeforeMount, ref } from 'vue';

const isLogin = ref<boolean>(false)

onBeforeMount(() => {
    let users = localStorage.usersInfo
    let token = localStorage.token
    if(users && token && JSON.parse(users).filter((v:localUser) => v.token == JSON.parse(token)).length>0) {
        isLogin.value = true
    }else {
        isLogin.value = false
    }
})

</script>

<style lang="scss" scoped>

</style>