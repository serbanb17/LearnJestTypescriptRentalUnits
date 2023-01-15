class RoomModel {
    public id: string;
    public singleBeds: number;
    public doubleBeds: number;
    public privateBathroom: boolean;
    public squareMeters: number;
    public location: string;
    public pricePerNight: number;

    public constructor(init?:Partial<RoomModel>) {
        Object.assign(this, init);
    }
}

class RentDayModel {
    public roomId: string;
    public date: Date;

    public constructor(init?:Partial<RentDayModel>) {
        Object.assign(this, init);
    }
}

export { RoomModel, RentDayModel }