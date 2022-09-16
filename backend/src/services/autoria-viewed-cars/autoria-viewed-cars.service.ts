import { prisma } from '@data/prisma-client';
import { carsUpdateAutoriaDetailsByCode } from '@services/cars/cars-autoria-details.service';

interface CarToAutoRiaViewed {
  userId: string;
  modelId: string;
  autoriaCode: string;
}

const addCarToAutoRiaViewed = async ({
  userId,
  modelId,
  autoriaCode,
}: CarToAutoRiaViewed): Promise<void> => {
  const viewedCar = await prisma.users_Autoria_Viewed_Cars.findFirst({
    where: {
      user_id: userId,
      model_id: modelId,
      autoria_code: Number(autoriaCode),
    },
    select: {
      id: true,
    },
  });

  if (viewedCar) return;

  await prisma.users_Autoria_Viewed_Cars.create({
    data: {
      user_id: userId,
      model_id: modelId,
      autoria_code: Number(autoriaCode),
    },
    select: {
      id: true,
    },
  });

  await carsUpdateAutoriaDetailsByCode(Number(autoriaCode), modelId);
};

export { addCarToAutoRiaViewed };
