interface tabbaritem {
    name: string,
    path: string,
    inactiveIcon: string,
    activeIcon: string
}

interface homeBase {
    title: string,
    forward: string,
    img_url: string,
    like_count: number,
    share_url: string
}

// 首页第一条数据初始数据结构
interface homeInit extends homeBase {
    id:string,
    words_info: string,
    pic_info: string,
    post_date: string
    volume: string
}

// 首页其他数据的数据结构 
interface homeData extends homeBase {
    type: string,
    author: string,
    category: string,
    author_url: string,
    volume: string,
    id: string,
    dataType: string
}

// 首页天气信息数据结构
interface homeWeather {
    city_name: string,
    climate: string,
    temperature: string,
    date: string
}

// 首页日期列表数据结构
interface timeList {
    id: number,
    cover: string,
    date: string
}

// 分享的列表结构
interface shareLink {
    text: string,
    id: number,
    img: string
}

// 首页文章分类数据结构
interface PageType {
    text: string,
    eng: string
}

// 文章内容数据结构
interface PageMain {
    content: string,
    copyright: string,
    editor: string,
    simple_author: Array<string>,
    title: string,
    type: string,
    cover: string,
    question_brief?:string,
    simple_answerer?:string,
    music_header?: {
        bg: string,
        copyright_img: string,
        cover: string,
        disk: string,
        info: string
    },
    oneDataArticle?: {
        cover: string,
        info: string,
        lyric: string
    }
}

// 文章详情数据结构 不同的文章类型结构不同
interface PageContent {
    anchor: string,
    audio: string,
    music_id?: string,
    commentnum: number,
    praisenum: number,
    title: string
    content: PageMain,
    author_list: Array<{
        user_id: string
        web_url: string,
        user_name: string,
        summary: string
    }>,
    web_url:string
}

// 文章评论数据结构
interface PageComment {
    user: {
        user_id: string,
        user_name: string,
        web_url: string,
    },
    input_date: string,
    content: string,
    praisenum: number,
}

// pinia里面的播放的音频数据结构
interface PiniaAudio {
    id: string,
    title: string | undefined,
    auchor: string | undefined,
    url: string | undefined,
    type: string | undefined
}

interface localUser {
    number: string,
    pwd: string,
    token: string
}

interface localPic {
    id: string | undefined,
    forward: string | undefined,
    post_date: string | undefined,
    img_url: string | undefined,
    volume: string | undefined
}

interface localMusic {
    id: string | undefined,
    img: string | undefined
    title: string | undefined
    subtitle: string | undefined
}

interface localArtist {
    id: string | undefined
    title: string | undefined
    author: string | undefined,
    type: string | undefined
}