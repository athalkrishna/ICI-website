import mysql from 'mysql2/promise';

const dbHost = process.env.DATABASE_HOST || '127.0.0.1';
const pool = mysql.createPool({
  host: dbHost === 'localhost' ? '127.0.0.1' : dbHost,
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_NAME || 'ici_website',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  connectTimeout: 5000,
});

export async function query(sql: string, values?: any[]) {
  try {
    const [rows, fields] = await pool.execute(sql, values);
    return rows;
  } catch (error: any) {
    console.warn('[DB WARNING] Database query failed. Ensure MySQL is running and credentials are correct.');
    throw new Error('DB_CONN_FAILED');
  }
}

export { pool };
