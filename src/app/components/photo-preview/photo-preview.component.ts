import { Component } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import {ActivatedRoute, Router} from '@angular/router'
import { Photo } from 'src/app/interfaces/Photo';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent {

  id:string='';
  photo ?: Photo;

  constructor(private photoService:PhotoService, private activeRoute:ActivatedRoute, private router:Router) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      console.log(params)
      this.id=params['id'];
      this.photoService.getPhoto(this.id).subscribe(res => {
        // console.log(res)
        this.photo = res;
      }, err => console.log(err))
    })
  }

  deletePhoto(id: any) {
    this.photoService.deletePhoto(id).subscribe(res => {
      this.router.navigate(['/photos'])
    },err => console.log(err))
  }

  updatePhoto(title: HTMLInputElement, description: HTMLTextAreaElement):boolean {
    this.photoService.updatePhoto(this.id, title.value, description.value).subscribe(res => {
      this.router.navigate(['/'])
    }, err => console.log(err))

    return false;
  }


}
