import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  standalone: false,
  
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.scss'
})
export class MessageEditComponent {

  @ViewChild('subject', { static: false }) subjectInputRef: ElementRef;
  @ViewChild('msgText', { static: false }) msgTextInputRef: ElementRef;

  @Output() addMessageEvent = new EventEmitter<Message>();

  onSendMessage(){
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    const newMsg = new Message('4', subject, msgText, 'Wes Vane')

    this.addMessageEvent.emit(newMsg)
  }

  onClear(){
    this.subjectInputRef.nativeElement.value = ''
    this.msgTextInputRef.nativeElement.value = ''
  }
}
