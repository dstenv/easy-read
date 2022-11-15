interface serialBaseType {
    id: number,
    category: number,
    cover: string,
    maketime: string,
    title: string,
    subtitle: string
}


// 连载列表数据结构
interface serialType extends serialBaseType{
    finished: true
    forward: string
    serial_id: number
}

// 连载章节数据结构
interface serialChapter extends serialBaseType {
    serial_list: Array<number>
}