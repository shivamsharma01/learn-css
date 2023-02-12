import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  name!: string;
  email!: string;
  message!: string;
  scriptURL: string =
    'https://script.google.com/macros/s/AKfycby8dCUrejHKs-NIq6QI95C-CUhWO4XoSUR1MiKbg3MpT51EnybGTgJcjLAM3HX8YG9AYA/exec';

  constructor(@Inject(DOCUMENT) private document: Document) {}
  ngOnInit(): void {}

  submit() {
    let formData: any = this.document.forms;
    const body: string = JSON.stringify({
      name: this.name,
      email: this.email,
      message: this.message,
    });
    console.log(body);
    // fetch(this.scriptURL, { method: 'POST', body })
    //   .then((response) => console.log('Success!', response))
    //   .catch((error) => console.error('Error!', error.message));
    var headers = {
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': 'GET, OPTIONS, POST, PUT',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    };

    fetch(this.scriptURL, {
      method: 'POST',
      headers: headers,
      body: new URLSearchParams(body),
    })
      .then((response) => console.log('Success!', response))
      .catch((error) => console.error('Error!', error.message));
  }
}
