/*
  Warnings:

  - You are about to drop the `Manufacturer_Countrie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Model` DROP FOREIGN KEY `Model_manufacturer_id_fkey`;

-- DropTable
DROP TABLE `Manufacturer_Countrie`;

-- CreateTable
CREATE TABLE `Manufacturer_Country` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(300) NOT NULL,
    `autoria_code` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Model` ADD CONSTRAINT `Model_manufacturer_id_fkey` FOREIGN KEY (`manufacturer_id`) REFERENCES `Manufacturer_Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
