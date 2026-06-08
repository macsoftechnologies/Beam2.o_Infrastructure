import React, { useState } from "react";
import { showSuccess, showError, showDeleteConfirm, showDeleteSuccess } from "../../../components/common/Toast/Toast";
import Table from "../../../components/common/Table/Table";
import Modal from "../../../components/common/Modal/Modal";
import { FaEdit, FaTrash } from "react-icons/fa";
import SafetyPrecautionform from "../../../forms/SafetyPrecautionform/SafetyPrecautionform";
import "../../styles/pages.css";

const STATIC_SAFETY = [
  { safetyId: 1,  name: "- If working from a scissor lift, it must be marked with the company name and telephone number of the contractor." },
  { safetyId: 2,  name: "- All personnel must wear PPE at all times on site."                                                             },
  { safetyId: 3,  name: "- Ensure fire extinguishers are accessible at all work areas."                                                  },
  { safetyId: 4,  name: "- Hot work permits are required before any welding or cutting activities."                                       },
  { safetyId: 5,  name: "- Scaffolding must be inspected daily before use."                                                              },
];

const PAGE_LIMIT_DEFAULT = 10;

const ActionButtons = ({ onEdit, onDelete }) => (
  <div className="dept-action-btns">
    <button className="dept-action-btn dept-action-btn--edit" title="Edit" onClick={onEdit}>
      <FaEdit />
    </button>
    <button className="dept-action-btn dept-action-btn--delete" title="Delete" onClick={onDelete}>
      <FaTrash />
    </button>
  </div>
);

const SafetyPrecaution = () => {
  const [open, setOpen]                   = useState(false);
  const [editOpen, setEditOpen]           = useState(false);
  const [selectedSafety, setSelectedSafety] = useState(null);
  const [safetyList, setSafetyList]       = useState(STATIC_SAFETY);
  const [currentPage, setCurrentPage]     = useState(1);
  const [pageLimit]                       = useState(PAGE_LIMIT_DEFAULT);

  const totalPages = Math.ceil(safetyList.length / pageLimit);
  const startIndex = (currentPage - 1) * pageLimit;
  const paginated  = safetyList.slice(startIndex, startIndex + pageLimit);

  const handleEdit = (item, index) => {
    setSelectedSafety({ ...item, serial: startIndex + index + 1 });
    setEditOpen(true);
  };

  const handleDelete = async (item) => {
    const result = await showDeleteConfirm();
    if (!result.isConfirmed) return;
    setSafetyList((prev) => prev.filter((s) => s.safetyId !== item.safetyId));
    showDeleteSuccess();
  };

  const handleSubmit = (formData) => {
    try {
      if (selectedSafety && editOpen) {
        setSafetyList((prev) =>
          prev.map((s) =>
            s.safetyId === selectedSafety.safetyId ? { ...s, ...formData } : s
          )
        );
        setEditOpen(false);
        setSelectedSafety(null);
        showSuccess("Safety Precaution updated successfully");
        return;
      }
      setSafetyList((prev) => [...prev, { ...formData, safetyId: Date.now() }]);
      setOpen(false);
      showSuccess("Safety Precaution added successfully");
    } catch {
      showError("Operation failed");
    }
  };

  const columns = [
    { header: "S.No",          accessor: "serial"  },
    { header: "Activity Name", accessor: "name"    },
    { header: "Actions",       accessor: "actions" },
  ];

  const tableData = paginated.map((item, index) => ({
    ...item,
    serial: startIndex + index + 1,
    actions: (
      <ActionButtons
        onEdit={() => handleEdit(item, index)}
        onDelete={() => handleDelete(item)}
      />
    ),
  }));

  return (
    <div className="dept-page">

      <div className="dept-page-header">
        <div className="dept-page-header__left">
          <h1 className="dept-page-title">Safety Precaution</h1>
          <p className="dept-page-subtitle">Manage and configure all safety precaution records</p>
        </div>
        <div className="dept-page-header__right">
          <span className="dept-count-badge">{safetyList.length} Total</span>
          <button className="dept-add-btn" onClick={() => setOpen(true)}>
            <span className="dept-add-btn__icon">＋</span>
            Add Safety Precaution
          </button>
        </div>
      </div>

      <div className="dept-table-card">
        <Table
          columns={columns}
          data={tableData}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isLoading={false}
        />
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Safety Precaution" size="md" type="default">
        <SafetyPrecautionform onClose={() => setOpen(false)} onSubmit={handleSubmit} />
      </Modal>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Safety Precaution" size="md" type="warning">
        <SafetyPrecautionform isEdit initialData={selectedSafety} onClose={() => setEditOpen(false)} onSubmit={handleSubmit} />
      </Modal>

    </div>
  );
};

export default SafetyPrecaution;