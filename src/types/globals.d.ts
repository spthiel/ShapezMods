import "./shapez.d.ts";

declare global {
  const shapez: typeof Shapez;
  function $shapez_registerMod(mod: typeof Shapez.Mod, metadata: Shapez.ModMetadata): any;
}
