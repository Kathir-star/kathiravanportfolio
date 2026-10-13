import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.resolve(__dirname, '../src/data/certificates.json');

console.log('🔍 Validating certificates.json at:', jsonPath);

if (!fs.existsSync(jsonPath)) {
  console.error('❌ Error: src/data/certificates.json not found!');
  process.exit(1);
}

let raw;
try {
  raw = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
} catch (e) {
  console.error('❌ JSON Syntax Error:', e.message);
  process.exit(1);
}

if (!Array.isArray(raw)) {
  console.error('❌ Root of certificates.json must be an Array of certificate objects!');
  process.exit(1);
}

const seenIds = new Set();
const errors = [];
const warnings = [];

const ALLOWED_CATEGORIES = [
  'ACHIEVEMENTS',
  'INTERNSHIPS',
  'HACKATHONS',
  'TECHNICAL',
  'COURSES',
  'WORKSHOPS',
  'AWARDS',
  'LEADERSHIP',
  'COURSE',
  'CERTIFICATION',
  'ACHIEVEMENT',
  'INTERNSHIP',
  'HACKATHON',
  'WORKSHOP'
];

raw.forEach((item, index) => {
  const label = item.id ? `Record '${item.id}' (#${index + 1})` : `Record #${index + 1}`;

  // 1. Check ID
  if (!item.id || typeof item.id !== 'string') {
    errors.push(`${label}: Missing or non-string 'id'.`);
  } else {
    if (seenIds.has(item.id)) {
      errors.push(`${label}: Duplicate id '${item.id}'. IDs must be unique.`);
    }
    seenIds.add(item.id);
  }

  // 2. Check title
  if (!item.title || typeof item.title !== 'string') {
    errors.push(`${label}: Missing required field 'title'.`);
  }

  // 3. Check organization
  if (!item.organization || typeof item.organization !== 'string') {
    errors.push(`${label}: Missing required field 'organization'.`);
  }

  // 4. Check category
  if (!item.category) {
    errors.push(`${label}: Missing required field 'category'.`);
  } else if (!ALLOWED_CATEGORIES.includes(String(item.category).toUpperCase())) {
    warnings.push(`${label}: Category '${item.category}' is unrecognized; will default to COURSES.`);
  }

  // 5. Verification URL check
  if (item.verificationUrl && typeof item.verificationUrl === 'string') {
    if (!item.verificationUrl.startsWith('http://') && !item.verificationUrl.startsWith('https://')) {
      errors.push(`${label}: verificationUrl must start with http:// or https://`);
    }
  }

  // 6. Skills check
  if (item.skills && !Array.isArray(item.skills)) {
    warnings.push(`${label}: 'skills' should be an array of strings.`);
  }

  // 7. Check local asset path if specified
  const checkAsset = (propName) => {
    const val = item[propName];
    if (val && typeof val === 'string' && val.startsWith('/')) {
      const fullPath = path.resolve(__dirname, '../public', val.replace(/^\//, ''));
      if (!fs.existsSync(fullPath)) {
        warnings.push(`${label}: ${propName} '${val}' points to a file that does not exist in public directory.`);
      }
    }
  };

  checkAsset('image');
  checkAsset('file');
});

console.log(`\n📊 Scanned ${raw.length} certificate records.`);

if (warnings.length > 0) {
  console.log(`\n⚠️  Warnings (${warnings.length}):`);
  warnings.forEach((w) => console.log('   - ' + w));
}

if (errors.length > 0) {
  console.error(`\n❌ Validation Failed with ${errors.length} error(s):`);
  errors.forEach((e) => console.error('   - ' + e));
  process.exit(1);
}

console.log('\n✅ All certificate records are valid and ready for production!');
process.exit(0);
