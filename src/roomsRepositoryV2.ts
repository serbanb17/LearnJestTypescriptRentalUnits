import { RoomModel } from "./models";
import { RoomsRepository } from "./roomsRepository";

export class RoomsRepositoryV2 {
    readonly oldRepo: RoomsRepository;

    constructor(legacyRoomsRepository: RoomsRepository) {
        this.oldRepo = legacyRoomsRepository;
    }

    public getRooms(): Promise<RoomModel[]> {
        return new Promise<RoomModel[]>((resolve, reject) => {
            this.oldRepo.getRooms((error, rooms) => {
                if(error === null)
                    resolve(rooms);
                else
                    reject(new Error(error));
            });
        });
    }

    public checkAvailability(roomId: string, days: Date[]): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.oldRepo.checkAvailability(roomId, days, (error, isAvailable) => {
                if(error === null)
                    resolve(isAvailable);
                else
                    reject(new Error(error));
            });
        });
    }

    public rent(roomId: string, days: Date[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.oldRepo.rent(roomId, days, (error, result) => {
                if(error === null)
                    resolve();
                else
                    reject(new Error(error));
            });
        });
    }
}