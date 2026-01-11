import { Car } from "../entities/Car";

export interface ICarRepository {
    create(car: Car): Promise<void>;
    findByID(id: string): Promise<Car | null>;
    findByLicensePlate(licensePlate: string): Promise<Car | null>;
    save(car: Car): Promise<void>;
}