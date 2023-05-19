import { createSlice } from "@reduxjs/toolkit";
import { ToastContainer, toast } from 'react-toastify';

const initialCartState = {
  cartItems:  [
    {
      img:"https://ae04.alicdn.com/kf/H4e051f4388c746978cb06c028ceb4b4eX.jpg_480x480Q90.webp",
    title:"The New KAYOU Naruto Card The Chapter of Soldiers Naruto Bronzing Inheritance Collection BP Card Children's Gift Collection Card",
    price:"15.89",
    selectedQuantity:4,
    shippingInfo:[
        {
        type:"UPS",
        price:0,
        from:15,
        to:30
       }
    ],
    },
{
    img:"https://ae01.alicdn.com/kf/Sfcd06ef015224cf59945ec5595a8b2faH/One-Piece-Luffy-Necklace-Stainless-Steel-Colorful-Anime-New-Season-Sun-God-Shape-Tag-Keychain-Pendant.jpg_220x220xz.jpg_.webp",
    title:"One Piece Luffy Necklace Stainless Steel Colorful Anime New Season Sun God Shape Tag Keychain Pendant Accessories",
    price:6.55,
    selectedQuantity:1,
    shippingInfo:[
      {
      type:"UPS",
      price:0,
      from:15,
      to:30
     }
  ],
   },
],
  buySingleItem :[]

};
export const cart_Slice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    // add product to the shopping cart
    setCartItems(state, action){
       state.cartItems = action.payload
    },
    addToCart(state, action) {

      const cartItems = JSON.parse(window.localStorage.getItem("cartItems")) || [];
      if (cartItems.find(item => item.id === action.payload.id
        &&
        item.selectedColor === action.payload.selectedColor
        &&
        item.selectedSize === action.payload.selectedSize)) {

        toast.success("Already Shopping Cart!.")

      }



      else {
        toast.success("A new item has been added to your Shopping Cart.")

        cartItems.push({

          id: action.payload.id,
          shippingInfo:action.payload.shippingInfo,
          selectedColor: action.payload.selectedColor,
          selectedQuantity: action.payload.selectedQuantity,
          selectedSize: action.payload.selectedSize,
          price: parseFloat(action.payload.price),
          subtotal: parseFloat(action.payload.price) * action.payload.selectedQuantity,

        })
        state.cartItems = cartItems
        window.localStorage.setItem("cartItems", JSON.stringify(cartItems))
      }

    },

    // remove product to the shopping cart
    removeFromCart(state, product) {
      const cartItems = JSON.parse(window.localStorage.getItem("cartItems"));

      state.cartItems = cartItems.filter((x, index) => index !== product.payload) 
      window.localStorage.setItem("cartItems", JSON.stringify(state.cartItems))


    },
    // addition quantity or subtract quantity
    subtractQuantity(state, action) {
      const cartItems = JSON.parse(window.localStorage.getItem("cartItems"));
      cartItems.map((item, index) => {
        if (index === action.payload) {
          if (item.selectedQuantity > 1) {
            item.selectedQuantity -= 1
            item.subtotal -= item.price
          }
        }
        state.cartItems = cartItems
        window.localStorage.setItem("cartItems", JSON.stringify(cartItems))
      })
    },

    addQuantity(state, action) {
      const cartItems = JSON.parse(window.localStorage.getItem("cartItems"));
      cartItems.map((item, index) => {
        if (index === action.payload) {
          if (item.selectedQuantity < 5) {
            item.selectedQuantity += 1
            item.subtotal += item.price
            item.price = item.price
          }
        }
        state.cartItems = cartItems
        window.localStorage.setItem("cartItems", JSON.stringify(cartItems))
      })
    },


    buyNowItem(state, action) {
      
      state.cartItems = [{
        id: action.payload.id,
        shippingInfo:action.payload.shippingInfo,
        selectedColor: action.payload.selectedColor,
        selectedQuantity: action.payload.selectedQuantity,
        selectedSize: action.payload.selectedSize,
        price: parseFloat(action.payload.price),
        subtotal: parseFloat(action.payload.price) * action.payload.selectedQuantity,
      }]
      
      window.localStorage.setItem("cartItems", JSON.stringify(state.cartItems))





    },
  },

})
export const { removeFromCart, addQuantity, addToCart,setCartItems, buyNowItem, subtractQuantity } = cart_Slice.actions
export default cart_Slice.reducer