import {Injectable} from '@angular/core';
import {PacketService} from "../packet/packet.service";
import {Utility} from "../../models/utility";
import {Message} from "../../models/messages/message";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private notificationSubject = new Subject<Message>();
  public notification = this.notificationSubject.asObservable();

  constructor(private packetService: PacketService) {
    this.packetService.notification.subscribe(this.receivedNotification.bind(this));

  }


  sendMessage(message: Message): void {
    this.packetService.sendMessage(message);
  }

  private receivedNotification(message: Message): void {
    const messageInstance = Utility.makeOriginMessageInstance(message);
    if (messageInstance)
      this.notificationSubject.next(messageInstance);
  }
}
