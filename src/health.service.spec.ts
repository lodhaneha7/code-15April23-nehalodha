import { Test,TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { BmiService } from './services/bmi.service';
import * as fs from 'fs';
    
describe('AppService', () => {
    let service: AppService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [AppService,BmiService],
      }).compile();
  
      service = module.get<AppService>(AppService);
    });

    
    describe('calculateHealthParams', () => {
      it('should return a successful response with correct data', async () => {
        const result = await service.calculateHealthParams();
        expect(result.success).toBe(true);
        expect(result.httpCode).toBe(200);
        expect(result.message).toBe("User's health parameters fetched successfully !");
        
        // Check that the output file was written correctly
        const fs = require('fs');
        const outputDataPath = 'src/assets/outputData.json';
        const outputData = fs.readFileSync(outputDataPath);
        const jsonData = JSON.parse(outputData.toString());
        expect(jsonData.totalOverWeightPeopleCount).toBeGreaterThanOrEqual(0);
        expect(jsonData.result).toBeInstanceOf(Array);
        expect(fs.existsSync(outputDataPath)).toBe(true);
      });
      it('should return an error response if unable to process data', async () => {
        const inputDataSource = 'src/assets/inputData.json';
        if(!fs.existsSync(inputDataSource)){
            const result = await service.calculateHealthParams();
            expect(result.success).toBe(false);
            expect(result.httpCode).toBe(500);
            expect(result.message).toBe('Unable to process your data. Please try again later');
            expect(result.errorDetails.message).toBe('Unable to read file');
            throw new Error('File not found');
        }
      });
    });
  });