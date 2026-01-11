export class Car {
    private id: string;
    private licensePlate: string; //placa
    private available: boolean; //disponibilidade

    constructor(id:string, licensePlate:string, available:boolean) {
        this.id = id;
        this.licensePlate = licensePlate;
        this.available = available;
    }

    public isAvailable(): boolean {  //retorna a disponibilidade
        return this.available;
    }

    public markAsUnavailable(): void { //retorna como não disponível
        this.available = false;
    }

    public markAsAvailable(): void { //retorna como disponível
        this.available = true;
    }
}