import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const View = () => {

  const [allEmp, setAllEmp] = useState(() => {
    let epmloyes = localStorage.getItem("emp");

    return epmloyes ? JSON.parse(epmloyes) : [];
  });

  const [filter, setFilter] = useState("");

  const onDelete = (e, id) => {
    e.preventDefault();
    setAllEmp(allEmp.filter((emp) => emp.id !== id));
  }

  const onSortChange=(e)=>{
    let newEmp = [...allEmp];
    if(e.target.value=="asc")
    {
      newEmp.sort((a,b)=>(a.name.localeCompare(b.name)));
    }
    else if(e.target.value=="desc"){
      newEmp.sort((a,b)=>(b.name.localeCompare(a.name)));
    }
    setAllEmp(newEmp);
  }


  useEffect(() => {
    localStorage.setItem("emp", JSON.stringify(allEmp));
  }, [allEmp])

  return (
    <div className="container">
      <h2>Submitted Data</h2>
      <table>
        <thead>
          <tr>
            <td> <input type="text" onChange={(e) => (setFilter(e.target.value))} /></td>
            <td><select name="sorting" onChange={(e)=>{onSortChange(e)}}>
              <option value="">--select sort --</option>
              <option value="asc">Acending</option>
              <option value="desc">Decending</option>
            </select></td>
          </tr>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Gender</th>
            <th>Hobby</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {allEmp.filter((emp) => {
            if (filter != "") {
              if (emp.name.includes(filter)) {
                return emp;
              }
            }
            else {
              return emp;
            }
          }).map((emp, i) => (
            <tr key={i}>
              <td id="displayName">{emp.name}</td>
              <td id="displayEmail">{emp.email}</td>
              <td id="displayEmail">{emp.password}</td>
              <td id="displayEmail">{emp.gender}</td>
              <td id="displayEmail">{emp.hoby.toString()}</td>
              <td id="displayEmail">{emp.city}</td>
              <td><button onClick={(e) => onDelete(e, emp.id)}>Delete</button> || <Link to={"/edit/" + emp.id}>Edit</Link></td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

export default View