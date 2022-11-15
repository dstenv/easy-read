import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // 网络请求基准路径
  const baseAxiosUrl:string = 'https://apis.netstart.cn/one/'
  // http://v3.wufazhuce.com:8000/api/channel/one/0/0
  // const baseAxiosUrl:string = 'http://v3.wufazhuce.com:8000/api/'
  const DateTime = ref<Array<string>>([])
  const DateYear = ref<number>(new Date().getFullYear())
  const DateMon = ref<number>(new Date().getMonth() + 1)
  const setDateTime = (date:Array<string>):void => {
    DateTime.value = date
  }
  const setDateMon = (mon: number):void => {
    DateMon.value = mon
  }
  const setDateYear = (year:number):void => {
    DateYear.value = year
  }

  return { 
    baseAxiosUrl,DateTime,DateMon,DateYear,
    setDateTime,setDateMon,setDateYear 
  }
})

export const useShareStore = defineStore('share',() => {
  const showShare = ref<boolean>(false)
  const shareUrl = ref<string>('')
  const setShowShare = (isShow: boolean):void => {
    showShare.value = isShow
  }
  const setShareUrl = (url: string) :void => {
    shareUrl.value = url
  }
  return { showShare,shareUrl,setShowShare,setShareUrl }
})

// 音频模块
export const useAudioStore = defineStore('audio',() => {
  // 正在播放的文章
  const playArtist = ref<PiniaAudio>()
  // 有声阅读是否开始播放
  const isPlay = ref<boolean>(false)
  // 电台是否开始播放
  const radioIsPlay = ref<boolean>(false)
  // 是否显示播放控制器
  const showControl = ref<boolean>(false)

  // 播放的时间和时长
  const currentTime = ref<number>(0)
  const duration = ref<number>(0)

  
  const setPlayArtist = (artist: PiniaAudio | undefined) => {
    playArtist.value = artist
  }
  const setIsPlay = (artist_status: boolean) => {
    isPlay.value = artist_status
  }
  const setRadioIsPlay = (radio_status: boolean) => {
    radioIsPlay.value = radio_status
  }
  const setShowControl = (controller_status: boolean) => {
    showControl.value = controller_status
  }
  const setCurrentTime = (time: number) => {
    currentTime.value = time
  }
  const setDuration = (dur: number) => {
    duration.value = dur
  }
  return {
    playArtist,
    isPlay,
    showControl,
    currentTime,
    duration,
    radioIsPlay,
    setPlayArtist,
    setIsPlay,
    setShowControl,
    setCurrentTime,
    setDuration,
    setRadioIsPlay
  }
})


