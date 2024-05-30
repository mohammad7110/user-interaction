import {Message} from "./message";
import {MessageType} from "../message-type";

export class LockFeatureMessage extends Message {
  public override readonly type: MessageType = MessageType.LOCK_FEATURE;

  constructor(public readonly instanceId: string, public readonly lock: boolean) {
    super();
  }
}
