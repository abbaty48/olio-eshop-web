/*
  Warnings:

  - You are about to drop the column `avatar` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `familyName` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `email_verified` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sub" TEXT,
    "given_name" TEXT,
    "family_name" TEXT,
    "nickname" TEXT,
    "name" TEXT,
    "picture" TEXT,
    "updated_at" TEXT,
    "email" TEXT NOT NULL,
    "email_verified" BOOLEAN NOT NULL
);
INSERT INTO "new_Profile" ("email", "id", "name") SELECT "email", "id", "name" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
