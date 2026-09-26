# Project Name

AE Beans

## Overview

A specialized e-commerce platform that bridges specialty coffee roasters/suppliers and customers by offering a curated catalog of Coffee Beans and Coffee Tools, complete with user management, logistics tracking, and order processing.

## Screenshots

## Technologies Used

- CSS
- JS
- EJS
- MongoDB
- Express
- NodeJS

## Getting Started

Follow these steps to clone and run the project locally on your machine.

### 1. Clone the Repository

```bash
git clone [https://github.com/aalebreeq1/ae-beans.git](https://github.com/aalebreeq1/ae-beans.git)
cd ae-beans

```

### 2. Install Dependencies

Install all required Node packages:

```bash
npm i

```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env

```

Add your configuration settings inside `.env`:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/ae-beans

```

### 4. Start MongoDB

Ensure your local MongoDB instance or database service is active and running.

### 5. Run the Application

Start the development server:

```bash
nodemon server.js

```

### 6. View in Browser

Open your browser and navigate to:

```text
http://localhost:3000

```

## User Stories

1. As a customer, I want to login using my username and password.
2. As a customer, I want to view the catalog of active coffee beans and coffee tools.
3. As a customer, I want to place a new order by selecting items and choosing a shipping company.
4. As a customer, I want to view my order history and check my order status.
5. As an admin, I want to access a secure admin dashboard to monitor overall platform activities.
6. As an admin, I want to create, update, and soft-delete coffee beans and coffee tools.
7. As an admin, I want to manage shipping companies by adding, updating, or soft-deleting logistics partners.
8. As an admin, I want to view all system orders and manage their assignment or status.
9. As a shipping company user, I want to access a dedicated shipping dashboard to view deliveries assigned to my company.
10. As a shipping company user, I want to update the delivery progress and status of active orders assigned to me.

## Database Design

![alt text](<Project2 ERD.png>)

## Routes

### Beans Model Routes

| Method | Route               | Description                                                  |
| ------ | ------------------- | ------------------------------------------------------------ |
| GET    | `/beans`            | View the catalog list of active coffee beans.                |
| GET    | `/beans/create`     | View the form to add a new coffee bean.                      |
| POST   | `/beans`            | Submit the new bean form data to save it.                    |
| GET    | `/beans/:id/edit`   | View the update form pre-filled with a specific bean's data. |
| POST   | `/beans/:id/update` | Submit the updated bean data.                                |
| POST   | `/beans/:id/delete` | Trigger the soft delete (isDeleted: true) for a bean.        |

### Coffee Tools Routes

| Method | Route                      | Description                                      |
| ------ | -------------------------- | ------------------------------------------------ |
| GET    | `/coffee-tools`            | View the list of active coffee gear and tools.   |
| GET    | `/coffee-tools/create`     | View the form to add a new coffee tool.          |
| POST   | `/coffee-tools`            | Submit the new coffee tool form data to save it. |
| GET    | `/coffee-tools/:id/edit`   | View the update form for a specific tool.        |
| POST   | `/coffee-tools/:id/update` | Submit the updated coffee tool data.             |
| POST   | `/coffee-tools/:id/delete` | Trigger the soft delete for a coffee tool.       |

### Shippign Company Routes

| Method | Route                            | Description                                       |
| ------ | -------------------------------- | ------------------------------------------------- |
| GET    | `/shipping-companies`            | View the list of logistics and shipping partners. |
| GET    | `/shipping-companies/create`     | View the form to add a new shipping company.      |
| POST   | `/shipping-companies`            | Submit the new shipping company form data.        |
| GET    | `/shipping-companies/:id/edit`   | View the form to update a shipping company.       |
| POST   | `/shipping-companies/:id/update` | Submit the updated shipping company data.         |
| POST   | `/shipping-companies/:id/delete` | Trigger the soft delete for a shipping company.   |

### Orders Routes

| Method | Route                | Description                                                                            |
| ------ | -------------------- | -------------------------------------------------------------------------------------- |
| GET    | `/orders`            | View the list of orders.                                                               |
| GET    | `/orders/create`     | View the checkout/order placement form, including item and shipping company selection. |
| POST   | `/orders`            | Submit the final order form to create the order.                                       |
| GET    | `/orders/:id/edit`   | View the form to update an order's status or shipping details.                         |
| POST   | `/orders/:id/update` | Submit the updated order status/details.                                               |
| POST   | `/orders/:id/delete` | Trigger the soft delete/cancellation of an order.                                      |

## Features

Browse specialty coffee beans and brewing equipment.

Place orders with multiple items and select a shipping partner.

Three user roles: Customer, Admin, and Shipping Company.

Admin Dashboard to manage products, users, orders, and logistics.

Shipping Company Dashboard to view and update delivery statuses.

Safe product archiving using soft deletes (isDeleted).

Built using Node.js, Express, MongoDB, EJS, and CSS.

### Core & Main Views

| File                  | Requirements                                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `views/homepage.ejs`  | Welcome banner introducing **AE Beans** (specialty coffee and equipment).<br>Quick links/CTA buttons to `/beans` and `/coffee-tools`. |
| `views/dashboard.ejs` | Admin-only overview panel.<br>Quick action buttons to `/beans/create`, `/coffee-tools/create`, and `/shipping-companies/create`.      |

### Beans Views

| File                           | Requirements                                                                                                                                                                                               |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `views/beans/all-beans.ejs`    | Loop through `allBeans`.<br>Display image (`img_url`), name, roasting date, grading score, and price.<br>Include **View Details** link to `/beans/<%= bean._id %>`.<br>Admin-only **Edit/Delete** options. |
| `views/beans/bean-details.ejs` | Display full bean details: description, tasting notes, country of origin, price, and quantity available.<br>If logged in, provide **Add to Order / Checkout** interaction.                                 |
| `views/beans/create-bean.ejs`  | Form with `POST` action to `/beans`.<br>Fields: `name`, `country_of_origin`, `notes`, `description`, `grading_score`, `price`, `roasting_date`, `quantity`, `img_url`.                                     |
| `views/beans/edit-bean.ejs`    | Pre-populated form using `bean` data.<br>POST action targeting `/beans/<%= bean._id %>/update?_method=PUT`.                                                                                                |

### Coffee Tools Views

| File                           | Requirements                                                                                                         |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `views/tools/all-tools.ejs`    | Loop through `coffeeTools`.<br>Display image, name, category, and price.<br>Link to `/coffee-tools/<%= tool._id %>`. |
| `views/tools/tool-details.ejs` | Display equipment details: category, price, stock quantity, and image.                                               |
| `views/tools/create-tool.ejs`  | Form containing `name`, `category`, `price`, `quantity`, and `img_url`.                                              |
| `views/tools/edit-tool.ejs`    | Pre-populated edit form containing `name`, `category`, `price`, `quantity`, and `img_url`.                           |

### Shipping Companies Views

| File                                          | Requirements                                                                         |
| --------------------------------------------- | ------------------------------------------------------------------------------------ |
| `views/shipping/all-shipping-companies.ejs`   | List partner courier services.<br>Display logo/image, name, and address.             |
| `views/shipping/shipping-company-details.ejs` | Display contact phone number, address, and associated information.                   |
| `views/shipping/create-shipping-company.ejs`  | Form containing `name`, `address`, `phone_number`, and `img_url`.                    |
| `views/shipping/edit-shipping-company.ejs`    | Pre-populated edit form containing `name`, `address`, `phone_number`, and `img_url`. |

### Orders Views

| File                             | Requirements                                                                                                                               |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `views/orders/all-orders.ejs`    | Loop through user `orders`.<br>Display order date, total price, selected shipping company, and ordered items with quantities.              |
| `views/orders/checkout.ejs`      | Checkout form allowing users to review items, select a shipping company, enter `shipping_address`, and submit `POST` request to `/orders`. |
| `views/orders/order-details.ejs` | Detailed receipt for a specific order.<br>Display populated item breakdowns and shipping status.                                           |

## Future Enhancements

## Credits
