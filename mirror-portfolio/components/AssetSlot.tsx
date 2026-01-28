import React from "react";

const PLACEHOLDER_URL = "ASSET_URL__REPLACE_ME";

type AssetSlotProps = {
  label: string;
  url: string;
  className?: string;
  height?: string;
};

export function AssetSlot({ label, url, className, height }: AssetSlotProps) {
  const isPlaceholder = !url || url === PLACEHOLDER_URL;
  const style = isPlaceholder
    ? undefined
    : { backgroundImage: `url(${url})`, backgroundSize: "cover", backgroundPosition: "center" };

  return (
    <div
      className={`asset-slot ${isPlaceholder ? "is-placeholder" : ""} ${className ?? ""}`}
      style={{ ...style, height: height ?? undefined }}
    >
      {isPlaceholder ? (
        <div className="asset-placeholder">
          <span>{label}</span>
          <span className="asset-url">{PLACEHOLDER_URL}</span>
        </div>
      ) : (
        <div className="asset-label">{label}</div>
      )}
    </div>
  );
}
