<template>
    <div class="login-form">
        <p class="title">密码登录</p>
        <div class="form-box">
            <div class="phone">
                <img src="/src/assets/Image/phone_icon.png">
                <input v-model="user.user_number" type="text" placeholder="账号">
                <img src="/src/assets/Image/phone_close.png" class="close" v-show="showClose[0]" @click="user.user_number = ''">
            </div>
            <div class="pwd">
                <img src="/src/assets/Image/phone_password_icon.png">
                <input v-model="user.user_pwd" :type="showPwd? 'text':'password'" placeholder="请输入密码">
                <img :src="showPwd? eyeIcon.active:eyeIcon.inActive" class="eyes" @click="showPwd = !showPwd">
                <img src="/src/assets/Image/phone_close.png" class="close" v-show="showClose[1]" @click="user.user_pwd = ''">
            </div>
            <span>忘记密码?</span>
            <div class="privacy">
                <input type="checkbox" v-model="checkbox" class="check">
                <div>
                    <span class="read">我已阅读并同意</span><span>《用户服务协议》</span><span class="read">和</span><span>《隐私政策》</span>
                </div>
            </div>
            <button class="login-btn" @click="validLogin" :class="{'btn-active': clickBtn}">登录</button>
        </div>
        <div class="login-type">
            <span></span>
            <span @click="emits('showRegister', true)">注册</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Toast } from 'vant';
import {useRouter} from 'vue-router'

const timer = ref<number | null>(null)
const router = useRouter()

const emits = defineEmits(['showRegister'])

const showPwd = ref<boolean>(false)
const showClose = ref<Array<boolean>>([false,false])
const clickBtn = ref<boolean>(false)
const eyeIcon = ref<{
    active: string,
    inActive: string
}>({
    inActive: '/src/assets/Image/phone_password_invisible.png',
    active: '/src/assets/Image/phone_password_visible.png'
})
const checkbox = ref<boolean>(false)
const user = ref<{
    user_number: string,
    user_pwd: string,
    token: string
}>({
    user_number: '',
    user_pwd: '',
    token: ''
})

const validLogin = () => {
    let users = localStorage.usersInfo
    if(users) {
        users = JSON.parse(users)
        let findUser = users.filter((v: localUser) => v.number == user.value.user_number)
        if(findUser.length == 0) {
            Toast.fail('无此用户，请注册')
        }
        else if(findUser[0].pwd != user.value.user_pwd) {
            Toast.fail('密码错误')
        }
        else {
            console.log('可以登录');
            localStorage.token = JSON.stringify(findUser[0].token)
            // router.replace('/main/home')
            router.back()
        }
    }else {
        // 跳转到注册页面
        Toast.fail('无此用户，请注册')
    }
}

// const watchUser = (value:{
//     user_number: string,
//     user_pwd: string,
// }) => {
//     if(timer) {
//         clearTimeout(timer.value as number)
//     }
//     timer.value = setTimeout(() => {
//         // console.log(user);
//         if(value.user_number) {
//             showClose.value[0] = true
//         }else {
//             showClose.value[0] = false
//         }
//         if(value.user_pwd) {
//             showClose.value[1] = true
//         }else {
//             showClose.value[1] = false
//         }
//         console.log(showClose.value);
//     },500)
// }

const watchUser = (value:{
    user_number: string,
    user_pwd: string,
}) => {
        // console.log(user);
    if(value.user_number) {
        showClose.value[0] = true
    }else {
        showClose.value[0] = false
    }
    if(value.user_pwd) {
        showClose.value[1] = true
    }else {
        showClose.value[1] = false
    }
}

watch(user.value, (newv) => {
    watchUser(newv)
    if(checkbox.value && newv.user_number && newv.user_pwd) {
        clickBtn.value = true
    }else {
        clickBtn.value = false
    }
})

watch(checkbox, newv => {
    if(newv && user.value.user_number && user.value.user_pwd) {
        clickBtn.value = true
    }else {
        clickBtn.value = false
    }
})

</script>

<style lang="scss" scoped>
::-webkit-input-placeholder {
    color: rgb(168, 168, 168);
    font-size: 13rem;
}
.login-form {
    padding: 20rem 50rem;
    .title {
        font-size: 13rem;
    }
    .form-box {
        padding-bottom: 10rem;
        padding-top: 30rem;
        input {
            width: 100%;
            box-sizing: border-box;
            padding-left: 40rem;
            height: 40rem;
            font-size: 14rem;
            border-top: none;
            border-right: none;
            border-left: none;
            margin-bottom: 10rem;
            border-bottom: 1rem solid #ddd;
        }
        .phone,
        .pwd {
            overflow: hidden;
            position: relative;
            img {
                position: absolute;
                left: 0;
                bottom: 17rem;
                width: 30rem;
            }
            .close {
                width: 25rem;
                left: calc(100% - 25rem);
            }
        }
        .pwd {
            padding-bottom: 5rem;
            .eyes {
                width: 25rem;
                left: calc(100% - 25rem);
            }
            img{
                bottom: 22rem;
            }
            .close {
                left: calc(100% - 60rem);
            }
        }
        .privacy {
            margin-top: 5rem;
            display: flex;
            align-items: center;
            white-space: nowrap;
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
        .login-btn {
            width: 100%;
            height: 35rem;
            border-radius: 5rem;
            background-color: #dcdcdc;
            color: white;
            pointer-events: none;
            font-size: 14rem;
            letter-spacing: 1rem;
            border: none;
            &.btn-active {
                pointer-events: auto;
                background-color: #333333;
            }
        }
    }
    .login-type {
        display: flex;
        justify-content: space-between;
    }
}
</style>