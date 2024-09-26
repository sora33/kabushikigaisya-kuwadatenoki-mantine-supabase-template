-- CreateEnum
CREATE TYPE "role" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "first_name_kana" TEXT,
    "last_name_kana" TEXT,
    "gender" TEXT,
    "phone_number" TEXT,
    "birth_date" INTEGER,
    "postal_code" TEXT,
    "prefecture" TEXT,
    "address" TEXT,
    "email" TEXT,
    "role" "role",
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");
