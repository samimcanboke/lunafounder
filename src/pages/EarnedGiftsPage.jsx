// import React, { useEffect, useState } from "react";
// import { Table, Form } from "react-bootstrap";
// import { useTranslation } from "react-i18next";
// import EarnedGiftsStore from "../store/EarnedGiftsStore";

// const EarnedGiftsPage = () => {
//   const { t } = useTranslation();
//   const [ticketRewards, setTicketRewards] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEarnedGifts = async () => {
//       try {
//         const response = await EarnedGiftsStore.getMyTickets(); // Ensure the correct method is called
//         if (response && response.ticketRewards) {
//           setTicketRewards(response.ticketRewards);
//         } else {
//           console.error("Invalid response format:", response);
//         }
//       } catch (error) {
//         console.error("Error fetching earned gifts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEarnedGifts();
//   }, []);

//   const handleClaimChange = async (id) => {
//     try {
//       await EarnedGiftsStore.updateClaimStatus(id);
//       setTicketRewards((prev) =>
//         prev.map((reward) =>
//           reward._id === id ? { ...reward, isClaimed: true } : reward
//         )
//       );
//     } catch (error) {
//       console.error("Error updating claim status:", error);
//     }
//   };

//   return (
//     <div className="mt-4">
//       <h3 className="text-center mb-4">{t("earnedGifts.title", "Earned Gifts")}</h3>
//       {loading ? (
//         <p className="text-center">{t("loading", "Loading...")}</p>
//       ) : (
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>{t("earnedGifts.table.username", "Username")}</th>
//               <th>{t("earnedGifts.table.reward", "Reward")}</th>
//               <th>{t("earnedGifts.table.amount", "Amount")}</th>
//               <th>{t("earnedGifts.table.ticket", "Ticket")}</th>
//               <th>{t("earnedGifts.table.date", "Date")}</th>
//               <th>{t("earnedGifts.table.claimed", "Claimed")}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {ticketRewards.map((reward) => (
//               <tr key={reward._id}>
//                 <td>{reward.userId.username}</td>
//                 <td className="text-center">
//                   <img
//                     src={reward.rewardId.imageUrl}
//                     alt={reward.rewardId.name}
//                     style={{ width: "50px", height: "50px", objectFit: "cover", marginBottom: "5px" }}
//                   />
//                   <div>{reward.rewardId.name}</div>
//                 </td>
//                 <td>{reward.rewardId.amount}</td>
//                 <td>{reward.ticket}</td>
//                 <td>{new Date(reward.createdAt).toLocaleDateString()}</td>
//                 <td className="text-center">
//                   <Form.Check
//                     type="checkbox"
//                     checked={reward.isClaimed}
//                     onChange={() => handleClaimChange(reward._id)}
//                     disabled={reward.isClaimed} // Disable if already claimed
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </div>
//   );
// };

// export default EarnedGiftsPage;

"use client";

import { useEffect, useState } from "react";
import { Table, Form, Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import EarnedGiftsStore from "../store/EarnedGiftsStore";

const EarnedGiftsPage = () => {
  const { t } = useTranslation();
  const [ticketRewards, setTicketRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchEarnedGifts(currentPage);
  }, [currentPage]);

  const fetchEarnedGifts = async (page) => {
    setLoading(true);
    try {
      const response = await EarnedGiftsStore.getMyTickets(page, itemsPerPage);
      if (response && response.ticketRewards) {
        // Sort by createdAt date in descending order (newest first)
        const sortedRewards = [...response.ticketRewards].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTicketRewards(sortedRewards);
        setTotalPages(response.totalPages);
        setTotalItems(response.totalTicketRewards);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error fetching earned gifts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimChange = async (id) => {
    try {
      await EarnedGiftsStore.updateClaimStatus(id);
      setTicketRewards((prev) =>
        prev.map((reward) =>
          reward._id === id ? { ...reward, isClaimed: true } : reward
        )
      );
    } catch (error) {
      console.error("Error updating claim status:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];

    // Previous button
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
    );

    // First page
    items.push(
      <Pagination.Item
        key={1}
        active={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        1
      </Pagination.Item>
    );

    // Ellipsis if needed
    if (currentPage > 3) {
      items.push(<Pagination.Ellipsis key="ellipsis1" disabled />);
    }

    // Pages around current page
    for (
      let number = Math.max(2, currentPage - 1);
      number <= Math.min(totalPages - 1, currentPage + 1);
      number++
    ) {
      if (number > 1 && number < totalPages) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        );
      }
    }

    // Ellipsis if needed
    if (currentPage < totalPages - 2 && totalPages > 3) {
      items.push(<Pagination.Ellipsis key="ellipsis2" disabled />);
    }

    // Last page if there are more than 1 page
    if (totalPages > 1) {
      items.push(
        <Pagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    // Next button
    items.push(
      <Pagination.Next
        key="next"
        onClick={() =>
          currentPage < totalPages && handlePageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      />
    );

    return items;
  };

  return (
    <div className="mt-4">
      <h3 className="text-center mb-4">{t("earnedGifts.title")}</h3>
      {loading ? (
        <p className="text-center">{t("loading", "Loading...")}</p>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>{t("earnedGifts.table.username", "Username")}</th>
                <th>{t("earnedGifts.table.reward", "Reward")}</th>
                <th>{t("earnedGifts.table.amount", "Amount")}</th>
                <th>{t("earnedGifts.table.ticket", "Ticket")}</th>
                <th>{t("earnedGifts.table.date", "Date")}</th>
                <th>{t("earnedGifts.table.claimed", "Claimed")}</th>
              </tr>
            </thead>
            <tbody>
              {ticketRewards.map((reward) => (
                <tr key={reward._id}>
                  <td>{reward.userId.username}</td>
                  <td className="text-center">
                    <img
                      src={reward.rewardId.imageUrl || "/placeholder.svg"}
                      alt={reward.rewardId.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        marginBottom: "5px",
                      }}
                    />
                    <div>{reward.rewardId.name}</div>
                  </td>
                  <td>{reward.rewardId.amount}</td>
                  <td>{reward.ticket}</td>
                  <td>{new Date(reward.createdAt).toLocaleDateString()}</td>
                  <td className="text-center">
                    <Form.Check
                      type="checkbox"
                      checked={reward.isClaimed}
                      onChange={() => handleClaimChange(reward._id)}
                      disabled={reward.isClaimed} // Disable if already claimed
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              {t("pagination.showing", "Showing")}{" "}
              {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} -{" "}
              {Math.min(currentPage * itemsPerPage, totalItems)}{" "}
              {t("pagination.of", "of")} {totalItems}{" "}
              {t("pagination.items", "items")}
            </div>
            <Pagination>{renderPaginationItems()}</Pagination>
          </div>
        </>
      )}
    </div>
  );
};

export default EarnedGiftsPage;
