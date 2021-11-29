import { registerPlaceholder } from "@bdsx/bdsx-placeholderapi/src/register";
import { Player, PlayerPermission } from "bdsx/bds/player";
import { AbilitiesIndex } from "bdsx/bds/abilities";
import { ArmorSlot } from "bdsx/bds/inventory";
import { BlockPos, Vec2 } from "bdsx/bds/blockpos";
import { AttributeId } from "bdsx/bds/attribute";
import { MobEffectIds } from "bdsx/bds/effects";
import { Enchants, Mob } from "./classes";
import { localeMap } from "./localGetter";
import { getCountryName, getLanguageName } from "./abrevConverter";
import { Actor_GetMaxHealth, Actor_GetRotation, Actor_isRiding, Actor_IsSneaking, BlockSource_getConstBiome, dimensionIdToString, EnchantUtils_getEnchantLevel, getLevel, getTime, Level_getSharedSpawnPos, Level_getTime, Mob_isSprinting, Player_canUseAbility, Player_getBedPosition, Player_getSleepTimer, Player_getSpawnDimension } from "./functions";
import { bin } from "bdsx/bin";
import { Certificate } from "bdsx/bds/connreq";

function player_allow_flight_Placeholder(player: Player): string {
    return Player_canUseAbility.call(player, AbilitiesIndex.MayFly).toString();
}
function player_armor_helmet_name_Placeholder(player: Player): string {
    let playerArmor = player.getArmor(ArmorSlot.Head);
    return playerArmor.getCustomName();
}
function player_armor_helmet_data_Placeholder(player: Player): string {
    let playerArmor = player.getArmor(ArmorSlot.Head);
    return playerArmor.getDamageValue().toString();
}
function player_armor_torso_name_Placeholder(player: Player): string {
    let playerArmor = player.getArmor(ArmorSlot.Torso);
    return playerArmor.getCustomName();
}
function player_armor_torso_data_Placeholder(player: Player): string {
    let playerArmor = player.getArmor(ArmorSlot.Torso);
    return playerArmor.getDamageValue().toString();
}
function player_armor_leggings_name_Placeholder(player: Player): string {
    let playerArmor = player.getArmor(ArmorSlot.Legs);
    return playerArmor.getCustomName();
}
function player_armor_leggings_data_Placeholder(player: Player): string {
    let playerArmor = player.getArmor(ArmorSlot.Legs);
    return playerArmor.getDamageValue().toString();
}
function player_armor_boots_name_Placeholder(player: Player): string {
    let playerArmor = player.getArmor(ArmorSlot.Feet);
    return playerArmor.getCustomName();
}
function player_armor_boots_data_Placeholder(player: Player): string {
    let playerArmor = player.getArmor(ArmorSlot.Feet);
    return playerArmor.getDamageValue().toString();
}
function player_bed_x_Placeholder(player: Player): string {
    return Player_getBedPosition.call(player).x.toString();
}
function player_bed_y_Placeholder(player: Player): string {
    return Player_getBedPosition.call(player).y.toString();
}
function player_bed_z_Placeholder(player: Player): string {
    return Player_getBedPosition.call(player).z.toString();
}
function player_bed_world_Placeholder(player: Player): string {
    return dimensionIdToString(Player_getSpawnDimension.call(player));
}
function player_biome_Placeholder(player: Player): string {
    let blockSource = player.getRegion();
    let pos = player.getPosition();
    let blockPos = new BlockPos(true);
    blockPos.x = Math.round(pos.x);
    blockPos.y = Math.round(pos.y);
    blockPos.z = Math.round(pos.z);
    let biome = BlockSource_getConstBiome.call(blockSource, blockPos);
    return biome.name;
}
function player_biome_capitalized_Placeholder(player: Player): string {
    let biome = player_biome_Placeholder(player);
    let wordArray = biome.split("_");
    for (let i = 0; i < wordArray.length; i++) {
        wordArray[i] = wordArray[i].charAt(0).toUpperCase() + wordArray[i].slice(1);
    }
    return wordArray.join(" ");
}
function player_compass_x_Placeholder(player: Player): string {
    let level = getLevel();
    return Level_getSharedSpawnPos.call(level).x.toString();
}
function player_compass_y_Placeholder(player: Player): string {
    let level = getLevel();
    return Level_getSharedSpawnPos.call(level).y.toString();
}
function player_compass_z_Placeholder(player: Player): string {
    let level = getLevel();
    return Level_getSharedSpawnPos.call(level).z.toString();
}
function player_current_xp_Placeholder(player: Player): string {
    let level = player.getAttribute(AttributeId.PlayerLevel);
    let xp = 0;
    let xpPercent = player.getAttribute(AttributeId.PlayerExperience);
    if (level >= 32) {
        xp = 4.5 * Math.pow(level, 2) - 162.5 * level + 2220;
    } else if (level > 15) {
        xp = 2.5 * Math.pow(level, 2) - 40.5 * level + 360;
    } else {
        xp = Math.pow(level, 2) + 6 * level;
    }
    xp += Number.parseFloat(player_exp_to_level_Placeholder(player));
    return Math.round(xp).toString();
}
function player_direction_Placeholder(player: Player): string {
    let rotation: Vec2 = Actor_GetRotation.call(player);
    if (rotation.y <= 0)  {
        rotation.y += 360;
    }
    if ((0 <= rotation.y) && (rotation.y < 22.5)) {
        return "S";
    } else if (22.5 <= rotation.y && rotation.y < 67.5) {
        return "SW";
    } else if (67.5 <= rotation.y && rotation.y < 112.5) {
        return "W";
    } else if (112.5 <= rotation.y && rotation.y < 157.5) {
        return "NW";
    } else if (157.5 <= rotation.y && rotation.y < 202.5) {
        return "N";
    } else if (202.5 <= rotation.y && rotation.y < 247.5) {
        return "NE";
    } else if (247.5 <= rotation.y && rotation.y < 292.5) {
        return "E";
    } else if (292.5 <= rotation.y && rotation.y < 337.5) {
        return "SE";
    } else if (337.5 <= rotation.y && rotation.y < 360) {
        return "S";
    }
    return "";
}
function player_direction_xz_Placeholder(player: Player): string {
    let rotation = Actor_GetRotation.call(player).x;
    if (rotation < 0) {
        rotation += 360;
    }

    if (Math.abs(rotation) <= 45 || Math.abs(rotation - 360) <= 45) {
        return "+Z";
    } else if (Math.abs(rotation - 90) <= 45) {
        return "-X";
    } else if (Math.abs(rotation - 180) <= 45) {
        return "-Z";
    } else if (Math.abs(rotation - 270) <= 45) {
        return "+X";
    }
    return "";
}
function player_exp_to_level_Placeholder(player: Player): string {
    let level = player.getAttribute(AttributeId.PlayerLevel);
    let xpPercent = player.getAttribute(AttributeId.PlayerExperience);
    let xp = 0;
    if (level >= 31) {
        let xpForNext = 9 * level - 158;
        xp = (xpForNext * xpPercent);
    } else if (level >= 16) {
        let xpForNext = 5 * level - 38;
        xp = (xpForNext * xpPercent);
    } else {
        let xpForNext = 2 * level + 7;
        xp = (xpForNext * xpPercent);
    }
    return Math.round(xp).toString();
}
function player_exp_Placeholder(player: Player) {
    return player.getAttribute(AttributeId.PlayerExperience).toFixed(2).toString();
}
function player_fly_speed_Placeholder(player: Player): string {
    let abilities = player.abilities;
    let flySpeed = abilities.getAbility(AbilitiesIndex.FlySpeed).getValue();
    if (flySpeed) {
        return flySpeed.toString();
    }
    return "";
}
function player_food_level_Placeholder(player: Player): string {
    return player.getAttribute(AttributeId.PlayerHunger).toString();
}
function player_gamemode_Placeholder(player: Player): string {
    let gamemode = player.getGameType();
    switch(gamemode) {
        case 0:
            return "Survival";
        case 1:
            return "Creative";
        case 2:
            return "Adventure"
        default:
            return ""
    }
}

function player_name_Placeholder(player: Player): string {
    return player.getName();
}
function player_has_empty_slot_Placeholder(player: Player): string {
    let slots = player.getInventory().getSlots();
    let hasSlot = false;
    for (let slot of slots) {
        if (slot.getId() === 0) {
            hasSlot = true;
        }
    }
    return hasSlot.toString();
}

function player_empty_slots_Placeholder(player: Player) {
    let inventory = player.getInventory();
    let slots = inventory.getSlots();
    let airSlots = 0;
    for (let slot of slots) {
        if (slot.getId() === 0) airSlots++;
    }
    return airSlots.toString();
}
function player_has_potioneffect_Placeholder(player: Player, params: any): string {
    let effectId = MobEffectIds[params[0] as keyof typeof MobEffectIds]
    if (!effectId) throw new Error(`Invalid effect id: ${params[0]}`);
    let hasEffect = player.hasEffect(effectId);
    return hasEffect.toString();
}
function player_health_Placeholder(player: Player): string {
    return player.getAttribute(AttributeId.Health).toString();
}
function player_ip_Placeholder(player: Player) {
    return player.getNetworkIdentifier().toString().split("|")[0];
}
function player_is_flying_Placeholder(player: Player): string {
    let abilities = player.abilities;
    let flying = abilities.getAbility(AbilitiesIndex.Flying).getBool();
    return flying.toString();
}
function player_is_sneaking_Placeholder(player: Player): string {
    return Actor_IsSneaking(player).toString();
}
function player_is_sprinting_Placeholder(player: Player): string {
    let mob = player as unknown as Mob;
    return Mob_isSprinting.call(mob).toString();
}
function player_is_sleeping_Placeholder(player: Player): string {
    return player.isSleeping().toString();
}
function player_is_inside_vehicle_Placeholder(player: Player): string {
    return Actor_isRiding.call(player).toString();
}
function player_is_op_Placeholder(player: Player): string {
    let level = player.getPermissionLevel();
    return (level === PlayerPermission.OPERATOR).toString();
}
function player_item_in_hand_Placeholder(player: Player): string {
    return player.getMainhandSlot().getName();
}
function player_item_in_hand_name_Placeholder(player: Player): string {
    return player.getMainhandSlot().getCustomName();
}
function player_item_in_hand_data_Placeholder(player: Player): string {
    return player.getMainhandSlot().getDamageValue().toString();
}
function player_item_in_hand_level_Placeholder(player: Player, param: (string | string[])[] ): string {
    let item = player.getMainhandSlot();
    let enchantString = param[0];
    let enchantId = Enchants[enchantString as keyof typeof Enchants];
    return EnchantUtils_getEnchantLevel.call(enchantId, item).toString();
}
function player_item_in_offhand_Placeholder(player: Player): string {
    return player.getOffhandSlot().getName();
}
function player_item_in_offhand_name_Placeholder(player: Player): string {
    return player.getOffhandSlot().getCustomName();
}
function player_item_in_offhand_data_Placeholder(player: Player): string {
    return player.getOffhandSlot().getDamageValue().toString();
}
function player_item_in_offhand_level_Placeholder(player: Player, param: (string | string[])[] ): string {
    let item = player.getOffhandSlot();
    let enchantString = param[0];
    let enchantId = Enchants[enchantString as keyof typeof Enchants];
    return EnchantUtils_getEnchantLevel(enchantId, item).toString();
}
function player_locale_Placeholder(player: Player): string {
    let local = localeMap.get(player.getNetworkIdentifier().toString());
    if (!local) return "";
    return local;
}
function player_locale_display_name_Placeholder(player: Player): string {
    let local = localeMap.get(player.getNetworkIdentifier().toString());
    if (!local) return "";
    let splitLocale = local.split("_");
    let countryName = getCountryName(splitLocale[1]);
    let languageCode = getLanguageName(splitLocale[0]);
    return `${languageCode.name} (${countryName})`;
}
function player_locale_short_Placeholder(player: Player) {
    let local = localeMap.get(player.getNetworkIdentifier().toString());
    if (!local) return "";
    let splitLocale = local.split("_");
    return splitLocale[0];
}
function player_locale_country_Placeholder(player: Player) {
    let local = localeMap.get(player.getNetworkIdentifier().toString());
    if (!local) return "";
    let splitLocale = local.split("_");
    return splitLocale[1];
}
function player_locale_display_country_Placeholder(player: Player) {
    let local = localeMap.get(player.getNetworkIdentifier().toString());
    if (!local) return "";
    let splitLocale = local.split("_");
    let countryName = getCountryName(splitLocale[1]);
    return countryName;
}
function player_level_Placeholder(player: Player) {
    return player.getAttribute(AttributeId.PlayerLevel).toString();
}
function player_max_health_Placeholder(player: Player) {
    return Actor_GetMaxHealth.call(player).toString();
}
function player_saturation_Placeholder(player: Player) {
    return player.getAttribute(AttributeId.PlayerSaturation).toString();
}
function player_sleep_miliseconds_Placeholder(player: Player): string {
    return Player_getSleepTimer.call(player).toString();
}
function player_uuid_Placeholder(player: Player): string {
    let uuidBin = player.getUniqueIdBin();
    return bin.toString(uuidBin);
}
function player_xuid_Placeholder(player: Player): string {
    let cert: Certificate = player.getCertificate()
    return cert.getXuid();
}
function player_walk_speed_Placeholder(player: Player): string {
    return Player_canUseAbility.call(player, AbilitiesIndex.WalkSpeed);
}
function player_world_Placeholder(player: Player): string {
    return player.getDimensionId().toString();
}
function player_world_time_12_Placeholder(player: Player): string {
    let time = getTime();
    let isPm = false;
    if (time.hours === 0) {
        time.hours = 12;
    }
    if (time.hours > 12) {
        time.hours -= 12;
    }
    if (time.dayTime >= 6000 && time.dayTime <= 18000) {
        isPm = true;
    }
    return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')} ${isPm ? "PM" : "AM"}`;
}
function player_world_time_24_Placeholder(player: Player): string {
    let time = getTime();
    return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}`
}
function player_x_Placeholder(player: Player): string {
    return player.getPosition().x.toString();
}
function player_y_Placeholder(player: Player): string {
    return player.getPosition().y.toString();
}
function player_z_Placeholder(player: Player): string {
    return player.getPosition().z.toString();
}
function player_yaw_Placeholder(player: Player): string {
    return Actor_GetRotation.call(player).y;
}
function player_pitch_Placeholder(player: Player): string {
    return Actor_GetRotation.call(player).x;
}


registerPlaceholder("player_allow_flight", player_allow_flight_Placeholder);
registerPlaceholder("player_armor_helmet_name", player_armor_helmet_name_Placeholder);
registerPlaceholder("player_armor_helmet_data", player_armor_helmet_data_Placeholder);
registerPlaceholder("player_armor_torso_name", player_armor_torso_name_Placeholder);
registerPlaceholder("player_armor_torso_data", player_armor_torso_data_Placeholder);
registerPlaceholder("player_armor_leggings_name", player_armor_leggings_name_Placeholder);
registerPlaceholder("player_armor_leggings_data", player_armor_leggings_data_Placeholder);
registerPlaceholder("player_armor_boots_name", player_armor_boots_name_Placeholder);
registerPlaceholder("player_armor_boots_data", player_armor_boots_data_Placeholder);
registerPlaceholder("player_bed_x", player_bed_x_Placeholder);
registerPlaceholder("player_bed_y", player_bed_y_Placeholder);
registerPlaceholder("player_bed_z", player_bed_z_Placeholder);
registerPlaceholder("player_bed_world", player_bed_world_Placeholder);
registerPlaceholder("player_biome", player_biome_Placeholder);
registerPlaceholder("player_biome_capitalized", player_biome_capitalized_Placeholder);
registerPlaceholder("player_current_exp", player_current_xp_Placeholder);
registerPlaceholder("player_direction", player_direction_Placeholder);
registerPlaceholder("player_direction_xz", player_direction_xz_Placeholder);
registerPlaceholder("player_total_exp", player_current_xp_Placeholder);
registerPlaceholder("player_exp", player_exp_Placeholder);
registerPlaceholder("player_exp_to_level", player_exp_to_level_Placeholder);
registerPlaceholder("player_name", player_name_Placeholder);
registerPlaceholder("player_fly_speed", player_fly_speed_Placeholder);
registerPlaceholder("player_food_level", player_food_level_Placeholder);
registerPlaceholder("player_gamemode", player_gamemode_Placeholder);
registerPlaceholder("player_has_empty_slot", player_has_empty_slot_Placeholder);
registerPlaceholder("player_empty_slots", player_empty_slots_Placeholder);
registerPlaceholder("player_has_potioneffect_<effect>", player_has_potioneffect_Placeholder);
registerPlaceholder("player_health", player_health_Placeholder);
registerPlaceholder("player_ip", player_ip_Placeholder);
registerPlaceholder("player_is_flying", player_is_flying_Placeholder);
registerPlaceholder("player_is_sneaking", player_is_sneaking_Placeholder);
registerPlaceholder("player_is_sprinting", player_is_sprinting_Placeholder);
registerPlaceholder("player_is_sleeping", player_is_sleeping_Placeholder);
registerPlaceholder("player_is_inside_vehicle", player_is_inside_vehicle_Placeholder);
registerPlaceholder("player_is_op", player_is_op_Placeholder);
registerPlaceholder("player_item_in_hand", player_item_in_hand_Placeholder);
registerPlaceholder("player_item_in_hand_name", player_item_in_hand_name_Placeholder);
registerPlaceholder("player_item_in_hand_data", player_item_in_hand_data_Placeholder);
registerPlaceholder("player_item_in_hand_level_<enchant>", player_item_in_hand_level_Placeholder);
registerPlaceholder("player_item_in_offhand", player_item_in_offhand_Placeholder);
registerPlaceholder("player_item_in_offhand_name", player_item_in_offhand_name_Placeholder);
registerPlaceholder("player_item_in_offhand_data", player_item_in_offhand_data_Placeholder);
registerPlaceholder("player_item_in_offhand_level_<enchant>", player_item_in_offhand_level_Placeholder);
registerPlaceholder("player_locale", player_locale_Placeholder);
registerPlaceholder("player_locale_display_name", player_locale_display_name_Placeholder);
registerPlaceholder("player_locale_short", player_locale_short_Placeholder);
registerPlaceholder("player_locale_country", player_locale_country_Placeholder);
registerPlaceholder("player_locale_display_country", player_locale_display_country_Placeholder);
registerPlaceholder("player_level", player_level_Placeholder);
registerPlaceholder("player_max_health", player_max_health_Placeholder);
registerPlaceholder("player_saturation", player_saturation_Placeholder);
registerPlaceholder("player_sleep_timer", player_sleep_miliseconds_Placeholder);
registerPlaceholder("player_compass_x", player_compass_x_Placeholder);
registerPlaceholder("player_compass_y", player_compass_y_Placeholder);
registerPlaceholder("player_compass_z", player_compass_z_Placeholder);
registerPlaceholder("player_uuid", player_uuid_Placeholder);
registerPlaceholder("player_xuid", player_xuid_Placeholder);
registerPlaceholder("player_walk_speed", player_walk_speed_Placeholder);
registerPlaceholder("player_world", player_world_Placeholder);
registerPlaceholder("player_world_time_12", player_world_time_12_Placeholder);
registerPlaceholder("player_world_time_24", player_world_time_24_Placeholder);
registerPlaceholder("player_x", player_x_Placeholder);
registerPlaceholder("player_y", player_y_Placeholder);
registerPlaceholder("player_z", player_z_Placeholder);
registerPlaceholder("player_yaw", player_yaw_Placeholder);
registerPlaceholder("player_pitch", player_pitch_Placeholder);