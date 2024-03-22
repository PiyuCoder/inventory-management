import axios from "axios";

const url = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const register = async (formData) => {
  try {
    console.log(formData);
    const res = await axios.post(`${url}/api/register`, formData);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const login = async (formData) => {
  try {
    const res = await axios.post(`${url}/api/login`, { formData });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const fetchInventoryAPI = async (token) => {
  try {
    const res = await axios.get(`${url}/api/inventory/fetchInventory`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const addInventory = async (formData, token) => {
  try {
    const res = await axios.post(
      `${url}/api/inventory/add`,
      { formData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error.response;
  }
};

export const updateInventory = async (formData) => {
  try {
    const res = await axios.put(`${url}/api/inventory/update`, { formData });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const saveInvoiceNumber = async (formData, token) => {
  try {
    const res = await axios.post(
      `${url}/api/sales/invoiceNumber`,
      {
        formData: JSON.stringify(formData),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error.response;
  }
};

export const checkInvoiceUniqueness = async (invoiceNumber) => {
  try {
    console.log("state", invoiceNumber);
    const res = await axios.post(`${url}/api/sales/invoiceUnique`, {
      invoiceNumber,
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const getInvoiceData = async (invoiceNumber) => {
  try {
    console.log("state", invoiceNumber);
    const res = await axios.get(
      `${url}/api/sales/invoiceData?invoiceNumber=${invoiceNumber}`
    );
    return res;
  } catch (error) {
    return error.response;
  }
};

export const fetchAllInvoiceData = async (token) => {
  try {
    const res = await axios.get(`${url}/api/sales/allInvoiceData`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    return error.response;
  }
};
