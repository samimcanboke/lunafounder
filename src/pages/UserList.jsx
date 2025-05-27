import React, { useEffect, useState } from "react";
import userListStore from "../store/userListStore";
import { Table } from "react-bootstrap";
import AdminOverviewPagination from "../pages/PagesComponents/AdminOverviewPageComponent/AdminOverviewPagination";
import { useTranslation } from "react-i18next";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userListStore.getUserList(
          currentPage,
          10,
          searchQuery
        );
        // console.log(data, "data");
        setUsers(data.users);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching user distributions:", error);
      }
    };

    fetchData();
  }, [currentPage, searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  return (
    <div>
      <h3 className="text-center mb-4">{t("userList.title")}</h3>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search users..."
          className="form-control"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Username</th>
            <th>Wallet</th>
            <th>Parent Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.wallet}</td>
              <td>{user.parentUsername || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="text-muted">
          {/* Showing {start} to {end} of {totalItems} entries */}
        </div>
        <nav>
          <AdminOverviewPagination
            currentPage={currentPage}
            itemsPerPage={10}
            totalItems={totalPages * 10}
            paginate={handlePageChange}
          />
        </nav>
      </div>
    </div>
  );
};

export default UserList;
