const employees = [
  { id: 1, name: "moe" },
  { id: 2, name: "larry", managerId: 1 },
  { id: 4, name: "shep", managerId: 2 },
  { id: 3, name: "curly", managerId: 1 },
  { id: 5, name: "groucho", managerId: 3 },
  { id: 6, name: "harpo", managerId: 5 },
  { id: 8, name: "shep Jr.", managerId: 4 },
  { id: 99, name: "lucy", managerId: 1 },
];

const spacer = (text) => {
  if (!text) {
    return console.log("");
  }
  const stars = new Array(5).fill("*").join("");
  console.log(`${stars} ${text} ${stars}`);
};

spacer("findEmployeeByName Moe");
// given a name and array of employees, return employee
function findEmployeeByName(name, employeeList){
    let found;
    employeeList.forEach( employee => {
        if (employee['name'] === name)
            found = employee;
    })

    return found;

}
console.log(findEmployeeByName("moe", employees)); //{ id: 1, name: 'moe' }
spacer("");

spacer("findManagerFor Shep Jr.");
//given an employee and a list of employees, return the employee who is the manager

function findManagerFor(name, employeeList){
    let found;
    let managerId = name['managerId'];

    employeeList.forEach( employee => {
        if (employee['id'] === managerId)
            found = employee
    })
    return found;
    
}

console.log(
  findManagerFor(findEmployeeByName("shep Jr.", employees), employees)
); //{ id: 4, name: 'shep', managerId: 2 }
spacer("");

spacer("findCoworkersFor Larry");

//given an employee and a list of employees, return the employees who report to the same manager
function findCoworkersFor(name, employeeList){

    let found = [];
    let managerId = name['managerId'];

    employeeList.forEach( employee => {
        if ((employee['managerId'] === managerId) && (employee !== name))
            found.push(employee);
    })
    return found;
}
console.log(
  findCoworkersFor(findEmployeeByName("larry", employees), employees)
); /*
  [ { id: 3, name: 'curly', managerId: 1 },
    { id: 99, name: 'lucy', managerId: 1 } ]
  */

spacer("");

spacer("findManagementChain for moe");
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager
function findManagementChainForEmployee(name, employeeList, foundList = []){
    
    if ( name['managerId'] === undefined )
        return foundList;

    const manager = findManagerFor(name, employeeList);
    foundList.push(manager);
    
    findManagementChainForEmployee(manager, employeeList, foundList);

    return foundList;

}

console.log(
  findManagementChainForEmployee(
    findEmployeeByName("moe", employees),
    employees
  )
); //[  ]
spacer("");

spacer("findManagementChain for shep Jr.");
console.log(
  findManagementChainForEmployee(
    findEmployeeByName("shep Jr.", employees),
    employees
  )
); /*
  [ { id: 1, name: 'moe' },
    { id: 2, name: 'larry', managerId: 1 },
    { id: 4, name: 'shep', managerId: 2 }]
  */
spacer("");

spacer("generateManagementTree");
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
function generateManagementTree(employeeList){

    let managementTree = {};
    employeeList.forEach(elem => {
        elem.reports = []
        if (elem.managerId === undefined)
            managementTree = elem;
    });

    employeeList.forEach(elem => {
        const manager = findManagerFor(elem, employeeList);
        if (manager !== undefined)
            manager.reports.push(elem);
    })

    return managementTree;

}

console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
  {
    "id": 1,
    "name": "moe",
    "reports": [
      {
        "id": 2,
        "name": "larry",
        "managerId": 1,
        "reports": [
          {
            "id": 4,
            "name": "shep",
            "managerId": 2,
            "reports": [
              {
                "id": 8,
                "name": "shep Jr.",
                "managerId": 4,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 3,
        "name": "curly",
        "managerId": 1,
        "reports": [
          {
            "id": 5,
            "name": "groucho",
            "managerId": 3,
            "reports": [
              {
                "id": 6,
                "name": "harpo",
                "managerId": 5,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 99,
        "name": "lucy",
        "managerId": 1,
        "reports": []
      }
    ]
  }
  */
spacer("");

spacer("displayManagementTree");
//given a tree of employees, generate a display which displays the hierarchy
function displayManagementTree(employeeTree){

    console.log(employeeTree.name);

    employeeTree.reports.forEach( employee => {
        let dashes = '-'
        while(employee !== undefined){
            console.log(`${dashes}${employee.name}`);
            employee = employee.reports[0];
            dashes += '-';
        }
    })
}
displayManagementTree(generateManagementTree(employees)); /*
  moe
  -larry
  --shep
  ---shep Jr.
  -curly
  --groucho
  ---harpo
  -lucy
  */
