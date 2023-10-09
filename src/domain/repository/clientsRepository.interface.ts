import { ClientInterface } from "../interface/client.interface";

export interface DatabaseClientRepositoryInterface {
  create(): Promise<ClientInterface>;
}
