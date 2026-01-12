import { Car } from "../../../domain/entities/Car";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";

/**
 * Implementação em memória do repositório de carros
 *
 * Essa classe é utilizada para testes e simulações,
 * permitindo validar o comportamento relacionado aos carros
 * sem a necessidade de um banco de dados real, já que os dados
 * são armazenados temporariamente em memória
 * e são descartados no final da execução
 */

export class InMemoryCarRepository implements ICarRepository {
    private cars: Car[] = [];

    async create(car: Car): Promise<void> {
        this.cars.push(car);
    }

    async findByID(id: string): Promise<Car | null> {
        const car = this.cars.find((car) => car.getId() === id);
        return car ?? null;
    }

    async findByLicensePlate(licensePlate: string): Promise<Car | null> {
        const car = this.cars.find((car) => {
            return (car as any).licensePlate === licensePlate;
        });

        return car ?? null;
    }

    async save(car: Car): Promise<void> {
        const index = this.cars.findIndex((c) => (c as any).id === (car as any).id);

        if (index !== -1) {
            this.cars[index] = car;
        }
    }
}