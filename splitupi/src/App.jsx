import { Routes, Route, Navigate } from 'react-router-dom';
import QRCodeDisplay from './Components/QRCodeDisplay.jsx';
import Amount_input from './Components/Amount_input.jsx';
import People_input from './Components/People_input.jsx';

function App() {
    const upiLink = "upi://pay?pa=merchant@bank&pn=MerchantName&am=123.45";

  return (
    <Routes>
      <Route path="/" element={<Amount_input />} />
      <Route path="/people" element={<People_input />} />
      <Route path="/qr" element={<  QRCodeDisplay upiLink={upiLink} />} />
    </Routes>
  );
}

export default App;
