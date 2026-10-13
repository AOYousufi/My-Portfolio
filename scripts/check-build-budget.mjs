import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

const ROOT = 'dist/assets'
const COMPRESSED_BUDGET = 200 * 1024
const IMAGE_BUDGET = 600 * 1024

function filesIn(path) {
  return readdirSync(path).flatMap((name) => {
    const full = join(path, name)
    return statSync(full).isDirectory() ? filesIn(full) : [full]
  })
}

const files = filesIn(ROOT)
const scriptsAndStyles = files.filter((file) => /\.(js|css)$/.test(file))
const images = files.filter((file) => /\.(jpg|jpeg|png|webp|avif)$/.test(file))
const compressed = scriptsAndStyles.reduce((total, file) => {
  return total + gzipSync(readFileSync(file)).length
}, 0)
const oversized = images.filter((file) => statSync(file).size > IMAGE_BUDGET)

console.log(`JS + CSS gzip: ${(compressed / 1024).toFixed(1)} KiB (budget ${COMPRESSED_BUDGET / 1024} KiB)`)
for (const image of images) console.log(`Image: ${image} ${(statSync(image).size / 1024).toFixed(1)} KiB`)

if (compressed > COMPRESSED_BUDGET || oversized.length) {
  console.error('Portfolio asset budget exceeded')
  process.exitCode = 1
}
