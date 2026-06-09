import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_NAME || 'ici_website',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
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
