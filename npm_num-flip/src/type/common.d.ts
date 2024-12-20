interface Window {
  readerCookies: any;
  cloudCookies: any;
  FoxitAccountListMobile: any;
  [cookiesName: string]: CookiesNameType;
}

type CookiesNameType = {
  accessToken: string;
};
