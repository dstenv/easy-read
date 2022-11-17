<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useShareStore } from '@/stores/counter'
import Clipboard from 'clipboard'
import { Toast } from 'vant';
import { getIconUrl } from '@/apis/utils';

const shareStore = useShareStore()
const { showShare,shareUrl } = storeToRefs(shareStore)

const shareLinks = ref<Array<shareLink>>([
    {
        id: 1,

        text: '朋友圈',
        img: getIconUrl('bubble_moment.png'),
    },
    {
        id: 2,

        text: 'WeChat',
        img: getIconUrl('bubble_wechat.png'),
    },
    {
        id: 3,
        text: '微博',
        img: getIconUrl('bubble_weibo.png'),
    },
    {

        id: 4,
        text: 'QQ',
        img: getIconUrl('bubble_qq.png'),
    },
    {
        id: 5,

        text: '链接',
        img: getIconUrl('bubble_copy_link.png'),
    },
])


let clipboard = new Clipboard(".share-item", {
    text: function () {
        return shareUrl.value;
    }
});
clipboard.on("success", function () {
    // console.log("站点链接已复制成功，请粘贴！");
    Toast.success('链接复制成功')
});

clipboard.on("error", function () {
    // console.log("此浏览器不支持复制功能，请更换最新版！");
    Toast.fail('浏览器不支持复制功能')
});

</script>
<template>
    <div class="share" @click="shareStore.setShowShare(false)">
        <Transition name="share-animate">
            <ul class="share-list" v-show="showShare">
                <li class="share-item" v-for="item in shareLinks" :key="item.id">
                    <img v-lazy="item.img">
                </li>
            </ul>
        </Transition>
    </div>
</template>
<style lang="scss" scoped>
.share {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: .95;
    z-index: 6001;
}

.share-list {
    &>li {
        margin-bottom: 35rem;

        &:last-of-type {
            margin-bottom: 0;
        }
    }

    img {
        height: 36rem;
    }
}

.share-animate-enter-from,
.share-animate-leave-to {
    transform: scaleY(.2);
}

.share-animate-enter-active,
.share-animate-leave-active {
    transition: all .25s ease-in-out;
}

.share-animate-enter-to,
.share-animate-leave-from {
    transform: scaleY(1);
}
</style>