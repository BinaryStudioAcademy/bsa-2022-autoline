/*
  Warnings:

  - You are about to drop the `Fuel_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Fuel_type`;

-- CreateTable
CREATE TABLE `Fuel_Type` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(300) NOT NULL,
    `autoria_code` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
