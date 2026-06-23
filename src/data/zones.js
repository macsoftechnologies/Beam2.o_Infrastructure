import APMTerminalPdf from "../assets/drawings/m3Infrastructure/plans/APM-Terminal/APM-Terminal.pdf";
import BADDPdf from "../assets/drawings/m3Infrastructure/plans/BA-DD/BA.pdf";
import ECJCP1Pdf from "../assets/drawings/m3Infrastructure/plans/EC/EC-JCP1.pdf";
import EHLakeEastPdf from "../assets/drawings/m3Infrastructure/plans/EHLakeEast/EHLakeEast.pdf";
import EHLakeWestPdf from "../assets/drawings/m3Infrastructure/plans/EHLakeWest/EHLakeWest.pdf";
import HovvejEastPdf from "../assets/drawings/m3Infrastructure/plans/HovvejEast/HovvejEast.pdf";
import HovvejWestPdf from "../assets/drawings/m3Infrastructure/plans/HovvejWest/HovvejWest.pdf";
import NNEastPdf from "../assets/drawings/m3Infrastructure/plans/NN-East/NN-East.pdf";
import PHusPdf from "../assets/drawings/m3Infrastructure/plans/P-hus/P-hus.pdf";
import RendsborgParkPdf from "../assets/drawings/m3Infrastructure/plans/RendsborgPark/RendsborgPark.pdf";
import RendsborgTentPdf from "../assets/drawings/m3Infrastructure/plans/RendsborgPark/RendsborgTent.pdf";

export const ZONE_MAPPING = {
  "BA-DD Zone 1 - Zone 2": [
    {
      id: 1,
      name: "BA-DD Zones",
      className: "ba-zone-1",
      pdf: BADDPdf,
      rooms: [
        { name: "ZONE 1", className: "zone-1-1-ba" },
        { name: "ZONE 2", className: "zone-2-1-ba" },
      ],
    },
  ],

  "EC-JCP1 Zone 1 - Zone 2": [
    {
      id: 1,
      name: "EC-JCP1 Zones",
      className: "ec-zone-1",
      pdf: ECJCP1Pdf,
      rooms: [
        { name: "ZONE 1", className: "zone-1-1-ec" },
        { name: "ZONE 2", className: "zone-2-1-ec" },
      ],
    },
  ],

  "HovvejEast Zone 1 - Zone 2": [
    {
      id: 1,
      name: "HovvejEast Zones",
      className: "east-zone-1",
      pdf: HovvejEastPdf,
      rooms: [
        { name: "ZONE 1", className: "zone-1-1-east" },
        { name: "ZONE 2", className: "zone-2-1-east" },
      ],
    },
  ],

  "HovvejWest Zone 1 - Zone 2": [
    {
      id: 1,
      name: "HovvejWest Zones",
      className: "west-zone-1",
      pdf: HovvejWestPdf,
      rooms: [
        { name: "ZONE 1", className: "zone-1-1-west" },
        { name: "ZONE 2", className: "zone-2-1-west" },
      ],
    },
  ],

  "NN East Site-Plan": [
    {
      id: 1,
      name: "NN East Zones",
      className: "nn-east-zone-1",
      pdf: NNEastPdf,
      rooms: [
        { name: "M3 North Zone 3", className: "M3NorthZone3" },
        { name: "M3 South Zone 2", className: "M3SouthZone2" },
        { name: "M3 South Zone 3", className: "M3SouthZone3" },
        { name: "Parking area", className: "Parkingarea" },
        { name: "NON M3 AREA", className: "NONM3AREA" },
        { name: "Gate Entrance", className: "gate-entrance" },
        { name: "Gate Exit", className: "gate-exit" },
      ],
    },
  ],

  "P-hus Site-Plan": [
    {
      id: 1,
      name: "P-hus Zones",
      className: "P-hus-zone-1",
      pdf: PHusPdf,
      rooms: [
        { name: "Zone 1", className: "Zone-1-phus" },
        { name: "Zone 2", className: "Zone-2-phus" },
        { name: "Zone 3", className: "Zone-3-phus" },
        { name: "Zone 4", className: "Zone-4-phus" },
      ],
    },
  ],

  "Rendsborg Park": [
    {
      id: 1,
      name: "M3 North 2",
      className: "RendsborgPark-North-2",
      pdf: RendsborgParkPdf,
      rooms: [
        { name: "M3 North 2", className: "M3-North-area-2-1" },
        { name: "Tent 10", className: "M3-North-area-2-2" },
        { name: "Tent 15", className: "M3-North-area-2-3" },
        { name: "Tent 14", className: "M3-North-area-2-4" },
        { name: "Tent 11", className: "M3-North-area-2-5" },
        { name: "Tent 13", className: "M3-North-area-2-6" },
      ],
    },
    {
      id: 2,
      name: "M3 South 1",
      className: "RendsborgPark-South-1",
      pdf: RendsborgParkPdf,
      rooms: [
        { name: "M3 South 1", className: "M3-South-area-1" },
      ],
    },
    {
      id: 3,
      name: "M3 North 1",
      className: "RendsborgPark-North-1",
      pdf: RendsborgParkPdf,
      rooms: [
        { name: "M3 North 1", className: "M3-North-area-1-1" },
        { name: "Tent 9", className: "M3-North-area-1-2" },
        { name: "Tent 12", className: "M3-North-area-1-3" },
      ],
    },
    {
      id: 4,
      name: "Tscherning area",
      className: "RendsborgPark-Tscherning-area",
      pdf: RendsborgParkPdf,
      rooms: [
        { name: "Tscherning area", className: "RendsborgPark-Tscherning-area" },
      ],
    },
    {
      id: 5,
      name: "Office & Welfare cabin area",
      className: "Office-area",
      pdf: RendsborgParkPdf,
      rooms: [
        { name: "Office and Welfare cabin area", className: "Office-Welfare" },
        { name: "Tent 16", className: "Office-Welfare-1" },
      ],
    },
    {
      id: 6,
      name: "Rendsborg Parking 1",
      className: "RendsborgPark-parking-1",
      pdf: RendsborgParkPdf,
      rooms: [
        { name: "Rendsborg Parking 1", className: "Parking-1" },
      ],
    },
    {
      id: 7,
      name: "Rendsborg Parking 2",
      className: "RendsborgPark-parking-2",
      pdf: RendsborgParkPdf,
      rooms: [
        { name: "Rendsborg Parking 2", className: "Parking-2" },
      ],
    },
    {
      id: 8,
      name: "Rendsborg Parking 3",
      className: "RendsborgPark-parking-3",
      pdf: RendsborgParkPdf,
      rooms: [
        { name: "Rendsborg Parking 3", className: "Parking-3" },
      ],
    },
    {
      id: 9,
      name: "Rendsborg Tent",
      className: "RendsborgPark-tent",
      pdf: RendsborgTentPdf,
      rooms: [
        { name: "Tent 1", className: "Park-tent-1" },
        { name: "Tent 2", className: "Park-tent-2" },
        { name: "Tent 3", className: "Park-tent-3" },
        { name: "Tent 4", className: "Park-tent-4" },
        { name: "Tent 5", className: "Park-tent-5" },
        { name: "Tent 6", className: "Park-tent-6" },
        { name: "Tent 7", className: "Park-tent-7" },
        { name: "Tent 8", className: "Park-tent-8" },
      ],
    },
  ],

  "EH Lake East": [
    {
      id: 1,
      name: "EHLakeEast Zones",
      className: "EHLakeEast-1",
      pdf: EHLakeEastPdf,
      rooms: [
        { name: "Zone 1", className: "Zone-1-EHLakeEast" },
        { name: "Zone 2", className: "Zone-2-EHLakeEast" },
      ],
    },
  ],

  "EH Lake West": [
    {
      id: 1,
      name: "EHLakeWest Zones",
      className: "EHLakeWest-1",
      pdf: EHLakeWestPdf,
      rooms: [
        { name: "Zone 1", className: "Zone-1-EHLakeWest" },
        { name: "Zone 2", className: "Zone-2-EHLakeWest" },
        { name: "Zone 3", className: "Zone-3-EHLakeWest" },
      ],
    },
  ],

  "APM Terminal": [
    {
      id: 1,
      name: "APM Terminal Zones",
      className: "APM-Terminal-1",
      pdf: APMTerminalPdf,
      rooms: [
        { name: "M3 North", className: "APM-Terminal-1" },
        { name: "M3 South", className: "APM-Terminal-2" },
      ],
    },
  ],
};