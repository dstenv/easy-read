<template>
    <div class="no-user">
        <header>
            <img src="/src/assets/Image/indi_head_day.png" >
            <img src="/src/assets/Icon/my-set.png" class="set">
        </header>
        <div class="mask"></div>
        <main>
            <section class="sec1">
                <img src="/src/assets/Image/sign_up.png" @click="checkbox? router.push('/login'):Toast('登录/注册前情先阅读并同意相关协议')">
                <p>还没有账号?点击<a @click="checkbox? router.push('/register'):Toast('登录/注册前情先阅读并同意相关协议')">注册</a></p>
                <div class="privacy">
                    <input type="checkbox" v-model="checkbox" class="check">
                    <div>
                        <span class="read">我已阅读并同意</span><span>《用户服务协议》</span><span class="read">和</span><span>《隐私政策》</span>
                    </div>
                </div>
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
import { Toast } from 'vant';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const checkbox = ref<boolean>(false)

</script>

<style lang="scss" scoped>
header {
    position: relative;
    img {
        width: 100%;
    }
    .set {
        position: absolute;
        left: 20rem;
        top: 20rem;
        width: 25rem;
    }
}
.no-user {
    position: relative;
    height: calc(100vh - 60rem);
    .mask {
        position: absolute;
        bottom: 0;
        width: 100%;
        left: 0;
        height: 370rem;
        background: linear-gradient(358deg, #fff, #f4f3f7,rgba(255,255,255,.6));
        z-index: 1;
        filter: blur(24rem);
    }
}
main {
    section {
        position: relative;
        z-index: 5;
    }
    .sec1 {
        display: flex;
        flex-direction: column;
        text-align: center;
        img {
            display: block;
            width: 80rem;
            margin: 0 auto;
        }
        p {
            margin: 15rem 0 10rem;
        }
        a {
            text-decoration: underline;
            color: #000;
        }
        .privacy {
            margin-top: 5rem;
            display: flex;
            align-items: center;
            white-space: nowrap;
            justify-content: center;
            .check {
                margin: 0;
                flex: none;
                width: 15rem;
                border-radius: 50%;
            }
            div {
                margin-left: 3rem;
                .read {
                    color: rgb(151, 151, 151);
                }
            }
        }
    }
}
footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 5;
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
</style>