-- CreateTable
CREATE TABLE `Prices_Range` (
    `id` VARCHAR(191) NOT NULL,
    `model_id` VARCHAR(191) NOT NULL,
    `complectation_id` VARCHAR(191) NOT NULL,
    `price_start` INTEGER NOT NULL,
    `price_end` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Prices_Range` ADD CONSTRAINT `Prices_Range_model_id_fkey` FOREIGN KEY (`model_id`) REFERENCES `Model`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prices_Range` ADD CONSTRAINT `Prices_Range_complectation_id_fkey` FOREIGN KEY (`complectation_id`) REFERENCES `Complectation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
