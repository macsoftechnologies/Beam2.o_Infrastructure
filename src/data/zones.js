import MU900APdf from "../assets/drawings/m3north/plans/MU90/MU90.0/Zones/MU90.0A.pdf";
import MU900BPdf from "../assets/drawings/m3north/plans/MU90/MU90.0/Zones/MU90.0B.pdf";
import MU900CPdf from "../assets/drawings/m3north/plans/MU90/MU90.0/Zones/MU90.0C.pdf";
import MU900DPdf from "../assets/drawings/m3north/plans/MU90/MU90.0/Zones/MU90.0D.pdf";
import MU900EPdf from "../assets/drawings/m3north/plans/MU90/MU90.0/Zones/MU90.0E.pdf";
import MU900F1Pdf from "../assets/drawings/m3north/plans/MU90/MU90.0/Zones/MU90.0F1.pdf";
import MU900F2Pdf from "../assets/drawings/m3north/plans/MU90/MU90.0/Zones/MU90.0F2.pdf";
import MU900IPdf from "../assets/drawings/m3north/plans/MU90/MU90.0/Zones/MU90.0I.pdf";
import MU900KPdf from "../assets/drawings/m3north/plans/MU90/MU90.0/Zones/MU90.0K.pdf";

// MU90.1
import MU901BNPdf from "../assets/drawings/m3north/plans/MU90/MU90.1/Zones/MU90.1BN.pdf";
import MU901BSPdf from "../assets/drawings/m3north/plans/MU90/MU90.1/Zones/MU90.1BS.pdf";
import MU901CPdf from "../assets/drawings/m3north/plans/MU90/MU90.1/Zones/MU90.1C.pdf";
import MU901C1Pdf from "../assets/drawings/m3north/plans/MU90/MU90.1/Zones/MU90.1C1.pdf";
import MU901DPdf from "../assets/drawings/m3north/plans/MU90/MU90.1/Zones/MU90.1D.pdf";
import MU901EPdf from "../assets/drawings/m3north/plans/MU90/MU90.1/Zones/MU90.1E.pdf";
import MU901FPdf from "../assets/drawings/m3north/plans/MU90/MU90.1/Zones/MU90.1F.pdf";
import MU901GPdf from "../assets/drawings/m3north/plans/MU90/MU90.1/Zones/MU90.1G.pdf";
import MU901HPdf from "../assets/drawings/m3north/plans/MU90/MU90.1/Zones/MU90.1H.pdf";
import MU901IPdf from "../assets/drawings/m3north/plans/MU90/MU90.1/Zones/MU90.1I.pdf";
import MU901KPdf from "../assets/drawings/m3north/plans/MU90/MU90.1/Zones/MU90.1K.pdf";
import MU901LPdf from "../assets/drawings/m3north/plans/MU90/MU90.1/Zones/MU90.1L.pdf";
import MU901MPdf from "../assets/drawings/m3north/plans/MU90/MU90.1/Zones/MU90.1M.pdf";

// MU90.2 & MU90.R
import MU902Pdf from "../assets/drawings/m3north/plans/MU90/MU90.2/MU90.2.pdf";
import MU90RPdf from "../assets/drawings/m3north/plans/MU90/MU90.R/MU90.R.pdf";


import CP_EGEPdf from "../assets/drawings/m3north/plans/external/external-zones/CP_EGE.pdf";
import CT_DarkPdf from "../assets/drawings/m3north/plans/external/external-zones/CT_Dark.pdf";
import Laydown20Pdf from "../assets/drawings/m3north/plans/external/external-zones/Laydown_20.pdf";
import Laydown30Pdf from "../assets/drawings/m3north/plans/external/external-zones/Laydown_30.pdf";
import Laydown40Pdf from "../assets/drawings/m3north/plans/external/external-zones/Laydown_40.pdf";
import M3MAExternalZonesPdf from "../assets/drawings/m3north/plans/external/external-zones/M3MA External Zones.pdf";
import MA_IPdf from "../assets/drawings/m3north/plans/external/external-zones/MA_I.pdf";
import MA_IIPdf from "../assets/drawings/m3north/plans/external/external-zones/MA_II.pdf";
import MA_IIIPdf from "../assets/drawings/m3north/plans/external/external-zones/MA_III.pdf";
import MBPdf from "../assets/drawings/m3north/plans/external/external-zones/MB.pdf";
import MT_MSPdf from "../assets/drawings/m3north/plans/external/external-zones/MT-MS.pdf";
import MUPdf from "../assets/drawings/m3north/plans/external/external-zones/MU.pdf";
import RoadsPdf from "../assets/drawings/m3north/plans/external/external-zones/Roads.pdf";
import WelfarePdf from "../assets/drawings/m3north/plans/external/external-zones/Welfare_zones.pdf";

export const ZONE_MAPPING = {
  "MU90.0": [
    {
      id: 1,
      name: "MU90.0A",
      className: "MU90_0A",
      pdf: MU900APdf,
      rooms: [
        { name: "S.903", className: "MU90_GF-ZoneMU90_0A-1" }
      ]
    },
    {
      id: 2,
      name: "MU90.0B",
      className: "MU90_0B",
      pdf: MU900BPdf,
      rooms: [
        { name: "S.917", className: "MU90_GF-ZoneMU90_0B-1" },
        { name: "TR92", className: "MU90_GF-ZoneMU90_0B-2" },
        { name: "S.915", className: "MU90_GF-ZoneMU90_0B-3" }
      ]
    },
    {
      id: 3,
      name: "MU90.0C",
      className: "MU90_0C",
      pdf: MU900CPdf,
      rooms: [
        { name: "S.937", className: "MU90_GF-ZoneMU90_0C-1" },
        { name: "S.929", className: "MU90_GF-ZoneMU90_0C-2" },
        { name: "S.921", className: "MU90_GF-ZoneMU90_0C-3" }
      ]
    },
    {
      id: 4,
      name: "MU90.0D",
      className: "MU90_0D",
      pdf: MU900DPdf,
      rooms: [
        { name: "S.953", className: "MU90_GF-ZoneMU90_0D-1" },
        { name: "S.950", className: "MU90_GF-ZoneMU90_0D-2" },
        { name: "S.941", className: "MU90_GF-ZoneMU90_0D-3" },
        { name: "S.945", className: "MU90_GF-ZoneMU90_0D-4" },
        { name: "S.942", className: "MU90_GF-ZoneMU90_0D-5" }
      ]
    },
    {
      id: 5,
      name: "MU90.0E",
      className: "MU90_0E",
      pdf: MU900EPdf,
      rooms: [
        { name: "S.928", className: "MU90_GF-ZoneMU90_0E-1" },
        { name: "S.916", className: "MU90_GF-ZoneMU90_0E-2" },
        { name: "S.908", className: "MU90_GF-ZoneMU90_0E-3" }
      ]
    },
    {
      id: 6,
      name: "MU90.0F1",
      className: "MU90_0F1",
      pdf: MU900F1Pdf,
      rooms: [
        { name: "S.904.2", className: "MU90_GF-ZoneMU90_0F1-1" },
        { name: "S.906.1", className: "MU90_GF-ZoneMU90_0F1-2" },
        { name: "S.906", className: "MU90_GF-ZoneMU90_0F1-3" },
        { name: "S.904.1", className: "MU90_GF-ZoneMU90_0F1-4" }
      ]
    },
    {
      id: 7,
      name: "MU90.0F2",
      className: "MU90_0F2",
      pdf: MU900F2Pdf,
      rooms: [
        { name: "S.910", className: "MU90_GF-ZoneMU90_0F2-1" },
        { name: "S.912", className: "MU90_GF-ZoneMU90_0F2-2" },
        { name: "S.902.3", className: "MU90_GF-ZoneMU90_0F2-3" },
        { name: "S.902.2", className: "MU90_GF-ZoneMU90_0F2-4" },
        { name: "S.902.4", className: "MU90_GF-ZoneMU90_0F2-5" },
        { name: "LI91", className: "MU90_GF-ZoneMU90_0F2-6" },
        { name: "S.902.1", className: "MU90_GF-ZoneMU90_0F2-7" },
        { name: "TE91", className: "MU90_GF-ZoneMU90_0F2-8" },
        { name: "S.902", className: "MU90_GF-ZoneMU90_0F2-9" },
        { name: "S.900", className: "MU90_GF-ZoneMU90_0F2-10" }
      ]
    },
    {
      id: 8,
      name: "MU90.0I",
      className: "MU90_0I",
      pdf: MU900IPdf,
      rooms: [
        { name: "S.934", className: "MU90_GF-ZoneMU90_0I-1" },
        { name: "S.924", className: "MU90_GF-ZoneMU90_0I-2" },
        { name: "S.918", className: "MU90_GF-ZoneMU90_0I-3" },
        { name: "S.914", className: "MU90_GF-ZoneMU90_0I-4" }
      ]
    },
    {
      id: 9,
      name: "MU90.0K",
      className: "MU90_0K",
      pdf: MU900KPdf,
      rooms: [
        { name: "TR93", className: "MU90_GF-ZoneMU90_0K-1" },
        { name: "S.904", className: "MU90_GF-ZoneMU90_0K-2" },
        { name: "S.901", className: "MU90_GF-ZoneMU90_0K-3" }
      ]
    }
  ],
  "MU90.1": [
    {
      id: 1,
      name: "MU90.1BN",
      className: "MU90_1BN",
      pdf: MU901BNPdf,
      rooms: [
        { name: "1.935", className: "MU90_1_VB-ZoneMU90_1BN-1" },
        { name: "1.931", className: "MU90_1_VB-ZoneMU90_1BN-2" },
        { name: "1.933", className: "MU90_1_VB-ZoneMU90_1BN-3" },
        { name: "1.923.1", className: "MU90_1_VB-ZoneMU90_1BN-4" },
        { name: "1.927", className: "MU90_1_VB-ZoneMU90_1BN-5" },
        { name: "1.929", className: "MU90_1_VB-ZoneMU90_1BN-6" },
        { name: "1.925", className: "MU90_1_VB-ZoneMU90_1BN-7" },
        { name: "1.919.5", className: "MU90_1_VB-ZoneMU90_1BN-8" },
        { name: "1.923", className: "MU90_1_VB-ZoneMU90_1BN-9" },
        { name: "1.921", className: "MU90_1_VB-ZoneMU90_1BN-10" },
        { name: "TR92", className: "MU90_1_VB-ZoneMU90_1BN-11" },
        { name: "1.915", className: "MU90_1_VB-ZoneMU90_1BN-12" },
        { name: "1.919.2", className: "MU90_1_VB-ZoneMU90_1BN-13" },
        { name: "1.919.1", className: "MU90_1_VB-ZoneMU90_1BN-14" },
        { name: "1.919.3", className: "MU90_1_VB-ZoneMU90_1BN-15" },
        { name: "S.903", className: "MU90_1_VB-ZoneMU90_1BN-16" },
        { name: "1.919.4", className: "MU90_1_VB-ZoneMU90_1BN-17" }
      ]
    },
    {
      id: 2,
      name: "MU90.1BS",
      className: "MU90_1BS",
      pdf: MU901BSPdf,
      rooms: [
        { name: "1.917", className: "MU90_1_VB-ZoneMU90_1BS-1" },
        { name: "1.913.5", className: "MU90_1_VB-ZoneMU90_1BS-2" },
        { name: "1.913.6", className: "MU90_1_VB-ZoneMU90_1BS-3" },
        { name: "1.913.3", className: "MU90_1_VB-ZoneMU90_1BS-4" },
        { name: "1.913.4", className: "MU90_1_VB-ZoneMU90_1BS-5" },
        { name: "1.913.2", className: "MU90_1_VB-ZoneMU90_1BS-6" },
        { name: "1.913", className: "MU90_1_VB-ZoneMU90_1BS-7" },
        { name: "1.911", className: "MU90_1_VB-ZoneMU90_1BS-8" },
        { name: "1.909", className: "MU90_1_VB-ZoneMU90_1BS-9" },
        { name: "1.913.1", className: "MU90_1_VB-ZoneMU90_1BS-10" },
        { name: "1.906.1", className: "MU90_1_VB-ZoneMU90_1BS-11" },
        { name: "1.906.2", className: "MU90_1_VB-ZoneMU90_1BS-12" },
        { name: "1.901", className: "MU90_1_VB-ZoneMU90_1BS-13" },
        { name: "1.906", className: "MU90_1_VB-ZoneMU90_1BS-14" },
        { name: "1.906.3", className: "MU90_1_VB-ZoneMU90_1BS-15" },
        { name: "1.906.4", className: "MU90_1_VB-ZoneMU90_1BS-16" },
        { name: "1.906.5", className: "MU90_1_VB-ZoneMU90_1BS-17" }
      ]
    },
    {
      id: 3,
      name: "MU90.1C1",
      className: "MU90_1C",
      pdf: MU901CPdf,
      rooms: [
        { name: "1.924", className: "MU90_1_VB-ZoneMU90_1C-1" }
      ]
    },
    {
      id: 4,
      name: "MU90.1C2",
      className: "MU90_1C2",
      pdf: MU901C1Pdf,
      rooms: [
        { name: "1.937", className: "MU90_1_VB-ZoneMU90_1C2-1" }
      ]
    },
    {
      id: 5,
      name: "MU90.1D",
      className: "MU90_1D",
      pdf: MU901DPdf,
      rooms: [
        { name: "1.947", className: "MU90_1_VB-ZoneMU90_1D-1" }
      ]
    },
    {
      id: 6,
      name: "MU90.1E",
      className: "MU90_1E",
      pdf: MU901EPdf,
      rooms: [
        { name: "1.951", className: "MU90_1_VB-ZoneMU90_1E-1" }
      ]
    },
    {
      id: 7,
      name: "MU90.1F",
      className: "MU90_1F",
      pdf: MU901FPdf,
      rooms: [
        { name: "1.952", className: "MU90_1_VB-ZoneMU90_1F-1" }
      ]
    },
    {
      id: 8,
      name: "MU90.1G",
      className: "MU90_1G",
      pdf: MU901GPdf,
      rooms: [
        { name: "1.950", className: "MU90_1_VB-ZoneMU90_1G-1" },
        { name: "1.944", className: "MU90_1_VB-ZoneMU90_1G-2" },
        { name: "1.940", className: "MU90_1_VB-ZoneMU90_1G-3" }
      ]
    },
    {
      id: 9,
      name: "MU90.1H",
      className: "MU90_1H",
      pdf: MU901HPdf,
      rooms: [
        { name: "1.928", className: "MU90_1_VB-ZoneMU90_1H-1" },
        { name: "1.920", className: "MU90_1_VB-ZoneMU90_1H-2" }
      ]
    },
    {
      id: 10,
      name: "MU90.1I",
      className: "MU90_1I",
      pdf: MU901IPdf,
      rooms: [
        { name: "1.914.4", className: "MU90_1_VB-ZoneMU90_1I-1" },
        { name: "1.914.3", className: "MU90_1_VB-ZoneMU90_1I-2" },
        { name: "1.914.2", className: "MU90_1_VB-ZoneMU90_1I-3" },
        { name: "1.914.1", className: "MU90_1_VB-ZoneMU90_1I-4" },
        { name: "1.912", className: "MU90_1_VB-ZoneMU90_1I-5" },
        { name: "1.914", className: "MU90_1_VB-ZoneMU90_1I-6" },
        { name: "1.918", className: "MU90_1_VB-ZoneMU90_1I-7" },
        { name: "1.916", className: "MU90_1_VB-ZoneMU90_1I-8" },
        { name: "1.910", className: "MU90_1_VB-ZoneMU90_1I-9" },
        { name: "1.908.1", className: "MU90_1_VB-ZoneMU90_1I-10" },
        { name: "1.908.2", className: "MU90_1_VB-ZoneMU90_1I-11" },
        { name: "1.908.3", className: "MU90_1_VB-ZoneMU90_1I-12" },
        { name: "1.908", className: "MU90_1_VB-ZoneMU90_1I-13" },
        { name: "1.904", className: "MU90_1_VB-ZoneMU90_1I-14" },
        { name: "1.900.1", className: "MU90_1_VB-ZoneMU90_1I-15" }
      ]
    },
    {
      id: 11,
      name: "MU90.1K",
      className: "MU90_1K",
      pdf: MU901KPdf,
      rooms: [
        { name: "1.941", className: "MU90_1_VB-ZoneMU90_1K-1" },
        { name: "TR93", className: "MU90_1_VB-ZoneMU90_1K-2" },
        { name: "1.930", className: "MU90_1_VB-ZoneMU90_1K-3" },
        { name: "1.922", className: "MU90_1_VB-ZoneMU90_1K-4" },
        { name: "LI91", className: "MU90_1_VB-ZoneMU90_1K-5" },
        { name: "TR91", className: "MU90_1_VB-ZoneMU90_1K-6" },
        { name: "1.900", className: "MU90_1_VB-ZoneMU90_1K-7" }
      ]
    },
    {
      id: 12,
      name: "MU90.1L",
      className: "MU90_1L",
      pdf: MU901LPdf,
      rooms: [
        { name: "1.938", className: "MU90_1_VB-ZoneMU90_1L-1" },
        { name: "1.939", className: "MU90_1_VB-ZoneMU90_1L-2" },
        { name: "1.942", className: "MU90_1_VB-ZoneMU90_1L-3" },
        { name: "1.936", className: "MU90_1_VB-ZoneMU90_1L-4" },
        { name: "1.934", className: "MU90_1_VB-ZoneMU90_1L-5" },
        { name: "1.932", className: "MU90_1_VB-ZoneMU90_1L-6" },
        { name: "1.922.1", className: "MU90_1_VB-ZoneMU90_1L-7" }
      ]
    },
    {
      id: 13,
      name: "MU90.1M",
      className: "MU90_1M",
      pdf: MU901MPdf,
      rooms: [
        { name: "1.922.1", className: "MU90_1_VB-ZoneMU90_1M-1" }
      ]
    }
  ],
  "MU90.2": [
    {
      id: 1,
      name: "MU90.2",
      className: "MU90_2",
      pdf: MU902Pdf,
      rooms: [
        { name: "2.900.2", className: "MU90_1_VB-ZoneMU90_2A-1" },
        { name: "2.900", className: "MU90_1_VB-ZoneMU90_2A-2" },
        { name: "LI91", className: "MU90_1_VB-ZoneMU90_2A-3" },
        { name: "TR91", className: "MU90_1_VB-ZoneMU90_2A-4" },
        { name: "2.900.1", className: "MU90_1_VB-ZoneMU90_2A-5" }
      ]
    }
  ],
  "MU90.R": [
    {
      id: 1,
      name: "MU90.R",
      className: "MU90_R",
      pdf: MU90RPdf,
      rooms: [
        { name: "90.RA", className: "MU90_1_VB-ZoneMU90_RA-1" },
        { name: "90.R.BW", className: "MU90_1_VB-ZoneMU90_R_BW-1" },
        { name: "90.R.BE", className: "MU90_1_VB-ZoneMU90_R_BE-1" }
      ]
    }
  ],

  "CP EGE": [
    {
      id: 1,
      name: "CP_EGE",
      className: "CP_EGE",
      pdf: CP_EGEPdf,
      rooms: [{ name: "CP EGE", className: "CP_EGE_Red_Zones-1" },]
    },
  ]
};

export const EXTERNAL_ZONE_MAPPING = [

  {
    id: 2,
    name: "CT Dark",
    className: "CT_Dark",
    pdf: CT_DarkPdf,
    floorName: "Area CT",
    rooms: [
      { name: "CT.E1", className: "CT_Dark_Red_Zones-1" },
      { name: "CT.E2", className: "CT_Dark_Red_Zones-2" },
      { name: "CT.S", className: "CT_Dark_Red_Zones-3" },
      { name: "CT.E", className: "CT_Dark_Red_Zones-4" },
      { name: "Cooling Tower", className: "CT_Dark_Cool_tower" }
    ]
  },
  {
    id: 3,
    name: "Area MA-I",
    className: "area-ma-1",
    pdf: MA_IPdf,
    floorName: "Area MA-I",
    rooms: [
      { name: "MA40.N1", className: "MA_I_Blue_Zones-1" },
      { name: "MA40.N2", className: "MA_I_Blue_Zones-2" },
      { name: "MA10.E", className: "MA_I_Blue_Zones-3" },
      { name: "MA40", className: "MA_I_Blue_Zones-4" },
      { name: "MA70.N", className: "MA_I_Blue_Zones-5" },
      { name: "MA11.N", className: "MA_I_Blue_Zones-6" },
      { name: "MA11", className: "MA_I_Blue_Zones-7" },
      { name: "MA10", className: "MA_I_Blue_Zones-8" },
      { name: "MA70", className: "MA_I_Blue_Zones-9" },
      { name: "MA11.S", className: "MA_I_Blue_Zones-10" },
      { name: "MA10.S", className: "MA_I_Blue_Zones-11" },
      { name: "MA70.S", className: "MA_I_Blue_Zones-12" }
    ]
  },
  {
    id: 4,
    name: "Area MA-II",
    className: "area-ma-2",
    pdf: MA_IIPdf,
    floorName: "Area MA-II",
    rooms: [
      { name: "MA50.N1", className: "MA_II_Red_Zones-1" },
      { name: "MA50.N2", className: "MA_II_Red_Zones-2" },
      { name: "MA50", className: "MA_II_Red_Zones-3" },
      { name: "MA80.N", className: "MA_II_Red_Zones-4" },
      { name: "MA80", className: "MA_II_Red_Zones-5" },
      { name: "MA20", className: "MA_II_Red_Zones-6" },
      { name: "MA80.S", className: "MA_II_Red_Zones-7" },
      { name: "MA20.S", className: "MA_II_Red_Zones-8" }
    ]
  },
  {
    id: 5,
    name: "Area MA-III",
    className: "area-ma-3",
    pdf: MA_IIIPdf,
    floorName: "Area MA-III",
    rooms: [
      { name: "MA60.N1", className: "MA_III_Yellow_Zones-1" },
      { name: "MA60.2", className: "MA_III_Yellow_Zones-2" },
      { name: "MA60.E1", className: "MA_III_Yellow_Zones-3" },
      { name: "MA60.E2", className: "MA_III_Yellow_Zones-4" },
      { name: "MA31.E", className: "MA_III_Yellow_Zones-5" },
      { name: "MA31.N", className: "MA_III_Yellow_Zones-6" },
      { name: "MA31", className: "MA_III_Yellow_Zones-7" },
      { name: "MA31.S", className: "MA_III_Yellow_Zones-8" },
      { name: "MA30.S", className: "MA_III_Yellow_Zones-9" },
      { name: "MA60", className: "MA_III_Yellow_Zones-10" },
      { name: "MA30", className: "MA_III_Yellow_Zones-11" }
    ]
  },
  {
    id: 6,
    name: "Area MB",
    className: "area-mb",
    pdf: MBPdf,
    floorName: "Area MB",
    rooms: [
      { name: "MX.N", className: "MB_LT_Blue_Zones-1" },
      { name: "MX", className: "MB_LT_Blue_Zones-2" },
      { name: "N2", className: "MB_LT_Blue_Zones-3" },
      { name: "Road MB North", className: "MB_LT_Blue_Zones-4" },
      { name: "MB.N", className: "MB_LT_Blue_Zones-5" },
      { name: "MB.N", className: "MB_LT_Blue_Zones-6" },
      { name: "MB.S", className: "MB_LT_Blue_Zones-7" },
      { name: "MB.W", className: "MB_LT_Blue_Zones-8" }
    ]
  },
  {
    id: 7,
    name: "Area MU",
    className: "area-mu",
    pdf: MUPdf,
    floorName: "Area MU",
    rooms: [
      { name: "MU.N", className: "MU90_Purple_Zones-1" },
      { name: "MU.E1", className: "MU90_Purple_Zones-2" },
      { name: "MU.W1", className: "MU90_Purple_Zones-3" },
      { name: "MU", className: "MU90_Purple_Zones-4" },
      { name: "MU.E2", className: "MU90_Purple_Zones-5" },
      { name: "MU.S", className: "MU90_Purple_Zones-6" },
      { name: "MU/W2", className: "MU90_Purple_Zones-7" }
    ]
  },
  {
    id: 8,
    name: "Area MT-MS",
    className: "area-mt-ms",
    pdf: MT_MSPdf,
    floorName: "Area MT-MS",
    rooms: [
      { name: "MS.TF.N", className: "MU91_Green_Zones-1" },
      { name: "MS.N", className: "MU91_Green_Zones-2" },
      { name: "MS.E", className: "MU91_Green_Zones-3" },
      { name: "MT.W", className: "MU91_Green_Zones-4" },
      { name: "MS.S", className: "MU91_Green_Zones-5" },
      { name: "MT.N", className: "MU91_Green_Zones-6" },
      { name: "MT.W", className: "MU91_Green_Zones-7" },
      { name: "MT", className: "MU91_Green_Zones-8" },
      { name: "MT.E", className: "MU91_Green_Zones-9" },
      { name: "MT.S", className: "MU91_Green_Zones-10" },
      { name: "MS.TF.S", className: "MU91_Green_Zones-11" },
      { name: "MS.TF.W", className: "MU91_Green_Zones-12" }
    ]
  },
  {
    id: 9,
    name: "Welfare",
    className: "Welfare_zones",
    pdf: WelfarePdf,
    floorName: "Welfare",
    rooms: [
      { name: "Parking Area", className: "Welfare_Grey_Zones-1" },
      { name: "4B", className: "Welfare_Grey_Zones-2" },
      { name: "4A", className: "Welfare_Grey_Zones-3" },
      { name: "2", className: "Welfare_Grey_Zones-4" },
      { name: "1+3", className: "Welfare_Grey_Zones-5" },
      { name: "5", className: "Welfare_Grey_Zones-6" },
      { name: "MAT 01", className: "Welfare_Grey_Zones-7" },
      { name: "MAT01.S", className: "Welfare_Grey_Zones-8" },
      { name: "Foodtruck", className: "Welfare_Grey_Zones-9" },
      { name: "MAT 02.W", className: "Welfare_Grey_Zones-10" },
      { name: "MAT 02", className: "Welfare_Grey_Zones-11" },
      { name: "MAT 03", className: "Welfare_Grey_Zones-12" },
      { name: "MAT 02.E", className: "Welfare_Grey_Zones-13" },
      { name: "MAT 02.S", className: "Welfare_Grey_Zones-14" }
    ]
  },
  {
    id: 10,
    name: "Roads",
    className: "Roads",
    pdf: RoadsPdf,
    floorName: "Roads",
    rooms: [
      { name: "Junction 24", className: "M3MA_Roads_Zones-1" },
      { name: "Road MS North", className: "M3MA_Roads_Zones-2" },
      { name: "Junction MS North", className: "M3MA_Roads_Zones-3" },
      { name: "Road MU North", className: "M3MA_Roads_Zones-4" },
      { name: "Junction MU North", className: "M3MA_Roads_Zones-5" },
      { name: "Road MX North", className: "M3MA_Roads_Zones-6" },
      { name: "Junction MX", className: "M3MA_Roads_Zones-7" },
      { name: "Road WF North", className: "M3MA_Roads_Zones-8" },
      { name: "Junction WF North", className: "M3MA_Roads_Zones-9" },
      { name: "Road MS East", className: "M3MA_Roads_Zones-10" },
      { name: "Road MT East", className: "M3MA_Roads_Zones-11" },
      { name: "Road MS West", className: "M3MA_Roads_Zones-12" },
      { name: "Road MX West", className: "M3MA_Roads_Zones-13" },
      { name: "Road MB North", className: "M3MA_Roads_Zones-14" },
      { name: "Road MX East", className: "M3MA_Roads_Zones-15" },
      { name: "Road MB West", className: "M3MA_Roads_Zones-16" },
      { name: "Road MB East", className: "M3MA_Roads_Zones-17" },
      { name: "Road WF East", className: "M3MA_Roads_Zones-18" },
      { name: "Junction TF", className: "M3MA_Roads_Zones-19" },
      { name: "Road MS South", className: "M3MA_Roads_Zones-20" },
      { name: "Junction MS South", className: "M3MA_Roads_Zones-21" },
      { name: "Road MU South", className: "M3MA_Roads_Zones-22" },
      { name: "Junction MU South", className: "M3MA_Roads_Zones-23" },
      { name: "Road MB South", className: "M3MA_Roads_Zones-24" },
      { name: "Junction MB", className: "M3MA_Roads_Zones-25" },
      { name: "Road MA North", className: "M3MA_Roads_Zones-26" },
      { name: "Junction MA", className: "M3MA_Roads_Zones-27" },
      { name: "Road MA East", className: "M3MA_Roads_Zones-28" },
      { name: "Junction 22", className: "M3MA_Roads_Zones-29" },
      { name: "Road 22", className: "M3MA_Roads_Zones-30" },
      { name: "Road MA South", className: "M3MA_Roads_Zones-31" },
      { name: "Junction 23", className: "M3MA_Roads_Zones-32" },
      { name: "Road MA West", className: "M3MA_Roads_Zones-33" }
    ]
  },
  {
    id: 11,
    name: "Laydown 20",
    className: "Laydown20",
    pdf: Laydown20Pdf,
    floorName: "Laydown20",
    rooms: [
      { name: "Laydown 20", className: "Laydown-20-1" }
    ]
  },
  {
    id: 12,
    name: "Laydown 30",
    className: "Laydown30",
    pdf: Laydown30Pdf,
    floorName: "Laydown30",
    rooms: [
      { name: "Laydown 30", className: "Laydown-30-1" }
    ]
  },
  {
    id: 13,
    name: "Laydown 40",
    className: "Laydown40",
    pdf: Laydown40Pdf,
    floorName: "Laydown40",
    rooms: [
      { name: "Laydown 40.1", className: "Laydown-40-1" },
      { name: "Laydown 40.2", className: "Laydown-40-2" },
      { name: "Laydown 40.3", className: "Laydown-40-3" },
      { name: "Laydown 40.4", className: "Laydown-40-4" },
      { name: "Laydown 40.5", className: "Laydown-40-5" },
      { name: "Laydown 40.6", className: "Laydown-40-6" },
      { name: "Laydown 40.7", className: "Laydown-40-7" },
      { name: "Laydown 40.8", className: "Laydown-40-8" },
      { name: "Laydown 40.9", className: "Laydown-40-9" },
      { name: "Laydown 40.10", className: "Laydown-40-10" },
      { name: "Laydown 40.11", className: "Laydown-40-11" },
      { name: "Laydown 40.12", className: "Laydown-40-12" },
      { name: "Laydown 40.13", className: "Laydown-40-13" }
    ]
  }
];