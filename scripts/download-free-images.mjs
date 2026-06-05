import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Free stock images from Unsplash + Pexels (commercial use allowed).
// Unsplash: https://unsplash.com/license
// Pexels: https://www.pexels.com/license/
const FREE_IMAGES = {
  // Hero carousel — high-impact electrical scenes
  'banner/banner-1.jpg': 'https://images.pexels.com/photos/8062300/pexels-photo-8062300.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  'banner/banner-2.jpg': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&h=1080&fit=crop&q=92',
  'banner/banner-3.jpg': 'https://images.pexels.com/photos/4483612/pexels-photo-4483612.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',

  // Testimonials — What Our Clients Say (638x680 side image + full bg)
  'background/testimonial-bg.jpg': 'https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  'background/testimonial-bg-2.jpg': 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=638&h=680&fit=crop',
  'resource/testimonial-1.jpg': 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=140&h=140&fit=crop',

  'background/page-title.jpg': 'https://images.pexels.com/photos/1903285/pexels-photo-1903285.jpeg?auto=compress&cs=tinysrgb&w=1920&h=500&fit=crop',

  // About Us section — electrician on site, portrait crop
  'resource/about-1.jpg': 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=800&h=900&fit=crop',
  'resource/contact-1.jpg': 'https://images.pexels.com/photos/5591463/pexels-photo-5591463.jpeg?auto=compress&cs=tinysrgb&w=800&h=900&fit=crop',

  'resource/about-5.jpg': 'https://images.pexels.com/photos/4246214/pexels-photo-4246214.jpeg?auto=compress&cs=tinysrgb&w=700&h=800&fit=crop',
  'resource/about-6.jpg': 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&h=600&fit=crop&q=85',

  // Feature section (after About Us) — safety, installation, maintenance
  'resource/feature-1.jpg': 'https://images.pexels.com/photos/5691631/pexels-photo-5691631.jpeg?auto=compress&cs=tinysrgb&w=600&h=500&fit=crop',
  'resource/feature-2.jpg': 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=500&fit=crop&q=90',
  'resource/feature-3.jpg': 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600&h=500&fit=crop',
  // Why Choose Us — electrician on site + panel work
  'resource/chooseus-1.jpg': 'https://images.pexels.com/photos/5591463/pexels-photo-5591463.jpeg?auto=compress&cs=tinysrgb&w=500&h=620&fit=crop',
  'resource/chooseus-2.jpg': 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=420&h=520&fit=crop',
  'resource/faq-1.jpg': 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&h=620&fit=crop&q=85',
  'resource/faq-2.jpg': 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=420&h=520&fit=crop',
  'service/service-1.jpg': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=420&fit=crop&q=85',
  'service/service-2.jpg': 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=600&h=420&fit=crop',
  'service/service-3.jpg': 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600&h=420&fit=crop',
  'service/service-4.jpg': 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=420&fit=crop&q=85',
  'service/service-5.jpg': 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=600&h=420&fit=crop',
  'service/service-6.jpg': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=420&fit=crop&q=85',
  // Projects carousel (after Why Choose Us) — licensed electrical work scenes
  'project/project-1.jpg': 'https://images.pexels.com/photos/5691631/pexels-photo-5691631.jpeg?auto=compress&cs=tinysrgb&w=800&h=650&fit=crop',
  'project/project-2.jpg': 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800&h=650&fit=crop',
  'project/project-3.jpg': 'https://images.pexels.com/photos/4246214/pexels-photo-4246214.jpeg?auto=compress&cs=tinysrgb&w=800&h=650&fit=crop',
  'project/project-4.jpg': 'https://images.pexels.com/photos/8062300/pexels-photo-8062300.jpeg?auto=compress&cs=tinysrgb&w=800&h=650&fit=crop',
  'project/project-5.jpg': 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=800&h=650&fit=crop',
  'project/project-6.jpg': 'https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=800&h=650&fit=crop',
  'project/project-7.jpg': 'https://images.pexels.com/photos/4483612/pexels-photo-4483612.jpeg?auto=compress&cs=tinysrgb&w=800&h=650&fit=crop',
  'news/news-1.jpg': 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop&q=85',
  'news/news-2.jpg': 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  'news/news-3.jpg': 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
};

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    fs.mkdirSync(dir, { recursive: true });

    const file = fs.createWriteStream(dest);
    https
      .get(url, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          file.close();
          if (fs.existsSync(dest)) fs.unlinkSync(dest);
          downloadFile(response.headers.location, dest).then(resolve).catch(reject);
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`Failed ${url}: ${response.statusCode}`));
          return;
        }

        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      })
      .on('error', (error) => {
        if (fs.existsSync(dest)) fs.unlink(dest, () => reject(error));
        else reject(error);
      });
  });
}

async function main() {
  const targets = [
    path.join(rootDir, 'public', 'assets', 'images'),
    path.join(rootDir, 'Easton', 'assets', 'images'),
  ];

  let count = 0;

  for (const [relativePath, url] of Object.entries(FREE_IMAGES)) {
    for (const baseDir of targets) {
      const dest = path.join(baseDir, relativePath);
      await downloadFile(url, dest);
    }
    count += 1;
    console.log(`Downloaded: ${relativePath}`);
  }

  console.log(`\nDone. ${count} free images saved.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
