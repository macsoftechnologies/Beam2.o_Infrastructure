import React, { useState, useEffect } from "react";
// import "./DepartmentForm.css";
import "../../forms/styles/forms.css";

function DepartmentForm({ onClose, initialData, isEdit, onSubmit }) {
  const [name,        setName]        = useState("");
  const [code,        setCode]        = useState("");
  const [description, setDescription] = useState("");
  const [status,      setStatus]      = useState("active");

  useEffect(() => {
    if (isEdit && initialData) {
      setName(initialData.name               || "");
      setCode(initialData.code               || "");
      setDescription(initialData.description || "");
      setStatus(initialData.status           || "active");
    }
  }, [initialData, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { name, code, description, status };
    if (isEdit && initialData?.departmentId) {
      payload.departmentId = initialData.departmentId;
    }
    onSubmit && onSubmit(payload);
    onClose  && onClose();
  };

  return (
    <form className="df-form" onSubmit={handleSubmit} noValidate>

      <div className="df-grid">

        {/* Department Name */}
        <div className="df-field">
          <label className="df-label">
            Department Name <span className="df-required">*</span>
          </label>
          <input
            type="text"
            className="df-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Human Resources"
            required
          />
        </div>

        {/* Department Code */}
        <div className="df-field">
          <label className="df-label">
            Department Code <span className="df-required">*</span>
          </label>
          <input
            type="text"
            className="df-input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. HR"
            required
          />
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Description — full width */}
        <div className="df-field df-field--full">
          <label className="df-label">Description</label>
          <textarea
            className="df-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a brief description (optional)"
            rows={3}
          />
        </div>

      </div>

      {/* Footer */}
      <div className="df-footer">
        <button type="button" className="df-btn df-btn--cancel" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="df-btn df-btn--submit">
          {isEdit ? "Update Department" : "Add Department"}
        </button>
      </div>

    </form>
  );
}

export default DepartmentForm;