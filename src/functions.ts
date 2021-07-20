import { pdb } from "bdsx/core";
import { SYMOPT_PUBLICS_ONLY, UNDNAME_NAME_ONLY } from "bdsx/dbghelp";
import { ProcHacker } from "bdsx/prochacker";
import { Player } from "bdsx/bds/player";
import { bool_t, CxxString, int16_t, int32_t } from "bdsx/nativetype";
import { BlockPos, Vec2 } from "bdsx/bds/blockpos";
import { Biome, LevelChunk, EncryptedNetworkPeer, NetworkStatus, Mob, Brightness } from "./classes";
import { BlockSource } from "bdsx/bds/block";
import { Actor } from "bdsx/bds/actor";
import { NetworkHandler, NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { Minecraft, serverInstance } from "bdsx/bds/server";
import { Level } from "bdsx/bds/level";
import { ItemStack } from "bdsx/bds/inventory";
import { CompoundTag } from "bdsx/bds/nbt";
import { Certificate } from "bdsx/bds/connreq";
import { events } from "bdsx/event";

const hacker = ProcHacker.load("./pdb.ini", [
    "Actor::getCanPickupItems",
    "Actor::getMaxHealth",
    "Actor::getRotation",
    "Actor::isSneaking",
    "BlockSource::getConstBiome",
    "Biome::getBiomeType",
    "CompoundTag::toString",
    "EnchantUtils::hasEnchant",
    "EnchantUtils::getEnchantLevel",
    "ExtendedCertificate::getXuid",
    "ItemStack::toString",
    "ItemStackBase::isEnchanted",
    "Level::getPlayerByXuid",
    "Level::getTime",
    "Level::getSharedSpawnPos",
    "Mob::isSprinting",
    "Player::canUseAbility",
    "Player::getBedPosition",
    "Player::getCertificate",
    "Player::getDirection",
    "Player::getSleepTimer",
    "Player::getSpawnPosition",
    "Player::getSpawnDimension",
    ], UNDNAME_NAME_ONLY);
const hackerNon = ProcHacker.load("./pdb.ini", ["?isRiding@Actor@@QEBA_NXZ"]);
pdb.close()

let system: IVanillaServerSystem;
let level: Level;

// Actor Functions
export const Actor_GetCanActorPickupItems = hacker.js("Actor::getCanPickupItems", bool_t, null, Actor);
export const Actor_GetMaxHealth = hacker.js("Actor::getMaxHealth", int32_t, {this: Actor});
export const Actor_GetRotation = hacker.js("Actor::getRotation", Vec2, { this: Actor, structureReturn: true });
export const Actor_isRiding = hackerNon.js("?isRiding@Actor@@QEBA_NXZ", bool_t, { this: Actor, structureReturn: true });
export const Actor_IsSneaking = hacker.js("Actor::isSneaking", bool_t, null, Actor);

// BlockSource Functions
export const BlockSource_getConstBiome = hacker.js("BlockSource::getConstBiome", Biome, { this: BlockSource });

// Biome Functions
export const Biome_getBiomeType = hacker.js("Biome::getBiomeType", int32_t, { this: Biome });

// CompoundTag Functions
export const CompoundTag_toString = hacker.js("CompoundTag::toString", CxxString, { this: CompoundTag });

// EnchantUtils Functions
export const EnchantUtils_hasEnchant = hacker.js("EnchantUtils::hasEnchant", bool_t, null, int32_t);
export const EnchantUtils_getEnchantLevel = hacker.js("EnchantUtils::getEnchantLevel", int32_t, null, int32_t, ItemStack);

// ExtendedCertificate Functions
export const ExtendedCertificate_getXuid = hacker.js("ExtendedCertificate::getXuid", CxxString, { this: Certificate });

// ItemStack Functions
export const ItemStack_toString = hacker.js("ItemStack::toString", CxxString, { this: ItemStack });
export const ItemStack_isEnchanted = hacker.js("ItemStackBase::isEnchanted", bool_t, { this: ItemStack });

// Level Functions
export const Level_getPlayerByXuid = hacker.js("Level::getPlayerByXuid", Player, { this: Level }, CxxString);
export const Level_getSharedSpawnPos = hacker.js("Level::getSharedSpawnPos", BlockPos, { this: Level });
export const Level_getTime = hacker.js("Level::getTime", int32_t, { this: Level });

// Mob Functions
export const Mob_isSprinting = hacker.js("Mob::isSprinting", bool_t, { this: Mob });

// Player Functions
export const Player_canUseAbility = hacker.js("Player::canUseAbility", bool_t, { this: Player }, int32_t);
export const Player_getBedPosition = hacker.js("Player::getBedPosition", BlockPos, { this: Player });
export const Player_getCertificate = hacker.js("Player::getCertificate", Certificate, { this: Player });
export const Player_getDirection = hacker.js("Player::getDirection", int32_t, { this: Player });
export const Player_getSleepTimer = hacker.js("Player::getSleepTimer", int32_t, { this: Player });
export const Player_getSpawnPosition = hacker.js("Player::getSpawnPosition", BlockPos, { this: Player });
export const Player_getSpawnDimension = hacker.js("Player::getSpawnDimension", int32_t, { this: Player });

events.serverOpen.on(() => {
    const level = serverInstance.minecraft.getLevel();
    getXuidBlank = ((player: Player) => {
        let certificate = Player_getCertificate.call(player);
        return ExtendedCertificate_getXuid.call(certificate, certificate).toString();
    });
    getPlayerXuid = ((xuid: string) => {
        return Level_getPlayerByXuid.call(level, xuid);
    });

});

let getXuidBlank: Function;
let getPlayerXuid: Function;

export function getXuid(player: Player): string {
    return getXuidBlank(player).toString();
}

export function getPlayerFromXuid(xuid: string): Player {
    return getPlayerXuid(xuid);
}

export function getSystem() {
    if (!system) {
        system = server.registerSystem(0, 0);
    }
    return system;
}

export function getLevel() {
    if (!level) {
        level = serverInstance.minecraft.getLevel();
    }
    return level;
}

export function dimensionIdToString(id: number): string {
    switch(id) {
        case 0:
            return "Overworld";
        case 1:
            return "Nether";
        case 2:
            return "End";
        default:
            return "Unknown";
    }
}

export function getTime(): {totalTime: number, dayTime: number, days: number, hours: number, minutes: number} {
    let level = getLevel();
    let totalTime = Level_getTime.call(level);
    let days = Math.trunc(totalTime / 24000);
    let dayTime = totalTime - (days * 24000);
    let hours = Math.trunc(dayTime / 1200);
    let minutes = Math.trunc((dayTime - (hours * 1200)) / 20);
    return {totalTime: totalTime, dayTime: dayTime, days: days, hours: hours, minutes: minutes}
}