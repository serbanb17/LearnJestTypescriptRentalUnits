import { RoomModel, RentDayModel } from './models';

export class RoomsRepository {
    private readonly rooms: RoomModel[];
    private readonly rentDays: RentDayModel[];

    constructor() {
        [this.rooms, this.rentDays] = this.getSeedData();
    }

    public getRooms(callback): void {
        callback(null, this.rooms);
    }

    public checkAvailability(roomId: string, days: Date[], callback): void {
        if(this.rooms.filter(r => r.id === roomId).length == 0) 
            return callback(`Room with id ${roomId} does not exist!`);
        if(days.length == 0)
            return callback("No days provided!");

        const daysUnavailable: RentDayModel[] = this.rentDays.filter(rd => rd.roomId === roomId && days.some(d => this.SameDays(rd.date, d)));
        if(daysUnavailable.length > 0) {
            return callback(null, false);
        }

        callback(null, true);
    }

    public rent(roomId: string, days: Date[], callback) {
        this.checkAvailability(roomId, days, (error, isAvailable) => {
            if (error)
                return callback(error);
            if (!isAvailable)
                return callback(`Room with id ${roomId} is not available to rent in the selected days`);

            for(const day of days){
                const newRentDay = new RentDayModel();
                newRentDay.roomId = roomId;
                newRentDay.date = day;
                this.rentDays.push(newRentDay);
            }
            callback(null);
        });
    }

    private SameDays(date1: Date, date2: Date): boolean {
        return date1.getDay() == date2.getDay() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear();
    }

    private getSeedData(): [RoomModel[], RentDayModel[]] {
        return [[
            new RoomModel({
                id: '7be72eb7-6942-4a4c-86fe-c4f7c9e4aea5',
                singleBeds: 1,
                doubleBeds: 0,
                privateBathroom: false,
                squareMeters: 8,
                location: 'Hong Kong',
                pricePerNight: 1800
            }),
            new RoomModel({
                id: '9aaaaedd-0ea9-43e0-9577-2f0ab419d6d1',
                singleBeds: 0,
                doubleBeds: 1,
                privateBathroom: true,
                squareMeters: 12,
                location: 'Paris',
                pricePerNight: 2200
            }),
            new RoomModel({
                id: 'd9f174ae-08c0-444a-8b2a-c9e13726cc30',
                singleBeds: 1,
                doubleBeds: 1,
                privateBathroom: true,
                squareMeters: 15,
                location: 'Barcelona',
                pricePerNight: 2800
            }),
        ], [
            new RentDayModel({
                roomId: '7be72eb7-6942-4a4c-86fe-c4f7c9e4aea5',
                date: new Date(2022,2,15)
            }), new RentDayModel({
                roomId: '7be72eb7-6942-4a4c-86fe-c4f7c9e4aea5',
                date: new Date(2022,2,16)
            }), new RentDayModel({
                roomId: '7be72eb7-6942-4a4c-86fe-c4f7c9e4aea5',
                date: new Date(2022,2,17)
            }), new RentDayModel({
                roomId: '7be72eb7-6942-4a4c-86fe-c4f7c9e4aea5',
                date: new Date(2022,4,20)
            }), new RentDayModel({
                roomId: '7be72eb7-6942-4a4c-86fe-c4f7c9e4aea5',
                date: new Date(2022,4,21)
            }), new RentDayModel({
                roomId: '7be72eb7-6942-4a4c-86fe-c4f7c9e4aea5',
                date: new Date(2022,4,22)
            }),
            new RentDayModel({
                roomId: '9aaaaedd-0ea9-43e0-9577-2f0ab419d6d1',
                date: new Date(2022,2,7)
            }), new RentDayModel({
                roomId: '9aaaaedd-0ea9-43e0-9577-2f0ab419d6d1',
                date: new Date(2022,2,8)
            }), new RentDayModel({
                roomId: '9aaaaedd-0ea9-43e0-9577-2f0ab419d6d1',
                date: new Date(2022,2,9)
            }), new RentDayModel({
                roomId: '9aaaaedd-0ea9-43e0-9577-2f0ab419d6d1',
                date: new Date(2022,3,12)
            }), new RentDayModel({
                roomId: '9aaaaedd-0ea9-43e0-9577-2f0ab419d6d1',
                date: new Date(2022,3,13)
            }),
            new RentDayModel({
                roomId: '9aaaaedd-0ea9-43e0-9577-2f0ab419d6d1',
                date: new Date(2022,3,1)
            }), new RentDayModel({
                roomId: '9aaaaedd-0ea9-43e0-9577-2f0ab419d6d1',
                date: new Date(2022,3,2)
            }), new RentDayModel({
                roomId: '9aaaaedd-0ea9-43e0-9577-2f0ab419d6d1',
                date: new Date(2022,4,9)
            }), new RentDayModel({
                roomId: '9aaaaedd-0ea9-43e0-9577-2f0ab419d6d1',
                date: new Date(2022,3,10)
            }),
        ]];
    }
}