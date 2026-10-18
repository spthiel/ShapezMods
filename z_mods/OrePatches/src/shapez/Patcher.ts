import ModInterface = Shapez.ModInterface;

function runPatches(modInterface: ModInterface) {
  const logger = shapez.createLogger("Patcher");
  logger.log("Run patcher");
  modInterface.replaceMethod(shapez.MapChunk, "generatePatches", () => {
    logger.log("Tried to generate patches");
  });
}

export default {
  runPatches,
};
