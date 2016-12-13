

export const MERCH_COMPANY_TABLE = `CREATE TABLE IF NOT EXISTS company ( 
                        id INTEGER NOT NULL PRIMARY KEY,
                        name TEXT NOT NULL,
                        street TEXT,
                        city TEXT,
                        state TEXT,
                        zip TEXT,
                        parentId INTEGER,
                        relType INTEGER
                      )`;
