-- CreateTable
CREATE TABLE `Option` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(300) NOT NULL,
    `autoria_code` INTEGER NOT NULL,
    `type` ENUM('security', 'optics', 'multimedia', 'upholstery', 'sound', 'design', 'comfort', 'auxiliary') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
