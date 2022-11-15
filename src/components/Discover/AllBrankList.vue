<template>
    <div class="all-brank-list">
        <div class="left">
            <img :src="props.pic">
            <span class="topic" v-if="!props.isSerial">No.{{props.top}}</span>
        </div>
        <div class="right">
            <p>{{props.title}}</p>
            <span>{{props.subtitle}}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    top?: number,
    pic?:string,
    title?:string,
    subtitle?:string,
    isSerial?:boolean
}>()
</script>

<style lang="scss" scoped>
.all-brank-list {
    overflow: hidden;
    margin-bottom: 15rem;
    display: flex;
    &:first-of-type {
        .topic {
            opacity: 1;
        }
    }
    &:nth-of-type(n+3) {
        .topic {
            background-color: #ca903b;
        }
    }
}
.left {
    border-radius: 10rem;
    position: relative;
    .topic {
        position: absolute;
        left: 0;
        top: 0;
        background-color: #c54e4b;
        display: inline-block;
        color: #fff;
        padding: 2rem 7rem;
        border-radius: 10rem 0 10rem 0;
        opacity: .7;
    }
    img {
        width: 60rem;
        border-radius: 10rem;
        display: block;
    }
}
.right {
    padding-left: 15rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    max-width: calc(100% - 60rem);
    p,
    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    p {
        font-size: 14rem;
    }
    span  {
        display: block;
        color: #c0c0c0;
    }
}
</style>