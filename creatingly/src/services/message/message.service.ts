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
    this.packetService.notification.subscribe((message) => {
      const packetInstance = Utility.makeOriginMessageInstance(message);
      if (packetInstance)
        this.notificationSubject.next(packetInstance);

    })
  }


  sendMessage(message: Message): void {
    this.packetService.sendMessage(message);
  }
}
