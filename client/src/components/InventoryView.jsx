import { useState, useEffect, Fragment } from "react";
//import ReadOnlyRow from "./components/ReadOnlyRow";
//import EditableRow from "./components/EditableRow";
import { ReadOnlyRow, EditableRow} from './';
const api_base = "http://localhost:3001";

const InventoryView = () => {
    const [inventory, setInventory] = useState([]);
    const [shoppingList, setShoppingList] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [newQty, setNewQty] = useState("");
    const [newUnits, setNewUnits] = useState("");
    const [newLocation, setNewLocation] = useState("Pantry");
    const [newExpires, setNewExpires] = useState("");
    const [editingItemId, setEditingItemId] = useState(null)
    const [editedItem, setEditedItem] = useState([])
    const [isAdded, setIsAdded] = useState(false);
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const [editFormData, setEditFormData] = useState({
        item: "",
        quantity: "",
        units: "",
        location: "",
        expires: "",
    })


    useEffect(() => {
        GetInventory();        
    }, [])

    const GetInventory = () => {
        fetch(api_base + "/inventory")
            .then(res => res.json())
            .then(data => setInventory(data))
            .catch(err => console.error("Error: ", err));
    }
    
    const addInventoryItem = async (e)  => {
        e.preventDefault();

        const data = await fetch(api_base + "/inventory/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                item: newItem,
                quantity: newQty,
                units: newUnits,
                location: newLocation,
                expires: newExpires
            })
        }).then(res => res.json());

        setInventory([...inventory, data])
        setNewItem("");
        setNewQty("");
        setNewUnits("");
        setNewLocation("");
        setNewExpires("");
    }
    
    const handleEditClick = (e, item) => {
        e.preventDefault();
        //item here = item._id
        setEditingItemId(item)
        const itemToFind = item
        const itemToEdit = inventory.find(item => item._id === itemToFind)
        //console.log(itemToEdit)
        
        const formValues = {
            item: itemToEdit.item,
            quantity: itemToEdit.quantity,
            units: itemToEdit.units,
            location: itemToEdit.location,
            expires: itemToEdit.expires,
        }
        setEditFormData(formValues);
    }

    const handleEditFormChange = (e) => {
        e.preventDefault();

        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] =  fieldValue;

        setEditFormData(newFormData);
    }
    
    const handleEditFormSubmit = async (e) => {
        e.preventDefault();

        const editedData = {
            _id: editingItemId,
            item: editFormData.item,
            quantity: editFormData.quantity,
            units: editFormData.units,
            location: editFormData.location,
            expires: editFormData.expires,
        }
    try {
        const res = await fetch(api_base + `/inventory/update/${editingItemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedData)
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        // Update state with edited data
        const updatedData = await res.json();
        const newItem = [...inventory];
        const index = inventory.findIndex((item) => item._id === updatedData._id);
        newItem[index] = updatedData;
        setInventory(newItem);
        setEditingItemId(null);

    } catch (e) {
        console.log(e);
    }

    // Fetch updated data
    try {
        const res = await fetch(api_base + "/inventory");
        const data = await res.json();
        setInventory(data);
    } catch (e) {
        console.log(e);
    }
}

    const cancelEditing = () => {
        setEditingItemId(null)
    }
    

    const deleteInventoryItem = async (e, item) => {
        e.preventDefault();
        
        const data = await fetch(api_base + '/inventory/delete/' + item, {
            method: "DELETE"
        }).then(res => res.json());

        setInventory(inventory => inventory.filter(item => item._id !== data.result._id))
        
        e.stopPropagation();
        
    }

    const completeInventoryItem = async (id) => {
        const data = await fetch(api_base + "/inventory/complete/" + id)
            .then(res => res.json());

            setInventory(inventory => inventory.map(item => {
                if(item._id === data._id) {
                    item.complete = data.complete;
                }

                return item;
            }));
    }
 
  const addToList = async (e)  => {
    e.preventDefault();

 
    const itemRow = e.target.closest("tr");
    const item = itemRow.children[0].textContent;
    const qty = itemRow.children[1].textContent;
    const units = itemRow.children[2].textContent;
    const location = itemRow.children[3].textContent;
    const expires = itemRow.children[4].textContent;
  
    const shoppingList = await fetch(api_base + "/shoppingList")
    .then(res => res.json());

  // Check if the item already exists in the shopping list
  const itemExists = shoppingList.some(listItem => listItem.item === item);

  if (!itemExists) {
    // Add the item to the shopping list if it doesn't already exist
    const data = await fetch(api_base + "/shoppingList/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        item: item,
        quantity: qty,
        units: units,
        location: location,
        expires: expires
      })
    }).then(res => res.json());

    setIsAdded(true);
  } else {
    setAlreadyAdded(true);
  }
}
  
	return (
        <div className="App app-container">
            <h1>Welcome</h1>
            <h4>Inventory</h4>
                <form>
                    <table>
                        <thead>
                            <tr>
                                {/*<th className="firstColumn"><button onClick={selectAllCheckboxes}>Select All</button></th>*/}
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Units</th>
                                <th>Location</th>
                                <th>Expires</th>
                                <th colSpan="3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.length > 0 ? inventory.map(item => (
                                <Fragment key={item._id}>
                                    {editingItemId === item._id ? (
                                        <EditableRow item={item} cancelEditing={cancelEditing} editedItem={editedItem} setEditedItem={setEditedItem} editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleEditFormSubmit={handleEditFormSubmit}/> 
                                    ) : (
                                        <ReadOnlyRow item={item} handleEditClick={handleEditClick} deleteInventoryItem={deleteInventoryItem} addToList={addToList} isAdded={isAdded} alreadyAdded={alreadyAdded}/>
                                    )}
                                </Fragment>
                            )) : (
                                <tr>
                                    <td colSpan="8">You currently have no items in inventory</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </form>
            {/*<button className="actionButtons transferButton" onClick={handleSubmit}>Transfer</button>*/}
            
            <h3>Add an Item to your Inventory</h3>
            <form className="container" onSubmit={addInventoryItem}>            
                <input type="text" placeholder="Item" value={newItem} onChange={e => setNewItem(e.target.value)} />
                <input type="number" placeholder="Qty" value={newQty} onChange={e => setNewQty(e.target.value)} />
                <input type="text" placeholder="Units" value={newUnits} onChange={e => setNewUnits(e.target.value)} />
                <select value={newLocation} onChange={(e) => setNewLocation(e.target.value)}>
                    <option value="Pantry">Pantry</option>
                    <option value="Refrigerator">Refrigerator</option>
                    <option value="Cabinet">Cabinet</option>
                </select>
                <input type="date" placeholder="Expires" value={newExpires} onChange={e => setNewExpires(e.target.value)}  />
                <button type="submit">Add Item</button>
            </form>
            
                    

		</div>
	);
}

export default InventoryView

