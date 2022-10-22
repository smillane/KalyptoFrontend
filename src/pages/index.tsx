import React from 'react';
import {
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import {
  Box, Container, Grid, Text, Title, Table, Group, Stack, Divider, Space,
} from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';

import LayoutWithAuth from '../main/node/components/layout.tsx';
import Watchlist from '../main/node/redux/features/userLists/Watchlist.tsx';

const dummyData = [
  {
    datetime: 1665783082000,
    hasPaywall: false,
    headline: 'S&P 500 posts weekly loss on inflation worries; consumer discretionary top loser',
    image: 'https://cloud.iexapis.com/v1/news/image/3Ai04BFpnGBFWFwLjhoKwSpyW7WyQIMYdKf0njw1zuBc',
    imageUrl: 'https://static.seekingalpha.com/cdn/s3/uploads/getty_images/547167450/image_547167450.jpg?io=getty-c-w750',
    lang: 'en',
    provider: 'CityFalcon',
    qmUrl: 'https://seekingalpha.com/news/3891559-sp-500-posts-weekly-loss-on-inflation-worries-consumer-discretionary-top-loser',
    related: 'SPY,IVV,VOO,SPLG,SSO,UPRO',
    source: 'Seeking Alpha',
    summary: 'The S&P 500 (SP500) on Friday posted its fourth weekly loss in five, falling 1.55% for the five-day session',
    symbol: 'SPY',
    url: 'https://cloud.iexapis.com/v1/news/article/3Ai04BFpnGBFWFwLjhoKwSpyW7WyQIMYdKf0njw1zuBc',
    uuid: '3Ai04BFpnGBFWFwLjhoKwSpyW7WyQIMYdKf0njw1zuBc',
    id: 'NEWS',
    key: 'SPY',
    subkey: '3Ai04BFpnGBFWFwLjhoKwSpyW7WyQIMYdKf0njw1zuBc',
    date: 1665783082000,
    updated: 1665786700000,
  },
  {
    datetime: 1665780066000,
    hasPaywall: false,
    headline: '‘Conquer cancer’: Goldman Sachs’ puzzling new recruiting ads leave Wall Street bankers scratching their heads',
    image: 'https://cloud.iexapis.com/v1/news/image/31GzhWfXVAnmHGVHfDaGGo0EJPjoPXtAAKv8zs0AJzGc',
    imageUrl: 'https://nypost.com/wp-content/uploads/sites/2/2022/10/goldman-sachs-cancer-01.jpg?quality=90&strip=all',
    lang: 'en',
    provider: 'CityFalcon',
    qmUrl: 'https://nypost.com/2022/10/14/conquer-cancer-goldman-sachs-new-recruiting-ads-puzzle-bankers/',
    related: 'SPY,IVV,VOO,SPLG,SSO,UPRO',
    source: 'New York Post',
    summary: '"Helping conquer cancer with AI is possible," reads one ad that shows a 20-something woman in a sunny yellow dress, folding her arms and smiling in front of a glass-and-steel skyscraper.',
    symbol: 'SPY',
    url: 'https://cloud.iexapis.com/v1/news/article/31GzhWfXVAnmHGVHfDaGGo0EJPjoPXtAAKv8zs0AJzGc',
    uuid: '31GzhWfXVAnmHGVHfDaGGo0EJPjoPXtAAKv8zs0AJzGc',
    id: 'NEWS',
    key: 'SPY',
    subkey: '31GzhWfXVAnmHGVHfDaGGo0EJPjoPXtAAKv8zs0AJzGc',
    date: 1665780066000,
    updated: 1665783700000,
  },
  {
    datetime: 1665778912000,
    hasPaywall: false,
    headline: 'How major US stock indexes fared Friday 10/14/2022',
    image: 'https://cloud.iexapis.com/v1/news/image/5swaMM6nasvTkrz3mZyWdGok5hoSFta0hV7D9g5QuNB',
    imageUrl: '',
    lang: 'en',
    provider: 'CityFalcon',
    qmUrl: 'https://wnyt.com/business-news/how-major-us-stock-indexes-fared-friday-10-14-2022/',
    related: 'SPY,IVV,VOO,SPLG,SSO,UPRO',
    source: 'WNYT',
    summary: 'Stocks ended broadly lower on Wall Street, leaving most major indexes in the red for the week, as more concerns emerged about inflation. Markets fell after a report showed U.S. consumers raising their expectations for inflation, yet another signal that the Federal Reserve will have to continue aggressively raising interest rates. The strategy raises the risk of a recession. The S&P 500 fell 2.4% Friday. The Dow fell 1.3% and the Nasdaq gave back 3.1%. The yield on the 10-year Treasury note, which influences mortgage rates, is near the highest it’s been since 2008. On Friday: The S&P 500 fell 86.84 points, or 2.4%, to 3,583.07. The Dow Jones Industrial Average fell 403.89 points, or 1.3%, to 29,634.83. The Nasdaq fell 327.76 points, or 3.1%, to 10,321.39. The Russell 2000 index of smaller companies fell 46.01 point, or 2.7%, to 1,682.40. For the week: The S&P 500 is down 56.59 points, or 1.6%. The Dow is up 338.04 points, or 1.2%. The Nasdaq is down 331.02 points, or less than 3.1%. The Russell 2000 is down 19.75 points, or 1.2%.',
    symbol: 'SPY',
    url: 'https://cloud.iexapis.com/v1/news/article/5swaMM6nasvTkrz3mZyWdGok5hoSFta0hV7D9g5QuNB',
    uuid: '5swaMM6nasvTkrz3mZyWdGok5hoSFta0hV7D9g5QuNB',
    id: 'NEWS',
    key: 'SPY',
    subkey: '5swaMM6nasvTkrz3mZyWdGok5hoSFta0hV7D9g5QuNB',
    date: 1665778912000,
    updated: 1665782540000,
  },
  {
    datetime: 1665778242000,
    hasPaywall: false,
    headline: 'Dow Jones drops 404 points as Wall Street takes another hit',
    image: 'https://cloud.iexapis.com/v1/news/image/11ZGait2sPS4G6A0zzJvqQ3C2CVfoviwo5QMJpgz7ybC',
    imageUrl: 'https://cdn.bignewsnetwork.com/cus1665771911405.jpg',
    lang: 'en',
    provider: 'CityFalcon',
    qmUrl: 'https://www.bignewsnetwork.com/news/272923733/dow-jones-drops-404-points-as-wall-street-takes-another-hit',
    related: 'SPY,IVV,VOO,SPLG,SSO,UPRO',
    source: 'Big News Network',
    summary: 'NEW YORK, New York - A day after a massive surge, U.S. stock markets caved in on Friday, sending all the major indices well into the red. The U.S. dollar, meantime, creamed all major currencies. A global financial crisis appears to be taking shape, with inflation out of control, interest rates being spiked aggressively, and a world recession looming. On Friday, British Prime Minister Liz Truss sacked her chancell',
    symbol: 'SPY',
    url: 'https://cloud.iexapis.com/v1/news/article/11ZGait2sPS4G6A0zzJvqQ3C2CVfoviwo5QMJpgz7ybC',
    uuid: '11ZGait2sPS4G6A0zzJvqQ3C2CVfoviwo5QMJpgz7ybC',
    id: 'NEWS',
    key: 'SPY',
    subkey: '11ZGait2sPS4G6A0zzJvqQ3C2CVfoviwo5QMJpgz7ybC',
    date: 1665778242000,
    updated: 1665781860000,
  },
  {
    datetime: 1665777720000,
    hasPaywall: true,
    headline: 'Stocks Close Lower After Wild Surge on Wall Street',
    image: 'https://cloud.iexapis.com/v1/news/image/3eQ0MBTUYNduxyX33c5snBWBwXILnoItj5vpIxgE31uY',
    imageUrl: 'https://images.wsj.net/im-644240/social',
    lang: 'en',
    provider: 'CityFalcon',
    qmUrl: 'https://www.wsj.com/articles/global-stocks-markets-dow-update-10-14-2022-11665745241?reflink=e2twmkts&st=8mxz0vquc8t1odi',
    related: 'SPY,IVV,VOO,SPLG,SSO,UPRO',
    source: 'The Wall Street Journal',
    summary: 'U.S. stocks fell following Thursday’s head-spinning rally that caught many investors by surprise.',
    symbol: 'SPY',
    url: 'https://cloud.iexapis.com/v1/news/article/3eQ0MBTUYNduxyX33c5snBWBwXILnoItj5vpIxgE31uY',
    uuid: '3eQ0MBTUYNduxyX33c5snBWBwXILnoItj5vpIxgE31uY',
    id: 'NEWS',
    key: 'SPY',
    subkey: '3eQ0MBTUYNduxyX33c5snBWBwXILnoItj5vpIxgE31uY',
    date: 1665777720000,
    updated: 1665781340000,
  },
  {
    datetime: 1665777600000,
    hasPaywall: false,
    headline: 'Wall Street tumbles at close, Dow sinks 400 pts',
    image: 'https://cloud.iexapis.com/v1/news/image/TP9IQsUcwtNperyttNSpARVKa7jGoZxiRccBb72SmiJ',
    imageUrl: 'https://cdn.ttweb.net/News/images/271543.jpg?preset=w800_q70',
    lang: 'en',
    provider: 'CityFalcon',
    qmUrl: 'https://breakingthenews.net/Article/Wall-Street-tumbles-at-close-Dow-sinks-400-pts/58771128',
    related: 'SPY,IVV,VOO,SPLG,SSO,UPRO',
    source: 'Breaking the News 24/7',
    summary: "Major stocks on Wall Street registered significant declines at the end of Friday''s session as investors continued to assess the Federal Reserve''s future moves regarding still-hot inflation dat…",
    symbol: 'SPY',
    url: 'https://cloud.iexapis.com/v1/news/article/TP9IQsUcwtNperyttNSpARVKa7jGoZxiRccBb72SmiJ',
    uuid: 'TP9IQsUcwtNperyttNSpARVKa7jGoZxiRccBb72SmiJ',
    id: 'NEWS',
    key: 'SPY',
    subkey: 'TP9IQsUcwtNperyttNSpARVKa7jGoZxiRccBb72SmiJ',
    date: 1665777600000,
    updated: 1665781221000,
  },
  {
    datetime: 1665776974000,
    hasPaywall: false,
    headline: 'Wall Street slides, dollar gains on sterling and yen',
    image: 'https://cloud.iexapis.com/v1/news/image/FQBXDpLMdsFu3Kp7DFpu41i6j3cBFRXrX77QH8vZDtr',
    imageUrl: '',
    lang: 'en',
    provider: 'CityFalcon',
    qmUrl: 'https://financialpost.com/pmn/business-pmn/wall-street-slides-dollar-gains-on-sterling-and-yen',
    related: 'SPY,IVV,VOO,SPLG,SSO,UPRO',
    source: 'Financial Post',
    summary: 'NEW YORK — Wall Street stocks went into reverse after initially gaining at Friday’s open, while the dollar was rising in a volatile session as investors digested Russia’ suggestion that it would ease attacks against Ukraine, the British prime minister’s firing of her finance minister and the start of U.S. earnings season. Sterling fell sharply […]',
    symbol: 'SPY',
    url: 'https://cloud.iexapis.com/v1/news/article/FQBXDpLMdsFu3Kp7DFpu41i6j3cBFRXrX77QH8vZDtr',
    uuid: 'FQBXDpLMdsFu3Kp7DFpu41i6j3cBFRXrX77QH8vZDtr',
    id: 'NEWS',
    key: 'SPY',
    subkey: 'FQBXDpLMdsFu3Kp7DFpu41i6j3cBFRXrX77QH8vZDtr',
    date: 1665776974000,
    updated: 1665780620000,
  },
  {
    datetime: 1665776904000,
    hasPaywall: false,
    headline: 'Wall Street Drops as Inflation Worries Persist',
    image: 'https://cloud.iexapis.com/v1/news/image/1071NQZI47cKm0iBJ70iJUkZQnhkakeVkCUS7kBTD0S9',
    imageUrl: 'https://img.visiontimes.com/2022/10/GettyImages-1433196676-600x400.jpg',
    lang: 'en',
    provider: 'CityFalcon',
    qmUrl: 'https://www.visiontimes.com/2022/10/14/wall-street-drops-as-inflation-worries-persist.html',
    related: 'SPY,IVV,VOO,SPLG,SSO,UPRO',
    source: 'Vision Times',
    summary: 'U.S. stocks dropped on Friday as worsening inflation expectations kept intact worries that the Federal Reserve’s aggressive rate hike path could lead to an economic recession, while investors digested the early stages of earnings season. In what has been a volatile week for stocks, equities opened higher before reversing course after data from he University […]',
    symbol: 'SPY',
    url: 'https://cloud.iexapis.com/v1/news/article/1071NQZI47cKm0iBJ70iJUkZQnhkakeVkCUS7kBTD0S9',
    uuid: '1071NQZI47cKm0iBJ70iJUkZQnhkakeVkCUS7kBTD0S9',
    id: 'NEWS',
    key: 'SPY',
    subkey: '1071NQZI47cKm0iBJ70iJUkZQnhkakeVkCUS7kBTD0S9',
    date: 1665776904000,
    updated: 1665780520000,
  },
  {
    datetime: 1665773854000,
    hasPaywall: false,
    headline: 'Historic S&P 500 Comeback Runs Out Of Steam: What Are The Market Catalysts Ahead?',
    image: 'https://cloud.iexapis.com/v1/news/image/1Z5JEgmfmAikKuE5SbItUvSrFJiy07m6Q83zLpX1Tb1s',
    imageUrl: 'https://cdn.benzinga.com/files/imagecache/1456x800/images/story/2022/10/14/shutterstock_176534375.jpg',
    lang: 'en',
    provider: 'CityFalcon',
    qmUrl: 'https://www.benzinga.com/news/22/10/29273266/historic-s-p-500-comeback-runs-out-of-steam-what-are-the-market-catalysts-ahead',
    related: 'SPY,IVV,VOO,SPLG,SSO,UPRO',
    source: 'Benzinga',
    summary: "The SPDR S&P 500 ETF Trust (NYSE: SPY ) made new 2022 lows this week, but staged a historic intraday recovery following another disappointing batch of inflation data . On Thursday, the U.S. Labor Department reported the consumer price index gained 8.2% in September, exceeding economist estimates of 8.1%. Core CPI inflation, which excludes volatile food and energy prices, was up 6.6% compared to economist estimates of 6.5% . The S&P 500 initially dropped more than 2% to new 52-week lows and the Nasdaq Composite fell as much as 3.2% on Thursday morning before the market mounted a historic comeback, with both indexes finishing the day higher by more than 2%. Thursday marked the S&P 500''s fifth-largest intraday reversal and the Nasdaq''s fourth-largest intraday reversal in history. On Wednesday, the … Full story available on Benzinga.com",
    symbol: 'SPY',
    url: 'https://cloud.iexapis.com/v1/news/article/1Z5JEgmfmAikKuE5SbItUvSrFJiy07m6Q83zLpX1Tb1s',
    uuid: '1Z5JEgmfmAikKuE5SbItUvSrFJiy07m6Q83zLpX1Tb1s',
    id: 'NEWS',
    key: 'SPY',
    subkey: '1Z5JEgmfmAikKuE5SbItUvSrFJiy07m6Q83zLpX1Tb1s',
    date: 1665773854000,
    updated: 1665777500000,
  },
  {
    datetime: 1665772037000,
    hasPaywall: false,
    headline: 'Stocks fall broadly on Wall Street as inflation worries grow',
    image: 'https://cloud.iexapis.com/v1/news/image/AcLh6E3dnqadF6NcsgoSymCjT5Wj45mu4vbeymG78eN',
    imageUrl: 'https://static.ffx.io/images/$zoom_0.4113%2C$multiply_2%2C$ratio_1.777778%2C$width_1059%2C$x_0%2C$y_95/t_crop_custom/c_scale%2Cw_800%2Cq_88%2Cf_jpg/t_afr_no_label_no_age_social_wm/03598d9b4d5877879abcea790f567e70e64e24c8',
    lang: 'en',
    provider: 'CityFalcon',
    qmUrl: 'https://www.afr.com/markets/equity-markets/stocks-fall-broadly-on-wall-street-as-inflation-worries-grow-20221015-p5bpza',
    related: 'SPY,IVV,VOO,SPLG,SSO,UPRO',
    source: 'The Australian Financial Review',
    summary: 'Stocks fell on Wall Street fell sharply as investors weighed the latest updates on inflation expectations, consumer spending and corporate earnings.',
    symbol: 'SPY',
    url: 'https://cloud.iexapis.com/v1/news/article/AcLh6E3dnqadF6NcsgoSymCjT5Wj45mu4vbeymG78eN',
    uuid: 'AcLh6E3dnqadF6NcsgoSymCjT5Wj45mu4vbeymG78eN',
    id: 'NEWS',
    key: 'SPY',
    subkey: 'AcLh6E3dnqadF6NcsgoSymCjT5Wj45mu4vbeymG78eN',
    date: 1665772037000,
    updated: 1665775660000,
  },
];

const dummyDataEarnings = [
  {
    symbol: 'aapl',
    docs: {
      companyName: 'Apple Inc.',
      marketcap: 760334287200,
      week52high: 156.65,
      week52low: 93.63,
      week52highSplitAdjustOnly: null,
      week52lowSplitAdjustOnly: null,
      week52change: 58.801903,
      sharesOutstanding: 5213840000,
      float: null,
      avg10Volume: 2774000,
      avg30Volume: 12774000,
      day200MovingAvg: 140.60541,
      day50MovingAvg: 156.49678,
      employees: 120000,
      ttmEPS: 16.5,
      ttmDividendRate: 2.25,
      dividendYield: 0.021,
      nextDividendDate: '2019-03-01',
      exDividendDate: '2019-02-08',
      nextEarningsDate: '2019-01-01',
      peRatio: 14,
      beta: 1.25,
      maxChangePercent: 153.021,
      year5ChangePercent: 0.5902546932200027,
      year2ChangePercent: 0.3777449874142869,
      year1ChangePercent: 0.39751716851558366,
      ytdChangePercent: 0.36659492036160124,
      month6ChangePercent: 0.12208398133748043,
      month3ChangePercent: 0.08466584665846649,
      month1ChangePercent: 0.009668596145283263,
      day30ChangePercent: -0.002762605699968781,
      day5ChangePercent: -0.005762605699968781,
    },
  },
  {
    symbol: 'amd',
    docs: {
      companyName: 'Advanced Micro Devices Inc.', marketcap: 95790872508, week52high: 167.91, week52low: 55.18, week52highSplitAdjustOnly: 170.63, week52lowSplitAdjustOnly: 57.06, week52change: -0.5142043604442, sharesOutstanding: 1627788560, float: 0, avg10Volume: 104002039, avg30Volume: 94792307, day200MovingAvg: 89.67, day50MovingAvg: 73.1, employees: 13049, ttmEPS: 2.33, ttmDividendRate: 0, dividendYield: 0, nextDividendDate: '', exDividendDate: '', nextEarningsDate: '2022-10-31', peRatio: 30.40415376468924, beta: 2.128288699698357, maxChangePercent: 1.904231609807934, year5ChangePercent: 3.166661714897502, year2ChangePercent: -0.3164315304762121, year1ChangePercent: -0.490230221729946, ytdChangePercent: -0.5992799179833103, month6ChangePercent: -0.3813357464182368, month3ChangePercent: -0.28934585276668, month1ChangePercent: -0.25350127383198, day30ChangePercent: -0.253768601484404, day5ChangePercent: 0.002654992464526248,
    },
  },
  {
    symbol: 'jnj',
    docs: {
      companyName: 'Johnson & Johnson', marketcap: 454848045982, week52high: 184.32, week52low: 153.21, week52highSplitAdjustOnly: 195.91, week52lowSplitAdjustOnly: 158.57, week52change: 0.0695321204836934, sharesOutstanding: 2708215810, float: 0, avg10Volume: 5957593, avg30Volume: 7138185, day200MovingAvg: 172, day50MovingAvg: 171.62, employees: 139952, ttmEPS: 6.97, ttmDividendRate: 4.465630718907226, dividendYield: 0.026838607231768796, nextDividendDate: '', exDividendDate: '2022-08-10', nextEarningsDate: '2023-01-13', peRatio: 24.15791111474674, beta: 0.2898634677540382, maxChangePercent: 2.73607686411836, year5ChangePercent: 0.3616388272624196, year2ChangePercent: 0.1875208682178701, year1ChangePercent: 0.06117662816376745, ytdChangePercent: -0.007042894526420395, month6ChangePercent: -0.06367618202671464, month3ChangePercent: -0.0602657937444, month1ChangePercent: -0.006243459638506896, day30ChangePercent: -0.006073640301584383, day5ChangePercent: 0.03921569425682941,
    },
  },
  {
    symbol: 'gs',
    docs: {
      companyName: 'Goldman Sachs Group, Inc.', marketcap: 108378800030, week52high: 424.77, week52low: 277.24, week52highSplitAdjustOnly: 431.61, week52lowSplitAdjustOnly: 279.72, week52change: -0.2534480738652615, sharesOutstanding: 353419668, float: 0, avg10Volume: 2288778, avg30Volume: 2125656, day200MovingAvg: 326.33, day50MovingAvg: 315.4, employees: 40533, ttmEPS: 44.89, ttmDividendRate: 8.71047739410816, dividendYield: 0.02874202373190391, nextDividendDate: '', exDividendDate: '2022-08-27', nextEarningsDate: '2022-12-01', peRatio: 6.906054631922569, beta: 0.9883593579999245, maxChangePercent: 0.881028069993295, year5ChangePercent: 0.4214161284985186, year2ChangePercent: 0.5502791105276305, year1ChangePercent: -0.2318480371711538, ytdChangePercent: -0.1925278104193155, month6ChangePercent: -0.0406917401745345, month3ChangePercent: 0.05201498989981991, month1ChangePercent: -0.06128220868952221, day30ChangePercent: -0.06050347691424875, day5ChangePercent: 0.02054813360970599,
    },
  },
  {
    symbol: 't',
    docs: {
      companyName: 'AT&T, Inc.', marketcap: 114444725694, week52high: 21.86, week52low: 14.57, week52highSplitAdjustOnly: 22.44, week52lowSplitAdjustOnly: 14.46, week52change: -0.15528564378302315, sharesOutstanding: 7253178138, float: 0, avg10Volume: 50441522, avg30Volume: 47568103, day200MovingAvg: 18.64, day50MovingAvg: 16.14, employees: 2121, ttmEPS: 2.68, ttmDividendRate: 1.2549805501359554, dividendYield: 0.0799586324088831, nextDividendDate: '', exDividendDate: '2022-09-27', nextEarningsDate: '2022-10-19', peRatio: 5.799874957852096, beta: 0.5022967298586535, maxChangePercent: 0.2291516535002168, year5ChangePercent: -0.2530286025931694, year2ChangePercent: -0.1704333250552636, year1ChangePercent: -0.16854352719471014, ytdChangePercent: -0.125015412231712, month6ChangePercent: -0.192465060953832, month3ChangePercent: -0.2499135345062827, month1ChangePercent: -0.06932189793912649, day30ChangePercent: -0.06936829557513927, day5ChangePercent: 0.028062858814932232,
    },
  },
  {
    symbol: 'enph',
    docs: {
      companyName: 'Enphase Energy Inc', marketcap: 34379812413, week52high: 337.18, week52low: 115, week52highSplitAdjustOnly: 329.06, week52lowSplitAdjustOnly: 117.3, week52change: 0.36295089444770734, sharesOutstanding: 136030788, float: 0, avg10Volume: 3470932, avg30Volume: 4029248, day200MovingAvg: 231.25, day50MovingAvg: 294.73, employees: 886, ttmEPS: 1.43, ttmDividendRate: 0, dividendYield: 0, nextDividendDate: '', exDividendDate: '', nextEarningsDate: '2022-10-21', peRatio: 163.26991516397584, beta: 1.78602690155092, maxChangePercent: 32.98056746770953, year5ChangePercent: 178.2654968922321, year2ChangePercent: 1.214868683269034, year1ChangePercent: 0.4078109375943462, ytdChangePercent: 0.3405485359503106, month6ChangePercent: 0.274417668979663, month3ChangePercent: 0.24919564374201672, month1ChangePercent: -0.23903690561913032, day30ChangePercent: -0.24648101257437385, day5ChangePercent: -0.06278173230163714,
    },
  },
];

function imageQueryCheck(imageUrl: string) {
  if (imageUrl.length == null || imageUrl.length === 0) {
    return false;
  }
  return true;
}

function imageQuerySetter(imageUrl: string, image: string) {
  if (imageQueryCheck(imageUrl)) {
    return (
      <Image
        src={`https://res.cloudinary.com/demo/image/fetch/${image}`}
        alt="news article picture"
        width={130}
        height={130}
      />
    );
  }
  return null;
}

function articleFormatter(imageUrl: string) {
  if (imageQueryCheck(imageUrl)) {
    return ('90%');
  }
  return ('100%');
}

function Demo() {
  return (
    <LayoutWithAuth>
      <Grid grow>
        <Container>
          <Title>US Markets</Title>
          <Table highlightOnHover>
            <tbody>
              {dummyData.map((it) => (
                <Link
                  href={{
                    pathname: '/news/',
                    query: { key: it.key, subkey: it.subkey },
                  }}
                  passHref
                  key={it.uuid}
                >
                  <Box
                    sx={(theme) => ({
                      cursor: 'pointer',
                      marginBottom: '1em',
                      '&:hover': {
                        backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3],
                      },
                    })}
                  >
                    <Group noWrap>
                      <Stack sx={{ width: articleFormatter(it.imageUrl) }}>
                        <Text weight={700} lineClamp={2}>{it.headline}</Text>
                        <Text lineClamp={2}>{it.summary}</Text>
                      </Stack>
                      {imageQuerySetter(it.imageUrl, it.image)}
                    </Group>
                  </Box>
                </Link>
              ))}
            </tbody>
          </Table>
        </Container>
        <Container>
          <Container sx={(theme) => ({
            boxShadow: theme.shadows.sm, borderRadius: theme.radius.md, margin: '4px', height: 'min-content',
          })}
          >
            <Text size="lg" weight={700}>Earnings Calender</Text>
            <Text>Based off your lists</Text>
            <Space h="md" />
            {dummyDataEarnings.map((it) => (
              <Box key={it.symbol}>
                <Divider />
                <Space h="xs" />
                <Stack spacing={0}>
                  <Link href={`/stocks/${it.symbol}`} passHref><Text variant="link" sx={{ cursor: 'pointer' }}>{it.docs.companyName}</Text></Link>
                  <Text>{it.docs.nextEarningsDate}</Text>
                </Stack>
                <Space h="xs" />
              </Box>
            ))}
          </Container>
        </Container>
        <Watchlist />
      </Grid>
    </LayoutWithAuth>
  );
}

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Demo);
