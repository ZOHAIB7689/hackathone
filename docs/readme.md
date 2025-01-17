# Comforty

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Schemas](#schemas)
4. [API Endpoints](#api-endpoints)
5. [CMS Integration](#cms-integration)

## Project Overview
[Overview image](/docs/images/preview.png)
Comforty is a sleek, modern e-commerce platform specializing in high-quality, ergonomic chairs. Designed to provide a premium shopping experience, Comforty leverages the latest technologies to create a seamless and efficient marketplace. 

The platform focuses on dynamic infrastructure, ensuring robust management of products, customers, orders, shipments, and payments. By utilizing **Sanity CMS** for content management, **Next.js** for frontend development, and **Redux Toolkit** for state management, Comforty ensures smooth interaction between users and the system. 

Comforty aims to deliver a user-friendly, visually appealing, and scalable shopping platform with real-time updates, intuitive navigation, and secure transactions. The project reflects a commitment to cutting-edge technology and customer satisfaction. 🚀

---

## System Architecture

### Pages
[Pages](/docs/images/pages.png)
1. **Home Page**: A visually stunning landing page showcasing featured chairs and categories.
2. **Shop Page**: A product exploration section with advanced filtering and search options.
3. **Product Detail Page**: Detailed product descriptions, reviews, and customizable options.
4. **Cart Page**: Real-time cart management with quantity adjustments and pricing updates.
5. **Order Tracking Page**: A page for customers to track their orders using tracking IDs.
6. **Checkout Page**: A secure checkout process integrated with Stripe for payments.
7. **Thank You Page**: Confirmation and gratitude page displayed post-purchase.

### Technologies Used

#### Frontend
- **Next.js**: For building dynamic, server-rendered applications.
- **Tailwind CSS**: For creating responsive and elegant designs.
- **Redux Toolkit**: For efficient state management.

#### Backend
- **Sanity CMS**: For flexible and centralized content management.
- **Clerk**: For user authentication and account handling.

#### APIs
- **ShipEngine API**: For shipment tracking and delivery management.
- **Stripe API**: For secure payment processing.

#### Tools
- **GitHub**: For version control and collaboration.
- **Postman**: For testing and documenting APIs.
- **Vercel**: For fast and reliable deployment.

---

## Schemas
[chair](./images/Schemas%20.png)
### **Chair**
| Field             | Type           | Description                                    |
|-------------------|----------------|------------------------------------------------|
| `id`             | String         | Unique identifier for the chair.              |
| `name`           | String         | Name of the chair.                            |
| `price`          | Number         | Current selling price.                        |
| `stock`          | Number         | Quantity available in stock.                  |
| `description`    | String         | Detailed description of the chair.            |
| `images`         | Array[String]  | List of image URLs for the chair.             |
| `category`       | Reference      | Associated category of the chair.             |
| `createdAt`      | Date           | Chair creation date.                          |
| `slug`           | String         | URL-friendly identifier for the chair.        |
| `rating`         | Number         | Average customer rating.                      |
| `originalPrice`  | Number         | Original price before any discounts.          |
| `colors`         | Array[String]  | Available colors for the chair.               |
| `materials`      | Array[String]  | Materials used in the chair.                  |
| `tags`           | Array[String]  | Searchable tags associated with the chair.    |
| `isFeatured`     | Boolean        | Flag indicating if the chair is a featured product. |
| `isBestSeller`   | Boolean        | Flag indicating if the chair is a best-seller. |
| `specifications` | Object         | Detailed specifications about the chair.      |
| `faqs`           | Array[Object]  | Frequently asked questions about the chair.   |

### **Customer**
| Field         | Type       | Description                     |
|---------------|------------|---------------------------------|
| `customerId` | String     | Unique identifier for the customer. |
| `name`       | String     | Customer's full name.           |
| `email`      | String     | Email address of the customer.  |
| `phone`      | String     | Contact phone number.           |
| `address`    | String     | Residential address.            |
| `city`       | String     | City of residence.              |
| `state`      | String     | State of residence.             |
| `zipCode`    | String     | ZIP or postal code.             |

### **Order**
| Field             | Type           | Description                                    |
|-------------------|----------------|------------------------------------------------|
| `orderId`        | String         | Unique identifier for the order.              |
| `customer`       | Reference      | Customer who placed the order.                |
| `items`          | Array[Object]  | List of chairs in the order.                  |
| `totalAmount`    | Number         | Total cost of the order.                      |
| `status`         | String         | Current order status.                         |
| `shipping`       | Object         | Shipping details.                             |
| `createdAt`      | Date           | Order creation date.                          |
| `updatedAt`      | Date           | Last update date for the order.               |

### **Shipment**
| Field                  | Type           | Description                                |
|------------------------|----------------|--------------------------------------------|
| `shipmentId`          | String         | Unique identifier for the shipment.        |
| `order`               | Reference      | Associated order.                          |
| `carrier`             | String         | Shipping carrier name.                     |
| `status`              | String         | Current status of the shipment.            |
| `trackingId`          | String         | Tracking ID for the shipment.              |
| `estimatedDeliveryDate` | Date         | Expected delivery date.                    |
| `actualDeliveryDate`  | Date           | Actual delivery date.                      |
| `shippingLabel`       | String         | URL of the shipping label.                 |
| `createdAt`           | Date           | Shipment creation date.                    |
| `updatedAt`           | Date           | Last update date for the shipment.         |

### **Category**
| Field         | Type   | Description                     |
|---------------|--------|---------------------------------|
| `name`       | String | Name of the category.           |
| `slug`       | String | URL-friendly identifier.        |

### **Coupon**
| Field         | Type       | Description                     |
|---------------|------------|---------------------------------|
| `code`       | String     | Unique coupon code.             |
| `discountType` | String   | Type of discount (e.g., percentage, flat). |
| `discountValue` | Number   | Value of the discount.          |
| `minPurchase` | Number     | Minimum purchase amount required. |
| `expiryDate` | Date       | Expiration date of the coupon.  |
| `isActive`   | Boolean    | Indicates if the coupon is active. |

---

## API Endpoints
[api endpoints](./images/)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/create-order` | POST | Creates a new order when a customer places an order. |
| `/api/orders` | GET | Fetches all orders (admin functionality). |
| `/api/shipengine/create-label` | POST | Generates a shipping label for an order. |
| `/api/shipengine/get-rates` | GET | Retrieves shipping cost estimates. |
| `/api/shipengine/track-shipment` | GET | Tracks the shipment status. |
| `/api/track-orders` | GET | Allows customers to view their orders. |
| `/api/send/confirmation-email` | POST | Sends a confirmation email for an order. |
| `/api/reviews/[productId]` | POST | Submits a review for a chair. |
| `/api/reviews/[productId]` | GET | Fetches reviews for a specific chair. |

---

## CMS Integration

Sanity CMS is integrated with the Next.js application to provide dynamic content management. The interaction is structured as follows:

1. **Data Management in Sanity:** All product, category, and order data are managed in Sanity's content studio.
2. **Data Fetching:** Next.js uses GROQ queries to fetch structured content via Sanity's API.
3. **Server-side Rendering (SSR):** Dynamic pages like product details and order tracking utilize SSR for fast, up-to-date content.
4. **Static Site Generation (SSG):** Static pages like the homepage and shop categories are pre-rendered at build time.
5. **Real-time Updates:** Sanity webhooks enable instant updates when content changes.

