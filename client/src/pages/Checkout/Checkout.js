import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../../redux/apiRequest';
import { clearCart } from '../../redux/apiRequest';


const CheckOut = () => {
  const host = "https://provinces.open-api.vn/api/";
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [result, setResult] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
  const items = JSON.parse(searchParams.get("items"));
  useEffect(() => {
    callAPI(`${host}?depth=1`);
  }, []);

  const callAPI = (api) => {
    axios.get(api)
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const callApiDistrict = (api) => {
    axios.get(api)
      .then((response) => {
        setDistricts(response.data.districts);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const callApiWard = (api) => {
    axios.get(api)
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
    setSelectedDistrict("");
    setSelectedWard("");
    setResult("");
  };

  const handleDistrictChange = (event) => {
    const selectedDistrictCode = event.target.value;
    const selectedDistrictName = event.target.options[event.target.selectedIndex].text;
    setSelectedDistrict({ code: selectedDistrictCode, name: selectedDistrictName });
    callApiWard(`${host}d/${selectedDistrictCode}?depth=2`);
    setSelectedWard("");
    setResult("");
  };

  const handleWardChange = (event) => {
    const selectedWardCode = event.target.value;
    const selectedWardName = event.target.options[event.target.selectedIndex].text;
    setSelectedWard({ code: selectedWardCode, name: selectedWardName });
    setResult("");
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
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  function handleFormSubmit(Name, Address, phoneNumber) {
    // e.preventDefault();
    console.log(Name, Address, phoneNumber)
    const newItem ={
      userId: user.others._id,
      items: items,
      deliveryInformation: {
        name: Name,
        address: Address ,
        phoneNumber: phoneNumber
      }
    }
          createOrder(user.accessToken,newItem,dispatch)
          clearCart(user.accessToken,user.others._id,dispatch, navigate)
          navigate("/")

    
    // Validate the form fields and handle the form submission
    // You can perform validation and further logic as per your requirements

    // Reset the form fields after submission
    setName("");
    setAddress("");
    setPhoneNumber("");
  };

  return (
    <div className="container">
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <select value={selectedProvince.code || ""} onChange={handleProvinceChange}>
          <option value="">Province</option>
          {provinces.map((province) => (
            <option key={province.code} value={province.code}>{province.name}</option>
          ))}
        </select>
        <select value={selectedDistrict.code || ""} onChange={handleDistrictChange}>
          <option value="">District</option>
          {districts.map((district) => (
            <option key={district.code} value={district.code}>{district.name}</option>
          ))}
        </select>
        <select value={selectedWard.code || ""} onChange={handleWardChange}>
          <option value="">Ward</option>
          {wards.map((ward) => (
            <option key={ward.code} value={ward.code}>{ward.name}</option>
          ))}
        </select>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </div>
        {/* <button type="button" onClick={handlePrintResult}>Print Result</button> */}
              <button onClick={() => handleFormSubmit(name,address +","+selectedWard?.name+","+selectedDistrict?.name+","+selectedProvince?.name, phoneNumber)}>Submit</button>
      <div>

      </div>
    </div>
  );
};

export default CheckOut;
