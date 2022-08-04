import * as React from 'react';
import { useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import './App.css'

const initialState = {
  firstName: '',
  lastName: '',
};

type State = typeof initialState;

type Action =
  | { type: 'setFirstName'; firstName: string }
  | { type: 'setLastName'; lastName: string };

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'setFirstName':
      return { ...state, firstName: action.firstName };
    case 'setLastName':
      return { ...state, lastName: action.lastName };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: reducer,
});

const EditPerson = () => {
  const dispatch = useDispatch();
  const firstName = useSelector((state: State) => state.firstName);
  const lastName = useSelector((state: State) => state.lastName);
  const setFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const firstName = e.target.value;
    dispatch({ type: 'setFirstName', firstName });
  };
  const setLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lastName = e.target.value;
    dispatch({ type: 'setLastName', lastName });
  };

  return (
    <div>
      <div>
        First Name:
        <input value={firstName} onChange={setFirstName} />
      </div>
      <div>
        Last Name:
        <input value={lastName} onChange={setLastName} />
      </div>
    </div>
  );
};

const ShowPerson = () => {
  const [onlyFirstName, setOnlyFirstName] = useState(false);
  const firstName = useSelector((state: State) => state.firstName);
  const lastName = useSelector((state: State) => state.lastName);
  return (
    <div>
      <button type="button" onClick={() => setOnlyFirstName((s) => !s)}>
        {onlyFirstName ? 'Showing only first name' : 'Showing full name'}
      </button>
      {onlyFirstName ? (
        <div>First Name: {firstName}</div>
      ) : (
        <div>
          Full Name: {firstName} {lastName}
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <h2>Person in Redux</h2>
      <Provider store={store}>
        <EditPerson />
        <ShowPerson />
      </Provider>
    </div>
  );
};

export default App;
