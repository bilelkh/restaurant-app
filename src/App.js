import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import ReceiptsList from './components/receiptsList';
import Result from './components/result'
import AddNewIngredients from './components/addNewIngredients'


function App() {
  return (
    <div className="App">
      <NavBar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<ReceiptsList />} />
          <Route path='/receipts-list' element={<ReceiptsList />} />
          <Route path='/result' element={<Result />} />
          <Route path='/add-new-receipt' element={<AddNewIngredients />} />
          <Route path="*" element={<ReceiptsList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
