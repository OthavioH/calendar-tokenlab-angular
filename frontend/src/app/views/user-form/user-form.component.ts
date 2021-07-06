import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { UserFormService } from './user-form.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  user:any;
  inputName: string;
  image:File;
  editable: boolean = false;
  imageUrl:any = '../assets/person-icon.png';

  constructor(private activatedRoute: ActivatedRoute, private userFormService: UserFormService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.subscription =this.activatedRoute.data.subscribe((info)=>{
      this.user = info.userData;
      this.inputName = this.user.user.name;
      this.imageUrl = this.user.imageURL;
      localStorage.setItem("userImage", this.imageUrl);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  switchEditableValue(form:NgForm) {
    this.editable = !this.editable;
    
    if(this.editable) {
      form.controls['name'].enable();

    }
    else {
      form.controls['name'].disable();
    }
  }

  async validateForm(form: NgForm) {
    if(form.valid) {
      const response = await this.userFormService.editUser(this.inputName, this.image );
      this.setLocalStorageData(response);
      const user = response;
    }
  }

  setLocalStorageData(data:object) {
    localStorage.setItem("userImage", data["imageURL"]);
  }

  onImageChange(event) {
    this.image = event.target.files[0];
    console.log(this.image);
    
    const selectedFile = event.target.files[0];
    this.changeFile(selectedFile).then((base64: string): any => {
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(base64);
    });
  }

  changeFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

}
