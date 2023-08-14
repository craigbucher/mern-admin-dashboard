import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// use Redux Toolkit Query:
// create api 'slice':
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",  // ????????
  // tags are just a name that you can give to a specific collection of data 
  // to control caching and invalidation behavior for re-fetching purposes. 
  // It can be considered as a 'label' attached to cached data that is read after a 
  // mutation, to decide whether the data should be affected by the mutation
  tagTypes: [
    "User",
    "Products",
    "Customers", 
    "Transactions", 
    "Geography", 
    "Sales", 
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,  // localhost:5001/general/user/<id>
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "client/products",       // localhost:5001/client/products
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",      // localhost:5001/client/customers
      providesTags: ["Customers"],
    }),
    // need to use this format if need/want to use params:
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",         // localhost:5001/client/transactions
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",      // localhost:5001/client/geography
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",      // localhost:5001/client/geography
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",      // localhost:5001/management/admins
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,   // localhost:5001/management/performance/<id>
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",     // localhost:5001/general/dashboard
      providesTags: ["Dashboard"],
    }),
  }),
});


export const {
  useGetUserQuery,            // getUser endpoint
  useGetProductsQuery,        // getProducts endpoint
  useGetCustomersQuery,       // getCustomer endpoint
  useGetTransactionsQuery,    // getTransactions endpoint
  useGetGeographyQuery,       // getGeography endpoint
  useGetSalesQuery,           // getSales endpoint
  useGetAdminsQuery,          // getAdmins endpoint
  useGetUserPerformanceQuery, // getUserPerformance endpoint
  useGetDashboardQuery,       // getDashboard endpoint
} = api;