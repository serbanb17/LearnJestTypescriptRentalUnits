import { RoomModel } from '../src/models';
import { RoomsRepository } from '../src/roomsRepository';
import { RoomsRepositoryV2 } from '../src/roomsRepositoryV2';

describe('test RoomsRepositoryV2.getRooms', () => {
    it('should return all rooms', async () => {
        const expectedResult = [new RoomModel(), new RoomModel()];
        const mockedRoomsRepository = new RoomsRepository();
        jest.spyOn(mockedRoomsRepository, 'getRooms').mockImplementation(callback => callback(null, expectedResult))
        const roomsRepositoryV2 = new RoomsRepositoryV2(mockedRoomsRepository);
        
        const rooms: RoomModel[] = await roomsRepositoryV2.getRooms();
        
        expect(rooms).toBe(expectedResult);
    });
    
    it('should throw exception', async () => {
        const roomsNotToBeReturned = [new RoomModel(), new RoomModel()];
        const mockedRoomsRepository = new RoomsRepository();
        jest.spyOn(mockedRoomsRepository, 'getRooms').mockImplementation(callback => callback('error', roomsNotToBeReturned))
        const roomsRepositoryV2 = new RoomsRepositoryV2(mockedRoomsRepository);
        let errorCaught: boolean = false;
        let theError:any;

        try{
            const rooms: RoomModel[] = await roomsRepositoryV2.getRooms();
        } catch(error){
            errorCaught = true;
            theError = error;
        }

        expect(errorCaught).toBe(true);
        expect((theError as Error).message).toEqual('error');
    });
});

describe('test RoomsRepositoryV2.checkAvailability', () => {
    it('should return available', async () => {
        const mockedRoomsRepository = new RoomsRepository();
        jest.spyOn(mockedRoomsRepository, 'checkAvailability').mockImplementation((roomId, days, callback) => callback(null, true));
        const roomsRepositoryV2 = new RoomsRepositoryV2(mockedRoomsRepository);
        
        const available: boolean = await roomsRepositoryV2.checkAvailability('xyz', [new Date(), new Date()]);
        
        expect(available).toBe(true);
    });
    
    it('should throw exception', async () => {
        const mockedRoomsRepository = new RoomsRepository();
        jest.spyOn(mockedRoomsRepository, 'checkAvailability').mockImplementation((roomId, days, callback) => callback('error'));
        const roomsRepositoryV2 = new RoomsRepositoryV2(mockedRoomsRepository);
        let errorCaught: boolean = false;
        let theError:any;

        try{
            const available: boolean = await roomsRepositoryV2.checkAvailability('xyz', [new Date(), new Date()]);
        } catch(error){
            errorCaught = true;
            theError = error;
        }

        expect(errorCaught).toBe(true);
        expect((theError as Error).message).toEqual('error');
    });
});

describe('test RoomsRepositoryV2.rent', () => {
    it('should not throw exception', async () => {
        const mockedRoomsRepository = new RoomsRepository();
        jest.spyOn(mockedRoomsRepository, 'rent').mockImplementation((roomId, days, callback) => callback(null, true));
        const roomsRepositoryV2 = new RoomsRepositoryV2(mockedRoomsRepository);
        let errorCaught: boolean = false;

        try{
            await roomsRepositoryV2.rent('xyz', [new Date(), new Date()]);
        } catch(error){
            errorCaught = true;
        }

        expect(errorCaught).toBe(false);
    });
    
    it('should throw exception', async () => {
        const mockedRoomsRepository = new RoomsRepository();
        jest.spyOn(mockedRoomsRepository, 'rent').mockImplementation((roomId, days, callback) => callback('error', true));
        const roomsRepositoryV2 = new RoomsRepositoryV2(mockedRoomsRepository);
        let errorCaught: boolean = false;
        let theError:any;

        try{
            await roomsRepositoryV2.rent('xyz', [new Date(), new Date()]);
        } catch(error){
            errorCaught = true;
            theError = error;
        }

        expect(errorCaught).toBe(true);
        expect((theError as Error).message).toEqual('error');
    });
});