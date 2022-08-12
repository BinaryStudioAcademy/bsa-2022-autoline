-- CreateTable
CREATE TABLE `Complectation` (
    `id` VARCHAR(191) NOT NULL,
    `model_id` VARCHAR(191) NOT NULL,
    `engine` VARCHAR(300) NOT NULL,
    `engine_displacement` DECIMAL(65, 30) NOT NULL,
    `engine_power` INTEGER NOT NULL,
    `color_id` VARCHAR(191) NOT NULL,
    `drivetrain_id` VARCHAR(191) NOT NULL,
    `fuel_type_id` VARCHAR(191) NOT NULL,
    `transmission_type_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ComplectationsOnOptions` (
    `complectation_id` VARCHAR(191) NOT NULL,
    `option_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`complectation_id`, `option_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Complectation` ADD CONSTRAINT `Complectation_model_id_fkey` FOREIGN KEY (`model_id`) REFERENCES `Model`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Complectation` ADD CONSTRAINT `Complectation_color_id_fkey` FOREIGN KEY (`color_id`) REFERENCES `Color`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Complectation` ADD CONSTRAINT `Complectation_drivetrain_id_fkey` FOREIGN KEY (`drivetrain_id`) REFERENCES `Drivetrain`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Complectation` ADD CONSTRAINT `Complectation_fuel_type_id_fkey` FOREIGN KEY (`fuel_type_id`) REFERENCES `Fuel_Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Complectation` ADD CONSTRAINT `Complectation_transmission_type_id_fkey` FOREIGN KEY (`transmission_type_id`) REFERENCES `Transmission_Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComplectationsOnOptions` ADD CONSTRAINT `ComplectationsOnOptions_complectation_id_fkey` FOREIGN KEY (`complectation_id`) REFERENCES `Complectation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComplectationsOnOptions` ADD CONSTRAINT `ComplectationsOnOptions_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `Option`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
