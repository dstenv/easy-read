<template>
    <div class="read-list">
        <div v-if="!props.list.isTime">
            <div class="left">
                <img v-lazy="props.list.cover" >
            </div>
            <div class="right">
                <p>{{props.list.title}}</p>
                <span>{{props.list.subtitle}}</span>
            </div>
        </div>
        <div v-if="props.list.isTime" style="display: block;">
            <van-divider content-position="center"
                :style="{color: '#9a9a9a',margin: '5rem'}"
            >
                {{props.list.time?.split('-')[1]}}&nbsp;月
            </van-divider>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    list: artistType
}>()
</script>

<style lang="scss" scoped>
.read-list {
    display: flex;
    margin-bottom: 14rem;
    &>div {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 0 20rem;
        font-size: 12rem;
    }
    .left {
        border-radius: 8rem;
        img {
            width: 60rem;
            border-radius: 8rem;
        }
    }
    .right {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-left: 15rem;
        width: calc(100% - 60rem);
        p {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 14.5rem;
        }
        span {
            display: block;
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            color: #bfbfbf;
        }
    }
}
</style>