const mysql = require('mysql2/promise');

async function updateDB() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ici_website'
  });

  const updates = [
    { key: 'cred_catalyst_title', value: 'Catalyst' },
    { key: 'cred_architect_title', value: 'Architect' },
    { key: 'cred_sage_title', value: 'Sage' },
    { key: 'cred_luminary_title', value: 'Luminary' }
  ];

  for (const update of updates) {
    const [result] = await connection.execute(
      'UPDATE site_content SET content_value = ? WHERE section_key = ?',
      [update.value, update.key]
    );
    console.log(`Updated ${update.key}: ${result.affectedRows} rows changed`);
  }

  await connection.end();
}

updateDB().catch(console.error);
