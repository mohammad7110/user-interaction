import {TestBed} from '@angular/core/testing';

import {PacketService} from './packet.service';
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import {WebsocketService} from "../websocket/websocket.service";
import {LockFeatureMessage} from "../../models/messages/lock-feature-message";
import {Packet} from "../../models/packet";

describe('PacketService', () => {
  let service: PacketService;
  let webSocketServiceSpy: jasmine.SpyObj<WebsocketService>;

  beforeEach(() => {
    const webSocketServiceMock = {
      notification: {
        subscribe: () => {
        }
      },
      sendPacket: jasmine.createSpy('sendPacket') // Optionally mock the sendPacket method
    };
    TestBed.configureTestingModule({
      providers: [
        {provide: WebSocketSubject, useValue: webSocketServiceMock}, // Provide the mock MessageService
      ]
    });
    service = TestBed.inject(PacketService);
    webSocketServiceSpy = TestBed.inject(WebsocketService) as jasmine.SpyObj<WebsocketService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should handle received packets', () => {
    spyOn((service as any).notificationSubject, 'next');
    const packet = new Packet('1' , '{"test":"test"}' ,1 , 1);
    (service as any).receivedNotification(packet);
    expect((service as any).notificationSubject.next).toHaveBeenCalledWith({test :'test'});
  });


  it('should merge packets', () => {
    spyOn((service as any).notificationSubject, 'next');
    const packet1 = new Packet('1' , '{"test":"test",' ,1 , 2);
    (service as any).receivedNotification(packet1);
    const packet2 = new Packet('1' , '"test2":"test2"}' ,2 , 2);
    (service as any).receivedNotification(packet2);

    expect((service as any).notificationSubject.next).toHaveBeenCalledWith(JSON.parse('{"test":"test","test2":"test2"}'));
  });
});
