import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_IMAGES_DIR = path.join(__dirname, '../public/images/blog');

// Définir différentes tailles pour les images
const SIZES = [
    { width: 320, suffix: '-sm' },
    { width: 480, suffix: '-md' },
    { width: 640, suffix: '-lg' }
];

const QUALITY = 55; // Qualité WebP

async function optimizeImages() {
    try {
        const files = await fs.readdir(BLOG_IMAGES_DIR);
        
        for (const file of files) {
            if (file.endsWith('.webp') && !file.startsWith('optimized-')) {
                const inputPath = path.join(BLOG_IMAGES_DIR, file);
                const stats = await fs.stat(inputPath);
                const fileSizeInKb = stats.size / 1024;
                
                console.log(`\nOptimisation de ${file} (Taille actuelle: ${fileSizeInKb.toFixed(2)} KB)`);

                // Obtenir les métadonnées de l'image
                const metadata = await sharp(inputPath).metadata();
                
                // Créer les différentes tailles
                for (const size of SIZES) {
                    const width = Math.min(metadata.width, size.width);
                    const height = Math.round((width * metadata.height) / metadata.width);

                    const outputFilename = file.replace('.webp', `${size.suffix}.webp`);
                    const outputPath = path.join(BLOG_IMAGES_DIR, outputFilename);

                    await sharp(inputPath)
                        .resize(width, height, {
                            fit: 'cover',
                            withoutEnlargement: true
                        })
                        .webp({ 
                            quality: QUALITY,
                            effort: 6,
                            lossless: false,
                            nearLossless: false
                        })
                        .toFile(outputPath);

                    const newStats = await fs.stat(outputPath);
                    const newFileSizeInKb = newStats.size / 1024;
                    console.log(`✓ Taille ${width}px : ${newFileSizeInKb.toFixed(2)} KB (${outputFilename})`);
                }
            }
        }
        
        console.log('\nOptimisation terminée ! Les images ont été créées en différentes tailles.');
    } catch (error) {
        console.error('Erreur lors de l\'optimisation:', error);
    }
}

optimizeImages();
