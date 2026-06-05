# European Electric LLC

React deployment build for the Easton electrical services website template.

## Setup

```bash
npm install
npm run dev
```

## Build for deployment

```bash
npm run build
npm run preview
```

Deploy the `dist` folder to Netlify, Vercel, or any static host.

## Branding

- Company: European Electric LLC
- Header logo: `Logo1.jpeg`
- Mobile/footer logo: `logo2.jpeg`
- Browser tab icon: `logo3.jpeg`

## Free images

Key photos are downloaded from **Unsplash** and **Pexels** (both allow free commercial use):

```bash
npm run images
```

## Notes

Page content is extracted directly from the original HTML files to preserve the exact layout and styling. Original CSS and JavaScript assets are loaded unchanged from `public/assets`.

Team sections are automatically removed during content extraction.
