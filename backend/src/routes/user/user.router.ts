import { Router } from 'express';

const PATH = '/users';

const userRouter = Router();

const mockUsers = `[
    {
      "id": "0cdfe5ca-256f-49e4-855f-f438a4fac3c9",
      "email": "bozhena-rudenko@proton.me",
      "name": "Bozhena Rudenko",
      "phone": "+380684125891",
      "location": "Kyiv",
      "photo_url": "https://i.ibb.co/dGHs1tG/usr-10.jpg",
      "role": "user",
      "sex": "female"
    },
    {
      "id": "9a34d92e-2554-4bd8-bc4b-b2831d5cc8a8",
      "email": "borys-leleka@proton.me",
      "name": "Borys Leleka",
      "phone": "+380635415299",
      "location": "Poltava",
      "photo_url": "https://i.ibb.co/C1RNNK7/usr-08.jpg",
      "role": "admin",
      "sex": "male"
    }
  ]`;

userRouter.get(`${PATH}`, (req, res) => {
  res.send(mockUsers);
});

export { userRouter };
