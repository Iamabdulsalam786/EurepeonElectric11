import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contactPath = path.join(__dirname, '..', 'src', 'content', 'contact.html');

if (!fs.existsSync(contactPath)) {
  console.warn('contact.html content not found, skipping patch');
  process.exit(0);
}

let html = fs.readFileSync(contactPath, 'utf8');

html = html.replace(
  /<!-- contact-style-three -->[\s\S]*?<!-- contact-style-three end -->/,
  `<!-- contact-style-three -->
        <section class="contact-style-three contact-style-three--with-image">
            <div class="auto-container">
                <div class="row clearfix align-items-center">
                    <div class="col-lg-5 col-md-12 col-sm-12 image-column">
                        <figure class="contact-page-image p_relative d_block">
                            <img src="/assets/images/resource/about-5.jpg" alt="Licensed electrician at work">
                        </figure>
                    </div>
                    <div class="col-lg-3 col-md-12 col-sm-12 info-column">
                        <div class="contact-info mr_70">
                            <h3>Get In Touch</h3>
                            <p>Give us a call or drop by anytime, we answer all enquiries within 24 hours.</p>
                            <ul class="info-list clearfix">
                                <li>380 Albert St, Melborne</li>
                                <li><a href="mailto:needhelp@info.com">needhelp@info.com</a></li>
                                <li><a href="tel:123045615523">+1 (230)-456-155-23</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-12 col-sm-12 form-column">
                        <div class="form-inner">
                            <form method="post" action="/contact" id="contact-form"> 
                                <div class="row clearfix">
                                    <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                                        <input type="text" name="username" placeholder="Your Name" required="">
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                                        <input type="email" name="email" placeholder="Your email" required="">
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                                        <input type="text" name="phone" required="" placeholder="Phone">
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                                        <textarea name="message" placeholder="Message"></textarea>
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 form-group message-btn mr-0">
                                        <button class="theme-btn btn-one" type="submit" name="submit-form">Send Message <i class="far fa-angle-right"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- contact-style-three end -->`
);

fs.writeFileSync(contactPath, html, 'utf8');
console.log('Patched contact page with professional image.');
