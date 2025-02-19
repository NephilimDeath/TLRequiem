import {Terraria, Microsoft, System} from "./ModImports.js";

import { ModPlayer } from "./ModPlayer.js";

import { GlobalTile } from "./GlobalTile.js";

import { GlobalNPC } from "./GlobalNPC.js";

import { ModTexture } from "./ModTexture.js";

import { TileData } from "./TileData.js";

import { ModProjectile } from "./ModProjectile.js";

import { ItemLoader } from "./Loaders/ItemLoader.js";

import { CombinedLoader } from "./Loaders/CombinedLoader.js";

import { PlayerLoader } from "./Loaders/PlayerLoader.js";

import { NPCLoader } from "./Loaders/NPCLoader.js";

import {RequiemPlayer} from "../Content/RequiemPlayer.js";
import {StellarPendant} from "../Content/Items/Accessories/StellarPendant.js";
import {ProjectileLoader} from "./Loaders/ProjectileLoader.js";

export class ModHooks {
	static OnHitTemp = [];
    static ExtractinatorTemp = {};

    static isInitialized = false;

    static initialize() {
        if (ModHooks.isInitialized) return;

        Terraria.Projectile.SetDefaults.hook((original, self, type) => {
            original(self, type);
            const projectile = ModProjectile.getModProjectile(type);
            projectile?.SetDefaults();
            Object.assign(self, projectile?.Projectile);
        });

        Terraria.WorldGen.KillTile.hook((original, i, j, fail, effectOnly, noItem) => {
            original(i, j, fail, effectOnly, noItem);

            const tileData = new TileData(i, j);
            let tileType = tileData.type;

            for (let tile of GlobalTile.RegisteredTiles) {
                tile.KillTile(i, j, tileType, fail, effectOnly, noItem);
            }
        });

        // Terraria.Main.DrawNPCDirect.hook((original, self, mySpriteBatch, rCurrentNPC, behindTiles, screenPos) => {
        //     original(self, mySpriteBatch, rCurrentNPC, behindTiles, screenPos);
        //
        //     for (let npc of GlobalNPC.RegisteredNPC) {
        //         npc.PostDraw(self, mySpriteBatch, screenPos);
        //     }
        // });

        Terraria.NPC.NPCLoot.hook((original, self) => {
            if (!NPCLoader.PreKill(self)) {
                return;
            }

            original(self);

            NPCLoader.NPCLoot(self);
            NPCLoader.OnKill(self);
        });

        Terraria.Player.Update.hook((original, self, i) => {
            PlayerLoader.PreUpdate(self);
            original(self, i);
            PlayerLoader.PostUpdate(self);
        });

        Terraria.Lang.GetItemName.hook((original, id) => {

            id = Terraria.ID.ItemID.FromNetId(id);

            if (id < ItemLoader.MAX_VANILLA_ID) {
                return original(id);
            }

            const cache = Terraria.Lang._itemNameCache;

            if (id > 0 && cache[id] != null) {
                return cache[id];
            }

            return Terraria.Localization.LocalizedText.Empty;
        });

        Terraria.Item.Prefix.hook((original, self, pre) => {
            if (self.type < ItemLoader.MAX_VANILLA_ID) {
                return original(self, pre);
            }

            if (pre === 0 || self.type === 0) {
                return false;
            }

            let unifiedRandom = Terraria.WorldGen ? Terraria.WorldGen.genRand : Terraria.Main.rand;
            let prefix = pre;
            let damage = 1.0;
            let knockBack = 1.0;
            let animation = 1.0;
            let scale = 1.0;
            let shootSpeed = 1.0;
            let mana = 1.0;
            let crit = 0;
            let flag = true;
            while (flag) {
                damage = 1.0;
                knockBack = 1.0;
                animation = 1.0;
                scale = 1.0;
                shootSpeed = 1.0;
                mana = 1.0;
                crit = 0;
                flag = false;
                if (pre === -1 && unifiedRandom['int Next(int maxValue)'](4) === 0) {
                    prefix = 0;
                }

                if (pre < -1) {
                    prefix = -1;
                }

                if (prefix === -1 || prefix === -2 || prefix === -3) {
                    const modPrefix = ItemLoader.ChoosePrefix(self, unifiedRandom);
					if (modPrefix >= 0) {
					    prefix = modPrefix;
					} else if (ItemLoader.MeleePrefix(self)) {
                        let meleeRandom = unifiedRandom['int Next(int maxValue)'](40);
                        switch (meleeRandom) {
                            case 0:
                                prefix = 1;
                                break;
                            case 1:
                                prefix = 2;
                                break;
                            case 2:
                                prefix = 3;
                                break;
                            case 3:
                                prefix = 4;
                                break;
                            case 4:
                                prefix = 5;
                                break;
                            case 5:
                                prefix = 6;
                                break;
                            case 6:
                                prefix = 7;
                                break;
                            case 7:
                                prefix = 8;
                                break;
                            case 8:
                                prefix = 9;
                                break;
                            case 9:
                                prefix = 10;
                                break;
                            case 10:
                                prefix = 11;
                                break;
                            case 11:
                                prefix = 12;
                                break;
                            case 12:
                                prefix = 13;
                                break;
                            case 13:
                                prefix = 14;
                                break;
                            case 14:
                                prefix = 15;
                                break;
                            case 15:
                                prefix = 36;
                                break;
                            case 16:
                                prefix = 37;
                                break;
                            case 17:
                                prefix = 38;
                                break;
                            case 18:
                                prefix = 53;
                                break;
                            case 19:
                                prefix = 54;
                                break;
                            case 20:
                                prefix = 55;
                                break;
                            case 21:
                                prefix = 39;
                                break;
                            case 22:
                                prefix = 40;
                                break;
                            case 23:
                                prefix = 56;
                                break;
                            case 24:
                                prefix = 41;
                                break;
                            case 25:
                                prefix = 57;
                                break;
                            case 26:
                                prefix = 42;
                                break;
                            case 27:
                                prefix = 43;
                                break;
                            case 28:
                                prefix = 44;
                                break;
                            case 29:
                                prefix = 45;
                                break;
                            case 30:
                                prefix = 46;
                                break;
                            case 31:
                                prefix = 47;
                                break;
                            case 32:
                                prefix = 48;
                                break;
                            case 33:
                                prefix = 49;
                                break;
                            case 34:
                                prefix = 50;
                                break;
                            case 35:
                                prefix = 51;
                                break;
                            case 36:
                                prefix = 59;
                                break;
                            case 37:
                                prefix = 60;
                                break;
                            case 38:
                                prefix = 61;
                                break;
                            case 39:
                                prefix = 81;
                                break;
                        }
                    } else if (ItemLoader.WeaponPrefix(self)) {
                        let weaponRandom = unifiedRandom['int Next(int maxValue)'](14);
                        switch (weaponRandom) {
                            case 0:
                                prefix = 36;
                                break;
                            case 1:
                                prefix = 37;
                                break;
                            case 2:
                                prefix = 38;
                                break;
                            case 3:
                                prefix = 53;
                                break;
                            case 4:
                                prefix = 54;
                                break;
                            case 5:
                                prefix = 55;
                                break;
                            case 6:
                                prefix = 39;
                                break;
                            case 7:
                                prefix = 40;
                                break;
                            case 8:
                                prefix = 56;
                                break;
                            case 9:
                                prefix = 41;
                                break;
                            case 10:
                                prefix = 57;
                                break;
                            case 11:
                                prefix = 59;
                                break;
                            case 12:
                                prefix = 60;
                                break;
                            case 13:
                                prefix = 61;
                                break;
                        }
                    } else if (ItemLoader.RangedPrefix(self)) {
                        let rangedRandom = unifiedRandom['int Next(int maxValue)'](35);
                        switch (rangedRandom) {
                            case 0:
                                prefix = 16;
                                break;
                            case 1:
                                prefix = 17;
                                break;
                            case 2:
                                prefix = 18;
                                break;
                            case 3:
                                prefix = 19;
                                break;
                            case 4:
                                prefix = 20;
                                break;
                            case 5:
                                prefix = 21;
                                break;
                            case 6:
                                prefix = 22;
                                break;
                            case 7:
                                prefix = 23;
                                break;
                            case 8:
                                prefix = 24;
                                break;
                            case 9:
                                prefix = 25;
                                break;
                            case 10:
                                prefix = 58;
                                break;
                            case 11:
                                prefix = 36;
                                break;
                            case 12:
                                prefix = 37;
                                break;
                            case 13:
                                prefix = 38;
                                break;
                            case 14:
                                prefix = 53;
                                break;
                            case 15:
                                prefix = 54;
                                break;
                            case 16:
                                prefix = 55;
                                break;
                            case 17:
                                prefix = 39;
                                break;
                            case 18:
                                prefix = 40;
                                break;
                            case 19:
                                prefix = 56;
                                break;
                            case 20:
                                prefix = 41;
                                break;
                            case 21:
                                prefix = 57;
                                break;
                            case 22:
                                prefix = 42;
                                break;
                            case 23:
                                prefix = 44;
                                break;
                            case 24:
                                prefix = 45;
                                break;
                            case 25:
                                prefix = 46;
                                break;
                            case 26:
                                prefix = 47;
                                break;
                            case 27:
                                prefix = 48;
                                break;
                            case 28:
                                prefix = 49;
                                break;
                            case 29:
                                prefix = 50;
                                break;
                            case 30:
                                prefix = 51;
                                break;
                            case 31:
                                prefix = 59;
                                break;
                            case 32:
                                prefix = 60;
                                break;
                            case 33:
                                prefix = 61;
                                break;
                            case 34:
                                prefix = 82;
                                break;
                        }
                    } else if (ItemLoader.MagicPrefix(self)) {
                        let magicRandom = unifiedRandom['int Next(int maxValue)'](36);
                        switch (magicRandom) {
                            case 0:
                                prefix = 26;
                                break;
                            case 1:
                                prefix = 27;
                                break;
                            case 2:
                                prefix = 28;
                                break;
                            case 3:
                                prefix = 29;
                                break;
                            case 4:
                                prefix = 30;
                                break;
                            case 5:
                                prefix = 31;
                                break;
                            case 6:
                                prefix = 32;
                                break;
                            case 7:
                                prefix = 33;
                                break;
                            case 8:
                                prefix = 34;
                                break;
                            case 9:
                                prefix = 35;
                                break;
                            case 10:
                                prefix = 52;
                                break;
                            case 11:
                                prefix = 36;
                                break;
                            case 12:
                                prefix = 37;
                                break;
                            case 13:
                                prefix = 38;
                                break;
                            case 14:
                                prefix = 53;
                                break;
                            case 15:
                                prefix = 54;
                                break;
                            case 16:
                                prefix = 55;
                                break;
                            case 17:
                                prefix = 39;
                                break;
                            case 18:
                                prefix = 40;
                                break;
                            case 19:
                                prefix = 56;
                                break;
                            case 20:
                                prefix = 41;
                                break;
                            case 21:
                                prefix = 57;
                                break;
                            case 22:
                                prefix = 42;
                                break;
                            case 23:
                                prefix = 43;
                                break;
                            case 24:
                                prefix = 44;
                                break;
                            case 25:
                                prefix = 45;
                                break;
                            case 26:
                                prefix = 46;
                                break;
                            case 27:
                                prefix = 47;
                                break;
                            case 28:
                                prefix = 48;
                                break;
                            case 29:
                                prefix = 49;
                                break;
                            case 30:
                                prefix = 50;
                                break;
                            case 31:
                                prefix = 51;
                                break;
                            case 32:
                                prefix = 59;
                                break;
                            case 33:
                                prefix = 60;
                                break;
                            case 34:
                                prefix = 61;
                                break;
                            case 35:
                                prefix = 83;
                                break;
                        }
                    } else {
                        if (!self.IsAPrefixableAccessory()) {
                            return false;
                        }
                        prefix = unifiedRandom['int Next(int minValue, int maxValue)'](62, 81);
                    }
                }

                switch (pre) {
                    case -3:
						return true;
					case -1: {
                        if ((prefix === 7 || prefix === 8 || prefix === 9 || prefix === 10 || prefix === 11 || prefix === 22 || prefix === 23 ||
                            prefix === 24 || prefix === 29 ||prefix === 30 || prefix === 31 || prefix === 39 || prefix === 40 || prefix === 56 ||
                            prefix === 41 || prefix === 47 || prefix === 48 || prefix === 49) && !unifiedRandom['int Next(int maxValue)'](3) !== 0) {
                            prefix = 0;
                        }
                        break;
                    }	
                }

                switch (prefix) {
                    case 1:
                        scale = 1.12;
                        break;
                    case 2:
                        scale = 1.18;
                        break;
                    case 3:
                        damage = 1.05;
                        crit = 2;
                        scale = 1.05;
                        break;
                    case 4:
                        damage = 1.1;
                        scale = 1.1;
                        knockBack = 1.1;
                        break;
                    case 5:
                        damage = 1.15;
                        break;
                    case 6:
                        damage = 1.1;
                        break;
                    case 81:
                        knockBack = 1.15;
                        damage = 1.15;
                        crit = 5;
                        animation = 0.9;
                        scale = 1.1;
                        break;
                    case 7:
                        scale = 0.82;
                        break;
                    case 8:
                        knockBack = 0.85;
                        damage = 0.85;
                        scale = 0.87;
                        break;
                    case 9:
                        scale = 0.9;
                        break;
                    case 10:
                        damage = 0.85;
                        break;
                    case 11:
                        animation = 1.1;
                        knockBack = 0.9;
                        scale = 0.9;
                        break;
                    case 12:
                        knockBack = 1.1;
                        damage = 1.05;
                        scale = 1.1;
                        animation = 1.15;
                        break;
                    case 13:
                        knockBack = 0.8;
                        damage = 0.9;
                        scale = 1.1;
                        break;
                    case 14:
                        knockBack = 1.15;
                        animation = 1.1;
                        break;
                    case 15:
                        knockBack = 0.9;
                        animation = 0.85;
                        break;
                    case 16:
                        damage = 1.1;
                        crit = 3;
                        break;
                    case 17:
                        animation = 0.85;
                        shootSpeed = 1.1;
                        break;
                    case 18:
                        animation = 0.9;
                        shootSpeed = 1.15;
                        break;
                    case 19:
                        knockBack = 1.15;
                        shootSpeed = 1.05;
                        break;
                    case 20:
                        knockBack = 1.05;
                        shootSpeed = 1.05;
                        damage = 1.1;
                        animation = 0.95;
                        crit = 2;
                        break;
                    case 21:
                        knockBack = 1.15;
                        damage = 1.1;
                        break;
                    case 82:
                        knockBack = 1.15;
                        damage = 1.15;
                        crit = 5;
                        animation = 0.9;
                        shootSpeed = 1.1;
                        break;
                    case 22:
                        knockBack = 0.9;
                        shootSpeed = 0.9;
                        damage = 0.85;
                        break;
                    case 23:
                        animation = 1.15;
                        shootSpeed = 0.9;
                        break;
                    case 24:
                        animation = 1.1;
                    knockBack = 0.8;
                        break;
                    case 25:
                        animation = 1.1;
                    damage = 1.15;
                    crit = 1;
                        break;
                    case 58:
                        animation = 0.85;
                        damage = 0.85;
                        break;
                    case 26:
                        mana = 0.85;
                        damage = 1.1;
                        break;
                    case 27:
                        mana = 0.85;
                        break;
                    case 28:
                        mana = 0.85;
                        damage = 1.15;
                        knockBack = 1.05;
                        break;
                    case 83:
                        knockBack = 1.15;
                        damage = 1.15;
                        crit = 5;
                        animation = 0.9;
                        mana = 0.9;
                        break;
                    case 29:
                        mana = 1.1;
                        break;
                    case 30:
                        mana = 1.2;
                        damage = 0.9;
                        break;
                    case 31:
                        knockBack = 0.9;
                        damage = 0.9;
                        break;
                    case 32:
                        mana = 1.15;
                        damage = 1.1;
                        break;
                    case 33:
                        mana = 1.1;
                        knockBack = 1.1;
                        animation = 0.9;
                        break;
                    case 34:
                        mana = 0.9;
                        knockBack = 1.1;
                        animation = 1.1;
                        damage = 1.1;
                        break;
                    case 35:
                        mana = 1.2;
                        damage = 1.15;
                        knockBack = 1.15;
                        break;
                    case 52:
                        mana = 0.9;
                        damage = 0.9;
                        animation = 0.9;
                        break;
                    case 84:
                        knockBack = 1.17;
                        damage = 1.17;
                        crit = 8;
                        break;
                    case 36:
                        crit = 3;
                        break;
                    case 37:
                        damage = 1.1;
                        crit = 3;
                        knockBack = 1.1;
                        break;
                    case 38:
                        knockBack = 1.15;
                        break;
                    case 53:
                        damage = 1.1;
                        break;
                    case 54:
                        knockBack = 1.15;
                        break;
                    case 55:
                        knockBack = 1.15;
                        damage = 1.05;
                        break;
                    case 59:
                        knockBack = 1.15;
                        damage = 1.15;
                        crit = 5;
                        break;
                    case 60:
                        damage = 1.15;
                        crit = 5;
                        break;
                    case 61:
                        crit = 5;
                        break;
                    case 39:
                        damage = 0.7;
                        knockBack = 0.8;
                        break;
                    case 40:
                        damage = 0.85;
                        break;
                    case 56:
                        knockBack = 0.8;
                        break;
                    case 41:
                        knockBack = 0.85;
                        damage = 0.9;
                        break;
                    case 57:
                        knockBack = 0.9;
                        damage = 1.18;
                        break;
                    case 42:
                        animation = 0.9;
                        break;
                    case 43:
                        damage = 1.1;
                        animation = 0.9;
                        break;
                    case 44:
                        animation = 0.9;
                        crit = 3;
                        break;
                    case 45:
                        animation = 0.95;
                        break;
                    case 46:
                        crit = 3;
                        animation = 0.94;
                        damage = 1.07;
                        break;
                    case 47:
                        animation = 1.15;
                        break;
                    case 48:
                        animation = 1.2;
                        break;
                    case 49:
                        animation = 1.08;
                        break;
                    case 50:
                        damage = 0.8;
                        animation = 1.15;
                        break;
                    case 51:
                        knockBack = 0.9;
                        animation = 0.9;
                        damage = 1.05;
                        crit = 2;
                        break;

                }

                if (damage != 1.0 && Math.round(self.damage * damage) === self.damage) {
                    flag = true;
                    prefix = -1;
                }
                if (animation != 1.0 && Math.round(self.useAnimation * animation) === self.useAnimation) {
                    flag = true;
                    prefix = -1;
                }
                if (mana != 1.0 && Math.round(self.mana * mana) === self.mana) {
                    flag = true;
                    prefix = -1;
                }
                if (knockBack != 1.0 && self.knockBack == 0.0) {
                    flag = true;
                    prefix = -1;
                }
                if (pre === -2 && prefix === 0) {
                    prefix = -1;
                    flag = true;
                }

                if (!flag && !ItemLoader.AllowPrefix(self, prefix)) {
                    flag = true;
                }
            }

            self.damage = Math.round(self.damage * damage);
            self.useAnimation = Math.round(self.useAnimation * animation);
            self.useTime = Math.round(self.useTime * animation);
            self.reuseDelay = Math.round(self.reuseDelay * animation);
            self.mana = Math.round(self.mana * mana);
            self.knockBack *= knockBack;
            self.scale *= scale;
            self.shootSpeed *= shootSpeed;
            self.crit += crit;

            let value = 1.0 * damage * (2.0 - animation) * (2.0 - mana) * scale * knockBack * shootSpeed * (1.0 + crit * 0.02);
            if (prefix === 62 || prefix === 69 || prefix === 73 || prefix === 77) {
                value *= 1.05;
            }

            if (prefix === 63 || prefix === 70 || prefix === 74 || prefix === 78 || prefix === 67) {
                value *= 1.1;
            }

            if (prefix === 64 || prefix === 71 || prefix === 75 || prefix === 79 || prefix === 66) {
                value *= 1.15;
            }

            if (prefix === 65 || prefix === 72 || prefix === 76 || prefix === 80 || prefix === 68) {
                value *= 1.2;
            }

            if (value >= 1.2) {
                self.rare += 2;
            } else if (value >= 1.05) {
                self.rare++;
            } else if (value <= 0.8) {
                self.rare -= 2;
            } else if (value <= 0.95) {
                self.rare--;
            }

            if (self.rare > -11) {
                if (self.rare < -1) {
                    self.rare = -1;
                }
                if (self.rare > 11) {
                    self.rare = 11;
                }
            }
            
            value *= value;
            self.value = self.value * value;
            self.prefix = prefix;
            return true;
        });

        Terraria.Main.Initialize_AlmostEverything.hook((original, self) => {
            original(self);
            ItemLoader.InitializeRegisteredItems();
            //ModProjectile.InitializeRegisteredProjectiles();
        });

        Terraria.Item['void SetDefaults(int Type, bool noMatCheck)'].hook((original, self, type, noMatCheck) => {
            if (type < ItemLoader.MAX_VANILLA_ID) {
                original(self,type, noMatCheck);
                ItemLoader.SetDefaults(self);
                return;
            }

            self.tooltipContext = -1;
            self.BestiaryNotes = "";
            self.sentry = false;
            self.canBePlacedInVanityRegardlessOfConditions = false;
            self.DD2Summon = false;
            self.shopSpecialCurrency = -1;
            self.expert = false;
            self.isAShopItem = false;
            self.expertOnly = false;
            self.instanced = false;
            self.questItem = false;
            self.fishingPole = 0;
            self.bait = 0;
            self.hairDye = -1;
            self.makeNPC = 0;
            self.dye = 0;
            self.paint = 0;
            self.tileWand = -1;
            self.notAmmo = false;
            self.netID = 0;
            self.prefix = 0;
            self.crit = 0;
            self.mech = false;
            self.flame = false;
            self.reuseDelay = 0;
            self.melee = false;
            self.magic = false;
            self.ranged = false;
            self.summon = false;
            self.placeStyle = 0;
            self.buffTime = 0;
            self.buffType = 0;
            self.mountType = -1;
            self.cartTrack = false;
            self.material = false;
            self.noWet = false;
            self.vanity = false;
            self.mana = 0;
            self.wet = false;
            self.wetCount = 0;
            self.lavaWet = false;
            self.channel = false;
            self.manaIncrease = 0;
            self.timeSinceTheItemHasBeenReservedForSomeone = 0;
            self.noMelee = false;
            self.noUseGraphic = false;
            self.lifeRegen = 0;
            self.shootSpeed = 0;
            self.active = true;
            self.alpha = 0;
            self.ammo = Terraria.ID.AmmoID.None;
            self.useAmmo = Terraria.ID.AmmoID.None;
            self.autoReuse = false;
            self.accessory = false;
            self.axe = 0;
            self.healMana = 0;
            self.bodySlot = -1;
            self.legSlot = -1;
            self.headSlot = -1;
            self.potion = false;
            self.color = Microsoft.Xna.Framework.Graphics.Color.new();
            self.glowMask = -1;
            self.consumable = false;
            self.createTile = -1;
            self.createWall = -1;
            self.damage = -1;
            self.defense = 0;
            self.hammer = 0;
            self.healLife = 0;
            self.holdStyle = 0;
            self.knockBack = 0;
            self.maxStack = 1;
            self.pick = 0;
            self.rare = 0;
            self.scale = 1;
            self.shoot = 0;
            self.stack = 1;
            self.tileBoost = 0;
            self.useStyle = 0;
            self.useTime = 100;
            self.useAnimation = 100;
            self.value = 0;
            self.useTurn = false;
            self.buy = false;
            self.handOnSlot = -1;
            self.handOffSlot = -1;
            self.backSlot = -1;
            self.frontSlot = -1;
            self.shoeSlot = -1;
            self.waistSlot = -1;
            self.wingSlot = -1;
            self.shieldSlot = -1;
            self.neckSlot = -1;
            self.faceSlot = -1;
            self.balloonSlot = -1;
            self.uniqueStack = false;
            self.favorited = false;
            self.type = type;
            const item = ItemLoader.getModItem(type);
            item?.SetDefaults();
            Object.assign(self, item?.Item);
        });

        Terraria.Player.UpdateArmorSets.hook((original, self, i) => {
            original(self, i);
            const armor = self.armor;
            ItemLoader.UpdateArmorSet(self, armor[0], armor[1], armor[2])
        });

        Terraria.Utils['Rectangle Frame(Texture2D tex, int horizontalFrames, int verticalFrames, int frameX, int frameY, int sizeOffsetX, int sizeOffsetY)'].hook((original, tex, horizontalFrames, verticalFrames, frameX, frameY, sizeOffsetX, sizeOffsetY) => {
            const textureOverrideInfo = ModTexture.overrideFrames[tex._sourceLoadAsset];
            if (textureOverrideInfo != undefined && textureOverrideInfo != -1) {
                verticalFrames = textureOverrideInfo;
            }

            const result = original(tex, horizontalFrames, verticalFrames, frameX, frameY, sizeOffsetX, sizeOffsetY);
            return result;
        });


        Terraria.Item.GetDrawHitbox.hook((original, type, user) => {
            let result = original(type, user);
            if (type >= ItemLoader.MAX_VANILLA_ID) {
                const texture = Terraria.GameContent.TextureAssets.Item[type].Value;
                const rectangle = Microsoft.Xna.Framework.Rectangle.new();
                rectangle.X = 0;
                rectangle.Y = 0;
                rectangle.Width = texture.get_Width();
                rectangle.Height = texture.get_Height();
                result = rectangle;
            }

            return result;
        });

        Terraria.Player.UpdateEquips.hook((original, self, i) => {
            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.PreUpdateEquips();
            }
            original(self, i);
            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.PostUpdateEquips();
            }

            for (let k = 0; k < 10; k++) {
                const armor = self.armor[k];
                if (self.IsAValidEquipmentSlotForIteration(k)) {
                    ItemLoader.UpdateEquip(armor, self);
                }
            }

            for (let j = 0; j < 58; j++) {
                const inventory = self.inventory[j];
                ItemLoader.UpdateInventory(inventory, self);
            }
        });

        Terraria.Player.ApplyEquipFunctional.hook((original, self, itemSlot, currentItem) => {
            original(self, itemSlot, currentItem);

            ItemLoader.UpdateAccessory(currentItem, self)
        });

        Terraria.Main.DrawPlayerItemPos.hook((original, gravityDirection, itemType) => {
            const result = original(gravityDirection, itemType);
            if (itemType >= ItemLoader.MAX_VANILLA_ID) {
                let holdoutOffset = ItemLoader.HoldoutOffset(gravityDirection, itemType);
                if (holdoutOffset) {
                    result.X = holdoutOffset.X;
                    result.Y += holdoutOffset.Y;
                }
            }

            return result;
        });

        Terraria.Item.CheckLavaDeath.hook((original, self, i) => {
            original(self, i);

            const canBurnInLava = ItemLoader.CanBurnInLava(self);
            if (canBurnInLava) {
                self.active = false;
                self.type = 0;
                self.stack = 0;
            }
        });

        Terraria.Player.ApplyEquipVanity.hook((original, self, itemSlot, currentItem) => {
            original(self, itemSlot, currentItem);

            ItemLoader.UpdateVanity(currentItem, self);
        });

        Terraria.Player.Spawn.hook((original, self, context) => {
            original(self, context);

            PlayerLoader.OnRespawn(self);
        });

        Terraria.Player.OnHit.hook((original, self, x, y, victim) => {
            original(self, x, y, victim);

            PlayerLoader.OnHitAnything(self, x, y, victim);
        });

        Terraria.Player.UpdateLifeRegen.hook((original, self) => {
            let flag = false;
            if (self.shinyStone && Math.abs(self.velocity.X) < 0.05 && Math.abs(self.velocity.Y) < 0.05 && self.itemAnimation === 0) {
                flag = true;
            }

            if (self.poisoned) {
                if (self.lifeRegen > 0) {
                    self.lifeRegen = 0;
                }
                
                self.lifeRegenTime = 0;
                self.lifeRegen -= 4;
            }

            if (self.venom) {
                if (self.lifeRegen > 0) {
                    self.lifeRegen = 0;
                }

                self.lifeRegenTime = 0;
                self.lifeRegen -= 30;
            }

            if (self.onFire) {
                if (self.lifeRegen > 0) {
                    self.lifeRegen = 0;
                }

                self.lifeRegenTime = 0;
                self.lifeRegen -= 8;
            }

            if (self.onFire3) {
                if (self.lifeRegen > 0) {
                    self.lifeRegen = 0;
                }

                self.lifeRegenTime = 0;
                self.lifeRegen -= 8;
            }

            if (self.onFrostBurn) {
                if (self.lifeRegen > 0) {
                    self.lifeRegen = 0;
                }

                self.lifeRegenTime = 0;
                self.lifeRegen -= 16;
            }

            if (self.onFrostBurn2) {
                if (self.lifeRegen > 0) {
                    self.lifeRegen = 0;
                }

                self.lifeRegenTime = 0;
                self.lifeRegen -= 16;
            }

            if (self.onFire2) {
                if (self.lifeRegen > 0) {
                    self.lifeRegen = 0;
                }

                self.lifeRegenTime = 0;
                self.lifeRegen -= 24;
            }

            if (self.burned) {
                if (self.lifeRegen > 0) {
                    self.lifeRegen = 0;
                }

                self.lifeRegenTime = 0;
                self.lifeRegen -= 60;
                self.moveSpeed *= 0.5;
            }

            if (self.suffocating) {
                if (self.lifeRegen > 0) {
                    self.lifeRegen = 0;
                }

                self.lifeRegenTime = 0;
                self.lifeRegen -= 40;
            }

            if (self.electrified) {
                if (self.lifeRegen > 0) {
                    self.lifeRegen = 0;
                }

                self.lifeRegenTime = 0;
                self.lifeRegen -= 8;
                if (self.controlLeft || self.controlRight) {
                    self.lifeRegen -= 32;
                }
            }

            if (self.tongued && Terraria.Main.expertMode) {
                if (self.lifeRegen > 0) {
                    self.lifeRegen = 0;
                }

                self.lifeRegenTime = 0;
                self.lifeRegen -= 100;
            }
            
            PlayerLoader.UpdateBadLifeRegen(self);

            if (self.honey && self.lifeRegen < 0) {
                self.lifeRegen += 4;
                if (self.lifeRegen > 0) {
                    self.lifeRegen = 0;
                }
            }

            if (self.lifeRegen < 0 && self.nebulaLevelLife > 0) {
                self.lifeRegen = 0;
            }

            if (flag && self.lifeRegen < 0) {
                self.lifeRegen /= 2;
            }

            self.lifeRegenTime++;
            if (self.crimsonRegen) {
                self.lifeRegenTime++;
            }

            if (self.soulDrain > 0) {
                self.lifeRegenTime += 2;
            }

            if (flag) {
                if (self.lifeRegenTime > 90 && self.lifeRegenTime < 1800) {
                    self.lifeRegenTime = 1800;
                }

                self.lifeRegenTime += 4;
                self.lifeRegen += 4;
            }

            if (self.honey) {
                self.lifeRegenTime += 2;
                self.lifeRegen += 2;
            }

            if (self.starving) {
                if (self.lifeRegen > 0) {
                    self.lifeRegen = 0;
                }

                if (self.lifeRegenCount > 0) {
                    self.lifeRegenCount = 0;
                }

                if (self.lifeRegenTime > 0) {
                    self.lifeRegenTime = 0;
                }

                let num = 3000;
                let num2 = 120 * self.statLifeMax2 / num;
                if (num2 < 4) {
                    num2 = 4;
                }

                self.lifeRegen = -num2;
            }

            if (self.soulDrain > 0) {
                let num3 = (5 + self.soulDrain) / 2;
                self.lifeRegenTime += num3;
                self.lifeRegen += num3;
            }

            if (self.heartyMeal) {
                let num4 = 3 * 120 / 60;
                self.lifeRegen += num4;
            }

            if (self.whoAmI === Terraria.Main.myPlayer && Terraria.Main.SceneMetrics.HasCampfire) {
                self.lifeRegen++;
            }

            if (self.whoAmI === Terraria.Main.myPlayer && Terraria.Main.SceneMetrics.HasHeartLantern) {
                self.lifeRegen += 2;
            }
            
            PlayerLoader.UpdateLifeRegen(self);

            if (self.bleed) {
                self.lifeRegenTime = 0;
            }

            let num5 = 0;
            if (self.lifeRegenTime >= 300) {
                num5 += 1;
            }

            if (self.lifeRegenTime >= 600) {
                num5 += 1;
            }

            if (self.lifeRegenTime >= 900) {
                num5 += 1;
            }

            if (self.lifeRegenTime >= 1200) {
                num5 += 1;
            }

            if (self.lifeRegenTime >= 1500) {
                num5 += 1;
            }

            if (self.lifeRegenTime >= 1800) {
                num5 += 1;
            }

            if (self.lifeRegenTime >= 2400) {
                num5 += 1;
            }

            if (self.lifeRegenTime >= 3000) {
                num5 += 1;
            }

            if (flag) {
                let num6 = self.lifeRegenTime - 3000;
                num6 /= 300;
                if (num6 > 0) {
                    if (num6 > 30) {
                        num6 = 30;
                    }

                    num5 += num6;
                }
            }
            else if (self.lifeRegenTime >= 3600) {
                num5 += 1;
                self.lifeRegenTime = 3600;
            }

            if (self.sitting.isSitting || self.sleeping.isSleeping) {
                self.lifeRegenTime += 10;
                num5 *= 1.5;
            }

            num5 = ((self.velocity.X !== 0 && self.grappling[0] <= 0) ? (num5 * 0.5) : (num5 * 1.25));
            if (self.crimsonRegen) {
                num5 *= 1.5;
            }

            if (self.shinyStone) {
                num5 *= 1.1;
            }

            if (self.whoAmI === Terraria.Main.myPlayer && Terraria.Main.SceneMetrics.HasCampfire) {
                num5 *= 1.1;
            }

            if (Terraria.Main.expertMode && !self.wellFed) {
                num5 = ((!self.shinyStone) ? (num5 / 2) : (num5 * 0.75));
            }

            if (self.rabid) {
                num5 = ((!self.shinyStone) ? (num5 / 2) : (num5 * 0.75));
            }
            
            let num7 = self.statLifeMax2 / 400 * 0.85 + 0.15;
            num5 *= num7;
            self.lifeRegen += Math.round(num5);
            self.lifeRegenCount += self.lifeRegen;
            if (self.palladiumRegen) {
                self.lifeRegenCount += 4;
            }

            if (flag && self.lifeRegen > 0 && self.statLife < self.statLifeMax2) {
                self.lifeRegenCount++;
                if (flag && (Terraria.Main.rand['int Next(int maxValue)'](30000) < self.lifeRegenTime || Terraria.Main.rand['int Next(int maxValue)'](30) === 0)) {
                    let num8 = Terraria.Dust.NewDust(self.position, self.width, self.height, 55, 0, 0, 200, Microsoft.Xna.Framework.Graphics.Color.new(), 0.5);
                    Terraria.Main.dust[num8].noGravity = true;
                    Terraria.Main.dust[num8].velocity = Microsoft.Xna.Framework.Vector2['Vector2 op_Multiply(Vector2 value, float scaleFactor)'](Terraria.Main.dust[num8].velocity, 0.75);
                    Terraria.Main.dust[num8].fadeIn = 1.3;
                    let vector = Microsoft.Xna.Framework.Vector2.new();
                    vector.X = Terraria.Main.rand['int Next(int minValue, int maxValue)'](-100, 101);
                    vector.Y = Terraria.Main.rand['int Next(int minValue, int maxValue)'](-100, 101);
                    Microsoft.Xna.Framework.Vector2['void Normalize()'](vector);
                    vector = Microsoft.Xna.Framework.Vector2['Vector2 op_Multiply(Vector2 value, float scaleFactor)'](vector, Terraroa.Main.rand['int Next(int minValue, int maxValue)'](50, 100) * 0.04);
                    Terraria.Main.dust[num8].velocity = vector;
                    Microsoft.Xna.Framework.Vector2['void Normalize()'](vector);
                    vector = Microsoft.Xna.Framework.Vector2['Vector2 op_Multiply(Vector2 value, float scaleFactor)'](vector, 34);
                    Terraria.Main.dust[num8].position = Microsoft.Xna.Framework.Vector2.op_Subtraction(self.Center, vector);
                }
            }

            while (self.lifeRegenCount >= 120) {
                self.lifeRegenCount -= 120;
                if (self.statLife < self.statLifeMax2) {
                    self.statLife++;
                    if (self.crimsonRegen) {
                        for (let i = 0; i < 10; i++) {
                            let num9 = Terraria.Dust.NewDust(self.position, self.width, self.height, 5, 0, 0, 175, Microsoft.Xna.Framework.Graphics.Color.new(), 1.75);
                            Terraria.Main.dust[num9].noGravity = true;
                            Terraria.Main.dust[num9].velocity = Microsoft.Xna.Framework.Vector2['Vector2 op_Multiply(Vector2 value, float scaleFactor)'](Main.dust[num9].velocity, 0.75);
                            let num10 = Terraria.Main.rand['int Next(int minValue, int maxValue)'](-40, 41);
                            let num11 = Terraria.Main.rand['int Next(int minValue, int maxValue)'](-40, 41);
                            Terraria.Main.dust[num9].position.X += num10;
                            Terraria.Main.dust[num9].position.Y += num11;
                            Terraria.Main.dust[num9].velocity.X = -num10 * 0.075;
                            Terraria.Main.dust[num9].velocity.Y = -num11 * 0.075;
                        }
                    }
                }

                if (self.statLife > self.statLifeMax2) {
                    self.statLife = self.statLifeMax2;
                }
            }

            if (self.burned || self.suffocating || (self.tongued && Terraria.Main.expertMode)) {
                while (self.lifeRegenCount <= -600) {
                    self.lifeRegenCount += 600;
                    self.statLife -= 5;
                    let rect = Microsoft.Xna.Framework.Rectangle.new();
                    rect.X = self.position.X;
                    rect.Y = self.position.Y;
                    rect.Width = self.width;
                    rect.Height = self.height;
                    Terraria.CombatText['int NewText(Rectangle location, Color color, int amount, bool dramatic, bool dot)']
                    (rect, Terraria.CombatText.LifeRegen, 5, false, true);
                    if (self.statLife <= 0 && self.whoAmI === Terraria.Main.myPlayer) {
                        if (self.suffocating) {
                            self.KillMe(Terraria.DataStructures.PlayerDeathReason.ByOther(7), 10.0, 0, false);
                        } else {
                            self.KillMe(Terraria.DataStructures.PlayerDeathReason.ByOther(8), 10.0, 0, false);
                        }
                    }
                }

                return;
            }

            if (self.starving) {
                let num12 = self.statLifeMax2 / 50;
                if (num12 < 2) {
                    num12 = 2;
                }

                let num13 = (self.ZoneDesert || self.ZoneSnow) ? (num12 * 2) : num12;
                let num14 = 120 * num12;
                while (self.lifeRegenCount <= -num14) {
                    self.lifeRegenCount += num14;
                    self.statLife -= num13;
                    let rect = Microsoft.Xna.Framework.Rectangle.new();
                    rect.X = self.position.X;
                    rect.Y = self.position.Y;
                    rect.Width = self.width;
                    rect.Height = self.height;
                    Terraria.CombatText['int NewText(Rectangle location, Color color, int amount, bool dramatic, bool dot)']
                    (rect, Terraria.CombatText.LifeRegen, num13, false, true);
                    if (self.statLife <= 0 && self.whoAmI === Terraria.Main.myPlayer) {
                        self.KillMe(Terraria.DataStructures.PlayerDeathReason.ByOther(18), 10.0, 0, false);
                    }
                }

                return;
            }

            while (self.lifeRegenCount <= -120) {
                if (self.lifeRegenCount <= -480) {
                    self.lifeRegenCount += 480;
                    self.statLife -= 4;
                    let rect = Microsoft.Xna.Framework.Rectangle.new();
                    rect.X = self.position.X;
                    rect.Y = self.position.Y;
                    rect.Width = self.width;
                    rect.Height = self.height;
                    Terraria.CombatText['int NewText(Rectangle location, Color color, int amount, bool dramatic, bool dot)']
                    (rect, Terraria.CombatText.LifeRegen, 4, false, true);
                } else if (self.lifeRegenCount <= -360) {
                    self.lifeRegenCount += 360;
                    self.statLife -= 3;
                    let rect = Microsoft.Xna.Framework.Rectangle.new();
                    rect.X = self.position.X;
                    rect.Y = self.position.Y;
                    rect.Width = self.width;
                    rect.Height = self.height;
                    Terraria.CombatText['int NewText(Rectangle location, Color color, int amount, bool dramatic, bool dot)']
                    (rect, Terraria.CombatText.LifeRegen, 3, false, true);
                } else if (self.lifeRegenCount <= -240) {
                    self.lifeRegenCount += 240;
                    self.statLife -= 2;
                    let rect = Microsoft.Xna.Framework.Rectangle.new();
                    rect.X = self.position.X;
                    rect.Y = self.position.Y;
                    rect.Width = self.width;
                    rect.Height = self.height;
                    Terraria.CombatText['int NewText(Rectangle location, Color color, int amount, bool dramatic, bool dot)']
                    (rect, Terraria.CombatText.LifeRegen, 2, false, true);
                } else {
                    self.lifeRegenCount += 120;
                    self.statLife--;
                    let rect = Microsoft.Xna.Framework.Rectangle.new();
                    rect.X = self.position.X;
                    rect.Y = self.position.Y;
                    rect.Width = self.width;
                    rect.Height = self.height;
                    Terraria.CombatText['int NewText(Rectangle location, Color color, int amount, bool dramatic, bool dot)']
                    (rect, Terraria.CombatText.LifeRegen, 1, false, true);
                }

                if (self.statLife <= 0 && self.whoAmI === Terraria.Main.myPlayer) {
                    if (self.poisoned || self.venom) {
                        self.KillMe(Terraria.DataStructures.PlayerDeathReason.ByOther(9), 10.0, 0, false);
                    } else if (self.electrified) {
                        self.KillMe(Terraria.DataStructures.PlayerDeathReason.ByOther(10), 10.0, 0, false);
                    } else {
                        self.KillMe(Terraria.DataStructures.PlayerDeathReason.ByOther(8), 10.0, 0, false);
                    }
                }
            }
        });

        Terraria.Player.UpdateDead.hook((original, self) => {
            original(self);

            PlayerLoader.UpdateDead(self);
        });

        Terraria.Player.ResetEffects.hook((original, self) => {
            original(self);

            PlayerLoader.ResetEffects(self);
        });

        Terraria.Player.Hooks.EnterWorld.hook((original, playerIndex) => {
            original(playerIndex);

            PlayerLoader.OnEnterWorld(playerIndex);
        });
		
		Terraria.NPC.StrikeNPC.hook((original, self, damage, knockBack, hitDirection, crit, noEffect, fromNet) => {
            const result = original(self, damage, knockBack, hitDirection, crit, noEffect, fromNet);
            ModHooks.OnHitTemp[self.whoAmI] = {crit};
            return result;
        });

        Terraria.Player.ApplyNPCOnHitEffects.hook((original, self, sItem, itemRectangle, damage, knockBack, npcIndex, dmgRandomized, dmgDone) => {
            original(self, sItem, itemRectangle, damage, knockBack, npcIndex, dmgRandomized, dmgDone);
            
            ItemLoader.OnHitNPC(sItem, self, Terraria.Main.npc[npcIndex], dmgDone, knockBack, ModHooks.OnHitTemp[npcIndex].crit);
            PlayerLoader.OnHitNPC(self, sItem, Terraria.Main.npc[npcIndex], dmgDone, knockBack, ModHooks.OnHitTemp[npcIndex].crit);

            ModHooks.OnHitTemp = {};
        });

        Terraria.Main.AnglerQuestSwap.hook((original) => {
            Terraria.Main.anglerWhoFinishedToday.Clear();
            Terraria.Main.anglerQuestFinished = false;

            const flag = Terraria.NPC.downedBoss1 || Terraria.NPC.downedBoss2 || Terraria.NPC.downedBoss3 || Terraria.Main.hardMode || Terraria.NPC.downedSlimeKing || Terraria.NPC.downedQueenBee;
            let flag2 = true;
        
            while (flag2) {
                flag2 = false;
                Terraria.Main.anglerQuest = Terraria.Main.rand['int Next(int maxValue)'](Terraria.Main.anglerQuestItemNetIDs.length);
                const num = Terraria.Main.anglerQuestItemNetIDs[Terraria.Main.anglerQuest];
                const hardMode = Terraria.Main.hardMode;
                const crimson = Terraria.WorldGen.crimson;

                if (num === 2454 && (!hardMode || crimson)) {
                    flag2 = true;
                }
                if (num === 2457 && crimson) {
                    flag2 = true;
                }
                if (num === 2462 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2463 && (!hardMode || !crimson)) {
                    flag2 = true;
                }
                if (num === 2465 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2468 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2471 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2473 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2477 && !crimson) {
                    flag2 = true;
                }
                if (num === 2480 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2483 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2484 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2485 && crimson) {
                    flag2 = true;
                }
                if ((num === 2476 || num === 2453 || num === 2473) && !flag) {
                    flag2 = true;
                }
                if (num >= ItemLoader.MAX_VANILLA_ID) {
                    flag2 = ItemLoader.IsAnglerQuestAvailable(num);
                }
            }
        });

        Terraria.Lang.AnglerQuestChat.hook((original, turnIn) => {
            const obj = Terraria.Lang.CreateDialogSubstitutionObject(null);
            const turnInText = Terraria.Localization.Language.SelectRandom(Terraria.Lang['LanguageSearchFilter CreateDialogFilter(string startsWith, object substitutions)']('AnglerQuestText.TurnIn_', obj), null)['string FormatWith(object obj)'](obj);
            if (turnIn) {
                return turnInText;
            }

            const noQuestText = Terraria.Localization.Language.SelectRandom(Terraria.Lang['LanguageSearchFilter CreateDialogFilter(string startsWith, object substitutions)']('AnglerQuestText.NoQuest_', obj), null)['string FormatWith(object obj)'](obj);
            if (Terraria.Main.anglerQuestFinished) {
                return noQuestText;
            }

            const id = (Terraria.Main.npcChatCornerItem = Terraria.Main.anglerQuestItemNetIDs[Terraria.Main.anglerQuest]);
            const modQuestText = ItemLoader.AnglerChat(id);
            const vanillaQuestText = Terraria.Localization.Language['string GetTextValueWith(string key, object obj)']('AnglerQuestText.Quest_' + Terraria.ID.ItemID.Search.GetName(id), obj);

            return modQuestText ?? vanillaQuestText;
        });

        Terraria.Player.ExtractinatorUse.hook((original, self, extractType) => {
            const item = self.HeldItem;
            if (item.type < ItemLoader.MAX_VANILLA_ID) {
               return original(self, extractType);
            }
        
            const result = ModHooks.ExtractinatorTemp;
            ItemLoader.ExtractinatorUse(result, extractType);
        
            if (result.type > 0 && result.stack > 0) {
                const position = self.Center;
                Terraria.Item['int NewItem(int X, int Y, int Width, int Height, int Type, int Stack, bool noBroadcast, int pfix, bool noGrabDelay, bool reverseLookup)'](position.X, position.Y, 1, 1, result.type, result.stack, false, -1, false, false);
            }
        });

        // Terraria.Player.ItemCheck_ApplyUseStyle.hook((original, self, mountOffset, sItem, heldItemFrame) => {
        //     original(self, mountOffset, sItem, heldItemFrame);

        //     ItemLoader.UseStyle(sItem, self, heldItemFrame);
        // });

        Terraria.Player.ItemCheck_Shoot.hook((original, self, i, sItem, weaponDamage) => {
            if (!CombinedLoader.CanShoot(self, sItem)) {
                return;
            }

            const pointPosition = self.RotatedRelativePoint(self.MountedCenter, true, true);
            const velocity = Microsoft.Xna.Framework.Vector2.new();
            velocity.X = Terraria.Main.mouseX + Terraria.Main.screenPosition.X - pointPosition.X;
            velocity.Y = Terraria.Main.mouseY + Terraria.Main.screenPosition.Y - pointPosition.Y;
            if (!CombinedLoader.Shoot(self, sItem, pointPosition, velocity, sItem.shoot, weaponDamage, sItem.knockBack)) {
                return;
            }

            original(self, i, sItem, weaponDamage);
        });

        Terraria.Player['void ApplyItemAnimation(Item sItem, float multiplier, int itemReuseDelay)'].hook((original, self, sItem, multiplier, itemReuseDelay) => {
            ItemLoader.UseAnimation(sItem, self);
            self.SetItemAnimation(CombinedLoader.TotalAnimationTime(sItem.useAnimation * multiplier, self, sItem));
            self.reuseDelay = sItem.reuseDelay / CombinedLoader.TotalUseSpeedMultiplier(self, sItem);
        });

        Terraria.Player['void ApplyItemAnimation(Item sItem)'].hook((original, self, sItem) => {
            if (sItem.type < ItemLoader.MAX_VANILLA_ID) {
                return original(self, sItem);
            }
        
            const ApplyItemAnimation = Terraria.Player['void ApplyItemAnimation(Item sItem, float multiplier, int itemReuseDelay)'];
        
            if (sItem.melee) {
                ApplyItemAnimation(self, sItem, self.meleeSpeed, 0);
                return;
            }

            if (sItem.summon && Terraria.ID.ItemID.Sets.SummonerWeaponThatScalesWithAttackSpeed[sItem.type]) {
                //!TODO в 1.4.3 заменить sItem.useAnimation на self.whipUseTimeMultiplier
                ApplyItemAnimation(self, sItem, self.meleeSpeed * sItem.useAnimation, 0);
                return;
            }
        
            if (sItem.createTile >= 0) {
                ApplyItemAnimation(self, sItem, self.tileSpeed, 0);
                return;
            }
        
            if (sItem.createWall >= 0) {
                ApplyItemAnimation(self, sItem, self.wallSpeed, 0);
                return;
            }
        
            ApplyItemAnimation(self, sItem, 1.0, 0);
        });

        Terraria.Player['void ApplyItemTime(Item sItem)'].hook((original, self, sItem) => {
            original(self, sItem);
        
            if (self.ItemTimeIsZero && !ItemLoader.UseItem(sItem, self)) {
                return;
            }
        
            self.SetItemTime(CombinedLoader.TotalUseTime(sItem.useTime, self, sItem));
        });

        Terraria.Player['void ApplyItemTime(Item sItem, float multiplier)'].hook((original, self, sItem, multiplier) => {
            original(self, sItem, multiplier);

            if (self.ItemTimeIsZero && !ItemLoader.UseItem(sItem, self)) {
                return;
            }

            self.SetItemTime(CombinedLoader.TotalUseTime(sItem.useTime * multiplier, self, sItem));
        });

        Terraria.Player.ItemCheck_CheckCanUse.hook((original, self, sItem) => {	
            const item = self.HeldItem;
            if (item.type < ItemLoader.MAX_VANILLA_ID || CombinedLoader.CanUseItem(self, sItem)) {
                return original(self, sItem);
            }
        });

        Terraria.Player.ItemCheck.hook((original, self, i) => {
            const item = self.HeldItem;
            if (item.type >= ItemLoader.MAX_VANILLA_ID) {
                ItemLoader.HoldItem(item, self);

                if (!self.JustDroppedAnItem) {
                    if (self.ItemTimeIsZero && self.itemAnimation > 0) {
                        if (ItemLoader.UseItem(item, self)) {
                            self['void ApplyItemTime(Item sItem)'](item);
                        }
                    }
                }

                if (i === Terraria.Main.myPlayer) {
                    if (self.itemTimeMax !== 0 && self.itemTime === self.itemTimeMax && item.consumable) {
                        if (ItemLoader.ConsumeItem(item, self)) {
                        }
                    }
                }
            }

            original(self, i);

            PlayerLoader.PostItemCheck(self);
        });

        Terraria.Player.QuickMount_GetItemToUse.hook((original, self) => {
            let item = null;
            const mountEquip = self.miscEquips[3];
            if ((mountEquip.type < ItemLoader.MAX_VANILLA_ID || mountEquip.type >= ItemLoader.MAX_VANILLA_ID && CombinedLoader.CanUseItem(self, mountEquip)) &&
                mountEquip.mountType !== -1 && !Terraria.ID.MountID.Sets.Cart[mountEquip.mountType]) {
                item = mountEquip;
            }

            if (item === null) {
                for (let i = 0; i < 58; i++) {
                    const inventory = self.inventory[i];
                    if ((inventory.type < ItemLoader.MAX_VANILLA_ID || inventory.type >= ItemLoader.MAX_VANILLA_ID && CombinedLoader.CanUseItem(self, inventory)) &&
                        inventory.mountType !== -1 && !Terraria.ID.MountID.Sets.Cart[inventory.mountType]) {
                        item = inventory;
                        break;
                    }
                }
            }

            return item;
        });

        Terraria.Player.QuickMount.hook((original, self) => {
            if (self.mount.Active) {
                Terraria.Mount.Dismount(self.mount, self);
            } else {
                if (self.frozen || self.tongued || self.webbed || self.stoned || self.gravDir === -1.0 || self.dead || self.noItems) {
                    return;
                }
        
                const item = self.QuickMount_GetItemToUse();
                if (item !== null && item.mountType !== -1 && Terraria.Mount.CanMount(self.mount, item.mountType, self)) {
                    if (!self.QuickMinecartSnap()) {
                        Terraria.Mount.SetMount(self.mount, item.mountType, self, false);
                        ItemLoader.UseItem(item, self);
                        if (item.UseSound !== null) {
                            Terraria.Audio.SoundEngine['SoundEffectInstance PlaySound(LegacySoundStyle type, Vector2 position)'](item.UseSound, self.Center);
                        }
                    }
                } else {
                    self.QuickMinecart();
                }
            }
        });

        Terraria.Player.RecalculateLuck.hook((original, self) => {
            let luck = PlayerLoader.Luck;

            if (PlayerLoader.PreModifyLuck(self, luck)) {
                original(self);
                luck.value = self.luck;
                for (let player of ModPlayer.RegisteredPlayers) {
                    player.player = self;
                    player.ModifyLuck(luck);
                }
                self.luck = luck.value;
            }
        });

        Terraria.Player.ItemCheck_ApplyManaRegenDelay.hook((original, self, sItem) => {
            if (CombinedLoader.GetManaCost(sItem, self) > 0) {
                self.manaRegenDelay = self.maxRegenDelay;
            }
        });

        Terraria.Player.ItemCheck_PayMana.hook((original, self, sItem, canUse) => {
            let flag = self.altFunctionUse === 2;
            let flag2 = false;

            if (sItem.type === 2795) {
                flag2 = true;
            }

            if (sItem.shoot > 0 && Terraria.ID.ProjectileID.Sets.TurretFeature[sItem.shoot] && flag) {
                flag2 = true;
            }

            if (sItem.shoot > 0 && Terraria.ID.ProjectileID.Sets.MinionTargettingFeature[sItem.shoot] && flag) {
                flag2 = true;
            }

            if (sItem.type === 3006) {
                flag2 = true;
            }

            if (sItem.type !== 3269 && !CombinedLoader.CheckMana(sItem, self, -1, !flag2)) {
                canUse = false;
            }

            return canUse;
        });

        Terraria.Player.GetDyeTraderReward.hook((original, self) => {
            original(self);

            let rewardPool = [];

            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.GetDyeTraderReward(rewardPool);
            }

            const num = rewardPool[Terraria.Main.rand['int Next(int maxValue)'](rewardPool.length)];
            const item = Terraria.Item.new();
            item['void SetDefaults(int Type)'](num);
            item.stack = 3;
            item.position = self.Center;
            const item2 = self.GetItem(self.whoAmI, item, Terraria.GetItemSettings.NPCEntityToPlayerInventorySettings, false);
            if (item2.stack > 0) {
                Terraria.Item['int NewItem(int X, int Y, int Width, int Height, int Type, int Stack, bool noBroadcast, int pfix, bool noGrabDelay, bool reverseLookup)']
                (self.position.X, self.position.Y, self.width, self.height, item2.type, item2.stack, false, 0, true, false);
            }
        });

        Terraria.Player.GetAnglerReward.hook((original, self) => {
            original(self);

            let rewardItems = [];

            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.AnglerQuestReward(rewardItems);
            }
            for (let i = 0; i < rewardItems.length; i++) {
                const getItem = self.GetItem(self.whoAmI, rewardItems[i], Terraria.GetItemSettings.NPCEntityToPlayerInventorySettings, false);
                if (getItem.stack > 0) {
                    Terraria.Item['int NewItem(int X, int Y, int Width, int Height, int Type, int Stack, bool noBroadcast, int pfix, bool noGrabDelay, bool reverseLookup)']
                    (self.position.X, self.position.Y, self.width, self.height, getItem.type, getItem.stack, false, 0, true, false);
                }
            }
        });

        Terraria.Player.QuickMana_GetItemToUse.hook((original, self) => {
            for (let i = 0; i < 58; i++) {
                const inventory = self.inventory[i];
                if ((inventory.type < ItemLoader.MAX_VANILLA_ID || inventory.type >= ItemLoader.MAX_VANILLA_ID && CombinedLoader.CanUseItem(self, inventory)) &&
                inventory.stack > 0 && inventory.healMana > 0 && (self.potionDelay === 0 || !inventory.potion)) {
                    return inventory;
                }
            }

            return null;
        });

        Terraria.Player.QuickMana.hook((original, self) => {
            if (self.cursed || self.CCed || self.dead || self.statMana === self.statManaMax2) {
                return;
            }

            let num = 0;
            const inventory = self.inventory;
            while (true) {
                if (num < 58) {
                    if (inventory[num].stack > 0 && inventory[num].healMana > 0 && (self.potionDelay === 0 || !inventory[num].potion)) {
                        break;
                    }

                    num++;
                    continue;
                }
                if (inventory[num].type < ItemLoader.MAX_VANILLA_ID) {
                    return original(self);
                }

                return;
            }

            Terraria.Audio.SoundEngine['SoundEffectInstance PlaySound(LegacySoundStyle type, Vector2 position)'](inventory[num].UseSound, self.position);
            if (inventory[num].potion) {
                self.potionDelay = self.potionDelayTime;
                self.AddBuff(21, self.potionDelay, true, false);
            }
            ItemLoader.UseItem(inventory[num], self);

            const healLife = CombinedLoader.GetHealLife(inventory[num], self, true);
            const healMana = CombinedLoader.GetHealMana(inventory[num], self, true);
            self.statLife += healLife;
            self.statMana += healMana;

            if (self.statLife > self.statLifeMax2) {
                self.statLife = self.statLifeMax2;
            }

            if (self.statMana > self.statManaMax2) {
                self.statMana = self.statManaMax2;
            }

            if (healLife > 0 && Terraria.Main.myPlayer === self.whoAmI) {
                self.HealEffect(healLife, true);
            }

            if (healMana > 0) {
                self.AddBuff(94, Terraria.Player.manaSickTime, true, false);
                if (Terraria.Main.myPlayer === self.whoAmI) {
                    self.ManaEffect(healMana);
                }
            }

            if (ItemLoader.ConsumeItem(inventory[num], self)) {
                inventory[num].stack--;
            }

            if (inventory[num].stack <= 0) {
                Terraria.Item.TurnToAir(inventory[num]);
            }
        });

        Terraria.Player.QuickHeal_GetItemToUse.hook((original, self) => {
            const num = self.statLifeMax2 - self.statLife;
            let result = null;
            let num2 = -self.statLifeMax2;
            for (let i = 0; i < 58; i++) {
                const item = self.inventory[i];
                if (item.stack <= 0 || item.type <= 0 || !item.potion || item.healLife <= 0) {
                    continue;
                }
                
                if (item.type >= ItemLoader.MAX_VANILLA_ID && !CombinedLoader.CanUseItem(self, item)){
                    continue;
                }

                let num3 = CombinedLoader.GetHealLife(item, self, true) - num;

                if (item.type === 227 && num3 < 0) {
                    num3 += 30;
                    if (num3 > 0) {
                        num3 = 0;
                    }
                }

                if (num2 < 0) {
                    if (num3 > num2) {
                        result = item;
                        num2 = num3;
                    }
                } else if (num3 < num2 && num3 >= 0) {
                    result = item;
                    num2 = num3;
                }
            }

            return result;
        });

        Terraria.Player.QuickHeal.hook((original, self) => {
            const item = self.QuickHeal_GetItemToUse();
            const flag = self.cursed || self.CCed || self.dead || self.statLife === self.statLifeMax2 || self.potionDelay > 0 || item === null;
            if (flag) {
                return;
            }
            if (item === null) {
                return;
            }

            Terraria.Audio.SoundEngine['SoundEffectInstance PlaySound(LegacySoundStyle type, Vector2 position)'](item.UseSound, self.position);
            if (item.potion) {
                if (item.type === 227) {
                    self.potionDelay = self.restorationDelayTime;
                    self.AddBuff(21, self.potionDelay, true, false);
                } else if (item.type === 5) {
                    self.potionDelay = self.mushroomDelayTime;
                    self.AddBuff(21, self.potionDelay, true, false);
                } else {
                    self.potionDelay = self.potionDelayTime;
                    self.AddBuff(21, self.potionDelay, true, false);
                }
            }

            ItemLoader.UseItem(item, self);

            const healLife = CombinedLoader.GetHealLife(item, self, true);
            const healMana = CombinedLoader.GetHealMana(item, self, true);

            self.statLife += healLife;
            self.statMana += healMana;

            if (self.statLife > self.statLifeMax2) {
                self.statLife = self.statLifeMax2;
            }

            if (self.statMana > self.statManaMax2) {
                self.statMana = self.statManaMax2;
            }

            if (healLife > 0 && Terraria.Main.myPlayer === self.whoAmI) {
                self.HealEffect(healLife, true);
            }

            if (healMana > 0) {
                self.AddBuff(94, Terraria.Player.manaSickTime, true, false);
                if (Terraria.Main.myPlayer === self.whoAmI) {
                    self.ManaEffect(healMana);
                }
            }

            if (item.type < ItemLoader.MAX_VANILLA_ID || ItemLoader.ConsumeItem(item, self)) {
                item.stack--;
            }

            if (item.stack <= 0) {
                Terraria.Item.TurnToAir(item);
            }
        });

        Terraria.Player.QuickBuff.hook((original, self) => {
            const item = self.QuickBuff_PickBestFoodItem();
            const result = original(self);
            if (item !== null && item.type < ItemLoader.MAX_VANILLA_ID) {
                return result;
            }

            const flag = self.cursed || self.CCed || self.dead || self.CountBuffs() === 22;
            if (flag) {
                return;
            }
        
            let legacySoundStyle = null;

            if (item !== null) {
                legacySoundStyle = item.UseSound;
                let buffTime = item.buffTime;
                if (buffTime === 0) {
                    buffTime = 3600;
                }
        
                self.AddBuff(item.buffType, buffTime, true, false);
                if (item.consumable && ItemLoader.ConsumeItem(item, self)) {
                    item.stack--;
                    if (item.stack <= 0) {
                        item.TurnToAir();
                    }
                }
            }
        
            if (self.CountBuffs() !== 22) {
                for (let i = 0; i < 58; i++) {
                    const item = self.inventory[i];
                    if (item.type < ItemLoader.MAX_VANILLA_ID) {
                        return result;
                    }
                    if (item.stack <= 0 || item.type <= 0 || item.buffType <= 0 || item.summon) {
                        continue;
                    }
                    let buffType = item.buffType;
                    let flag = CombinedLoader.CanUseItem(self, item) && self.QuickBuff_ShouldBotherUsingThisBuff(buffType);
                    if (item.mana > 0 && flag) {
                        if (CombinedLoader.CheckMana(item, self, -1, true, true)) {
                            self.manaRegenDelay = self.maxRegenDelay;
                        }
                    }

                    if (!flag) {
                        continue;
                    }

                    ItemLoader.UseItem(item, self);
                    legacySoundStyle = item.UseSound;
                    let buffTime = item.buffTime;
                    if (buffTime === 0) {
                        buffTime = 3600;
                    }
        
                    self.AddBuff(buffType, buffTime, true, false);
                    if (item.consumable && ItemLoader.ConsumeItem(item, self)) {
                        item.stack--;
                        if (item.stack <= 0) {
                            item.TurnToAir();
                        }
                    }

                    if (self.CountBuffs() === 22) {
                        break;
                    }
                }
            }

            if (legacySoundStyle !== null) {
                Terraria.Audio.SoundEngine['SoundEffectInstance PlaySound(LegacySoundStyle type, Vector2 position)'](legacySoundStyle, self.position);
            }
        });

        Terraria.Player.UpdateDyes.hook((original, self) => {
            original(self);

            PlayerLoader.UpdateDyes(self);
        });

        // Terraria.Player.ItemCheck_ApplyHoldStyle.hook((original, self, mountOffset, sItem, heldItemFrame) => {
        //     original(self, mountOffset, sItem, heldItemFrame);
        //     ItemLoader.HoldStyle(sItem, self);
        // });

        Terraria.Chest.SetupShop.hook((original, self, type) => {
            original(self, type);

            let nextSlot = 0;
            for (let i = 0; i < 40; i++) {
                const item = self.item[i];
                if (item.type > 0) {
                    nextSlot++;
                }
            }
            for (let j = 0; j < nextSlot; j++) {
                self.item[j].isAShopItem = true;
            }

            NPCLoader.SetupShop(type, self, nextSlot);
        });

        Terraria.NPC.ScaleStats_ApplyMultiplayerStats.hook((original, self, numPlayers, balance, boost, bossAdjustment) => {
            original(self, numPlayers, balance, boost, bossAdjustment);

            NPCLoader.ScaleExpertStats(self, numPlayers, balance);
        });

        Terraria.NPC.HitEffect.hook((original, self, hitDirection, dmg) => {
            original(self, hitDirection, dmg);

            NPCLoader.HitEffect(self, hitDirection, dmg);
        });

        Terraria.Chest.SetupTravelShop.hook((original) => {
            original();

            let nextSlot = 0;
            for (let i = 0; i < 40; i++) {
                const item = Terraria.Main.travelShop[i];
                if (item > 0) {
                    nextSlot++;
                }
            }

            NPCLoader.SetupTravelShop(Terraria.Main.travelShop, nextSlot);
        });

        Terraria.NPC.checkDead.hook((original, self) => {
            if (!self.active || (self.realLife >= 0 && self.realLife != self.whoAmI) || self.life > 0)
				return;

            if (!NPCLoader.CheckDead(self)) {
                return;
            }

            original(self);
        });

        Terraria.NPC.CheckActive.hook((original, self) => {
            if (!NPCLoader.CheckActive(self)) {
                return;
            }

            original(self);
        });
        
        Terraria.Projectile.StatusNPC.hook((original, self, i) => {
            original(self, i);
            PlayerLoader.OnHitNPCWithProj(self, Terraria.Main.npc[i]);
        });
        
        Terraria.Player.KillMe.hook((original, self, damageSource, dmg, hitDirection, pvp) => {
            if (!PlayerLoader.PreKill(self, dmg, hitDirection, pvp)) {
                return;
            }

            original(self, damageSource, dmg, hitDirection, pvp);
            
            PlayerLoader.Kill(self, dmg, hitDirection, pvp, damageSource)
        });
        
        Terraria.Player.Hurt.hook((original, self, damageSource, Damage, hitDirection, pvp, quiet, Crit, cooldownCounter) => {
            let modifiers = PlayerLoader.PreHurtModifiers;
            modifiers.damage = Damage;
            modifiers.hitDirection = hitDirection;
            modifiers.crit = Crit;
            
            if (!PlayerLoader.PreHurt(self, pvp, quiet, modifiers)) {
                return 0.0;
            }
            
            Damage = modifiers.damage;
            hitDirection = modifiers.hitDirection;
            Crit = modifiers.crit;

            const result = original(self, damageSource, Damage, hitDirection, pvp, quiet, Crit, cooldownCounter);
            return result;
        });
        
        Terraria.Player.GetWeaponDamage.hook((original, self, sItem) => {
            let result = original(self, sItem);
            if (RequiemPlayer.undeadHunter && sItem.ranged) {
                result += 2;
            }
            return result;
        });
        
        Terraria.Projectile.AI.hook((original, self) => {
           original(self);
            if (StellarPendant.active && (self.type === 92 || self.type === 9) && Terraria.Main.LocalPlayer.HeldItem.type !== 65) {
               self.tileCollide = false;
           }
        });
        
        Terraria.GUIPlayerCreateMenu.SetupStartingItems.hook((original) => {
            original();
            
            let inventorySlot = 0;
            const flag = Terraria.WorldGen.CopperTierOre == 7;
            const player = Terraria.Main.PendingPlayer;
            if (player.difficulty !== 3) {
                player.inventory[inventorySlot]['void SetDefaults(int Type)'](flag ? 3507 : 3501);
                player.inventory[inventorySlot++].Prefix(-1);
                player.inventory[inventorySlot]['void SetDefaults(int Type)'](3509);
                player.inventory[inventorySlot++].Prefix(-1);
                player.inventory[inventorySlot]['void SetDefaults(int Type)'](3506);
                player.inventory[inventorySlot++].Prefix(-1);
                player.inventory[inventorySlot]['void SetDefaults(int Type)'](flag ? 3504 : 3498);
                player.inventory[inventorySlot++].Prefix(-1);
                player.inventory[inventorySlot]['void SetDefaults(int Type)'](40);
                player.inventory[inventorySlot++].stack = 100;
                player.inventory[inventorySlot]['void SetDefaults(int Type)'](3069);
                player.inventory[inventorySlot++].Prefix(-1);
                player.inventory[inventorySlot]['void SetDefaults(int Type)'](4281);
                player.inventory[inventorySlot++].Prefix(-1);
                player.inventory[inventorySlot++]['void SetDefaults(int Type)'](109);
                player.inventory[inventorySlot]['void SetDefaults(int Type)'](flag ? 3505 : 3499);
                player.inventory[inventorySlot++].Prefix(-1);
                player.inventory[inventorySlot]['void SetDefaults(int Type)'](166);
                player.inventory[inventorySlot++].stack = 10;
                player.inventory[inventorySlot++]['void SetDefaults(int Type)'](2322);
                player.inventory[inventorySlot]['void SetDefaults(int Type)'](296);
                player.inventory[inventorySlot++].stack = 2;
                player.inventory[inventorySlot]['void SetDefaults(int Type)'](290);
                player.inventory[inventorySlot++].stack = 3;
                player.inventory[inventorySlot]['void SetDefaults(int Type)'](291);
                player.inventory[inventorySlot++].stack = 2;
                player.inventory[inventorySlot++]['void SetDefaults(int Type)'](298);
                player.inventory[inventorySlot]['void SetDefaults(int Type)'](2350);
                player.inventory[inventorySlot++].stack = 3;
                player.inventory[inventorySlot]['void SetDefaults(int Type)'](8);
                player.inventory[inventorySlot++].stack = 25;
                player.inventory[inventorySlot]['void SetDefaults(int Type)'](48);
                player.inventory[inventorySlot++].stack = 3;
            }
        });
        
        Terraria.Player.OpenBossBag.hook((original, self, type) => {
            ItemLoader.OpenVanillaBag("bossBag", self, type);
            
            original(self, type); 
        });
        
        Terraria.Player.OpenFishingCrate.hook((original, self, crateItemID) => {
            ItemLoader.OpenVanillaBag('crate', self, crateItemID);
            
            original(self, crateItemID); 
        });

        Terraria.Player.openPresent.hook((original, self, itemType) => {
            ItemLoader.OpenVanillaBag('present', self, 0);
            
            original(self, itemType);
        });
        
        Terraria.Player.OpenShadowLockbox.hook((original, self) => {
            ItemLoader.OpenVanillaBag('obsidianLockBox', self, 0);
            
            original(self); 
        });

        Terraria.Player.OpenLockBox.hook((original, self) => {
            ItemLoader.OpenVanillaBag('lockBox', self, 0);

            original(self);
        });

        Terraria.Player.OpenHerbBag.hook((original, self) => {
            ItemLoader.OpenVanillaBag('herbBag', self, 0);

            original(self);
        });

        Terraria.Player.OpenGoodieBag.hook((original, self) => {
            ItemLoader.OpenVanillaBag('goodieBag', self, 0);

            original(self);
        });
        
        Terraria.GameContent.ItemDropRules.ItemDropDatabase.Populate.hook((original, self) => {
           original(self);
           
           NPCLoader.ModifyNPCLoot(self);
        });
        
        Terraria.Projectile.Kill.hook((original, self) => {
           original(self); 
           
           ProjectileLoader.Kill(self);
        });
        
        Terraria.Player.GetItemGrabRange.hook((original, self, item) => {
            let result = original(self, item);
            if (RequiemPlayer.hallowTreasureMagnet) {
                result += 450;
            }
            
            return result;
        });
        
        Terraria.Chest.SetupRecipes.hook((original) => {
           original();
           
           ItemLoader.AddRecipes();
        });

        ModHooks.isInitialized = true;
    }
}
