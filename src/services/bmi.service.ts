import { Injectable } from '@nestjs/common';

@Injectable()
export class BmiService {
    constructor() {};
    
  public calculateHealthParamerters(weight: number, height: number): IHealthParameters {
    try{
        const bmi:number = weight / ((height / 100) ** 2)
        const bmiCategories: Array<IBMICategoryData> = [
            { category: 'Underweight', range: [0, 18.4], risk: 'Malnutrition risk' },
            { category: 'Normal weight', range: [18.5, 24.9], risk: 'Low risk' },
            { category: 'Overweight', range: [25, 29.9], risk: 'Enhanced risk' },
            { category: 'Moderately obese', range: [30, 34.9], risk: 'Medium risk' },
            { category: 'Severely obese', range: [35, 39.9], risk: 'High risk' },
            { category: 'Very severely obese', range: [40, Infinity], risk: 'Very high risk' },
          ];
            const roundedBmi  =  Math.round(bmi * 100) / 100;
            const {category, risk } = bmiCategories.find((data) => roundedBmi >= data.range[0] && roundedBmi <= data.range[1]);
            const healthParams = {
                bmi : roundedBmi,
                bmiCategory :category,
                healthRisk: risk
            }
            return healthParams;
          
    }catch(error){
        console.log('Get Weight Category',error);
     }
  }
}


 interface IBMICategoryData {
    category: string;
    range: [number, number];
    risk: string;
  }

   interface IHealthParameters {
    bmi:number;
    bmiCategory: string;
    healthRisk: string;
  }