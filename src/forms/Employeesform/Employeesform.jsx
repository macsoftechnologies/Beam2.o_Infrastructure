import React, { useState, useEffect } from "react";
import "../../forms/styles/forms.css";

// ─── Role options ────────────────────────────────────────────────────────────
const ROLE_OPTIONS = [
  "Admin",
  "Manager",
  "Supervisor",
  "User",
  "Viewer",
];

// ─── Employee Type options ───────────────────────────────────────────────────
const EMPLOYEE_TYPE_OPTIONS = [
  "Full-time",
  "Part-time",
  "Contractor",
  "Intern",
  "Temporary",
];

function Employeesform({ onClose, initialData, isEdit, onSubmit }) {
  const [employeeBadgeId, setEmployeeBadgeId] = useState("");
  const [employeeName, setEmployeeName]       = useState("");
  const [designation, setDesignation]         = useState("");
  const [phoneNumber, setPhoneNumber]         = useState("");
  const [role, setRole]                       = useState("");
  const [employeeType, setEmployeeType]       = useState("");
  const [companyName, setCompanyName]         = useState("");
  const [access, setAccess]                   = useState(true);
  const [email, setEmail]                     = useState("");
  const [username, setUsername]               = useState("");
  const [password, setPassword]               = useState("");

  useEffect(() => {
    if (isEdit && initialData) {
      setEmployeeBadgeId(initialData.badgeId      || "");
      setEmployeeName(   initialData.name         || "");
      setDesignation(    initialData.designation  || "");
      setPhoneNumber(    initialData.phoneNumber  || "");
      setRole(           initialData.role         || "");
      setEmployeeType(   initialData.employeeType || "");
      setCompanyName(    initialData.companyName  || "");
      setAccess(         initialData.access !== undefined ? initialData.access : true);
      setEmail(          initialData.email        || "");
      setUsername(       initialData.username     || "");
      setPassword(       initialData.password     || "");
    }
  }, [initialData, isEdit]);

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      badgeId:      employeeBadgeId,
      name:         employeeName,
      designation,
      phoneNumber,
      role,
      employeeType,
      companyName,
      access,
      email,
      username,
      password,
    };

    if (isEdit && initialData?.employeeId) {
      payload.employeeId = initialData.employeeId;
    }

    onSubmit && onSubmit(payload);
    onClose  && onClose();
  };

  return (
    <form className="df-form" onSubmit={handleSubmit} noValidate>
      <div className="df-grid">

        {/* Employee Badge Id */}
        <div className="df-field">
          <label className="df-label">Employee Badge Id</label>
          <input
            type="text"
            className="df-input"
            value={employeeBadgeId}
            onChange={(e) => setEmployeeBadgeId(e.target.value)}
            placeholder="Employee Badge Id"
          />
        </div>

        {/* Employee Name */}
        <div className="df-field">
          <label className="df-label">
            Employee Name <span className="df-required">*</span>
          </label>
          <input
            type="text"
            className="df-input"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            placeholder="Employee Name"
            required
          />
        </div>

        {/* Designation */}
        <div className="df-field">
          <label className="df-label">
            Designation <span className="df-required">*</span>
          </label>
          <input
            type="text"
            className="df-input"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            placeholder="Designation"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="df-field">
          <label className="df-label">
            Phone Number <span className="df-required">*</span>
          </label>
          <input
            type="text"
            className="df-input"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            required
          />
        </div>

        {/* Select Role */}
        <div className="df-field">
          <label className="df-label">
            Select Role <span className="df-required">*</span>
          </label>
          <select
            className="df-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Select Employee Type(s) */}
        <div className="df-field">
          <label className="df-label">
            Select Employee Type(s) <span className="df-required">*</span>
          </label>
          <select
            className="df-select"
            value={employeeType}
            onChange={(e) => setEmployeeType(e.target.value)}
            required
          >
            <option value="">Select Employee Type(s)</option>
            {EMPLOYEE_TYPE_OPTIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Company Name */}
        <div className="df-field">
          <label className="df-label">
            Company Name <span className="df-required">*</span>
          </label>
          <input
            type="text"
            className="df-input"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company Name"
            required
          />
        </div>

        {/* Access Toggle */}
        <div className="df-field" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <label className="df-label" style={{ margin: 0 }}>Access</label>
          <div
            className={`df-toggle ${access ? "df-toggle--on" : "df-toggle--off"}`}
            onClick={() => setAccess((prev) => !prev)}
            style={{
              width: "48px",
              height: "26px",
              borderRadius: "999px",
              background: access ? "#f59e0b" : "#d1d5db",
              position: "relative",
              cursor: "pointer",
              transition: "background 0.2s",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "3px",
                left: access ? "24px" : "3px",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "#fff",
                transition: "left 0.2s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            />
          </div>
        </div>

        {/* Email */}
        <div className="df-field">
          <label className="df-label">
            Email <span className="df-required">*</span>
          </label>
          <input
            type="email"
            className="df-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>

        {/* UserName */}
        <div className="df-field">
          <label className="df-label">
            UserName <span className="df-required">*</span>
          </label>
          <input
            type="text"
            className="df-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="UserName"
            required
          />
        </div>

        {/* Password */}
        <div className="df-field">
          <label className="df-label">
            Password <span className="df-required">*</span>
          </label>
          <input
            type="password"
            className="df-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>

      </div>

      {/* Footer */}
      <div className="df-footer">
        <button
          type="button"
          className="df-btn df-btn--cancel"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="df-btn df-btn--submit"
        >
          {isEdit ? "Update Employee" : "Create"}
        </button>
      </div>
    </form>
  );
}

export default Employeesform;