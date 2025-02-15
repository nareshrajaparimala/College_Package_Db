import 'dotenv/config'; // Automatically loads .env variables
import pkg from 'pg';

const { Pool } = pkg;

const db = new Pool({
  user: process.env.DB_USER ,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME ,
  password: process.env.DB_PASSWORD ,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
});

// Test connection
async function checkConnection() {
    try {
        const client = await db.connect();
        console.log('✅ PostgreSQL Connected Successfully!');
        client.release(); // Release the client
    } catch (err) {
        console.error('❌ PostgreSQL Connection Failed:', err.message);
    }
}
checkConnection(); // Call the function

// Function to execute queries
const query = async (text, params) => {
    try {
        const result = await db.query(text, params);
        return result.rows;
    } catch (err) {
        console.error("❌ Database Error:", err);
        throw err;
    }
};

// Export database connection and query function
export { db, query };
