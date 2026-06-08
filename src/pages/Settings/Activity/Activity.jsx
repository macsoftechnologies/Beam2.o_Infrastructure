import React, { useState } from "react";
import { showSuccess, showError, showDeleteConfirm, showDeleteSuccess } from "../../../components/common/Toast/Toast";
import Table from "../../../components/common/Table/Table";
import Modal from "../../../components/common/Modal/Modal";
import { FaEdit, FaTrash } from "react-icons/fa";
import Activityform from "../../../forms/Activityform/Activityform";
import "../../styles/pages.css";

const STATIC_ACTIVITIES = [
  { activityId: 1,  name: "WP-462D_Temporary Coolling VVS, Bravida Danmark A/S" },
  { activityId: 2,  name: "WP-403_Cooling and Heating Production"                },
  { activityId: 3,  name: "WP-329_Ethanol Tanks"                                 },
  { activityId: 4,  name: "WP-328H_Electrical Installation"                      },
  { activityId: 5,  name: "WP-328G_Piping Installation"                          },
  { activityId: 6,  name: "WP-328F_Insulation"                                   },
  { activityId: 7,  name: "WP-328E_1_Unloading & Crane"                          },
  { activityId: 8,  name: "WP-328D_Inline Mix"                                   },
  { activityId: 9,  name: "WP-328_Ethanol Columns"                               },
  { activityId: 10, name: "WP-326_Purified water distribution"                   },
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

const Activity = () => {
  const [open, setOpen]                         = useState(false);
  const [editOpen, setEditOpen]                 = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activityList, setActivityList]         = useState(STATIC_ACTIVITIES);
  const [currentPage, setCurrentPage]           = useState(1);
  const [pageLimit]                             = useState(PAGE_LIMIT_DEFAULT);

  const totalPages = Math.ceil(activityList.length / pageLimit);
  const startIndex = (currentPage - 1) * pageLimit;
  const paginated  = activityList.slice(startIndex, startIndex + pageLimit);

  const handleEdit = (item, index) => {
    setSelectedActivity({ ...item, serial: startIndex + index + 1 });
    setEditOpen(true);
  };

  const handleDelete = async (item) => {
    const result = await showDeleteConfirm();
    if (!result.isConfirmed) return;
    setActivityList((prev) => prev.filter((a) => a.activityId !== item.activityId));
    showDeleteSuccess();
  };

  const handleSubmit = (formData) => {
    try {
      if (selectedActivity && editOpen) {
        setActivityList((prev) =>
          prev.map((a) =>
            a.activityId === selectedActivity.activityId ? { ...a, ...formData } : a
          )
        );
        setEditOpen(false);
        setSelectedActivity(null);
        showSuccess("Activity updated successfully");
        return;
      }
      setActivityList((prev) => [...prev, { ...formData, activityId: Date.now() }]);
      setOpen(false);
      showSuccess("Activity added successfully");
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
          <h1 className="dept-page-title">Activity</h1>
          <p className="dept-page-subtitle">Manage and configure all activity records</p>
        </div>
        <div className="dept-page-header__right">
          <span className="dept-count-badge">{activityList.length} Total</span>
          <button className="dept-add-btn" onClick={() => setOpen(true)}>
            <span className="dept-add-btn__icon">＋</span>
            Add Activity
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

      <Modal open={open} onClose={() => setOpen(false)} title="Add Activity" size="md" type="default">
        <Activityform onClose={() => setOpen(false)} onSubmit={handleSubmit} />
      </Modal>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Activity" size="md" type="warning">
        <Activityform isEdit initialData={selectedActivity} onClose={() => setEditOpen(false)} onSubmit={handleSubmit} />
      </Modal>

    </div>
  );
};

export default Activity;