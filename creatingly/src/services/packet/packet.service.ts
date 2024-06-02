import {Injectable} from '@angular/core';
import {Message} from "../../models/messages/message";
import {WebsocketService} from "../websocket/websocket.service";
import {Utility} from "../../models/utility";
import {Packet} from "../../models/packet";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PacketService {
  private messageLength = 20;

  private map = new Map<string, { total: number, contents: Array<{ index: number, content: string }> }>();
  private notificationSubject = new Subject<Message>();
  public notification = this.notificationSubject.asObservable();

  private sendingPackets: Packet[] = [];

  constructor(private websocketService: WebsocketService) {
    this.websocketService.notification.subscribe(this.receivedNotification.bind(this));
  }


  sendMessage(message: Message): void {
    const messageId = Utility.generateShortUID(10);
    const messageChunks = JSON.stringify(message).match(new RegExp(`.{1,${this.messageLength}}`, 'g'));
    if (messageChunks && messageChunks.length > 0) {
      for (let i = 0; i < messageChunks.length; i++) {
        const packet = new Packet(messageId, messageChunks[i], i + 1, messageChunks.length);
        this.sendingPackets.push(packet);
        this.websocketService.sendPacket(packet);
      }
    }


  }

  private receivedNotification(packet: Packet): void {
    if (packet.content) {

      if (packet.total === 1) {
        this.notificationSubject.next(JSON.parse(packet.content));
      } else {
        const messageId = packet.messageId;
        let messageObj = this.map.get(messageId);
        if (!messageObj) {
          messageObj = {total: packet.total, contents: []};
        }
        messageObj.contents.push({content: packet.content, index: packet.index});
        this.map.set(messageId, messageObj);
        if (messageObj.total === messageObj.contents.length) {
          const contents = messageObj.contents.sort((p1, p2) => {
            if (p1.index > p2.index) {
              return 1;
            } else {
              return -1;
            }
          }).map(i => i.content);
          this.notificationSubject.next(JSON.parse(contents.join('')));
          this.map.delete(messageId);
        }

      }
    } else {
      const packetIndex = this.sendingPackets.findIndex(p => p.messageId === packet.messageId && p.index === packet.index);
      if (packetIndex >= 0) {
        this.sendingPackets.splice(packetIndex , 1);
      }
      // console.log(this.sendingPackets);
    }
  }
}
