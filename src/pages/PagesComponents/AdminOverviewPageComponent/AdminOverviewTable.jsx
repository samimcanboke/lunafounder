import React from "react";
import { Table, Row } from "react-bootstrap";
import { BiChevronDown, BiChevronUp, BiPencil, BiTrash } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const AdminOverviewTable = ({ data, expandedRow, toggleRow }) => {
  const { t } = useTranslation();
  return (
    <Table className="table table-hover">
      <thead>
        <tr className="bg-secondary">
          <th className="text-white text-start">{t('adminOverview.table.id')}</th>
          <th className="text-white text-start">{t('adminOverview.table.name')}</th>
          <th className="text-white text-start">{t('adminOverview.table.level')}</th>
          <th className="text-white text-center">{t('adminOverview.table.date')}</th>
          <th className="text-white text-end">{t('adminOverview.table.commission')}</th>
          <th className="text-white text-end">{t('adminOverview.table.actions')}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <React.Fragment key={item.id}>
            <tr
              onClick={() => toggleRow(item.id)}
              style={{ cursor: "pointer" }}
              className={expandedRow === item.id ? "table-active" : ""}
              aria-expanded={expandedRow === item.id}
            >
              <td className="text-white text-start">{item.id}</td>
              <td className="text-white text-start">
                <div className="d-flex align-items-center">
                  {item.name}
                  {expandedRow === item.id ? (
                    <BiChevronUp className="ms-2" />
                  ) : (
                    <BiChevronDown className="ms-2" />
                  )}
                </div>
              </td>
              <td className="text-white text-start">{item.level}</td>
              <td className="text-white text-center">{item.date}</td>
              <td
                className="text-danger text-end"
                style={{ backgroundColor: "white" }}
              >
                {item.commission}
              </td>
              <td className="text-white text-end">
                <BiPencil
                  className="me-2"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => e.stopPropagation()}
                />
                <BiTrash
                  style={{ cursor: "pointer" }}
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
            </tr>
            {expandedRow === item.id && (
              <tr className="expandable-row">
                <td colSpan="6" className="bg-dark p-0">
                  <div className="p-3 text-white">
                    <Row>
                      <div className="col-md-3">
                        <strong>{t('adminOverview.table.joinDate')}</strong> {item.joinDate}
                      </div>
                      <div className="col-md-3">
                        <strong>{t('adminOverview.table.nfts')}</strong> {item.nfts}
                      </div>
                      <div className="col-md-3">
                        <strong>{t('adminOverview.table.lastOrder')}</strong> {item.lastOrder}
                      </div>
                      <div className="col-md-3">
                        <strong>{t('adminOverview.table.totalSpend')}</strong> {item.totalSpend}
                      </div>
                    </Row>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
};

export default AdminOverviewTable;
