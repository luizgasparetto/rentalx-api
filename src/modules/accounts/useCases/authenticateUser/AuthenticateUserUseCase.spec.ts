// Iremos fazer o teste de autenticação de usuário, para que isso ocorra bem, precisamos fazer todo o fluxo da aplicação para que chegue até na parte de geração de token, ou seja, precisamos ter um usuário criado antes para executar o teste do token, por esse motivo, importamos o "CreateUserUseCase", para conseguirmos ter nosso usuário e efetuar o teste corretamente.

import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  })

  it("should be able to authenticate an user", async () => {

    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@test.com",
      password: "123456",
      name: "User Test"
    }

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a non existent user", () => {
    expect(async () => {

      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "434781"
      })
    }).rejects.toBeInstanceOf(AppError)
  });

  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "000123",
        email: "user@user.com",
        password: "9999",
        name: "USER ERROR"
      }
  
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrect password"
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})