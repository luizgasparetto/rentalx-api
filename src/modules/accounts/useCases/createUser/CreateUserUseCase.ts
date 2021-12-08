import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { AppError } from "@errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor (
    @inject("UserRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
    const userAlreadyExits = await this.usersRepository.findByEmail(email);

    if (userAlreadyExits) {
      throw new AppError("User already exists!")
    }

    const passwordHash = await hash(password, 8)

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });

  }
}

export { CreateUserUseCase }