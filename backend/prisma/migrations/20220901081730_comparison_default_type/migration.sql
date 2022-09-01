-- AlterTable
ALTER TABLE `Comparison` MODIFY `type` ENUM('all', 'difference') NOT NULL DEFAULT 'all';
