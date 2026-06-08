import React, { useState } from "react";
import { showSuccess, showError, showDeleteConfirm, showDeleteSuccess } from "../../components/common/Toast/Toast";
import Table from "../../components/common/Table/Table";
import Modal from "../../components/common/Modal/Modal";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import ZoneStatusForm from "../../forms/ZoneStatusform/ZoneStatusform";
import "../styles/pages.css";

const STATIC_ZONE_STATUSES = [
  { zoneStatusId: 1,  building: "MA.II", level: "MA.II 1", zone: "50.1L",   status: "Construction"   },
  { zoneStatusId: 2,  building: "MU91",  level: "MU91.1",  zone: "MU91.1P", status: "Commissioning"  },
  { zoneStatusId: 3,  building: "MU91",  level: "MU91.1",  zone: "MU91.1N", status: "Commissioning"  },
  { zoneStatusId: 4,  building: "MU91",  level: "MU91.1",  zone: "MU91.1M", status: "Commissioning"  },
  { zoneStatusId: 5,  building: "MU91",  level: "MU91.1",  zone: "MU91.1H", status: "Commissioning"  },
  { zoneStatusId: 6,  building: "MU91",  level: "MU91.1",  zone: "MU91.1G", status: "Construction"   },
  { zoneStatusId: 7,  building: "MU91",  level: "MU91.1",  zone: "MU91.1F", status: "Construction"   },
  { zoneStatusId: 8,  building: "MU91",  level: "MU91.1",  zone: "MU91.1A", status: "Commissioning"  },
  { zoneStatusId: 9,  building: "MU91",  level: "MU91.0",  zone: "MU91.0S", status: "Construction"   },
  { zoneStatusId: 10, building: "MU91",  level: "MU91.0",  zone: "MU91.0R", status: "Construction"   },
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

const StatusBadge = ({ status }) => (
  <span className={`dept-status-badge dept-status-badge--${status === "active" ? "active" : "inactive"}`}>
    {status}
  </span>
);

const ZoneStatus = () => {
  const [open, setOpen]                           = useState(false);
  const [editOpen, setEditOpen]                   = useState(false);
  const [viewOpen, setViewOpen]                   = useState(false);
  const [selectedZoneStatus, setSelectedZoneStatus] = useState(null);
  const [zoneStatusList, setZoneStatusList]       = useState(STATIC_ZONE_STATUSES);
  const [currentPage, setCurrentPage]             = useState(1);
  const [pageLimit]                               = useState(PAGE_LIMIT_DEFAULT);

  const totalPages = Math.ceil(zoneStatusList.length / pageLimit);
  const startIndex = (currentPage - 1) * pageLimit;
  const paginated  = zoneStatusList.slice(startIndex, startIndex + pageLimit);

  const handleView = (item, index) => {
    setSelectedZoneStatus({ ...item, serial: startIndex + index + 1 });
    setViewOpen(true);
  };

  const handleEdit = (item, index) => {
    setSelectedZoneStatus({ ...item, serial: startIndex + index + 1 });
    setEditOpen(true);
  };

  const handleDelete = async (item) => {
    const result = await showDeleteConfirm();
    if (!result.isConfirmed) return;
    setZoneStatusList((prev) => prev.filter((z) => z.zoneStatusId !== item.zoneStatusId));
    showDeleteSuccess();
  };

  const handleSubmit = (formData) => {
    try {
      if (selectedZoneStatus && editOpen) {
        setZoneStatusList((prev) =>
          prev.map((z) =>
            z.zoneStatusId === selectedZoneStatus.zoneStatusId ? { ...z, ...formData } : z
          )
        );
        setEditOpen(false);
        setSelectedZoneStatus(null);
        showSuccess("Zone Status updated successfully");
        return;
      }
      setZoneStatusList((prev) => [...prev, { ...formData, zoneStatusId: Date.now() }]);
      setOpen(false);
      showSuccess("Zone Status added successfully");
    } catch {
      showError("Operation failed");
    }
  };

  const columns = [
    { header: "S.No",     accessor: "serial"   },
    { header: "Building", accessor: "building" },
    { header: "Level",    accessor: "level"    },
    { header: "Zone",     accessor: "zone"     },
    { header: "Status",   accessor: "status"   },
    { header: "Actions",  accessor: "actions"  },
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
          <h1 className="dept-page-title">Zone Status</h1>
          <p className="dept-page-subtitle">Manage and configure all zone status records</p>
        </div>
        <div className="dept-page-header__right">
          <span className="dept-count-badge">{zoneStatusList.length} Total</span>
          <button className="dept-add-btn" onClick={() => setOpen(true)}>
            <span className="dept-add-btn__icon">＋</span>
            Add Zone Status
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

      <Modal open={open} onClose={() => setOpen(false)} title="Add Zone Status" size="lg" type="default">
        <ZoneStatusForm onClose={() => setOpen(false)} onSubmit={handleSubmit} />
      </Modal>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Zone Status" size="lg" type="warning">
        <ZoneStatusForm isEdit initialData={selectedZoneStatus} onClose={() => setEditOpen(false)} onSubmit={handleSubmit} />
      </Modal>

      <Modal open={viewOpen} onClose={() => setViewOpen(false)} title="Zone Status Details" size="md" type="info">
        {selectedZoneStatus && (
          <div className="dept-view-grid">
            <div className="dept-view-item">
              <span className="dept-view-label">Building</span>
              <span className="dept-view-value">{selectedZoneStatus.building}</span>
            </div>
            <div className="dept-view-item">
              <span className="dept-view-label">Level</span>
              <span className="dept-view-value dept-view-value--code">{selectedZoneStatus.level}</span>
            </div>
            <div className="dept-view-item">
              <span className="dept-view-label">Zone</span>
              <span className="dept-view-value dept-view-value--code">{selectedZoneStatus.zone}</span>
            </div>
            <div className="dept-view-item">
              <span className="dept-view-label">Status</span>
              <span className="dept-view-value">{selectedZoneStatus.status}</span>
            </div>
            <div className="dept-view-item">
              <span className="dept-view-label">Serial No.</span>
              <span className="dept-view-value">#{selectedZoneStatus.serial}</span>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default ZoneStatus;