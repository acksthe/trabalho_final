import { PrismaCarRepository } from "../../infra/database/prisma/PrismaCarRepository";
import { PrismaRentalRepository } from "../../infra/database/prisma/PrismaRentalRepository";

import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase";
import { Car } from "../../domain/entities/Car";

async function main() {
    const carRepository = new PrismaCarRepository();
    const rentalRepository = new PrismaRentalRepository();

    const createRentalUseCase = new CreateRentalUseCase(
        rentalRepository,
        carRepository
    );

    //Garantir que tem um carro no banco
    const carId = "car-1";
    const licensePlate = "ABC-1234";

    const existingCar = await carRepository.findByID(carId);

    if (!existingCar) {
        await carRepository.create(new Car(carId, licensePlate, true));
        console.log("Carro criado no banco:", { carId, licensePlate });
    } else {
        console.log("Carro já existia no banco:", {
            carId: existingCar.getId(),
            licensePlate: existingCar.getLicensePlate(),
            available: existingCar.isAvailable(),
        });
    }

    //Criar um aluguel, retorno previsto +25h
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

    //Confirmar que o carro ficou indisponível
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
