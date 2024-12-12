import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import db from '../firebase';

const Dashboard = ({ onLogout }) => {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState('');
  const [editRecord, setEditRecord] = useState({ id: '', value: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'records'), (snapshot) => {
      const recordsData = snapshot.docs.map((doc, index) => ({
        id: doc.id,
        index: index + 1, // For numbering
        ...doc.data(),
      }));
      setRecords(recordsData);
    });
    return () => unsubscribe(); // Cleanup
  }, []);

  const addRecord = async () => {
    try {
      if (newRecord.trim() === '') return;
      await setDoc(doc(collection(db, 'records')), {
        value: newRecord.trim(),
        status: 'active', // Default status is active
      });
      setNewRecord('');
    } catch (error) {
      setError('Failed to add record');
      console.error(error);
    }
  };

  const deleteRecord = async (id) => {
    try {
      await deleteDoc(doc(db, 'records', id));
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const editRecordHandler = async () => {
    try {
      if (editRecord.value.trim() === '') return;
      await updateDoc(doc(db, 'records', editRecord.id), {
        value: editRecord.value.trim(),
      });
      setEditRecord({ id: '', value: '' });
    } catch (error) {
      console.error('Error editing record:', error);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await updateDoc(doc(db, 'records', id), { status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Todo List App</h1>
        <button className="btn btn-danger" onClick={onLogout}>
          Logout
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Input Field */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Your Name"
          value={newRecord}
          onChange={(e) => setNewRecord(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addRecord}>
          Add User
        </button>
      </div>

      {/* Table */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Your Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.index}</td>
              <td>{record.value}</td>
              <td>
                <button
                  className={`btn btn-sm ${
                    record.status === 'active' ? 'btn-success' : 'btn-secondary'
                  }`}
                  onClick={() => toggleStatus(record.id, record.status)}
                >
                  {record.status === 'active' ? 'Active' : 'Inactive'}
                </button>
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => setEditRecord({ id: record.id, value: record.value })}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteRecord(record.id)}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form */}
      {editRecord.id && (
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Edit User Name"
            value={editRecord.value}
            onChange={(e) => setEditRecord({ ...editRecord, value: e.target.value })}
          />
          <button className="btn btn-success" onClick={editRecordHandler}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
