import { Category } from '../../entities/Category'
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository'
import { getRepository, Repository} from 'typeorm'

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  // Listando as minhas categories
  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    // Select * from categories where name === "name" | limit 1
    // Select foi escrito como: { name } 
    const category = await this.repository.findOne({ name })
    return category
  }
}

export { CategoriesRepository }