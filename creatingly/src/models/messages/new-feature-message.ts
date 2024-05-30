
import {Message} from "./message";
import {MessageType} from "../message-type";
import {Feature} from "../features";


export class NewFeatureMessage extends Message {
  public override readonly type: MessageType = MessageType.NEW_FEATURE;
  constructor(public readonly item: Feature) {
    super();
  }
}
