import React, { useState } from "react";

const Content = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [taxPercent, setTaxPercent] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [editId, setEditId] = useState(null);
  const [customerName, setCustomerName] = useState("");

  const addItem = () => {
    if (!name || !qty || !price) {
      alert("Please fill all fields!");
      return;
    }

    if (editId) {
      const updated = items.map((item) =>
        item.id === editId
          ? { ...item, name, qty: parseFloat(qty), price: parseFloat(price), unit }
          : item
      );
      setItems(updated);
      setEditId(null);
    } else {
      const newItem = {
        id: Date.now(),
        name,
        qty: parseFloat(qty),
        unit,
        price: parseFloat(price),
      };
      setItems([...items, newItem]);
    }

    setName("");
    setQty("");
    setPrice("");
    setUnit("");
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    setName(itemToEdit.name);
    setQty(itemToEdit.qty);
    setPrice(itemToEdit.price);
    setUnit(itemToEdit.unit);
    setEditId(id);
  };

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const tax = (subtotal * taxPercent) / 100;
  const total = subtotal + tax;

  const handlePrint = () => window.print();

  const finalizeBill = () => {
    if (items.length === 0) {
      alert("Add at least one item!");
      return;
    }
    setIsLocked(true);
  };

  const resetBill = () => {
    setItems([]);
    setCustomerName("");
    setIsLocked(false);
    setEditId(null);
  };

  return (
    <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen font-barlow">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-8 print:p-0 print:shadow-none print:bg-white border border-gray-100">

        {/* Header */}
        <div className="text-center border-b pb-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-t-xl">
          <h1 className="text-4xl font-extrabold uppercase tracking-wide text-gray-800">
            Grocery Store
          </h1>
          {customerName && (
            <p className="text-md text-gray-700 mt-1">
              Customer: <span className="font-semibold">{customerName}</span>
            </p>
          )}
          <p className="text-sm text-gray-600 mt-1">Al Rehman Garden Phase 2, Lahore | Ph: 0331</p>
          <p className="text-xs text-gray-500">Date: {new Date().toLocaleString()}</p>
        </div>

        {/* Customer Name Input */}
        {!isLocked && (
          <div className="no-print mt-6">
            <label className="block text-gray-700 mb-2 font-semibold">Customer Name:</label>
            <input
              type="text"
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none mb-4"
            />
          </div>
        )}

        {/* Add/Edit Item */}
        {!isLocked && (
          <div className="no-print mt-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
              {editId ? "Edit Item" : "Add Item to Bill"}
            </h2>
            <div className="flex flex-wrap gap-3 mb-5 ">
              <input
                type="text"
                placeholder="Item name (e.g. Sugar)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 flex-1 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="number"
                placeholder="Qty"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-24 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="text"
                placeholder="Unit (e.g. kg, pcs)"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-24 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="number"
                placeholder="Price (Rs)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-32 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <button
                onClick={addItem}
                className={`${editId
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-green-600 hover:bg-green-700"
                  } text-white px-5 py-2 rounded-lg shadow transition duration-200`}
              >
                {editId ? "Update" : "Add"}
              </button>
            </div>

            <div className="flex justify-between items-center mb-6">
              <label className="text-sm text-gray-700">Tax Percentage (%):</label>
              <input
                type="number"
                value={taxPercent}
                onChange={(e) => setTaxPercent(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-20 text-center focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          </div>
        )}

        {/* Bill Table */}
        <div className="overflow-hidden pb-4 mt-4 rounded-md ">
          <table className="w-full text-sm ">
            <thead className="bg-gray-200 py-4 ">
              <tr className="text-gray-700">
                <th className="text-left border py-4 px-2">Item</th>
                <th className="text-right border py-4 px-2">Qty</th>
                <th className="text-right py-4 border px-2">Rate</th>
                <th className="text-right py-4 border px-2">Amount</th>
                {!isLocked && <th className="text-center border py-2 px-2 no-print">Action</th>}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr
                  key={item.id}
                  className={`last:border-none ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="py-2 px-2 border break-words" style={{ maxWidth: '25ch' }}>
                    {item.name}
                  </td>
                  <td className="py-2 border px-2 text-right">{item.qty} {item.unit}</td>
                  <td className="py-2 border px-2 text-right">Rs {item.price}</td>
                  <td className="py-2 border px-2 text-right">Rs {(item.qty * item.price).toFixed(2)}</td>
                  {!isLocked && (
                    <td className="py-2 px-2 border text-center no-print space-x-2">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => editItem(item.id)}
                          className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-400 hover:text-blue-800 transition-shadow shadow-sm hover:shadow-md"
                          title="Edit Item"
                        >
                          ✎
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex items-center justify-center w-6 h-6 rounded-md bg-red-100 text-red-600 hover:bg-red-400 hover:text-red-800 transition-shadow shadow-sm hover:shadow-md"
                          title="Remove Item"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-2 text-gray-400 italic">
                    No items added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="mt-5 text-sm bg-gray-50 p-4 rounded-lg border">
          <div className="flex justify-between py-1">
            <span>Subtotal:</span>
            <span>Rs {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Tax ({taxPercent}%):</span>
            <span>Rs {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t mt-3 pt-3 text-gray-800">
            <span>Total:</span>
            <span>Rs {total.toFixed(2)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-500 border-t pt-3">
          Thank you for shopping with us!
        </div>

        {/* Buttons */}
        {!isLocked && (
          <div className="no-print text-center mt-6 space-x-3">
            <button
              onClick={finalizeBill}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
            >
              Finalize Bill
            </button>
            <button
              onClick={resetBill}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-600 transition duration-200"
            >
              Reset
            </button>
          </div>
        )}

        {isLocked && (
          <div className="no-print text-center mt-6 space-x-3">
            <button
              onClick={handlePrint}
              className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition duration-200"
            >
              🖨️ Print Bill
            </button>
            <button
              onClick={resetBill}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-600 transition duration-200"
            >
              New Bill
            </button>
          </div>
        )}
      </div>

      {/* Print Styles */}
      <style>
        {`
          @media print {
            .no-print { display: none !important; }
            body { background: white; }
            table { font-size: 12px; }
          }

          @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700&display=swap');
          .font-barlow { font-family: 'Barlow', sans-serif; }
        `}
      </style>
    </div>
  );
};

export default Content;
