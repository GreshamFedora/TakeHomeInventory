import React from 'react'

const EditableRow = ({ item, cancelEditing, /*updateInventoryItem,*/ editedItem, setEditedItem, editFormData, handleEditFormChange, handleEditFormSubmit }) => {

    /*
  const handleInputChange = event => {
    const { name, value } = event.target
    setEditedItem({ ...editedItem, [name]: value })
  }*/

  return (
    <tr>
      <td><input type="text" name="item" value={editFormData.item} onChange={handleEditFormChange} /></td>
      <td><input type="number" name="quantity" value={editFormData.quantity} onChange={handleEditFormChange} /></td>
      <td><input type="text" name="units" value={editFormData.units} onChange={handleEditFormChange} /></td>
      <td>
          <select name="location" value={editFormData.location} onChange={handleEditFormChange}>
            <option value="Pantry">Pantry</option>
            <option value="Refrigerator">Refrigerator</option>
            <option value="Cabinet">Cabinet</option>
          </select>       
      </td>
      <td><input type="date" name="expires" value={editFormData.expires} onChange={handleEditFormChange} /></td>
      <td>
        <button type="submit" className="save-item actionButtons" onClick={handleEditFormSubmit}>Save</button>
      </td>
      <td>
        <button className="cancel-item actionButtons" onClick={() => cancelEditing()}>Cancel</button>
      </td>
    </tr>
  )
}

export default EditableRow
