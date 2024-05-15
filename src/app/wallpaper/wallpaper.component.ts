import { Component, OnInit } from '@angular/core';
import { StoreService } from '../config/store.service';
import { HttpService, liveModel, selectedModel } from '../config/http.service';

@Component({
  selector: 'app-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrls: ['./wallpaper.component.sass']
})
export class WallpaperComponent implements OnInit {
  constructor(public storeService: StoreService, private httpService: HttpService){

  }

  ngOnInit() {
    this.OpenLive()
  }

  tabActiveId: string | number = "selected"

  selectedCover = 'https://static.wetab.link/hitab/wallpaper-cover/'
  selected = [
    {
      title: '自然',
      cover: 'natrue',
      tag: 'nature'
    },
    {
      title: '建筑',
      cover: 'structure',
      tag: 'architecture'
    },
    {
      title: '动物',
      cover: 'animal',
      tag: 'animals'
    },
    {
      title: '旅行',
      cover: 'travel',
      tag: 'travel'
    },
    {
      title: '美食',
      cover: 'food',
      tag: 'food-drink'
    },
    {
      title: '动漫',
      cover: 'Anime',
      tag: 'anime'
    },
    {
      title: '运动',
      cover: 'sport',
      tag: 'athletics'
    },
    // {
    //   title: '技术',
    //   cover: 'technology',
    //   tag: 'technology'
    // },
    {
      title: '街头',
      cover: 'street',
      tag: 'street-photography'
    }
  ]

  selectedWallpaper!: selectedModel["data"]["list"]
  
  selectedOptions = {
    tag: '',
    total: 0,
    pageSize: 8,
    pageIndex: 1,
    random: false
  }

  liveWallpaper!: liveModel["data"]["list"];

  liveOptions = {
    total: 0,
    pageSize: 8,
    pageIndex: 1,
  }

  OpenSelected(tag: string = this.selectedOptions.tag){
    console.log(this.selectedOptions)
    this.selectedOptions.tag !== tag && (this.selectedOptions.pageIndex = 1)
    this.selectedOptions.tag = tag
    this.httpService.getSelectedWallpaper(tag, this.selectedOptions.pageIndex - 1, this.selectedOptions.pageSize, this.selectedOptions.random).subscribe(res => {
      if(this.selectedOptions.random){
        this.selectedWallpaper = res.data
      }else{
        this.selectedOptions.total = res.data.totalPages * this.selectedOptions.pageSize
        this.selectedWallpaper = res.data.list
      }
    })
  }
  
  UpSelected(active: number) {
    this.selectedOptions.random = !this.selectedOptions.random
    if(active == 1){
      this.OpenSelected()
    }
  }

  OpenLive(){
    this.httpService.getliveWallpaper(this.liveOptions.pageIndex - 1, this.liveOptions.pageSize).subscribe(res => {
      this.liveOptions.total = res.data.totalPages * this.liveOptions.pageSize
      this.liveWallpaper = res.data.list
    })
  }

}
