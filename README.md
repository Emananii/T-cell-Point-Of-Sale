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

## 🛠 Installation and Setup (Local Development)

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm (comes with Node.js)

### 2. Clone the Repository

git clone https://github.com/your-username/point-of-sale-system.git
cd point-of-sale-system
install frontend dependencies: npm install
start the development server: npm run dev

## 🛰 Deployment

The frontend is deployed to Netlify.
The backend (mock API) is deployed to Render.

## To Deploy Frontend:
1. Push your code to GitHub.

2. Create a new site on Netlify.

3. Link your GitHub repository.

4. Set build settings:

5. Build command: npm run build

6. Publish directory: dist

7. Click "Deploy".

## To Deploy Backend:

Since the backend uses only a db.json, you can deploy a JSON Server API to Render:

1. Create a GitHub repo with your db.json and package.json.

2. Create a new Web Service on Render.

3. Connect the GitHub repository.

4. Use the following settings:

5. Build Command: npm install

6. Start Command: npm run start

7. Make sure to expose the correct port.

8. Deploy!


## 🛠 Future Improvements

1. Implement user authentication for secure cashier/manager access

2. Live stock updating after sales

3. Product creation, editing, and deletion from an Admin Panel

4. Print or export sales receipts

5. Analytics dashboard for daily/weekly sales insights

6. PWA support for offline usage in physical stores

## 🤝 Contribution

Pull requests are welcome! If you would like to contribute, please fork the repository and submit a pull request.

## 📄 License

This project is open-source under the MIT License.
