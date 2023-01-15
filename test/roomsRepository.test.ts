// https://jestjs.io/docs/getting-started
// https://itnext.io/testing-with-jest-in-typescript-cc1cd0095421

import { RoomModel } from '../src/models';
import { RoomsRepository } from '../src/roomsRepository';

describe('test RoomsRepository.getRooms', () => {
    it('should return all rooms', () => {
        const roomsRepository = new RoomsRepository();
        roomsRepository.getRooms((error, rooms) => {
            if(error)
                throw error;
            
            let isArray:boolean = false;
            let areRooms:boolean = false;

            if(Array.isArray(rooms)) {
                isArray = true;
                areRooms = rooms.length > 0 && rooms.every(r => r instanceof RoomModel);
            }

            expect(isArray).toBe(true);
            expect(areRooms).toBe(true);
        });
    });
});

describe('test RoomsRepository.checkAvailability', () => {
    it('should return false when all days are booked', ()=> {
        const roomsRepository = new RoomsRepository();
        const roomId = '7be72eb7-6942-4a4c-86fe-c4f7c9e4aea5';
        const days = [new Date(2022,2,15), new Date(2022,2,16)];

        roomsRepository.checkAvailability(roomId, days, (error, isAvailable) => {
            if(error)
                throw error;
            expect(isAvailable).toBe(false)
        });
    });
    
    it('should return false when some days are booked', ()=> {
        const roomsRepository = new RoomsRepository();
        const roomId = '7be72eb7-6942-4a4c-86fe-c4f7c9e4aea5';
        const days = [new Date(2022,2,15), new Date(2022,2,16), new Date(2022,2,17), new Date(2022,2,18), new Date(2022,2,19)];

        roomsRepository.checkAvailability(roomId, days, (error, isAvailable) => {
            if(error)
                throw error;
            expect(isAvailable).toBe(false)
        });
    });
    
    it('should return true when all days are free', ()=> {
        const roomsRepository = new RoomsRepository();
        const roomId = '7be72eb7-6942-4a4c-86fe-c4f7c9e4aea5';
        const days = [new Date(2022,2,11), new Date(2022,2,12), new Date(2022,2,13)];

        roomsRepository.checkAvailability(roomId, days, (error, isAvailable) => {
            if(error)
                throw error;
            expect(isAvailable).toBe(true)
        });
    });
    
    it('should return exception room id not found', ()=> {
        const roomsRepository = new RoomsRepository();
        const roomId = '7be72eb7-6942-4a4c-86fe-c4f7c9e4aea6';
        const days = [new Date(2022,2,11), new Date(2022,2,12), new Date(2022,2,13)];

        roomsRepository.checkAvailability(roomId, days, (error, isAvailable) => {
            expect(error).not.toBe(null);
        });
    });
    
    it('should throw exception if days array is empty', ()=> {
        const roomsRepository = new RoomsRepository();
        const roomId = '7be72eb7-6942-4a4c-86fe-c4f7c9e4aea5';
        const days = [];

        roomsRepository.checkAvailability(roomId, days, (error, isAvailable) => {
            expect(error).not.toBe(null);
        });
    });
});

describe('test RoomsRepository.rent', () => {
    it('should not return error if days are not booked', () => {
        const roomsRepository = new RoomsRepository();
        const roomId = '7be72eb7-6942-4a4c-86fe-c4f7c9e4aea5';
        const days = [new Date(2022,2,11), new Date(2022,2,12), new Date(2022,2,13)];

        roomsRepository.rent(roomId, days, (error, data) => {
            expect(error).toBe(null);
        });
    });
    
    it('should return error if any day booked', () => {
        const roomsRepository = new RoomsRepository();
        const roomId = '7be72eb7-6942-4a4c-86fe-c4f7c9e4aea5';
        const days = [new Date(2022,2,11), new Date(2022,2,15)];

        roomsRepository.rent(roomId, days, (error, data) => {
            expect(error).not.toBe(null);
        });
    });
    
    it('should return error room id is not found', () => {
        const roomsRepository = new RoomsRepository();
        const roomId = '7be72eb7-6942-4a4c-86fe-c4f7c9e4aea6';
        const days = [new Date(2022,2,11), new Date(2022,2,15)];

        roomsRepository.rent(roomId, days, (error, data) => {
            expect(error).not.toBe(null);
        });
    });
    
    it('should throw error if days array is empty', () => {
        const roomsRepository = new RoomsRepository();
        const roomId = '7be72eb7-6942-4a4c-86fe-c4f7c9e4aea5';
        const days = [];

        roomsRepository.rent(roomId, days, (error, data) => {
            expect(error).not.toBe(null);
        });
    });
});