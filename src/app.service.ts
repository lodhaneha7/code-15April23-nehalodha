import { HttpStatus, Injectable, forwardRef, Inject } from '@nestjs/common';
import { IResponseHandlerParams } from './interface/response.handler.interface';
import { ResponseHandlerService } from './services/response.handler.service';
import * as fs from 'fs';
import { BmiService } from './services/bmi.service';
import { promisify } from 'util';
import { cpus } from 'os';

@Injectable()
export class AppService {
   private readFileAsync = promisify(fs.readFile);
   private writeFileAsync = promisify(fs.writeFile);

  constructor(
     @Inject(forwardRef(() => BmiService))
  private bmiService: BmiService,) {}

 private async processUserData(userData): Promise<IBMIHealthParameters> {
    const parameters = this.bmiService.calculateHealthParamerters(userData.WeightKg, userData.HeightCm);
    return {
      gender: userData.Gender,
      heightCm: userData.HeightCm,
      weightKg: userData.WeightKg,
      bmi: parameters.bmi,
      bmiCategory: parameters.bmiCategory,
      healthRisk: parameters.healthRisk,
    };
  }
  
public async calculateHealthParams(): Promise<IResponseHandlerParams>{
    const startDate = new Date();
    const startTime = startDate.getTime();
    const inputDataSource = 'src/assets/inputData.json';
    const outputDataPath = 'src/assets/outputData.json';
    const OVERWEIGHT_CATEGORY = 'Overweight';
    try{
     
      const inputData = await this.readFileAsync(inputDataSource);
      const data = JSON.parse(inputData.toString()) as Array<IUserData>;
    
      const cpuCount = cpus().length;
      const chunkSize = Math.ceil(data.length / cpuCount);
  
      // Divide the data into small chunks to be processed in parallel
      const chunks = Array.from({ length: cpuCount }, (_, i) => {
        const start = i * chunkSize;
        const end = start + chunkSize;
        return data.slice(start, end);
      });

    // Process each chunk in parallel
    const results = await Promise.all(
      chunks.map(async (chunk) => {data
        const chunkResults = await Promise.all(chunk.map((data)=>this.processUserData(data)));
        const chunkOverweightCount = chunkResults.filter((result) => result.bmiCategory === OVERWEIGHT_CATEGORY).length;
        return {
          totalOverWeightPeopleCount: chunkOverweightCount,
          result: chunkResults,
        };
      })
    );
      // Merge the results from each chunk
      const mergedResults = results.reduce(
        (acc, result) => ({
          totalOverWeightPeopleCount: acc.totalOverWeightPeopleCount + result.totalOverWeightPeopleCount,
          result: acc.result.concat(result.result),
        }),
        { totalOverWeightPeopleCount: 0, result: [] }
      );
    await this.writeFileAsync(outputDataPath, JSON.stringify(mergedResults));

    const endDate = new Date();
    const endTime = endDate.getTime();
    const executionTime = endTime - startTime;
    
    console.log(`Total Number of Records: ${data.length}`);
    console.log(`Execution time: ${executionTime} milliseconds`);
    console.log(`Output file : 'src/assets/outputData.json' `)

      return ResponseHandlerService({
        success: true,
        httpCode: HttpStatus.OK,
        message: "User's health parameters fetched successfully !",
      });
     
    }catch(error){
      console.log('Caught error:', error);
      return ResponseHandlerService({
        success: false,
        httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Unable to process your data. Please try again later',
        errorDetails: {
          message: error.message,
          stack: error.stack
        }
      });
    } 
  }
}



 interface IUserData{
  Gender: string,
  HeightCm: number,
  WeightKg: number
}

interface IBMIHealthParameters{
    gender: string,
    heightCm: number,
    weightKg: number,
    bmi: number,
    bmiCategory: string,
    healthRisk: string,
}