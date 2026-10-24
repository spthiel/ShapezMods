import path from "node:path";

const consts = {
  shapezPath: path.resolve("shapez"),
  typesPath: path.resolve("src", "types", "shapez.d.ts"),
  typesPatch: path.resolve("shapez-types.patch"),
  modsFolder: path.resolve("z_mods"),
} as const;

export default consts;
