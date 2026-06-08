import React, { useState } from "react";
import Table from "../../components/common/Table/Table";
import "../styles/pages.css";

const STATIC_LOG_HISTORY = [
  { logId: 1,  permitNumber: "PN-1001", activity: "WP-328H_Electrical Installation", contractor: "Alpha Build Co.",      building: "Block A", area: "Zone 1", level: "L1", workingDate: "2026-05-01", nightShift: "No",  newDate: "2026-05-03" },
  { logId: 2,  permitNumber: "PN-1002", activity: "WP-329_Ethanol Tanks",             contractor: "BrightWave Infra",     building: "Block B", area: "Zone 2", level: "L2", workingDate: "2026-05-02", nightShift: "Yes", newDate: "—"          },
  { logId: 3,  permitNumber: "PN-1003", activity: "WP-328G_Piping Installation",      contractor: "CoreTech Solutions",   building: "Block C", area: "Zone 3", level: "L3", workingDate: "2026-05-03", nightShift: "No",  newDate: "2026-05-05" },
  { logId: 4,  permitNumber: "PN-1004", activity: "WP-403_Cooling and Heating",       contractor: "Delta Constructions",  building: "Block D", area: "Zone 1", level: "L1", workingDate: "2026-05-04", nightShift: "Yes", newDate: "—"          },
  { logId: 5,  permitNumber: "PN-1005", activity: "WP-328F_Insulation",               contractor: "EagleEye Services",    building: "Block A", area: "Zone 4", level: "L2", workingDate: "2026-05-05", nightShift: "No",  newDate: "2026-05-07" },
];

const PAGE_LIMIT_DEFAULT = 10;

const SearchIcon = () => (
  <svg
    style={{
      position: "absolute",
      left: "14px",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "#7a8aab",
    }}
    width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const LogHistory = () => {
  const [search, setSearch]           = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit]                   = useState(PAGE_LIMIT_DEFAULT);

  const filtered = STATIC_LOG_HISTORY.filter((item) =>
    item.permitNumber.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageLimit);
  const startIndex = (currentPage - 1) * pageLimit;
  const paginated  = filtered.slice(startIndex, startIndex + pageLimit);

  const columns = [
    { header: "Permit number", accessor: "permitNumber" },
    { header: "Activity",      accessor: "activity"     },
    { header: "Contractor",    accessor: "contractor"   },
    { header: "Building",      accessor: "building"     },
    { header: "Area",          accessor: "area"         },
    { header: "Level",         accessor: "level"        },
    { header: "Working Date",  accessor: "workingDate"  },
    { header: "Night Shift",   accessor: "nightShift"   },
    { header: "New Date",      accessor: "newDate"      },
    { header: "Actions",       accessor: "actions"      },
  ];

  const tableData = paginated.map((item) => ({
    ...item,
    actions: (
      <div className="dept-action-btns">
        <button className="dept-action-btn dept-action-btn--view" title="View">👁</button>
      </div>
    ),
  }));

  return (
    <div className="dept-page">

      <div className="dept-page-header">
        <div className="dept-page-header__left">
          <h1 className="dept-page-title">Log History</h1>
          <p className="dept-page-subtitle">View and search all permit log records</p>
        </div>
      </div>

      <div className="dept-table-card">

        {/* Search */}
        <div style={{ padding: "16px" }}>
          <div style={{ position: "relative", maxWidth: "480px" }}>
            <SearchIcon />
            <input
              type="text"
              className="df-input"
              style={{
                maxWidth: "480px",
                width: "100%",
                paddingLeft: "42px",
                paddingRight: search ? "36px" : "14px",
                backgroundColor: "#1a2744",
                border: "1px solid #2e3f66",
                borderRadius: "8px",
                color: "#ffffff",
                fontSize: "14px",
                height: "44px",
                outline: "none",
              }}
              placeholder="Enter Permit number"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            {search && (
              <button
                onClick={() => { setSearch(""); setCurrentPage(1); }}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#7a8aab",
                  fontSize: "16px",
                  lineHeight: 1,
                  padding: "2px",
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <Table
          columns={columns}
          data={tableData}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isLoading={false}
        />
      </div>

    </div>
  );
};

export default LogHistory;