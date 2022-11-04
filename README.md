Front end for Stock app for displaying various market information.

Backend located https://github.com/smillane/StockAppBackend

Work in progress.

add SEC documents using edgar

if query not found, add logic to not save to db, and return 404 not found page.

https://iexcloud.io/docs/api/#u-s-holidays-and-trading-dates just create dict with those dates?

https://iexcloud.io/docs/api/#list create endpoint for mostactive, gainers, losers

Add logic for if nothing found in db, populate with last 4, 8, etc for endpoints such as past dividends, insider transactions

create logic for a skeleton loading screen when logging in

create logic for skeleton loading containers for when assets are loading from backend

create logic for fetching data from backend

use caching to to not fetch data for daily lists more than once every 5 minutes, empty cache after 5 minutes and refetch data

have display on index page for pre/post market gainers/losers, display pre market movers if time is between 4am and 4pm Eastern, else show post market movers by default