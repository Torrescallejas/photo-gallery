import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from 'src/app/interfaces/Photo';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit{

  //Se debe de tipar para que sea valida
  photos: Array<Photo> = [];

  constructor(private photoService: PhotoService, private router:Router) {}

  ngOnInit() {
    this.photoService.getPhotos().subscribe(res => {
      this.photos = res;
      console.log(this.photos)
      console.log('Si se obtuvieron')
    }, err => console.log(err))
  }

  selectedCard(id:any) {
    this.router.navigate(['/photos/' + id])
  }

}
