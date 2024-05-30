import {Message} from "./message";
import {MessageType} from "../message-type";
import {FeatureConfig} from "../features";


export class ConfigFeatureMessage extends Message {
  public override readonly type: MessageType = MessageType.CONFIG_FEATURE;

  constructor(public readonly instanceId: string, public readonly config: FeatureConfig) {
    super();
  }
}
