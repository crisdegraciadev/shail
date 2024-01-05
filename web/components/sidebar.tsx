"use client";

import { Separator } from "./ui/separator";
import AccountSwitcher from "./account-switcher";
import { ACCOUNTS, BOTTOM_NAV, TOP_NAV } from "../app/data";
import Nav from "./nav";

export default function Sidebar() {
  return (
    <>
      <div className="p-2">
        <AccountSwitcher accounts={ACCOUNTS} />
      </div>
      <Separator />
      <Nav items={TOP_NAV} />
      <Separator />
      <Nav items={BOTTOM_NAV} />
    </>
  );
}
