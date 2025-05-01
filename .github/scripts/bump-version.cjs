const fs = require("fs");
const path = require("path");

const manifestPath = path.join(process.cwd(), "public", "manifest.json");

let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
} catch (err) {
  console.error(`Error reading manifest.json: ${err.message}`);
  process.exit(1);
}

// Check if version exists and is valid
if (!manifest.version || !/^(\d+)\.(\d+)\.(\d+)$/.test(manifest.version)) {
  console.error("Invalid version number format in manifest.json");
  process.exit(1);
}

const [major, minor, patch] = manifest.version.split(".").map(Number);

// Check if splitting and conversion to number was successful
if (isNaN(major) || isNaN(minor) || isNaN(patch)) {
  console.error("Failed to parse version number");
  process.exit(1);
}

const newVersion = `${major}.${minor}.${patch + 1}`;

manifest.version = newVersion;

// Write the new version back to manifest.json
try {
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Version bumped to ${newVersion}`);
} catch (err) {
  console.error(`Error writing to manifest.json: ${err.message}`);
  process.exit(1); // Exit if writing fails
}
