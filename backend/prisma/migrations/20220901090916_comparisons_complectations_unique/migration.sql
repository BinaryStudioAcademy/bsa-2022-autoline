/*
  Warnings:

  - A unique constraint covering the columns `[comparison_id,complectation_id]` on the table `Comparisons_Complectations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Comparisons_Complectations_comparison_id_complectation_id_key` ON `Comparisons_Complectations`(`comparison_id`, `complectation_id`);
