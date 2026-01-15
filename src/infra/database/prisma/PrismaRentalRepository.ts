import { injectable } from "inversify";

import { Rental } from "../../../domain/entities/Rental";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
import { prisma } from "./client";

/**
 * Implementação do repositório de alugueis usando Prisma + SQLite
 * Responsável por persistir e recuperar dados de aluguel do banco
 */

@injectable()
export class PrismaRentalRepository implements IRentalRepository {
    async create(rental: Rental): Promise<void> {
        await prisma.rental.create({
            data: {
                id: rental.getId(),
                userId: rental.getUserId(),
                carId: rental.getCarId(),
                startDate: rental.getStartDate(),
                expectedReturnDate: rental.getExpectedReturnDate(),
                endDate: rental.getEndDate(),
                total: rental.getTotal(),
            },
        });
    }

    async findOpenRentalByCarId(carId: string): Promise<Rental | null> {
        const rental = await prisma.rental.findFirst({
            where: {
                carId,
                endDate: null,
            },
        });

        if (!rental) return null;

        return new Rental(
            rental.id,
            rental.userId,
            rental.carId,
            rental.startDate,
            rental.expectedReturnDate,
            rental.endDate,
            rental.total
        );
    }

    async findOpenRentalByUserId(userId: string): Promise<Rental | null> {
        const rental = await prisma.rental.findFirst({
            where: {
                userId,
                endDate: null,
            },
        });

        if (!rental) return null;

        return new Rental(
            rental.id,
            rental.userId,
            rental.carId,
            rental.startDate,
            rental.expectedReturnDate,
            rental.endDate,
            rental.total
        );
    }

    async findById(id: string): Promise<Rental | null> {
        const rental = await prisma.rental.findUnique({
            where: { id },
        });

        if (!rental) return null;

        return new Rental(
            rental.id,
            rental.userId,
            rental.carId,
            rental.startDate,
            rental.expectedReturnDate,
            rental.endDate,
            rental.total
        );
    }

    async update(rental: Rental): Promise<void> {
        await prisma.rental.update({
            where: { id: rental.getId() },
            data: {
                endDate: rental.getEndDate(),
                total: rental.getTotal(),
            },
        });
    }
}