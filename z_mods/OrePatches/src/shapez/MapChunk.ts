type Data = {
  rng: Shapez.RandomNumberGenerator;
  chunkCenter: Shapez.Vector;
  distanceToOriginInChunks: number;
};

function generatePatches(this: Shapez.MapChunk, _replaced: unknown, [data]: [Data]) {
  console.log(data);
}

export default {
  generatePatches,
};
