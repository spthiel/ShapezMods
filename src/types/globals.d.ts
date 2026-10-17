import "./shapez.d.ts";

declare global {
  const shapez: typeof Shapez;
  function $shapez_registerMod(mod: typeof Shapez.Mod, metadata: Shapez.ModMetadata): any;
}

declare namespace Shapez {
  export interface ModMetadata {
    name: string;
    version: string;
    author: string;
    website: string;
    description: string;
    id: string;
    minimumGameVersion?: string;
    doesNotAffectSavegame?: boolean;
    // Fix settings being an object.
    settings: object;
  }
}
