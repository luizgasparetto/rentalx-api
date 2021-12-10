import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase

describe("Create Car", () => {
  beforeEach(() => {
    createCarUseCase = new CreateCarUseCase();
  })

  it("should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Car Name", 
      description: "Car Description",
      daily_rate: 100,
      license_plate: "ABC-1234", 
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    });
  })
})