import { Component, OnInit, Input, HostListener } from '@angular/core';
import {NgForm} from '@angular/forms';
import { LinksService } from '../services/links.service';
import { VideoViewComponent } from '../video-view/video-view.component';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Input() videoView: VideoViewComponent;

  @HostListener('onSearch')
  onSearch(searchId:String){
    this.videoView.onLoadVideo(searchId);
  }

  constructor(private linksService:LinksService) { }

  ngOnInit() {
  }
  
  onSubmit(form:NgForm){
    const search = form.value['link'];
    const videoId = this.linksService.getIdFromUrl(search);
    if(videoId !== 'error'){
      const videoUrl = this.linksService.getUrlFromId(videoId);
      this.linksService.addNewLink(videoUrl);
      this.onSearch(videoId);
      console.log(videoUrl);
    }else{
      console.log('error');
    }
  }
}
