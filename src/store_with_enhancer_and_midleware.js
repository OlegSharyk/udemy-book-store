import { createStore, applyMiddleware } from 'redux';
// import { createStore, compose } from 'redux';
import reducer from './reducers';

// const logEnhancer =
//   (createStore) =>
//   (...args) => {
//     const store = createStore(...args);

//     const originalDispatch = store.dispatch;
//     store.dispatch = (action) => {
//       console.log(action.type);
//       return originalDispatch(action);
//     };

//     return store;
//   };

// const stringEnhancer =
//   (createStore) =>
//   (...args) => {
//     const store = createStore(...args);

//     const originalDispatch = store.dispatch;
//     store.dispatch = (action) => {
//       if (typeof action === 'string') {
//         return originalDispatch({
//           type: action,
//         });
//       }
//       return originalDispatch(action);
//     };

//     return store;
//   };

// const logMiddleware = (store) => (dispatch) => (action) => {
const logMiddleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    console.log(action.type, getState());
    return next(action);
  };

// next === dispatch
const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action,
    });
  }

  return next(action);
};

// const store = createStore(reducer, compose(stringEnhancer, logEnhancer));
const store = createStore(reducer, applyMiddleware(stringMiddleware, logMiddleware));

//monkey patching
// const originalDispatch = store.dispatch;
// store.dispatch = (action) => {
//   if (typeof action === 'string') {
//     return originalDispatch({
//       type: action,
//     });
//   }
//   return originalDispatch(action);
// };
store.dispatch('HELLO_WORLD');

export default store;
