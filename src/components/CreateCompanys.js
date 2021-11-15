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
       <th>Företag</th>
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
       <th> <p className="addtotableheader">Lägg till företag</p> <img className="addtotableLogotyp" src="./Images/AFRY-Företag-Knapp.png"/> </th>           
      </tr>
    </thead>
    <tbody className="addtotablebody">
      <tr>
        <td>
            <div> <input className="addtotableinput" type="text" name="namn" required="required" placeholder="Skriv in ett företag..." onChange={handleAddFormChange} /> </div>
            <div> <button className="addtotablebutton" type="submit">Lägg till</button> </div>
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
              <div className="listaföretag">
                  <p className="listaföretagtext">Anställda personer:</p>
                  <select className="listapersonalselect">
                    <option value="A">Företag 1</option>
                    <option value="B">Företag 2</option>
                    <option value="C">Företag 3</option>
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