import React from "react";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { Dropdown, Tab, Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const HomeSalesRevenueChart = loadable(() =>
  pMinDelay(
    import("../../../jsx/components/Karciz/Dashboard/HomeSalesRevenueChart"),
    1000
  )
);

const SalesRevenueCard = ({ salesRevenueData }) => {
  const { t } = useTranslation();
  return (
    <div className="col-xl-12">
      <div className="card" id="sales_revenue">
        <div className="card-header border-0 pb-0 d-sm-flex d-block">
          <div className="d-flex align-items-center">
            <h4 className="fs-20 mb-0">{t("dashboard.salesRevenueCard.title")}</h4>
            <div
              className="ms-4"
              style={{
                flexGrow: 1,
                height: "20px",
                border: "0",
                borderLeft: "2px solid #ccc",
              }}
            />
            <Dropdown>
              <Dropdown.Toggle variant="">2025</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">2024</Dropdown.Item>
                <Dropdown.Item href="#">2023</Dropdown.Item>
                <Dropdown.Item href="#">2022</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="custom-tab-1">
            <Tab.Container defaultActiveKey="today">
              <Nav as="ul" className="nav-tabs">
                <Nav.Item as="li">
                  <Nav.Link eventKey="month">{t("dashboard.salesRevenueCard.tab.monthly")}</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link eventKey="week">{t("dashboard.salesRevenueCard.tab.weekly")}</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link eventKey="day">{t("dashboard.salesRevenueCard.tab.daily")}</Nav.Link>
                </Nav.Item>
              </Nav>
            </Tab.Container>
          </div>
        </div>
        <div className="card-body custome-tooltip">
          <HomeSalesRevenueChart data={salesRevenueData} />
        </div>
      </div>
    </div>
  );
};

export default SalesRevenueCard;
