import { useState } from 'react';
import {
  SegmentedControl, Button, Title, Stack,
} from '@mantine/core';
import Link from 'next/link';

interface markestData {
  markets: {
    value: string;
    data: { label: string; individualData: object }[];
  }[];
}
const tempData: markestData = {
  data: [
    {
      value: 'us',
      data: [
        {
          label: 'S&P 500',
          individualData: {
            avgTotalVolume: 99918686, calculationPrice: 'close', change: -5.7, changePercent: -0.01623, close: 367.79, closeSource: 'laificfo', closeTime: 1720190065437, companyName: 'SSgA Active Trust - S&P 500 ETF TRUST ETF', currency: 'USD', delayedPrice: 372.73, delayedPriceTime: 1680662988232, extendedChange: 0, extendedChangePercent: 0, extendedPrice: 372.36, extendedPriceTime: 1672206114832, high: 377.56, highSource: 'cen rd1a5e dpeulimt iey', highTime: 1681631382379, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 372.07, iexCloseTime: 1668764101123, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 364.58, iexOpenTime: 1733340355510, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1701213699212, latestPrice: 371.36, latestSource: 'Close', latestTime: 'September 30, 2022', latestUpdate: 1668383308111, latestVolume: 160598573, low: 357.3, lowSource: 'iiud5a rtce ep1lmnedey ', lowTime: 1703021618562, marketCap: 327952111227, oddLotDelayedPrice: 375.03, oddLotDelayedPriceTime: 1710116177106, open: 377.56, openTime: 1664667818040, openSource: 'offlicia', peRatio: null, previousClose: 374.85, previousVolume: 115210223, primaryExchange: 'S EAACRYN', symbol: 'SPY', volume: 156497787, week52High: 487.17, week52Low: 371.92, ytdChange: -0.26067575454197933, isUSMarketOpen: false,
          },
        },
        {
          label: 'Dow Jones',
          individualData: {
            avgTotalVolume: 3542646, calculationPrice: 'close', change: -4.94, changePercent: -0.0169, close: 290.7, closeSource: 'fiiolcaf', closeTime: 1733106339716, companyName: 'SSgA Active Trust - SPDR Dow Jones Industrial Average ETF', currency: 'USD', delayedPrice: 287.82, delayedPriceTime: 1727129353948, extendedChange: 0, extendedChangePercent: 0, extendedPrice: 287.7, extendedPriceTime: 1704556647702, high: 305.1, highSource: '1neimae yeicl dupdt5re ', highTime: 1682899811206, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 296.5, iexCloseTime: 1679661607009, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 298.2, iexOpenTime: 1684046066230, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1694671956071, latestPrice: 288.4, latestSource: 'Close', latestTime: 'September 30, 2022', latestUpdate: 1735707860942, latestVolume: 3848891, low: 290.7, lowSource: ' tuele5pide1 mradnieyc ', lowTime: 1676116736947, marketCap: 25250580007, oddLotDelayedPrice: 295.5, oddLotDelayedPriceTime: 1732847745673, open: 305.1, openTime: 1678371731296, openSource: 'ffloaiic', peRatio: null, previousClose: 298.56, previousVolume: 3400541, primaryExchange: 'AEARS CYN', symbol: 'DIA', volume: 4003732, week52High: 379.74, week52Low: 294.62, ytdChange: -0.2180725115420281, isUSMarketOpen: false,
          },
        },
        {
          label: 'QQQ',
          individualData: {
            avgTotalVolume: 68954099, calculationPrice: 'close', change: -4.76, changePercent: -0.01745, close: 272.47, closeSource: 'oailcffi', closeTime: 1732262976505, companyName: 'Invesco Capital Management LLC - Invesco QQQ Trust Series 1', currency: 'USD', delayedPrice: 269.87, delayedPriceTime: 1746434747279, extendedChange: 0.4, extendedChangePercent: 0.0015, extendedPrice: 279.26, extendedPriceTime: 1743613383755, high: 284.07, highSource: 'r5e1emicndeal d  uipeyt', highTime: 1733456415208, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 270.27, iexCloseTime: 1716625547048, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 281.167, iexOpenTime: 1739782066657, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1695193746333, latestPrice: 279.94, latestSource: 'Close', latestTime: 'September 30, 2022', latestUpdate: 1713267295795, latestVolume: 81819244, low: 269.3, lowSource: 'mapirXrt IiceeE  le', lowTime: 1699713820040, marketCap: 147332879769, oddLotDelayedPrice: 278.55, oddLotDelayedPriceTime: 1664895896159, open: 280.21, openTime: 1698100432612, openSource: 'caioiffl', peRatio: null, previousClose: 274.64, previousVolume: 82525565, primaryExchange: 'AQSADN', symbol: 'QQQ', volume: 79927197, week52High: 407.2, week52Low: 279.3, ytdChange: -0.3551732790639113, isUSMarketOpen: false,
          },
        },
        {
          label: 'Russell 2000',
          individualData: {
            avgTotalVolume: 30932740, calculationPrice: 'close', change: -1.21, changePercent: -0.00753, close: 168.2, closeSource: 'iliaoffc', closeTime: 1707340360969, companyName: 'BlackRock Institutional Trust Company N.A. - iShares Russell 2000 ETF', currency: 'USD', delayedPrice: 168.6, delayedPriceTime: 1724036200004, extendedChange: 0, extendedChangePercent: 0, extendedPrice: 168.9, extendedPriceTime: 1682761805195, high: 174.911, highSource: ' ilr pdc5eamneeeud y1ti', highTime: 1741396405916, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 166.6, iexCloseTime: 1713310305233, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 168.26, iexOpenTime: 1694583093089, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1711789793425, latestPrice: 172.31, latestSource: 'Close', latestTime: 'September 30, 2022', latestUpdate: 1726519708718, latestVolume: 42555014, low: 168.2, lowSource: 'p eriXaIEctieme r l', lowTime: 1683833795243, marketCap: 49761794005, oddLotDelayedPrice: 167.6, oddLotDelayedPriceTime: 1730272644363, open: 170.51, openTime: 1671257692595, openSource: 'foliiafc', peRatio: null, previousClose: 169.17, previousVolume: 31903338, primaryExchange: 'AEN ACYRS', symbol: 'IWM', volume: 40672572, week52High: 251.11, week52Low: 168.89, ytdChange: -0.2641693238170819, isUSMarketOpen: false,
          },
        },
      ],
    },
    {
      value: 'treasuries',
      data: [
        {
          label: '30 Year',
          individualData: {
            dataId: 'DGS30', date: '2022-09-29 00:00:00', frequency: 'daily', value: 3.71, id: 'TREASURY', key: 'DGS30', subkey: 'NONE', updated: 1664733603000,
          },
        },
        {
          label: '10 Year',
          individualData: {
            dataId: 'DGS10', date: '2022-09-29 00:00:00', frequency: 'daily', value: 3.76, id: 'TREASURY', key: 'DGS10', subkey: 'NONE', updated: 1664733602000,
          },
        },
        {
          label: '5 Year',
          individualData: {
            dataId: 'DGS5', date: '2022-09-29 00:00:00', frequency: 'daily', value: 3.98, id: 'TREASURY', key: 'DGS5', subkey: 'NONE', updated: 1664733602000,
          },
        },
        {
          label: '3 Year',
          individualData: {
            dataId: 'DGS3', date: '2022-09-29 00:00:00', frequency: 'daily', value: 4.19, id: 'TREASURY', key: 'DGS3', subkey: 'NONE', updated: 1664733601000,
          },
        },
        {
          label: '1 Year',
          individualData: {
            dataId: 'DGS1', date: '2022-09-29 00:00:00', frequency: 'daily', value: 3.98, id: 'TREASURY', key: 'DGS1', subkey: 'NONE', updated: 1664733601000,
          },
        },
      ],
    },
    {
      value: 'commodities',
      data: [
        {
          label: 'WTI',
          individualData: {
            dataId: 'DCOILWTICO', date: '2022-09-26 00:00:00', frequency: 'daily', value: 77.17, id: 'ENERGY', key: 'DCOILWTICO', subkey: 'NONE', updated: 1664733627000,
          },
        },
        {
          label: 'Brent',
          individualData: {
            dataId: 'DCOILWTICO', date: '2022-09-26 00:00:00', frequency: 'daily', value: 77.17, id: 'ENERGY', key: 'DCOILWTICO', subkey: 'NONE', updated: 1664733627000,
          },
        },
        {
          label: 'Natural Gas',
          individualData: {
            dataId: 'DHHNGSP', date: '2022-09-27 00:00:00', frequency: 'daily', value: 6.83, id: 'ENERGY', key: 'DHHNGSP', subkey: 'NONE', updated: 1664733627000,
          },
        },
      ],
    },
    {
      value: 'crypto',
      data: [
        {
          label: 'Bitcoin',
          individualData:
          { price: '19407.27', symbol: 'BTCUSD' },
        },
        {
          label: 'Ethereum',
          individualData:
          { price: '1346.66', symbol: 'ETHUSD' },
        },
      ],
    },
    {
      value: 'currencies',
      data: [
        {
          label: 'EUR / USD',
          individualData:
          {
            rate: 0.97023,
            symbol: 'EURUSD',
            timestamp: 1664410799111,
            id: 'FX-DAILY',
            key: 'EURUSD',
            subkey: 'SPOT',
            date: 1664410799000,
            updated: 1664413200000,
          },
        },
        {
          label: 'USD / JPY',
          individualData:
          {
            rate: 144.429,
            symbol: 'USDJPY',
            timestamp: 1664410799113,
            id: 'FX-DAILY',
            key: 'USDJPY',
            subkey: 'SPOT',
            date: 1664410799000,
            updated: 1664413201000,
          },
        },
        {
          label: 'GBP / USD',
          individualData:
          {
            rate: 1.0818,
            symbol: 'GBPUSD',
            timestamp: 1664410799112,
            id: 'FX-DAILY',
            key: 'GBPUSD',
            subkey: 'SPOT',
            date: 1664410799000,
            updated: 1664413200000,
          },
        },
        {
          label: 'USD / CAD',
          individualData:
          {
            rate: 1.36412,
            symbol: 'USDCAD',
            timestamp: 1664410799361,
            id: 'FX-DAILY',
            key: 'USDCAD',
            subkey: 'SPOT',
            date: 1664410799000,
            updated: 1664413200000,
          },
        },
        {
          label: 'USD / CNY',
          individualData:
          {
            rate: 6.9193,
            timestamp: 1578873400000,
            id: 'FX-DAILY',
            key: 'USDCNY',
            subkey: 'SPOT',
            date: 1578873400000,
            updated: 1652531939155.4587,
          },
        },
      ],
    },
  ],
};

export default function Banner() {
  const [value, setValue] = useState('react');

  const buttons = () => (
    <Button>
      temp
    </Button>
  );

  const groups = tempData.markets.map((it) => {
    const links = it.data.map((ind) => (
      <Link
        key={ind.label}
        href={ind.label}
        passHref
      >
        <Button>
          {ind.label}
        </Button>
      </Link>
    ));

    return (
      <div key={it.value}>
        {links}
      </div>
    );
  });

  return (
    <Stack>
      <Title order={4}>Markets</Title>
      <SegmentedControl
        value={value}
        onChange={setValue}
        data={[
          { label: 'US', value: 'us' },
          { label: 'Europe', value: 'europe' },
          { label: 'Asia', value: 'asia' },
          { label: 'Treasuries', value: 'treasuries' },
          { label: 'Currencies', value: 'currencies' },
          { label: 'Commodities', value: 'commodities' },
          { label: 'Crypto', value: 'crypto' },
        ]}
      />
    </Stack>
  );
}
