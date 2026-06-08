import React, { useState } from "react";
import Table from "../../components/common/Table/Table";
import "../styles/pages.css";
import "../../forms/styles/forms.css";

// ─── Static options ───────────────────────────────────────────────────────────
const REPORT_TYPES   = ["Daily Report", "Weekly Report", "Monthly Report", "Annual Report"];
const YEAR_OPTIONS   = ["2021", "2022", "2023", "2024", "2025"];
const WEEK_OPTIONS   = Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`);
const CONTRACTOR_OPTIONS = [
  "Alpha Build Co.", "BrightWave Infra", "CoreTech Solutions",
  "Delta Constructions", "EagleEye Services", "FlexBuild Partners",
  "GreenMark Contractors", "HighRise Corp.", "IronClad Works", "JetStream Builders",
];
const BUILDING_OPTIONS   = ["Building A", "Building B", "Building C", "Building D"];
const LEVEL_OPTIONS      = ["Level 1", "Level 2", "Level 3", "Level 4"];
const AREA_OPTIONS       = ["Area 1", "Area 2", "Area 3", "Area 4"];
const PERMIT_TYPE_OPTIONS  = ["Hot Work", "Cold Work", "Electrical", "Height Work", "Confined Space"];
const PERMIT_UNDER_OPTIONS = ["Contractor", "Sub-Contractor", "Internal Team"];
const STATUS_OPTIONS       = ["Active", "Inactive", "Pending", "Completed"];
const HRAS_OPTIONS         = ["HRA-001", "HRA-002", "HRA-003"];

const REPORT_COLUMNS = [
  "Permit number", "Activity", "Contractor", "Sub-Contractor",
  "Level", "Building Name", "Area", "Working Date",
];

const INITIAL_FILTERS = {
  reportType: "", date: "", year: "", week: "",
  contractor: "", building: "", workingDateFrom: "",
  workingDateTo: "", startTime: "", endTime: "",
  nightShift: false, level: "", area: "",
  permitType: "", permitUnder: "", status: "", hras: "",
};

const Reports = () => {
  const [filters, setFilters]     = useState(INITIAL_FILTERS);
  const [tableData, setTableData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_LIMIT = 10;
  const totalPages = Math.max(1, Math.ceil(tableData.length / PAGE_LIMIT));

  const columns = [
    { header: "Permit number", accessor: "permitNumber"   },
    { header: "Activity",      accessor: "activity"       },
    { header: "Contractor",    accessor: "contractor"     },
    { header: "Sub-Contractor",accessor: "subContractor"  },
    { header: "Level",         accessor: "level"          },
    { header: "Building Name", accessor: "buildingName"   },
    { header: "Area",          accessor: "area"           },
    { header: "Working Date",  accessor: "workingDate"    },
  ];

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleShow = () => {
    // In real usage, fetch from API with filters
    setTableData([]);
    setHasSearched(true);
  };

  const handleReset = () => {
    setFilters(INITIAL_FILTERS);
    setTableData([]);
    setHasSearched(false);
  };

  const handleDownload = () => {
    // Placeholder for download logic
    alert("Download triggered");
  };

  return (
    <div className="dept-page">

      {/* ── Page Header ── */}
      <div className="dept-page-header">
        <div className="dept-page-header__left">
          <h1 className="dept-page-title">Show Reports</h1>
          <p className="dept-page-subtitle">Filter and generate permit reports</p>
        </div>
      </div>

      {/* ── Filter Card ── */}
      <div className="dept-table-card" style={{ marginBottom: "24px" }}>
        <div className="df-form" style={{ padding: "24px" }}>
          <div className="df-grid">

            {/* Row 1: Report Type | Date */}
            <div className="df-field">
              <label className="df-label">Report Type</label>
              <select className="df-select" value={filters.reportType}
                onChange={(e) => handleChange("reportType", e.target.value)}>
                <option value="">Report Type</option>
                {REPORT_TYPES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="df-field">
              <label className="df-label">Date</label>
              <input type="date" className="df-input" value={filters.date}
                onChange={(e) => handleChange("date", e.target.value)} />
            </div>

            {/* Row 2: Year | Week */}
            <div className="df-field">
              <label className="df-label">Year</label>
              <select className="df-select" value={filters.year}
                onChange={(e) => handleChange("year", e.target.value)}>
                <option value="">Year</option>
                {YEAR_OPTIONS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            <div className="df-field">
              <label className="df-label">Week</label>
              <select className="df-select" value={filters.week}
                onChange={(e) => handleChange("week", e.target.value)}>
                <option value="">Week</option>
                {WEEK_OPTIONS.map((w) => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>

            {/* Row 3: Contractor | Building */}
            <div className="df-field">
              <label className="df-label">Contractor</label>
              <select className="df-select" value={filters.contractor}
                onChange={(e) => handleChange("contractor", e.target.value)}>
                <option value="">Contractor</option>
                {CONTRACTOR_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="df-field">
              <label className="df-label">Building</label>
              <select className="df-select" value={filters.building}
                onChange={(e) => handleChange("building", e.target.value)}>
                <option value="">Building</option>
                {BUILDING_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            {/* Row 4: Working Date (from) | Working Date (to) */}
            <div className="df-field">
              <label className="df-label">Working Date (from)</label>
              <input type="date" className="df-input" value={filters.workingDateFrom}
                onChange={(e) => handleChange("workingDateFrom", e.target.value)} />
            </div>

            <div className="df-field">
              <label className="df-label">Working Date (to)</label>
              <input type="date" className="df-input" value={filters.workingDateTo}
                onChange={(e) => handleChange("workingDateTo", e.target.value)} />
            </div>

            {/* Row 5: Start Time | End Time | Night Shift */}
            <div className="df-field">
              <label className="df-label">Start Time</label>
              <input type="time" className="df-input" value={filters.startTime}
                onChange={(e) => handleChange("startTime", e.target.value)} />
            </div>

            <div className="df-field" style={{ display: "flex", gap: "16px", alignItems: "flex-end" }}>
              <div style={{ flex: 1 }}>
                <label className="df-label">End Time</label>
                <input type="time" className="df-input" value={filters.endTime}
                  onChange={(e) => handleChange("endTime", e.target.value)} />
              </div>
              {/* Night Shift checkbox inline */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingBottom: "10px", whiteSpace: "nowrap" }}>
                <span className="df-label" style={{ margin: 0 }}>Night shift?</span>
                <input type="checkbox" checked={filters.nightShift}
                  onChange={(e) => handleChange("nightShift", e.target.checked)}
                  style={{ width: "16px", height: "16px", cursor: "pointer" }} />
                <span className="df-label" style={{ margin: 0 }}>Yes</span>
              </div>
            </div>

            {/* Row 6: Level | Area */}
            <div className="df-field">
              <label className="df-label">Level</label>
              <select className="df-select" value={filters.level}
                onChange={(e) => handleChange("level", e.target.value)}>
                <option value="">Level</option>
                {LEVEL_OPTIONS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            <div className="df-field">
              <label className="df-label">Area</label>
              <select className="df-select" value={filters.area}
                onChange={(e) => handleChange("area", e.target.value)}>
                <option value="">Area</option>
                {AREA_OPTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            {/* Row 7: Permit Type | Permit Under */}
            <div className="df-field">
              <label className="df-label">Permit Type</label>
              <select className="df-select" value={filters.permitType}
                onChange={(e) => handleChange("permitType", e.target.value)}>
                <option value="">Permit Type</option>
                {PERMIT_TYPE_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div className="df-field">
              <label className="df-label">Permit Under</label>
              <select className="df-select" value={filters.permitUnder}
                onChange={(e) => handleChange("permitUnder", e.target.value)}>
                <option value="">Permit Under</option>
                {PERMIT_UNDER_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* Row 8: Status | HRA'S */}
            <div className="df-field">
              <label className="df-label">Status</label>
              <select className="df-select" value={filters.status}
                onChange={(e) => handleChange("status", e.target.value)}>
                <option value="">Status</option>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="df-field">
              <label className="df-label">HRA'S</label>
              <select className="df-select" value={filters.hras}
                onChange={(e) => handleChange("hras", e.target.value)}>
                <option value="">HRA'S</option>
                {HRAS_OPTIONS.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>

          </div>

          {/* ── Action Buttons ── */}
          <div className="df-footer" style={{ justifyContent: "flex-end" }}>
            <button type="button" className="df-btn df-btn--cancel" onClick={handleReset}>
              Reset
            </button>
            <button type="button" className="df-btn df-btn--submit" onClick={handleShow}>
              Show
            </button>
          </div>
        </div>
      </div>

      {/* ── Results Table Card ── */}
      <div className="dept-table-card">
        <div className="dept-page-header" style={{ padding: "12px 16px", marginBottom: 0 }}>
          <div className="dept-page-header__left">
            <span className="dept-count-badge">{tableData.length} Total</span>
          </div>
          <div className="dept-page-header__right">
            <button className="dept-add-btn" onClick={handleDownload}>
              <span className="dept-add-btn__icon">⬇</span>
              Download
            </button>
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

export default Reports;