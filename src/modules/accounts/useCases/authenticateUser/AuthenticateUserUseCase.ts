import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

// Função para validar a senha pelo bcryptjs
import { compare } from "bcryptjs"
// Sign -> Usada para criar o webtoken
import { sign } from "jsonwebtoken"
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  },
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // User exists
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password was incorrect!")
    };

    // Comparo a senha que o usuário me enviou com a que eu tenho no banco de dados
    const passwordMatch = await compare(password, user.password);
    
    if (!passwordMatch) {
      throw new AppError("Email or password was incorrect!")
    };

    // Gerar jsonwebtoken

    const token = sign({}, "af30fdf0bbe62aae5d2a2de7d63c7b96", {
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase }