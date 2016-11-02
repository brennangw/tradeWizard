# tradeWizard

Currently, J.P. Morgan & Chase clients perform the  trading activity at J.P. Morgan to buy or sell certain ETFs manually. This process from a trader's perspective involves receiving an order of certain quantity, and buying or selling in “chunks” over a set period of time. For example, a client can make a request to sell 100K shares of a certain ETF over ten hours, which is noted down manually by the trader. He further responds to the request by selling equally sized bundles of ETF shares throughout the time period of the trade at equidistant intervals. This process is conducted manually, in which a trader enters each one of these “child-trades” over the set period of time, and has a physically written “parent-order” that is required to be completed. In the example above, every five hours the trader is required to manually enter a sell order of 20K shares so that by the end of the day all shares are sold. As evident from the description above, this process is prone to errors as each trader may enter incorrect information that can lead to incorrectly placed orders. Furthermore, this manual method leads to increased time spent on performing trades and failure to fulfill orders within a desired time frame. Hence, the process requires repeatedly submitting trades for each client, which is error-prone and time consuming. 

Trade Wizard is the solution to above problem. We have built a system for our customer, J.P. Morgan to replace the current manual method of servicing their clients with an automated method in the form of a web application. This solution would give time to traders to do less manual work, service higher number of clients, and allow for better practices within the firm. Hence, the system is an automated trading system that allows the trader to simply input details including quantity, side (buy/sell), urgency of the parent-order, select a trading strategy, and place the order. Consequently, child-orders are created and sent when necessary by the algorithm. The trader is then able to monitor the progress of the parent order, as well as all pending child orders.

Specifically, the client requires an algorithm that trades using the two methods:
Immediate Sales: This should execute the bulk order in one go at the market price instantly.
Time-Weighted Average Price: TWAP is an industry term that breaks down a single trade into several smaller transactions to minimize the impact from fluctuations of market price. 												
There are two main benefits provided by our system. First, by automatically breaking down and issuing orders to exchanges the system automates the time consuming and error-prone task that traders would otherwise have to be performed manually. Second, all commands by users and transactions with the exchange will be tracked and recorded, providing greater accountancy for JPMorgan’s trading activities. The result of this will be that JPMorgan can identify better performance trends and consultant an accurate historical account when investigating an issues.

## Technolgies Used:
We have used Meteor framework for full stack development as it is fast and provides several out of box features to build user based web-applications. Meteor is a Javascript based full-stack framework built on Node.js. Our database is Mongo DB hosted on cloud (MLab).

## Connect to Cloud Database:
To connect to cloud database add following environment variable during meteor app startup:

  MONGO_URL=mongodb://dbuser:dbpassword@ds057476.mlab.com:57476/dev
  
Contact bgw2119 at columbia dot edu or ig2333 at columbia dot edu or ag3749 at columbia dot edu for dbusername and dbpassword

