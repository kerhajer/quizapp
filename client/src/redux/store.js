

 import { configureStore } from "@reduxjs/toolkit";
 import resultreducer from './resultSlice';
 import questionsreducer from './questionsSlice';
  const   store=configureStore ({
    reducer:{
      questionsreducer,
      resultreducer,
  }
})
export default store;