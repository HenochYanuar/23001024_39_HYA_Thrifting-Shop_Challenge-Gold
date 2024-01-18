# 23001024_39_HYA_Thrifting-Shop_Challenge-Gold
This project was created to fulfill the requirements for passing the gold level Full-Stack Web Development course at Binar Academy, with an application entitled Thrifting Shop. This project was developed using simple programming logic, because it was developed by a beginner HAHAHA....

## Navigation
- [Navigation](#navigation)
- [Package Used](#package-used)
- [Package Installation](#package-installation)
- [Application Features](#application-features)
- [Areas for Improvement](#areas-for-improvement)
- [Before Use](#before-use)

## Package Used
- [express ^4.18.2](https://www.npmjs.com/package/express)
- [express-ejs-layouts ^2.5.1](https://www.npmjs.com/package/express-ejs-layouts)
- [ejs ^3.1.9](https://www.npmjs.com/package/ejs)
- [express-session ^1.17.3](https://www.npmjs.com/package/express-session)
- [body-parser ^1.20.2](https://www.npmjs.com/package/body-parser)
- [nodemon ^3.0.2](https://www.npmjs.com/package/nodemon)
- [nodemailer ^6.9.7](https://www.npmjs.com/package/nodemailer)
- [knex.js ^3.1.0](https://www.npmjs.com/package/knex)
- [node-postgres ^8.11.3](https://www.npmjs.com/package/pg)
- [multer ^1.4.5-lts.1](https://www.npmjs.com/package/multer)
- [method-override ^3.0.0](https://www.npmjs.com/package/method-override)
- [node.bcrypt.js ^5.1.1](https://www.npmjs.com/package/bcrypt)
- [bootstrap 4.6](https://getbootstrap.com/docs/4.6/getting-started/introduction/)

## Package Installation
```bash
npm install express express-ejs-layouts ejs express-session body-parser nodemon nodemailer knex pg multer method-override bcrypt
```

## Application Features

### User Authentication
- **Registration and Verification**: Users can register and verify their accounts.
- **Login Process**: The system can accept or reject user login attempts.

### Product Display
- **All Unsold Items**: View all items currently available for sale by all users.
- **Search Functionality**: Search for items based on keywords.

### Checkout Process
- **General Users**: Clicking on checkout leads to the checkout page.
- **Seller Redirect**: Sellers are directed to the item details page when accessing checkout.

### User Profile Management
- **Update Profile**: Logged-in users can update their profile information, including their photo.
- **Address Management**: Add, update, view, and delete addresses.

### Buying and Selling
- **Buy and Sell Items**: Logged-in users can buy and sell items.
- **Manage Listings**: Add, update, view, and delete listings.

### Product Status
- **Sold Items**: Sellers cannot update or delete items that have been purchased.
- **Display Overview**: Show items currently for sale, sold items, and items purchased by the user.

### Detailed Product Information
- **Differentiated Details**: Display different data for items based on their status when clicked.

### Redirection for Address Management
- **Checkout**: Redirects to the address addition page if the user clicks 'Buy' without a registered address.
- **Add Listing**: Redirects to the address addition page when adding a new listing without a registered address.

## Areas for Improvement

### Transaction Features
- **Payment Integration**: No current support for transactions with designated payment methods.

### User Interaction
- **Visit Specific Stores**: Unable to visit a specific user's store or view their product list.

### Product Listings
- **Single Image per Product**: Currently limited to listing only one photo per product.
- **Limited Product Details**: Product details are currently limited.

### User Experience
- **Responsiveness**: The application needs improvement in terms of responsiveness.

### Miscellaneous
- **Other Improvements**: There are additional areas for improvement.

## Before Use
This application uses PostgreSQL as a database. need to change the file name in knexfileExample.js to knexfile.js and mailerConfigExample.js in the ./utils directory to mailerConfig.js, then update the configuration of both files with your own configuration before using them.
