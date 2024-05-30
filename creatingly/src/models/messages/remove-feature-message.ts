import {Message} from "./message";
import {MessageType} from "../message-type";

export class RemoveFeatureMessage extends Message {
  public override readonly type: MessageType = MessageType.REMOVE_FEATURE;

  constructor(public readonly instanceId: string) {
    super();
  }
}
