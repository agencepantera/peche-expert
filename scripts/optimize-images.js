import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_IMAGES_DIR = path.join(__dirname, '../public/images/blog');
const MAX_WIDTH = 640; // Réduit à 640px pour une meilleure optimisation mobile
const QUALITY = 60; // Qualité ajustée

async function optimizeImages() {
    try {
        const files = await fs.readdir(BLOG_IMAGES_DIR);
        
        for (const file of files) {
            if (file.endsWith('.webp') && !file.startsWith('optimized-')) {
                const inputPath = path.join(BLOG_IMAGES_DIR, file);
                const stats = await fs.stat(inputPath);
                const fileSizeInKb = stats.size / 1024;
                
                console.log(`Optimisation de ${file} (Taille actuelle: ${fileSizeInKb.toFixed(2)} KB)`);

                // Obtenir les métadonnées de l'image
                const metadata = await sharp(inputPath).metadata();
                
                // Calculer la nouvelle largeur en conservant le ratio
                const width = Math.min(metadata.width, MAX_WIDTH);
                const height = Math.round((width * metadata.height) / metadata.width);

                const outputPath = path.join(BLOG_IMAGES_DIR, `optimized-${file}`);
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
                const reduction = ((1 - newFileSizeInKb/fileSizeInKb) * 100).toFixed(2);
                console.log(`✓ Optimisé ! Nouvelle taille: ${newFileSizeInKb.toFixed(2)} KB (${reduction}% de réduction)`);
                console.log(`  Dimensions: ${width}x${height} pixels`);
            }
        }
        
        console.log('\nOptimisation terminée ! Les images optimisées ont été créées avec le préfixe "optimized-"');
        console.log('Vous pouvez maintenant remplacer manuellement les images originales par les versions optimisées.');
    } catch (error) {
        console.error('Erreur lors de l\'optimisation:', error);
    }
}

optimizeImages();
