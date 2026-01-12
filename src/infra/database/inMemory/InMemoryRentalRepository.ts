import { Rental } from "../../../domain/entities/Rental";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";

/**
 * Implementação em memória do repositório de alugueis
 * 
 * Essa classe é utilizada para testes e simulações,
 * permitindo validar as regras de negócio relacionadas
 * ao processo de aluguel de carros de forma isolada, os dados
 * são mantidos só durante a execução do programa
 */

export class InMemoryRentalRepository implements IRentalRepository {
    private rentals: Rental[] = [];

    async create(rental: Rental): Promise<void> {
        this.rentals.push(rental);
    }

    async findOpenRentalByCarId(carId: string): Promise<Rental | null> {
        const rental = this.rentals.find((rental) => rental.getCarId() === carId && rental.isOpen());
        return rental ?? null;
    }

    async findOpenRentalByUserId(userId: string): Promise<Rental | null> {
        const rental = this.rentals.find((rental) => rental.getUserId() === userId && rental.isOpen());
        return rental ?? null;
    }

    async findById(id: string): Promise<Rental | null> {
        const rental = this.rentals.find((rental) => rental.getId() === id);
        return rental ?? null;
    }

    async update(rental: Rental): Promise<void> {
        const index = this.rentals.findIndex((r) => r.getId() === rental.getId());

        if (index !== -1) {
            this.rentals[index] = rental;
        }
    }
}