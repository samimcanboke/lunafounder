import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Cookies from "js-cookie";
import useUserStore from "../store/userStore";
import useUserTreeStore from "../store/userTreeStore";
import ReferralsHeader from "./PagesComponents/ReferralsPageComponent/ReferralsHeader";
import ShareReferralLink from "./PagesComponents/ReferralsPageComponent/ShareReferralLink";
import InviteFriends from "./PagesComponents/ReferralsPageComponent/InviteFriends";
import WalletInfo from "./PagesComponents/ReferralsPageComponent/WalletInfo";
import LevelsTable from "./PagesComponents/ReferralsPageComponent/LevelsTable";
import TreeControls from "./PagesComponents/ReferralsPageComponent/TreeControls";
import ReferralsTree from "./PagesComponents/ReferralsPageComponent/ReferralsTree";

const Referrals = () => {
  const { user, loading, error, getProfile } = useUserStore();
  const { fetchTree } = useUserTreeStore();
  const [treeData, setTreeData] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [expandAllCount, setExpandAllCount] = useState(0);
  const [collapseAllCount, setCollapseAllCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const levels = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    value: (i + 1) * 10,
  }));

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const referral = urlParams.get("r");
    if (referral) {
      Cookies.set("referral", referral, { expires: 7 }); // Save referral in cookies for 7 days
    }
    getProfile();
    fetchTree().then((data) => setTreeData(data));
  }, [getProfile, fetchTree]);

  const handleReload = () => window.location.reload();
  const handleExpandAll = () => setExpandAllCount((c) => c + 1);
  const handleCollapseAll = () => setCollapseAllCount((c) => c + 1);
  const handleSearch = (term) => setSearchTerm(term);
  const zoomIn = () => setZoomLevel((z) => Math.min(2, z * 1.2));
  const zoomOut = () => setZoomLevel((z) => Math.max(0.5, z * 0.8));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data</div>;

  const shareUrl = `https://lunafounder.io/?r=${user?.username}`;
  const shareUrlInvite = `https://lunafounder.io/register/?r=${user?.username}`;

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        <div className="col-12">
          <div className="card-body p-3 p-md-4">
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start mb-4 gap-4">
              <ReferralsHeader
                position={user.position}
                bonus={user.bonus}
                onReload={handleReload}
              />
              <div className="d-flex flex-column align-items-start align-items-lg-end col-lg-8 col-12">
                <ShareReferralLink url={shareUrl} />
                <InviteFriends url={shareUrlInvite} />
              </div>
            </div>
            <div className="d-flex flex-column align-items-start align-items-lg-end col-lg-10 col-12">
              <WalletInfo wallet={user.wallet} />
            </div>
            <LevelsTable levels={levels} tree={treeData} />
            <div className="d-flex justify-content-center">
              <div className="col-10">
                <TreeControls
                  onExpandAll={handleExpandAll}
                  onCollapseAll={handleCollapseAll}
                  onSearch={handleSearch}
                  onZoomIn={zoomIn}
                  onZoomOut={zoomOut}
                />

                <div className="d-flex justify-content-center border">
                  <ReferralsTree
                    data={treeData}
                    zoomLevel={zoomLevel}
                    setZoomLevel={setZoomLevel}
                    expandAllCount={expandAllCount}
                    collapseAllCount={collapseAllCount}
                    searchTerm={searchTerm}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
