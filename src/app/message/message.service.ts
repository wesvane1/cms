import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageSelectedEvent = new EventEmitter<Message>();
  messageChangedEvent = new EventEmitter<Message[]>();
  
  private messages: Message[] = []
  private maxMessageId = 0;

  constructor(
    private http: HttpClient,
  ) {
    this.messages = this.getMessages()
  }
  
  getMessage(id: string): Message{
    for(const message of this.messages){
      if(message.id === id){
        return message
      }
    }
    return null
  }

  addMessage(message: Message){
    if(!message){
      return
    }
    this.maxMessageId++
    message.id = (this.maxMessageId).toString()
    this.messages.push(message);
    // this.messageChangedEvent.emit(this.messages.slice())
    this.storeMessages()
  }
  getMaxId(): number{
    let maxId = 0

    for (const message of this.messages){
      if (+message.id > maxId){
        maxId = +message.id
      }
    }
    return maxId
  }

  getMessages(): Message[]{
    this.http.get<Message[]>('https://cms-9f75e-default-rtdb.firebaseio.com/messages.json').subscribe((messages: Message[]) => {
      this.messages = messages
      this.maxMessageId = this.getMaxId()

      this.messages.sort((a, b) => (a.sender < b.sender ? -1 : a.sender > b.sender ? 1 : 0));
      this.messageChangedEvent.next(this.messages.slice());

    }, (error: any) => {
      console.error('Error fetching messages: ', error)
    })
    return this.messages.slice()
  }

  storeMessages(){
    const messagesJSON = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(
      'https://cms-9f75e-default-rtdb.firebaseio.com/messages.json',
      messagesJSON,
      {headers}
      ).subscribe(() => {
      const messageListClone = this.messages.slice()
      this.messageChangedEvent.next(messageListClone);
    })
  }
}
