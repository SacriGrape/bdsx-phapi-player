import { nativeClass, NativeClass, nativeField } from "bdsx/nativeclass";
import { CxxString, int32_t } from "bdsx/nativetype";
import { Actor } from "bdsx/bds/actor";


@nativeClass(null)
export class Biome extends NativeClass {
    @nativeField(CxxString, 0x08)
    name: string;
};

@nativeClass(null)
export class NetworkStatus extends NativeClass {
    @nativeField(int32_t, 0x4)
    ping: number;
}

export class Mob extends Actor {}

export class EncryptedNetworkPeer extends NativeClass {}
export class LevelChunk extends NativeClass {}
export class NetworkHandler extends NativeClass {}
export class Brightness extends NativeClass {}


export enum Enchants {
    protection,
    fire_protection,
    feather_falling,
    blast_protection,
    projectile_protection,
    thorns,
    respiration,
    depth_strider,
    aqua_affinity,
    sharpness,
    smite,
    bane_of_arthropods,
    knockback,
    fire_aspect,
    looting,
    efficiency,
    silk_touch,
    unbreaking,
    fortune,
    power,
    punch,
    flame,
    infinity,
    luck_of_the_sea,
    lure,
    frost_walker,
    mending,
    curse_of_binding,
    curse_of_vanishing,
    impaling,
    loyalty,
    channeling,
    multishot,
    piercing,
    quick_charge,
    soul_speed
}