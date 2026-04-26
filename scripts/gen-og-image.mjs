#!/usr/bin/env node
import { deflateSync } from 'zlib'
import { writeFileSync } from 'fs'

// CRC32 lookup table
const crcTable = new Uint32Array(256)
for (let n = 0; n < 256; n++) {
  let c = n
  for (let k = 0; k < 8; k++) c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : (c >>> 1)
  crcTable[n] = c
}
const crc32 = buf => {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function buildPNG(width, height, pixels) {
  const makeChunk = (type, data) => {
    const typeBuf = Buffer.from(type)
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length)
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])))
    return Buffer.concat([len, typeBuf, data, crc])
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8; ihdr[9] = 6  // 8-bit RGBA
  const raw = Buffer.alloc(height * (1 + width * 4))
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 4)] = 0
    for (let x = 0; x < width; x++) {
      const pi = (y * width + x) * 4
      const ri = y * (1 + width * 4) + 1 + x * 4
      raw[ri] = pixels[pi]; raw[ri+1] = pixels[pi+1]
      raw[ri+2] = pixels[pi+2]; raw[ri+3] = pixels[pi+3]
    }
  }
  return Buffer.concat([
    Buffer.from([137,80,78,71,13,10,26,10]),
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', deflateSync(raw, { level: 6 })),
    makeChunk('IEND', Buffer.alloc(0))
  ])
}

const W = 1200, H = 630
const pixels = Buffer.alloc(W * H * 4)

// Fill background #090c18
for (let i = 0; i < W * H; i++) {
  pixels[i*4]=9; pixels[i*4+1]=12; pixels[i*4+2]=24; pixels[i*4+3]=255
}

const setPixel = (x, y, r, g, b, a = 255) => {
  x = Math.round(x); y = Math.round(y)
  if (x < 0 || x >= W || y < 0 || y >= H) return
  const i = (y * W + x) * 4
  // Alpha blend over bg
  const fa = a / 255, ia = 1 - fa
  pixels[i]   = Math.round(r * fa + pixels[i]   * ia)
  pixels[i+1] = Math.round(g * fa + pixels[i+1] * ia)
  pixels[i+2] = Math.round(b * fa + pixels[i+2] * ia)
  pixels[i+3] = 255
}

const drawDisc = (cx, cy, r, R, G, B) => {
  const ir = Math.ceil(r)
  for (let dy = -ir; dy <= ir; dy++)
    for (let dx = -ir; dx <= ir; dx++) {
      const d2 = dx*dx + dy*dy, r2 = r*r
      if (d2 <= r2) setPixel(cx+dx, cy+dy, R, G, B)
      else if (d2 <= (r+0.8)*(r+0.8)) {
        // Anti-alias edge
        const a = Math.round(255 * (1 - (Math.sqrt(d2) - r) / 0.8))
        setPixel(cx+dx, cy+dy, R, G, B, a)
      }
    }
}

const drawLine = (x0, y0, x1, y1, r, R, G, B) => {
  const dx = x1-x0, dy = y1-y0
  const len = Math.sqrt(dx*dx + dy*dy)
  const steps = Math.ceil(len * 2.5)
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    drawDisc(x0 + dx*t, y0 + dy*t, r, R, G, B)
  }
}

const drawQBezier = (x0, y0, cx, cy, x1, y1, r, R, G, B) => {
  const steps = 300
  for (let i = 0; i <= steps; i++) {
    const t = i / steps, mt = 1 - t
    drawDisc(mt*mt*x0 + 2*mt*t*cx + t*t*x1, mt*mt*y0 + 2*mt*t*cy + t*t*y1, r, R, G, B)
  }
}

// SVG viewBox 0 0 200 200 → scale to 320px square, centered
const S  = 2.6
const OX = (W - 200 * S) / 2
const OY = (H - 200 * S) / 2
const tx = x => OX + x * S
const ty = y => OY + y * S
const sw = (14 * S) / 2   // half stroke-width in pixels

// Subtle glow layer first (draw at lower opacity, larger radius)
const glowR = sw * 2.2
const drawGlowLine = (x0, y0, x1, y1) => {
  const dx = x1-x0, dy = y1-y0
  const len = Math.sqrt(dx*dx+dy*dy)
  const steps = Math.ceil(len)
  for (let i = 0; i <= steps; i++) {
    const t = i/steps, gx = x0+dx*t, gy = y0+dy*t
    drawDisc(gx, gy, glowR, 74, 184, 192, 30)
  }
}
drawGlowLine(tx(32), ty(158), tx(72), ty(32))
drawGlowLine(tx(72), ty(32), tx(112), ty(158))
drawGlowLine(tx(158), ty(102), tx(136), ty(36))
drawGlowLine(tx(158), ty(102), tx(180), ty(36))
drawGlowLine(tx(158), ty(102), tx(158), ty(158))

// A — two diagonal strokes
drawLine(tx(32), ty(158), tx(72), ty(32),  sw, 255, 255, 255)
drawLine(tx(72), ty(32),  tx(112), ty(158), sw, 255, 255, 255)

// Teal hook — two quadratic beziers
drawQBezier(tx(32), ty(158), tx(32), ty(175), tx(50), ty(175), sw, 74, 184, 192)
drawQBezier(tx(50), ty(175), tx(68), ty(175), tx(68), ty(158), sw, 74, 184, 192)

// Y — two arms + stem
drawLine(tx(158), ty(102), tx(136), ty(36), sw, 255, 255, 255)
drawLine(tx(158), ty(102), tx(180), ty(36), sw, 255, 255, 255)
drawLine(tx(158), ty(102), tx(158), ty(158), sw, 255, 255, 255)

const outPath = new URL('../public/og-image.png', import.meta.url).pathname
writeFileSync(outPath, buildPNG(W, H, pixels))
console.log(`og-image.png written to ${outPath} (${W}×${H})`)
