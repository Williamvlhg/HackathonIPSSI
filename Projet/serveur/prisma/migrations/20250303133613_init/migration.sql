/*
  Warnings:

  - Added the required column `siteId` to the `Skills` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Site" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "skillId" INTEGER NOT NULL
);
INSERT INTO "new_Site" ("address", "endDate", "id", "name", "skillId", "startDate") SELECT "address", "endDate", "id", "name", "skillId", "startDate" FROM "Site";
DROP TABLE "Site";
ALTER TABLE "new_Site" RENAME TO "Site";
CREATE TABLE "new_Skills" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "workerId" INTEGER NOT NULL,
    "siteId" INTEGER NOT NULL,
    CONSTRAINT "Skills_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Skills_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Skills" ("id", "label", "workerId") SELECT "id", "label", "workerId" FROM "Skills";
DROP TABLE "Skills";
ALTER TABLE "new_Skills" RENAME TO "Skills";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
