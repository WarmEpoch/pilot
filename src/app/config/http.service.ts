import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

type selectedList = {
  list: {
    color: string;
    rawSrc: string;
    id: string;
  }[];
  pageNo: number;
  pageSize: number;
  totalPages: number;
}
type selectedRandom = {
  color: string;
  rawSrc: string;
  id: string;
}[]

export type selectedModel = {
  code: number;
  message: string;
  timestamp: number;
  data: selectedList & selectedRandom
};


type liveList = {
  src: string;
  id: string;
  coverTime: string;
}[]

export type liveModel = {
  code: number;
  message: string;
  timestamp: number;
  data: {
    list: liveList;
    pageNo: number;
    pageSize: number;
    totalPages: number;
  };
};

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }
  getSuggestion(s: string) {
    if (!s.trim()) {
      return of([]);
    }
    return this.http.get(`https://suggestion.baidu.com/su?p=3&ie=UTF-8&cb=&wd=${s.replace(/\s/g, '+')}`, {
      responseType: 'text'
    }).pipe(
      map((strValue: string) => {
        const parsedData = /s:(\[[\w\W]*\])/.exec(strValue) as RegExpExecArray
        const sArray: string[] = JSON.parse(parsedData[1])
        sArray[0] !== s && sArray.unshift(s)
        return sArray
      })
    );
  }
  getSelectedWallpaper(tag: string, pageNo: number, pageSize: number, random: boolean) {
    return this.http.get<selectedModel>(`https://api.wetab.link/api/wallpaper/${random ? 'random' : 'list'}`, {
      params: {
        client: 'pc',
        pageNo: pageNo,
        tag: tag,
        pageSize: pageSize
      }
    })
  }
  getliveWallpaper(pageNo: number, pageSize: number) {
    return this.http.get<liveModel>(`https://api.wetab.link/api/wallpaper/video-list`, {
      params: {
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }
  Login(username: string, password: string) {
    return this.http.post(`http://172.20.217.249:8/Demo_war_exploded/Login?username=${username}&password=${password}`, null, { observe: 'response' }).pipe(
      catchError(error => {
        console.log(error)
        return this.http.get(error.url).pipe(
          catchError(res => {
            console.log(res)
            return of(res)
          })
        )
      })
    )
  }
  // <{
  //   status: number,
  //   message: string,
  //   data?: {
  //     token: string
  //   }
  // }>
}
