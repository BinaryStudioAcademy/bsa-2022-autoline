import { TypedRequestBody } from '@common/types/controller/controller';
import { UpdateUserReq } from '@controllers/update-user/update-user.controller';
import { Sex } from '@prisma/client';

class UpdateUserDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly sex?: Sex | null,
    public readonly phone?: string | null,
    public readonly location?: string | null,
    public readonly photo_url?: string | null,
    public readonly newPassword?: string,
    public readonly password?: string,
    public readonly birth_year?: number | null,
  ) {}

  public static createFromRequest(
    req: TypedRequestBody<UpdateUserReq>,
  ): UpdateUserDto {
    const {
      name,
      email,
      sex,
      phone,
      location,
      photoUrl,
      newPassword,
      password,
      birthYear,
    } = req.body;

    const id = req.tokenPayload.sub;

    return new UpdateUserDto(
      id,
      name,
      email,
      sex,
      phone,
      location,
      photoUrl,
      newPassword,
      password,
      birthYear,
    );
  }
}

export { UpdateUserDto };
