import React from 'react'

const ReadOnlyRow = ({ item, handleEditClick, deleteInventoryItem, addToList, isAdded, alreadyAdded }) => {
  return (
    <tr>
        {/*<td><input type="checkbox" name="transfer" /></td>*/}
        <td>{item.item}</td>
        <td>{item.quantity}</td>
        <td>{item.units}</td>
        <td>{item.location}</td>
        <td>{item.expires}</td>
        <td>
            <button className="delete-item actionButtons" onClick={(e) => handleEditClick(e, item._id)}>Edit</button>
        </td>
        <td>
            <button className="delete-item actionButtons" onClick={(e) => deleteInventoryItem(e, item._id)}>Delete</button>
        </td>
        <td>
            <button className="delete-item actionButtons" onClick={(e) => addToList(e, item._id)}>{/*alreadyAdded ? "Already added" : isAdded ? "Added to list" :*/ "Add to list"}</button>
        </td>
    </tr>
  )
}

export default ReadOnlyRow