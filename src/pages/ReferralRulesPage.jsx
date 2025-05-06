import React, { useState } from "react";
import { Card, Pagination, Row, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const referralData = [
  {
    level: "1",
    date: "24/04/2022",
    commission: "0.25%",
  },
  {
    level: "2",
    date: "24/04/2022",
    commission: "0.20%",
  },
  {
    level: "3",
    date: "24/04/2022",
    commission: "0.15%",
  },
  {
    level: "4",
    date: "24/04/2022",
    commission: "0.10%",
  },
  {
    level: "5",
    date: "24/04/2022",
    commission: "0.08%",
  },
  {
    level: "6",
    date: "24/04/2022",
    commission: "0.05%",
  },
  {
    level: "7",
    date: "24/04/2022",
    commission: "0.03%",
  },
  {
    level: "8",
    date: "24/04/2022",
    commission: "0.02%",
  },
  {
    level: "9",
    date: "24/04/2022",
    commission: "0.01%",
  },
  {
    level: "10",
    date: "24/04/2022",
    commission: "0.005%",
  },
  {
    level: "11",
    date: "24/04/2022",
    commission: "0.003%",
  },
];

const ReferralRulesPage = () => {
  const { t } = useTranslation();
  const rules = t('referralRules.rules', { returnObjects: true });
  const importantInfo = t('referralRules.importantInfo', { returnObjects: true });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = referralData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Row>
        <div>
          <h1 className="text-white">{t('referralRules.title')}</h1>
          <p className="d-block mt-2">{t('referralRules.description')}</p>
        </div>
        <div className="col-lg-8">
          <Card style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}>
            <div className="card-body">
              <div className="table-responsive">
                <Table className="table table-hover">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="text-white text-start">{t('referralRules.table.level')}</th>
                      <th className="text-white text-center">{t('referralRules.table.date')}</th>
                      <th className="text-white text-end">{t('referralRules.table.commission')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, index) => (
                      <tr key={index}>
                        <td className="text-white text-start">{item.level}</td>
                        <td className="text-white text-center">{item.date}</td>
                        <td
                          className="text-danger text-end"
                          style={{ backgroundColor: "white" }}
                        >
                          {item.commission}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <nav>
                  <Pagination>
                    {Array.from({
                      length: Math.ceil(referralData.length / itemsPerPage),
                    }).map((_, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(index + 1)}
                          style={{
                            backgroundColor:
                              currentPage === index + 1
                                ? "#dc3545"
                                : "transparent",
                            color: "#fff",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </Pagination>
                </nav>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-lg-4">
          <div className="row">
            <div className="col-lg-12">
              <Card style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}>
                <Card.Header className="d-flex justify-content-center align-items-center bg-secondary">
                  <h5 className="text-white mb-3">{t('referralRules.rulesTitle')}</h5>
                </Card.Header>
                <Card.Body>
                  <ul className="list-unstyled">
                    {rules.map((rule, i) => (
                      <li key={i} className="text-muted mb-2">• {rule}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-12">
              <Card style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}>
                <Card.Header className="d-flex justify-content-center align-items-center bg-secondary">
                  <h5 className="text-white mb-3">{t('referralRules.importantTitle')}</h5>
                </Card.Header>
                <Card.Body>
                  <ul className="list-unstyled">
                    {importantInfo.map((info, i) => (
                      <li key={i} className="text-muted mb-2">• {info}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </Row>
    </>
  );
};

export default ReferralRulesPage;
