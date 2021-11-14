import React from "react";

const ReadOnlyRowCompany = ({ MapedValueCompany, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td className="inputbox2"> {MapedValueCompany.namn} </td>

      <td>
        <button type="button" onClick={(event) => handleEditClick(event, MapedValueCompany)}> Edit </button>

        <button type="button" onClick={() => handleDeleteClick(MapedValueCompany.id)}>Delete</button>

      </td>
    </tr>
  );
};

export default ReadOnlyRowCompany;