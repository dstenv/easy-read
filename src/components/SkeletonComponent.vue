<script lang="ts" setup>
import { computed } from '@vue/reactivity';

const props = defineProps<{
    nums: number
}>()


interface numData {

}

const numArr = computed(():Array<numData> => {
    return new Array(props.nums + 1)
})

</script>
<template>
    <ul class="list">
        <li v-for="(item,index) in numArr" :key="index">
            <div v-if="index == 0">
                <van-divider  content-position="center">{{new Date().getMonth() + 1}}月</van-divider>
            </div>
            <div v-if="index >= 1">
                <div class="top"></div>
                <span></span>
            </div>
        </li>
    </ul>
</template>
<style lang="scss" scoped>
    @keyframes skeletonColor {
        0% {
            background-color: #ebebeb;
        }
        50% {
            background-color: #f7f8f9;
        }
        100% {
            background-color: #ebebeb;
        }
    }
    .list {
        width: 100%;
        flex-wrap: wrap;
        display: flex;
        &>li {
            &:first-of-type {
                display: block;
                width: 100%;
            }
            &:nth-of-type(n+2) {
                flex: none;
                width: calc(50% - 5rem);
                margin-bottom: 10rem;
                border: 1rem solid transparent;
                overflow: hidden;
                
                .top {
                    background-color: #ebebeb;
                    animation: skeletonColor 2s ease-in-out infinite;
                    width: 100%;
                    height: 103.45rem;
                }
                span {
                    margin: 15rem 0;
                    display: block;
                    background-color: #ebebeb;  
                    animation: skeletonColor 2s ease-in-out infinite;
                    height: 40rem;
                }
            }
            &:nth-of-type(2n) {
                margin-right: 10rem;
            }
        }
    }
</style>