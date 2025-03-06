/*
  Warnings:

  - You are about to drop the column `workerId` on the `Skill` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Skill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL
);
INSERT INTO "new_Skill" ("id", "label") SELECT "id", "label" FROM "Skill";
DROP TABLE "Skill";
ALTER TABLE "new_Skill" RENAME TO "Skill";
CREATE TABLE "new__WorkerSites" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_WorkerSites_A_fkey" FOREIGN KEY ("A") REFERENCES "Site" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_WorkerSites_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__WorkerSites" ("A", "B") SELECT "A", "B" FROM "_WorkerSites";
DROP TABLE "_WorkerSites";
ALTER TABLE "new__WorkerSites" RENAME TO "_WorkerSites";
CREATE UNIQUE INDEX "_WorkerSites_AB_unique" ON "_WorkerSites"("A", "B");
CREATE INDEX "_WorkerSites_B_index" ON "_WorkerSites"("B");
CREATE TABLE "new__WorkerSkills" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_WorkerSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "Skill" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_WorkerSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "Worker" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__WorkerSkills" ("A", "B") SELECT "A", "B" FROM "_WorkerSkills";
DROP TABLE "_WorkerSkills";
ALTER TABLE "new__WorkerSkills" RENAME TO "_WorkerSkills";
CREATE UNIQUE INDEX "_WorkerSkills_AB_unique" ON "_WorkerSkills"("A", "B");
CREATE INDEX "_WorkerSkills_B_index" ON "_WorkerSkills"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
