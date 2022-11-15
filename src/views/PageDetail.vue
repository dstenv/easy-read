<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import {getPageDetail,getPageComment} from '@/apis/home'
import DetailHead from '@/components/Home/DetailHead.vue'
import AuthorList from '@/components/Home/AuthorList.vue'
import CommentList from '@/components/Home/CommentList.vue'
import MusicHeadVue from '@/components/Home/MusicHead.vue'
import FooterComponentVue from '@/components/FooterComponent.vue';
import { Toast } from 'vant';
import { useShareStore,useAudioStore } from '@/stores/counter'
import { storeToRefs } from 'pinia';

const shareStore = useShareStore()

const route = useRoute()
const audioStore = useAudioStore()
const {playArtist} = storeToRefs(audioStore)

const type = ref<string>('')
const engType = ref<string>('')
const pageID = ref<string>('')
const pageType = ref<Array<PageType>>([
    {
        text: '阅读',
        eng: 'essay'
    },
    {
        text: '问答',
        eng: 'question'
    },
    {
        text: '音乐',
        eng: 'music'
    },
    {
        text: '影视',
        eng: 'movie'
    },
    {
        text: '电台',
        eng: 'radio'
    },
    {
        text: '专栏',
        eng: 'topic'
    },
    {
        text: '连载',
        eng: 'serialcontent'
    },
])
const pageData = ref<PageContent>()
const commentData = ref<Array<PageComment>>()

onMounted(() => {
    type.value = route.query.type as string
    engType.value = pageType.value.filter( v=> v.text == route.query.type)[0].eng
    // console.log(type.value);
    pageID.value = route.query.id as string
    Toast.loading({
        message:'加载中...',
        forbidClick: true,
        duration: 0
    })
    getPageDetail(engType.value,pageID.value).then(res => {
        Toast.clear()
        pageData.value = res
        if(pageData.value) {
            pageData.value.content = res.json_content
            // pageData.value.content = res.html_content
        }
        console.log('文章详情', pageData.value );
        if(pageData.value?.audio != playArtist.value?.url) {
            audioStore.setIsPlay(false)
        }
    }).catch(() => {
        console.log('错误');
        Toast.clear()
        Toast.fail('网络错误')
    })
    getPageComment(engType.value,pageID.value,'0').then(res => {
        // console.log(res);
        if(res.data) {
            commentData.value = res.data
        }   
    })
})

const setShare = ():void => {
    shareStore.setShowShare(true) 
    if(pageData.value) {
        shareStore.setShareUrl(pageData.value.web_url)
    }
}

onBeforeUnmount(() => {
    // audioStore.setIsPlay(false)
    audioStore.setShowControl(false)
    audioStore.setCurrentTime(0)
})

</script>
<template>
    <div class="page-detail">
        <!-- v-if="pageData" -->
        <main >
            <section>
                <DetailHead 
                    v-if="pageData && engType != 'music' && engType != 'movie'" :engType="engType"
                    :type="type" :audio="pageData?.audio" :auchor="pageData?.anchor" :id="pageID"
                    :author="pageData?.content.simple_author[0]" :much="pageData?.content?.simple_author[1]"
                    :title="pageData?.content.title" :question_brief="pageData.content.question_brief"
                    :simple_answerer="pageData.content.simple_answerer" :cover="pageData.content.cover"
                />
                <MusicHeadVue 
                    v-if="pageData && (engType == 'music' || engType == 'movie')"
                    :audio_url="pageData.music_id" :title="pageData.title" :music_img="pageData.content.music_header?.cover"
                    :author="pageData.content.simple_author[0]" :background-img="pageData.content.music_header?.bg"
                    :data-article="pageData.content.oneDataArticle" :description="pageData.content.music_header?.info"
                    :id="pageID" :music_disk="pageData.content.music_header?.disk" :type="engType"
                />
            </section>
            <section >
                <div class="page-main" v-html="pageData?.content.content"></div>
            </section>
            <section class="sec3">
                <span>{{pageData?.content.editor}}</span>
                <span>{{pageData?.content.copyright}}</span>
            </section>
            <section class="sec4">
                <div class="title">
                    <h4>作者</h4>
                    <i></i>
                </div>
                <AuthorList 
                    v-for="item in pageData?.author_list" :key="item.user_id"
                    :img="item.web_url" :name="item.user_name" :summary="item.summary"
                />
            </section>
            <section class="sec4" v-if="commentData">
                <div class="title t2">
                    <h4>评论列表</h4>
                    <i></i>
                </div>
                <CommentList 
                    v-for="item in commentData" :key="item.user.user_id"
                    :content="item.content" :like_count="item.praisenum"
                    :user_img="item.user.web_url" :user_name="item.user.user_name"
                    :publish_time="item.input_date"
                />
            </section>
        </main>
        <FooterComponentVue 
            :praisenum="pageData?.praisenum" :commentnum="pageData?.commentnum"
            :web_url="pageData?.web_url"
        />
    </div>
</template>
<style lang="scss" scoped>
.page-detail {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
main {
    max-height: calc(100vh - 50rem);
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    section {
        padding: 0 20rem;
        &:first-of-type {
            padding: 0;
        }
    }
}
.page-main {
    overflow: hidden;
    width: 100%;
    ::v-deep .one-img-container {
        img {
            width: 100%;
        }
    }
    ::v-deep p {
        font-size: 14rem;
        letter-spacing: 1rem;
        line-height: 2;
        margin-bottom: 15rem;
    }
    ::v-deep .one-quote-warp {
        padding-top: 20rem;
        p {
            position: relative;
            left: 26rem;
            width: calc(100% - 26rem);
            color: #8f8d8d;
            margin-bottom: 0;
        }
    }
    ::v-deep strong {
        font-weight: bold;
    }
    ::v-deep a {
        color: #2059a1;
        text-decoration: underline;
    }
}
.sec3 {
    span {
        display: block;
        color: #8f8d8d;
        margin-bottom: 10rem;
        line-height: 1.5;
    }
}
.sec4 {
    margin-bottom: 15rem;
    .title {
        overflow: hidden;
        margin-bottom: 18rem;
        &.t2 {
            margin-bottom: 10rem;
        }
        h4 {
            margin-top: 20rem;
            font-size: 15rem;
            padding-bottom: 12rem;
        }
        i {
            display: block;
            width: 65rem;
            height: 4rem;
            background-color: #000;
        }
    }
}

</style>