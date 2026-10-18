import path from "node:path";

const consts = {
  shapezPath: path.resolve("shapez"),
  typesPath: path.resolve("src", "types", "shapez.d.ts"),
  modsFolder: path.resolve("z_mods"),
} as const;

export default consts;
