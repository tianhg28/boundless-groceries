
# SMS-based Recipe and Grocery Price Finder

## Overview
This project is an SMS-based application that allows users to inquire about recipes and find the prices of ingredients at local grocery stores. It leverages the Twilio API for SMS communication, the Spoonacular API for fetching recipes, and the Kroger API for obtaining grocery prices. Simply text the program a list of keywords about the recipe you want, choose the recipe using the ID number, and wait for a response containing the price of the recipe at each Kroger grocery store in your area.

## Example User Interation

**Twilio:**  
What do you want to eat?  

**User:**  
healthy vegetarian  

**Twilio:**  
1847920: Healthy Quinoa Salad  
646491: Healthy Mint Brownies  
646499: Healthy Orange Chicken  
665470: Healthy Chocolate Mousse  
646484: Healthy Hazelnut Cookies  
911158: Healthy Blueberry Muffins  
1096214: Healthy Tomato Basil Soup  
646515: Healthy Southwestern Oatmeal  
1096070: Healthy Morning Glory Muffins  
1096198: Healthy Nut & Seed Crispbread 

**User:**  
1847920

**Twilio:**  
Quality Food Center - University Village  
2746 NE 45th St Seattle WA 98105 KING COUNTY  
18.98  

Quality Food Center - Wallingford  
4500 Wallingford Ave N Seattle WA 98103 KING COUNTY  
18.98  

Quality Food Center - Broadway Market  
417 Broadway E # 2 Seattle WA 98102 KING COUNTY  
18.98  

Fred Meyer - Ballard  
915 Nw 45Th St Seattle WA 98107 KING COUNTY  
16.31  

Fred Meyer - Greenwood  
100 NW 85th St Seattle WA 98117 KING COUNTY  
16.31  

**User:**  
 (｡◕‿◕｡)

## Prerequisites
- Node.js and npm
- Ngrok
- Twilio account and an SMS-capable phone number
- Kroger Developer account
- Spoonacular API key

## Setup and Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/tianhg28/boundless-groceries
    cd https://github.com/tianhg28/boundless-groceries
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the project root with the following variables:
    ```
    TWILIO_ACCOUNT_SID=<your-twilio-account-sid>
    TWILIO_AUTH_TOKEN=<your-twilio-auth-token>
    KROGER_CLIENT_ID=<your-kroger-client-id>
    KROGER_CLIENT_SECRET=<your-kroger-client-secret>
    TWILIO_NUMBER=<your-twilio-number>
    USER_NUMBER=<user-number>
    ```

## Running the Application

Send a text initially to the user number:
```bash
node src/app.js
```

Start the server with:
```bash
node src/server.js
```
This will launch the Express server on port 3000.

To make your local server accessible to Twilio, use ngrok:
```bash
ngrok http 3000
```
Then, configure your Twilio phone number's messaging webhook to use the ngrok URL.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
