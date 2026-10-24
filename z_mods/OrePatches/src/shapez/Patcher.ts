import ModInterface = Shapez.ModInterface;
import MapChunk from "orepatches:shapez/MapChunk.ts";

function runPatches(modInterface: ModInterface) {
  const logger = shapez.createLogger("Patcher");
  logger.log("Run patcher");
  modInterface.replaceMethod(shapez.MapChunk, "generatePatches", MapChunk.generatePatches);

  modInterface.replaceMethod(shapez.MapChunk, "generatePredefined", () => false);
}

export default {
  runPatches,
};
