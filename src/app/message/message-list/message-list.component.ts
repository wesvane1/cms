import { Component } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  standalone: false,
  
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent {

  messageList: Message[] = []

  constructor(
    private readonly messageService: MessageService
  ){}

  ngOnInit(){
    this.messageList = this.messageService.getMessages()
    this.messageService.messageChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messageList = messages
      }
    )
  }

  onAddMessage(message: Message){
    this.messageList.push(message)
  }

}
