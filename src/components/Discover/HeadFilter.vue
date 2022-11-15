<template>
    <div class="head-filter">
        <ul class="list">
            <li 
                v-for="item in props.selList" :key="item.text"
                :class="{active: item.text == props.selType}" 
                @click="emits('changeType',item.text)"
            >
                <span>{{item.text}}</span>
            </li>
        </ul>
        <img src="/src/assets/Icon/discover_icon_search.png" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    selList: Array<Filter>,
    selType: string
}>()
const emits = defineEmits(['changeType'])
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
    display: none;
}
.head-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
        height: 20rem;
    }
}
.list {
    display: flex;
    width: calc(100% - 30rem);
    overflow-x: auto;
    min-height: 40rem;
    align-items: center;
    &>li {
        flex: none;
        margin-right: 30rem;
        font-size: 14rem;
        transition: transform .1s linear;
        color: #afb0b3;
        &:first-of-type {
            margin-left: 20rem;
            
        }
        &:last-of-type {
            margin-right: 15rem;
        }
        &.active {
            transform: scale(1.5);
            color: #000;
            span {
                font-weight: bold;
            }
        }
    }
}
</style>