import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ firstname, lastname, email, password, username }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/api/auth/register', { firstname, lastname, email, password, username }, config);
      return res.data; // Trả về dữ liệu từ response
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post('/api/auth/login', { email, password }, config);
      const data = res.data;

      localStorage.setItem('userToken', data.token); // Lưu token vào localStorage
      return data; // Trả về dữ liệu từ response
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Sửa đổi hàm getUserDetails với header Authorization là Bearer token
export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.userToken}`, // Thêm Bearer token
        },
      };
      const { data } = await axios.get('/api/auth/user', config); // Giả sử bạn có một endpoint khác để lấy thông tin người dùng
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Sửa đổi hàm updateUser với header Authorization là Bearer token
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.userToken}`, // Thêm Bearer token
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.put(`/api/auth/${auth.userInfo._id}`, userData, config);
      const data = res.data;
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Phần còn lại của authSlice không cần thay đổi
const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    error: false,
    loading: false,
    userInfo: null,
    userToken,
    success: false,
    errMsg: '',
    userErrorMsg: '',
    userUpdateError: false,
    userUpdateErrorMsg: '',
    editable: false,
    updating: false,
  },
  reducers: {
    removeError: (state) => {
      state.error = false;
    },
    enableUpdate: (state) => {
      state.editable = !state.editable;
    },
    cancelUpdate: (state) => {
      state.editable = false;
    },
    logout: (state) => {
      localStorage.removeItem('userToken'); // Xóa token khỏi storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.errMsg = payload.msg ? payload.msg : payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload.user; // Đảm bảo payload có trường user
        state.userToken = payload.token;
        state.errMsg = '';
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.errMsg = payload.msg ? payload.msg : payload;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.userErrorMsg = '';
      })
      .addCase(getUserDetails.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.userErrorMsg = payload.msg ? payload.msg : payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.updating = true;
        state.userUpdateError = false;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.updating = false;
        state.userInfo = payload;
        state.userUpdateErrorMsg = '';
        state.editable = false;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.updating = false;
        state.userUpdateError = true;
        state.userUpdateErrorMsg = payload.msg ? payload.msg : payload;
        state.editable = false;
      });
  },
});

export const { removeError, enableUpdate, cancelUpdate, logout } = authSlice.actions;
export default authSlice.reducer;
