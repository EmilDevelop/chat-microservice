import { DatabaseClientRepositoryInterface } from "src/domain/repository/clientsRepository.interface";

export class CreateClientUsecase {
  constructor(
    private readonly clientRepository: DatabaseClientRepositoryInterface
  ) {}

  async execute() {
    return await this.clientRepository.create();
  }
}
