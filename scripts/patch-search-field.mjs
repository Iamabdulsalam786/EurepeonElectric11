import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.join(__dirname, '..', 'src', 'content', 'index.html');

if (!fs.existsSync(indexPath)) process.exit(0);

let html = fs.readFileSync(indexPath, 'utf8');

html = html.replace(
  /<!-- search-field -->[\s\S]*?<!-- search-field end -->/,
  `<!-- search-field -->
        <div id="consultation-form-mount" data-react-consultation="true"></div>
        <!-- search-field end -->`
);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Homepage search field: React mount placeholder ready.');
