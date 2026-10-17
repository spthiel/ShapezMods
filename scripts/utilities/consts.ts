import path from "node:path";

const consts = {
  shapezPath: path.resolve("shapez"),
  typesPath: path.resolve("src", "types", "shapez.d.ts"),
} as const;

export default consts;
