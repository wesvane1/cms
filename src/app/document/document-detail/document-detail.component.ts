import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-document-detail',
  standalone: false,
  
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.scss'
})
export class DocumentDetailComponent implements OnInit{

  document: Document;
  nativeWindow: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly documentService: DocumentService,
    private readonly windowService: WindRefService
  ) {
    this.nativeWindow = windowService.getNativeWindow()
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const documentId = params['id'];
      this.document = this.documentService.getDocument(documentId);
    });
  }

  onView(){
    if(this.document.url){
      this.nativeWindow.open(this.document.url)
    }
  }
  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents'])
 }
}
