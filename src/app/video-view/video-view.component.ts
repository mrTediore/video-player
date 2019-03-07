import { Component, OnInit, Input, SimpleChange, HostBinding } from '@angular/core';
import { LinksService } from '../services/links.service';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {

  player:any;

  @HostBinding('class.current-id')
  currentId:String;

  constructor(private linksService:LinksService) { }

  ngOnInit() {
    
    if(this.currentId){
      this.init();
    }
  
    (<any>window).onYouTubeIframeAPIReady = () => {
      this.player = new (<any>window).YT.Player('videoPlayer',{
        height:'400',
        width:'100%',
        videoId:this.currentId,
        events: {
          'onReady': (event) => {this.onPlayerReady(event);},
          'onStateChange': (event) => {this.onPlayerStateChange(event);}
        }
      });
    }
  }

  ngOnChanges(changes:SimpleChange){
    this.player.loadVideoById(changes.currentValue.currentId, 5, "default");
  }

  init(){
    if (!window['YT']){
      var tag = document.createElement('script');
      tag.src = "//www.youtube.com/player_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }

  onAddBookmark(){
    const currentUrl = this.linksService.getUrlFromId(this.currentId);
    this.linksService.addNewBookmark(currentUrl);
  }

  onPlayerStateChange(event){
    switch(event.data){
      case window['YT'].PlayerState.PLAYING:
        break;
      case window['YT'].PlayerState.PAUSED:
        break;
      case window['YT'].PlayerState.ENDED:
        break;
    }
  }

  onPlayerReady(event) {
    event.target.playVideo();
  }

  onLoadVideo(newId:String){
    this.currentId = newId;
    if(!this.player){
      this.init();
    }else{
      this.player.loadVideoById(newId, 0, "large");
    }
  }
}