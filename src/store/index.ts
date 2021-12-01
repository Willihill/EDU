import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducer'

const middlewares = [thunk] as any[]
// eslint-disable-next-line @typescript-eslint/no-var-requires
if (process.env.NODE_ENV !== 'production') middlewares.push(require('redux-devtools-extension').composeWithDevTools)

export const store = createStore(reducers, compose(applyMiddleware(...middlewares)))
