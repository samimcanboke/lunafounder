import React, {
  Fragment,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useWallet } from "@solana/wallet-adapter-react";
import { mintFromCandyMachine } from "../services/MintService";
import useUserStore from "../store/userStore";
import useUserAllNftsStore from "../store/userAllNfts";
import useUserDashboardStore, {
  useUserLatestSales,
} from "../store/dashboardStore";
import useLastNftsStore from "../store/lastNftsStore";
import useUserOldNftsStore from "../store/userOldNfts";
import TicketCard from "./PagesComponents/DashboardPageComponent/TicketCard";
import SummaryCards from "./PagesComponents/DashboardPageComponent/SummaryCards";
import SalesRevenueCard from "./PagesComponents/DashboardPageComponent/SalesRevenueCard";
import NFTCarouselSection from "./PagesComponents/DashboardPageComponent/NFTCarouselSection";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function Dashboard() {
  const { changeBackground } = useContext(ThemeContext);
  const { publicKey, connected, connecting, connect } = useWallet();
  const { setUserMintNft } = useUserStore();
  const { allNfts, fetchAllNfts } = useUserAllNftsStore();
  const { userOldNfts, getOldNfts } = useUserOldNftsStore();
  const { userDashboardStats, fetchDashboard } = useUserDashboardStore();
  const { fetchLatestSales, latestSales } = useUserLatestSales();
  const { lastNfts, fetchLastNfts } = useLastNftsStore();
  const { t } = useTranslation();

  const [tiers, setTiers] = useState([]);

  // detect dev flag
  const params = new URLSearchParams(window.location.search);
  const isDev = params.get("dev") === "true";

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
    getOldNfts();
    fetchDashboard();
    fetchLatestSales();
    fetchLastNfts(isDev); // fetch last NFTs with dev flag
  }, [publicKey, connected, connecting]);

  useEffect(() => {
    if (allNfts?.length) fetchTierData();
  }, [allNfts]);


  const fetchTierData = async () => {
    const result = [];
    for (let config of allNfts) {
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
    // Determine if we're in dev mode via URL param
    const params = new URLSearchParams(window.location.search);
    const isDev = params.get("dev") === "true";



    if (!connected) {
      try {
        await connect();
        // Wait a moment for the connection to be established
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        alert("Failed to connect wallet. Please try again.");
        return;
      }
    }

    if (!publicKey) {
      alert("Please connect your wallet first!");
      return;
    }

    try {
      // Get the current wallet adapter
      const walletAdapter = window.solana || window.solflare;
      if (!walletAdapter) {
        throw new Error(
          "No compatible wallet found. Please install Phantom or Solflare wallet."
        );
      }



      const res = await mintFromCandyMachine(
        {
          publicKey: cmId,
          authority,
          collectionMint,
          version,
          rpcUrl:
            "https://yolo-prettiest-daylight.solana-mainnet.quiknode.pro/936aa4affd3be470b2673cf5be2f50e295867270",
        },
        {
          publicKey,
          connected,
          connecting,
          signTransaction: walletAdapter.signTransaction.bind(walletAdapter),
          signAllTransactions:
            walletAdapter.signAllTransactions.bind(walletAdapter),
          signMessage: walletAdapter.signMessage.bind(walletAdapter),
        },
        isDev
      );
      await setUserMintNft({
        ...res,
        isDev,
      });
    } catch (err) {
      console.error("Mint error:", err);
      alert(
        err.message || "An error occurred while minting. Please try again."
      );
    }
  };

  // build carousel images by matching lastNfts to fetched tiers metadata
  const carouselImages = useMemo(() => {
    return lastNfts
      .map((nft) => {
        const match = tiers.find(
          (item) => item.cmId === nft.metadata.publicKey
        );
        if (!match?.data) return null;
        // prefer image over animation_url
        return match.data.image || match.data.animation_url;
      })
      .filter(Boolean);
  }, [lastNfts, tiers]);

  useEffect(() => {

  }, [carouselImages]);

  return (
    <Fragment>
      <div className="row mb-5">
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
          {t("dashboard.tiersTitle")}
        </h2>
        {!connected && (
          <div className="text-center text-warning mb-4">
            {t("dashboard.connectWalletPrompt")}
          </div>
        )}
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
                  controlsList="nofullscreen"
                  src={data.animation_url}
                  autoPlay
                  muted
                  loop
                  noFullscreen
                  playsInline
                  style={{
                    width: "200px",
                    height: "320px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <Button
                  className="btn mt-3 w-100"
                  style={{
                    fontWeight: "bold",
                    borderRadius: "8px",
                    fontSize: "14px",
                    background: !connected ? "gray" : undefined,
                    cursor: !connected ? "not-allowed" : "pointer",
                  }}
                  onClick={() =>
                    handleMint({ cmId, collectionMint, authority, version })
                  }
                  disabled={!connected || connecting}
                >
                  {connecting
                    ? t("dashboard.connecting")
                    : !connected
                    ? t("dashboard.connectWallet")
                    : t("dashboard.mint")}
                </Button>
              </div>
            )
          )}
        </div>
      </div>

      <NFTCarouselSection images={carouselImages} latestSales={lastNfts} />
    </Fragment>
  );
}

export default Dashboard;
