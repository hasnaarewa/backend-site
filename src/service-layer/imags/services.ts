
const path=require('path')
const Jimp=require('jimp')


export const Processing={
    uploadImage: async (image, userid,id) => {
        const t = 
         { path:path.resolve(__dirname, '../../../public/markteplaces/'+userid+"/", `${id}.jpeg`)}
       
        const isreaded = await Jimp.read(image.buffer);
    
        let iswrited = await isreaded
        .resize(Jimp.AUTO,200) // resize
        .quality(100) // set JPEG quality
  
        .writeAsync(t.path)
        if(iswrited){
          return true
        }
        else{
            throw new Error('error')
        }
    },
    uploadImageCategory: async (image, id,idmarketplace,name) => {
        const t = 
         { path:path.resolve(__dirname, `../../../public/markteplaces/${idmarketplace}/category/${name}/`, `${id}.jpeg`)}
       
        const isreaded = await Jimp.read(image.buffer);
    
        let iswrited = await isreaded
        .resize(Jimp.AUTO,200) // resize
        .quality(100) // set JPEG quality
  
        .writeAsync(t.path)
        if(iswrited){
          return true
        }
        else{
            throw new Error('error')
        }
    },
    uploadImageProduct: async (image, id,idmarketplace,name) => {
        const t = 
         { path:path.resolve(__dirname, `../../../public/markteplaces/${idmarketplace}/category/${name}/products/`, `${id}.jpeg`)}
       
        const isreaded = await Jimp.read(image.buffer);
    
        let iswrited = await isreaded
        .resize(Jimp.AUTO,200) // resize
        .quality(100) // set JPEG quality
  
        .writeAsync(t.path)
        if(iswrited){
          return true
        }
        else{
            throw new Error('error')
        }
    }
}