import mongoose from 'mongoose'


export const DB = async (url) => {
  try{
    await mongoose.connect(url)
    console.log('database connected')
  }
  catch(error){
    console.log("DB error", error)
  }
};