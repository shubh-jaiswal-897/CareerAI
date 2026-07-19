import os
import sqlite3
import uuid
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

DB_FILE = Path(os.getenv("CAREERAI_DB_PATH", Path(__file__).resolve().parent / "careerai.db"))


def _get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            _id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    conn.commit()
    return conn


class SQLiteCollection:
    def __init__(self, conn, table_name):
        self.conn = conn
        self.table_name = table_name

    async def find_one(self, query):
        if not query:
            return None

        field = next(iter(query))
        value = query[field]
        row = self.conn.execute(
            f"SELECT * FROM {self.table_name} WHERE {field} = ? LIMIT 1",
            (value,),
        ).fetchone()

        if row is None:
            return None

        return dict(row)

    async def insert_one(self, document):
        self.conn.execute(
            f"INSERT INTO {self.table_name} (_id, name, email, password, created_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)",
            (
                document["_id"],
                document["name"],
                document["email"],
                document["password"],
            ),
        )
        self.conn.commit()
        return document


class SQLiteDatabase:
    def __init__(self):
        self.conn = _get_connection()
        self.conn.execute(
            """
            CREATE TABLE IF NOT EXISTS resumes (
                _id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                filename TEXT NOT NULL,
                targetRole TEXT NOT NULL,
                score INTEGER,
                atsScore INTEGER,
                formattingScore INTEGER,
                summary TEXT,
                strengths TEXT,
                gaps TEXT,
                recommendations TEXT,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
        self.conn.commit()
        self.collections = {
            "users": SQLiteCollection(self.conn, "users"),
            "resumes": SQLiteCollection(self.conn, "resumes"),
        }

    def __getitem__(self, key):
        return self.collections[key]


def get_db():
    return SQLiteDatabase()
