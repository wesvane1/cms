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

  getMessages(): Message[]{
    this.http.get<Message[]>('http://localhost:3000/messages').subscribe((messages: Message[]) => {
      this.messages = messages
      this.maxMessageId = this.getMaxId()

      this.messages.sort((a, b) => (a.sender < b.sender ? -1 : a.sender > b.sender ? 1 : 0));
      this.messageChangedEvent.next(this.messages.slice());

    }, (error: any) => {
      console.error('Error fetching contacts: ', error)
    })
    return this.messages.slice()
  }
  
  getMessage(id: string): Message{
    for(const message of this.messages){
      if(message.id === id){
        return message
      }
    }
    return null
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }
    // make sure id of the new Document is empty
    message.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // add to database
    this.http.post<{ messageText: string, message: Message }>('http://localhost:3000/messages',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.messages.push(responseData.message);
          this.sortAndSend();
        }
      );
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
  
  sortAndSend() {
    const messagesJSON = JSON.stringify(this.messages); // Convert documents to JSON string
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    // Send the updated documents to the backend
    this.http.put(
      'http://localhost:3000/messages', // Use your local Node.js server URL
      messagesJSON,
      { headers }
    ).subscribe(
      () => {
        // Once the documents are successfully stored, notify other components
        const messageListClone = this.messages.slice(); // Clone the document list to avoid reference issues
        this.messageChangedEvent.next(messageListClone); // Emit the updated documents list
      },
      (error) => {
        console.error('Error storing messages:', error); // Error handling
      }
    );
  }
}
