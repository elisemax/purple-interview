import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/useHttp";

export type convertType = {
    amount: string;
    from: string;
    to: string;
};

export type currencyStatusType = {
    popularCurrency: string;
    totalNumberOfConversions: number;
    totalAmount: number;
};
export type converterType = {
    value: convertType;
    status: string;
    convertedValue: number;
    listCurrency: {
        name: string
    }[];
    currencyStatus: currencyStatusType;
};

export const initialState = {
    value: {
        amount: "0",
        from: "USD",
        to: "EUR",
    },
    status: "idle",
    listCurrency: [{name: "USD"}, {name: "EUR"}],
    currencyStatus: {
        popularCurrency: "USD",
        totalNumberOfConversions: 100,
        totalAmount: 1000,
    },
    convertedValue: 0,
};

export const fetchConvert = createAsyncThunk(
    "converter/fetchConvert",
    async (convert:convertType) => {
        const { request } = useHttp();
        const response = await request("http://localhost:8000/api/converter/convert", "POST", 
            JSON.stringify(convert));
        return response;
    }
);

export const fetchCurrencyStatus = createAsyncThunk(
    "converter/fetchCurrencyStatus",
    async () => {
        const { request } = useHttp();
        const response = await request("http://localhost:8000/api/converter/status", "GET");
        return response;
    }
);

export const fetchListCurrency = createAsyncThunk(
    "converter/fetchListCurrency",
    async () => {
        const { request } = useHttp();
        const response = await request("http://localhost:8000/api/converter/listCurrency", "GET");
        return response;
    }
);

const converterSlice = createSlice({
    name: "converter",
    initialState,
    reducers: {
        changeFrom (state, action) {
            state.value.from = action.payload;
        },
        changeTo (state, action) {
            state.value.to = action.payload;
        },
        changeAmount (state, action) {
            state.value.amount = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase("converter/fetchConvert/pending", (state) => {
            state.status = "loading";
        });
        builder.addCase("converter/fetchConvert/fulfilled", (state, {payload}: any ) => {
            state.status = "succeeded";
            state.convertedValue = payload.amount;
        });
        builder.addCase("converter/fetchConvert/rejected", (state) => {
            state.status = "failed";
        });
        builder.addCase("converter/fetchCurrencyStatus/pending", (state) => {
            state.status = "loading";
        });
        builder.addCase("converter/fetchCurrencyStatus/fulfilled", (state, {payload}: any ) => {
            state.status = "succeeded";
            state.currencyStatus = payload;
        });
        builder.addCase("converter/fetchCurrencyStatus/rejected", (state) => {
            state.status = "failed";
        });
        builder.addCase("converter/fetchListCurrency/pending", (state) => {
            state.status = "loading";
        });
        builder.addCase("converter/fetchListCurrency/fulfilled", (state, {payload}: any ) => {
            state.status = "succeeded";
            const list = Object.keys(payload.currencies);
            state.listCurrency = list.map((item) => {
                return {name: item}
            });
        });
        builder.addCase("converter/fetchListCurrency/rejected", (state) => {
            state.status = "failed";
        });
        builder.addDefaultCase(() => {})
    }
});

export const { changeAmount, changeFrom, changeTo } = converterSlice.actions;

export default converterSlice.reducer;