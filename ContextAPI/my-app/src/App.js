import './App.css';
import React, { Component, useState } from "react";
import MyContext from './Context/MyContext';

class MyProvider extends Component {
  state = {
    name: '',
    lastName: ''
  };
  render() {
    return (
      <MyContext.Provider
        value={{
          name: this.state.name,
          lastName: this.state.lastName,
          setFirstName: value => {
            this.setState({ name: value });
          },
          setLastName: value => {
            this.setState({ lastName: value });
          }
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

function App() {
  const [onlyFirstName, setOnlyFirstName] = useState(false);

  return (
    <MyProvider>
      <div className="App">
        <h2>Person in Context</h2>
        <MyContext.Consumer>
          {
            context => (
              <>
                <div>
                  First Name:
                  <input value={context.name} onChange={(val) => { context.setFirstName(val.target.value) }} />
                </div>
                <div>
                  Last Name:
                  <input value={context.lastName} onChange={(val) => { context.setLastName(val.target.value) }} />
                </div>
                <button type="button" onClick={() => setOnlyFirstName((s) => !s)}> {onlyFirstName ? 'Showing only first name' : 'Showing full name'} </button>
                {
                  onlyFirstName ?
                    <div>
                      First Name: {context.name}
                    </div>
                    :
                    <div>
                      Full Name: {context.name} {context.lastName}
                    </div>
                }
              </>
            )}
        </MyContext.Consumer>
      </div>
    </MyProvider>
  );
}

export default App;
