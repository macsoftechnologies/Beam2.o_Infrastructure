import React, { useState, useEffect } from "react";
import "../../forms/styles/forms.css";

// ─── Building options ─────────────────────────────────────────────────────────
const BUILDING_OPTIONS = [
  "MA.II",
  "MU91",
  "MU92",
  "MU93",
  "MU94",
];

// ─── Level options ────────────────────────────────────────────────────────────
const LEVEL_OPTIONS = [
  "MA.II 1",
  "MU91.0",
  "MU91.1",
  "MU91.2",
  "MU92.0",
  "MU92.1",
];

// ─── Zone options ─────────────────────────────────────────────────────────────
const ZONE_OPTIONS = [
  "50.1L",
  "MU91.0R",
  "MU91.0S",
  "MU91.1A",
  "MU91.1F",
  "MU91.1G",
  "MU91.1H",
  "MU91.1M",
  "MU91.1N",
  "MU91.1P",
];

// ─── Status options ───────────────────────────────────────────────────────────
const STATUS_OPTIONS = [
  "Construction",
  "Commissioning",
  "Completed",
  "On Hold",
];

function ZoneStatusform({ onClose, initialData, isEdit, onSubmit }) {
  const [building, setBuilding] = useState("");
  const [level, setLevel]       = useState("");
  const [zone, setZone]         = useState("");
  const [status, setStatus]     = useState("");

  useEffect(() => {
    if (isEdit && initialData) {
      setBuilding(initialData.building || "");
      setLevel(   initialData.level    || "");
      setZone(    initialData.zone     || "");
      setStatus(  initialData.status   || "");
    }
  }, [initialData, isEdit]);

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { building, level, zone, status };

    if (isEdit && initialData?.zoneStatusId) {
      payload.zoneStatusId = initialData.zoneStatusId;
    }

    onSubmit && onSubmit(payload);
    onClose  && onClose();
  };

  return (
    <form className="df-form" onSubmit={handleSubmit} noValidate>
      <div className="df-grid">

        {/* Building */}
        <div className="df-field">
          <label className="df-label">
            Building <span className="df-required">*</span>
          </label>
          <select
            className="df-select"
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
            required
          >
            <option value="">Building</option>
            {BUILDING_OPTIONS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Level */}
        <div className="df-field">
          <label className="df-label">
            Level <span className="df-required">*</span>
          </label>
          <select
            className="df-select"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          >
            <option value="">Level</option>
            {LEVEL_OPTIONS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Zone */}
        <div className="df-field">
          <label className="df-label">
            Zone <span className="df-required">*</span>
          </label>
          <select
            className="df-select"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            required
          >
            <option value="">Zone</option>
            {ZONE_OPTIONS.map((z) => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="df-field">
          <label className="df-label">
            Status <span className="df-required">*</span>
          </label>
          <select
            className="df-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
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
          {isEdit ? "Update Zone Status" : "Create"}
        </button>
      </div>
    </form>
  );
}

export default ZoneStatusform;