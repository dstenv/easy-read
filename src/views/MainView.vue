<script setup lang="ts">
import { ref } from 'vue';

interface floatImgType {
    active: string,
    inActive: string
}

    const tabbar = ref<Array<tabbaritem>>([
        {
            name: 'home',
            path: '/main/home',
            // 图片以/src开头即可s
            inactiveIcon: '/src/assets/Icon/icon_home.png',
            activeIcon: '/src/assets/Icon/icon_home_selected.png'
        },
        {
            name: 'discover',
            path: '/main/discover',
            // 图片以/src开头即可s
            inactiveIcon: '/src/assets/Icon/icon_dicover.png',
            activeIcon: '/src/assets/Icon/icon_discover_selected.png'
        },
        {
            name: 'serials',
            path: '/main/serials',
            // 图片以/src开头即可s
            inactiveIcon: '/src/assets/Icon/icon_serial.png',
            activeIcon: '/src/assets/Icon/icon_serial_selected.png'
        },
        {
            name: 'my',
            path: '/main/my',
            // 图片以/src开头即可s
            inactiveIcon: '/src/assets/Icon/icon_me.png',
            activeIcon: '/src/assets/Icon/icon_me_selected.png'
        }
    ])
    const active = ref(0)

</script>


<template>
    <div class="main">
        <div>
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" v-if="$route.meta.keepAlive"/>
                </keep-alive>
                <component :is="Component" v-if="!$route.meta.keepAlive"/>
            </router-view>
        </div>
        <van-tabbar v-model="active" route>
            <van-tabbar-item v-for="(item,index) in tabbar" :key="index" :to="item.path">
                <template #icon="props">
                    <img :src="props.active ? item.activeIcon : item.inactiveIcon" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<style lang="scss" scoped>
    .main {
        width: 100vw;
        height: 100vh;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    .van-tabbar {
        padding: 5rem 0;
        z-index: 5000;
        background-color: #fff;
        img {
            height: 42rem;
        }
    }
    
</style>