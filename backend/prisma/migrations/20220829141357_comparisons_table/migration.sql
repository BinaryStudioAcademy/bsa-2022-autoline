-- CreateTable
CREATE TABLE `Comparison` (
    `id` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL,
    `type` ENUM('all', 'difference') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comparisons_Complectations` (
    `id` VARCHAR(191) NOT NULL,
    `comparison_id` VARCHAR(191) NOT NULL,
    `complectation_id` VARCHAR(191) NOT NULL,
    `position` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comparisons_Complectations` ADD CONSTRAINT `Comparisons_Complectations_comparison_id_fkey` FOREIGN KEY (`comparison_id`) REFERENCES `Comparison`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comparisons_Complectations` ADD CONSTRAINT `Comparisons_Complectations_complectation_id_fkey` FOREIGN KEY (`complectation_id`) REFERENCES `Complectation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
