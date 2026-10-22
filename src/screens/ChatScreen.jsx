import React, { useState } from 'react';
import { useMechLab } from '../context/MechLabContext';
import { ASSETS } from '../data/brandAssets';
import MechBotActionCard from '../components/shared/MechBotActionCard';

export default function ChatScreen({ active }) {
  const {
    navTo,
    chatTab,
    setChatTab,
    chatMessages,
    sendMechBotMessage,
    resetChat,
    selectTrackByTitleOrKey,
    getCurrentLessonData,
    chatHistory,
    loadChatHistorySession,
    handleSelectProjectMode,
    tracks,
    customCourses
  } = useMechLab();

  const [lessonHelpOpen, setLessonHelpOpen] = useState(false);

  const { topicData, stopTitle } = getCurrentLessonData();
  const activeLessonTitle = topicData
    ? `${topicData.topicCode}: ${topicData.title}`
    : stopTitle;

  const handleOpenCourse = (title) => {
    selectTrackByTitleOrKey('course', title);
    navTo('course');
  };

  // Real courses for "My courses" tab
  const enrolledCourses = [
    {
      key: 'mechatronics',
      title: 'Mechatronics',
      img: ASSETS.COURSE_ROBOTICS,
      track: tracks?.mechatronics,
      fallbackTotal: 11
    },
    {
      key: 'ai',
      title: 'Artificial Intelligence Basics',
      img: ASSETS.COURSE_AI,
      track: tracks?.ai,
      fallbackTotal: 11
    },
    ...(customCourses || []).map((cc) => ({
      key: cc.key,
      title: cc.title,
      track: tracks?.[cc.key],
      fallbackTotal: cc.stopsCount || 5
    }))
  ];

  return (
    <section className={`screen${active ? ' show' : ''}`} id="chat">
      {/* Top Header - Exactly as in the design reference */}
      <div className="hdr chat-header" style={{ marginBottom: '12px' }}>
        <a
          className="back"
          href="#dash"
          aria-label="Back to dashboard"
          onClick={(e) => {
            e.preventDefault();
            navTo('dash');
          }}
        >
          ←
        </a>
        <img
          src={ASSETS.BOT_AVATAR_HEADER}
          alt="Mech Bot"
          style={{ height: '38px', width: '38px', objectFit: 'contain' }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <b style={{ fontSize: '1.05rem', display: 'block', lineHeight: 1.2 }}>Mech Bot</b>
          <span className="on" style={{ margin: 0, fontSize: '.78rem', color: '#22c55e' }}>
            ● Online
          </span>
        </div>
        <button
          className="chip"
          id="newc"
          type="button"
          style={{ padding: '6px 14px', fontSize: '.86rem', borderRadius: '99px' }}
          onClick={() => {
            resetChat();
            setChatTab('chat');
          }}
        >
          + New
        </button>
      </div>

      {/* Pill Tabs: Chat (active solid blue), My courses, History */}
      <div className="chips chat-tabs" style={{ marginBottom: '14px', gap: '8px' }}>
        <button
          className="chip"
          type="button"
          data-tab="chat"
          aria-pressed={chatTab === 'chat' ? 'true' : 'false'}
          onClick={() => setChatTab('chat')}
        >
          Chat
        </button>
        <button
          className="chip"
          type="button"
          data-tab="courses"
          aria-pressed={chatTab === 'courses' ? 'true' : 'false'}
          onClick={() => setChatTab('courses')}
        >
          My courses
        </button>
        <button
          className="chip"
          type="button"
          data-tab="hist"
          aria-pressed={chatTab === 'hist' ? 'true' : 'false'}
          onClick={() => setChatTab('hist')}
        >
          History
        </button>
      </div>

      {/* TAB 1: LIVE CHAT */}
      <div className={`tp${chatTab === 'chat' ? ' show' : ''}`} id="t-chat">
        {/* Compact, non-intrusive Socratic Coach bar for current lesson */}
        <div className="card chat-lesson-bar" style={{ marginBottom: '12px', padding: '8px 12px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => setLessonHelpOpen(!lessonHelpOpen)}
          >
            <small className="meta" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📖</span>
              <span><b>Lesson Helper:</b> {activeLessonTitle}</span>
            </small>
            <span style={{ fontSize: '.75rem', color: 'var(--blue)', fontWeight: 600 }}>
              {lessonHelpOpen ? '▲ Hide' : '▼ Socratic Hints'}
            </span>
          </div>

          {lessonHelpOpen && (
            <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--line)' }}>
              <div className="chips" style={{ margin: 0, gap: '6px' }}>
                <button
                  type="button"
                  className="chip"
                  style={{ fontSize: '.76rem', padding: '4px 10px' }}
                  onClick={() =>
                    sendMechBotMessage(
                      `Give me a Tier 1 guiding question for ${activeLessonTitle}`,
                      1
                    )
                  }
                >
                  🤔 Tier 1: Guiding Question
                </button>
                <button
                  type="button"
                  className="chip"
                  style={{ fontSize: '.76rem', padding: '4px 10px' }}
                  onClick={() =>
                    sendMechBotMessage(
                      `Give me a Tier 2 concept clue for ${activeLessonTitle}`,
                      2
                    )
                  }
                >
                  💡 Tier 2: Concept Clue
                </button>
                <button
                  type="button"
                  className="chip"
                  style={{ fontSize: '.76rem', padding: '4px 10px' }}
                  onClick={() =>
                    sendMechBotMessage(
                      `Give me a Tier 3 step-by-step breakdown for ${activeLessonTitle}`,
                      3
                    )
                  }
                >
                  🔎 Tier 3: Step-by-Step
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Empty State Greeting & Quick Starters */}
        {chatMessages.length === 0 && (
          <div className="hello" id="hello" style={{ padding: '10px 0 16px' }}>
            <img className="hm" src={ASSETS.BOT_MASCOT} alt="" style={{ height: '72px' }} />
            <h2 className="hg" style={{ marginTop: '8px' }}>
              Hey <span className="nick">Mech Learner</span>
            </h2>
            <p className="hq" style={{ marginBottom: '14px' }}>What are you planning to build or learn today?</p>
            <button
              className="sgt"
              type="button"
              onClick={() => sendMechBotMessage('how to build a drone')}
            >
              <span>🚁</span>
              <b>How to build a drone</b>
              <i>›</i>
            </button>
            <button
              className="sgt"
              type="button"
              onClick={() => sendMechBotMessage('how to build an obstacle robot')}
            >
              <span>🤖</span>
              <b>How to build an obstacle robot</b>
              <i>›</i>
            </button>
            <button
              className="sgt"
              type="button"
              onClick={() => sendMechBotMessage('how to build an AI chatbot')}
            >
              <span>💬</span>
              <b>How to build an AI chatbot</b>
              <i>›</i>
            </button>
            <button
              className="sgt"
              type="button"
              onClick={() => sendMechBotMessage('I want to learn AI')}
            >
              <span>🧠</span>
              <b>I want to learn AI</b>
              <i>›</i>
            </button>
          </div>
        )}

        {/* Conversation Stream */}
        <div className="msgs" id="msgs">
          {chatMessages.map((msg) => {
            // User message bubble (solid blue, right aligned)
            if (msg.role === 'u') {
              return (
                <div key={msg.id} className="m u">
                  {msg.text}
                </div>
              );
            }

            // Bot typing state with thinking steps
            if (msg.typing) {
              return (
                <div key={msg.id} className="m b typ">
                  {msg.steps.map((stepText, idx) => {
                    const isDone = idx < msg.activeStep - 1;
                    const isCur = idx === msg.activeStep - 1;
                    if (idx >= msg.activeStep) return null;
                    return (
                      <div
                        key={idx}
                        className={`sl${isDone ? ' done' : ''}${isCur ? ' cur' : ''}`}
                      >
                        <span className="ck">{isDone ? '✓' : '✦'}</span>
                        <span>{stepText}</span>
                      </div>
                    );
                  })}
                </div>
              );
            }

            // Bot response bubble (dark card with text and optional interactive mode cards)
            return (
              <div key={msg.id} className="m b">
                <div style={{ whiteSpace: 'pre-line' }}>{msg.answer}</div>

                {/* Interactive Mode Cards (e.g. Learn Mode vs. Build Mode) */}
                {msg.cards && msg.cards.length > 0 && (
                  <div className="bot-cards-grid">
                    {msg.cards.map((c) => (
                      <MechBotActionCard
                        key={c.id}
                        icon={c.icon}
                        title={c.title}
                        subtitle={c.subtitle}
                        badge={c.badge}
                        onClick={() => handleSelectProjectMode(c.projectId, c.mode)}
                      />
                    ))}
                  </div>
                )}

                {/* Ordered step list if applicable */}
                {msg.list && (
                  <ol className="sl2" style={{ marginTop: '10px' }}>
                    {msg.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ol>
                )}

                {/* Action Link Button */}
                {msg.link && (
                  <a
                    className="mlink"
                    href={msg.link[1]}
                    onClick={(e) => {
                      e.preventDefault();
                      if (typeof msg.link[2] === 'function') {
                        msg.link[2]();
                      }
                      navTo(String(msg.link[1] || '#dash').replace(/^#/, ''));
                    }}
                  >
                    {msg.link[0]}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* TAB 2: MY COURSES */}
      <div
        className={`tp${chatTab === 'courses' ? ' show' : ''}`}
        id="t-courses"
      >
        <h2 style={{ marginBottom: '10px' }}>Courses in progress</h2>
        <div className="courses">
          {enrolledCourses.map((c) => {
            const tr = c.track;
            const completedCount = tr?.a ?? 0;
            const totalCount = tr?.s?.length || c.fallbackTotal;
            const pct = Math.min(100, Math.round((completedCount / totalCount) * 100));

            return (
              <div className="course" key={c.key}>
                <div className="ct">
                  {c.img ? (
                    <img src={c.img} alt={c.title} />
                  ) : (
                    <div
                      style={{
                        background: 'var(--tile)',
                        display: 'grid',
                        placeItems: 'center',
                        aspectRatio: '3/2',
                        fontSize: '2rem'
                      }}
                    >
                      🎓
                    </div>
                  )}
                </div>
                <div className="cb">
                  <h3>{c.title}</h3>
                  <div className="bar" style={{ marginTop: '8px' }}>
                    <i style={{ width: `${pct}%` }} />
                  </div>
                  <div className="cf">
                    <span className="meta">{completedCount} / {totalCount} lessons ({pct}%)</span>
                    <button
                      className="go"
                      type="button"
                      onClick={() => handleOpenCourse(c.title)}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <a
          className="btn g"
          href="#courses"
          style={{ marginTop: '14px' }}
          onClick={(e) => {
            e.preventDefault();
            navTo('courses');
          }}
        >
          Browse all courses
        </a>
      </div>

      {/* TAB 3: REAL CHAT HISTORY */}
      <div className={`tp${chatTab === 'hist' ? ' show' : ''}`} id="t-hist">
        <h2 style={{ marginBottom: '10px' }}>Previous conversations</h2>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {chatHistory && chatHistory.length > 0 ? (
            chatHistory.map((item) => (
              <button
                key={item.id}
                className="row hb"
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderBottom: '1px solid var(--line)',
                  cursor: 'pointer',
                  width: '100%',
                  background: 'none'
                }}
                onClick={() => loadChatHistorySession(item.id)}
              >
                <div className="ti" style={{ marginRight: '10px', fontSize: '1.1rem' }}>💬</div>
                <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
                  <b style={{ display: 'block', fontSize: '.9rem', color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.title}
                  </b>
                  <small style={{ color: 'var(--soft)' }}>{item.timeLabel || 'Recent'}</small>
                </div>
                <span className="go" style={{ padding: '4px 10px', fontSize: '.78rem', marginLeft: '8px' }}>
                  Open
                </span>
              </button>
            ))
          ) : (
            <p className="meta" style={{ padding: '16px', margin: 0, textAlign: 'center' }}>
              No previous conversations yet. Ask Mech Bot anything!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
