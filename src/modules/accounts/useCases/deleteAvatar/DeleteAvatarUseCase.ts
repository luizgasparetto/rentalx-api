import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class DeleteAvatarUseCase {
  constructor(
    @inject("UserRepository")
    private userRespository: IUsersRepository
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRespository.findById(id);
    
    if (!user) {
      throw new AppError("User doesn't exist")
    }

    await this.userRespository.delete(user.id);
  }
}

export { DeleteAvatarUseCase }