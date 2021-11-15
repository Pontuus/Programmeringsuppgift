import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";

import ReadOnlyRowContact from "../ReadOnly/ReadOnlyRowContact";
import EditableRow from "../EditableRow";


const CreatePerson = ({initialpersons}, props) => {

    const initialstate = JSON.parse(window.localStorage.getItem("contacts"));
    const [contacts, setContacts] = useState(initialstate || initialpersons );

    useEffect(() => {
        window.localStorage.setItem("contacts", JSON.stringify(contacts));
    }, [contacts])


    const [addFormData, setAddFormData] = useState({namn: "",});
    const [editFormData, setEditFormData] = useState({namn: "",});
    const [editContactId, setEditContactId] = useState(null);
  
  
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
  
      const newContact = {
        id: nanoid(),
        namn: addFormData.namn,
      };
  
  
  
      const newContacts = [...contacts, newContact];
      setContacts(newContacts);
    };
  
    const handleEditFormSubmit = (event) => {
      event.preventDefault();
  
      const editedContact = {
        id: editContactId,
        namn: editFormData.namn,
      };
  
      const newContacts = [...contacts];
  
      const index = contacts.findIndex((MapedValueContact) => MapedValueContact.id === editContactId);
  
      newContacts[index] = editedContact;
  
      setContacts(newContacts);
      setEditContactId(null);
    };
  
    const handleEditClick = (event, MapedValueContact) => {
      event.preventDefault();
      setEditContactId(MapedValueContact.id);
  
      const formValues = {
        namn: MapedValueContact.namn,
      };
  
      setEditFormData(formValues);
    };
  
    const handleCancelClick = () => {
      setEditContactId(null);
    };
  
    const handleDeleteClick = (contactId) => {
      const newContacts = [...contacts];
  
      const index = contacts.findIndex((MapedValueContact) => MapedValueContact.id === contactId);
  
      newContacts.splice(index, 1);
  
      setContacts(newContacts);
    };

    return (
        <>
<form onSubmit={handleEditFormSubmit}>
  <table className="inputbox">
    <thead>
      <tr>
       <th>Personer</th>
       <th>Uppdatera</th>
      </tr>
    </thead>

      <tbody className="tbody"> 
          {contacts.map((MapedValueContact) => (
            <Fragment key={MapedValueContact.id}>
          {editContactId === MapedValueContact.id ? (
            <EditableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} />
          ) : (
            <ReadOnlyRowContact MapedValueContact={MapedValueContact} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick}/>
          )}
          <tr>
              <td> <label className="LabelCompanySelect">Välj ett företag:</label> </td>
              <td> 
                <select className="CompanySelect">
                  <option value="Företag från vy 2"> "Företag från vy 2" </option>
                </select>
              </td>
          </tr>
        </Fragment>
      ))}
    </tbody>
   </table>
</form>

  <form onSubmit={handleAddFormSubmit}>
    <table className="addtotable">
    <thead>
      <tr>
       <th><p className="addtotableheader">Lägg till person</p> <img className="addtotableLogotyp" src="./Images/AFRY--Företag-Knapp2.png"/> </th>        
      </tr>
    </thead>
    <tbody className="addtotablebody">
      <tr>
        <td>
            <div> <input className="addtotableinput" type="text" name="namn" required="required" placeholder="Skriv in en person..." onChange={handleAddFormChange} /> </div>
            <div> <button className="addtotablebutton" type="submit">Lägg till</button> </div>
        </td>
      </tr>
    </tbody>
  </table>
</form>
</>
  );
}
export default CreatePerson;