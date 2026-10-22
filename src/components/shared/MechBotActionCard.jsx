import React from 'react';

/**
 * Large clickable action cards displayed inside Mech Bot messages.
 * Matches the reference layout:
 * - Icon on the left (e.g. 🎓 Learn Mode, 🛠️ Build Mode)
 * - Bold title on top
 * - Subtitle description underneath
 */
export default function MechBotActionCard({
  icon = '🛠️',
  title,
  subtitle,
  onClick,
  active = false,
  badge = null
}) {
  return (
    <button
      type="button"
      className={`bot-mode-card${active ? ' active' : ''}`}
      onClick={onClick}
    >
      <div className="bot-mode-card-icon" aria-hidden="true">
        {icon}
      </div>
      <div className="bot-mode-card-body">
        <div className="bot-mode-card-title">
          {title}
          {badge && <span className="tag" style={{ marginLeft: '6px', fontSize: '.7rem' }}>{badge}</span>}
        </div>
        {subtitle && (
          <div className="bot-mode-card-sub">
            {subtitle}
          </div>
        )}
      </div>
    </button>
  );
}
