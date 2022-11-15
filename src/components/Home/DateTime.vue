<script setup lang="ts">
import { getHomeData } from '@/apis/home'
import { onMounted, ref, watch } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'
import { computed } from '@vue/reactivity'


const props = defineProps<{
    isSelectTime:boolean,
    selTime:string,
    homeWeather: homeWeather | undefined
}>()



// console.log(props);
const emits = defineEmits([
    'changeSel',
    'changeselTime'
])

const pulldeg = ref<number>(0)

const store = useCounterStore()
const { DateTime } = storeToRefs(store)



const showTime = () => {
    pulldeg.value += 180
    emits('changeSel', !props.isSelectTime)
}


</script>

<template>
    <div class="date-time">
        <nav>
            <div class="left" @click="showTime">
                <span class="day">{{ DateTime[0] ? DateTime[0] : new Date().getDate() }}</span>
                <span>{{ DateTime[1] ? DateTime[1] : new Date().toDateString().split(' ')[1] }} .{{ DateTime[2] ?
                        DateTime[2] : new
                            Date().getFullYear()
                }}</span>
                <div class="pull-box" :style="{ transform: `rotate(${pulldeg}deg)` }">
                    <div class="pull"></div>
                </div>
            </div>
            <div class="right">
                <span>{{ props.homeWeather?.city_name }}</span>&nbsp;
                <span>{{ props.homeWeather?.climate }}</span>&nbsp;
                <span>{{ props.homeWeather?.temperature }}℃</span>
            </div>
        </nav>
    </div>
</template>

<style lang="scss" scoped>
nav {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 15rem;

    .left {
        position: relative;
        padding-right: 15rem;

        .day {
            font-family: '微软雅黑';
            font-size: 24rem;
            margin-right: 2rem;
        }

        span {
            font-family: 'fangsong';
            font-weight: bold;

        }

        .pull-box {
            height: 100%;
            position: absolute;
            right: 0;
            top: 0;
            transition: all .3s ease-in-out;
            transform-origin: center calc(100% - 10rem + 5rem);
        }

        .pull {
            position: relative;
            top: 65%;
            width: 0;
            height: 0;
            border-top: 7rem solid black;
            border-right: 4rem solid transparent;
            border-bottom: 3rem solid transparent;
            border-left: 4rem solid transparent;
        }
    }

    .right {
        color: #bdbdbd;
    }
}
</style>