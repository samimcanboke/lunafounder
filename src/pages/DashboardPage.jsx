import React, { Fragment, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useWallet } from "@solana/wallet-adapter-react";
import { mintFromCandyMachine } from "../services/MintService";
import userStore from "../store/userStore";
import useUserAllNftsStore from "../store/userAllNfts";
import useUserDashboardStore, {
  useUserLatestSales,
} from "../store/dashboardStore";
import TicketCard from "./PagesComponents/DashboardPageComponent/TicketCard";
import SummaryCards from "./PagesComponents/DashboardPageComponent/SummaryCards";
import SalesRevenueCard from "./PagesComponents/DashboardPageComponent/SalesRevenueCard";
import NFTCarouselSection from "./PagesComponents/DashboardPageComponent/NFTCarouselSection";
import { Button } from "react-bootstrap";

const { setUserMintNft } = userStore();
const tierConfigs = [
  {
    tier: "50",
    url: "https://arweave.net/jGeiZZeBPyn9iBhpc3gcl2lDV2FpgOAn84a0jMztJuk",
    cmId: "8Pg2oEwTPaf2yZHhmsLQ3pwKP6LY7AgZjhGUubfrSxYW",
    authority: "Bq2WXh3cC1E2LmWCfBKHHqU8bTdFHVivUsmP2GtVQ56N",
    collectionMint: "2hikvwP1MrQaT15kFcLW2sieLsnHErjWFhTUt7HiXG5m",
    version: 2,
    col: "2hikvwP1MrQaT15kFcLW2sieLsnHErjWFhTUt7HiXG5m",
  },
  {
    tier: "100",
    url: "https://gateway.irys.xyz/8CrQdAHs550iRiRBNuPHJjiskKrGye4r5gAc1-kjMQ8",
    cmId: "4LrQkwD4owXkEmmgKNvo5CWKUmmAjSCAdxXQe1hAyWVd",
    col: "4WxnmG5xNDqeFnrotL7WYQF9JfAdYyszNZnY6eEKipBe",
    authority: "Bq2WXh3cC1E2LmWCfBKHHqU8bTdFHVivUsmP2GtVQ56N",
    collectionMint: "4WxnmG5xNDqeFnrotL7WYQF9JfAdYyszNZnY6eEKipBe",
    version: 2,
  },
  {
    tier: "500",
    url: "https://gateway.irys.xyz/KalP9TAyiHF3Egwnmc60pGdH7slwoVq_k5e_if2UQPE",
    cmId: "CspHh5wjUMesEH6QkAb8HA6EjbXYXzTGxdqK9vewwJc3",
    col: "H28aTJzDy7Nka1s18nqHL78g2J7mUTbt4b8vPbY9cQJT",
  },
  {
    tier: "1000",
    url: "https://gateway.irys.xyz/vxuwQHmCMsMT7q5IXL31uRjLJjp526raq1PLK6kCRKc",
    cmId: "8gmAnr1Z6hXHrc4eUccGtroZZRGCrAJSvkBN8ZKqo9cd",
    col: "64dF39heZJUq4nZsHhTWcJYD89aFGauL6pCjbBZqQ5Bq",
  },
  {
    tier: "5000",
    url: "https://gateway.irys.xyz/INZJmYW1wSmdeE6gic_stc9PDmmuVXrAKeGJcriNQno",
    cmId: "AB8YhJmpJ65DVUjo51AysvYy9eittb4ymjFGSvSkWTjy",
    col: "Foq4TxJ1VieMAnGE8oHNGdXQPtWZeYrRQeN1ZE7vhw1j",
  },
  {
    tier: "10000",
    url: "https://gateway.irys.xyz/K3nf8DFlt8zxc6XH_Ar5VdPgRuc8c6_yYNoLnMWzrno",
    cmId: "ECkxtfx2dDCbQYtdu8G8EgiSBCt2y78Bkc7jVGorCF4z",
    col: "E48RNxzJwyWh3AQ1BK1Jn7xyNrJ43SMYoojZ14dqUW9G",
  },
  {
    tier: "25000",
    url: "https://gateway.irys.xyz/7nEBt5MZir9qSgDB77Qri1fyTI38RnDwwMpbkQk4xK8",
    cmId: "5dQMTBu1r1kAcnLZy24N8o4kuUdaCK6yTWjEQYuYbrcm",
    col: "A6cPDCRUY7JgxfS66M5ifzkwn5WNSE1ZWcJg6QKX6DtA",
  },
  {
    tier: "50000",
    url: "https://gateway.irys.xyz/_3-eahwCSzpA7dRVtnuFdVbc3dsdB7GPYI4yheRDqM4",
    cmId: "676M8JsXGR1sZJnf7ZaZgGk2FPdiCBM8bzkncUo7k6Y3",
    col: "7pLEZa1PrAjdzDapjdRJgjATffPUPJuWjhkneUUbQVtk",
  },
];

function Dashboard() {
  const { changeBackground } = useContext(ThemeContext);
  const { fetchAllNfts, allNfts } = useUserAllNftsStore();
  const { fetchDashboard, userDashboardStats = {} } = useUserDashboardStore();
  const { fetchLatestSales, latestSales } = useUserLatestSales();
  const wallet = useWallet();

  const [tiers, setTiers] = useState([]);

  const {
    ticketCard: {
      howManyTicketsSold = 0,
      howManyUser = 0,
      hoMuchSolana = 0,
    } = {},
    myFirstLineCount = 0,
    myFirstLineEarnings = 0,
    myTeamCount = 0,
    myTeamEarnings = 0,
    salesRevenue: salesRevenueObj = {},
  } = userDashboardStats;

  const availableYears = Object.keys(salesRevenueObj);
  const defaultYear = availableYears[0] || "";
  const salesRevenueData = salesRevenueObj[defaultYear] || {};

  useEffect(() => {
    changeBackground({ value: "dark", label: "Dark" });
    fetchAllNfts();
    fetchDashboard();
    fetchLatestSales();
    fetchTierData();
  }, []);

  const fetchTierData = async () => {
    const result = [];
    for (let config of tierConfigs) {
      try {
        const res = await fetch(config.url);
        if (!res.ok) continue;
        const json = await res.json();
        result.push({ ...config, data: json });
      } catch (err) {
        console.warn(`❌ ${config.tier} fetch error`, err);
      }
    }
    setTiers(result);
  };

  const handleMint = async ({ cmId, collectionMint, authority, version }) => {
    try {
      const res = await mintFromCandyMachine(
        {
          publicKey: cmId,
          authority,
          collectionMint,
          version,
          rpcUrl:
            "https://yolo-prettiest-daylight.solana-mainnet.quiknode.pro/936aa4affd3be470b2673cf5be2f50e295867270",
        },
        wallet
      );
      await setUserMintNft(res);
    } catch (err) {
      console.error("Mint error:", err);
    }
  };

  return (
    <Fragment>
      <div className="row mb-5">
        <TicketCard
          howManyTicketsSold={howManyTicketsSold}
          howManyUser={howManyUser}
          hoMuchSolana={hoMuchSolana}
        />
        <SummaryCards
          myFirstLineCount={myFirstLineCount}
          myFirstLineEarnings={myFirstLineEarnings}
          myTeamCount={myTeamCount}
          myTeamEarnings={myTeamEarnings}
        />
        <SalesRevenueCard salesRevenueData={salesRevenueData} />
      </div>

      <div className="container mt-5 mb-5">
        <h2 className="text-center text-warning mb-4">
          🎉 Luna Founder NFT Tiers 🎉
        </h2>
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {tiers.map(
            ({ tier, data, cmId, collectionMint, authority, version }) => (
              <div
                key={tier}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "10px",
                  width: "220px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <video
                  src={data.animation_url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controlsList="nofullscreen"
                  style={{
                    width: "200px",
                    height: "320px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <Button
                  className="btn  mt-3 w-100"
                  style={{
                    fontWeight: "bold",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                  onClick={() =>
                    handleMint({ cmId, collectionMint, authority, version })
                  }
                >
                  Mint
                </Button>
              </div>
            )
          )}
        </div>
      </div>

      <NFTCarouselSection
        nftImages={Object.values(allNfts || {})
          .slice(0, 5)
          .map((n) => n.metadata?.animation_url || n.metadata?.image)}
        latestSales={latestSales}
      />
    </Fragment>
  );
}

export default Dashboard;
