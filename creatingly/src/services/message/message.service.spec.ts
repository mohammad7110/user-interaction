import {TestBed} from '@angular/core/testing';
import {MessageService} from './message.service';
import {Message} from "../../models/messages/message";
import {PacketService} from "../packet/packet.service";
import {LockFeatureMessage} from "../../models/messages/lock-feature-message";

describe('MessageService', () => {
  let service: MessageService;
  let packetServiceSpy: jasmine.SpyObj<PacketService>;

  beforeEach(() => {
    const packetServiceMock = {
      notification: {
        subscribe: () => {
        }
      },
      sendMessage: jasmine.createSpy('sendMessage') // Optionally mock the sendMessage method
    };

    TestBed.configureTestingModule({
      providers: [
        {provide: PacketService, useValue: packetServiceMock}, // Provide the mock MessageService
      ]
    });
    service = TestBed.inject(MessageService);
    packetServiceSpy = TestBed.inject(PacketService) as jasmine.SpyObj<PacketService>;

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a new  message', () => {
    const message = new Message();
    service.sendMessage(message);
    expect(packetServiceSpy.sendMessage).toHaveBeenCalledWith(message);
  })

  it('should handle received notifications', () => {
    spyOn((service as any).notificationSubject, 'next');
    const message = {type: "lockFeature", instanceId: 'test', lock: false};
    (service as any).receivedNotification(message);
    const messageInstance = new LockFeatureMessage('test' , false);
    expect((service as any).notificationSubject.next).toHaveBeenCalledWith(messageInstance);

  });
});
