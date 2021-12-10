import { Request, Response, NextFunction } from "express";

// Função para verificar se um token é válido ou não
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

  // Puxando o token do header (por padrão é authorization)
  const authHeader = request.headers.authorization;

  if (!authHeader) { 
    throw new AppError("Token missing", 401)
  }

  // Bearer x9h9hhasu9dh9wqh
  const [, token] = authHeader.split(" ")

  // Verify() -> De primeiro parâmetro eu recebo o token que quero checar, de segundo parâmetro a minha chave secreta (A mesma que eu usei em AuthenticateUserUseCase.ts)
  try {
    // O "sub" aqui é referente ao id do usuário que possui o token
    const { sub: user_id } = verify(token, "af30fdf0bbe62aae5d2a2de7d63c7b96") as IPayload;
    
    const usersRepository = new UserRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Users doesn't exists!", 401)
    }

    request.user  = {
      id: user_id,
    }

    next();
  } catch (err) {
    throw new AppError("Invalid token!", 401);
  } 

}