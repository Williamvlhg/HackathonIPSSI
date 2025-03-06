-- CreateTable
CREATE TABLE "_SiteToWorker" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_SiteToWorker_A_fkey" FOREIGN KEY ("A") REFERENCES "Site" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SiteToWorker_B_fkey" FOREIGN KEY ("B") REFERENCES "Worker" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_SiteToWorker_AB_unique" ON "_SiteToWorker"("A", "B");

-- CreateIndex
CREATE INDEX "_SiteToWorker_B_index" ON "_SiteToWorker"("B");
