export interface UserMenu {
  account: MenuItem;
  administration: MenuItem;
  settings: MenuItem;
  logout: MenuItem;
}

export interface CommonMenu {
  search: MenuItem;
  aboutUs: MenuItem;
}

export interface MenuItem {
  label: string;
  onClick: () => void;
}
