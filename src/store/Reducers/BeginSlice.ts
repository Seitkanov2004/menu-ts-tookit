import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMenu } from "../../types/IMenu";

interface IBegin {
  loader: boolean;
  error: string;
  file: any;
  menu: IMenu[];
  dark: boolean;
  order: IMenu[];
}

const initialState: IBegin = {
  loader: false,
  error: "",
  file: null,
  menu: [],
  dark: false,
  order: [],
};

export const BeginSlice = createSlice({
  name: "BEGIN",
  initialState,
  reducers: {
    workingLoader(state) {
      state.loader = true;
    },
    workingError(state, { payload }: PayloadAction<string>) {
      state.loader = false;
      state.error = payload;
    },
    postFile(state, { payload }: PayloadAction<any>) {
      state.file = payload;
    },
    workMenu(state, { payload }: PayloadAction<IMenu[]>) {
      state.menu = payload;
      state.loader = false;
      state.error = "";
    },
    workingDark(state, { payload }: PayloadAction<boolean>) {
      state.dark = payload;
    },
    workOrder(state, { payload }: PayloadAction<IMenu[]>) {
      state.order = payload;
      state.error = "";
    },
    nextQuantity(state, { payload }: PayloadAction<number>) {
      if(state.order.find((el) => el.id === payload)){
        state.order.find((el) => el.quantity++)
      }
    },
    prevQuantity(state, {payload}: PayloadAction<number>){
        if(state.order.find((el) => el.id === payload)){
            if(state.order.find((el) => el.quantity === 1)){
                state.order.find((el) => el.quantity = 1)
            }else{
                state.order.find((el) => el.quantity--)
            }
        }
    },
    
  },
});

export const {
  postFile,
  workingError,
  workingLoader,
  workMenu,
  workingDark,
  workOrder,
  nextQuantity,
  prevQuantity
} = BeginSlice.actions;
export default BeginSlice.reducer;
