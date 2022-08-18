/*
  Warnings:

  - Added the required column `descripion` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Model` ADD COLUMN `descripion` VARCHAR(1000) NOT NULL;
