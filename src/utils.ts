let _isNodeEnvironment: boolean | undefined = undefined;
export function isNodeEnvironment(): boolean {
  if (_isNodeEnvironment === undefined) {
    _isNodeEnvironment =
      typeof process !== "undefined" &&
      process.release !== undefined &&
      process.release.name === "node" &&
      process.versions.node !== undefined;
  }
  return _isNodeEnvironment;
}

export function toVarInt(value: number): Uint8Array {
    if (value < 0 || value > Math.pow(2, 31)) {
      throw new Error(`Unable to encode value '${value}' to var int`);
    }
  
    let varIntBytes = [];
    let offset = 0;
    while (value >= 0x80) {
      varIntBytes[offset++] = value | 0x80;
      value >>>= 7;
    }
    varIntBytes[offset] = value;
  
    return Uint8Array.from(varIntBytes);
  }