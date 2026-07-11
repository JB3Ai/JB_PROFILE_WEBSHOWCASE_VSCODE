import React from 'react'
import { StatusBadge } from '../primitives'

interface ExecutiveWindowProps {
  title: string
  icon?: string
  meta?: string
  statusLabel?: string
  statusVariant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral'
  onClose?: () => void
  children: React.ReactNode
}

export default function ExecutiveWindow({
  title,
  icon,
  meta,
  statusLabel,
  statusVariant = 'success',
  onClose,
  children
}: ExecutiveWindowProps) {
  return (
    <section className="os-window">
      <div className="os-window-header">
        <div className="os-window-header-main">
          <div className="os-window-controls" aria-hidden="true">
            <span className="os-window-dot close" />
            <span className="os-window-dot minimize" />
            <span className="os-window-dot maximize" />
          </div>

          <div className="os-window-title-group">
            {icon ? <span className="os-window-icon">{icon}</span> : null}
            <div className="min-w-0">
              <div className="os-window-title">{title}</div>
              {meta ? <div className="os-window-meta">{meta}</div> : null}
            </div>
          </div>
        </div>

        <div className="os-window-header-actions">
          {statusLabel ? <StatusBadge variant={statusVariant} size="sm">{statusLabel}</StatusBadge> : null}
          {onClose ? (
            <button type="button" onClick={onClose} className="os-window-close">
              Close
            </button>
          ) : null}
        </div>
      </div>

      <div className="os-window-body">{children}</div>
    </section>
  )
}
