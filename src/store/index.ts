import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { searchReducer } from './searchReducer';

const rootReducer = combineReducers({
    searchReducer,
});

const middleWares = applyMiddleware(thunk);

export const store = createStore(rootReducer, middleWares);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;