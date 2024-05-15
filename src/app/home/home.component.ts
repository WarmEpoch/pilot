import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpService } from '../config/http.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { DrawerService, IDrawerOpenResult } from 'ng-devui';
import { StoreService } from '../config/store.service';
import { HelperUtils } from 'ng-devui/common';
import { SettingComponent } from '../setting/setting.component';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  constructor(private httpService: HttpService, private drawerService: DrawerService, public storeService: StoreService, private router: Router) {}

  engineOptions = [
    {
      name: '必应',
      value: 'https://cn.bing.com/search?q=%s'
    },
    {
      name: '百度',
      value: 'https://www.baidu.com/s?wd=%s'
    },
    {
      name: '谷歌',
      value: 'https://www.google.com/search?q=%s'
    }
  ]
  engineValue = this.engineOptions[0]
  searchValue = ''
  Search() {
    this.searchSubject.next(this.searchValue)
  }

  private searchText$ = new Subject<string>();

  private searchSubject = new Subject<string>();

  searchOptions: string[] = []

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(event.url !== '/'){
          this.OpenSetting()
        };
      }
    });
    if(this.router.url !== '/'){
      this.OpenSetting()
    }
    this.searchText$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.httpService.getSuggestion(value)),
    ).subscribe(suggestion => {
      this.searchOptions = suggestion
    })
    this.searchSubject
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
      )
      .subscribe(() => {
        HelperUtils.jumpOuterUrl(this.engineValue.value.replace('%s', encodeURIComponent(this.searchValue)));
        // window.open(this.engineValue.value.replace('%s', encodeURIComponent(this.searchValue)))
      });
  }

  SearchInput() {
    this.searchOptions = []
  }

  SearchChange() {
    this.searchText$.next(this.searchValue)
  }

  @ViewChild('settingContent', { static: true })
  settingContent!: TemplateRef<SettingComponent>;

  setting!: IDrawerOpenResult;

  OpenSetting() {
    if(this.setting){
      this.setting.drawerInstance.show();
    }else{
      this.setting = this.drawerService.open({
        contentTemplate: this.settingContent,
        width: '600px',
        zIndex: 1000,
        isCover: true,
        backdropCloseable: true,
        escKeyCloseable: true,
        position: 'right',
        destroyOnHide: false,
        onClose: () => {
          this.router.navigate(['/']);
        },
      });
    }
  }

  tabActiveId: string | number = 1;
  tabsDisplay = [
    {
      id: 1,
      name: 'Home',
      icon: 'icon-homepage',
    },
    {
      id: 2,
      name: 'Home',
      icon: 'icon-go-cloud-ide',
    },
    {
      id: 3,
      name: 'Home',
      icon: 'icon-publish',
    },
  ];

}
