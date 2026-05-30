const https = require('https');

// Curated candidates: dark background, macro, beaded jewelry/crystals/bracelets
const candidates = [
  // Dark macro crystal/bead photos
  'photo-1617038220319-276d3cfab638',  // dark jewelry
  'photo-1612817159949-195b6eb9e31a',  // dark stone macro
  'photo-1611652022419-a9419f74343d',  // crystal on dark bg
  'photo-1618354691373-d851c5c3a990',  // crystal close-up
  'photo-1573408301185-9146fe634ad0',  // dark gem macro
  'photo-1612817288484-6f916006741a',  // dark crystal
  'photo-1603561591411-07134e71a2a9',  // dark jewelry shot
  'photo-1543294001-f7cd5d7fb516',  // bracelet close-up
  'photo-1615655406736-b37c4fabf923',  // dark gem
  'photo-1608042314453-ae338d80c427',  // crystal dark bg
  'photo-1600003014755-ba31aa59c4b6',  // jewelry dark
  'photo-1605100804763-247f67b3557e',  // dark crystal macro
  'photo-1610375461246-83df859d849d',  // gold bracelet dark
  'photo-1583847268964-b28dc8f51f92',  // dark jewelry gold
  
  // Additional dark macro crystal/jewelry candidates
  'photo-1610694955371-d4a3e0ce4b52',  // crystal dark
  'photo-1598560917807-1bae44bd2be8',  // dark stone
  'photo-1583937443687-eb67f6dcac82',  // jewelry macro
  'photo-1622398925373-3f91b1e275f5',  // dark bracelet
  'photo-1611085583191-a3b181a88401',  // crystal macro
  'photo-1614094082869-cd4e4b2905c7',  // gem close-up dark
  'photo-1611652022419-a9419f74343d',  // crystal beads
  'photo-1617038220319-276d3cfab638',  // dark gold
  'photo-1594035910387-fea47794261f',  // jewelry dark bg
  'photo-1599458252573-56ae36120de1',  // bracelet dark
  'photo-1617692855027-33b14f061079',  // dark crystals
  'photo-1616422285623-13ff0162193c',  // jewelry dark
  'photo-1504203700686-f21e728e7e3d',  // bracelet
  'photo-1611591437281-460bfbe1220a',  // beads dark
  'photo-1629189564747-b5f76c053a15',  // bracelet macro dark
  'photo-1597696929736-6d13bed8e6a8',  // beads dark
  'photo-1602173574767-37ac01994b2a',  // dark gems
  'photo-1535632066927-ab7c9ab60908',  // dark bracelet
  'photo-1596944924616-7b38e7cfac36',  // gold bracelet dark bg
  'photo-1515562141207-7a88fb7ce338',  // pearls dark 
  'photo-1589674781759-c21c37956a44',  // gold dark
  'photo-1599643477877-530eb83abc8e',  // dark bracelet
];

async function check(id) {
  return new Promise((resolve) => {
    const url = `https://images.unsplash.com/${id}?q=80&w=100`;
    https.get(url, (res) => {
      resolve({ id, status: res.statusCode });
    }).on('error', () => {
      resolve({ id, status: 'ERROR' });
    });
  });
}

// Deduplicate
const unique = [...new Set(candidates)];
Promise.all(unique.map(check)).then((results) => {
  console.log('=== WORKING (200) ===');
  results.filter(r => r.status === 200).forEach(r => console.log(r.id));
  console.log('\n=== BROKEN (non-200) ===');
  results.filter(r => r.status !== 200).forEach(r => console.log(`${r.id} => ${r.status}`));
});
