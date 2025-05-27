import React, { useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import useUserStore from "../../../store/userStore";

export const MenuList = [
  {
    title: "Dashboard",
    classsChange: "mm-collapse",
    iconStyle: <i class="bi bi-house"></i>,
    to: "dashboard",
  },
  {
    title: "Referrals",
    classsChange: "mm-collapse",
    to: "referrals",
    iconStyle: <i class="bi bi-people"></i>,
  },
  {
    title: "Profile",
    to: "my-ref-profile",
    classsChange: "mm-collapse",
    iconStyle: <i className="flaticon-user"></i>,
  },
  {
    title: "Settings",
    to: "settings",
    classsChange: "mm-collapse",
    iconStyle: <i class="bi bi-gear"></i>,
  },
  {
    title: "Referral Rules",
    to: "referral-rules",
    classsChange: "mm-collapse",
    iconStyle: <i class="bi bi-file-earmark-text"></i>,
  },
  {
    title: "Ranks",
    to: "rank",
    classsChange: "mm-collapse",
    iconStyle: <i class="bi bi-patch-check"></i>,
  },
  {
    title: "Tickets",
    to: "tickets",
    classsChange: "mm-collapse",
    iconStyle: <i class="bi bi-ticket-perforated"></i>,
  },
  // Add a separator for admin routes
  { isSeparator: true },
  {
    title: "Old Distributions",
    to: "admin-overview",
    classsChange: "mm-collapse",
    iconStyle: <i class="bi bi-person-up"></i>,
    adminOnly: true,
  },
  {
    title: "Admin Rewards",
    to: "admin-rewards",
    classsChange: "mm-collapse",
    iconStyle: <i class="bi bi-award"></i>,
    adminOnly: true,
  },
  {
    title: "Users New NFTs",
    to: "user-new-nfts",
    classsChange: "mm-collapse",
    iconStyle: <i class="bi bi-nut"></i>,
    adminOnly: true,
  },
  {
    title: "Users Old NFTs",
    to: "user-nfts",
    classsChange: "mm-collapse",
    iconStyle: <i class="bi bi-hexagon"></i>,
    adminOnly: true,
  },
  {
    title: "Purchased Tickets",
    to: "purchased-tickets",

    classsChange: "mm-collapse",
    iconStyle: <i class="bi bi-ticket-detailed"></i>,
    adminOnly: true,
  },

  {
    title: "Earned Gifts",
    to: "earned-gifts",
    classsChange: "mm-collapse",
    iconStyle: <i class="bi bi-gift"></i>,
    adminOnly: true,
  },

    {
    title: "User List",
    to: "user-list",
    classsChange: "mm-collapse",
    iconStyle: <i class="bi bi-people-fill"></i>,
    adminOnly: true,
  },
];

const Menu = () => {
  const { user } = useUserStore();
  const isAdmin = user?.role === "admin";

  return (
    <div className="menu">
      {MenuList.map((item, index) => {
        if (item.isSeparator) {
          return (
            <hr
              key={index}
              style={{
                border: "1px solid rgba(255, 255, 255, 0.2)",
                margin: "10px 0",
              }}
            />
          );
        }
        // Skip admin items if user is not admin
        if (item.adminOnly && !isAdmin) {
          return null;
        }
        return (
          <div
            key={index}
            className={item.classsChange}
            style={{
              cursor: "pointer",
            }}
          >
            {item.iconStyle}
            <span>{item.title}</span>
            {item.customComponent}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
