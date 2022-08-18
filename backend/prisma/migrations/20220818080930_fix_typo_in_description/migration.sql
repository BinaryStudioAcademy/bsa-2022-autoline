/*
  Warnings:

  - You are about to drop the column `descripion` on the `Model` table. All the data in the column will be lost.
  - Added the required column `description` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Model` DROP COLUMN `descripion`,
    ADD COLUMN `description` VARCHAR(1000) NOT NULL;
