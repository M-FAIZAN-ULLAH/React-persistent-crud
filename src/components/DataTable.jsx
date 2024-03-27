import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Input, Button, Popconfirm, Modal, Form, Space } from 'antd';
import { addData, deleteData, updateData } from '../reducers/reducer'; // Import actions


const DataTable = () => {
  const [newData, setNewData] = useState({ name: '', description: '' });
  const [editRecord, setEditRecord] = useState(null); // State to store currently editing record
  const [isModalVisible, setIsModalVisible] = useState(false); // State for edit modal visibility

  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const loading = useSelector((state) => state.data.loading);
  const error = useSelector((state) => state.data.error);

  const handleAdd = () => {
    dispatch(addData(newData));
    setNewData({ name: '', description: '' });
  };

  const handleDelete = (id) => {
    dispatch(deleteData(id));
  };

  const handleUpdate = (updatedData) => {
    dispatch(updateData(updatedData));
    setEditRecord(null);
    setIsModalVisible(false); // Close modal after successful update
  };

  const handleEdit = (record) => {
    setEditRecord(record);
    setNewData(record);
    setIsModalVisible(true); // Open edit modal
  };

  const handleCancelEdit = () => {
    setEditRecord(null);
    setIsModalVisible(false);
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      render: (record) => (
        <Space size="small">
          <Button type="primary" size="small" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="danger" size="small" style={{color: 'red'}}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
<Form layout="horizontal">
  <Form.Item label="Name">
    <Input value={newData.name} onChange={(e) => setNewData({ ...newData, name: e.target.value })} />
  </Form.Item>
  <Form.Item label="Description">
    <Input value={newData.description} onChange={(e) => setNewData({ ...newData, description: e.target.value })} />
  </Form.Item>
  <Form.Item>
    {editRecord ? (
      <Button type="primary" onClick={handleAdd} disabled>
        Add (Disabled during Edit)
      </Button>
    ) : (
      <Button type="primary" disabled={!newData.name || !newData.description} onClick={handleAdd} >
        Add
      </Button>
    )}
  </Form.Item>
</Form>

<Table columns={columns} dataSource={data} loading={loading} rowKey={(record) => record.id} />
{error && <p>Error: {error}</p>}

<Modal
  title="Edit Record"
  visible={isModalVisible}
  onCancel={handleCancelEdit}
  footer={
    <Button type="primary" onClick={() => handleUpdate(newData)}>
      Update
    </Button>
  }
>
  <Form layout="vertical">
    <Form.Item label="Name">
      <Input value={newData.name} onChange={(e) => setNewData({ ...newData, name: e.target.value })} />
    </Form.Item>
    <Form.Item label="Description">
      <Input value={newData.description} onChange={(e) => setNewData({ ...newData, description: e.target.value })} />
    </Form.Item>
  </Form>
</Modal>
</div>
);
};

export default DataTable;


