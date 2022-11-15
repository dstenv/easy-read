<template>
    <div class="register">
        <header>
            <img src="/src/assets/Image/login_head.png">
            <img src="/src/assets/Image/phone_back_white.png" @click="router.back()" class="back">
            <img src="/src/assets/Image/ali_login_one_logo.png" class="logo">
        </header>
        <main>
            <section>
                <RegisterFormVue />
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">


import RegisterFormVue from '@/components/RegisterForm.vue'

import {useRouter} from 'vue-router'
const router = useRouter()


</script>

<style lang="scss" scoped>
.register {
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
}
</style>