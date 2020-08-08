import { IsEmail, Length ,IsAlphanumeric, IsAlpha, MinLength, MaxLength, IsNotEmpty, ValidateNested} from "class-validator";


export class ValidationSchema  {
    
     @IsAlphanumeric()
     name: string;     
     
    constructor(model:any){
      this.name=model.name;
    }
}

// export class Description{
    
//     @IsNotEmpty()
//     @Length(2, 15)
//     lang:string;

//     @MinLength(2,{message:"value is too Short"})
//     @MaxLength(500,{message:"Value is too long"})
//     val: string;

// }

// export class Brand{
//     id:number;
//     name:string;
// }

// export class Shipping{
//     dimensions:{
//         height:number,
//         length:number,
//         width:number
//     };
//     weight:number
// }

// export class Attrs{
//     name:string;
//     value:string
// }