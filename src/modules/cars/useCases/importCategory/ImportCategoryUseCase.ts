// Filesystem
import fs from 'fs';
import { parse as csvParse } from 'csv-parse'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { inject, injectable} from "tsyringe";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
    ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      // Vai esperar a finalização do meu parseFile.on, dps disso temos o .on("end"), que será executa no final do meu parseFile, retornando minhas categories
      parseFile.on('data', async (line) => {
      // ["name", "description"] 0 1
      const [name, description] = line
      categories.push({
        name,
        description,
      });
    })
    .on('end', () => {
      // Responsável por remover os arquivos temporários da aplicação
      fs.promises.unlink(file.path)
      resolve(categories)
    })
    .on('error', (err) => {
      reject(err);
    }); 
  })
}

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    
    categories.map(async (category) => {
      const  { name, description } = category;

      const existCategory = await this.categoriesRepository.findByName(name);

      if (!existCategory) {
        await this.categoriesRepository.create({
          name,
          description,
        })
      }
    })
  }
}

export { ImportCategoryUseCase }