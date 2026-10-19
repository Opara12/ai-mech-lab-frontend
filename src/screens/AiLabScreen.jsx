import React, { useState } from 'react';
import { useMechLab } from '../context/MechLabContext';
import ConceptExplorer from '../components/shared/ConceptExplorer';
import {
  AI_EXPLORER_TOPICS,
  MECHATRONICS_EXPLORER_TOPICS
} from '../data/conceptExplorerCatalog';

// Two clear learning areas, each backed by the 11 uploaded course PDFs.
const LEARNING_AREAS = {
  ai: {
    courseKey: 'ai',
    icon: '🧠',
    label: 'AI Concept Explorer',
    blurb: 'Learn AI ideas by predicting, experimenting, and checking your understanding.',
    topics: AI_EXPLORER_TOPICS
  },
  mechatronics: {
    courseKey: 'mechatronics',
    icon: '⚙️',
    label: 'Mechatronics Concept Explorer',
    blurb: 'Try circuits, sensors, and motors in a safe virtual model before touching real hardware.',
    topics: MECHATRONICS_EXPLORER_TOPICS
  }
};

// Experiment tiles whose underlying content is not yet backed by course PDFs.
// They remain in code (ExperimentScreen is preserved) but are hidden from the demo.
const EXPERIMENT_TILES = [
  { title: 'Hand-sign model', subtitle: 'Train a small classifier', icon: '🧠', demoReady: false },
  { title: 'Object detector', subtitle: 'Run vision on a camera', icon: '👁️', demoReady: false }
];

const areaForTopic = (topicId) =>
  typeof topicId === 'string' && topicId.startsWith('ai-') ? 'ai' : 'mechatronics';

export default function AiLabScreen({ active }) {
  const {
    navTo,
    setExperimentMeta,
    activeLabBench,
    setActiveLabBench,
    openBotWithPrompt,
    openLesson,
    tracks,
    awardXp,
    showToast
  } = useMechLab();
  const [sensorVal, setSensorVal] = useState(50);

  const areaKey = areaForTopic(activeLabBench);
  const area = LEARNING_AREAS[areaKey];
  const isKnownTopic = area.topics.some((t) => t.topicId === activeLabBench);
  const currentTopicId = isKnownTopic ? activeLabBench : area.topics[0].topicId;
  const currentTopic = area.topics.find((t) => t.topicId === currentTopicId);

  const switchArea = (key) => {
    if (key === areaKey && isKnownTopic) return;
    setActiveLabBench(LEARNING_AREAS[key].topics[0].topicId);
  };

  const openFullLesson = () => {
    const courseKey = area.courseKey;
    const slug = currentTopicId.slice(courseKey.length + 1);
    const idx = tracks?.[courseKey]?.topicSlugs?.indexOf(slug);
    openLesson(courseKey, typeof idx === 'number' && idx >= 0 ? idx : 0);
  };

  const statusText =
    sensorVal < 35
      ? 'Turn left'
      : sensorVal > 65
      ? 'Turn right'
      : 'Go straight';

  const handleOpenExperiment = (e, title, subtitle) => {
    e.preventDefault();
    setExperimentMeta({ title, subtitle });
    navTo('experiment');
  };

  return (
    <section className={`screen${active ? ' show' : ''}`} id="lab">
      <div className="hdr">
        <h1>Practice</h1>
      </div>
      <div className="chips">
        <button
          className="chip"
          type="button"
          aria-pressed="true"
          onClick={() => navTo('lab')}
        >
          AI Lab
        </button>
        <button
          className="chip"
          type="button"
          aria-pressed="false"
          onClick={() => navTo('quizzes')}
        >
          Quizzes
        </button>
        <button
          className="chip"
          type="button"
          aria-pressed="false"
          onClick={() => navTo('games')}
        >
          Games
        </button>
      </div>
      <div className="card" style={{ marginBottom: '12px' }}>
        <h2>Try it: line sensor</h2>
        <p className="meta">Move the slider like a sensor reading.</p>
        <input
          type="range"
          id="sl"
          min="0"
          max="100"
          value={sensorVal}
          aria-label="Sensor reading"
          onChange={(e) => setSensorVal(Number(e.target.value))}
        />
        <div className="out" id="out" role="status">
          {statusText}
        </div>
      </div>
      <div className="g2" style={{ marginBottom: '14px' }}>
        <a
          className="tile"
          href="#chat"
          onClick={(e) => {
            e.preventDefault();
            navTo('chat');
          }}
        >
          <i>🤖</i>
          <b>Ask Mech Bot</b>
          <br />
          Get help while you build
        </a>
        <a
          className="tile"
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            navTo('projects');
          }}
        >
          <i>🛠️</i>
          <b>Projects</b>
          <br />
          Build real machines
        </a>
        {EXPERIMENT_TILES.filter((tile) => tile.demoReady).map((tile) => (
          <a
            key={tile.title}
            className="tile"
            href="#experiment"
            onClick={(e) => handleOpenExperiment(e, tile.title, tile.subtitle)}
          >
            <i>{tile.icon}</i>
            <b>{tile.title}</b>
            <br />
            {tile.subtitle}
          </a>
        ))}
      </div>

      {/* Interactive Concept Explorer: two clear learning areas backed by course PDFs */}
      <div className="card" style={{ marginBottom: '12px' }}>
        <span className="tag" style={{ marginTop: 0 }}>
          🧪 Interactive Concept Explorer
        </span>
        <h2 style={{ fontSize: '1.05rem', marginTop: '4px' }}>
          Choose a learning area
        </h2>
        <div className="chips" role="tablist" aria-label="Learning areas" style={{ marginBottom: '10px' }}>
          {Object.entries(LEARNING_AREAS).map(([key, a]) => (
            <button
              key={key}
              type="button"
              role="tab"
              className="chip"
              aria-selected={areaKey === key ? 'true' : 'false'}
              aria-pressed={areaKey === key ? 'true' : 'false'}
              onClick={() => switchArea(key)}
            >
              {a.icon} {a.label} ({a.topics.length} topics)
            </button>
          ))}
        </div>
        <p className="meta" style={{ marginBottom: '8px' }}>
          {area.blurb} Pick a topic:
        </p>
        <div className="chips" aria-label={`${area.label} topics`} style={{ marginBottom: '10px' }}>
          {area.topics.map((t) => (
            <button
              key={t.topicId}
              type="button"
              className="chip"
              title={t.title}
              aria-pressed={currentTopicId === t.topicId ? 'true' : 'false'}
              onClick={() => setActiveLabBench(t.topicId)}
            >
              {t.shortLabel}
            </button>
          ))}
        </div>
        <p className="meta" style={{ marginBottom: '8px' }}>
          Now exploring: <b>{currentTopic?.title}</b>
        </p>
        <button type="button" className="btn g" onClick={openFullLesson}>
          📖 Open Full Topic Lesson
        </button>
      </div>

      <ConceptExplorer
        key={currentTopicId}
        topicId={currentTopicId}
        stopTitle={currentTopic?.title || area.label}
        onAskBot={(msg) => openBotWithPrompt(msg)}
        onChallengeSolved={() => {
          awardXp(20, `Solved simulation challenge on ${currentTopicId}`, 'Labs', true);
          showToast('🎯 Explorer Challenge Solved! +20 XP');
        }}
      />
    </section>
  );
}
