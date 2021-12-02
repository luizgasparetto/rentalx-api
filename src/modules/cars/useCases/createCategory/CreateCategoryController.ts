import { Request, Response } from 'express'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'
import { container } from "tsyringe";


// Injetando a dependência de outra forma, agora utilizo o "container.resolve()", passando detendro dele a minha injeção de dependência.
class CreateCategoryController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

    await createCategoryUseCase.execute({ name, description })

    return response.status(201).send()
  }
}

export { CreateCategoryController }