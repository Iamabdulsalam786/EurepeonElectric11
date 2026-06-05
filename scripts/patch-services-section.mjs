import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.join(__dirname, '..', 'src', 'content', 'index.html');

if (!fs.existsSync(indexPath)) process.exit(0);

let html = fs.readFileSync(indexPath, 'utf8');

html = html.replace(
  /<!-- service-section -->[\s\S]*?<!-- service-section end -->/,
  `<!-- service-section -->
        <div id="services-section-mount" data-react-services="true"></div>
        <!-- service-section end -->`
);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Homepage services: React mount placeholder ready.');
