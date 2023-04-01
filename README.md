# Front end for Stock app for displaying various market information.

## Backend located https://github.com/smillane/StockAppBackend

### Current Roadmap:

- Add equity to watchlist (button next to stock name at top, try styling to be on bottom, not centered)
  - use Modal for pop up to select which lists to add to, or create a new list (will replace option with a box to create list name with a cancel and create list button)

- Create sorting option for highest/lowest on homepage for most active/gainers/losers/unusual volume box

- Finish dividends, insider transactions, institutional ownership pages

- Adjust vertical spacing on some parts of stocks/{stock} page


### Future Roadmap

- add SEC documents using edgar

- if query not found, add logic to not save to db, and return 404 not found page.

- create feature which checks https://iexcloud.io/docs/api/#u-s-holidays-and-trading-dates every month, updates upon changes, look into if any API endpoints shouldn't be queried (depending on data in db's?)

- Add logic for if nothing found in db, populate with last 4, 8, etc for endpoints such as past dividends, insider transactions

- create logic for a skeleton loading screen when logging in

- create logic for skeleton loading containers for when assets are loading from backend

- use caching to to not fetch data for daily lists more than once every 5 minutes, empty cache after 5 minutes and refetch data

- have display on index page for pre/post market gainers/losers, display pre market movers if time is between 4am and 4pm Eastern, else show post market movers by default

- create notification system for when new features/changes get pushed

- create logic for fetching data from backend (once site ready for beta launch)