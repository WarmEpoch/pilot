import { Injectable } from "@angular/core";

@Injectable()
export class StoreService {
    private KEY = 'STORE'
    public store = {
        backgroundImage: "https://infinitypro-img.infinitynewtab.com/wallpaper/architecture/pad_architecture_2.jpg",
        backgroundVideo: "",
        backgroundState: false,
    }
    
    constructor(){
        window.addEventListener("beforeunload", () => {
            localStorage.setItem(this.KEY, JSON.stringify(this.store))
        })
        // try{
        //     const localState = localStorage.getItem(KEY)
        //     localState && store.replaceState({...store.state, ...JSON.parse(localState)})
        // }catch{
        //     alert("本地存储数据异常")
        // }
        const localState = localStorage.getItem(this.KEY)
        localState && (this.store = {...this.store, ...JSON.parse(localState)})
    }

    SetBackgroundImage(s: string){
        this.store.backgroundImage = s
        this.store.backgroundState = false
    }

    SetBackgroundVideo(s: string){
        this.store.backgroundVideo = s
        this.store.backgroundState = true
    }

}