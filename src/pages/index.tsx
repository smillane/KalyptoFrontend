import React, { useState } from 'react';
import {
  Box, Container, Grid, Text, Title, Table, Group, Stack, Divider, Space, SegmentedControl,
} from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';

import Layout from '../main/node/components/layout.tsx';
import Watchlist from '../main/node/redux/features/userLists/Watchlist.tsx';
import { greenOrRed } from '../main/node/util/formating.tsx';

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

const mostActiveData = [{
  avgTotalVolume: 67947408, calculationPrice: 'close', change: -7.88, changePercent: -0.07178, close: 104.25, closeSource: 'fiaciofl', closeTime: 1732159970787, companyName: 'Amazon.com Inc.', currency: 'USD', delayedPrice: 107.12, delayedPriceTime: 1732687425329, extendedChange: 0.52, extendedChangePercent: 0.00503, extendedPrice: 107.88, extendedPriceTime: 1723796697241, high: 107.17, highSource: 'u ydec15 tdi pmenlereai', highTime: 1691898461953, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 106.63, iexCloseTime: 1674929812487, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 100.91, iexOpenTime: 1705506996745, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1724775364256, latestPrice: 108.01, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1740374040427, latestVolume: 231470654, low: 98, lowSource: 'u lee cait ryi5p1meddne', lowTime: 1736271018121, marketCap: 1085231509125, oddLotDelayedPrice: 104.617, oddLotDelayedPriceTime: 1673784457998, open: 98, openTime: 1694995542102, openSource: 'faiflcio', peRatio: 95.84, previousClose: 116.32, previousVolume: 350543, primaryExchange: 'QAASND', symbol: 'AMZN', volume: 226845036, week52High: 193.95, week52Low: 102.41, ytdChange: -0.455599605418866, isUSMarketOpen: false,
}, {
  avgTotalVolume: 93136211, calculationPrice: 'close', change: 11.29, changePercent: 0.07724, close: 159.96, closeSource: 'lafocifi', closeTime: 1726993094631, companyName: 'Apple Inc', currency: 'USD', delayedPrice: 162.309, delayedPriceTime: 1720253977052, extendedChange: 0.11, extendedChangePercent: 0.00074, extendedPrice: 158.17, extendedPriceTime: 1718315178133, high: 163.4, highSource: '5epd mc1uetai re iledny', highTime: 1677624894254, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 159.34, iexCloseTime: 1732682258885, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 149.89, iexOpenTime: 1680624304390, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1668755266389, latestPrice: 162.89, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1718700760513, latestVolume: 169958423, low: 147.98, lowSource: 'l ydea tie ceimed5rp1un', lowTime: 1737899011808, marketCap: 2522353631892, oddLotDelayedPrice: 161.8, oddLotDelayedPriceTime: 1671913453111, open: 153.71, openTime: 1680154274269, openSource: 'icialffo', peRatio: 26.57, previousClose: 150.4, previousVolume: 112686946, primaryExchange: 'AQDASN', symbol: 'AAPL', volume: 166592133, week52High: 189.55, week52Low: 130.91, ytdChange: -0.0445524439798284, isUSMarketOpen: false,
}, {
  avgTotalVolume: 50016009, calculationPrice: 'close', change: 1.32, changePercent: 0.01301, close: 99.9, closeSource: 'alfoicfi', closeTime: 1747837933747, companyName: 'Meta Platforms Inc - Class A', currency: 'USD', delayedPrice: 102.98, delayedPriceTime: 1690903563307, extendedChange: -0.27, extendedChangePercent: -0.0027, extendedPrice: 103.77, extendedPriceTime: 1695188258871, high: 104.19, highSource: 'edrda eyi tneucm pe5il1', highTime: 1732848902050, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 100.93, iexCloseTime: 1743210919555, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 102.46, iexOpenTime: 1713408043348, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1729336215394, latestPrice: 102.4, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1743412625667, latestVolume: 98454022, low: 98.16, lowSource: 'i m lye rtepia51duedcen', lowTime: 1678550221385, marketCap: 278518422868, oddLotDelayedPrice: 99.46, oddLotDelayedPriceTime: 1722691218604, open: 104.03, openTime: 1736909023989, openSource: 'ffcoaiil', peRatio: 8.39, previousClose: 102.61, previousVolume: 233127448, primaryExchange: 'NSQADA', symbol: 'META', volume: 96975999, week52High: 368.03, week52Low: 98.5, ytdChange: -0.721706587949349, isUSMarketOpen: false,
}, {
  avgTotalVolume: 46057169, calculationPrice: 'close', change: 2.8, changePercent: 0.11092, close: 29.83, closeSource: 'iciaoffl', closeTime: 1725210422407, companyName: 'Intel Corp.', currency: 'USD', delayedPrice: 30.05, delayedPriceTime: 1703258991522, extendedChange: 0.06, extendedChangePercent: 0.00211, extendedPrice: 29.88, extendedPriceTime: 1744160839311, high: 29.862, highSource: 'cieiyrmue a15d eedln tp', highTime: 1688960110844, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 29.219, iexCloseTime: 1684001857469, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 28.4, iexOpenTime: 1745791835268, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1730171423345, latestPrice: 30.44, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1735865851718, latestVolume: 95415364, low: 28.48, lowSource: ' dcaumi ydrteneelie15 p', lowTime: 1696697823439, marketCap: 120110420343, oddLotDelayedPrice: 29.76, oddLotDelayedPriceTime: 1715893237024, open: 28.55, openTime: 1679189561296, openSource: 'aliffcoi', peRatio: 6.47, previousClose: 26.58, previousVolume: 56453764, primaryExchange: 'AAQSND', symbol: 'INTC', volume: 93836121, week52High: 55.45, week52Low: 25.44, ytdChange: -0.32729089765469277, isUSMarketOpen: false,
}, {
  avgTotalVolume: 95945125, calculationPrice: 'close', change: 3.53, changePercent: 0.05988, close: 63.77, closeSource: 'ofiiclaf', closeTime: 1681484903876, companyName: 'Advanced Micro Devices Inc.', currency: 'USD', delayedPrice: 64.183, delayedPriceTime: 1723487661585, extendedChange: 0.45, extendedChangePercent: 0.0072, extendedPrice: 62.8, extendedPriceTime: 1742633096431, high: 63.77, highSource: 'erld iu anipedey1 m5tce', highTime: 1742083797579, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 64, iexCloseTime: 1750151895412, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 59.1, iexOpenTime: 1686787806851, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1743840677901, latestPrice: 64.15, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1716625228890, latestVolume: 80462410, low: 61.25, lowSource: 'p malicid5ryd e1e tnuee', lowTime: 1715256989792, marketCap: 100875164411, oddLotDelayedPrice: 64.17, oddLotDelayedPriceTime: 1697275553043, open: 61.25, openTime: 1740082746824, openSource: 'icaifflo', peRatio: 28.4, previousClose: 61.4, previousVolume: 87087081, primaryExchange: 'DSANAQ', symbol: 'AMD', volume: 81205836, week52High: 168.69, week52Low: 55.48, ytdChange: -0.5344241256423031, isUSMarketOpen: false,
}, {
  avgTotalVolume: 83905750, calculationPrice: 'close', change: 3.51, changePercent: 0.01539, close: 239.22, closeSource: 'filaoifc', closeTime: 1707550672575, companyName: 'Tesla Inc', currency: 'USD', delayedPrice: 231.99, delayedPriceTime: 1734110095886, extendedChange: -0.13, extendedChangePercent: -0.0006, extendedPrice: 234.16, extendedPriceTime: 1684443698670, high: 239.22, highSource: 'u5nei1 le pdeemcraid yt', highTime: 1679795520835, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 229.26, iexCloseTime: 1740819114502, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 233.38, iexOpenTime: 1679089032790, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1686971948644, latestPrice: 228.77, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1668615011555, latestVolume: 69636369, low: 218.56, lowSource: 'dct le i5ypaiee dr1nuem', lowTime: 1706583253658, marketCap: 748620781563, oddLotDelayedPrice: 232.67, oddLotDelayedPriceTime: 1748402744769, open: 230, openTime: 1676231955349, openSource: 'ifaclofi', peRatio: 71.71, previousClose: 227.91, previousVolume: 62183678, primaryExchange: 'QNADAS', symbol: 'TSLA', volume: 71048478, week52High: 434.7, week52Low: 198.84, ytdChange: -0.3466425574211852, isUSMarketOpen: false,
}, {
  avgTotalVolume: 57658727, calculationPrice: 'close', change: 0.46, changePercent: 0.02586, close: 19.22, closeSource: 'flifoaci', closeTime: 1744192777396, companyName: 'AT&T, Inc.', currency: 'USD', delayedPrice: 18.99, delayedPriceTime: 1720687872732, extendedChange: 0, extendedChangePercent: 0, extendedPrice: 19.26, extendedPriceTime: 1676533011229, high: 19.22, highSource: '5udetaep1yle icrn  deim', highTime: 1682151179206, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 19.04, iexCloseTime: 1734039109123, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 18.99, iexOpenTime: 1738024590464, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1704850864515, latestPrice: 19.15, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1690068171308, latestVolume: 56738992, low: 18.5, lowSource: 'tu  ileadym enreecd1p5i', lowTime: 1738886085436, marketCap: 136239027479, oddLotDelayedPrice: 19.28, oddLotDelayedPriceTime: 1738247587421, open: 18.5, openTime: 1744622989169, openSource: 'fifaocli', peRatio: 7.14, previousClose: 18.33, previousVolume: 55258912, primaryExchange: 'K.I AHEWSG  EKNECTNNOYRCCXO ', symbol: 'T', volume: 57996771, week52High: 21.85, week52Low: 14.68, ytdChange: 0.08461331395173126, isUSMarketOpen: false,
}, {
  avgTotalVolume: 71704068, calculationPrice: 'close', change: 0.27, changePercent: 0.02, close: 13.31, closeSource: 'icoiffal', closeTime: 1713840750890, companyName: 'Ford Motor Co.', currency: 'USD', delayedPrice: 13.9, delayedPriceTime: 1696820457448, extendedChange: 0.01, extendedChangePercent: 0.00077, extendedPrice: 13.73, extendedPriceTime: 1685321399256, high: 14, highSource: 'itde5aecrm ulendy 1 ipe', highTime: 1688971792405, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 13.668, iexCloseTime: 1730372811413, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 13.5, iexOpenTime: 1682284716910, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1694101357852, latestPrice: 13.36, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1738288312087, latestVolume: 58217728, low: 13.31, lowSource: ' ci5yeptudeerd nia em1l', lowTime: 1689626091901, marketCap: 54286508641, oddLotDelayedPrice: 13.688, oddLotDelayedPriceTime: 1686672628455, open: 14, openTime: 1728326111473, openSource: 'ilfifcao', peRatio: 4.73, previousClose: 13, previousVolume: 89186841, primaryExchange: 'K OANES XWNCN R HIKE.CTOGYEC', symbol: 'F', volume: 57807413, week52High: 25.86, week52Low: 10.92, ytdChange: -0.3276649399518036, isUSMarketOpen: false,
}, {
  avgTotalVolume: 66826300, calculationPrice: 'close', change: 0.55, changePercent: 0.05654, close: 10.38, closeSource: 'lfifocia', closeTime: 1694349197445, companyName: 'Snap Inc - Class A', currency: 'USD', delayedPrice: 10.076, delayedPriceTime: 1725074141594, extendedChange: 0, extendedChangePercent: 0, extendedPrice: 10.37, extendedPriceTime: 1673756855566, high: 10.4, highSource: ' rintupeee m1yd5edlac i', highTime: 1676385714236, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 10.46, iexCloseTime: 1682985078523, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 10.08, iexOpenTime: 1710801351972, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1744050802150, latestPrice: 10.52, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1741600927751, latestVolume: 54969095, low: 9.66, lowSource: 'iuateli1dpeecey n r5d m', lowTime: 1687533060043, marketCap: 14153617429, oddLotDelayedPrice: 10.152, oddLotDelayedPriceTime: 1743804107893, open: 9.66, openTime: 1713164496347, openSource: 'iolffaci', peRatio: -14.59, previousClose: 9.79, previousVolume: 81573388, primaryExchange: 'CXNWKYNE SAENOIK CORC G.H TE', symbol: 'SNAP', volume: 55373294, week52High: 58.79, week52Low: 7.47, ytdChange: -0.7619135584920543, isUSMarketOpen: false,
}, {
  avgTotalVolume: 61360989, calculationPrice: 'close', change: 6.76, changePercent: 0.05022, close: 142.38, closeSource: 'ifiaofcl', closeTime: 1688917564100, companyName: 'NVIDIA Corp', currency: 'USD', delayedPrice: 141.331, delayedPriceTime: 1669515370963, extendedChange: 0.48, extendedChangePercent: 0.00334, extendedPrice: 139.3, extendedPriceTime: 1667577642824, high: 142.38, highSource: 'dpeydai le 1tmuincer5e ', highTime: 1729960590774, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 143, iexCloseTime: 1676734855143, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 133.3, iexOpenTime: 1720511430017, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1719808375152, latestPrice: 143.88, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1704703839600, latestVolume: 52662381, low: 131.7, lowSource: '5d dryuie tn1aimcleepe ', lowTime: 1743274286989, marketCap: 348799723585, oddLotDelayedPrice: 138.579, oddLotDelayedPriceTime: 1719199949192, open: 135.45, openTime: 1700614141729, openSource: 'cloiaffi', peRatio: 45.52, previousClose: 133.48, previousVolume: 60504764, primaryExchange: 'SDNAAQ', symbol: 'NVDA', volume: 53190790, week52High: 361.65, week52Low: 110.64, ytdChange: -0.48070022380457783, isUSMarketOpen: false,
}];

const gainersData = [{
  avgTotalVolume: 363466, calculationPrice: 'close', change: 13.48, changePercent: 0.6183, close: 35.67, closeSource: 'faoicifl', closeTime: 1731103656805, companyName: 'Nuvalent Inc - Class A', currency: 'USD', delayedPrice: 35.96, delayedPriceTime: 1672637325449, extendedChange: -0.2, extendedChangePercent: -0.00592, extendedPrice: 35.91, extendedPriceTime: 1686259528183, high: 42.43, highSource: 'u eepetrc naym15edidl i', highTime: 1710558856801, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 36.262, iexCloseTime: 1724893350113, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 36.14, iexOpenTime: 1692562408336, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1749508935874, latestPrice: 36.34, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1720183804196, latestVolume: 4864072, low: 30, lowSource: '1ayp5eitdm enelreucid  ', lowTime: 1670539078048, marketCap: 1583515937, oddLotDelayedPrice: 35.53, oddLotDelayedPriceTime: 1709539371775, open: 36.33, openTime: 1720696146595, openSource: 'icalfofi', peRatio: null, previousClose: 22, previousVolume: 581654, primaryExchange: 'QADNSA', symbol: 'NUVL', volume: 4894657, week52High: 40.89, week52Low: 7.27, ytdChange: 1.4795199578076788, isUSMarketOpen: false,
}, {
  avgTotalVolume: 108426, calculationPrice: 'close', change: 2.64, changePercent: 0.32457, close: 11, closeSource: 'cafoifil', closeTime: 1731504728458, companyName: 'Perfect Corp - Class A', currency: 'USD', delayedPrice: 11.21, delayedPriceTime: 1721706886705, extendedChange: 2.86, extendedChangePercent: 0.26523, extendedPrice: 14.52, extendedPriceTime: 1671438262952, high: 11.66, highSource: 'dreiiuaelmty edncp 1 e5', highTime: 1739335181150, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 11.13, iexCloseTime: 1741750569052, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 10, iexOpenTime: 1668176461637, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1690629325832, latestPrice: 11, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1669779488739, latestVolume: 456000, low: 8.42, lowSource: 'y ee i n5lmp1edticurade', lowTime: 1746086945257, marketCap: 263411729, oddLotDelayedPrice: 11.05, oddLotDelayedPriceTime: 1678925350810, open: 8.42, openTime: 1669901660595, openSource: 'flaifoic', peRatio: null, previousClose: 8.79, previousVolume: 36387, primaryExchange: 'NADQAS', symbol: 'PAQC', volume: 448393, week52High: 11.63, week52Low: 7.72, ytdChange: 0.448434274836971, isUSMarketOpen: false,
}, {
  avgTotalVolume: 2226494, calculationPrice: 'close', change: 0.75, changePercent: 0.22022, close: 4.21, closeSource: 'afliiofc', closeTime: 1730257324159, companyName: '8X8 Inc.', currency: 'USD', delayedPrice: 4.21, delayedPriceTime: 1743536004393, extendedChange: -0.03, extendedChangePercent: -0.00735, extendedPrice: 4.2, extendedPriceTime: 1682980272686, high: 4.33, highSource: 'dep r uceyimienlet1d5a ', highTime: 1726251439723, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 4.198, iexCloseTime: 1736873342134, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 3.482, iexOpenTime: 1744854560481, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1742459145608, latestPrice: 4.21, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1724592431393, latestVolume: 8119024, low: 3.5, lowSource: 'tpeled5m icedy enia ur1', lowTime: 1727537251502, marketCap: 516518588, oddLotDelayedPrice: 4.16, oddLotDelayedPriceTime: 1708808615225, open: 3.7, openTime: 1737143964384, openSource: 'lifoacif', peRatio: -3.06, previousClose: 3.55, previousVolume: 1580335, primaryExchange: 'DAASQN', symbol: 'EGHT', volume: 8002782, week52High: 24.24, week52Low: 2.94, ytdChange: -0.55070252937213, isUSMarketOpen: false,
}, {
  avgTotalVolume: 860181, calculationPrice: 'close', change: 1.35, changePercent: 0.20591, close: 8.42, closeSource: 'ailffcio', closeTime: 1742238539061, companyName: 'Seres Therapeutics Inc', currency: 'USD', delayedPrice: 8.4, delayedPriceTime: 1712971971061, extendedChange: -0.07, extendedChangePercent: -0.00896, extendedPrice: 8, extendedPriceTime: 1668857504211, high: 8.42, highSource: 'dip5nuald1 emy cri eete', highTime: 1679795524834, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 8.44, iexCloseTime: 1706882047057, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 6.98, iexOpenTime: 1678578528104, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1718117143145, latestPrice: 8.32, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1731382709531, latestVolume: 1946467, low: 6.62, lowSource: '1demciliane tpry u5 eed', lowTime: 1718748738854, marketCap: 1049947279, oddLotDelayedPrice: 8.38, oddLotDelayedPriceTime: 1725452997581, open: 7, openTime: 1743881490907, openSource: 'cifaoilf', peRatio: -7.23, previousClose: 6.8, previousVolume: 651038, primaryExchange: 'DNSQAA', symbol: 'MCRB', volume: 1976841, week52High: 11.78, week52Low: 2.5, ytdChange: 0.17037906897214442, isUSMarketOpen: false,
}, {
  avgTotalVolume: 206819, calculationPrice: 'close', change: 1.58, changePercent: 0.20532, close: 9.37, closeSource: 'fcolaiif', closeTime: 1697651376843, companyName: 'Scholar Rock Holding Corp', currency: 'USD', delayedPrice: 9.57, delayedPriceTime: 1673024000895, extendedChange: 0.13, extendedChangePercent: 0.01405, extendedPrice: 9.71, extendedPriceTime: 1740719852195, high: 9.57, highSource: ' n l ieedeird5m1aecyutp', highTime: 1722235041543, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 9.7, iexCloseTime: 1707430417015, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 8.43, iexOpenTime: 1668621129300, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1745160417948, latestPrice: 9.53, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1717373244222, latestVolume: 380151, low: 8.08, lowSource: '1cp uedmai5d eynet ierl', lowTime: 1692168823711, marketCap: 499817530, oddLotDelayedPrice: 9.59, oddLotDelayedPriceTime: 1700683452669, open: 8.5, openTime: 1735843665252, openSource: 'aloiciff', peRatio: null, previousClose: 7.96, previousVolume: 76212, primaryExchange: 'NASQDA', symbol: 'SRRK', volume: 384214, week52High: 37.39, week52Low: 4.51, ytdChange: -0.4444544463173321, isUSMarketOpen: false,
}, {
  avgTotalVolume: 3448814, calculationPrice: 'close', change: 20.26, changePercent: 0.19424, close: 121.35, closeSource: 'caiioflf', closeTime: 1698715538021, companyName: 'Dexcom Inc', currency: 'USD', delayedPrice: 123.7, delayedPriceTime: 1735628438389, extendedChange: 0.14, extendedChangePercent: 0.00108, extendedPrice: 126, extendedPriceTime: 1678126394103, high: 123.18, highSource: 'eulednm5rt piie a cy1de', highTime: 1686239347050, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 124.4, iexCloseTime: 1705667788373, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 116.496, iexOpenTime: 1674887877038, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1724443460228, latestPrice: 122.67, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1695346332182, latestVolume: 9498282, low: 111.66, lowSource: 'dne etr ueli5 1mcepiady', lowTime: 1709482646385, marketCap: 47638704347, oddLotDelayedPrice: 123.54, oddLotDelayedPriceTime: 1721090295855, open: 114.5, openTime: 1730689527505, openSource: 'foaliicf', peRatio: 262.02, previousClose: 102.2, previousVolume: 3892410, primaryExchange: 'DQAANS', symbol: 'DXCM', volume: 9328080, week52High: 168.52, week52Low: 67.84, ytdChange: 0.09643923764194012, isUSMarketOpen: false,
}, {
  avgTotalVolume: 1991308, calculationPrice: 'close', change: 0.86, changePercent: 0.17973, close: 5.62, closeSource: 'ificfalo', closeTime: 1718783065535, companyName: 'Ngm Biopharmaceuticals Inc', currency: 'USD', delayedPrice: 5.67, delayedPriceTime: 1710021943671, extendedChange: 0.08, extendedChangePercent: 0.01439, extendedPrice: 5.72, extendedPriceTime: 1676701069111, high: 5.91, highSource: 'enru mpiyai c1 eeledtd5', highTime: 1734688072176, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 5.86, iexCloseTime: 1734805286972, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 5.02, iexOpenTime: 1690128507162, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1699345922221, latestPrice: 5.84, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1693696885214, latestVolume: 1468023, low: 4.85, lowSource: 'aiytcldeden1 em  5ipuer', lowTime: 1722701532458, marketCap: 451499223, oddLotDelayedPrice: 5.78, oddLotDelayedPriceTime: 1668534392863, open: 5.09, openTime: 1684249806097, openSource: 'laifofci', peRatio: null, previousClose: 4.98, previousVolume: 787638, primaryExchange: 'NDSAAQ', symbol: 'NGM', volume: 1457869, week52High: 21.98, week52Low: 3, ytdChange: -0.5129153325971196, isUSMarketOpen: false,
}, {
  avgTotalVolume: 731280, calculationPrice: 'close', change: 8.19, changePercent: 0.17201, close: 56.55, closeSource: 'folcifia', closeTime: 1742880271614, companyName: 'PennyMac Financial Services Inc.', currency: 'USD', delayedPrice: 56.607, delayedPriceTime: 1668476130909, extendedChange: 0, extendedChangePercent: 0, extendedPrice: 55.85, extendedPriceTime: 1745855826943, high: 57.16, highSource: 'il amu ceeri npede1tyd5', highTime: 1667851731057, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 57.82, iexCloseTime: 1721971382439, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 52.3, iexOpenTime: 1679152765108, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1737996154473, latestPrice: 55.34, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1740379273279, latestVolume: 1548670, low: 52.75, lowSource: 'rniiceeeyut amp d5e d1l', lowTime: 1674773404563, marketCap: 3119334240, oddLotDelayedPrice: 56.82, oddLotDelayedPriceTime: 1680296362473, open: 54.6, openTime: 1724153580616, openSource: 'faicflio', peRatio: null, previousClose: 49, previousVolume: 722080, primaryExchange: 'ACSCKE.CKI  WNOOYXGNT R HEEN', symbol: 'PFSI', volume: 1544422, week52High: 71.33, week52Low: 39.8, ytdChange: -0.031942619626856, isUSMarketOpen: false,
}, {
  avgTotalVolume: 56934, calculationPrice: 'close', change: 3.1, changePercent: 0.1637, close: 22.64, closeSource: 'iolfcifa', closeTime: 1748172457049, companyName: 'Third Harmonic Bio Inc', currency: 'USD', delayedPrice: 23.01, delayedPriceTime: 1696746370721, extendedChange: 0.09, extendedChangePercent: 0.0041, extendedPrice: 22.95, extendedPriceTime: 1746799884599, high: 22.89, highSource: ' ey5ceelri m eiutpn1dad', highTime: 1719540346090, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 22.06, iexCloseTime: 1709082278338, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 20.67, iexOpenTime: 1696024700037, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1717263334759, latestPrice: 22.71, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1672604565433, latestVolume: 38650, low: 19.27, lowSource: 'dtyrua e i1d5e enpeclim', lowTime: 1727604566187, marketCap: 824342009, oddLotDelayedPrice: 22.85, oddLotDelayedPriceTime: 1724296130357, open: 19.27, openTime: 1732078474305, openSource: 'foifclia', peRatio: null, previousClose: 20.11, previousVolume: 27885, primaryExchange: 'NAASDQ', symbol: 'THRD', volume: 38176, week52High: 23.72, week52Low: 17, ytdChange: 0.3000130818830467, isUSMarketOpen: false,
}, {
  avgTotalVolume: 86049, calculationPrice: 'close', change: 2.65, changePercent: 0.15608, close: 20.26, closeSource: 'cfoflaii', closeTime: 1695577847954, companyName: 'Third Coast Bancshares Inc', currency: 'USD', delayedPrice: 19.85, delayedPriceTime: 1716832710664, extendedChange: 0, extendedChangePercent: 0, extendedPrice: 20.37, extendedPriceTime: 1736573770433, high: 20.3, highSource: 'eridemydc epl5eni1  atu', highTime: 1689943949289, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 19.79, iexCloseTime: 1749367809129, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 17.75, iexOpenTime: 1743995428993, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1670138206138, latestPrice: 19.85, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1736657619785, latestVolume: 364803, low: 17.37, lowSource: '15edpc ly nradueim eeit', lowTime: 1698001730019, marketCap: 266201689, oddLotDelayedPrice: 19.8, oddLotDelayedPriceTime: 1750167443486, open: 17.59, openTime: 1704031939300, openSource: 'foifcali', peRatio: null, previousClose: 17.2, previousVolume: 295313, primaryExchange: 'ADQASN', symbol: 'TCBX', volume: 369000, week52High: 31, week52Low: 17.1, ytdChange: -0.09609230938040444, isUSMarketOpen: false,
}];

const losersData = [{
  avgTotalVolume: 557442, calculationPrice: 'close', change: -26.04, changePercent: -0.66236, close: 15.23, closeSource: 'acioiflf', closeTime: 1706105242518, companyName: 'Selina Hospitality PLC.', currency: 'USD', delayedPrice: 15.49, delayedPriceTime: 1688730093215, extendedChange: 1.87, extendedChangePercent: 0.12092, extendedPrice: 17.4, extendedPriceTime: 1673995934738, high: 41.07, highSource: 'acteilpdyee5d1 em u rni', highTime: 1678352690094, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 16.773, iexCloseTime: 1721401677700, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 39.64, iexOpenTime: 1734003367557, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1738413394920, latestPrice: 15.63, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1692204915017, latestVolume: 342199, low: 15.23, lowSource: 'ieerucpt em5 dydile1a n', lowTime: 1742711914563, marketCap: 1538293550, oddLotDelayedPrice: 15.547, oddLotDelayedPriceTime: 1668550978320, open: 38.46, openTime: 1746967128539, openSource: 'afocliif', peRatio: null, previousClose: 41, previousVolume: 738913, primaryExchange: 'ANQDAS', symbol: 'SLNA', volume: 351376, week52High: 49.83, week52Low: 8.55, ytdChange: -1.2626214840179302, isUSMarketOpen: false,
}, {
  avgTotalVolume: 830492, calculationPrice: 'close', change: -26.83, changePercent: -0.2766, close: 71.12, closeSource: 'lioaciff', closeTime: 1706303763030, companyName: 'DaVita Inc', currency: 'USD', delayedPrice: 73.19, delayedPriceTime: 1703005998714, extendedChange: 0.78, extendedChangePercent: 0.0108, extendedPrice: 74.27, extendedPriceTime: 1694671675168, high: 78.6, highSource: 'ca5d preeu ydti1eniem l', highTime: 1717894133630, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 71.37, iexCloseTime: 1678338077085, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 81, iexOpenTime: 1739198915753, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1727343655792, latestPrice: 70.78, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1732917673212, latestVolume: 5605945, low: 71.12, lowSource: 'ryuidimneld 1cae5e p et', lowTime: 1719022937487, marketCap: 6557793188, oddLotDelayedPrice: 72.204, oddLotDelayedPriceTime: 1746188637966, open: 77.14, openTime: 1711025260441, openSource: 'cafliofi', peRatio: 8.75, previousClose: 96.81, previousVolume: 1437321, primaryExchange: 'KCEWOHEYSCNE  C GXIRAN. KONT', symbol: 'DVA', volume: 5593428, week52High: 125.08, week52Low: 70.49, ytdChange: -0.6622330627493889, isUSMarketOpen: false,
}, {
  avgTotalVolume: 120183, calculationPrice: 'close', change: -10.268, changePercent: -0.19684, close: 42.191, closeSource: 'coflaifi', closeTime: 1745839246564, companyName: 'Lemaitre Vascular Inc', currency: 'USD', delayedPrice: 43.61, delayedPriceTime: 1732149676304, extendedChange: 2.181, extendedChangePercent: 0.05217, extendedPrice: 45.48, extendedPriceTime: 1746298145034, high: 50.7, highSource: 'nurd1mye a dleei etpic5', highTime: 1737241757139, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 43.85, iexCloseTime: 1741890903385, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 47.66, iexOpenTime: 1711907334593, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1678334346578, latestPrice: 42.973, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1683611971477, latestVolume: 480684, low: 42.191, lowSource: 'eacr ntd ldypeui5m iee1', lowTime: 1708695924138, marketCap: 922743068, oddLotDelayedPrice: 42.45, oddLotDelayedPriceTime: 1672298307403, open: 48.15, openTime: 1673459625553, openSource: 'ofaliicf', peRatio: null, previousClose: 53.01, previousVolume: 90617, primaryExchange: 'NSDAQA', symbol: 'LMAT', volume: 488094, week52High: 58.63, week52Low: 38.33, ytdChange: -0.3583372028577937, isUSMarketOpen: false,
}, {
  avgTotalVolume: 3899103, calculationPrice: 'close', change: -15.5, changePercent: -0.18008, close: 72.16, closeSource: 'cofiflai', closeTime: 1695860865376, companyName: 'Edwards Lifesciences Corp', currency: 'USD', delayedPrice: 72.932, delayedPriceTime: 1669102170101, extendedChange: -0.02, extendedChangePercent: -0.00028, extendedPrice: 73.46, extendedPriceTime: 1723403748603, high: 74, highSource: 'tei1 eceplnd rma 5edyui', highTime: 1743647077718, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 73.53, iexCloseTime: 1673219805983, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 75.684, iexOpenTime: 1673833302754, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1671281791854, latestPrice: 72.33, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1699152039944, latestVolume: 19482671, low: 72.16, lowSource: 'ciyduel 1 mee5drn eitap', lowTime: 1722240565196, marketCap: 44233819199, oddLotDelayedPrice: 72.38, oddLotDelayedPriceTime: 1724010890436, open: 73.1, openTime: 1691455108864, openSource: 'offaliic', peRatio: 31.05, previousClose: 89.5, previousVolume: 4343576, primaryExchange: 'CK IKWSO YRACGTC N HEXNE.NOE', symbol: 'EW', volume: 19172789, week52High: 132.47, week52Low: 70.2, ytdChange: -0.6339738083059602, isUSMarketOpen: false,
}, {
  avgTotalVolume: 75753, calculationPrice: 'close', change: -5.79, changePercent: -0.17892, close: 26.25, closeSource: 'affcloii', closeTime: 1707963683079, companyName: 'United Fire Group Inc', currency: 'USD', delayedPrice: 26.15, delayedPriceTime: 1715835116072, extendedChange: 0, extendedChangePercent: 0, extendedPrice: 26.39, extendedPriceTime: 1737705800665, high: 32.73, highSource: 'Xa iiemlIE pre ertc', highTime: 1672116174248, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 27, iexCloseTime: 1703710572439, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 31.37, iexOpenTime: 1720840276060, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1743348617503, latestPrice: 27.01, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1699557856688, latestVolume: 245949, low: 26.25, lowSource: 'idruedly1 i cpt5mae nee', lowTime: 1694248223260, marketCap: 661895602, oddLotDelayedPrice: 26.2, oddLotDelayedPriceTime: 1703554948358, open: 32.15, openTime: 1747644219811, openSource: 'iifaclof', peRatio: 10.22, previousClose: 32.2, previousVolume: 94617, primaryExchange: 'SAAQND', symbol: 'UFCS', volume: 247806, week52High: 37.83, week52Low: 20.72, ytdChange: -0.0335405321932857, isUSMarketOpen: false,
}, {
  avgTotalVolume: 50903, calculationPrice: 'close', change: -0.84, changePercent: -0.16899, close: 4.14, closeSource: 'alfocfii', closeTime: 1703710415171, companyName: 'Alpha Tau Medical Ltd', currency: 'USD', delayedPrice: 4, delayedPriceTime: 1742212323218, extendedChange: -0.09, extendedChangePercent: -0.022, extendedPrice: 4, extendedPriceTime: 1687813025055, high: 5.06, highSource: 'idmenpteulc5eed1  i yar', highTime: 1708235605754, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 4.09, iexCloseTime: 1729205101296, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 4.84, iexOpenTime: 1697285256997, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1681747715078, latestPrice: 4.14, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1749879155271, latestVolume: 205371, low: 3.94, lowSource: 'i t rndeye1p eacu5dlmie', lowTime: 1678099006850, marketCap: 282816682, oddLotDelayedPrice: 4.12, oddLotDelayedPriceTime: 1695632389056, open: 4.97, openTime: 1710076938803, openSource: 'afcfoili', peRatio: null, previousClose: 5.1, previousVolume: 39558, primaryExchange: 'ASDANQ', symbol: 'DRTS', volume: 198985, week52High: 21.06, week52Low: 3.96, ytdChange: -0.83698276797074, isUSMarketOpen: false,
}, {
  avgTotalVolume: 529788, calculationPrice: 'close', change: -45.09, changePercent: -0.15581, close: 246.87, closeSource: 'ffliaoic', closeTime: 1734580315591, companyName: 'Carlisle Companies Inc.', currency: 'USD', delayedPrice: 243.427, delayedPriceTime: 1686426377111, extendedChange: 0.12, extendedChangePercent: 0.0005, extendedPrice: 242.19, extendedPriceTime: 1679234068757, high: 265.11, highSource: 'ndeytuie repl1 iamc5de ', highTime: 1740156474131, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 242.7, iexCloseTime: 1738012651027, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 251.7, iexOpenTime: 1669184917058, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1717461350786, latestPrice: 242.29, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1731686987871, latestVolume: 2266054, low: 225.75, lowSource: ' emp eueec5y lidantd1ir', lowTime: 1714994865239, marketCap: 12597855907, oddLotDelayedPrice: 240.6, oddLotDelayedPriceTime: 1734371311953, open: 263, openTime: 1685521160925, openSource: 'fcfoaili', peRatio: 17.29, previousClose: 296.78, previousVolume: 547413, primaryExchange: 'EEGE.WXITA  CSNO YNK HRCOKNC', symbol: 'CSL', volume: 2282202, week52High: 318.54, week52Low: 210.97, ytdChange: -0.18967531856673145, isUSMarketOpen: false,
}, {
  avgTotalVolume: 1121952, calculationPrice: 'close', change: -1.42, changePercent: -0.1486, close: 8.3, closeSource: 'flicofia', closeTime: 1723918624840, companyName: 'Newmark Group Inc - Class A', currency: 'USD', delayedPrice: 8.37, delayedPriceTime: 1739514949564, extendedChange: 0.01, extendedChangePercent: 0.00125, extendedPrice: 8.21, extendedPriceTime: 1687273772119, high: 9.69, highSource: 'tu e red5idea inyelcpm1', highTime: 1702853649625, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 8.16, iexCloseTime: 1691028977125, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 8.94, iexOpenTime: 1731196806054, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1735354558121, latestPrice: 8.04, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1705618672138, latestVolume: 4710207, low: 7.99, lowSource: ' eieip51ncrduyte l emda', lowTime: 1690201619387, marketCap: 1290298832, oddLotDelayedPrice: 8.02, oddLotDelayedPriceTime: 1673401391687, open: 9.69, openTime: 1707293194108, openSource: 'lifoicfa', peRatio: 4.76, previousClose: 9.74, previousVolume: 1049972, primaryExchange: 'NAQADS', symbol: 'NMRK', volume: 4666607, week52High: 19.76, week52Low: 7.9, ytdChange: -0.7242058537105663, isUSMarketOpen: false,
}];

const unusualVolumeData = [{
  avgTotalVolume: 67724026, calculationPrice: 'close', change: -7.9, changePercent: -0.07003, close: 108.54, closeSource: 'icfaloif', closeTime: 1691091560995, companyName: 'Amazon.com Inc.', currency: 'USD', delayedPrice: 103.988, delayedPriceTime: 1688328197935, extendedChange: 0.53, extendedChangePercent: 0.00517, extendedPrice: 106.85, extendedPriceTime: 1741162548055, high: 108.54, highSource: 'yce1driinemtde eul 5 ap', highTime: 1720207320256, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 104.98, iexCloseTime: 1697325495025, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 100.48, iexOpenTime: 1681441633791, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1721821109415, latestPrice: 105.43, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1723783460636, latestVolume: 224147750, low: 102, lowSource: 'cnrpd1lie5tde meuyae  i', lowTime: 1724027976037, marketCap: 1099014215472, oddLotDelayedPrice: 107.479, oddLotDelayedPriceTime: 1724125082170, open: 102, openTime: 1730110538585, openSource: 'iffcliao', peRatio: 95.07, previousClose: 115.71, previousVolume: 350342, primaryExchange: 'NAAQDS', symbol: 'GOOGL', volume: 229706669, week52High: 189.21, week52Low: 99.09, ytdChange: -0.4631960840039864, isUSMarketOpen: false,
}, {
  avgTotalVolume: 91397184, calculationPrice: 'close', change: 11.43, changePercent: 0.07808, close: 162.37, closeSource: 'cfioalfi', closeTime: 1707732008587, companyName: 'Apple Inc', currency: 'USD', delayedPrice: 162.694, delayedPriceTime: 1710286624171, extendedChange: 0.11, extendedChangePercent: 0.00072, extendedPrice: 160.93, extendedPriceTime: 1723256354804, high: 162.37, highSource: '1rcunmpdaiei ydet  l5ee', highTime: 1707786167269, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 161.88, iexCloseTime: 1722030832715, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 154.68, iexOpenTime: 1740757008842, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1685867616051, latestPrice: 161.58, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1738492761113, latestVolume: 166174893, low: 152.12, lowSource: 'tdr aimlducy ei ne15pee', lowTime: 1717692469107, marketCap: 2562974520731, oddLotDelayedPrice: 162.44, oddLotDelayedPriceTime: 1731962159219, open: 154.54, openTime: 1690709251618, openSource: 'ofaifcli', peRatio: 26.78, previousClose: 148.9, previousVolume: 114475308, primaryExchange: 'SDQANA', symbol: 'AAPL', volume: 167550492, week52High: 189.16, week52Low: 130.21, ytdChange: -0.04416435184598658, isUSMarketOpen: false,
}, {
  avgTotalVolume: 46658910, calculationPrice: 'close', change: 0.59, changePercent: 0.0079, close: 76.18, closeSource: 'aclioffi', closeTime: 1698498325375, companyName: 'BlackRock Institutional Trust Company N.A. - iShares iBoxx USD High Yield Corporate Bond ETF', currency: 'USD', delayedPrice: 75.428, delayedPriceTime: 1702077779517, extendedChange: 0, extendedChangePercent: 0, extendedPrice: 76.24, extendedPriceTime: 1673652602445, high: 78.04, highSource: ' ecry eiand1m idlpe5ute', highTime: 1713013211781, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 75.84, iexCloseTime: 1672042574885, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 77.52, iexOpenTime: 1730130744066, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1704792728312, latestPrice: 75.02, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1726227337857, latestVolume: 125958437, low: 74.39, lowSource: '1d dercepe5 inetau lymi', lowTime: 1747858561976, marketCap: 14855262182, oddLotDelayedPrice: 77.75, oddLotDelayedPriceTime: 1698773127855, open: 74.39, openTime: 1689407083443, openSource: 'cfaiilfo', peRatio: null, previousClose: 76.72, previousVolume: 49845233, primaryExchange: 'CNE RSAAY', symbol: 'HYG', volume: 125023461, week52High: 86.73, week52Low: 71.4, ytdChange: -0.10716088598781907, isUSMarketOpen: false,
}, {
  avgTotalVolume: 47496235, calculationPrice: 'close', change: 2.8, changePercent: 0.10983, close: 29.37, closeSource: 'lfioaifc', closeTime: 1699846013776, companyName: 'Intel Corp.', currency: 'USD', delayedPrice: 30.16, delayedPriceTime: 1709635181378, extendedChange: 0.06, extendedChangePercent: 0.00216, extendedPrice: 29.26, extendedPriceTime: 1744577757628, high: 29.62, highSource: 'tdip5e yrieu nladm1 cee', highTime: 1710846626911, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 29.554, iexCloseTime: 1739094202252, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 29.3, iexOpenTime: 1669078481315, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1730178549410, latestPrice: 29.7, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1683194153203, latestVolume: 93781557, low: 29.02, lowSource: '51ny iame rdtliepeecu d', lowTime: 1717516367823, marketCap: 120264533115, oddLotDelayedPrice: 29.91, oddLotDelayedPriceTime: 1745364404689, open: 29.52, openTime: 1697245510580, openSource: 'cioilfaf', peRatio: 6.52, previousClose: 27.2, previousVolume: 57330903, primaryExchange: 'ASNAQD', symbol: 'INTC', volume: 93212027, week52High: 56.14, week52Low: 25.81, ytdChange: -0.3164368332630078, isUSMarketOpen: false,
}, {
  avgTotalVolume: 54153493, calculationPrice: 'close', change: -0.77, changePercent: -0.0571, close: 12.85, closeSource: 'ofiifcal', closeTime: 1702143026420, companyName: 'Vale S.A. - ADR', currency: 'USD', delayedPrice: 12.821, delayedPriceTime: 1675088366535, extendedChange: 0.17, extendedChangePercent: 0.01371, extendedPrice: 13.26, extendedPriceTime: 1745643476235, high: 13.4, highSource: 'ec meedyirn5tlda1  uiep', highTime: 1676103034105, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 13.14, iexCloseTime: 1743546902391, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 13.27, iexOpenTime: 1736310822058, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1735025531039, latestPrice: 12.96, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1745811785261, latestVolume: 73368573, low: 12.85, lowSource: '1ai5pdedycnmui rete le ', lowTime: 1719395906320, marketCap: 60503341622, oddLotDelayedPrice: 12.77, oddLotDelayedPriceTime: 1667577707256, open: 13.17, openTime: 1679719447930, openSource: 'lfaifioc', peRatio: 2.99, previousClose: 13.84, previousVolume: 69571240, primaryExchange: 'NEW. E OTEC RKKAYCOH INXSNGC', symbol: 'VALE', volume: 73559209, week52High: 20.85, week52Low: 10.56, ytdChange: -0.10274312310181233, isUSMarketOpen: false,
}, {
  avgTotalVolume: 49411982, calculationPrice: 'close', change: 1.27, changePercent: 0.01316, close: 99.5, closeSource: 'aoflicfi', closeTime: 1678123561601, companyName: 'Meta Platforms Inc - Class A', currency: 'USD', delayedPrice: 103.4, delayedPriceTime: 1730468833730, extendedChange: -0.26, extendedChangePercent: -0.00272, extendedPrice: 100.64, extendedPriceTime: 1678419024351, high: 104.25, highSource: 'iele1 net yudc5pea idrm', highTime: 1705102425159, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 101.34, iexCloseTime: 1747753750576, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 103.39, iexOpenTime: 1674340529826, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1743631836243, latestPrice: 100.4, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1677365309142, latestVolume: 99971012, low: 99.5, lowSource: 'eeliy1r ddimpt5ean ec u', lowTime: 1706281374657, marketCap: 278302072296, oddLotDelayedPrice: 103.97, oddLotDelayedPriceTime: 1712327388326, open: 104.25, openTime: 1717733317985, openSource: 'failocfi', peRatio: 8.57, previousClose: 100.89, previousVolume: 241085735, primaryExchange: 'DNSAAQ', symbol: 'META', volume: 98625141, week52High: 363.11, week52Low: 100.74, ytdChange: -0.693943200454924, isUSMarketOpen: false,
}, {
  avgTotalVolume: 268121199, calculationPrice: 'close', change: 1.8, changePercent: 0.09475, close: 21.7, closeSource: 'cofilfia', closeTime: 1699983402142, companyName: 'ProShares Trust - ProShares UltraPro QQQ 3x Shares', currency: 'USD', delayedPrice: 22.125, delayedPriceTime: 1701112662665, extendedChange: 0.14, extendedChangePercent: 0.00661, extendedPrice: 22.55, extendedPriceTime: 1711417716162, high: 22.24, highSource: 'einm15ddperet cuea ily ', highTime: 1733503814942, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 22.77, iexCloseTime: 1679486870570, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 20.608, iexOpenTime: 1733598974742, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1744061903933, latestPrice: 22.6, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1734503278015, latestVolume: 261586624, low: 20.31, lowSource: 'deia eucriyp5nete1dm l ', lowTime: 1701893981454, marketCap: 12158502639, oddLotDelayedPrice: 22.54, oddLotDelayedPriceTime: 1735255522579, open: 20.31, openTime: 1717973923248, openSource: 'ailicfof', peRatio: null, previousClose: 19.9, previousVolume: 266944325, primaryExchange: 'ADQANS', symbol: 'TQQQ', volume: 256287652, week52High: 94.41, week52Low: 16.77, ytdChange: -0.6797056337635151, isUSMarketOpen: false,
}, {
  avgTotalVolume: 12172703, calculationPrice: 'close', change: 0.52, changePercent: 0.06046, close: 9.61, closeSource: 'flfiaoic', closeTime: 1743723599375, companyName: 'New York Community Bancorp Inc.', currency: 'USD', delayedPrice: 9.532, delayedPriceTime: 1694823140608, extendedChange: 0.09, extendedChangePercent: 0.01014, extendedPrice: 9.43, extendedPriceTime: 1687679352946, high: 9.71, highSource: 'dl5 eydire u n1iteepcam', highTime: 1694837962099, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 9.433, iexCloseTime: 1734014391654, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 9.61, iexOpenTime: 1720791575974, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1715759561808, latestPrice: 9.44, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1741116564089, latestVolume: 53425447, low: 9.12, lowSource: 'tpdimi1a e y5e ncuerdle', lowTime: 1741324285307, marketCap: 4428937121, oddLotDelayedPrice: 9.33, oddLotDelayedPriceTime: 1701442011014, open: 9.56, openTime: 1680799756651, openSource: 'cailofif', peRatio: 7.46, previousClose: 9.11, previousVolume: 14382685, primaryExchange: 'CA KOEETOI NGXNYCRHCSNWK E. ', symbol: 'NYCB', volume: 52723677, week52High: 13.52, week52Low: 8.45, ytdChange: -0.1501590598139748, isUSMarketOpen: false,
}, {
  avgTotalVolume: 3843333, calculationPrice: 'close', change: -0.01, changePercent: -0.00009, close: 110.84, closeSource: 'ioaiclff', closeTime: 1674596003042, companyName: 'BlackRock Institutional Trust Company N.A. - iShares Short Treasury Bond ETF', currency: 'USD', delayedPrice: 110.213, delayedPriceTime: 1687912825703, extendedChange: 0, extendedChangePercent: 0, extendedPrice: 114.3, extendedPriceTime: 1738578994872, high: 114.53, highSource: 'yte p5erilidea  ecd1umn', highTime: 1729075140418, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 114.608, iexCloseTime: 1722621926729, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 111.284, iexOpenTime: 1721784479698, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1674528056408, latestPrice: 114.71, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1683934837545, latestVolume: 23039222, low: 110.84, lowSource: 'd ertn5clye ie 1pueidma', lowTime: 1667733097002, marketCap: 24344567823, oddLotDelayedPrice: 113.879, oddLotDelayedPriceTime: 1731386876342, open: 114.36, openTime: 1698636483700, openSource: 'iicaflof', peRatio: null, previousClose: 114, previousVolume: 3088284, primaryExchange: 'SNAAQD', symbol: 'SHV', volume: 22770578, week52High: 110.73, week52Low: 112.22, ytdChange: 0.002279871442006713, isUSMarketOpen: false,
}, {
  avgTotalVolume: 97881483, calculationPrice: 'close', change: 3.49, changePercent: 0.06047, close: 64.56, closeSource: 'aioflcif', closeTime: 1690571158062, companyName: 'Advanced Micro Devices Inc.', currency: 'USD', delayedPrice: 64.809, delayedPriceTime: 1670213164548, extendedChange: 0.45, extendedChangePercent: 0.0074, extendedPrice: 62.66, extendedPriceTime: 1668877586212, high: 64.56, highSource: 'dntdcee amp  yiei51eurl', highTime: 1698353704427, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 63, iexCloseTime: 1742009299046, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 60.58, iexOpenTime: 1708997676706, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1669397240856, latestPrice: 64.1, latestSource: 'Close', latestTime: 'October 28, 2022', latestUpdate: 1677301688289, latestVolume: 79389077, low: 59.76, lowSource: 'detipuei mdc el1nraey 5', lowTime: 1673095823377, marketCap: 102858403039, oddLotDelayedPrice: 64.5, oddLotDelayedPriceTime: 1703643052648, open: 61.23, openTime: 1688385134232, openSource: 'flificao', peRatio: 27.8, previousClose: 59.2, previousVolume: 87669341, primaryExchange: 'DANSQA', symbol: 'AMD', volume: 79511800, week52High: 167.87, week52Low: 55.33, ytdChange: -0.5144399765652408, isUSMarketOpen: false,
}];

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

function marketTrends(value: string) {
  if (value === 'mostActive') {
    return mostActiveData;
  }
  if (value === 'gainers') {
    return gainersData;
  }
  if (value === 'losers') {
    return losersData;
  }
  if (value === 'unusualVolume') {
    return unusualVolumeData;
  }
  return mostActiveData;
}

function Index() {
  const [markets, setMarkets] = useState('mostActive');
  return (
    <Layout>
      <Grid grow>
        <Container>
          <Title>US Markets</Title>
          <Space h="xl" />
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
                    <Divider />
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
            boxShadow: theme.shadows.sm, borderRadius: theme.radius.md, marginRight: '4px', marginBottom: '15px', marginLeft: '4px',
          })}
          >
            <Space h="xs" />
            <SegmentedControl
              fullWidth
              radius="md"
              value={markets}
              onChange={setMarkets}
              data={[
                { label: 'Most Active', value: 'mostActive' },
                { label: 'Gainers', value: 'gainers' },
                { label: 'Losers', value: 'losers' },
                { label: 'Unusual Volume', value: 'unusualVolume' },
              ]}
            />
            <Space h="sm" />
            <Divider />
            <Space h="xs" />
            <Table>
              <tbody>
                {marketTrends(markets).map((it) => (
                  <Link href={`/stocks/${it.symbol}`} passHref key={it.symbol}>
                    <Box
                      key={it.symbol}
                      sx={(theme) => ({
                        cursor: 'pointer',
                        marginBottom: '1em',
                        '&:hover': {
                          backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3],
                        },
                      })}
                    >
                      <tr key={it.symbol} id="marketTrendsTR">
                        <Group>
                          <Text align="left" sx={{ width: '4em' }}>{it.symbol}</Text>
                          <Text align="left" sx={{ width: '18em' }}>{it.companyName}</Text>
                          <Text align="right" sx={{ width: '3em' }}>{it.latestPrice}</Text>
                          <Text align="right" color={greenOrRed(it.changePercent)} sx={{ width: '3em' }}>
                            {(it.changePercent * 100).toFixed(2)}
                            %
                          </Text>
                        </Group>
                      </tr>
                    </Box>
                  </Link>
                ))}
              </tbody>
            </Table>
          </Container>
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
    </Layout>
  );
}

export default Index;
