import { Car } from "../../../domain/entities/Car";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { prisma } from "./client";

/**
 * Implementação do repositório de Car usando Prisma + SQLite
 * Converte dados do Prisma para a Entidade do domínio e vice-versa
 */

export class PrismaCarRepository implements ICarRepository {
    async create(car: Car): Promise<void> {
        await prisma.car.create({
            data: {
                id: car.getId(),
                licensePlate: car.getLicensePlate(),
                available: car.isAvailable(),
            },
        });
    }

    async findByID(id: string): Promise<Car | null> {
        const car = await prisma.car.findUnique({ where: { id } });
        if (!car) return null;

        return new Car(car.id, car.licensePlate, car.available);
    }

    async findByLicensePlate(licensePlate: string): Promise<Car | null> {
        const car = await prisma.car.findUnique({ where: { licensePlate } });
        if (!car) return null;

        return new Car(car.id, car.licensePlate, car.available);
    }

    async save(car: Car): Promise<void> {
        await prisma.car.update({
            where: { id: car.getId() },
            data: {
                licensePlate: car.getLicensePlate(),
                available: car.isAvailable(),
            },
        });
    }
}