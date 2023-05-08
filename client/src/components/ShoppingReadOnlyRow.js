import React from 'react'

const ShoppingReadOnlyRow = ({ item, handleEditClick, deleteShoppingItem, addToListAndDelete, isAdded, alreadyAdded }) => {
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
            <button className="delete-item actionButtons" onClick={(e) => deleteShoppingItem(e, item._id)}>Delete</button>
        </td>
        <td>
            <button className="delete-item actionButtons" onClick={(e) => addToListAndDelete(e, item._id)}>{alreadyAdded === true ? "Already added" : isAdded === true ? "Added to list" : "Add to list"}</button>
        </td>
    </tr>
  )
}

export default ShoppingReadOnlyRow