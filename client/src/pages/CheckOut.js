import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../redux/apiRequest';
import { clearCart } from '../redux/apiRequest';

const CheckOut = () => {
  const host = 'https://provinces.open-api.vn/api/';
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [result, setResult] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');

  useEffect(() => {
    callAPI(`${host}?depth=1`);
  }, []);

  const callAPI = (api) => {
    axios
      .get(api)
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const callApiDistrict = (api) => {
    axios
      .get(api)
      .then((response) => {
        setDistricts(response.data.districts);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const callApiWard = (api) => {
    axios
      .get(api)
      .then((response) => {
        setWards(response.data.wards);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleProvinceChange = (event) => {
    const selectedProvinceCode = event.target.value;
    const selectedProvinceName = event.target.options[event.target.selectedIndex].text;
    setSelectedProvince({ code: selectedProvinceCode, name: selectedProvinceName });
    callApiDistrict(`${host}p/${selectedProvinceCode}?depth=2`);
    setSelectedDistrict('');
    setSelectedWard('');
    setResult('');
  };

  const handleDistrictChange = (event) => {
    const selectedDistrictCode = event.target.value;
    const selectedDistrictName = event.target.options[event.target.selectedIndex].text;
    setSelectedDistrict({ code: selectedDistrictCode, name: selectedDistrictName });
    callApiWard(`${host}d/${selectedDistrictCode}?depth=2`);
    setSelectedWard('');
    setResult('');
  };

  const handleWardChange = (event) => {
    const selectedWardCode = event.target.value;
    const selectedWardName = event.target.options[event.target.selectedIndex].text;
    setSelectedWard({ code: selectedWardCode, name: selectedWardName });
    setResult('');
  };

  const handlePrintResult = () => {
    const selectedProvinceName = selectedProvince?.name;
    const selectedDistrictName = selectedDistrict?.name;
    const selectedWardName = selectedWard?.name;

    if (selectedProvinceName && selectedDistrictName && selectedWardName) {
      const result = `${selectedProvinceName} | ${selectedDistrictName} | ${selectedWardName}`;
      setResult(result);
    }
  };
  const cartData = useSelector((state) => state.cart.carts?.allCarts);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  function handleFormSubmit(Name, Address, phoneNumber) {
    console.log(Name, Address, phoneNumber);
    const newItem = {
      userId: user.others._id,
      items: cartData?.items,
      deliveryInformation: {
        name: Name,
        address: Address,
        phoneNumber: phoneNumber,
      },
    };

    createOrder(user.accessToken, newItem, dispatch);
    clearCart(user.accessToken, user.others._id, dispatch, navigate);
    navigate('/');

    setName('');
    setAddress('');
    setPhoneNumber('');
  }

  return (
    <div className="container mx-auto p-10">
  <div className="flex flex-col gap-4">
    <div className="flex flex-col md:flex-row items-center gap-4">
      <label className="text-lg font-medium">Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="border border-gray-300 rounded px-4 py-2" />
    </div>
    <div className="flex flex-col md:flex-row items-center gap-4">
      <select
        value={selectedProvince.code || ''}
        onChange={handleProvinceChange}
        className="border border-gray-300 rounded px-4 py-2"
        style={{ width: '50%' }}

      >
        <option value="">Province</option>
        {provinces.map((province) => (
          <option key={province.code} value={province.code}>
            {province.name}
          </option>
        ))}
      </select>
      <select
        value={selectedDistrict.code || ''}
        onChange={handleDistrictChange}
        className="border border-gray-300 rounded px-4 py-2"
        style={{ width: '50%' }}

      >
        <option value="">District</option>
        {districts.map((district) => (
          <option key={district.code} value={district.code}>
            {district.name}
          </option>
        ))}
      </select>
      <select
        value={selectedWard.code || ''}
        onChange={handleWardChange}
        className="border border-gray-300 rounded px-4 py-2"
        style={{ width: '50%' }}

      >
        <option value="">Ward</option>
        {wards.map((ward) => (
          <option key={ward.code} value={ward.code}>
            {ward.name}
          </option>
        ))}
      </select>
    </div>
    <div className="flex flex-col md:flex-row items-center gap-4">
      <label className="text-lg font-medium">Address:</label>
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="border border-gray-300 rounded px-4 py-2" />
    </div>
    <div className="flex flex-col md:flex-row items-center gap-4">
      <label className="text-lg font-medium">Phone Number:</label>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
        className="border border-gray-300 rounded px-4 py-2"
      />
    </div>
    <div className="flex justify-center">
      <button
        onClick={() =>
          handleFormSubmit(
            name,
            address + ',' + selectedWard?.name + ',' + selectedDistrict?.name + ',' + selectedProvince?.name,
            phoneNumber
          )
        }
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded px-4 py-2"
      >
        Submit
      </button>
    </div>
  </div>
</div>

  );
};

export default CheckOut;
