import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FONTS_DIR = path.join(__dirname, '../public/fonts');

// URLs des fichiers de police Inter
const fontUrls = {
    'Inter-Regular.woff2': 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
    'Inter-Medium.woff2': 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2',
    'Inter-SemiBold.woff2': 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2',
    'Inter-Bold.woff2': 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2'
};

// Fonction pour télécharger un fichier
function downloadFile(url, filename) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(FONTS_DIR, filename);
        const file = fs.createWriteStream(filePath);

        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`✓ Téléchargé: ${filename}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filePath, () => {
                reject(err);
            });
        });
    });
}

// Télécharger toutes les polices
async function downloadAllFonts() {
    try {
        // S'assurer que le dossier fonts existe
        if (!fs.existsSync(FONTS_DIR)) {
            fs.mkdirSync(FONTS_DIR, { recursive: true });
        }

        // Télécharger chaque police
        const downloads = Object.entries(fontUrls).map(([filename, url]) => 
            downloadFile(url, filename)
        );

        await Promise.all(downloads);
        console.log('\nTous les fichiers de police ont été téléchargés avec succès !');
    } catch (error) {
        console.error('Erreur lors du téléchargement des polices:', error);
    }
}

downloadAllFonts();
