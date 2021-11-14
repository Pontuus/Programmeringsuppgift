import React from "react";

const ReadOnlyRowContact = ({ MapedValueContact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td className="inputbox2"> {MapedValueContact.namn} </td>

      <td>
        <button type="button" onClick={(event) => handleEditClick(event, MapedValueContact)}> Edit </button>

        <button type="button" onClick={() => handleDeleteClick(MapedValueContact.id)}>Delete</button>

      </td>
    </tr>
  );
};

export default ReadOnlyRowContact;