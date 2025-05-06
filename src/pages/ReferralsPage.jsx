

import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
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
  const levels = Array.from({ length: 10 }, (_,i) => ({ id: i+1, value: (i+1)*10 }));

  useEffect(() => {
    getProfile();
    fetchTree().then(data => setTreeData(data));
  }, [getProfile, fetchTree]);

  const handleReload = () => window.location.reload();
  const handleExpandAll = () => {  };
  const handleCollapseAll = () => {  };
  const zoomIn = () => setZoomLevel(z => Math.min(2, z*1.2));
  const zoomOut = () => setZoomLevel(z => Math.max(0.5, z*0.8));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data</div>;

  const shareUrl = `https://lunafounder.io/register?r=${user.username}`;
  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        <div className="col-12">
          <div className="card-body p-3 p-md-4">
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start mb-4 gap-4">
              <ReferralsHeader
                position={user.position} bonus={user.bonus}
                onReload={handleReload}
              />
              <div className="d-flex flex-column align-items-start align-items-lg-end col-lg-8 col-12">
                <ShareReferralLink url={shareUrl} />
                <InviteFriends url={shareUrl} />
              </div>
            </div>
            <div className="d-flex flex-column align-items-start align-items-lg-end col-lg-8 col-12">
              <WalletInfo wallet={user.wallet} />
            </div>
            <LevelsTable levels={levels} />
            <div className="d-flex justify-content-center">
              <div className="col-10">
                <TreeControls
                  onExpandAll={handleExpandAll}
                  onCollapseAll={handleCollapseAll}
                  onZoomIn={zoomIn}
                  onZoomOut={zoomOut}
                />
                <Card className="p-2 p-md-5 overflow-auto">
                  <div className="d-flex justify-content-center">
                    <ReferralsTree data={treeData} zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
