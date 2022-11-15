<template>
    <div class="register-form">
        <p class="title">注册账号</p>
        <div class="form-box">
            <div class="phone">
                <img src="/src/assets/Image/phone_icon.png">
                <input v-model="user.number" type="text" placeholder="账号">
                <img src="/src/assets/Image/phone_close.png" class="close" v-show="showClose[0]" @click="user.number = ''">
            </div>
            <div class="pwd">
                <img src="/src/assets/Image/phone_password_icon.png">
                <input v-model="user.pwd" :type="showPwd? 'text':'password'" placeholder="请输入密码">
                <img :src="showPwd? eyeIcon.active:eyeIcon.inActive" class="eyes" @click="showPwd = !showPwd">
                <img src="/src/assets/Image/phone_close.png" class="close" v-show="showClose[1]"  @click="user.pwd = ''">
            </div>
            <div class="privacy">
                <input type="checkbox" v-model="checkbox" class="check">
                <div>
                    <span class="read">我已阅读并同意</span><span>《用户服务协议》</span><span class="read">和</span><span>《隐私政策》</span>
                </div>
            </div>
            <button class="login-btn" @click="registerUser" :class="{'btn-active': clickBtn}">注册</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import {getUuidCode} from '@/LoginValid'
import router from '@/router';
import { Toast } from 'vant';

const user = ref<localUser>({
    number: '',
    pwd: '',
    token:''
})

const clickBtn = ref<boolean>(false)
const showClose = ref<Array<boolean>>([false,false])

const registerUser = ():void => {
    user.value.token = getUuidCode()
    let localUsers = localStorage.usersInfo
    if(localUsers) {
        localUsers = JSON.parse(localUsers)
        if(localUsers.filter((v:localUser) => v.number === user.value.number).length>0) {
            Toast.fail('用户已存在')
            return
        }else {
            localUsers = [...localUsers, {
                number: user.value.number,
                pwd: user.value.pwd,
                token: user.value.token
            }]
            localStorage.usersInfo = JSON.stringify(localUsers)
        }
    }else {
        localStorage.usersInfo = JSON.stringify([{
            number: user.value.number,
            pwd: user.value.pwd,
            token: user.value.token
        }])
    }
    Toast.success('注册成功')
    setTimeout(() => {
        router.replace('/login')
    }, 4);
    // localStorage.token = JSON.stringify(user.value.token)
}

const showPwd = ref<boolean>(false)
    const eyeIcon = ref<{
    active: string,
    inActive: string
}>({
    inActive: '/src/assets/Image/phone_password_invisible.png',
    active: '/src/assets/Image/phone_password_visible.png'
})
const checkbox = ref<boolean>(false)

const watchUser = (value:{
    number: string,
    pwd: string,
}) => {
        // console.log(user);
    if(value.number) {
        showClose.value[0] = true
    }else {
        showClose.value[0] = false
    }
    if(value.pwd) {
        showClose.value[1] = true
    }else {
        showClose.value[1] = false
    }
}

watch(user.value, (newv) => {
    watchUser(newv)
    if(checkbox.value && newv.number && newv.pwd) {
        clickBtn.value = true
    }else {
        clickBtn.value = false
    }
})

watch(checkbox, newv => {
    if(newv && user.value.number && user.value.pwd) {
        clickBtn.value = true
    }else {
        clickBtn.value = false
    }
})

</script>

<style lang="scss" scoped>
.register-form {
    padding: 20rem 50rem;
}
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
</style>