<template>
    <div class="time-list">
        <ul class="list">
            <li v-for="item in year" :key="item">
                <span :class="{active: selectYear === item}" @click="emits('changeTime',item)">{{item}}</span>
            </li>
        </ul>
        <img src="/src/assets/Icon/discover_icon_search.png" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    year: Array<number>,
    selectYear: number
}>()

const emits = defineEmits(['changeTime'])
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
    display: none;
}
.time-list {
    display: flex;
    align-items: center;
    img {
        height: 20rem;
    }
}
.list {
    width: calc(100% - 30rem);
    overflow-x: auto;
    margin-right: 10rem;
    display: flex;
    li {
        padding: 10rem 0;
        span {
            font-size: 13rem;
            display: inline-block;
            margin-right: 15rem;
            padding: 5rem 8rem;
            border-radius: 999rem;
            background-color: #e0e0e0;
            &.active {
                color: #fff;
                background-color: #333534;
            }
        }
    }
}
</style>