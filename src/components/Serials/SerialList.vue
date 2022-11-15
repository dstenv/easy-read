<template>
    <router-link :to="`/allbrank/${props.serialItem.serial_id}/${props.serialItem.title}/连载/1`">
        <div class="serial-list">
            <div class="top">
                <img v-lazy="props.serialItem.cover">
                <div class="info">
                    <span>#&nbsp;{{props.serialItem.finished? '已完结':'连载中'}}</span>
                    <h3>{{props.serialItem.title}}</h3>
                </div>
            </div>
            <div class="btm">
                <p>{{props.serialItem.forward}}</p>
                <span>{{props.serialItem.subtitle}}</span>
            </div>
        </div>
    </router-link>
</template>

<script setup lang="ts">
const props = defineProps<{
    serialItem: serialType
}>()
</script>

<style lang="scss" scoped>
.serial-list {
    overflow: hidden;
    background-color: #fff;
    margin-bottom: 25rem;
    border-radius: 10rem;
}
.top {
    border-radius: 10rem;
    position: relative;
    .info {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 10rem 10rem 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 15rem;
        color: #fff;
        h3 {
            font-size: 18rem;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    img {
        border-radius: 10rem 10rem 0 0;
        width: 100%;
        display: block;
    }
}
.btm {
    padding: 10rem 15rem;
    color: #c2c1c0;
    p,
    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    p {
        color: #a8a8a8;
        font-size: 14rem;
        margin-bottom: 7rem;
    }
    span {
        display: block;
    }
}
</style>