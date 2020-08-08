import { IDocument } from "../../data-layer/data-abstracts/repositories/IDocument";

//here we will have getters and setters of productModel

export class AccountModel{
    private _useModel:IDocument;

    constructor(idocument:IDocument){
        this._useModel=idocument;
    }

    get name(): string{
        return (this._useModel.name).toString();
    }


    /**
     * 
     */
    getClientAccountModel(){
        return Object.seal({
    
        })
    }
}