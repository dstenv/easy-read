// 筛选条件数据结构
interface Filter {
    id: number | string,
    category: number,
    text: string,
    axios_url:string
    isArtist: boolean,
    eng: string 
}

interface brankContent {
    category: number,
    cover: string,
    id: string,
    title: string,
    weight?: number,
    subtitle: string
    serial_list?: Array<number>
    maketime?: string,
}

interface brankType {
    title: string,
    img_url?: string,
    id: number | string,
    contents?: Array<brankContent>,
    isTime: boolean
}

// 发现列表数据结构
interface artistType {
    id: number | string,
    category: number,
    cover: string,
    maketime?: string,
    subtitle?: string,
    title: string,
    is_stick?: boolean,
    content_id?: string,
    link_url?: string,
    like_count?: number,
    share_url?: string,
    volume?: string,
    content?: string,
    user?: {
        user_id:string,
        user_name:string,
        web_url: string
    },
    author?: {
        user_id:string,
        user_name:string,
        web_url: string
    },
    input_date?: string,
    img_url?: string,
    // 如果为空 则是地球
    addr?: string,
    diary_id?: string,
    time?:string,
    audio_url?: string
    isTime: boolean,
    contents?:Array<brankContent>,
    forward?: string,
    item_id?: string
}

// 专题详情
interface ToppicType {
    bg_color:string
    font_color:string
    commentnum: number
    praisenum: number
    web_url: string
    title: string
    json_content: {
        oneDataArticles: Array<artistType>
        special: {
            content: string | null,
            cover: string,
            title: string
        }
    }
}
