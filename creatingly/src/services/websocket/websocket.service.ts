import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Utility} from "../../models/utility";
import {Packet} from "../../models/packet";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private notificationSubject = new Subject<Packet>();

  public notification = this.notificationSubject.asObservable();

  private webSocket = new WebSocket('ws://localhost:8080');

  private clientId = Utility.generateShortUID(7)


  constructor() {
    this.webSocket.binaryType = 'arraybuffer';
    this.webSocket.onmessage = (event) => {
      const message = this.handleIncomingMessage(event);
      if (message && message.id !== this.clientId) {
        this.notificationSubject.next(message.packet);
      }
    }
    this.webSocket.onerror = (error) => {
      console.warn(error)
    }
  }


  public sendPacket(packet: Packet): void {
    if (this.webSocket.readyState === WebSocket.OPEN) {
      const data = {packet, id: this.clientId};
      this.webSocket.send(JSON.stringify(data));
    }
  }


  private handleIncomingMessage(event: MessageEvent): { packet: Packet, id: string } | undefined {
    if (event.data instanceof ArrayBuffer) {
      const message = JSON.parse(new TextDecoder('utf-8').decode(event.data));
      return message;
    }else{
      return JSON.parse(event.data);
    }
    return undefined;
  }
}
