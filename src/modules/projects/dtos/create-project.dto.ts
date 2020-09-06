import { IsNotEmpty, Length } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @Length(3, 100)
  readonly name: string;
}
