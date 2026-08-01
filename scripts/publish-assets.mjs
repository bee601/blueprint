#!/usr/bin/env node
// Copy the freshly built assets into the Pterodactyl public directory.
import { promises as fs } from 'node:fs'
import path from 'node:path'

const SOURCE = path.resolve('dist')
const TARGET = process.env.BLUEPRINT_PUBLIC ?? path.resolve('../public/vendor/blueprint')

async function exists(p) {
  try { await fs.access(p); return true } catch { return false }
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true })
  const entries = await fs.readdir(src, { withFileTypes: true })
  for (const entry of entries) {
    const s = path.join(src, entry.name)
    const d = path.join(dest, entry.name)
    if (entry.isDirectory()) await copyDir(s, d)
    else await fs.copyFile(s, d)
  }
}

async function main() {
  if (!(await exists(SOURCE))) {
    console.error(`No build output found at ${SOURCE}. Run \`npm run build\` first.`)
    process.exit(1)
  }
  await copyDir(SOURCE, TARGET)
  console.log(`✓ Assets published to ${TARGET}`)
}

main().catch((err) => { console.error(err); process.exit(1) })
