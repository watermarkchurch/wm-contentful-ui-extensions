import { combineReducers, configureStore } from '@reduxjs/toolkit'
import isEqual from 'lodash/isEqual'
import { useDispatch, useSelector } from 'react-redux'

const rootReducer = combineReducers({})

const store = configureStore({
  reducer: rootReducer,
})
export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type AppSelector<TSelected = unknown> = (state: RootState) => TSelected
/**
 * A hook to access the redux store's state. This hook takes a selector function
 * as an argument. The selector is called with the store state.
 * @see useSelector
 * @param selector the selector function
 * @param equalityFn the function that will be used to determine equality.
 *   Defaults to lodash/isEqual for a deep comparison, override to perform
 *   shallow comparison.
 */
export const useAppSelector = <TSelected = unknown>(
  selector: AppSelector<TSelected>,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => useSelector(selector, equalityFn || isEqual)
