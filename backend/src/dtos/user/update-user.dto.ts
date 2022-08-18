import { TypedRequestBody } from '@common/types/controller/controller';
import { UpdateUser } from '@controllers/update-user/update-user.controller';
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
    public readonly new_password?: string,
    public readonly birth_year?: number | null,
  ) {}

  public static createFromRequest(
    req: TypedRequestBody<UpdateUser>,
  ): UpdateUserDto {
    const {
      tokenPayload: { sub: id },
      name,
      email,
      sex,
      phone,
      location,
      photo_url,
      new_password,
      birth_year,
    } = req.body;

    return new UpdateUserDto(
      id,
      name,
      email,
      sex,
      phone,
      location,
      photo_url,
      new_password,
      birth_year,
    );
  }
}

export { UpdateUserDto };
