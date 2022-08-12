-- DropForeignKey
ALTER TABLE `Model` DROP FOREIGN KEY `Model_manufacture_country_id_fkey`;

-- DropForeignKey
ALTER TABLE `Model` DROP FOREIGN KEY `Model_manufacturer_id_fkey`;

-- AddForeignKey
ALTER TABLE `Model` ADD CONSTRAINT `Model_manufacture_country_id_fkey` FOREIGN KEY (`manufacture_country_id`) REFERENCES `Manufacturer_Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Model` ADD CONSTRAINT `Model_manufacturer_id_fkey` FOREIGN KEY (`manufacturer_id`) REFERENCES `Brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
