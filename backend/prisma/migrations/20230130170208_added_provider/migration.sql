/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'local',
    "name" TEXT NOT NULL,
    "password" TEXT,
    "password_reset_token" TEXT,
    "last_login" DATETIME
);
INSERT INTO "new_User" ("createdAt", "email", "id", "last_login", "name", "password", "password_reset_token") SELECT "createdAt", "email", "id", "last_login", "name", "password", "password_reset_token" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
