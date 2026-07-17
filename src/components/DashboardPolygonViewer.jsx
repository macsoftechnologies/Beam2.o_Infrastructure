import { useEffect, useState, useMemo } from "react";
import { Stage, Layer, Image as KonvaImage, Line, Text, Group } from "react-konva";
import useImage from "use-image";
import { renderPdf } from "../utils/pdfRenderer";

export default function DashboardPolygonViewer({
  pdf,
  rooms = [],
  width = 800,
  isZonesActive = true,
  roomsToReview = [],
}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [hoveredRoomName, setHoveredRoomName] = useState(null);
  // Raw PDF canvas dimensions (high-res)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const [image] = useImage(imageUrl);

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!pdf) return;
      try {
        // Render at a large base width for quality, then we scale down via CSS/Konva
        const canvas = await renderPdf(pdf, Math.max(width * 2, 1600));
        if (!mounted) return;

        setCanvasSize({ width: canvas.width, height: canvas.height });
        setImageUrl(canvas.toDataURL());
      } catch (err) {
        console.error("Error loading PDF in DashboardPolygonViewer:", err);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [pdf, width]);

  // Scale factor: fit the stage to the container width
  const scale = useMemo(() => {
    if (!canvasSize.width) return 1;
    return width / canvasSize.width;
  }, [canvasSize.width, width]);

  const stageWidth = canvasSize.width ? width : width;
  const stageHeight = canvasSize.height ? Math.round(canvasSize.height * scale) : 600;

  const getRoomColors = (roomName) => {
    const match = roomsToReview.find(
      (item) =>
        item.zone.toLowerCase().trim() === roomName.toLowerCase().trim() ||
        roomName.toLowerCase().trim().includes(item.zone.toLowerCase().trim()) ||
        item.zone.toLowerCase().trim().includes(roomName.toLowerCase().trim())
    );

    if (match) {
      if (match.clash) {
        return { fill: "rgba(239, 68, 68, 0.3)", stroke: "#ef4444" };
      }
      if (match.preOk > 0) {
        return { fill: "rgba(16, 185, 129, 0.3)", stroke: "#10b981" };
      }
    }

    return { fill: "rgba(59, 130, 246, 0.15)", stroke: "#3b82f6" };
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", width: "100%", overflow: "hidden" }}>
      {imageUrl ? (
        <Stage width={stageWidth} height={stageHeight} scaleX={scale} scaleY={scale}>
          {/* Layer 1: PDF Background */}
          <Layer listening={false}>
            {image && (
              <KonvaImage
                image={image}
                width={canvasSize.width}
                height={canvasSize.height}
              />
            )}
          </Layer>

          {/* Layer 2: Room Polygons & Labels */}
          <Layer>
            {isZonesActive &&
              rooms.map((room) => {
                if (!room.points || room.points.length === 0) return null;

                const isHovered = hoveredRoomName === room.name;
                const colors = getRoomColors(room.name);

                // Scale polygon coords to raw canvas space
                const scaleX = canvasSize.width / (room.pdfWidth || 1);
                const scaleY = canvasSize.height / (room.pdfHeight || 1);

                const scaledPoints = room.points.flatMap((p) => [
                  p.x * scaleX,
                  p.y * scaleY,
                ]);

                const cx = (room.points.reduce((s, p) => s + p.x, 0) / room.points.length) * scaleX;
                const cy = (room.points.reduce((s, p) => s + p.y, 0) / room.points.length) * scaleY;

                return (
                  <Group key={room.id || room.name}>
                    <Line
                      points={scaledPoints}
                      closed
                      fill={isHovered ? "rgba(250, 204, 21, 0.3)" : colors.fill}
                      stroke={isHovered ? "#facc15" : colors.stroke}
                      strokeWidth={isHovered ? 3 : 2}
                      onMouseEnter={() => {
                        document.body.style.cursor = "pointer";
                        setHoveredRoomName(room.name);
                      }}
                      onMouseLeave={() => {
                        document.body.style.cursor = "default";
                        setHoveredRoomName(null);
                      }}
                      hitStrokeWidth={10}
                    />
                    <Text
                      x={cx - 30}
                      y={cy - 10}
                      text={room.name}
                      fontSize={11}
                      fontStyle="bold"
                      fill="#ffffff"
                      shadowColor="black"
                      shadowBlur={4}
                      listening={false}
                    />
                  </Group>
                );
              })}
          </Layer>
        </Stage>
      ) : (
        <div style={{ padding: "20px", color: "#94a3b8" }}>Loading Floor Plan PDF...</div>
      )}
    </div>
  );
}
