import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { DeleteAvatarController } from "../../../../modules/accounts/useCases/deleteAvatar/DeleteAvatarController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserAvatarController();
const deleteAvatarController = new DeleteAvatarController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
  "/avatar", 
  ensureAuthenticated, 
  uploadAvatar.single("avatar"),
  updateUserController.handle
)
usersRoutes.delete("/delete", ensureAuthenticated, deleteAvatarController.handle)


export { usersRoutes }