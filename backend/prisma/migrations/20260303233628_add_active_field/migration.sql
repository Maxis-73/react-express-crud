-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Producto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "talla" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Producto" ("color", "id", "nombre", "precio", "talla", "tipo") SELECT "color", "id", "nombre", "precio", "talla", "tipo" FROM "Producto";
DROP TABLE "Producto";
ALTER TABLE "new_Producto" RENAME TO "Producto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
