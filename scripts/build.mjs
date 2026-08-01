#!/usr/bin/env node
// Build a self-contained distributable .zip of the theme that can be dropped
// into a Pterodactyl Panel installation.
import { spawn } from 'node:child_process'
import { promises as fs } from 'node:fs'
import path from 'node:path'

async function run(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { cwd, stdio: 'inherit', shell: true })
    proc.on('close', (code) => code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} exited with ${code}`)))
  })
}

async function exists(p) { try { await fs.access(p); return true } catch { return false } }

async function main() {
  const root = path.resolve('.')
  if (!(await exists(path.join(root, 'package.json')))) throw new Error('Run from repo root')
  await run('npm', ['run', 'build'])
  await run('composer', ['install', '--no-dev', '--optimize-autoloader'])

  console.log('✓ Blueprint built. Run `node scripts/publish-assets.mjs` to deploy into your panel.')
}

main().catch((err) => { console.error(err); process.exit(1) })
