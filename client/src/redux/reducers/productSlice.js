import { createSlice } from '@reduxjs/toolkit'
import { AllProducts } from '../../data'


const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    images: [],
    curIndex: 0,
    slideIndex: 0,
    productId: 0,
    product: [],
    quantity: 0
  },

  // productSlice
  reducers: {
    getProducts: (state, action) => {
      console.log(state)
    },
    changeImage: (state, action) => {
      // CHANGE PREVIEW IMG ON CLICK
      state.curIndex = action.payload
    },
    prevPreview: (state, action) => {
      if (state.curIndex < 1) {
        state.curIndex = 0
      } else {
        state.curIndex -= 1
      }
    },
    nextPreview: (state, action) => {
      if (state.curIndex > (state.images.length - 2)) {
        state.curIndex = state.images.length - 1
      } else {
        state.curIndex += 1
      }
    },
    prevSlide: (state, action) => {
      if (state.slideIndex < 1) {
        state.slideIndex = 0
      } else {
        state.slideIndex -= 1
      }
    },
    nextSlide: (state, action) => {
      if (state.slideIndex > (state.images.length - 2)) {
        state.slideIndex = state.images.length - 1
      } else if ((state.slideIndex > (state.images.length - 3) && window.innerWidth > 640)) {
        state.slideIndex = state.images.length - 2
      }
      else {
        state.slideIndex += 1
      }
    },
    getProductItem: (state, action) => {
      state.productId = action.payload
      state.images = AllProducts[action.payload - 1].img
      state.product = AllProducts[action.payload - 1]
    }
  }
}
)

export const { getProducts, changeImage, prevPreview, nextPreview, prevSlide, nextSlide, getProductItem } = productSlice.actions;
export default productSlice.reducer;