import {Message} from "./message";
import {MessageType} from "../message-type";


export class DataFeatureMessage extends Message {
  public override readonly type: MessageType = MessageType.DATA_FEATURE;

  constructor(public readonly instanceId: string, public readonly data: any) {
    super();
  }
}
