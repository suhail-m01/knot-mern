import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const targetZip = 'C:/Users/DELL/.gemini/antigravity/brain/3c846bef-ae30-407f-84a0-89ee1563ae2c/knot-mern.zip';
const rootDir = path.resolve();

console.log('Packaging updated repository into:', targetZip);
const psCmd = `powershell -NoProfile -Command "Compress-Archive -Path '${rootDir}\\*' -DestinationPath '${targetZip}' -Force -CompressionLevel Optimal"`;

try {
  if (fs.existsSync(targetZip)) {
    fs.unlinkSync(targetZip);
  }
  // Use robocopy to prepare clean folder
  const tempDir = path.join(process.env.TEMP || 'C:\\Windows\\Temp', 'knot_zip_' + Date.now());
  const stageDir = path.join(tempDir, 'knot-mern');
  fs.mkdirSync(stageDir, { recursive: true });

  try {
    execSync(`robocopy "${rootDir}" "${stageDir}" /E /XD node_modules .git dist .dart_tool .idea /XF *.log *.tmp /NFL /NDL /NJH /NJS /nc /ns /np`, { stdio: 'ignore' });
  } catch (e) {
    if (e.status > 7) throw e; // Robocopy exit code <= 7 means success/files copied
  }
  execSync(`powershell -NoProfile -Command "$ProgressPreference = 'SilentlyContinue'; Compress-Archive -Path '${stageDir}\\*' -DestinationPath '${targetZip}' -Force"`, { stdio: 'ignore' });
  fs.rmSync(tempDir, { recursive: true, force: true });

  const stat = fs.statSync(targetZip);
  console.log('✅ Archive created successfully:', (stat.size / (1024 * 1024)).toFixed(2), 'MB');
} catch (err) {
  console.error('Error packaging zip:', err.message);
}
