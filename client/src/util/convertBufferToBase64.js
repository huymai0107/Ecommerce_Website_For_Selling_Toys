function convertBufferToBase64(buffer) {
    const binary = Array.from(new Uint8Array(buffer));
    const base64 = btoa(binary.map(byte => String.fromCharCode(byte)).join(''));
    return base64;
  }

export {convertBufferToBase64}