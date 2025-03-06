/*
  Warnings:

  - You are about to drop the `_SiteToWorker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_SiteToWorker_B_index";

-- DropIndex
DROP INDEX "_SiteToWorker_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_SiteToWorker";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "workerId" INTEGER NOT NULL,
    "siteId" INTEGER NOT NULL,
    CONSTRAINT "Mission_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Mission_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Mission" ("endDate", "id", "siteId", "startDate", "title", "workerId") SELECT "endDate", "id", "siteId", "startDate", "title", "workerId" FROM "Mission";
DROP TABLE "Mission";
ALTER TABLE "new_Mission" RENAME TO "Mission";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
