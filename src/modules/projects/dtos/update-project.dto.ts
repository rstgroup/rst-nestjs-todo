import { IsNotEmpty, Length } from 'class-validator';

export class UpdateProjectDto {
  @IsNotEmpty()
  @Length(3, 100)
  readonly name: string;
}
