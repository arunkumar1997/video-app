-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'local',
    "name" TEXT,
    "password" TEXT,
    "password_reset_token" TEXT,
    "last_login" DATETIME
);
INSERT INTO "new_User" ("createdAt", "email", "id", "last_login", "name", "password", "password_reset_token", "provider") SELECT "createdAt", "email", "id", "last_login", "name", "password", "password_reset_token", "provider" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
