import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

// O que é assincrono no repositório normal, terá que entrar nos teste como assincrono também

describe("Create category", () => {

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  })

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category test",
      description: "Description test"
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

    console.log(categoryCreated);

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able a new category with an existing name", async () => {
    // Vou colocar tudo no meu expect aqui, como sabemos se criarmos duas categories o AppError irá lançar um erro, aqui executaremos o código até ele dar o erro, depois passamos o ".rejects", dizendo que esperamos que isso seja rejeitado/ de erro, e que esse erro seja da instância de AppError
    expect(async () => {
      const category = {
        name: "Category test",
        description: "Description test"
      };
  
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });
  
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });
    }).rejects.toBeInstanceOf(AppError);
  });
})