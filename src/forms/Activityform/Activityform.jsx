import React, { useState, useEffect } from "react";
import "../../forms/styles/forms.css";

function Activityform({ onClose, initialData, isEdit, onSubmit }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (isEdit && initialData) {
      setName(initialData.name || "");
    }
  }, [initialData, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { name };

    if (isEdit && initialData?.activityId) {
      payload.activityId = initialData.activityId;
    }

    onSubmit && onSubmit(payload);
    onClose && onClose();
  };

  return (
    <form className="df-form" onSubmit={handleSubmit} noValidate>
      <div className="df-grid">

        {/* Activity Name */}
        <div className="df-field df-field--full">
          <label className="df-label">
            Activity Name <span className="df-required">*</span>
          </label>
          <input
            type="text"
            className="df-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Activity Name"
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
          {isEdit ? "Update Activity" : "Create"}
        </button>
      </div>
    </form>
  );
}

export default Activityform;