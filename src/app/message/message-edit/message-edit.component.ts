import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

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

  constructor(
    private readonly messageService: MessageService
  ){}

  onSendMessage(){
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    const newMsg = new Message('6', subject, msgText, '19')
    this.messageService.addMessage(newMsg)
    // const newMsg = new Message('4', subject, msgText, 'Wes Vane')

    // this.addMessageEvent.emit(newMsg)
    this.onClear()
  }

  onClear(){
    this.subjectInputRef.nativeElement.value = ''
    this.msgTextInputRef.nativeElement.value = ''
  }
}
