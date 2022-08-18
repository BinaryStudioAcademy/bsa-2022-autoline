/*
  Warnings:

  - Added the required column `name` to the `Complectation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Complectation` ADD COLUMN `name` VARCHAR(70) NOT NULL;
