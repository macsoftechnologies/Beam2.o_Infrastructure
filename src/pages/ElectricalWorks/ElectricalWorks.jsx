import React, { useState } from "react";
import { showSuccess, showError, showDeleteConfirm, showDeleteSuccess } from "../../components/common/Toast/Toast";
import Table from "../../components/common/Table/Table";
import Modal from "../../components/common/Modal/Modal";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import ElectricalWorksForm from "../../forms/ElectricalWorksform/ElectricalWorksform";
import "../styles/pages.css";

const STATIC_ELECTRICAL_WORKS = [
  { electricalWorkId: 1,  moduleNumber: "System Numbers", electricalWork: "0110F" },
  { electricalWorkId: 2,  moduleNumber: "System Numbers", electricalWork: "0110E" },
  { electricalWorkId: 3,  moduleNumber: "System Numbers", electricalWork: "0110D" },
  { electricalWorkId: 4,  moduleNumber: "System Numbers", electricalWork: "0110C" },
  { electricalWorkId: 5,  moduleNumber: "System Numbers", electricalWork: "0110B" },
  { electricalWorkId: 6,  moduleNumber: "System Numbers", electricalWork: "0110A" },
  { electricalWorkId: 7,  moduleNumber: "System Numbers", electricalWork: "1087X" },
  { electricalWorkId: 8,  moduleNumber: "System Numbers", electricalWork: "1086X" },
  { electricalWorkId: 9,  moduleNumber: "System Numbers", electricalWork: "1076X" },
  { electricalWorkId: 10, moduleNumber: "Panel Numbers",  electricalWork: "1075X" },
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

const ElectricalWorks = () => {
  const [open, setOpen]                                   = useState(false);
  const [editOpen, setEditOpen]                           = useState(false);
  const [viewOpen, setViewOpen]                           = useState(false);
  const [selectedElectricalWork, setSelectedElectricalWork] = useState(null);
  const [electricalWorkList, setElectricalWorkList]       = useState(STATIC_ELECTRICAL_WORKS);
  const [currentPage, setCurrentPage]                     = useState(1);
  const [pageLimit]                                       = useState(PAGE_LIMIT_DEFAULT);

  const totalPages = Math.ceil(electricalWorkList.length / pageLimit);
  const startIndex = (currentPage - 1) * pageLimit;
  const paginated  = electricalWorkList.slice(startIndex, startIndex + pageLimit);

  const handleView = (item, index) => {
    setSelectedElectricalWork({ ...item, serial: startIndex + index + 1 });
    setViewOpen(true);
  };

  const handleEdit = (item, index) => {
    setSelectedElectricalWork({ ...item, serial: startIndex + index + 1 });
    setEditOpen(true);
  };

  const handleDelete = async (item) => {
    const result = await showDeleteConfirm();
    if (!result.isConfirmed) return;
    setElectricalWorkList((prev) => prev.filter((e) => e.electricalWorkId !== item.electricalWorkId));
    showDeleteSuccess();
  };

  const handleSubmit = (formData) => {
    try {
      if (selectedElectricalWork && editOpen) {
        setElectricalWorkList((prev) =>
          prev.map((e) =>
            e.electricalWorkId === selectedElectricalWork.electricalWorkId ? { ...e, ...formData } : e
          )
        );
        setEditOpen(false);
        setSelectedElectricalWork(null);
        showSuccess("Electrical Work updated successfully");
        return;
      }
      setElectricalWorkList((prev) => [...prev, { ...formData, electricalWorkId: Date.now() }]);
      setOpen(false);
      showSuccess("Electrical Work added successfully");
    } catch {
      showError("Operation failed");
    }
  };

  const columns = [
    { header: "S.No",            accessor: "serial"          },
    { header: "Module Number",   accessor: "moduleNumber"    },
    { header: "Electrical Work", accessor: "electricalWork"  },
    { header: "Actions",         accessor: "actions"         },
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
          <h1 className="dept-page-title">Electrical Works</h1>
          <p className="dept-page-subtitle">Manage and configure all electrical work records</p>
        </div>
        <div className="dept-page-header__right">
          <span className="dept-count-badge">{electricalWorkList.length} Total</span>
          <button className="dept-add-btn" onClick={() => setOpen(true)}>
            <span className="dept-add-btn__icon">＋</span>
            Add Electrical Work
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

      <Modal open={open} onClose={() => setOpen(false)} title="Add Electrical Work" size="lg" type="default">
        <ElectricalWorksForm onClose={() => setOpen(false)} onSubmit={handleSubmit} />
      </Modal>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Electrical Work" size="lg" type="warning">
        <ElectricalWorksForm isEdit initialData={selectedElectricalWork} onClose={() => setEditOpen(false)} onSubmit={handleSubmit} />
      </Modal>

      <Modal open={viewOpen} onClose={() => setViewOpen(false)} title="Electrical Work Details" size="md" type="info">
        {selectedElectricalWork && (
          <div className="dept-view-grid">
            <div className="dept-view-item">
              <span className="dept-view-label">Module Number</span>
              <span className="dept-view-value dept-view-value--code">{selectedElectricalWork.moduleNumber}</span>
            </div>
            <div className="dept-view-item">
              <span className="dept-view-label">Electrical Work</span>
              <span className="dept-view-value">{selectedElectricalWork.electricalWork}</span>
            </div>
            <div className="dept-view-item">
              <span className="dept-view-label">Serial No.</span>
              <span className="dept-view-value">#{selectedElectricalWork.serial}</span>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default ElectricalWorks;