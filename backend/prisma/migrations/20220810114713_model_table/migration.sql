-- CreateTable
CREATE TABLE `Model` (
    `id` VARCHAR(191) NOT NULL,
    `manufacturer_id` VARCHAR(191) NOT NULL,
    `body_type_id` VARCHAR(191) NOT NULL,
    `manufacture_country_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(70) NOT NULL,
    `code_name` VARCHAR(70) NOT NULL,
    `year_start` INTEGER NOT NULL,
    `year_end` INTEGER NOT NULL,
    `photo_urls` JSON NOT NULL,
    `autoria_code` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Model` ADD CONSTRAINT `Model_manufacturer_id_fkey` FOREIGN KEY (`manufacturer_id`) REFERENCES `Manufacturer_Countrie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Model` ADD CONSTRAINT `Model_body_type_id_fkey` FOREIGN KEY (`body_type_id`) REFERENCES `Body_Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Model` ADD CONSTRAINT `Model_manufacture_country_id_fkey` FOREIGN KEY (`manufacture_country_id`) REFERENCES `Brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
