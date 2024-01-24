import axios from "axios";
import fs from 'fs';
import { Item, GildedRose } from '../../app/gilded-rose';
import {makeRequests, updateShopItems} from '../../app/update-shop';

// Mock axios and fs to prevent HTTP requests and file system writes from happening
jest.mock('axios');
jest.mock('fs');
jest.mock('../../app/gilded-rose');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedFs = fs as jest.Mocked<typeof fs>;

describe('update-shop', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should make the correct number of HTTP requests', async () => {
        mockedAxios.get.mockResolvedValue({ data: { answer: 'no' } });
        await makeRequests(5);
        expect(mockedAxios.get).toHaveBeenCalledTimes(5);
    });

    it('should log the number of positive responses', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: { answer: 'yes' } })
            .mockResolvedValueOnce({ data: { answer: 'yes' } })
            .mockResolvedValue({ data: { answer: 'no'}});
        await makeRequests(5);
        console.log(mockedFs.appendFileSync.mock.calls);
        expect(mockedFs.appendFileSync).toHaveBeenCalledWith('log.txt', 'Number of positive responses: 2\n');
        expect(mockedFs.appendFileSync).toHaveBeenCalledWith('log.txt', 'Number of positive responses: 0\n');
    });

    it('updates the shops items the correct amount of times', async () => {
        const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
        const updateQualitySpy = jest.spyOn(gildedRose, 'updateQuality');
        mockedAxios.get.mockResolvedValue({ data: { answer: 'no'} });
        await makeRequests(5);
        updateShopItems(gildedRose, 5);
        expect(updateQualitySpy).toHaveBeenCalledTimes(5);
    });
});