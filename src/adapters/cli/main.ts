import "reflect-metadata";
import { container } from "../../infra/container";
import { TYPES } from "../../infra/container/types";

import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase";
import { ICarRepository } from "../../domain/repositories/ICarRepository";
import { Car } from "../../domain/entities/Car";

async function main() {
    const createRentalUseCase = container.get<CreateRentalUseCase>(TYPES.CreateRentalUseCase);
    const carRepository = container.get<ICarRepository>(TYPES.CarRepository);

    const carId = "car-1";
    const licensePlate = "ABC-1234";

    const existingCar = await carRepository.findByID(carId);

    if (!existingCar) {
        await carRepository.create(new Car(carId, licensePlate, true));
        console.log("Carro criado no banco:", { carId, licensePlate });
    }

    const expectedReturnDate = new Date(Date.now() + 25 * 60 * 60 * 1000);

    const rental = await createRentalUseCase.execute({
        userId: "user-1",
        carId,
        expectedReturnDate,
    });

    console.log("Rental criado:", {
        id: rental.getId(),
        userId: rental.getUserId(),
        carId: rental.getCarId(),
        startDate: rental.getStartDate(),
        expectedReturnDate: rental.getExpectedReturnDate(),
        endDate: rental.getEndDate(),
        total: rental.getTotal(),
    });

    const updatedCar = await carRepository.findByID(carId);
    console.log("Status do carro após aluguel:", {
        carId: updatedCar?.getId(),
        available: updatedCar?.isAvailable(),
    });
}

main().catch((err) => {
    console.error("Erro ao executar CLI:", err);
    process.exit(1);
});