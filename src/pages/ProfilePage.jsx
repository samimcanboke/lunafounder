// import React, { useEffect, useRef, useState } from "react";
// import useUserAllNftsStore from "../store/userAllNfts";
// import { Button, Card, Col, Row, Table, Modal } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import loadable from "@loadable/component";
// import pMinDelay from "p-min-delay";
// import CreditCard from "../images/credit_card.png";
// import MrLuna3 from "../images/MRLuna3.png";
// import useUserTreeStore from "../store/userTreeStore";
// import useUserStore from "../store/userStore";
// import useUserReferralsStore from "../store/userReferralsStore";
// import { useTranslation } from "react-i18next";
// import { buyWithCreditCard } from "../services/BuyWithCardService";
// // import { setOldNftMinted } from "../store/userOldNfts";
// import useUserOldNftsStore from "../store/userOldNfts";
// import { mintFromCandyMachine } from "../services/MintService"; // Import mint service
// import { useWallet } from "@solana/wallet-adapter-react"; // Import wallet adapter
// import myNftsStore from "../store/myNftsStore";

// const RevenueChart = loadable(() =>
//   pMinDelay(import("../jsx/components/Karciz/EventPage/RevenueChart"), 1000)
// );
// const TicketChart = loadable(() =>
//   pMinDelay(import("../jsx/components/Karciz/EventPage/TicketChart"), 1000)
// );

// const ProfilePage = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const { tree, fetchTree } = useUserTreeStore();
//   const { user, getProfile } = useUserStore();
//   const { firstline: referrals, fetchTree: fetchReferrals } =
//     useUserReferralsStore();
//   const { allNfts, fetchAllNfts } = useUserAllNftsStore();
//   const { userOldNfts, getOldNfts, setOldNftMinted } = useUserOldNftsStore();

//   // console.log(userOldNfts, "userOldNfts");

//   const [showCardModal, setShowCardModal] = useState(false);
//   const [tiers, setTiers] = useState([]);
//   const [showOldNftsModal, setShowOldNftsModal] = useState(false);
//   const [oldNftsMetadata, setOldNftsMetadata] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // My NFTs state
//   const [myNfts, setMyNfts] = useState([]);
//   const [myNftsMetadata, setMyNftsMetadata] = useState([]);

//   const handleCardClick = () => {
//     setShowCardModal(true);
//   };
//   const handleModalClose = () => setShowCardModal(false);

//   const handleMintOldNftsClick = async () => {
//     setIsLoading(true);
//     setShowOldNftsModal(true);

//     try {
//       // First fetch the old NFTs if not already loaded
//       const fetchedOldNfts = await getOldNfts();

//       // Then fetch metadata for each NFT
//       await fetchOldNftMetadata(fetchedOldNfts || userOldNfts);
//     } catch (error) {
//       console.error("Error loading old NFTs:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const { publicKey, connected, connecting, connect } = useWallet(); // Wallet hooks

//   const handleMint = async ({ cmId, collectionMint, authority, version }) => {
//     if (!connected) {
//       try {
//         await connect();
//         await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for connection
//       } catch (error) {
//         console.error("Failed to connect wallet:", error);
//         alert("Failed to connect wallet. Please try again.");
//         return;
//       }
//     }

//     if (!publicKey) {
//       alert("Please connect your wallet first!");
//       return;
//     }

//     try {
//       const walletAdapter = window.solana || window.solflare;
//       if (!walletAdapter) {
//         throw new Error(
//           "No compatible wallet found. Please install Phantom or Solflare wallet."
//         );
//       }

//       const res = await mintFromCandyMachine(
//         {
//           publicKey: cmId,
//           authority,
//           collectionMint,
//           version,
//           rpcUrl:
//             "https://yolo-prettiest-daylight.solana-mainnet.quiknode.pro/936aa4affd3be470b2673cf5be2f50e295867270",
//         },
//         {
//           publicKey,
//           connected,
//           connecting,
//           signTransaction: walletAdapter.signTransaction.bind(walletAdapter),
//           signAllTransactions:
//             walletAdapter.signAllTransactions.bind(walletAdapter),
//           signMessage: walletAdapter.signMessage.bind(walletAdapter),
//         },
//         false,
//         true
//       );

//       alert("Mint successful!");
//       await setOldNftMinted(res.mint, cmId);
//     } catch (err) {
//       console.error("Mint error:", err);
//       alert(
//         err.message || "An error occurred while minting. Please try again."
//       );
//     }
//   };

//   // Create an array of refs for each possible video
//   const videoRefs = useRef([]);

//   // Set up refs when component mounts
//   useEffect(() => {
//     videoRefs.current = videoRefs.current.slice(0, 7);
//   }, []);

//   useEffect(() => {
//     fetchTree();
//     getProfile();
//     fetchReferrals();
//   }, [fetchTree, getProfile, fetchReferrals]);

//   useEffect(() => {
//     if (!showCardModal) return;

//     (async () => {
//       await fetchAllNfts();
//       const list = await Promise.all(
//         allNfts.map(async (cfg) => {
//           try {
//             const res = await fetch(cfg.url);
//             if (!res.ok) return null;
//             const data = await res.json();
//             return { ...cfg, data };
//           } catch {
//             return null;
//           }
//         })
//       );
//       setTiers(list.filter(Boolean));
//     })();
//   }, [showCardModal]);

//   // Play videos in sequence when loaded
//   useEffect(() => {
//     if (videoRefs.current.length > 0) {
//       const order = [0, 6, 1, 5, 2, 4, 3];
//       // Initial staggered play
//       order.forEach((vidIdx, seqIdx) => {
//         if (videoRefs.current[vidIdx]) {
//           setTimeout(() => {
//             const video = videoRefs.current[vidIdx];
//             if (video)
//               video.play().catch((e) => console.log("Video play error:", e));
//           }, seqIdx * 100);
//         }
//       });

//       // Loop each on end with 2s delay
//       videoRefs.current.forEach((video) => {
//         if (!video) return;
//         video.addEventListener("ended", () => {
//           setTimeout(() => {
//             if (video)
//               video.play().catch((e) => console.log("Video play error:", e));
//           }, 2000);
//         });
//       });
//     }
//   }, [videoRefs.current]);

//   const fetchOldNftMetadata = async (nfts) => {
//     setIsLoading(true);
//     const result = [];

//     for (let nft of nfts) {
//       try {
//         if (!nft.url) {
//           console.warn(`No URL found for NFT: ${nft.nftName}`);
//           continue;
//         }

//         const res = await fetch(nft.url);
//         if (!res.ok) {
//           console.warn(
//             `Failed to fetch metadata for ${nft.nftName}: ${res.status}`
//           );
//           continue;
//         }

//         const json = await res.json();
//         result.push({ ...nft, metadata: json });
//       } catch (err) {
//         console.warn(
//           `❌ Old NFT metadata fetch error for ${nft.nftName}:`,
//           err
//         );
//       }
//     }

//     setOldNftsMetadata(result);
//     setIsLoading(false);
//     return result;
//   };

//   // Pagination state for referrals
//   const [referralsPage, setReferralsPage] = useState(1);
//   const referralsPerPage = 5;

//   // Calculate paginated referrals
//   const paginatedReferrals = referrals
//     ? referrals.slice(
//         (referralsPage - 1) * referralsPerPage,
//         referralsPage * referralsPerPage
//       )
//     : [];

//   const totalReferralsPages = referrals
//     ? Math.ceil(referrals.length / referralsPerPage)
//     : 1;

//   // My NFTs fetch
//   useEffect(() => {
//     const fetchMyNfts = async () => {
//       try {
//         const data = await myNftsStore.getMyNfts();
//         // console.log("myNftsStore.getMyNfts() result:", data);
//         setMyNfts(data);

//         // Fetch metadata for each NFT
//         const metaList = await Promise.all(
//           (data || []).map(async (nft) => {
//             try {
//               const res = await fetch(nft.url);
//               if (!res.ok) return { ...nft, metadata: null };
//               const meta = await res.json();
//               return { ...nft, metadata: meta };
//             } catch {
//               return { ...nft, metadata: null };
//             }
//           })
//         );
//         setMyNftsMetadata(metaList);
//       } catch (err) {
//         console.error("Error fetching my NFTs:", err);
//       }
//     };
//     fetchMyNfts();
//   }, [fetchTree, getProfile, fetchReferrals]);

//   return (
//     <div className="container-fluid">
//       {/* Profile section */}
//       <Row className="my-5 justify-content-center">
//         <Col xs={12} className="text-center">
//           <div className="d-flex align-items-center justify-content-center flex-column flex-md-row gap-3">
//             <div
//               className="rounded-circle overflow-hidden mb-2 mb-md-0"
//               style={{ width: "80px", height: "80px", flexShrink: 0 }}
//             >
//               <img
//                 src={MrLuna3 || "/placeholder.svg"}
//                 alt={t("profilePage.profilePictureAlt", {
//                   name: `${user?.firstName} ${user?.lastName}`,
//                 })}
//                 className="w-100 h-100 object-fit-cover"
//               />
//             </div>
//             <h1 className="display-6 fw-bold mb-0">
//               {user?.firstName} {user?.lastName}
//             </h1>
//           </div>
//         </Col>
//       </Row>
//       {/* Wallet stats section */}
//       <Row className="my-4 g-4">
//         <Col xs={12} sm={6} lg={3}>
//           <Card
//             className="h-100 overflow-hidden"
//             style={{ minHeight: "100px" }}
//           >
//             <div className="card-header border-0 pb-0">
//               <div>
//                 <p className="mb-2">{t("profilePage.walletBalance")}</p>
//                 <h3 className="mb-0 fs-24 font-w600">{user?.walletBalance}</h3>
//               </div>
//             </div>
//             <div className="card-body p-0">
//               <div
//                 className="col-7 px-0 offset-5 mt-widget"
//                 style={{ pointerEvents: "none" }}
//               >
//                 <RevenueChart />
//               </div>
//             </div>
//           </Card>
//         </Col>
//         {/* Other stat cards */}
//         <Col xs={12} sm={6} lg={3}>
//           <Card
//             className="h-100 overflow-hidden"
//             style={{ minHeight: "100px" }}
//           >
//             <div className="card-header border-0 pb-0">
//               <div>
//                 <p className="mb-2">{t("profilePage.firstLineEarnings")}</p>
//                 <h3 className="mb-0 fs-24 font-w600">
//                   {user?.firstLineEarnings} {t("profilePage.pcs")}
//                 </h3>
//               </div>
//             </div>
//             <div className="card-body p-0">
//               <div
//                 className="col-7 px-0 offset-5 mt-widget"
//                 style={{ pointerEvents: "none" }}
//               >
//                 <TicketChart />
//               </div>
//             </div>
//           </Card>
//         </Col>

//         <Col xs={12} sm={6} lg={3}>
//           <Card
//             className="h-100 overflow-hidden bg-image bg-danger"
//             style={{ minHeight: "100px" }}
//           >
//             <div className="card-header border-0">
//               <div>
//                 <p className="mb-2 text-light">
//                   {t("profilePage.teamEarnings")}
//                 </p>
//                 <h3 className="mb-0 fs-24 font-w600 text-white">
//                   {user?.teamEarnings} {t("profilePage.pcs")}
//                 </h3>
//               </div>
//             </div>
//           </Card>
//         </Col>

//         <Col xs={12} sm={6} lg={3}>
//           <Card
//             onClick={handleCardClick}
//             className="h-100 overflow-hidden position-relative"
//             style={{
//               cursor: "pointer",
//               backgroundImage: `linear-gradient(to bottom, #b03636, rgba(0, 0, 0, 0.5)), url(${CreditCard})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               backgroundRepeat: "no-repeat",
//               minHeight: "100px",
//             }}
//           >
//             <div className="card-header border-0 pb-0">
//               <div className="position-absolute top-0 start-0 p-3">
//                 <p className="mb-2 text-light">
//                   {t("profilePage.creditCardForm")}
//                 </p>
//               </div>
//             </div>
//             <div className="card-body p-0">
//               <div className="col-7 px-0 offset-5 mt-widget"></div>
//             </div>
//           </Card>
//         </Col>
//       </Row>

//       {/* Buy-with-Card Modal */}
//       <Modal show={showCardModal} onHide={handleModalClose} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>{t("profilePage.buyNftTiers")}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Row className="justify-content-center g-4">
//             {tiers.map(
//               ({ tier, data, cmId }) =>
//                 data && (
//                   <Col key={tier} xs={12} sm={6} md={4} lg={3}>
//                     <div
//                       style={{
//                         background: "transparent",
//                         border: "1px solid rgba(0,0,0,0.1)",
//                         borderRadius: "12px",
//                         padding: "10px",
//                       }}
//                       className="d-flex flex-column align-items-center"
//                     >
//                       <div className="w-100" style={{ maxWidth: "180px" }}>
//                         <video
//                           className="img-fluid"
//                           controlsList="nofullscreen"
//                           src={data.animation_url || data.image}
//                           autoPlay
//                           muted
//                           loop
//                           playsInline
//                           style={{ borderRadius: "10px" }}
//                         />
//                       </div>
//                       <Button
//                         size="sm"
//                         className="mt-3 w-100"
//                         style={{ fontSize: "0.85rem" }}
//                         onClick={() =>
//                           buyWithCreditCard(cmId)
//                             .then((res) => {
//                               if (res.url) {
//                                 window.open(res.url, "_blank");
//                               } else {
//                                 alert("No URL returned");
//                               }
//                             })
//                             .catch((e) => alert(e.message))
//                         }
//                       >
//                         {t("profilePage.buyWithCreditCard")}
//                       </Button>
//                     </div>
//                   </Col>
//                 )
//             )}
//           </Row>
//         </Modal.Body>
//       </Modal>

//       {/* Mint Button */}
//       <Row className="my-5">
//         <Col
//           xs={12}
//           className="text-center position-relative d-flex g-2 justify-content-center gap-3"
//           style={{ zIndex: 1 }}
//         >
//           <Button
//             className="btn-lg fw-semibold px-5 py-3"
//             style={{
//               background:
//                 "linear-gradient(to bottom, rgba(255,246,159,1), rgba(213,165,84,1))",
//               border: "none",
//               color: "#fff",
//               borderRadius: "30px",
//             }}
//             onClick={() => navigate("/dashboard")}
//           >
//             {t("profilePage.mintNewNfts")}
//           </Button>

//           <Button
//             className="btn-lg fw-semibold px-5 py-3"
//             style={{
//               background:
//                 "linear-gradient(to bottom, rgba(255,246,159,1), rgba(213,165,84,1))",
//               border: "none",
//               color: "#fff",
//               borderRadius: "30px",
//             }}
//             onClick={handleMintOldNftsClick}
//           >
//             {t("profilePage.mintOldNfts")}
//           </Button>
//         </Col>
//       </Row>

//       {/* Old NFTs Modal - UPDATED WITH ANIMATION DISPLAY */}
//       <Modal
//         show={showOldNftsModal}
//         onHide={() => setShowOldNftsModal(false)}
//         size="lg"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>{t("oldNfts.title") || "Your NFTs"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {isLoading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <p className="mt-3">Loading NFT data...</p>
//             </div>
//           ) : oldNftsMetadata.length > 0 ? (
//             <div className="d-flex flex-wrap justify-content-center gap-4">
//               {oldNftsMetadata.map((nft) => (
//                 <div
//                   key={nft._id || nft.cmId}
//                   style={{
//                     background: "transparent",
//                     border: "1px solid rgba(255,255,255,0.1)",
//                     borderRadius: "12px",
//                     padding: "10px",
//                     width: "220px",
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                   }}
//                 >
//                   {nft.metadata?.animation_url ? (
//                     <video
//                       controlsList="nofullscreen"
//                       src={nft.metadata.animation_url}
//                       autoPlay
//                       muted
//                       loop
//                       noFullscreen
//                       playsInline
//                       style={{
//                         width: "200px",
//                         height: "320px",
//                         objectFit: "cover",
//                         borderRadius: "10px",
//                       }}
//                     />
//                   ) : nft.metadata?.image ? (
//                     <img
//                       src={nft.metadata.image}
//                       alt={nft.nftName}
//                       style={{
//                         width: "200px",
//                         height: "320px",
//                         objectFit: "cover",
//                         borderRadius: "10px",
//                       }}
//                     />
//                   ) : (
//                     <div
//                       style={{
//                         width: "200px",
//                         height: "320px",
//                         backgroundColor: "#1C222A",
//                         borderRadius: "10px",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         color: "white",
//                         fontSize: "14px",
//                         textAlign: "center",
//                       }}
//                     >
//                       {nft.nftName}
//                     </div>
//                   )}
//                   {/* <p style={{ margin: "10px 0", color: "white" }}>
//                     {nft.nftName}
//                   </p>
//                   <p style={{ margin: "5px 0", color: "white" }}>
//                     {t("Price")}: ${nft.price}
//                   </p> */}
//                   <Button
//                     className="btn mt-2 w-100"
//                     style={{
//                       fontWeight: "bold",
//                       borderRadius: "8px",
//                       fontSize: "14px",
//                       background:
//                         !connected || nft.isMinted ? "gray" : undefined,
//                       cursor:
//                         !connected || nft.isMinted ? "not-allowed" : "pointer",
//                     }}
//                     onClick={() =>
//                       handleMint({
//                         cmId: nft.cmId,
//                         collectionMint: nft.collection_mint,
//                         authority: nft.mint,
//                         version: nft.signature,
//                       })
//                     }
//                     disabled={!connected || nft.isMinted}
//                   >
//                     {!connected
//                       ? t("dashboard.connectWallet")
//                       : nft.isMinted
//                       ? t("dashboard.minted")
//                       : t("dashboard.mint")}
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           ) : userOldNfts.length > 0 ? (
//             <div className="d-flex flex-wrap justify-content-center gap-4">
//               {userOldNfts.map((nft) => (
//                 <div
//                   key={nft._id || nft.cmId}
//                   style={{
//                     background: "transparent",
//                     border: "1px solid rgba(255,255,255,0.1)",
//                     borderRadius: "12px",
//                     padding: "10px",
//                     width: "220px",
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: "200px",
//                       height: "320px",
//                       backgroundColor: "#1C222A",
//                       borderRadius: "10px",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       color: "white",
//                       fontSize: "14px",
//                       textAlign: "center",
//                     }}
//                   >
//                     {nft.nftName}
//                   </div>
//                   <p style={{ margin: "10px 0", color: "white" }}>
//                     {t("Price")}: ${nft.price}
//                   </p>
//                   <Button
//                     className="btn mt-3 w-100"
//                     style={{
//                       fontWeight: "bold",
//                       borderRadius: "8px",
//                       fontSize: "14px",
//                       background: nft.isMinted ? "gray" : undefined,
//                       cursor: nft.isMinted ? "not-allowed" : "pointer",
//                     }}
//                     onClick={() =>
//                       handleMint({
//                         cmId: nft.cmId,
//                         collectionMint: nft.collection_mint,
//                         authority: nft.mint,
//                         version: nft.signature,
//                       })
//                     }
//                     disabled={nft.isMinted}
//                   >
//                     {nft.isMinted ? t("dashboard.minted") : t("dashboard.mint")}
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-5">
//               <p>{t("oldNfts.noNftsFound") || "No NFTs found"}</p>
//             </div>
//           )}
//         </Modal.Body>
//       </Modal>

//       {/* My NFTs Section */}
//       <Row className="mt-5">
//         <Col xs={12}>
//           <h2 className="display-6 fw-bold mb-3">My NFTs</h2>
//           <div className="d-flex flex-wrap gap-4 justify-content-center">
//             {myNftsMetadata.length === 0 ? (
//               <div className="text-white-50">No NFTs found.</div>
//             ) : (
//               myNftsMetadata.map((nft, idx) => (
//                 <div
//                   key={nft.mint || idx}
//                   style={{
//                     background: "transparent",
//                     border: "1px solid rgba(255,255,255,0.1)",
//                     borderRadius: "12px",
//                     padding: "10px",
//                     width: "220px",
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                   }}
//                 >
//                   {nft.metadata?.animation_url ? (
//                     <video
//                       controlsList="nofullscreen"
//                       src={nft.metadata.animation_url}
//                       autoPlay
//                       muted
//                       loop
//                       playsInline
//                       style={{
//                         width: "200px",
//                         height: "320px",
//                         objectFit: "cover",
//                         borderRadius: "10px",
//                       }}
//                     />
//                   ) : nft.metadata?.image ? (
//                     <img
//                       src={nft.metadata.image}
//                       alt={nft.metadata?.name || "NFT"}
//                       style={{
//                         width: "200px",
//                         height: "320px",
//                         objectFit: "cover",
//                         borderRadius: "10px",
//                       }}
//                     />
//                   ) : (
//                     <div
//                       style={{
//                         width: "200px",
//                         height: "320px",
//                         backgroundColor: "#1C222A",
//                         borderRadius: "10px",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         color: "white",
//                         fontSize: "14px",
//                         textAlign: "center",
//                       }}
//                     >
//                       {nft.metadata?.name || nft.mint}
//                     </div>
//                   )}
//                   {/* <Button
//                     className="btn mt-3 w-100"
//                     style={{
//                       fontWeight: "bold",
//                       borderRadius: "8px",
//                       fontSize: "14px",
//                       background: !connected ? "gray" : undefined,
//                       cursor: !connected ? "not-allowed" : "pointer",
//                     }}
//                     onClick={() =>
//                       window.open(nft.explorerLink, "_blank")
//                     }
//                     disabled={!connected || connecting}
//                   >
//                     {connecting
//                       ? t("dashboard.connecting")
//                       : !connected
//                       ? t("dashboard.connectWallet")
//                       : t("dashboard.mint")}
//                   </Button> */}
//                 </div>
//               ))
//             )}
//           </div>
//         </Col>
//       </Row>

//       {/* Referrals Section */}
//       <Row>
//         <Col xs={12} className="mt-4">
//           <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
//             <div>
//               <h2 className="display-6 fw-bold mb-2">
//                 {t("profilePage.yourReferrals")}
//               </h2>
//               <p className="text-white-50 mb-0">
//                 {t("profilePage.directReferrals", {
//                   count: referrals?.length || 0,
//                 })}
//               </p>
//             </div>
//           </div>
//           <Card
//             style={{
//               background: "rgba(33, 37, 41, 1)",
//               border: "1px solid rgba(55, 55, 55, 1)",
//               borderRadius: "12px",
//             }}
//           >
//             <Card.Body className="p-0 p-sm-3">
//               <div className="table-responsive">
//                 <Table variant="dark" borderless className="mb-0">
//                   <thead>
//                     <tr>
//                       <th style={{ color: "rgba(255,255,255,0.5)" }}>
//                         {t("profilePage.table.date")}
//                       </th>
//                       <th style={{ color: "rgba(255,255,255,0.5)" }}>
//                         {t("profilePage.table.walletAddress")}
//                       </th>
//                       <th style={{ color: "rgba(255,255,255,0.5)" }}>Code</th>
//                       <th style={{ color: "rgba(255,255,255,0.5)" }}>
//                         {t("profilePage.table.status")}
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {!referrals?.length ? (
//                       <tr>
//                         <td colSpan="4" className="text-center text-white-50">
//                           {t("profilePage.noReferrals")}
//                         </td>
//                       </tr>
//                     ) : (
//                       paginatedReferrals.map((referral, index) => (
//                         <tr
//                           key={index}
//                           style={{
//                             borderBottom: "1px solid rgba(55, 55, 55, 1)",
//                           }}
//                         >
//                           <td className="text-white">
//                             {new Date(referral.createdAt).toLocaleDateString()}
//                           </td>
//                           <td>{referral.wallet}</td>
//                           <td>{referral.code}</td>
//                           <td>{referral.status}</td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </Table>
//               </div>
//               {/* Pagination controls */}
//               {referrals && referrals.length > referralsPerPage && (
//                 <div className="d-flex justify-content-center align-items-center mt-3 gap-2">
//                   <Button
//                     size="sm"
//                     variant="secondary"
//                     onClick={() => setReferralsPage((p) => Math.max(1, p - 1))}
//                     disabled={referralsPage === 1}
//                   >
//                     &lt;
//                   </Button>
//                   <span className="text-white-50">
//                     {referralsPage} / {totalReferralsPages}
//                   </span>
//                   <Button
//                     size="sm"
//                     variant="secondary"
//                     onClick={() =>
//                       setReferralsPage((p) =>
//                         Math.min(totalReferralsPages, p + 1)
//                       )
//                     }
//                     disabled={referralsPage === totalReferralsPages}
//                   >
//                     &gt;
//                   </Button>
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useEffect, useRef, useState } from "react";
import useUserAllNftsStore from "../store/userAllNfts";
import { Button, Card, Col, Row, Table, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import CreditCard from "../images/credit_card.png";
import MrLuna3 from "../images/MRLuna3.png";
import useUserTreeStore from "../store/userTreeStore";
import useUserStore from "../store/userStore";
import useUserReferralsStore from "../store/userReferralsStore";
import { useTranslation } from "react-i18next";
import { buyWithCreditCard } from "../services/BuyWithCardService";
// import { setOldNftMinted } from "../store/userOldNfts";
import useUserOldNftsStore from "../store/userOldNfts";
import { mintFromCandyMachine } from "../services/MintService"; // Import mint service
import { useWallet } from "@solana/wallet-adapter-react"; // Import wallet adapter
import myNftsStore from "../store/myNftsStore";

const RevenueChart = loadable(() =>
  pMinDelay(import("../jsx/components/Karciz/EventPage/RevenueChart"), 1000)
);
const TicketChart = loadable(() =>
  pMinDelay(import("../jsx/components/Karciz/EventPage/TicketChart"), 1000)
);

const ProfilePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { tree, fetchTree } = useUserTreeStore();
  const { user, getProfile } = useUserStore();
  const { firstline: referrals, fetchTree: fetchReferrals } =
    useUserReferralsStore();
  const { allNfts, fetchAllNfts } = useUserAllNftsStore();
  const { userOldNfts, getOldNfts, setOldNftMinted, preOldNftDistribution } =
    useUserOldNftsStore();

  // console.log(userOldNfts, "userOldNfts");

  const [showCardModal, setShowCardModal] = useState(false);
  const [tiers, setTiers] = useState([]);
  const [showOldNftsModal, setShowOldNftsModal] = useState(false);
  const [oldNftsMetadata, setOldNftsMetadata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // My NFTs state
  const [myNfts, setMyNfts] = useState([]);
  const [myNftsMetadata, setMyNftsMetadata] = useState([]);

  const handleCardClick = () => {
    setShowCardModal(true);
  };
  const handleModalClose = () => setShowCardModal(false);

  const handleMintOldNftsClick = async () => {
    setIsLoading(true);
    setShowOldNftsModal(true);

    try {
      // First fetch the old NFTs if not already loaded
      const fetchedOldNfts = await getOldNfts();

      // Then fetch metadata for each NFT
      await fetchOldNftMetadata(fetchedOldNfts || userOldNfts);
    } catch (error) {
      console.error("Error loading old NFTs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const { publicKey, connected, connecting, connect } = useWallet(); // Wallet hooks

  const handleMint = async ({
    cmId,
    collectionMint,
    authority,
    version,
    price,
  }) => {
    console.log("PRICE:", price);
    // Eğer cüzdan bağlı değilse bağlanmayı dene
    if (!connected) {
      try {
        await connect();
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Bağlantının tamamlanması için bekle
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

    const walletAdapter = window.solana || window.solflare;
    if (!walletAdapter) {
      alert(
        "No compatible wallet found. Please install Phantom or Solflare wallet."
      );
      return;
    }

    try {
      await preOldNftDistribution(price);
    } catch (error) {
      console.error("Pre old NFT distribution error:", error);
      alert(error.message || "An error occurred during pre-mint processing.");
      return;
    }

    try {
      // Mint işlemi
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
        false,
        true
      );

      alert("Mint successful!");
      await setOldNftMinted(res.mint, cmId);
    } catch (err) {
      console.error("Mint error:", err);
      alert(
        err.message || "An error occurred while minting. Please try again."
      );
    }
  };

  // Create an array of refs for each possible video
  const videoRefs = useRef([]);

  // Set up refs when component mounts
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, 7);
  }, []);

  useEffect(() => {
    fetchTree();
    getProfile();
    fetchReferrals();
  }, [fetchTree, getProfile, fetchReferrals]);

  useEffect(() => {
    if (!showCardModal) return;

    (async () => {
      await fetchAllNfts();
      const list = await Promise.all(
        allNfts.map(async (cfg) => {
          try {
            const res = await fetch(cfg.url);
            if (!res.ok) return null;
            const data = await res.json();
            return { ...cfg, data };
          } catch {
            return null;
          }
        })
      );
      setTiers(list.filter(Boolean));
    })();
  }, [showCardModal]);

  // Play videos in sequence when loaded
  useEffect(() => {
    if (videoRefs.current.length > 0) {
      const order = [0, 6, 1, 5, 2, 4, 3];
      // Initial staggered play
      order.forEach((vidIdx, seqIdx) => {
        if (videoRefs.current[vidIdx]) {
          setTimeout(() => {
            const video = videoRefs.current[vidIdx];
            if (video)
              video.play().catch((e) => console.log("Video play error:", e));
          }, seqIdx * 100);
        }
      });

      // Loop each on end with 2s delay
      videoRefs.current.forEach((video) => {
        if (!video) return;
        video.addEventListener("ended", () => {
          setTimeout(() => {
            if (video)
              video.play().catch((e) => console.log("Video play error:", e));
          }, 2000);
        });
      });
    }
  }, [videoRefs.current]);

  const fetchOldNftMetadata = async (nfts) => {
    setIsLoading(true);
    const result = [];

    for (let nft of nfts) {
      try {
        if (!nft.url) {
          console.warn(`No URL found for NFT: ${nft.nftName}`);
          continue;
        }

        const res = await fetch(nft.url);
        if (!res.ok) {
          console.warn(
            `Failed to fetch metadata for ${nft.nftName}: ${res.status}`
          );
          continue;
        }

        const json = await res.json();
        result.push({ ...nft, metadata: json });
      } catch (err) {
        console.warn(
          `❌ Old NFT metadata fetch error for ${nft.nftName}:`,
          err
        );
      }
    }

    setOldNftsMetadata(result);
    setIsLoading(false);
    return result;
  };

  // Pagination state for referrals
  const [referralsPage, setReferralsPage] = useState(1);
  const referralsPerPage = 5;

  // Calculate paginated referrals
  const paginatedReferrals = referrals
    ? referrals.slice(
        (referralsPage - 1) * referralsPerPage,
        referralsPage * referralsPerPage
      )
    : [];

  const totalReferralsPages = referrals
    ? Math.ceil(referrals.length / referralsPerPage)
    : 1;

  // My NFTs fetch
  useEffect(() => {
    const fetchMyNfts = async () => {
      try {
        const data = await myNftsStore.getMyNfts();
        // console.log("myNftsStore.getMyNfts() result:", data);
        setMyNfts(data);

        // Fetch metadata for each NFT
        const metaList = await Promise.all(
          (data || []).map(async (nft) => {
            try {
              const res = await fetch(nft.url);
              if (!res.ok) return { ...nft, metadata: null };
              const meta = await res.json();
              return { ...nft, metadata: meta };
            } catch {
              return { ...nft, metadata: null };
            }
          })
        );
        setMyNftsMetadata(metaList);
      } catch (err) {
        console.error("Error fetching my NFTs:", err);
      }
    };
    fetchMyNfts();
  }, [fetchTree, getProfile, fetchReferrals]);

  return (
    <div className="container-fluid">
      {/* Profile section */}
      <Row className="my-5 justify-content-center">
        <Col xs={12} className="text-center">
          <div className="d-flex align-items-center justify-content-center flex-column flex-md-row gap-3">
            <div
              className="rounded-circle overflow-hidden mb-2 mb-md-0"
              style={{ width: "80px", height: "80px", flexShrink: 0 }}
            >
              <img
                src={MrLuna3 || "/placeholder.svg"}
                alt={t("profilePage.profilePictureAlt", {
                  name: `${user?.firstName} ${user?.lastName}`,
                })}
                className="w-100 h-100 object-fit-cover"
              />
            </div>
            <h1 className="display-6 fw-bold mb-0">
              {user?.firstName} {user?.lastName}
            </h1>
          </div>
        </Col>
      </Row>
      {/* Wallet stats section */}
      <Row className="my-4 g-4">
        <Col xs={12} sm={6} lg={3}>
          <Card
            className="h-100 overflow-hidden"
            style={{ minHeight: "100px" }}
          >
            <div className="card-header border-0 pb-0">
              <div>
                <p className="mb-2">{t("profilePage.walletBalance")}</p>
                <h3 className="mb-0 fs-24 font-w600">{user?.walletBalance}</h3>
              </div>
            </div>
            <div className="card-body p-0">
              <div
                className="col-7 px-0 offset-5 mt-widget"
                style={{ pointerEvents: "none" }}
              >
                <RevenueChart />
              </div>
            </div>
          </Card>
        </Col>
        {/* Other stat cards */}
        <Col xs={12} sm={6} lg={3}>
          <Card
            className="h-100 overflow-hidden"
            style={{ minHeight: "100px" }}
          >
            <div className="card-header border-0 pb-0">
              <div>
                <p className="mb-2">{t("profilePage.firstLineEarnings")}</p>
                <h3 className="mb-0 fs-24 font-w600">
                  {user?.firstLineEarnings} {t("profilePage.pcs")}
                </h3>
              </div>
            </div>
            <div className="card-body p-0">
              <div
                className="col-7 px-0 offset-5 mt-widget"
                style={{ pointerEvents: "none" }}
              >
                <TicketChart />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card
            className="h-100 overflow-hidden bg-image bg-danger"
            style={{ minHeight: "100px" }}
          >
            <div className="card-header border-0">
              <div>
                <p className="mb-2 text-light">
                  {t("profilePage.teamEarnings")}
                </p>
                <h3 className="mb-0 fs-24 font-w600 text-white">
                  {user?.teamEarnings} {t("profilePage.pcs")}
                </h3>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card
            onClick={handleCardClick}
            className="h-100 overflow-hidden position-relative"
            style={{
              cursor: "pointer",
              backgroundImage: `linear-gradient(to bottom, #b03636, rgba(0, 0, 0, 0.5)), url(${CreditCard})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "100px",
            }}
          >
            <div className="card-header border-0 pb-0">
              <div className="position-absolute top-0 start-0 p-3">
                <p className="mb-2 text-light">
                  {t("profilePage.creditCardForm")}
                </p>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="col-7 px-0 offset-5 mt-widget"></div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Buy-with-Card Modal */}
      <Modal show={showCardModal} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{t("profilePage.buyNftTiers")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-center g-4">
            {tiers.map(
              ({ tier, data, cmId }) =>
                data && (
                  <Col key={tier} xs={12} sm={6} md={4} lg={3}>
                    <div
                      style={{
                        background: "transparent",
                        border: "1px solid rgba(0,0,0,0.1)",
                        borderRadius: "12px",
                        padding: "10px",
                      }}
                      className="d-flex flex-column align-items-center"
                    >
                      <div className="w-100" style={{ maxWidth: "180px" }}>
                        <video
                          className="img-fluid"
                          controlsList="nofullscreen"
                          src={data.animation_url || data.image}
                          autoPlay
                          muted
                          loop
                          playsInline
                          style={{ borderRadius: "10px" }}
                        />
                      </div>
                      <Button
                        size="sm"
                        className="mt-3 w-100"
                        style={{ fontSize: "0.85rem" }}
                        onClick={() =>
                          buyWithCreditCard(cmId)
                            .then((res) => {
                              if (res.url) {
                                window.open(res.url, "_blank");
                              } else {
                                alert("No URL returned");
                              }
                            })
                            .catch((e) => alert(e.message))
                        }
                      >
                        {t("profilePage.buyWithCreditCard")}
                      </Button>
                    </div>
                  </Col>
                )
            )}
          </Row>
        </Modal.Body>
      </Modal>

      {/* Mint Button */}
      <Row className="my-5">
        <Col
          xs={12}
          className="text-center position-relative d-flex g-2 justify-content-center gap-3"
          style={{ zIndex: 1 }}
        >
          <Button
            className="btn-lg fw-semibold px-5 py-3"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,246,159,1), rgba(213,165,84,1))",
              border: "none",
              color: "#fff",
              borderRadius: "30px",
            }}
            onClick={() => navigate("/dashboard")}
          >
            {t("profilePage.mintNewNfts")}
          </Button>

          <Button
            className="btn-lg fw-semibold px-5 py-3"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,246,159,1), rgba(213,165,84,1))",
              border: "none",
              color: "#fff",
              borderRadius: "30px",
            }}
            onClick={handleMintOldNftsClick}
          >
            {t("profilePage.mintOldNfts")}
          </Button>
        </Col>
      </Row>

      {/* Old NFTs Modal - UPDATED WITH ANIMATION DISPLAY */}
      <Modal
        show={showOldNftsModal}
        onHide={() => setShowOldNftsModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("oldNfts.title") || "Your NFTs"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading NFT data...</p>
            </div>
          ) : oldNftsMetadata.length > 0 ? (
            <div className="d-flex flex-wrap justify-content-center gap-4">
              {oldNftsMetadata.map((nft) => (
                <div
                  key={nft._id || nft.cmId}
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
                  {nft.metadata?.animation_url ? (
                    <video
                      controlsList="nofullscreen"
                      src={nft.metadata.animation_url}
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
                  ) : nft.metadata?.image ? (
                    <img
                      src={nft.metadata.image}
                      alt={nft.nftName}
                      style={{
                        width: "200px",
                        height: "320px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "200px",
                        height: "320px",
                        backgroundColor: "#1C222A",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        fontSize: "14px",
                        textAlign: "center",
                      }}
                    >
                      {nft.nftName}
                    </div>
                  )}
                  {/* <p style={{ margin: "10px 0", color: "white" }}>
                    {nft.nftName}
                  </p>
                  <p style={{ margin: "5px 0", color: "white" }}>
                    {t("Price")}: ${nft.price}
                  </p> */}
                  <Button
                    className="btn mt-2 w-100"
                    style={{
                      fontWeight: "bold",
                      borderRadius: "8px",
                      fontSize: "14px",
                      background:
                        !connected || nft.isMinted ? "gray" : undefined,
                      cursor:
                        !connected || nft.isMinted ? "not-allowed" : "pointer",
                    }}
                    onClick={() =>
                      handleMint({
                        cmId: nft.cmId,
                        collectionMint: nft.collection_mint,
                        authority: nft.mint,
                        version: nft.signature,
                        price: nft.price, // <-- burada eklenmeli
                      })
                    }
                    disabled={!connected || nft.isMinted}
                  >
                    {!connected
                      ? t("dashboard.connectWallet")
                      : nft.isMinted
                      ? t("dashboard.minted")
                      : t("dashboard.mint")}
                  </Button>
                </div>
              ))}
            </div>
          ) : userOldNfts.length > 0 ? (
            <div className="d-flex flex-wrap justify-content-center gap-4">
              {userOldNfts.map((nft) => (
                <div
                  key={nft._id || nft.cmId}
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
                  <div
                    style={{
                      width: "200px",
                      height: "320px",
                      backgroundColor: "#1C222A",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    {nft.nftName}
                  </div>
                  <p style={{ margin: "10px 0", color: "white" }}>
                    {t("Price")}: ${nft.price}
                  </p>
                  <Button
                    className="btn mt-3 w-100"
                    style={{
                      fontWeight: "bold",
                      borderRadius: "8px",
                      fontSize: "14px",
                      background: nft.isMinted ? "gray" : undefined,
                      cursor: nft.isMinted ? "not-allowed" : "pointer",
                    }}
                    onClick={() =>
                      handleMint({
                        cmId: nft.cmId,
                        collectionMint: nft.collection_mint,
                        authority: nft.mint,
                        version: nft.signature,
                      })
                    }
                    disabled={nft.isMinted}
                  >
                    {nft.isMinted ? t("dashboard.minted") : t("dashboard.mint")}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <p>{t("oldNfts.noNftsFound") || "No NFTs found"}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* My NFTs Section */}
      <Row className="mt-5">
        <Col xs={12}>
          <h2 className="display-6 fw-bold mb-3">My NFTs</h2>
          <div className="d-flex flex-wrap gap-4 justify-content-center">
            {myNftsMetadata.length === 0 ? (
              <div className="text-white-50">No NFTs found.</div>
            ) : (
              myNftsMetadata.map((nft, idx) => (
                <div
                  key={nft.mint || idx}
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
                  {nft.metadata?.animation_url ? (
                    <video
                      controlsList="nofullscreen"
                      src={nft.metadata.animation_url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{
                        width: "200px",
                        height: "320px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  ) : nft.metadata?.image ? (
                    <img
                      src={nft.metadata.image}
                      alt={nft.metadata?.name || "NFT"}
                      style={{
                        width: "200px",
                        height: "320px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "200px",
                        height: "320px",
                        backgroundColor: "#1C222A",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        fontSize: "14px",
                        textAlign: "center",
                      }}
                    >
                      {nft.metadata?.name || nft.mint}
                    </div>
                  )}
                  {/* <Button
                    className="btn mt-3 w-100"
                    style={{
                      fontWeight: "bold",
                      borderRadius: "8px",
                      fontSize: "14px",
                      background: !connected ? "gray" : undefined,
                      cursor: !connected ? "not-allowed" : "pointer",
                    }}
                    onClick={() =>
                      window.open(nft.explorerLink, "_blank")
                    }
                    disabled={!connected || connecting}
                  >
                    {connecting
                      ? t("dashboard.connecting")
                      : !connected
                      ? t("dashboard.connectWallet")
                      : t("dashboard.mint")}
                  </Button> */}
                </div>
              ))
            )}
          </div>
        </Col>
      </Row>

      {/* Referrals Section */}
      <Row>
        <Col xs={12} className="mt-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
            <div>
              <h2 className="display-6 fw-bold mb-2">
                {t("profilePage.yourReferrals")}
              </h2>
              <p className="text-white-50 mb-0">
                {t("profilePage.directReferrals", {
                  count: referrals?.length || 0,
                })}
              </p>
            </div>
          </div>
          <Card
            style={{
              background: "rgba(33, 37, 41, 1)",
              border: "1px solid rgba(55, 55, 55, 1)",
              borderRadius: "12px",
            }}
          >
            <Card.Body className="p-0 p-sm-3">
              <div className="table-responsive">
                <Table variant="dark" borderless className="mb-0">
                  <thead>
                    <tr>
                      <th style={{ color: "rgba(255,255,255,0.5)" }}>
                        {t("profilePage.table.date")}
                      </th>
                      <th style={{ color: "rgba(255,255,255,0.5)" }}>
                        {t("profilePage.table.walletAddress")}
                      </th>
                      <th style={{ color: "rgba(255,255,255,0.5)" }}>Code</th>
                      <th style={{ color: "rgba(255,255,255,0.5)" }}>
                        {t("profilePage.table.status")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!referrals?.length ? (
                      <tr>
                        <td colSpan="4" className="text-center text-white-50">
                          {t("profilePage.noReferrals")}
                        </td>
                      </tr>
                    ) : (
                      paginatedReferrals.map((referral, index) => (
                        <tr
                          key={index}
                          style={{
                            borderBottom: "1px solid rgba(55, 55, 55, 1)",
                          }}
                        >
                          <td className="text-white">
                            {new Date(referral.createdAt).toLocaleDateString()}
                          </td>
                          <td>{referral.wallet}</td>
                          <td>{referral.code}</td>
                          <td>{referral.status}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
              {/* Pagination controls */}
              {referrals && referrals.length > referralsPerPage && (
                <div className="d-flex justify-content-center align-items-center mt-3 gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setReferralsPage((p) => Math.max(1, p - 1))}
                    disabled={referralsPage === 1}
                  >
                    &lt;
                  </Button>
                  <span className="text-white-50">
                    {referralsPage} / {totalReferralsPages}
                  </span>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                      setReferralsPage((p) =>
                        Math.min(totalReferralsPages, p + 1)
                      )
                    }
                    disabled={referralsPage === totalReferralsPages}
                  >
                    &gt;
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
