import {Message} from "./messages/message";
import {Utility} from "./utility";

export class Packet {

  constructor(readonly message: Message = new Message(),
              readonly receivers: Array<string> = [],
              readonly sender: string = '',
              readonly replyTo: string | null = null,
              readonly id: string = Utility.generateShortUID()) {
  }

  clone(sender: string, replyTo: string | null = null): Packet {
    return new Packet(this.message, this.receivers, sender, replyTo);
  }
}
