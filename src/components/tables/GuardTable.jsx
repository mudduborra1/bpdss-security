import '../../styles/table.css'

function GuardTable() {
  
  const guards = [
  {
    "id": 1,
    "name": "Ravi Kumar",
    "site": "Main Gate",
    "status": "Active"
  },
  {
    "id": 2,
    "name": "Suresh",
    "site": "Warehouse",
    "status": "Off Duty"
  },
  {
    "id": 3,
    "name": "Mahesh",
    "site": "Parking Area",
    "status": "Active"
  },
  {
    "id": 4,
    "name": "Kiran",
    "site": "Office Block",
    "status": "Active"
  },
  {
    "id": 5,
    "name": "Naresh",
    "site": "North Gate",
    "status": "On Leave"
  },
  {
    "id": 6,
    "name": "Ramesh",
    "site": "Warehouse",
    "status": "Active"
  },
  {
    "id": 7,
    "name": "Ganesh",
    "site": "Control Room",
    "status": "Off Duty"
  },
  {
    "id": 8,
    "name": "Venkatesh",
    "site": "South Gate",
    "status": "Active"
  },
  {
    "id": 9,
    "name": "Prasad",
    "site": "Main Office",
    "status": "Active"
  },
  {
    "id": 10,
    "name": "Arjun",
    "site": "Loading Dock",
    "status": "On Leave"
  },
  {
    "id": 11,
    "name": "Krishna",
    "site": "Server Room",
    "status": "Active"
  },
  {
    "id": 12,
    "name": "Anil",
    "site": "Reception",
    "status": "Off Duty"
  },
  {
    "id": 13,
    "name": "Harish",
    "site": "East Wing",
    "status": "Active"
  },
  {
    "id": 14,
    "name": "Vijay",
    "site": "West Gate",
    "status": "Active"
  },
  {
    "id": 15,
    "name": "Rajesh",
    "site": "Warehouse",
    "status": "Off Duty"
  },
  {
    "id": 16,
    "name": "Dinesh",
    "site": "Power Station",
    "status": "Active"
  },
  {
    "id": 17,
    "name": "Srinu",
    "site": "Visitor Lobby",
    "status": "On Leave"
  },
  {
    "id": 18,
    "name": "Chandu",
    "site": "Back Gate",
    "status": "Active"
  },
  {
    "id": 19,
    "name": "Lokesh",
    "site": "Admin Block",
    "status": "Off Duty"
  },
  {
    "id": 20,
    "name": "Pavan",
    "site": "CCTV Room",
    "status": "Active"
  }
];


  return (
    <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Site</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {guards.map((guard) => (
            <tr key={guard.id}>
              <td>{guard.id}</td>
              <td>{guard.name}</td>
              <td>{guard.site}</td>
              <td>{guard.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GuardTable
