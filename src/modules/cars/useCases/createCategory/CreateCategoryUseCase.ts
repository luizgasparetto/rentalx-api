import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'
import { inject, injectable} from "tsyringe";

interface IRequest {
  name: string;
  description: string;
}

// Preciso adicionar o @injectable() antes da classe pra declarar que ela pode ser injetável pelo tsyringe 

// Usei o inject, passando como parâmetro o nome do Singleton que eu defini no index.ts da pasta shared, assim eu todo lugar que eu colocar isso, ele fará a injeção de dependência que eu configurei no meu arquivo do tsyringe.

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
    ) { }

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new Error("Category already exists!")
    }

    this.categoriesRepository.create({ name, description })
  }
}


export { CreateCategoryUseCase }