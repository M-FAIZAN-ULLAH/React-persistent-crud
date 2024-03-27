import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataTable from './components/DataTable';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DataTable/>} />   
            </Routes>
        </BrowserRouter>
    );
};

export default App;
