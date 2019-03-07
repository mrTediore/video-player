import { Component, OnInit } from '@angular/core';
import { LinksService } from './services/links.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  title = 'video-player';
  showBookmarks = false;
  bookmarksNumber:number = 0;
  bookmarksSubscription: Subscription;
  
  constructor(private linksService:LinksService){}

  ngOnInit() {
    this.bookmarksSubscription = this.linksService.bookmarksSubject.subscribe(
      (bookmarks:String[])=>{
        this.bookmarksNumber = bookmarks.length;
      }
    );
    this.linksService.emitBookmarks();
  }

  onShowBookmarks(){
    this.showBookmarks = !this.showBookmarks;
  }

  ngOnDestroy(){
    this.bookmarksSubscription.unsubscribe();
  }
}
