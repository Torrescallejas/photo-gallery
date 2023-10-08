import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Photo } from '../interfaces/Photo';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  uri = 'http://localhost:3000/api/photos'
  nose = '';

  constructor(private http: HttpClient) { }

  createPhoto(title: string, description: string, image?: File) {

    //Se puede cambiar esto, revisar otros proyectos realizados
    const fd = new FormData;
    fd.append('title', title);
    fd.append('description', description);
    if(image){
      fd.append('image', image);
    }

    return this.http.post(this.uri, fd)
  }

  getPhotos() {
    return this.http.get<Photo[]>(this.uri)
  }

  getPhoto(id: any) {
    return this.http.get<Photo>(this.uri+'/'+id)
  }

  deletePhoto(id: any) {
    return this.http.delete(`${this.uri}/${id}`)
  }

  updatePhoto(id: any, title: string, description: string) {
    return this.http.put(`${this.uri}/${id}`, {title, description})
  }

}
