<template>
    <div class="login">
        <header>
            <img src="/src/assets/Image/login_head.png">
            <img src="/src/assets/Image/phone_back_white.png" @click="router.back()" class="back">
            <img src="/src/assets/Image/ali_login_one_logo.png" class="logo">
        </header>
        <main>
            <section>
                <LoginFormVue v-if="!isRegister" @showRegister="toggleRegister"/>
                <RegisterFormVue v-if="isRegister" @closeRegister="toggleRegister"/>
            </section> 
        </main>
        <footer>
            <span>其他登录方式</span>
                <div class="login-type">
                    <img src="/src/assets/Icon/bubble_wechat.png" >
                    <img src="/src/assets/Icon/bubble_weibo.png" >
                    <img src="/src/assets/Icon/bubble_qq.png" >
                </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import LoginFormVue from '@/components/Login/LoginForm.vue';
import { onBeforeMount, ref } from 'vue';
import RegisterFormVue from '@/components/RegisterForm.vue'

import {useRoute, useRouter} from 'vue-router'
const router = useRouter()
const route = useRoute()
const isRegister = ref<boolean>(false)

onBeforeMount(() => {
    // console.log(route.query);
    isRegister.value = (route.query.registerText as string)? true:false
})

const toggleRegister = (value: boolean) => {
    isRegister.value = value
}

</script>

<style lang="scss" scoped>
.login {
    width: 100vw;
    height: 100vh;
    position: relative;
    header {
        position: relative;
        width: 100%;
        img {
            width: 100%;
        }
        .back,
        .logo {
            position: absolute;
            left: 20rem;
        }
        .back {
            width: 40rem;
            top: 70rem;
        }
        .logo {
            left: 0;
            right: 0;
            margin: auto;
            top: 78rem;
            width: 100rem;
        }
    }
    footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding-bottom: 20rem;
        text-align: center;
        span {
            color: rgb(157, 157, 157);
            display: block;
            margin-bottom: 10rem;
        }
        .login-type {
            width: 60%;
            display: flex;
            margin: 0 auto;
            justify-content: space-between;
            img {
                width: 35rem;
            }
        }
    }
}
</style>