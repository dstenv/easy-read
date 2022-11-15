<template>
    <div class="author-list">
        <div class="left">
            <div class="img" :style="{'background-image': `url(${props.img})`}"></div>
            <div class="info">
                <p>{{props.name}}</p>
                <span>{{props.summary}}</span>
            </div>
        </div>
        <div class="right">
            <button>关注</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    img: string | undefined,
    name: string | undefined,
    summary: string | undefined
}>()
</script>

<style lang="scss" scoped>
.author-list {
    align-items: center;
    display: flex;
    justify-content: space-between;
    .left {
        display: flex;
        .img {
            width: 40rem;
            height: 40rem;
            background-size: cover;
            border-radius: 50%;
        }
        .info {
            padding-left: 10rem;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            p {
                font-size: 13.8rem;
            }
            span {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: block;
                color: #939393;
            }
        }
    }
    .right {
        button {
            outline: none;
            background-color: #fff;
            padding: 8rem 10rem;
            color: #646464;
            border: 1rem solid #b4b4b4;
        }
    }
}
</style>