import { validate } from "class-validator";
import { ValidationSchema } from './ValidationSchema';
import { forEach, pick} from 'lodash';

async function ValidationProcessor(accountReqObj:any): Promise<any>{
       let validProductData = new ValidationSchema(accountReqObj);
       let validationResults =  await validate(validProductData);
       let constraints =[]
       if(validationResults &&  validationResults.length > 0 ){
             forEach(validationResults, (item)=>{
                 constraints.push(pick(item, 'constraints', 'property'));
             });
       }

       return constraints;
}





export {ValidationProcessor}