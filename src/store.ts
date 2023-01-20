import { configureStore } from '@reduxjs/toolkit'
import incomeReducer from './features/income-state';
import familyReducer from './features/family-state';
import infrastructureReducer from './features/infrastructure-state';

export const store =  configureStore({
  reducer: {
    income: incomeReducer,
    family: familyReducer,
    infrastructure: infrastructureReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
