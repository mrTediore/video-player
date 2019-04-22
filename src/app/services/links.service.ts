import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class LinksService {

  links = new Array<any>();
  bookmarks = new Array<any>();
  linksSubject = new BehaviorSubject(this.links);
  bookmarksSubject = new BehaviorSubject(this.bookmarks);

  emitLinks(){
    this.linksSubject.next(this.links);
  }

  emitBookmarks(){
    this.bookmarksSubject.next(this.bookmarks);
  }

  saveLinks(){
    localStorage.setItem('history',JSON.stringify(this.links));
  }

  saveBookmarks(){
    localStorage.setItem('bookmarks',JSON.stringify(this.bookmarks));
  }

  cleanHistory(){
    if(localStorage.getItem('history') !== null){
      localStorage.removeItem('history');
      this.getLinks();
    }
  }

  getLinks(){
    //localStorage.clear();
    if(localStorage.getItem('history') === null){
      this.links = new Array<any>();
    }else{
      this.links = JSON.parse(localStorage.getItem('history'));
    }
    this.emitLinks();
  }

  getBookmarks(){
    if(localStorage.getItem('bookmarks') === null){
      this.bookmarks = new Array<any>();
    }else{
      this.bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }
    this.emitBookmarks();
  }

  suppressBookmark(index:number){
    this.bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    this.bookmarks.splice(index,1);
    this.saveBookmarks();
    this.emitBookmarks();
  }

  constructor() {
    this.getLinks();
    this.getBookmarks();
  }

  addNewLink(newLink:String){
    this.links.push({url:newLink});
    this.saveLinks();
    this.emitLinks();
  }

  addNewBookmark(newBookmark:String){
    this.bookmarks.push({url:newBookmark});
    this.saveBookmarks();
    this.emitBookmarks();
  }

  getIdFromUrl(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
  }

  getUrlFromId(id:String){
    return 'https://youtu.be/' + id;
  }
}

