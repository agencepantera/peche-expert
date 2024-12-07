import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_IMAGES_DIR = path.join(__dirname, '../public/images/blog');

async function renameOptimizedImages() {
    try {
        const files = await fs.readdir(BLOG_IMAGES_DIR);
        
        for (const file of files) {
            if (file.startsWith('optimized-')) {
                const originalName = file.replace('optimized-', '');
                const oldPath = path.join(BLOG_IMAGES_DIR, file);
                const newPath = path.join(BLOG_IMAGES_DIR, originalName);
                
                // Supprimer l'ancien fichier s'il existe
                try {
                    await fs.unlink(newPath);
                    console.log(`Ancien fichier supprimé: ${originalName}`);
                } catch (error) {
                    // Ignorer l'erreur si le fichier n'existe pas
                }

                // Renommer le fichier optimisé
                await fs.rename(oldPath, newPath);
                console.log(`✓ Fichier renommé: ${file} -> ${originalName}`);
            }
        }
        
        console.log('\nRenommage terminé ! Les images optimisées ont remplacé les originales.');
    } catch (error) {
        console.error('Erreur lors du renommage:', error);
    }
}

renameOptimizedImages();
