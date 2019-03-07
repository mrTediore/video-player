import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { LinksService } from '../services/links.service';
import { VideoViewComponent } from '../video-view/video-view.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  
  links:String[];
  linksSubscription: Subscription;

  @Input() videoView: VideoViewComponent;

  @HostListener('onWatchAgain')
  onWatchAgain(buttonUrl:String){
    const buttonId = this.linksService.getIdFromUrl(buttonUrl);
    this.linksService.addNewLink(buttonUrl);
    this.videoView.onLoadVideo(buttonId);
  }

  onCleanHistory(){
    this.linksService.cleanHistory();
  }

  constructor(private linksService:LinksService) { }

  ngOnInit() {
    this.linksSubscription = this.linksService.linksSubject.subscribe(
      (links:String[]) => {
        this.links = links;
      }
    );
    this.linksService.emitLinks();
  }

  ngOnDestroy(){
    this.linksSubscription.unsubscribe();
  }

}
