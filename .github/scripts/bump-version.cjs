const fs = require('fs');
const path = require('path');

// Finding manifest.json from the public folder
const manifestPath = join(process.cwd(), 'public', 'manifest.json');

// Reading and updating the version number
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const [major, minor, patch] = manifest.version.split('.').map(Number);
const newVersion = `${major}.${minor}.${patch + 1}`;
manifest.version = newVersion;

// Writing the new version
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`Version bumped to ${newVersion}`);