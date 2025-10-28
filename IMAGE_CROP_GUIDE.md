# Image Integration Guide for Fifi Hair Salon

## Your 4-Panel Image Breakdown

Based on your provided image, here's how to crop and use each panel:

### 1. Hero Portrait (Top-Left Panel)
- **File**: `public/images/hero/portrait.jpg`
- **Content**: Black woman with natural curls, eyes closed, diffuser styling
- **Perfect for**: Main hero section - shows natural hair care

### 2. Intro Grid Images
- **File 1**: `public/images/intro/p1.jpg` (Top-Right Panel)
  - **Content**: Cornrows/braids, smiling, protective styling
  - **Perfect for**: First intro image - showcases protective styles

- **File 2**: `public/images/intro/p2.jpg` (Bottom-Left Panel)  
  - **Content**: Straightened hair, parted down middle, silk press
  - **Perfect for**: Second intro image - shows straightened styles

- **File 3**: `public/images/intro/p3.jpg` (Bottom-Right Panel)
  - **Content**: Voluminous afro, natural curls, joyful expression
  - **Perfect for**: Third intro image - celebrates natural hair

## How to Crop Your Image

### Using Preview (Mac):
1. Open your image in Preview
2. Select "Tools" → "Rectangular Selection"
3. Crop each panel individually
4. Save as: `portrait.jpg`, `p1.jpg`, `p2.jpg`, `p3.jpg`

### Using Photoshop/GIMP:
1. Open your image
2. Use the crop tool to select each quadrant
3. Export each as separate files
4. Resize to recommended dimensions

## Recommended Dimensions
- **Hero**: 960x1200px (4:5 ratio)
- **Intro**: 400x500px (4:5 ratio) each
- **Gallery**: 600x750px (4:5 ratio) - you can duplicate these for gallery

## File Structure Created
```
public/images/
├── hero/
│   └── portrait.jpg (top-left panel)
├── intro/
│   ├── p1.jpg (top-right panel - braids)
│   ├── p2.jpg (bottom-left panel - silk press)
│   └── p3.jpg (bottom-right panel - afro)
├── gallery/
│   └── (you can duplicate intro images here)
└── services/
    └── (create service-specific images)
```

## Next Steps
1. Crop your image into 4 separate files
2. Save them with the exact filenames above
3. Place them in the correct directories
4. Refresh your website at http://localhost:3000

Your website is already configured to use these images - they'll display perfectly once you add them!
