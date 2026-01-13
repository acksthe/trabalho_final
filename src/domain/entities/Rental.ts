export class Rental {
    constructor(private id: string,
                private userId: string,
                private carId: string,
                private startDate: Date,
                private expectedReturnDate: Date,
                private endDate: Date | null,
                private total: number | null
                ){}

    getId(): string {
        return this.id;
    }

    getUserId(): string {
        return this.userId;
    }

    getCarId(): string {
        return this.carId;
    }

    getStartDate(): Date {
        return this.startDate;
    }

    getExpectedReturnDate(): Date {
        return this.expectedReturnDate;
    }

    getEndDate(): Date | null {
        return this.endDate;
    }

    getTotal(): number | null {
        return this.total;
    }

    isOpen(): boolean {
        return this.endDate === null;
    }

    close(endDate: Date = new Date(), total?: number): void {
        if (!this.isOpen()) throw new Error("Aluguel já está fechado!");
        this.endDate = endDate;
        if (total !== undefined) this.total = total;
    }
}