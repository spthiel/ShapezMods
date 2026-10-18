import isEven from "is-even";
import isString from "is-string";

import Patcher from "orepatches:shapez/Patcher.ts";

import packageJson from "../package.json";

class ShapezMod extends shapez.Mod {
  init() {
    Patcher.runPatches(this.modInterface);
    isString("foo");
    isEven(5);
  }
}

$shapez_registerMod(ShapezMod, {
  name: packageJson.shapezData.name,
  author: packageJson.author,
  version: packageJson.version,
  description: packageJson.description,
  id: packageJson.name,
  website: packageJson.homepage,
  doesNotAffectSavegame: packageJson.shapezData.doesNotAffectSavegame,
  settings: packageJson.shapezData.settings,
});
