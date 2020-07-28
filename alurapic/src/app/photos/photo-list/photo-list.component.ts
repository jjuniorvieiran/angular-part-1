import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Photo } from '../photo/photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  photos: Photo[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.photos = this.activatedRoute.snapshot.data['photos'];
    this.debounce
      .pipe(debounceTime(300))                    // this subscribe will be trigger after 300ms no keyuping
      .subscribe(filter => this.filter = filter); // the subscribe going to be all the time listening for filter
                                                  // this observable is never done, it will be always running
  }

  ngOnDestroy(): void { // when I leave this page the debounce will be destroyed.
    this.debounce.unsubscribe();
  }

}
