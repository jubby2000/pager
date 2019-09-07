# pager

> 

[![NPM](https://img.shields.io/npm/v/pager.svg)](https://www.npmjs.com/package/pager) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save jubby2000-pager
```

## Usage

```tsx
import * as React from 'react'

import Pager from 'jubby2000-pager'

class Example extends React.Component {
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
```

## License

MIT © [jubby2000](https://github.com/jubby2000)
