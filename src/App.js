import { useReducer, useState } from "react";
import "./App.css";
import { UserRow } from "./Component/UserRow";

const initialState = {
  name: "",
  gender: "Male",
  role: "FrontEnd Developer",
  maritalStatus: false,
};

//should have the action types as "name", "gender", "role", "maritalStatus"(for updating "name", "gender", "role", "maritalStatus" ) and "reset" along with the default cases
// the reset action type should show reset the state to initial state
// the default case should throw an Error with message `invalid action type`.
const reducer = (state, action) => {

  switch (action.type) {
    case "name": {
      return {
        ...state,
        name: action.payload
      }
    }
    case "gender": {
      return {
        ...state,
        gender: action.payload
      }
    }
    case "role": {
      return {
        ...state,
        role: action.payload
      }
    }
    case "maritalStatus": {
      return {
        ...state,
        maritalStatus: action.payload
      }
    }

    case "reset": {
      return initialState;
    }

    default: {
      throw new Error("invalid action type")
    }

  }

};

function App() {
  const [formdata, dispatch] = useReducer(reducer, initialState);



  // import and use the useReducer hook here, with the reducer function and the initialState.

  //store the data in the below variable on clicking the submit button, to render, the data in the UI.
  const [submittedData, setSubmittedData] = useState([]);



  function handleSubmit(event) {
    event.preventDefault();
    setSubmittedData([...submittedData, formdata]);
    dispatch({ type: "reset" });
  }




  return (
    <div className="App">
      <div>
        <h1>User Form</h1>
        <h3>useReducer</h3>
        <div className="form-wrapper" data-testid="form-wrapper">
          <form data-testid="form-element" onSubmit={handleSubmit}>
            <div className="name-wrapper" data-testid="name-wrapper">
              <label>Name</label>
              {/* keep an input tag with name attribute as "name" type as "text" and placeholder as "Name" */}
              <input type="text" name="name" value={formdata.name} onChange={(e) => { dispatch({ type: "name", payload: e.target.value }) }} />
            </div>
            <div className="gender-wrapper" data-testid="gender-wrapper">
              <label>Gender</label>
              <select name="gender" data-testid="gender-select" value={formdata.gender} onChange={(e) => { dispatch({ type: "gender", payload: e.target.value }) }} >
                <option>Prefer Not to Say</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="role-wrapper" data-testid="role-wrapper">
              <label>Role</label>
              <select name="role" data-testid="role-select" value={formdata.role} onChange={(e) => { dispatch({ type: "role", payload: e.target.value }) }} >
                <option>FrontEnd Developer</option>
                <option>BackEnd Developer</option>
                <option>FullStack Developer</option>
              </select>
            </div>
            <div
              className="marital-status-wrapper"
              data-testid="marital-status-wrapper"
            >
              <legend>Martial Status</legend>
              <div>
                {/* keep an input tag with type as "checkbox" and name as "maritalStatus" */}
                <input type={"checkbox"} name="maritalStatus" checked={formdata.maritalStatus} onChange={(e) => { dispatch({ type: "maritalStatus", payload: e.target.checked }) }} />
                <label>Married</label>
              </div>
            </div>
            <div>
              <button type="submit">SUBMIT</button>
            </div>
          </form>
        </div>

        {/* add table or h2 tag as per the problem statement */}


        {submittedData.length > 0 ? <table data-testid="user-container">
          <thead>
            <tr>
              <th>S.no</th>
              <th>User</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Marital Status</th>
            </tr>
          </thead>
          <tbody>
            {submittedData && submittedData.map((ele, index) => {
              return <UserRow key={index} name={ele.name} gender={ele.gender} role={ele.role} maritalStatus={ele.maritalStatus} id={index} />
            })}
          </tbody>
        </table> : <h2 data-testid="no-user-container">no users found</h2>}
      </div>
    </div>
  );
}

// DO NOT change/modify the exports
export default App;
export { reducer, initialState }
