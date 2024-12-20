interface ListItem {
  accountId: string;
  accountType: string;
  authType: string;
  companyId: string;
  companyName?: string;
  isActivate?: boolean;
  isCurrent: boolean;
  isLogin: boolean;
  nickName: string;
  userId: string;
  role: string;
  company?: boolean;
}

interface UserInfoType {
  accountId?: string;
  accountType?: string;
  authType?: string;
  companyId?: string;
  email?: string;
  emailVerified?: boolean;
  hasPassword?: boolean;
  nickName?: string;
  phone?: string;
  phoneVerified?: boolean;
  userId?: string;
  [key: string]: any;
}

interface LogoutType {
  ssoUrl: string;
  iamUrl: string;
  dom: string;
}

type ListType = ListItem[];
