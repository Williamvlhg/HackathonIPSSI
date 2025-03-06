/*
  Warnings:

  - You are about to drop the column `siteId` on the `Skill` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_WorkerSkills" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_WorkerSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "Site" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_WorkerSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Skill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "workerId" INTEGER,
    CONSTRAINT "Skill_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Skill" ("id", "label", "workerId") SELECT "id", "label", "workerId" FROM "Skill";
DROP TABLE "Skill";
ALTER TABLE "new_Skill" RENAME TO "Skill";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_WorkerSkills_AB_unique" ON "_WorkerSkills"("A", "B");

-- CreateIndex
CREATE INDEX "_WorkerSkills_B_index" ON "_WorkerSkills"("B");
