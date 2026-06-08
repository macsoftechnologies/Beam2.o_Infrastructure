import React, { useState } from "react";
import { showSuccess, showError, showDeleteConfirm, showDeleteSuccess } from "../../components/common/Toast/Toast";
import Table from "../../components/common/Table/Table";
import Modal from "../../components/common/Modal/Modal";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import ContractorForm from "../../forms/Contractorsform/Contractorform";
import "../styles/pages.css";

const STATIC_CONTRACTORS = [
  { contractorId: 1,  name: "Alpha Build Co.",      department: "Human Resources",  logo: null, status: "active"   },
  { contractorId: 2,  name: "BrightWave Infra",      department: "Finance",          logo: null, status: "active"   },
  { contractorId: 3,  name: "CoreTech Solutions",    department: "Information Tech", logo: null, status: "inactive" },
  { contractorId: 4,  name: "Delta Constructions",   department: "Marketing",        logo: null, status: "active"   },
  { contractorId: 5,  name: "EagleEye Services",     department: "Operations",       logo: null, status: "active"   },
  { contractorId: 6,  name: "FlexBuild Partners",    department: "Legal",            logo: null, status: "inactive" },
  { contractorId: 7,  name: "GreenMark Contractors", department: "Research & Dev",   logo: null, status: "active"   },
  { contractorId: 8,  name: "HighRise Corp.",         department: "Customer Support", logo: null, status: "active"   },
  { contractorId: 9,  name: "IronClad Works",        department: "Sales",            logo: null, status: "inactive" },
  { contractorId: 10, name: "JetStream Builders",    department: "Administration",   logo: null, status: "active"   },
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
  <span className={`dept-status-badge dept-status-badge--${status}`}>
    {status === "active" ? "● Active" : "● Inactive"}
  </span>
);

const Contractors = () => {
  const [open, setOpen]                             = useState(false);
  const [editOpen, setEditOpen]                     = useState(false);
  const [viewOpen, setViewOpen]                     = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [contractorList, setContractorList]         = useState(STATIC_CONTRACTORS);
  const [currentPage, setCurrentPage]               = useState(1);
  const [pageLimit]                                 = useState(PAGE_LIMIT_DEFAULT);

  const totalPages = Math.ceil(contractorList.length / pageLimit);
  const startIndex = (currentPage - 1) * pageLimit;
  const paginated  = contractorList.slice(startIndex, startIndex + pageLimit);

  const handleView = (item, index) => {
    setSelectedContractor({ ...item, serial: startIndex + index + 1 });
    setViewOpen(true);
  };

  const handleEdit = (item, index) => {
    setSelectedContractor({ ...item, serial: startIndex + index + 1 });
    setEditOpen(true);
  };

  const handleDelete = async (item) => {
    const result = await showDeleteConfirm();
    if (!result.isConfirmed) return;
    setContractorList((prev) => prev.filter((c) => c.contractorId !== item.contractorId));
    showDeleteSuccess();
  };

  const handleSubmit = (formData) => {
    try {
      if (selectedContractor && editOpen) {
        setContractorList((prev) =>
          prev.map((c) =>
            c.contractorId === selectedContractor.contractorId ? { ...c, ...formData } : c
          )
        );
        setEditOpen(false);
        setSelectedContractor(null);
        showSuccess("Contractor updated successfully");
        return;
      }
      setContractorList((prev) => [...prev, { ...formData, contractorId: Date.now() }]);
      setOpen(false);
      showSuccess("Contractor added successfully");
    } catch {
      showError("Operation failed");
    }
  };

  const columns = [
    { header: "S.No",       accessor: "serial"      },
    { header: "Name",       accessor: "name"        },
    { header: "Department", accessor: "department"  },
    { header: "Logo",       accessor: "logoCell"    },
    { header: "Status",     accessor: "statusBadge" },
    { header: "Actions",    accessor: "actions"     },
  ];

  const tableData = paginated.map((item, index) => ({
    ...item,
    serial: startIndex + index + 1,

    logoCell: item.logo ? (
      <img src={item.logo} alt={`${item.name} logo`} className="dept-logo-thumb" />
    ) : (
      <span className="dept-no-logo">—</span>
    ),

    statusBadge: <StatusBadge status={item.status} />,

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
          <h1 className="dept-page-title">Contractors</h1>
          <p className="dept-page-subtitle">Manage and configure all contractor records</p>
        </div>
        <div className="dept-page-header__right">
          <span className="dept-count-badge">{contractorList.length} Total</span>
          <button className="dept-add-btn" onClick={() => setOpen(true)}>
            <span className="dept-add-btn__icon">＋</span>
            Add Contractor
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

      <Modal open={open} onClose={() => setOpen(false)} title="Add Contractor" size="lg" type="default">
        <ContractorForm onClose={() => setOpen(false)} onSubmit={handleSubmit} />
      </Modal>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Contractor" size="lg" type="warning">
        <ContractorForm isEdit initialData={selectedContractor} onClose={() => setEditOpen(false)} onSubmit={handleSubmit} />
      </Modal>

      <Modal open={viewOpen} onClose={() => setViewOpen(false)} title="Contractor Details" size="md" type="info">
        {selectedContractor && (
          <div className="dept-view-grid">
            <div className="dept-view-item">
              <span className="dept-view-label">Contractor Name</span>
              <span className="dept-view-value">{selectedContractor.name}</span>
            </div>
            <div className="dept-view-item">
              <span className="dept-view-label">Department</span>
              <span className="dept-view-value dept-view-value--code">{selectedContractor.department}</span>
            </div>
            <div className="dept-view-item">
              <span className="dept-view-label">Logo</span>
              {selectedContractor.logo ? (
                <img src={selectedContractor.logo} alt="logo" className="dept-view-logo" />
              ) : (
                <span className="dept-view-value">No logo uploaded</span>
              )}
            </div>
            <div className="dept-view-item">
              <span className="dept-view-label">Status</span>
              <StatusBadge status={selectedContractor.status} />
            </div>
            <div className="dept-view-item">
              <span className="dept-view-label">Serial No.</span>
              <span className="dept-view-value">#{selectedContractor.serial}</span>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default Contractors;