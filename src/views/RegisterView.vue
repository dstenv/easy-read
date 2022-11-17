<template>
    <div class="register">
        <main>
            <section>
                
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">



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
            display: block;
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