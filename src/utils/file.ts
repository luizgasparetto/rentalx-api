// stat() -> Verifica se existe algo no diretório que a gente passar
// unlink() -> Se tiver algum arquivo no diretório que a gente passar, ele será removido pelo unlink
import fs from "fs"

export const deleteFile = async(filename: string) => {
  try {
    await fs.promises.stat(filename);
  } catch {
    return;
  }

  await fs.promises.unlink(filename);
}