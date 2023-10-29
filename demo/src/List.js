import React, { useState } from "react";
import "./App.css";

// Reusable component for each item in the list
const ListItem = ({ item, onDelete, onUpdate }) => {
  // State for handling editing mode and edited item details
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.name);
  const [editedDescription, setEditedDescription] = useState(item.description);

  // Function to handle updating an item
  const handleUpdate = () => {
    onUpdate(item.id, editedName, editedDescription);
    setIsEditing(false); // Exit editing mode after updating
  };

  return (
    <div className="list-item">
      {isEditing ? (
        // If in editing mode, show input fields and Save button
        <>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            required
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            required
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        // If not in editing mode, display item details, Edit button, and Delete button
        <>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <button className="edit" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="delete" onClick={() => onDelete(item.id)}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

// Main List component
function List() {
  // State to manage the list of items and form input fields
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  // Function to handle form submission and add new items to the list
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      name: itemName,
      description: itemDescription,
    };
    setItems([...items, newItem]);
    setItemName(""); // Clear input fields after adding an item
    setItemDescription("");
  };

  // Function to handle item deletion
  const handleDelete = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  // Function to handle item update
  const handleUpdate = (itemId, updatedName, updatedDescription) => {
    // Map through items and update the specific item by ID
    const updatedItems = items.map((item) =>
      item.id === itemId
        ? { ...item, name: updatedName, description: updatedDescription }
        : item
    );
    setItems(updatedItems); // Set the updated items to the state
  };

  return (
    <>
      <div className="dev">
        <h2>Item List</h2>
        {/* Form to add new items */}
        <form onSubmit={handleFormSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              required
            />
          </label>
          <button type="submit">Add Item</button>
        </form>
        {/* List of items */}
        <div className="item-list">
          {items.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default List;
