import React, { useState, useEffect } from "react";
import "../../forms/styles/forms.css";

function SafetyPrecautionform({ onClose, initialData, isEdit, onSubmit }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (isEdit && initialData) {
      setName(initialData.name || "");
    }
  }, [initialData, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { name };

    if (isEdit && initialData?.safetyId) {
      payload.safetyId = initialData.safetyId;
    }

    onSubmit && onSubmit(payload);
    onClose && onClose();
  };

  return (
    <form className="df-form" onSubmit={handleSubmit} noValidate>
      <div className="df-grid">

        {/* Safety Precaution */}
        <div className="df-field df-field--full">
          <label className="df-label">
            Safety Precaution <span className="df-required">*</span>
          </label>
          <textarea
            className="df-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Safety Precaution"
            rows={4}
            required
            style={{ resize: "vertical" }}
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
          {isEdit ? "Update Safety Precaution" : "Create"}
        </button>
      </div>
    </form>
  );
}

export default SafetyPrecautionform;