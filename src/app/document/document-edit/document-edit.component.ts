import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-document-edit',
  standalone: false,
  
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.scss'
})
export class DocumentEditComponent implements OnInit{

  originalDocument: Document;
  document: Document;
  editMode: Boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
  
      if (!id) {
        this.editMode = false;
        return;
      }
  
      this.originalDocument = this.documentService.getDocument(id);
  
      if (!this.originalDocument) {
        return;
      }
  
      this.editMode = true;
      this.document = { ...this.originalDocument }; // Cloning the object
    });
  }

  onSubmit(form: NgForm){
    const value = form.value
    let newDocument = new Document(
      value.id,
      value.name,
      value.description,
      value.url,
      value.children
    )
    if(this.editMode){
      this.documentService.updateDocument(this.originalDocument, newDocument)
      this.onUpdate()
    } else{
      this.documentService.addDocument(newDocument)
      this.onCreate()
    }
  }

  onCreate(){
    this.router.navigate(['/documents'])
  }
  onUpdate(){
    this.router.navigate(['/documents'])
  }
  onCancel(){
    this.router.navigate(['/documents'])
  }
}
