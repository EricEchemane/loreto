-- AlterTable
ALTER TABLE "AuditLog" ALTER COLUMN "columnName" DROP NOT NULL,
ALTER COLUMN "from" DROP NOT NULL,
ALTER COLUMN "to" DROP NOT NULL;
