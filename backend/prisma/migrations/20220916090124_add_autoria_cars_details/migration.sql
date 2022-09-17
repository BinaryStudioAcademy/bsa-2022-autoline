/*
  Warnings:

  - A unique constraint covering the columns `[autoria_code]` on the table `City` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[autoria_code]` on the table `Fuel_Type` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[autoria_code]` on the table `Transmission_Type` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `Autoria_Cars_Details` (
    `id` VARCHAR(191) NOT NULL,
    `model_id` VARCHAR(300) NOT NULL,
    `autoria_code` INTEGER NOT NULL,
    `race` INTEGER NOT NULL,
    `city_id` VARCHAR(300) NULL,
    `transmission_type_id` VARCHAR(300) NULL,
    `fuel_type_id` VARCHAR(300) NULL,
    `price` INTEGER NOT NULL,
    `autoria_url` VARCHAR(300) NULL,
    `photo_url` VARCHAR(300) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Autoria_Cars_Details_autoria_code_key`(`autoria_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `City_autoria_code_key` ON `City`(`autoria_code`);

-- CreateIndex
CREATE UNIQUE INDEX `Fuel_Type_autoria_code_key` ON `Fuel_Type`(`autoria_code`);

-- CreateIndex
CREATE UNIQUE INDEX `Transmission_Type_autoria_code_key` ON `Transmission_Type`(`autoria_code`);

-- AddForeignKey
ALTER TABLE `Autoria_Cars_Details` ADD CONSTRAINT `Autoria_Cars_Details_model_id_fkey` FOREIGN KEY (`model_id`) REFERENCES `Model`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Autoria_Cars_Details` ADD CONSTRAINT `Autoria_Cars_Details_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Autoria_Cars_Details` ADD CONSTRAINT `Autoria_Cars_Details_transmission_type_id_fkey` FOREIGN KEY (`transmission_type_id`) REFERENCES `Transmission_Type`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Autoria_Cars_Details` ADD CONSTRAINT `Autoria_Cars_Details_fuel_type_id_fkey` FOREIGN KEY (`fuel_type_id`) REFERENCES `Fuel_Type`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
