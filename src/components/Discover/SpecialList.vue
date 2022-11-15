<template>
    <div class="special-list" >
        <router-link :to="'/specaildetail/' + props.list.content_id">
            <div v-if="!props.list.isTime">
                <img :src="props.list.cover">
                <span>{{props.list.title}}</span>
            </div>
        </router-link>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    list: artistType
}>()
</script>

<style lang="scss" scoped>
.special-list {
    width: 100%;
    overflow: hidden;
    &>a{
        &>div{
            margin-bottom: 20rem;
            padding-bottom: 10rem;
            border-radius: 10rem;
            border: 1rem solid rgb(161, 161, 161);
            box-shadow: 0 2rem 5rem 1rem #ebebeb;
        }
    }
    img {
        width: 100%;
        display: block;
        border-radius: 10rem 10rem 0 0;
    }
    span {
        display: block;
        margin: 8rem 10rem 0;
        font-size: 13rem;
    }
}
</style>