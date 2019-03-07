import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { LinksService } from '../services/links.service';
import { VideoViewComponent } from '../video-view/video-view.component';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  bookmarks:String[];
  bookmarksSubscription: Subscription;

  @Input() videoView: VideoViewComponent;

  @HostListener('onLoadBookmark')
  onLoadBookmark(buttonUrl:String){
    const buttonId = this.linksService.getIdFromUrl(buttonUrl);
    this.linksService.addNewLink(buttonUrl);
    this.videoView.onLoadVideo(buttonId);
  }

  onSuppressBookmark(index:number){
    this.linksService.suppressBookmark(index);
  }

  constructor(private linksService:LinksService) { }

  ngOnInit() {
    this.bookmarksSubscription = this.linksService.bookmarksSubject.subscribe(
      (bookmarks:String[]) => {
        this.bookmarks = bookmarks;
      }
    );
    this.linksService.emitBookmarks();
  }

  ngOnDestroy(){
    this.bookmarksSubscription.unsubscribe();
  }

}
