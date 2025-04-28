# Point of Sale (POS) System

**Live Demo:**  
👉 (https://t-cell-point-of-sale.netlify.app/)

---

## 📋 Project Overview

This project is a web-based Point of Sale (POS) system built using **React** for the frontend. It enables users in a retail environment to manage product listings, process customer purchases, and record completed sales.

The system provides essential POS functionalities like browsing products, managing a shopping cart, performing a checkout that updates backend sales records, and navigating through a user-friendly dashboard. It’s built to be responsive, clean, and easy to extend in future versions (e.g., adding authentication, live stock management, etc.).

---

## ✨ Features

- **Product Management**  
  Browse products fetched from a live backend API, displaying details like name, category, stock, selling price, purchase price, unit, and images.

- **Shopping Cart**

  - Add products to cart
  - Adjust quantities (with validation against available stock)
  - Remove products

- **Checkout with Backend Sale Recording**

  - Captures complete sale details (timestamp, products, quantities, total)
  - Sends sale data to the backend to persist the transaction.

- **Product Filtering and Sorting**

  - Search products by name, category, ID, price, or unit
  - Sort by name, price, category, or stock (ascending/descending)

- **Dashboard Navigation**

  - Quickly return to the dashboard to view other system features.

- **Responsive Design**
  - Mobile-first styling for smooth usage on smartphones, tablets, and desktops.

---

## ⚙️ Tech Stack

| Area                 | Tech Used                                             |
| :------------------- | :---------------------------------------------------- |
| **Frontend**         | React, Vite                                           |
| **Styling**          | Custom CSS (no frameworks like Bootstrap/Material UI) |
| **Backend**          | dummy db.json (hosted on Render)                      |
| **State Management** | React Hooks (useState, useEffect)                     |
| **Routing**          | React Router                                          |

---

## 🌐 Hosted Backend API

- Products: [`https://t-cell-point-of-sale-backend.onrender.com/products`](https://t-cell-point-of-sale-backend.onrender.com/products)
- Sales (Checkout): [`https://t-cell-point-of-sale-backend.onrender.com/sales`](https://t-cell-point-of-sale-backend.onrender.com/sales)

---

## 🛠 Future Improvements

Implement user authentication for secure cashier/manager access

Live stock updating after sales

Product creation, editing, and deletion from an Admin Panel

Print or export sales receipts

Analytics dashboard for daily/weekly sales insights

PWA support for offline usage in physical stores

## 🤝 Contribution

Pull requests are welcome! If you would like to contribute, please fork the repository and submit a pull request.

## 📄 License

This project is open-source under the MIT License.
