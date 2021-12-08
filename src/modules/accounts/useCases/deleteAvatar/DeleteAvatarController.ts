import { Request, Response } from "express"
import { container } from "tsyringe";
import { DeleteAvatarUseCase } from "./DeleteAvatarUseCase";

class DeleteAvatarController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const deleteAvatarUseCase = container.resolve(DeleteAvatarUseCase)

    await deleteAvatarUseCase.execute(id)

    return response.status(200).json({ message: "User deleted!"})
  }
}

export { DeleteAvatarController }