import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🚀 Starting Food Buddy Server and Client...\n');

const server = spawn('npm run dev', {
  cwd: path.join(rootDir, 'platform', 'server'),
  stdio: ['ignore', 'inherit', 'inherit'],
  shell: true,
});

const client = spawn('npm run dev', {
  cwd: path.join(rootDir, 'platform', 'client'),
  stdio: ['ignore', 'inherit', 'inherit'],
  shell: true,
});

server.on('error', (err) => {
  console.error('Server process error:', err);
});

client.on('error', (err) => {
  console.error('Client process error:', err);
});

server.on('exit', (code, signal) => {
  console.log(`Server process exited with code ${code}, signal ${signal}`);
});

client.on('exit', (code, signal) => {
  console.log(`Client process exited with code ${code}, signal ${signal}`);
});

const shutdown = () => {
  console.log('\n🛑 Shutting down Food Buddy processes...');
  try { server.kill(); } catch {}
  try { client.kill(); } catch {}
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Keep process active
const keepAlive = setInterval(() => {}, 1000 * 60 * 60);
process.on('exit', () => clearInterval(keepAlive));
