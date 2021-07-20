import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { events } from "bdsx/event";


export const localeMap = new Map<string, string>();

events.packetBefore(MinecraftPacketIds.Login).on((p, ni) => {
    let connreq = p.connreq;
    if (!connreq) return;
    let data = connreq.getJsonValue();
    localeMap.set(ni.toString(), data.LanguageCode);
});