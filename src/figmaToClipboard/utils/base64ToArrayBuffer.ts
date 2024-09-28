import { Buffer } from 'buffer'

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  return Buffer.from(base64, 'base64')
}
