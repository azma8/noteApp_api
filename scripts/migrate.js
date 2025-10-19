import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import query from "../service/noteService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ensureTable = async (name, tableData) => {
  const [rows] = await query(
    `SELECT COUNT(*) AS count 
     FROM information_schema.tables 
     WHERE table_schema = DATABASE() AND table_name = "${name}"`
  );

  const exists = rows.count > 0;

  if (!exists) {
    const { columns, options } = tableData;

    const schemaSQL = Object.entries(columns)
      .map(([col, def]) => `\`${col}\` ${def}`)
      .join(", ");

    const sql = `CREATE TABLE \`${name}\` (${schemaSQL}) ${options || ""};`;
    await query(sql);
    console.log(`✅ Tabel "${name}" berhasil dibuat`);
  } else {
    console.log(`ℹ️  Tabel "${name}" sudah ada`);
  }
};

const seedTable = async (name, data) => {
  if (!Array.isArray(data) || data.length === 0) {
    console.log(`⚠️  Tidak ada data seed untuk tabel "${name}"`);
    return;
  }

  // Ambil kolom dari record pertama
  const columns = Object.keys(data[1]);
  const placeholders = columns.map(() => "?").join(", ");
  
  for (const row of data) {
    const values = columns.map(col => `'${row[col]}'`);
    const sql = `INSERT INTO ${name} (${columns.join(", ")}) VALUES (${values})`;
    await query(sql);
  }

  console.log(`🌱 Data seed untuk tabel "${name}" berhasil dimasukkan (${data.length} baris)`);
};

async function initDB() {
  try {
    const tableFile = join(__dirname, "../schema/tables.json");
    const seedFile = join(__dirname, "../schema/seed.json");

    if (!fs.existsSync(tableFile)) {
      throw new Error(`Schema file tidak ditemukan di: ${tableFile}`);
    }

    const tableData = JSON.parse(fs.readFileSync(tableFile, "utf-8"));
    const seedData = fs.existsSync(seedFile)
      ? JSON.parse(fs.readFileSync(seedFile, "utf-8"))
      : {};

    for (const [tableName, tableInfo] of Object.entries(tableData)) {
      await ensureTable(tableName, tableInfo);

      if (seedData[tableName]) {
        await seedTable(tableName, seedData[tableName]);
      }
    }

    console.log("✅ Semua tabel siap digunakan dan data seed dimasukkan");
      process.exit(0);
  } catch (err) {
    console.error("❌ Gagal inisialisasi tabel:", err);
      process.exit(0);
  }
}

initDB();
