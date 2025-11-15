import React from "react";
import type { ConfirmDialogProps } from "./types";

/**
 * 确认对话框组件
 * 职责：显示确认弹框，支持自定义标题、消息、按钮文本
 */
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title = "确认操作",
  message,
  confirmText = "确认",
  cancelText = "取消",
  onConfirm,
  onCancel,
  icon,
}) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        {/* 图标 */}
        {icon && <div className="confirm-dialog-icon">{icon}</div>}

        {/* 标题 */}
        <h3 className="confirm-dialog-title">{title}</h3>

        {/* 消息 */}
        {message && <p className="confirm-dialog-message">{message}</p>}

        {/* 操作按钮 */}
        <div className="confirm-dialog-actions">
          <button className="confirm-dialog-btn cancel" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="confirm-dialog-btn confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
