import axios from 'axios'
import { useShareStore,useCounterStore } from '@/stores/counter'
import pinia from '@/stores/store' 
import { storeToRefs } from 'pinia';


const useStore = useCounterStore(pinia)
const { baseAxiosUrl } = useStore

const shareStore = useShareStore()
const { showShare } = storeToRefs(shareStore)

export const MyAxios = async (url:string, params = {}) => {
    let res = await axios({
        method: 'get',
        url: baseAxiosUrl + url,
        params
    })
    return res
}

export const setShare = (url: string):void => {
    shareStore.setShowShare(true) 
    shareStore.setShareUrl(url)
}

import { useAudioStore } from '@/stores/counter'
import {getPageDetail} from './home'
import type { Router } from 'vue-router';
const audioStore = useAudioStore()
const { playArtist,isPlay,radioIsPlay }  = storeToRefs(audioStore)

export const setAudioArtist = async (type: string,id: string,isChange: boolean) => {
    if(isChange) {
        audioStore.setRadioIsPlay(!radioIsPlay.value)
    }else {
        let res:PageContent = await getPageDetail(type,id)
        console.log(res);
        audioStore.setPlayArtist({
            id,
            title: res.title,
            auchor: res.author_list[0].user_name,
            url: res.audio,
            type
        })
        audioStore.setRadioIsPlay(true)
    }
}


export const faviorArtist = (router: Router) => {
    let local_token = localStorage.token
    let users = localStorage.usersInfo
    if(local_token && users && JSON.parse(users).filter((v: localUser) => v.token == JSON.parse(local_token)).length > 0) {
        // 可以收藏
        console.log('收藏成功');
    }else {
        // 跳转到登录页
        router.push('/login')
    }
}


