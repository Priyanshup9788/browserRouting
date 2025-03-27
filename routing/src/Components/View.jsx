import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const View = () => {

  const [allEmp, setAllEmp] = useState(() => {
    let epmloyes = localStorage.getItem("emp");

    return epmloyes ? JSON.parse(epmloyes) : [];
  });

  const [filter, setFilter] = useState("");

  const [perPage, setPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpages, setTotalPages] = useState(0);

  const [virtualEmp, setVirtualEmp] = useState([]);

  useEffect(() => {
    let lastIndex = perPage * currentPage;
    let firstIndex = lastIndex - perPage;

    let newEmp = [...allEmp];
    let pages = Math.ceil(newEmp.length / perPage);
    setTotalPages(pages);
    newEmp = newEmp.slice(firstIndex, lastIndex);
    setVirtualEmp(newEmp);
  }, [currentPage, allEmp])


  const onDelete = (e, id) => {
    e.preventDefault();
    let oldEmp = JSON.parse(localStorage.getItem("emp"));
    oldEmp = oldEmp.filter((emp) => emp.id != id);

    setAllEmp(oldEmp);
    localStorage.setItem("emp", JSON.stringify(oldEmp))
  }

  const onFilterChange = (e) => {
    let newdata = allEmp.filter((emp) => {
      if (e.target.value != "") {
        if (emp.name.toLowerCase().includes(e.target.value.toLowerCase())) {
          return emp;
        }
      }
    });
    if (e.target.value == "") {
      setAllEmp(() => {
        let epmloyes = localStorage.getItem("emp");

        return epmloyes ? JSON.parse(epmloyes) : [];
      });
      return;
    }
    setAllEmp(newdata);
  }

  const onSortChange = (e) => {
    e.preventDefault();

    let newEmp = [...allEmp];
    if (e.target.value == "asc") {
      newEmp.sort((a, b) => (a.name.localeCompare(b.name)));
    }
    else if (e.target.value == "desc") {
      newEmp.sort((a, b) => (b.name.localeCompare(a.name)));
    }
    setAllEmp(newEmp);
  }





  return (
    <div className="container">
      <h2>Submitted Data</h2>
      <table>
        <thead>
          <tr>
            <td > <input type="text" onChange={(e) => (onFilterChange(e))} /></td>
            <td colSpan={6}><select name="sorting" onChange={(e) => { onSortChange(e) }}>
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
          {virtualEmp.map((emp, i) => (
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
      <div class="pagination">
        <button id="prevPage" onClick={() => {
          if (currentPage != 1) {
            setCurrentPage(currentPage - 1);
          }
        }}>Previous</button>
        <span id="pageNumber">Page {currentPage}</span>
        <button id="nextPage" onClick={() => {
          if (currentPage != totalpages) {
            setCurrentPage(currentPage + 1);
          }
        }}>Next</button>
      </div>
    </div>
  )
}

export default View