import {Packet} from "./packet";
import {ConfigFeatureMessage} from "./messages/config-feature-message";
import {Message} from "./messages/message";
import {NewFeatureMessage} from "./messages/new-feature-message";
import {ListRequestMessage} from "./messages/list-request-message";
import {ListSyncMessage} from "./messages/list-sync-message";
import {MessageType} from "./message-type";
import {LockFeatureMessage} from "./messages/lock-feature-message";
import {RemoveFeatureMessage} from "./messages/remove-feature-message";
import {DataFeatureMessage} from "./messages/data-feature-message";


export class Utility {
  public static makeOriginPacketInstance(entry: any): Packet | null {
    if (!entry)
      return null;

    const message = Utility.makeOriginMessageInstance(entry.message);
    if (!message)
      return null;

    return new Packet(message, entry.receivers, entry.sender, entry.replyTo, entry.id);
  }

  public static makeOriginMessageInstance(entry: any): Message | null {
    if (!entry)
      return null;

    if (entry.type === MessageType.LIST_REQUEST)
      return new ListRequestMessage();

    if (entry.type === MessageType.LIST_SYNC)
      return new ListSyncMessage(entry.list)

    if (entry.type === MessageType.NEW_FEATURE)
      return new NewFeatureMessage(entry.item)

    if (entry.type === MessageType.CONFIG_FEATURE)
      return new ConfigFeatureMessage(entry.instanceId, entry.config);
    if (entry.type === MessageType.LOCK_FEATURE)
      return new LockFeatureMessage(entry.instanceId, entry.lock);
    if (entry.type === MessageType.REMOVE_FEATURE)
      return new RemoveFeatureMessage(entry.instanceId);
    if (entry.type === MessageType.DATA_FEATURE)
      return new DataFeatureMessage(entry.instanceId , entry.data);

    console.warn('Not yet supported making origin message Instance: ', entry);
    return null;
  }

  public static generateShortUID = (length = 16) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
