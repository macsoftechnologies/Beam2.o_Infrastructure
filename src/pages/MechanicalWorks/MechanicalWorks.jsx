import React, { useState } from "react";
import { showSuccess, showError, showDeleteConfirm, showDeleteSuccess } from "../../components/common/Toast/Toast";
import Table from "../../components/common/Table/Table";
import Modal from "../../components/common/Modal/Modal";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import MechanicalWorksForm from "../../forms/MechanicalWorksform/MechanicalWorksform";
import "../styles/pages.css";

const STATIC_MECHANICAL_WORKS = [
  { mechanicalWorkId: 1,  mechanicalWork: "9961-A" },
  { mechanicalWorkId: 2,  mechanicalWork: "9901-A" },
  { mechanicalWorkId: 3,  mechanicalWork: "9806-A" },
  { mechanicalWorkId: 4,  mechanicalWork: "9805-A" },
  { mechanicalWorkId: 5,  mechanicalWork: "9804-A" },
  { mechanicalWorkId: 6,  mechanicalWork: "9803-A" },
  { mechanicalWorkId: 7,  mechanicalWork: "9802-A" },
  { mechanicalWorkId: 8,  mechanicalWork: "9801-A" },
  { mechanicalWorkId: 9,  mechanicalWork: "9611-A" },
  { mechanicalWorkId: 10, mechanicalWork: "9497-A" },
];

const PAGE_LIMIT_DEFAULT = 10;

const ActionButtons = ({ onView, onEdit, onDelete }) => (
  <div className="dept-action-btns">
    <button className="dept-action-btn dept-action-btn--view" title="View" onClick={onView}>
      <FaEye />
    </button>
    <button className="dept-action-btn dept-action-btn--edit" title="Edit" onClick={onEdit}>
      <FaEdit />
    </button>
    <button className="dept-action-btn dept-action-btn--delete" title="Delete" onClick={onDelete}>
      <FaTrash />
    </button>
  </div>
);

const MechanicalWorks = () => {
  const [open, setOpen]                                     = useState(false);
  const [editOpen, setEditOpen]                             = useState(false);
  const [viewOpen, setViewOpen]                             = useState(false);
  const [selectedMechanicalWork, setSelectedMechanicalWork] = useState(null);
  const [mechanicalWorkList, setMechanicalWorkList]         = useState(STATIC_MECHANICAL_WORKS);
  const [currentPage, setCurrentPage]                       = useState(1);
  const [pageLimit]                                         = useState(PAGE_LIMIT_DEFAULT);

  const totalPages = Math.ceil(mechanicalWorkList.length / pageLimit);
  const startIndex = (currentPage - 1) * pageLimit;
  const paginated  = mechanicalWorkList.slice(startIndex, startIndex + pageLimit);

  const handleView = (item, index) => {
    setSelectedMechanicalWork({ ...item, serial: startIndex + index + 1 });
    setViewOpen(true);
  };

  const handleEdit = (item, index) => {
    setSelectedMechanicalWork({ ...item, serial: startIndex + index + 1 });
    setEditOpen(true);
  };

  const handleDelete = async (item) => {
    const result = await showDeleteConfirm();
    if (!result.isConfirmed) return;
    setMechanicalWorkList((prev) => prev.filter((m) => m.mechanicalWorkId !== item.mechanicalWorkId));
    showDeleteSuccess();
  };

  const handleSubmit = (formData) => {
    try {
      if (selectedMechanicalWork && editOpen) {
        setMechanicalWorkList((prev) =>
          prev.map((m) =>
            m.mechanicalWorkId === selectedMechanicalWork.mechanicalWorkId ? { ...m, ...formData } : m
          )
        );
        setEditOpen(false);
        setSelectedMechanicalWork(null);
        showSuccess("Mechanical Work updated successfully");
        return;
      }
      setMechanicalWorkList((prev) => [...prev, { ...formData, mechanicalWorkId: Date.now() }]);
      setOpen(false);
      showSuccess("Mechanical Work added successfully");
    } catch {
      showError("Operation failed");
    }
  };

  const columns = [
    { header: "S.No",             accessor: "serial"          },
    { header: "Mechanical Work",  accessor: "mechanicalWork"  },
    { header: "Actions",          accessor: "actions"         },
  ];

  const tableData = paginated.map((item, index) => ({
    ...item,
    serial: startIndex + index + 1,
    actions: (
      <ActionButtons
        onView={() => handleView(item, index)}
        onEdit={() => handleEdit(item, index)}
        onDelete={() => handleDelete(item)}
      />
    ),
  }));

  return (
    <div className="dept-page">

      <div className="dept-page-header">
        <div className="dept-page-header__left">
          <h1 className="dept-page-title">Mechanical Works</h1>
          <p className="dept-page-subtitle">Manage and configure all mechanical work records</p>
        </div>
        <div className="dept-page-header__right">
          <span className="dept-count-badge">{mechanicalWorkList.length} Total</span>
          <button className="dept-add-btn" onClick={() => setOpen(true)}>
            <span className="dept-add-btn__icon">＋</span>
            Add Mechanical Work
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

      <Modal open={open} onClose={() => setOpen(false)} title="Add Mechanical Work" size="lg" type="default">
        <MechanicalWorksForm onClose={() => setOpen(false)} onSubmit={handleSubmit} />
      </Modal>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Mechanical Work" size="lg" type="warning">
        <MechanicalWorksForm isEdit initialData={selectedMechanicalWork} onClose={() => setEditOpen(false)} onSubmit={handleSubmit} />
      </Modal>

      <Modal open={viewOpen} onClose={() => setViewOpen(false)} title="Mechanical Work Details" size="md" type="info">
        {selectedMechanicalWork && (
          <div className="dept-view-grid">
            <div className="dept-view-item">
              <span className="dept-view-label">Mechanical Work</span>
              <span className="dept-view-value dept-view-value--code">{selectedMechanicalWork.mechanicalWork}</span>
            </div>
            <div className="dept-view-item">
              <span className="dept-view-label">Serial No.</span>
              <span className="dept-view-value">#{selectedMechanicalWork.serial}</span>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default MechanicalWorks;