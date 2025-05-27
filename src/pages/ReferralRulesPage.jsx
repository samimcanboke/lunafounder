import React from "react";
import { Card, Row, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const referralData = [
  { level: "1", commission: "12%" },
  { level: "2", commission: "6%" },
  { level: "3", commission: "4%" },
  { level: "4", commission: "2%" },
  { level: "5", commission: "2%" },
  { level: "6", commission: "1%" },
  { level: "7", commission: "1%" },
  { level: "8", commission: "1%" },
  { level: "9", commission: "0.5%" },
  { level: "10", commission: "0.5%" },
];

const ReferralRulesPage = () => {
  const { t } = useTranslation();
  const rules = t("referralRules.rules", { returnObjects: true });
  const importantInfo = t("referralRules.importantInfo", { returnObjects: true });

  return (
    <>
      <Row>
        <div>
          <h1 className="text-white">{t("referralRules.title")}</h1>
          <p className="d-block mt-2">{t("referralRules.description")}</p>
        </div>
        <div className="col-lg-8">
          <Card style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}>
            <div className="card-body">
              <div className="table-responsive">
                <Table className="table table-hover">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="text-white text-start">{t("referralRules.table.level")}</th>
                      <th className="text-white text-end">{t("referralRules.table.commission")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referralData.map((item, index) => (
                      <tr key={index}>
                        <td className="text-white text-start">{item.level}</td>
                        <td className="text-danger text-end">{item.commission}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-lg-4">
          <div className="row">
            <div className="col-lg-12">
              <Card style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}>
                <Card.Header className="d-flex justify-content-center align-items-center bg-secondary">
                  <h5 className="text-white mb-3">{t("referralRules.rulesTitle")}</h5>
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
                  <h5 className="text-white mb-3">{t("referralRules.importantTitle")}</h5>
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
