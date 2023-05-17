import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationForm = () => {
  const host = "https://provinces.open-api.vn/api/";
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [result, setResult] = useState("");

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

  return (
    <div className="container">
      <h1>Chọn danh sách tỉnh</h1>
      <form>
        <select value={selectedProvince.code || ""} onChange={handleProvinceChange}>
          <option value="">chọn tỉnh</option>
          {provinces.map((province) => (
            <option key={province.code} value={province.code}>{province.name}</option>
          ))}
        </select>
        <select value={selectedDistrict.code || ""} onChange={handleDistrictChange}>
          <option value="">chọn quận</option>
          {districts.map((district) => (
            <option key={district.code} value={district.code}>{district.name}</option>
          ))}
        </select>
        <select value={selectedWard.code || ""} onChange={handleWardChange}>
          <option value="">chọn phường/xã</option>
          {wards.map((ward) => (
            <option key={ward.code} value={ward.code}>{ward.name}</option>
          ))}
        </select>
        <button type="button" onClick={handlePrintResult}>Print Result</button>
      </form>
      <div>
        <h2>Result:</h2>
        <p>{result}</p>
        <h1>{selectedProvince?.name}</h1>
        <h1>{selectedProvince?.name}</h1>

      </div>
    </div>
  );
};
export default LocationForm;
