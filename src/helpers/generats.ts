export function generateUUID(length: number = 32): {
  uuid: string;
  slug: string;
} {
  length += 4;

  let uuid = '';
  const characters = '0123456789abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < length; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += '-';
    } else if (i === 14) {
      uuid += '4';
    } else if (i === 19) {
      uuid += characters[(Math.random() * 4) | 8];
    } else {
      uuid += characters[Math.floor(Math.random() * characters.length)];
    }
  }

  return { uuid, slug: uuid.replace(/-/g, '') };
}

export default { generateUUID };
