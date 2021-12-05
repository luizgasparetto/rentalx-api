import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

// HTTP 204 -> Usamos quando faremos uma alteração em algo, mas não iremos enviar um objeto no response, apenas uma pequena atualização (patch)

class UpdateUserAvatarController {

  async handle(request: Request, response: Response ): Promise<Response> {
    const { id } = request.user;
    const avatar_file = request.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)

    await updateUserAvatarUseCase.execute({user_id: id, avatar_file})

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController }