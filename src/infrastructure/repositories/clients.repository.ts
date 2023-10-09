import { InjectRepository } from "@nestjs/typeorm";
import { ClientInterface } from "src/domain/interface/client.interface";
import { DatabaseClientRepositoryInterface } from "src/domain/repository/clientsRepository.interface";
import { Repository } from "typeorm";
import { ClientsEntity } from "../entities/clients.entity";
import { randomUUID } from "crypto";

export class DatabaseClientRepository
  implements DatabaseClientRepositoryInterface
{
  constructor(
    @InjectRepository(ClientsEntity)
    private readonly clientEintity: Repository<ClientsEntity>
  ) {}
  async create(): Promise<ClientInterface> {
    const newClient = new ClientsEntity();
    newClient.identificator = randomUUID();

    return await this.clientEintity.save(newClient);
  }
}
