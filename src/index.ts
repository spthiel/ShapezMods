import packageJson from "@/../package.json";

class ShapezMod extends shapez.Mod {}

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
