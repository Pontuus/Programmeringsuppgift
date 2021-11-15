import React from "react";

const EditableRow = ({editFormData, handleEditFormChange, handleCancelClick, }) => {
  return (
    
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Skriv ett namn..."
          name="namn"
          value={editFormData.fullName}
          onChange={handleEditFormChange}
        ></input>
      </td>

      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </td>
    </tr>

  );
};

export default EditableRow;
