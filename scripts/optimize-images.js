import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_IMAGES_DIR = path.join(__dirname, '../public/images/blog');

// Définir différentes tailles pour les images
const SIZES = [
    { width: 280, suffix: '-sm', quality: 60 },
    { width: 400, suffix: '-md', quality: 55 },
    { width: 520, suffix: '-lg', quality: 50 }
];

async function optimizeImages() {
    try {
        const files = await fs.readdir(BLOG_IMAGES_DIR);
        
        for (const file of files) {
            if (file.endsWith('.webp') && !file.includes('-sm') && !file.includes('-md') && !file.includes('-lg')) {
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
                            quality: size.quality,
                            effort: 6,
                            lossless: false,
                            nearLossless: false,
                            reductionEffort: 6
                        })
                        .toFile(outputPath);

                    const newStats = await fs.stat(outputPath);
                    const newFileSizeInKb = newStats.size / 1024;
                    console.log(`✓ Taille ${width}px (qualité ${size.quality}%) : ${newFileSizeInKb.toFixed(2)} KB (${outputFilename})`);
                }

                // Supprimer l'image originale
                await fs.unlink(inputPath);
                console.log(`✓ Image originale supprimée: ${file}`);
            }
        }
        
        console.log('\nOptimisation terminée ! Les images ont été créées en différentes tailles.');
    } catch (error) {
        console.error('Erreur lors de l\'optimisation:', error);
    }
}

optimizeImages();
