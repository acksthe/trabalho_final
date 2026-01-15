import { injectable, inject } from "inversify";
import { TYPES } from "../../../infra/container/types";

import { Rental } from "../../../domain/entities/Rental";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { CreateRentalDTO } from "./CreateRentalDTO";

import { randomUUID } from "crypto"; // randomUUID: gera um ID aleatório para o aluguel do carro

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject(TYPES.RentalRepository) private rentalRepository: IRentalRepository,
    @inject(TYPES.CarRepository) private carRepository: ICarRepository
  ) {}

  async execute({ userId, carId, expectedReturnDate }: CreateRentalDTO): Promise<Rental> {
    const now = new Date(); // define data e hora atuais como inicio do aluguel
    const diffMs = expectedReturnDate.getTime() - now.getTime(); // diferença entre data de retorno prevista (em milissegundos)
    const diffHours = diffMs / (1000 * 60 * 60); // converte a diferença de milissegundos para horas

    if (diffHours < 24) { //aluguel deve ter duração mínima de 24 horas
      throw new Error("Data prevista de retorno deve ser, no mínimo, em 24 horas.");
    }

    const car = await this.carRepository.findByID(carId); // verifica se o carro existe
    if (!car) {
      throw new Error("Carro não encontrado.");
    }

    if (!car.isAvailable()) {
      throw new Error("Carro indisponível."); // Em caso de carro existir, mas não estar disponível
    }

    const openRentalByCar = await this.rentalRepository.findOpenRentalByCarId(carId); // em caso de carro já alugado (indisponível)
    if (openRentalByCar) {
      throw new Error("Carro já tem um aluguel em aberto");
    }

    const openRentalByUser = await this.rentalRepository.findOpenRentalByUserId(userId); // em caso de usuário já possuir aluguel em aberto
    if (openRentalByUser) {
      throw new Error("Usuário já possui um aluguel em aberto.");
    }

    const rental = new Rental(
      randomUUID(),         // ID único do aluguel gerado aleatorio
      userId,               // ID do usuário
      carId,                // ID do carro
      now,                  // data de início
      expectedReturnDate,   // data de retorno prevista
      null,                 // data de término (null = aluguel em aberto)
      null                  // total do aluguel (não calculado)
    );

    await this.rentalRepository.create(rental);

    car.markAsUnavailable();
    await this.carRepository.save(car);

    return rental;
  }
}