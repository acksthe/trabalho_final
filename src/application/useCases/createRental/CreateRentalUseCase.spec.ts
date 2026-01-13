import { describe, it, expect, beforeEach } from "vitest";

import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { Car } from "../../../domain/entities/Car";
import { InMemoryCarRepository } from "../../../infra/database/inMemory/InMemoryCarRepository";
import { InMemoryRentalRepository } from "../../../infra/database/inMemory/InMemoryRentalRepository";

describe("CreateRentalUseCase", () => {
    let rentalRepository: InMemoryRentalRepository;
    let carRepository: InMemoryCarRepository;
    let createRentalUseCase: CreateRentalUseCase;

    beforeEach(() => {
        rentalRepository = new InMemoryRentalRepository();
        carRepository = new InMemoryCarRepository();
        createRentalUseCase = new CreateRentalUseCase(rentalRepository, carRepository);
    }); //criação de repositórios em InMemory, antes de cada teste

    it("deve criar um aluguel com sucesso", async () => {
        const car = new Car("car-1", "ABC-1234", true);
        await carRepository.create(car);

        const expectedReturnDate = new Date(Date.now() + 25 * 60 * 60 * 1000); // +25 horas

        const rental = await createRentalUseCase.execute({
            userId: "user-1",
            carId: "car-1",
            expectedReturnDate,
        });

        expect(rental).toBeTruthy();
        expect(rental.getCarId()).toBe("car-1");
        expect(rental.getUserId()).toBe("user-1");
        expect(rental.isOpen()).toBe(true);
    });

    it("não deve permitir aluguel com menos de 24 horas", async () => {
        const car = new Car("car-1", "ABC-1234", true);
        await carRepository.create(car);

        const expectedReturnDate = new Date(Date.now() + 2 * 60 * 60 * 1000); // +2 horas

        await expect(
            createRentalUseCase.execute({
                userId: "user-1",
                carId: "car-1",
                expectedReturnDate,
            })
        ).rejects.toThrow("Data prevista de retorno deve ser, no mínimo, em 24 horas.");
    });

    it("não deve permitir dois alugueis abertos para o mesmo carro", async () => {
        const car = new Car("car-1", "ABC-1234", true);
        await carRepository.create(car);

        const expectedReturnDate = new Date(Date.now() + 25 * 60 * 60 * 1000);

        await createRentalUseCase.execute({
            userId: "user-1",
            carId: "car-1",
            expectedReturnDate,
        });

        await expect(
            createRentalUseCase.execute({
                userId: "user-2",
                carId: "car-1",
                expectedReturnDate,
            })
        ).rejects.toThrow();
    });

    it("não deve permitir dois alugueis abertos para o mesmo usuário", async () => {
        const car1 = new Car("car-1", "ABC-1234", true);
        const car2 = new Car("car-2", "DEF-5678", true);
        await carRepository.create(car1);
        await carRepository.create(car2);

        const expectedReturnDate = new Date(Date.now() + 25 * 60 * 60 * 1000);

        await createRentalUseCase.execute({ userId: "user-1", carId: "car-1", expectedReturnDate });

        await expect(createRentalUseCase.execute({ userId: "user-1", carId: "car-2", expectedReturnDate })).rejects.toThrow();
    });
});