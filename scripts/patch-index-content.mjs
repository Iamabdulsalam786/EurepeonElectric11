import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.join(__dirname, '..', 'src', 'content', 'index.html');

if (!fs.existsSync(indexPath)) {
  console.warn('index.html content not found, skipping patch');
  process.exit(0);
}

let html = fs.readFileSync(indexPath, 'utf8');

// --- Fix homepage About image (match working About page structure) ---
const aboutImageBlock = `<div class="image_block_eight">
                            <div data-animation-box class="image-box p_relative d_block">
                                <div class="shape">
                                    <div class="shape-1" style="background-image: url(/assets/images/shape/shape-45.png);"></div>
                                    <div class="shape-2" style="background-image: url(/assets/images/shape/shape-45.png);"></div>
                                </div>
                                <div class="icon-box float-bob-y"><img src="/assets/images/icons/icon-1.png" alt=""></div>
                                <figure class="overlay-anim-black-bg image image-1 overlay-animation" data-animation="overlay-animation"><img src="/assets/images/resource/about-5.jpg" alt="European Electric LLC electrician at work"></figure>
                                <figure class="image image-2"><img src="/assets/images/resource/about-6.jpg" alt="Electrical installation service"></figure>
                            </div>
                        </div>`;

html = html.replace(/<div class="image_block_one">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<div class="col-lg-6 col-md-12 col-sm-12 content-column">/, `${aboutImageBlock}
                    </div>
                    <div class="col-lg-6 col-md-12 col-sm-12 content-column">`);

// --- Feature cards after About: real links & copy ---
html = html.replace(
  /<h3><a href="\/">Safety Inspection<\/a><\/h3>\s*<p>Lorem ipsum dolor amet cons adicing elit sed\.<\/p>\s*<div class="link"><a href="\/"><span>Read more<\/span>/,
  '<h3><a href="/services">Safety Inspection</a></h3><p>Comprehensive electrical safety checks for your home or business.</p><div class="link"><a href="/services"><span>Read more</span>'
);
html = html.replace(
  /<h3><a href="\/">Electric Installation<\/a><\/h3>\s*<p>Lorem ipsum dolor amet cons adicing elit sed\.<\/p>\s*<div class="link"><a href="\/"><span>Read more<\/span>/,
  '<h3><a href="/electrical-panels">Electric Installation</a></h3><p>Professional wiring, panels, outlets, and fixture installation.</p><div class="link"><a href="/electrical-panels"><span>Read more</span>'
);
html = html.replace(
  /<h3><a href="\/">Best Maintanance<\/a><\/h3>\s*<p>Lorem ipsum dolor amet cons adicing elit sed\.<\/p>\s*<div class="link"><a href="\/"><span>Read more<\/span>/,
  '<h3><a href="/appointment">Maintenance &amp; Repairs</a></h3><p>Preventive maintenance and fast emergency electrical repairs.</p><div class="link"><a href="/appointment"><span>Read more</span>'
);

// --- Disable FAQ section ---
html = html.replace(
  /<!-- faq-section -->[\s\S]*?<!-- faq-section end -->/,
  '<!-- faq-section: temporarily disabled -->'
);

// --- Testimonials: no avatar images, premium text-only author block ---
const testimonialSlide = (name, role, quote) => `<div class="testimonial-block-one">
                                    <div class="inner-box p_relative d_block testimonial-card">
                                        <div class="light-icon"><img src="/assets/images/icons/icon-3.png" alt=""></div>
                                        <div class="icon-box p_relative d_block fs_65"><i class="icon-31"></i></div>
                                        <p>${quote}</p>
                                        <div class="author-box author-box--text-only p_relative d_block">
                                            <h5>${name}</h5>
                                            <span class="designation p_relative d_block">${role}</span>
                                        </div>
                                    </div>
                                </div>`;

html = html.replace(
  /<!-- testimonial-section -->[\s\S]*?<!-- testimonial-section end -->/,
  `<!-- testimonial-section -->
        <section class="testimonial-section p_relative testimonial-section--refined">
            <div class="bg-layer parallax-bg" data-parallax='{"y": 100}' style="background-image: url(/assets/images/background/testimonial-bg.jpg);"></div>
            <div class="bg-layer-2" style="background-image: url(/assets/images/background/testimonial-bg-2.jpg);"></div>
            <div class="auto-container">
                <div class="row align-items-center clearfix">
                    <div class="col-lg-6 col-md-12 col-sm-12 title-column">
                        <div class="sec-title light p_relative mb_50">
                            <h5 class="d_block fs_17 lh_25 fw_medium mb_9">Testimonials</h5>
                            <h2 class="d_block fs_40 lh_50 fw_bold">What Our Clients Say <br />About European Electric LLC.</h2>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12 col-sm-12 testimonial-column">
                        <div class="testimonial-inner p_relative d_block ml_30">
                            <div class="single-item-carousel owl-carousel owl-dots-none nav-style-one">
                                ${testimonialSlide(
                                  'Sarah Mitchell',
                                  'Homeowner',
                                  'European Electric LLC upgraded our panel and installed new lighting throughout our home. Professional, on time, and the work passed inspection without a single issue.'
                                )}
                                ${testimonialSlide(
                                  'James Porter',
                                  'Commercial Property Manager',
                                  'They handled a full tenant improvement wiring project for our retail space. Clear communication, fair pricing, and everything was completed ahead of schedule.'
                                )}
                                ${testimonialSlide(
                                  'Elena Rodriguez',
                                  'EV Charger Customer',
                                  'From permit to Tesla charger install, the team made the whole process easy. Our Level 2 charger has worked flawlessly since day one.'
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- testimonial-section end -->`
);

// --- Homepage CTA contact: add professional image column ---
html = html.replace(
  /<figure class="image-layer"><img src="\/assets\/images\/resource\/vector-1.png" alt=""><\/figure>\s*<div class="auto-container">\s*<div class="row clearfix">\s*<div class="col-lg-6 col-md-12 col-sm-12 content-column">/,
  `<div class="auto-container">
                <div class="row clearfix align-items-center">
                    <div class="col-lg-6 col-md-12 col-sm-12 content-column">`
);

html = html.replace(
  /(<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>\s*<!-- cta-section end -->)/,
  `</div>
                    </div>
                    <div class="col-lg-6 col-md-12 col-sm-12 image-column">
                        <figure class="cta-contact-image p_relative d_block">
                            <img src="/assets/images/resource/about-5.jpg" alt="Licensed electrician at work">
                        </figure>
                    </div>
                </div>
            </div>
        </section>
        <!-- cta-section end -->`
);

// --- Why Choose Us: real copy + image alt text ---
html = html.replace(
  /<h2 class="d_block fs_40 lh_50 fw_bold mb_25">Great Reasons For People Choose Easton<\/h2>\s*<p>Consectetur adipisicing elit[^<]*<\/p>/,
  `<h2 class="d_block fs_40 lh_50 fw_bold mb_25">Why Homeowners &amp; Businesses Choose European Electric LLC</h2>
                                    <p>Licensed electricians, transparent pricing, and dependable service for residential wiring, commercial build-outs, and EV charger installations across every project size.</p>`
);

html = html.replace(
  '<figure class="image-1 p_relative d_block"><img src="/assets/images/resource/chooseus-1.jpg" alt=""></figure>',
  '<figure class="image-1 p_relative d_block"><img src="/assets/images/resource/chooseus-1.jpg" alt="Licensed electrician on a residential job site"></figure>'
);
html = html.replace(
  '<figure class="image-2 p_relative d_block"><img src="/assets/images/resource/chooseus-2.jpg" alt=""></figure>',
  '<figure class="image-2 p_relative d_block"><img src="/assets/images/resource/chooseus-2.jpg" alt="Professional electrical panel and wiring work"></figure>'
);

// --- Hide projects carousel (before testimonials) ---
html = html.replace(
  /<!-- project-section -->[\s\S]*?<!-- project-section end -->/,
  '<!-- project-section: hidden -->'
);

// --- Remove template dummy client logos ---
html = html.replace(
  /<!-- clients-section -->[\s\S]*?<!-- clients-section end -->/,
  '<!-- clients-section: disabled for live site -->'
);

html = html.replace(/tel:01243507689/, 'tel:123045615523');
html = html.replace(/\+012-4350-7689/, '+1 (230)-456-155-23');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Patched homepage: about image, features, FAQ off, testimonials, contact CTA, chooseus.');
