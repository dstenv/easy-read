import { 
    Tabbar, TabbarItem,Popup,Divider, Toast,
    List,Cell,Slider,PullRefresh,Skeleton,Icon,DatetimePicker,
} from 'vant';
import type { App } from 'vue';

const vantComponents = [
    Tabbar, TabbarItem,Popup,Divider,Toast,List,Cell,Slider,PullRefresh,
    Skeleton,Icon,DatetimePicker
]

export default {
    install(app: App) {
        vantComponents.forEach(v => {
            app.use(v)
        })
    }
}