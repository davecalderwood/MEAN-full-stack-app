import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Post } from '../posts.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.scss']
})
export class PostsCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  @Output() postCreated = new EventEmitter<Post>();

  constructor() { }

  ngOnInit() {
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: Post = {
      title: form.value.title,
      content: form.value.content
    };
    this.postCreated.emit(post);
  }

}
