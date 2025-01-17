import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  standalone: false,
  
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent {

  messageList: Message[] = [
    new Message('1', 'Test1', 'TestText', 'Wes Vane'),
    new Message('2', 'Test2', 'TestText', 'Wes Vane'),
    new Message('3', 'Test3', 'TestText', 'Wes Vane')
  ]

  onAddMessage(message: Message){
    this.messageList.push(message)
  }

}
