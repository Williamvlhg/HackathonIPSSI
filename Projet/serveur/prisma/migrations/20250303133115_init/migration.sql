/*
  Warnings:

  - Added the required column `workerId` to the `Skills` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Skills" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "workerId" INTEGER NOT NULL,
    CONSTRAINT "Skills_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Skills" ("id", "label") SELECT "id", "label" FROM "Skills";
DROP TABLE "Skills";
ALTER TABLE "new_Skills" RENAME TO "Skills";
CREATE TABLE "new_Worker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "skillId" INTEGER NOT NULL,
    CONSTRAINT "Worker_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Worker" ("id", "skillId") SELECT "id", "skillId" FROM "Worker";
DROP TABLE "Worker";
ALTER TABLE "new_Worker" RENAME TO "Worker";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
