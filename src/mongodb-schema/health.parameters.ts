import * as mongoose from 'mongoose';

export const HealthParametersSchema = new mongoose.Schema({
      gender: {
       type:String,
       required:true,
     },
     heightCm: {
      type:Number,
      required:true,
    },
    weightKg: {
      type:Number,
      required:true,
    },
    bmi: {
      type:Number,
      required:true,
      default:0,
    },
    bmiCategory: {
      type:String,
      required:true,
      default:"",
    },
    healthRisk: {
      type:String,
      required:true,
      default:"",
    },
      
}, 
{ timestamps: true })


//HealthParametersSchema.index({ "heightCm": 1 });
//HealthParametersSchema.index({ "weightKg": 1 });

export interface HealthParametersSchemaModel extends mongoose.Document {
      gender: string,
      heightCm: number,
      weightKg:number,
      bmi: number,
      bmiCategory: string,
      healthRisk: string
  }