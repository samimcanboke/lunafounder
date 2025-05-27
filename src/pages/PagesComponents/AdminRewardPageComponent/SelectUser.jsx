// "use client"
// import { Card, Button, Form } from "react-bootstrap"
// import { useTranslation } from "react-i18next"
// import RewardStore from "../../../store/RewardStore"

// const SelectUser = ({ onRandomize, username, userId, tickets, onChange, rewardDetails, selectedRewardId }) => {
//   const { t } = useTranslation()

//   const handleGiveReward = async () => {
//     if (!userId || !selectedRewardId || !rewardDetails?.userTickets?.[0]) {
//       alert("Please select a user and reward first")
//       return
//     }

//     try {
//       const ticket = rewardDetails.userTickets[0]
//       await RewardStore.claimReward(userId, selectedRewardId, ticket)
//       alert("Reward given successfully!")
//     } catch (error) {
//       console.error("Error giving reward:", error)
//       alert("Failed to give reward. Please try again.")
//     }
//   }

//   return (
//     <Card>
//       <Card.Header>
//         <Card.Title>{t("adminReward.selectUser.title")}</Card.Title>
//       </Card.Header>
//       <Card.Body>
//         <Button variant="primary" className="mb-3 w-100" onClick={onRandomize} disabled={!rewardDetails}>
//           {t("adminReward.selectUser.randomize")}
//         </Button>

//         <Form.Group className="mb-3">
//           <Form.Label>{t("adminReward.selectUser.username")}</Form.Label>
//           <Form.Control type="text" value={username} onChange={(e) => onChange("username", e.target.value)} readOnly />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>{t("adminReward.selectUser.userId")}</Form.Label>
//           <Form.Control type="text" value={userId} onChange={(e) => onChange("userId", e.target.value)} readOnly />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>{t("adminReward.selectUser.tickets")}</Form.Label>
//           <Form.Control type="text" value={tickets} onChange={(e) => onChange("tickets", e.target.value)} readOnly />
//         </Form.Group>

//         {/* New Give Reward Button */}
//         <Button
//           variant="success"
//           className="w-100"
//           onClick={handleGiveReward}
//           disabled={!userId || !selectedRewardId || !rewardDetails?.userTickets?.length}
//         >
//           {t("adminReward.selectUser.giveReward", "Give Reward")}
//         </Button>
//       </Card.Body>
//     </Card>
//   )
// }

// export default SelectUser





"use client"
import RewardStore from "../../../store/RewardStore"

const SelectUser = ({ onRandomize, username, userId, tickets, onChange, rewardDetails, selectedRewardId }) => {
  const handleGiveReward = async () => {
    if (!userId || !selectedRewardId) {
      alert("Please select a user and reward first")
      return
    }

    if (!rewardDetails?.userTickets?.length) {
      alert("No tickets available for this user")
      return
    }

    try {
      // Get the first ticket from userTickets array
      const ticket = rewardDetails.userTickets[0]

      // Call the claimReward method with the correct parameters
      const result = await RewardStore.claimReward(userId, selectedRewardId, ticket)

      alert("Reward given successfully!")
    } catch (error) {
      console.error("Error giving reward:", error)
      alert("Failed to give reward. Please try again.")
    }
  }

  return (
    <div>
      <button onClick={onRandomize}>Randomize User</button>
      {username && <p>Selected User: {username}</p>}
      {userId && <p>User ID: {userId}</p>}
      {tickets && <p>Tickets: {tickets}</p>}
      <button onClick={handleGiveReward}>Give Reward</button>
    </div>
  )
}

export default SelectUser
