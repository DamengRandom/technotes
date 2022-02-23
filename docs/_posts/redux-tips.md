### Redux recalls

#### Understand redux store (learnt from Dan)

```js
// mock a redux store
const mockReduxStore = (reducer) => {
  let state = { counters: 0 }, listeners = [];

  const getState = () => state; // return current latest states
  const dispatch = (action) => {
    state.counters = reducer(state.counters, action); // dispatch send new data to reducer function
    listeners.forEach(listener => listener()); // when states updated, we need to notify every listener we have new state updated !!!!, so we call each of listener and tell them a new state updated result !!
    // console.log('counters value? ', state.counters);
  }

  const subscribe = (listener) => {
    listeners.push(listener); // add new listener into listeners array
    return () => {
      listeners = listeners.filter(l => l !== listener); // remove listener to current listeners array (also called: unsubscribe listener)
    }
  }
  // listeners are used to tracking changes, when changes are requested by dispatch function, list

  dispatch({}); // we want to make initial state populated !!!!

  return { getState, dispatch, subscribe };
};

var store = mockReduxStore(counterReducer);

export default store;
// reference: https://egghead.io/lessons/react-redux-store-methods-getstate-dispatch-and-subscribe
```



#### For simple Redux flow recall

Please check codebase <a href="https://github.com/DamengRandom/react-redux-typescipt">react-redux-typescipt</a> ~~ (For year 2021)



#### How to implement Redux Saga (Basic workflow for recall only !!)

```js
// Step 1: create store and connect to the app
// middleware initial
const sagaMiddleware = createSagaMiddleware();
// store
const store = compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension && window.devToolsExtension(),
)(createStore)(rootReducer);
// run sagas
sagaMiddleware.run(rootSaga);

// Step 2: Write Saga functions (API caller + Saga caller)
function getUsersAPICall() {
  return fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.json())
    .catch(err => { throw err });
}

function* fetchUsers() {
  try {
    const users = yield call(getUsersAPICall);
    yield put({ type: GET_USERS_SUCCESS, users });
  } catch (error) {
    yield put({ type: GET_USERS_FAILED, message: error.message });
  }
}

export default function* usersSaga() {
  yield takeEvery(GET_USERS_REQUESTED, fetchUsers);
}

// Step 3: write reducer function
const initialState = {
  users: [],
  loading: false,
  error: null,
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.users
      }
    default:
      return state;
  }
};

// Step 4: write action function

export function getUsersAction(users) {
  return {
    type: GET_USERS_REQUESTED,
    payload: users,
  }
};

// Step 5: Implement for UI component

export default function User() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const loading = useSelector(state => state.users.loading);
  const error = useSelector(state => state.users.error);

  useEffect(() => {
    dispatch(getUsersAction());
  }, []);

  return (
    <div>
      {loading && <p>Loading ...</p>}
      {error && !loading && <p>{error}</p>}
      {users && users.length > 0 && !loading && users.map(
        (user, index) => <Card key={`user-${index}`} user={user} />)}
      {users && !loading && users.length === 0 && <p>No users yet ..</p>}
    </div>
  )
}

// For the complete code details, please check codebase: "redux-redux-saga-recall-2021"
```


#### Redux-Thunk workflow example

```js
// store setup

export const store = createStore(
  combineReducers({
    rates: ratesReducer,
  }),
  applyMiddleware(thunk),
);

// reducers

const initialState = {
  amount: '10',
  currencyCode: 'USD',
  currencyData: { USD: 1.0 },
};

export function ratesReducer(state = initialState, action) {
  switch(action.type) {
    case RATES_AMOUNT_CHANGED:
      return {...state, amount: action.payload};
    case RATES_CURRENCY_CHANGED:
      return {...state, currencyCode: action.payload};
    case RATES_RECEIVED:
      return {...state, currencyData: action.payload};
    default:
      return state;
  }
}

// selector functions (access redux state easily)
export const getAmount = state => state.rates.amount;
export const getCurrencyCode = state => state.rates.currencyCode;
export const getCurrencyData = state => state.rates.currencyData;

// actions

export function changeCurrencyCode(currencyCode) {
  return function changeCurrencyCodeThunk(dispatch) {
    dispatch({
      type: RATES_CURRENCY_CHANGED,
      payload: currencyCode
    }); // thunk action creator

    getExchangeRates(currencyCode, supportedCurrencies) // api call
      .then(rates => {
        dispatch({ // then action creator get payload
          type: RATES_RECEIVED,
          payload: rates
        });
      });
  }
};

// thunks

export function getInitialRates(dispatch, getState) {
  const state = getState();
  const currencyCode = getCurrencyCode(state);
  dispatch(changeCurrencyCode(currencyCode)); // fetch currency data before component get loaded ..
};
```

#### Redux-toolkit

This is currently the modern way of manage the react states, features I discovered so far,

- Seems like actions and reducers are in the <strong>SAME</strong> file

```js
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

- all in one line

```js
import { configureStore } from '@reduxjs/toolkit';
// automatically imported redux-devtools-extension
// automatically imported redux thunk middleware
```

- RTK query: Elegant way to handle async fetch calls

```js
// For functional file:
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi
```

```js
// For store:
import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from './services/pokemon'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
```


### Why we need to use `selector functions` for Redux state?

Keep your store state `minimal` and derived data from the state `needed`, pick the needed state for component

```js
const mainState = (state: State) => state;
const selectedState = createSelector(mainState, (state) => state.specificProp);
```
