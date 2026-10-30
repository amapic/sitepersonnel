const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Tailles requises pour les icônes Apple
const sizes = [
  57, 60, 72, 76, 114, 120, 144, 152, 180
];

// Créer le dossier apple s'il n'existe pas
const appleDir = path.join(__dirname, 'public', 'apple');
if (!fs.existsSync(appleDir)) {
  fs.mkdirSync(appleDir, { recursive: true });
}

// Chemin vers le favicon source
const sourceIcon = path.join(__dirname, 'public', 'favicon.svg');

// Vérifier si le favicon source existe
if (!fs.existsSync(sourceIcon)) {
  console.error('❌ favicon.svg non trouvé dans le dossier public/');
  process.exit(1);
}

console.log('🚀 Génération des icônes Apple avec Sharp...');

// Fonction pour générer toutes les tailles
async function generateIcons() {
  try {
    // Générer chaque taille
    for (const size of sizes) {
      const outputFile = path.join(appleDir, `apple-touch-icon-${size}x${size}.png`);
      
      await sharp(sourceIcon)
        .resize(size, size)
        .png()
        .toFile(outputFile);
      
      console.log(`✅ ${size}x${size} généré`);
    }

    // Copier le favicon SVG par défaut
    const defaultIcon = path.join(appleDir, 'favicon.svg');
    fs.copyFileSync(sourceIcon, defaultIcon);
    console.log('✅ favicon.svg copié');

    console.log('\n🎉 Génération terminée !');
    console.log('📁 Icônes créées dans: public/apple/');
    console.log('\n📝 Mettez à jour votre HTML avec les nouveaux chemins:');
    console.log('<link rel="apple-touch-icon" href="/apple/favicon.svg">');
    sizes.forEach(size => {
      console.log(`<link rel="apple-touch-icon" sizes="${size}x${size}" href="/apple/apple-touch-icon-${size}x${size}.png">`);
    });

  } catch (error) {
    console.error('❌ Erreur lors de la génération:', error.message);
  }
}

// Exécuter la génération
generateIcons(); 