import { IsNotEmpty, IsOptional } from "class-validator";

export class HealthParamDTO {
    @IsNotEmpty({ message: 'page cannot be empty' })
    page: string;
    @IsNotEmpty({ message: 'limit cannot be empty' })
    limit: string;
  }

