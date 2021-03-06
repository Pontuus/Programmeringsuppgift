import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";

import ReadOnlyRowCompany from "./ReadOnly/ReadOnlyRowCompany";
import ReadOnlyRowContact from "./ReadOnly/ReadOnlyRowContact";
import EditableRow from "./EditableRow";
import CreatePerson from "./Person/CreatePerson";


const CreateCompanys = (props, { initialcompany}) => {

    const initialstate = JSON.parse(window.localStorage.getItem("companies"));
    const [companies, setCompanies] = useState(initialstate || initialcompany );

    useEffect(() => {
        window.localStorage.setItem("companies", JSON.stringify(companies));
    }, [companies])


    const [addFormData, setAddFormData] = useState({namn: "",});
    const [editFormData, setEditFormData] = useState({namn: "",});
    const [editCompanyId, setEditCompanyId] = useState(null);
  
    const handleAddFormChange = (event) => {
      event.preventDefault();
  
      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;
  
      const newFormData = { ...addFormData };
      newFormData[fieldName] = fieldValue;
  
      setAddFormData(newFormData);
    };
  
  
    const handleEditFormChange = (event) => {
      event.preventDefault();
  
      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;
  
      const newFormData = { ...editFormData };
      newFormData[fieldName] = fieldValue;
  
      setEditFormData(newFormData);
    };
  
  
    const handleAddFormSubmit = (event) => {
      event.preventDefault();
  
      const newCompany = {
        id: nanoid(),
        namn: addFormData.namn,
      };
  
  
      const newCompanies = [...companies, newCompany];
      setCompanies(newCompanies);
    };
  
    const handleEditFormSubmit = (event) => {
      event.preventDefault();
  
      const editedCompany = {
        id: editCompanyId,
        namn: editFormData.namn,
      };
  
      const newCompanies = [...companies];
  
      const index = companies.findIndex((MapedValueCompany) => MapedValueCompany.id === editCompanyId);
  
      newCompanies[index] = editedCompany;
  
      setCompanies(newCompanies);
      setEditCompanyId(null);
    };
  
    const handleEditClick = (event, MapedValueCompany) => {
      event.preventDefault();
      setEditCompanyId(MapedValueCompany.id);
  
      const formValues = {
        namn: MapedValueCompany.namn,
      };
  
      setEditFormData(formValues);
    };
  
    const handleCancelClick = () => {
      setEditCompanyId(null);
    };
  
    const handleDeleteClick = (companyId) => {
      const newCompanies = [...companies];
  
      const index = companies.findIndex((MapedValueCompany) => MapedValueCompany.id === companyId);
  
      newCompanies.splice(index, 1);
  
      setCompanies(newCompanies);
    };
    return (
        
<>
<form onSubmit={handleEditFormSubmit}>
  <table className="inputbox">
    <thead>
      <tr>
       <th>F??retag</th>
       <th>Uppdatera</th>
      </tr>
    </thead>
      <tbody className="tbody"> {companies.map((MapedValueCompany) => (
        <Fragment key={MapedValueCompany.id}> 
              {editCompanyId === MapedValueCompany.id ? (
                  <EditableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} />
                   ) : (
                   <ReadOnlyRowCompany MapedValueCompany={MapedValueCompany} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick}/>
                   )}   
        </Fragment>
      ))}
    </tbody>
   </table>
  </form>
      
<form onSubmit={handleAddFormSubmit}>
  <table className="addtotable">
    <thead>
      <tr>
       <th> <p className="addtotableheader">L??gg till f??retag</p> <img className="addtotableLogotyp" src="./Images/AFRY-F??retag-Knapp.png"/> </th>           
      </tr>
    </thead>
    <tbody className="addtotablebody">
      <tr>
        <td>
            <div> <input className="addtotableinput" type="text" name="namn" required="required" placeholder="Skriv in ett f??retag..." onChange={handleAddFormChange} /> </div>
            <div> <button className="addtotablebutton" type="submit">L??gg till</button> </div>
        </td>
      </tr>
    </tbody>
  </table>
</form>

<table className="listapersonal">
    <thead>
       <tr>
          <th>
             <h2 className="listapersonalheader">Personal</h2>
          </th>
        </tr>
     </thead>
     <tbody className="addtotablebody">
        <tr>
          <td>
              <div className="listaf??retag">
                  <p className="listaf??retagtext">Anst??llda personer:</p>
                  <select className="listapersonalselect">
                    <option value="A">F??retag 1</option>
                    <option value="B">F??retag 2</option>
                    <option value="C">F??retag 3</option>
                  </select>
              </div>
          </td>
        </tr>
      </tbody>
</table>
</>
  );
}
export default CreateCompanys;