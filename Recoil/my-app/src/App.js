import React from 'react';
import { atom, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import './App.css'

const personAtom = atom({
  key: 'person', // unique ID (with respect to other atoms/selectors)
  default: {
    firstName: '',
    lastName: ''
  }, // default value (aka initial value)
});

const displayFullNameAtom = atom({
  key: 'displayFullName',
  default: {
    onlyFirstName: true
  },
});

function DisplayPerson() {
  const person = useRecoilValue(personAtom);
  const displayFullName = useRecoilValue(displayFullNameAtom);
  console.log('Esto va a crear un conflicto')
  
  return (
    displayFullName.displayFullName ?
      <div>
        First Name: {person.firstName}
      </div>
      :
      <div>
        Full Name: {person.firstName} {person.lastName}
      </div>
  );
}

function App() {
  const [person, setPerson] = useRecoilState(personAtom);
  const [displayFullName, setDisplayFullNameAtom] = useRecoilState(displayFullNameAtom);

  return (
    <div className="App">
      <h2>Person in Recoil</h2>
      <div>
        First Name:
        <input value={person.firstName} type="text"
          onChange={(event) => setPerson({ ...person, firstName: event.target.value })} />
      </div>
      <div>
        Last Name:
        <input value={person.lastName} type="text"
          onChange={(event) => setPerson({ ...person, lastName: event.target.value })} />
      </div>
      <button type="button" onClick={() => setDisplayFullNameAtom(!displayFullName.onlyFirstName)}>
        {displayFullName.onlyFirstName ? 'Showing only first name' : 'Showing full name'}
      </button>
      <DisplayPerson />
    </div>
  );
}

export default App;
