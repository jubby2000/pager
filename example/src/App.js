import React, { Component } from 'react'

import Pager from 'pager'

const employees = [
  {
    id : 1,
    last_name : 'Dole',
    first_name : 'Bob',
    department : 'Civics',
    salary : 1000
  },
  {
    id : 2,
    last_name : 'Smith',
    first_name : 'John',
    department : 'Seafaring',
    salary : 10000
  },
  {
    id : 3,
    last_name : 'Z',
    first_name : 'Jay',
    department : 'Poetry',
    salary : 1000000
  },
  {
    id : 4,
    last_name : 'None',
    first_name : 'Socrates',
    department : 'Philosophy',
    salary : 100
  },
  {
    id : 5,
    last_name : 'Tiger',
    first_name : 'Tony',
    department : 'Cooking',
    salary : 2000
  },
  {
    id : 6,
    last_name : 'Bourne',
    first_name : 'Jason',
    department : 'Espionage',
    salary : 1000
  },
]

export default class App extends Component {
  render () {
    return (
      <div>
        <h1>Employees</h1>
        <Pager
          pages={employees.map(employee => (
            <ul key={employee.id}>
              <li>Name: {employee.last_name}, {employee.first_name}</li>
              <li>Department: {employee.department}</li>
              <li>Salary: ${employee.salary}</li>
            </ul>
          ))}
          getLabel={
            i => `${employees[i].last_name}, ${employees[i].first_name}`
          }
          pageInfoUrl={(label) => `https://www.example.com/employees/info?label=${label}`}
          supportRequestUrl="https://www.example.com/support"
        >
          {({
            page,
            goPrevious,
            goNext,
            goToLabel,
            currentPageLabel,
            pageLabels,
            showHelpScreen,
            pageInfoIsLoading,
            pageInfoError,
            pageInfo,
          })=>(
            <div>
              <div>
                <select onChange={e => goToLabel(e.target.value)}>
                  {pageLabels.map(label => (
                    <option
                      key={label}
                      value={label}
                      selected={label === currentPageLabel}
                    >
                      {label}
                    </option>
                  ))}
                </select>
                <button onClick={goPrevious}>Previous</button>
                <button onClick={goNext}>Next</button>
                <button onClick={showHelpScreen}>Help</button>
              </div>
              <div>
                {page}
              </div>
              {pageInfoIsLoading && (
                <div>Loading more info...</div>
              )}
              {pageInfoError && (
                <div>Error fetching info: {pageInfoError}</div>
              )}
              {pageInfo && (
                <div>
                  # of Likes: {pageInfo.likes}
                </div>
              )}
            </div>
          )}
        </Pager>
      </div>
    );
  }
}
