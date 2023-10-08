import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/services/photo.service';


// Se crea una interfaz para asi tener el autocompletado
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  file?: File;
  photoSelected?: string | ArrayBuffer;

  // files: Array<any> = [];

  constructor(private photoService: PhotoService, private router:Router) {}

  ngOnInit() {

  }

  onPhotoSelected(event: Event):void {
    const inputElement = event.target as HTMLInputElement
    if(inputElement.files && inputElement.files[0]) {
      this.file = <File>inputElement.files[0]
      // this.files.push(inputElement.files);
      //Image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if(reader.result) {
          this.photoSelected = reader.result
        }
      }
      // console.log(this.file)
      reader.readAsDataURL(this.file);
    }
  }

  uploadPhoto(title: HTMLInputElement, description: HTMLTextAreaElement) : boolean {
    
    this.photoService.createPhoto(title.value, description.value, this.file).subscribe((res) => {
      // console.log(res)
      this.router.navigate(['/'])
    }, err => console.log(err))

    return false;
  }

}
