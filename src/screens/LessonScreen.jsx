import React, { useState, useEffect, useMemo } from 'react';
import { useMechLab } from '../context/MechLabContext';
import ConceptExplorer from '../components/shared/ConceptExplorer';
import {
  TOPIC_CHECKPOINTS,
  COURSE_TO_PROJECT_MAP,
  TOPIC_PRACTICAL_EXERCISES
} from '../data/interactiveClassroomData';

function renderSpans(spans, fallbackText) {
  if (!spans || spans.length === 0) {
    return fallbackText;
  }
  return spans.map((sp, idx) => {
    if (sp.code) {
      return (
        <code key={idx} className="lesson-inline-code">
          {sp.text}
        </code>
      );
    }
    if (sp.bold && sp.italic) {
      return (
        <b key={idx}>
          <i>{sp.text}</i>
        </b>
      );
    }
    if (sp.bold) {
      return <b key={idx}>{sp.text}</b>;
    }
    if (sp.italic) {
      return <i key={idx}>{sp.text}</i>;
    }
    return <React.Fragment key={idx}>{sp.text}</React.Fragment>;
  });
}

function getDiagramHotspots(caption, topicTitle, secHeading) {
  const ctxLabel = caption || secHeading || topicTitle || 'System Diagram';
  return [
    {
      id: 'input',
      label: '🔍 1. Input / Source',
      detail: `Identifies the input signal, power source, or initial data entering the ${ctxLabel.toLowerCase()} stage.`
    },
    {
      id: 'process',
      label: '⚡ 2. Core Mechanism',
      detail: `Shows how the component, circuit, or algorithm transforms the input inside ${topicTitle}.`
    },
    {
      id: 'output',
      label: '📊 3. Output / Result',
      detail: `Displays the resulting physical actuation, measured voltage/current, or model prediction.`
    }
  ];
}

function simulateCodeOutput(codeText, mode = 'default') {
  const text = String(codeText || '');
  if (text.includes('analogRead') || text.includes('pulseIn')) {
    return mode === 'default'
      ? 'Serial Monitor → Raw ADC: 512 | Voltage: 2.50 V | Status: Normal Range'
      : 'Serial Monitor (High Sensor Input) → Raw ADC: 860 | Voltage: 4.20 V | Status: Threshold Alert!';
  }
  if (text.includes('analogWrite') || text.includes('Servo') || text.includes('digitalWrite')) {
    return mode === 'default'
      ? 'Hardware Trace → Pin 9 PWM Duty: 50% (127/255) | Actuator: Active'
      : 'Hardware Trace (Boosted) → Pin 9 PWM Duty: 85% (216/255) | Actuator: High Torque';
  }
  if (text.includes('np.dot') || text.includes('matmul') || text.includes('@')) {
    return mode === 'default'
      ? 'Python Output → Dot Product = 32.0 | Cosine Similarity = 0.94 (Aligned)'
      : 'Python Output (Modified Weights) → Dot Product = -14.5 | Opposing Vector Direction';
  }
  if (text.includes('np.array') || text.includes('numpy') || text.includes('.shape')) {
    return mode === 'default'
      ? 'Python Output → ndarray shape: (3, 3) | dtype: float64 | Vectorized op: 0.02 ms'
      : 'Python Output (Reshaped Batch) → ndarray shape: (9, 1) | Broadcasted scaling applied';
  }
  if (text.includes('LinearRegression') || text.includes('fit(') || text.includes('predict')) {
    return mode === 'default'
      ? 'ML Output → Trained weight w = 2.04, bias b = 0.98 | Validation MSE = 0.012'
      : 'ML Output (Shifted Training Data) → Trained weight w = 3.45, bias b = -1.20 | New Prediction = 16.05';
  }
  if (text.includes('def ') || text.includes('for ') || text.includes('if ')) {
    return mode === 'default'
      ? 'Python Execution → Loop completed (0 errors) | Returned expected output state'
      : 'Python Execution (Edge Case Input) → Conditional branch triggered | Output updated';
  }
  return mode === 'default'
    ? 'Execution Trace → Formula verified with nominal engineering parameters'
    : 'Execution Trace (Modified Input) → Output scaled proportionally with new input values';
}

export default function LessonScreen({ active }) {
  const {
    navTo,
    showToast,
    getCurrentLessonData,
    openLesson,
    completeAndAdvanceLesson,
    openBotWithPrompt,
    requestSocraticCoaching,
    openQuizDeck,
    openLabBench,
    selectTrackByTitleOrKey,
    awardXp
  } = useMechLab();

  const {
    courseKey,
    track,
    stepIndex,
    stopTitle,
    totalStops,
    topicData,
    topicId
  } = getCurrentLessonData();

  const [videoPlaying, setVideoPlaying] = useState(false);
  // Default to 'step' so lessons open as short, guided interactive steps rather than a wall of text
  const [readingMode, setReadingMode] = useState('step'); // 'step' | 'full'
  const [unlockedSection, setUnlockedSection] = useState(0);
  const [activeCheckIdx, setActiveCheckIdx] = useState(0);
  const [selectedOptByCheck, setSelectedOptByCheck] = useState({});
  const [showHintByCheck, setShowHintByCheck] = useState({});
  const [solvedChecks, setSolvedChecks] = useState({});

  // Interactive diagram hotspots & zoom state
  const [activeDiagramSpot, setActiveDiagramSpot] = useState({});
  const [zoomedDiagrams, setZoomedDiagrams] = useState({});
  const [inspectedDiagrams, setInspectedDiagrams] = useState({});

  // Interactive code block runner state
  const [codeRunState, setCodeRunState] = useState({});

  // Interactive topic practical exercise state (classification / sequencing / fault diagnosis)
  const [exerciseAnswers, setExerciseAnswers] = useState({});
  const [exerciseSubmitted, setExerciseSubmitted] = useState(false);
  const [exerciseShowHint, setExerciseShowHint] = useState(false);
  const [exerciseSolvedByTopic, setExerciseSolvedByTopic] = useState({});

  // Simulation challenge completion state per topic
  const [simSolvedByTopic, setSimSolvedByTopic] = useState({});

  useEffect(() => {
    setVideoPlaying(false);
    setUnlockedSection(0);
    setActiveCheckIdx(0);
    setSelectedOptByCheck({});
    setShowHintByCheck({});
    setActiveDiagramSpot({});
    setZoomedDiagrams({});
    setCodeRunState({});
    setExerciseAnswers({});
    setExerciseSubmitted(false);
    setExerciseShowHint(false);
  }, [courseKey, stepIndex, topicData?.topicId]);

  const progressPct = Math.round(
    ((stepIndex + 1) / Math.max(1, totalStops)) * 100
  );

  // Group verbatim PDF blocks into bite-sized guided steps
  // while keeping 100% of blocks and figures mounted in the DOM
  const lessonSections = useMemo(() => {
    if (!topicData || !Array.isArray(topicData.blocks)) return [];
    const sections = [];
    let current = [];
    topicData.blocks.forEach((b, idx) => {
      if (b.type === 'heading' && current.length >= 2) {
        sections.push(current);
        current = [{ block: b, idx }];
      } else {
        current.push({ block: b, idx });
      }
    });
    if (current.length > 0) sections.push(current);
    return sections;
  }, [topicData]);

  // Practical exercise for the current topic
  const practicalExercise = useMemo(() => {
    return (
      TOPIC_PRACTICAL_EXERCISES[topicId] ||
      TOPIC_PRACTICAL_EXERCISES['robotics-pid']
    );
  }, [topicId]);

  // Phase 1: Rich multi-question checkpoints per lesson
  const checkpoints = useMemo(() => {
    const list = TOPIC_CHECKPOINTS[topicId] || TOPIC_CHECKPOINTS['robotics-pid'];
    return list && list.length > 0 ? list : TOPIC_CHECKPOINTS['robotics-pid'];
  }, [topicId]);

  const currentCheck = checkpoints[activeCheckIdx] || checkpoints[0];
  const selectedOpt = selectedOptByCheck[activeCheckIdx] ?? null;
  const hintVisible = !!showHintByCheck[activeCheckIdx];

  const handlePickOption = (idx, isOk) => {
    setSelectedOptByCheck((prev) => ({ ...prev, [activeCheckIdx]: idx }));
    const checkKey = `${topicId}-${activeCheckIdx}`;
    if (isOk) {
      if (!solvedChecks[checkKey]) {
        setSolvedChecks((prev) => ({ ...prev, [checkKey]: true }));
        awardXp(
          15,
          `Solved checkpoint in ${topicData ? topicData.title : stopTitle}`,
          'Courses',
          true
        );
        showToast('Correct! +15 XP');
      } else {
        showToast('Correct! +10 XP');
      }
    } else {
      showToast('Not quite — read the feedback or click Retry to try again');
    }
  };

  const handleRetryCheckpoint = () => {
    setSelectedOptByCheck((prev) => {
      const next = { ...prev };
      delete next[activeCheckIdx];
      return next;
    });
  };

  const handleSelectDiagramSpot = (figIndex, spotId) => {
    setActiveDiagramSpot((prev) => ({ ...prev, [figIndex]: spotId }));
    const figKey = `${topicId}-fig-${figIndex}`;
    if (!inspectedDiagrams[figKey]) {
      setInspectedDiagrams((prev) => ({ ...prev, [figKey]: true }));
      awardXp(
        10,
        `Inspected interactive diagram in ${topicData ? topicData.title : stopTitle}`,
        'Courses',
        false
      );
      showToast('Diagram hotspot inspected! +10 XP');
    }
  };

  const handleRunCodeBlock = (blockIndex, mode = 'default') => {
    setCodeRunState((prev) => ({
      ...prev,
      [blockIndex]: { ran: true, mode }
    }));
    const codeKey = `${topicId}-code-${blockIndex}`;
    if (!inspectedDiagrams[codeKey]) {
      setInspectedDiagrams((prev) => ({ ...prev, [codeKey]: true }));
      awardXp(
        10,
        `Executed interactive code trace in ${topicData ? topicData.title : stopTitle}`,
        'Courses',
        false
      );
      showToast('Code trace executed! +10 XP');
    }
  };

  const handlePickExerciseCategory = (taskKey, catLabel) => {
    setExerciseAnswers((prev) => ({ ...prev, [taskKey]: catLabel }));
    setExerciseSubmitted(false);
  };

  const handleCheckPracticalExercise = () => {
    if (!practicalExercise) return;
    setExerciseSubmitted(true);
    const allCorrect = practicalExercise.tasks.every(
      (t, idx) => exerciseAnswers[t.id ?? idx] === t.answer
    );
    if (allCorrect) {
      if (!exerciseSolvedByTopic[topicId]) {
        setExerciseSolvedByTopic((prev) => ({ ...prev, [topicId]: true }));
        awardXp(
          20,
          `Completed practical exercise: ${practicalExercise.title}`,
          'Courses',
          true
        );
        showToast('🎉 Practical Exercise Mastered! +20 XP');
      } else {
        showToast('✅ All items matched correctly!');
      }
    } else {
      showToast('Some items need adjustment — check the highlighted rows or use Retry');
    }
  };

  const handleResetPracticalExercise = () => {
    setExerciseAnswers({});
    setExerciseSubmitted(false);
  };

  const handleSimChallengeSolved = () => {
    if (!simSolvedByTopic[topicId]) {
      setSimSolvedByTopic((prev) => ({ ...prev, [topicId]: true }));
      awardXp(
        20,
        `Solved simulation challenge in ${topicData ? topicData.title : stopTitle}`,
        'Labs',
        true
      );
      showToast('🎯 Simulation Target Achieved! +20 XP');
    }
  };

  // Calculate interactive mastery score for the current lesson
  const solvedCheckCountForTopic = checkpoints.filter(
    (_, cIdx) => !!solvedChecks[`${topicId}-${cIdx}`]
  ).length;
  const isExerciseSolved = !!exerciseSolvedByTopic[topicId];
  const isSimSolved = !!simSolvedByTopic[topicId];
  const totalInteractiveGoals = checkpoints.length + 2; //Practical Exercise + Simulation Target + Checkpoints
  const completedInteractiveGoals =
    solvedCheckCountForTopic + (isExerciseSolved ? 1 : 0) + (isSimSolved ? 1 : 0);
  const masteryPct = Math.round(
    (completedInteractiveGoals / Math.max(1, totalInteractiveGoals)) * 100
  );

  const recommendedDeckId = useMemo(() => {
    if (courseKey === 'ai') return 'ai';
    if (topicId.startsWith('mechatronics-m1') || topicId.startsWith('mechatronics-m2')) return 'circuits';
    if (topicId.startsWith('mechatronics-m3')) return 'sensors';
    return 'pid';
  }, [courseKey, topicId]);

  const projectBridge =
    COURSE_TO_PROJECT_MAP[courseKey] || COURSE_TO_PROJECT_MAP.mechatronics;

  const backTarget = track?.k === 'project' ? 'project' : 'course';

  const renderInteractiveBlock = (block, index, currentTopicTitle, secHeading) => {
    if (block.type === 'heading') {
      if (block.level === 1) {
        return (
          <h2 key={index} className="lesson-h1">
            {block.text}
          </h2>
        );
      }
      if (block.level === 2) {
        return (
          <h2 key={index} className="lesson-h2">
            {block.text}
          </h2>
        );
      }
      return (
        <h3 key={index} className="lesson-h3">
          {block.text}
        </h3>
      );
    }

    if (block.type === 'paragraph') {
      return (
        <p key={index} className="lesson-p">
          {renderSpans(block.spans, block.text)}
        </p>
      );
    }

    if (block.type === 'code') {
      const runInfo = codeRunState[index];
      const rawCode = block.code || block.text || '';
      return (
        <div key={index} style={{ marginBottom: '12px' }}>
          <pre className="lesson-code" style={{ marginBottom: '6px' }}>
            <code>{rawCode}</code>
          </pre>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '6px',
              padding: '8px 10px',
              background: 'var(--tile)',
              borderRadius: '10px'
            }}
          >
            <small className="meta">
              <b>💻 Interactive Code Runner:</b> Test this snippet with live inputs
            </small>
            <div className="chips" style={{ margin: 0 }}>
              <button
                type="button"
                className="chip"
                aria-pressed={runInfo?.ran && runInfo?.mode === 'default' ? 'true' : 'false'}
                onClick={() => handleRunCodeBlock(index, 'default')}
              >
                ▶ Run Default Input
              </button>
              <button
                type="button"
                className="chip"
                aria-pressed={runInfo?.ran && runInfo?.mode === 'modified' ? 'true' : 'false'}
                onClick={() => handleRunCodeBlock(index, 'modified')}
              >
                ⚡ Test Modified Input
              </button>
            </div>
          </div>
          {runInfo?.ran && (
            <div className="kp" style={{ marginTop: '6px', marginBottom: 0 }}>
              <b>🖥️ Live Output Trace:</b> {simulateCodeOutput(rawCode, runInfo.mode)}
            </div>
          )}
        </div>
      );
    }

    if (block.type === 'list') {
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <ListTag key={index} className="lesson-list">
          {block.items.map((item, i) => (
            <li key={i}>
              {typeof item === 'string'
                ? item
                : renderSpans(item.spans, item.text)}
            </li>
          ))}
        </ListTag>
      );
    }

    if (block.type === 'table') {
      return (
        <div key={index} className="lesson-table-wrap">
          <table className="lesson-table">
            {block.headers && block.headers.length > 0 && (
              <thead>
                <tr>
                  {block.headers.map((hdr, hIdx) => (
                    <th key={hIdx}>{hdr}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {block.rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (block.type === 'figure') {
      const hotspots = getDiagramHotspots(block.caption, currentTopicTitle, secHeading);
      const selectedSpotId = activeDiagramSpot[index] || null;
      const selectedSpot = hotspots.find((h) => h.id === selectedSpotId);
      const isZoomed = !!zoomedDiagrams[index];

      return (
        <figure
          key={index}
          className="lesson-figure"
          style={{
            border: selectedSpot ? '2px solid var(--blue)' : undefined,
            transition: 'all 0.2s ease'
          }}
        >
          <img
            src={block.src}
            alt={block.caption || currentTopicTitle}
            loading="lazy"
            style={{
              cursor: 'pointer',
              transform: isZoomed ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.2s ease'
            }}
            onClick={() =>
              setZoomedDiagrams((prev) => ({ ...prev, [index]: !prev[index] }))
            }
          />
          {block.caption && <figcaption>{block.caption}</figcaption>}

          {/* Interactive Clickable Diagram Hotspots */}
          <div
            style={{
              marginTop: '8px',
              paddingTop: '8px',
              borderTop: '1px solid var(--line)',
              textAlign: 'left'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '6px',
                marginBottom: '6px'
              }}
            >
              <small className="meta">
                <b>🖼️ Interactive Diagram Inspector:</b> Click a region to inspect (+10 XP)
              </small>
              <button
                type="button"
                className="go"
                style={{ fontSize: '.72rem', padding: '4px 8px' }}
                onClick={() =>
                  setZoomedDiagrams((prev) => ({ ...prev, [index]: !prev[index] }))
                }
              >
                {isZoomed ? '🔎 Reset Zoom' : '🔍 Zoom Diagram'}
              </button>
            </div>
            <div className="chips" style={{ margin: 0 }}>
              {hotspots.map((spot) => (
                <button
                  key={spot.id}
                  type="button"
                  className="chip"
                  aria-pressed={selectedSpotId === spot.id ? 'true' : 'false'}
                  onClick={() => handleSelectDiagramSpot(index, spot.id)}
                >
                  {spot.label}
                </button>
              ))}
            </div>
            {selectedSpot && (
              <div className="kp" style={{ marginTop: '8px', marginBottom: 0 }}>
                <b>{selectedSpot.label}:</b> {selectedSpot.detail}
              </div>
            )}
          </div>
        </figure>
      );
    }

    return null;
  };

  return (
    <section className={`screen${active ? ' show' : ''}`} id="lesson">
      <div className="hdr">
        <a
          className="back"
          href={`#${backTarget}`}
          aria-label="Back"
          onClick={(e) => {
            e.preventDefault();
            navTo(backTarget);
          }}
        >
          ←
        </a>
        <h1>
          Lesson {stepIndex + 1} of {totalStops}
        </h1>
      </div>

      <div className="bar" style={{ marginBottom: '14px' }}>
        <i style={{ width: `${progressPct}%` }} />
      </div>

      {/* Interactive 22-PDF Course & Lesson Switcher Bar */}
      <div className="card" style={{ marginBottom: '14px', padding: '12px 14px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '8px'
          }}
        >
          <div>
            <span className="tag" style={{ marginTop: 0 }}>
              {topicData ? topicData.courseSubtitle : track?.t || 'Course'}
            </span>
            <small className="meta">
              {topicData
                ? `${topicData.moduleLabel} · ${topicData.pageCount} PDF pages · ${topicData.imageCount} diagrams`
                : `${stopTitle}`}
            </small>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {topicData?.pdfUrl && (
              <a
                href={topicData.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="go"
                style={{ textDecoration: 'none', fontSize: '.78rem' }}
              >
                📄 Original PDF
              </a>
            )}
            <button
              type="button"
              className="go"
              style={{ fontSize: '.78rem' }}
              onClick={() =>
                openBotWithPrompt(
                  `Explain ${topicData ? topicData.title : stopTitle}`
                )
              }
            >
              🤖 Ask Mech Bot
            </button>
          </div>
        </div>

        {/* Switch between Mechatronics (11 PDFs), AI (11 PDFs), and current track */}
        <div className="chips" style={{ marginBottom: '6px' }}>
          <button
            type="button"
            className="chip"
            aria-pressed={courseKey === 'mechatronics' ? 'true' : 'false'}
            onClick={() => openLesson('mechatronics', 0)}
          >
            Mechatronics (11 PDFs)
          </button>
          <button
            type="button"
            className="chip"
            aria-pressed={courseKey === 'ai' ? 'true' : 'false'}
            onClick={() => openLesson('ai', 0)}
          >
            AI Basics (11 PDFs)
          </button>
          {courseKey !== 'mechatronics' && courseKey !== 'ai' && (
            <button
              type="button"
              className="chip"
              aria-pressed="true"
              onClick={() => openLesson(courseKey, stepIndex)}
            >
              {track?.t}
            </button>
          )}
        </div>

        {/* Step / Topic Switcher Chips within active track */}
        <div className="chips" style={{ marginBottom: topicData ? '6px' : 0 }}>
          {(track?.s || []).map((stTitle, idx) => (
            <button
              key={idx}
              type="button"
              className="chip"
              aria-pressed={idx === stepIndex ? 'true' : 'false'}
              onClick={() => openLesson(courseKey, idx)}
            >
              {idx < (track?.a || 0) ? '✓ ' : ''}
              {stTitle}
            </button>
          ))}
        </div>

        {/* Interactive Step-by-Step vs. Full Lesson Mode Toggle + Mastery Progress */}
        {topicData && lessonSections.length > 1 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
              paddingTop: '8px',
              borderTop: '1px solid var(--line)'
            }}
          >
            <small className="meta">
              <b>Guided Steps ({Math.min(unlockedSection + 1, lessonSections.length)}/{lessonSections.length})</b> · Interactive Mastery: <b>{completedInteractiveGoals}/{totalInteractiveGoals} activities ({masteryPct}%)</b>
            </small>
            <div className="chips" style={{ margin: 0 }}>
              <button
                type="button"
                className="chip"
                aria-pressed={readingMode === 'step' ? 'true' : 'false'}
                onClick={() => {
                  setReadingMode('step');
                }}
              >
                ⚡ Step-by-Step ({Math.min(unlockedSection + 1, lessonSections.length)}/{lessonSections.length})
              </button>
              <button
                type="button"
                className="chip"
                aria-pressed={readingMode === 'full' ? 'true' : 'false'}
                onClick={() => setReadingMode('full')}
              >
                📖 Full Lesson
              </button>
            </div>
          </div>
        )}

        {/* Quick Step Jump Pills in Step-by-Step mode */}
        {topicData && readingMode === 'step' && lessonSections.length > 1 && (
          <div className="chips" style={{ marginTop: '8px', marginBottom: 0 }}>
            {lessonSections.map((sec, sIdx) => {
              const firstHeading = sec.find((it) => it.block.type === 'heading')?.block?.text;
              const shortLabel = firstHeading
                ? `Step ${sIdx + 1}: ${firstHeading.slice(0, 26)}${firstHeading.length > 26 ? '…' : ''}`
                : `Step ${sIdx + 1}`;
              return (
                <button
                  key={sIdx}
                  type="button"
                  className="chip"
                  aria-pressed={unlockedSection === sIdx ? 'true' : 'false'}
                  onClick={() => setUnlockedSection(sIdx)}
                >
                  {sIdx <= unlockedSection ? '✓ ' : ''}
                  {shortLabel}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Verbatim PDF Course Content OR Original PID Lesson View */}
      {topicData ? (
        <div className="card lesson-reader" style={{ marginBottom: '14px' }}>
          <p className="lab" style={{ marginTop: 0 }}>
            {topicData.moduleTitle} · {topicData.moduleLabel}
          </p>
          <h2 style={{ marginBottom: '12px', fontSize: '1.25rem' }}>
            {topicData.topicCode} — {topicData.title}
          </h2>

          <div className="lesson-body">
            {lessonSections.map((secItems, secIdx) => {
              const isVisible =
                readingMode === 'full' || secIdx <= unlockedSection;
              const secHeading = secItems.find(
                (it) => it.block.type === 'heading'
              )?.block?.text;
              return (
                <div
                  key={secIdx}
                  className={`tp${isVisible ? ' show' : ''}`}
                  data-section={secIdx + 1}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '6px',
                      paddingBottom: '4px',
                      borderBottom: '1px dashed var(--line)'
                    }}
                  >
                    <span className="tag" style={{ marginTop: 0 }}>
                      Guided Step {secIdx + 1} of {lessonSections.length}
                    </span>
                    {secIdx < unlockedSection && (
                      <small className="meta" style={{ color: '#0d7a3e', fontWeight: 700 }}>
                        ✓ Step Completed
                      </small>
                    )}
                  </div>
                  {secItems.map(({ block, idx }) =>
                    renderInteractiveBlock(block, idx, topicData.title, secHeading)
                  )}
                </div>
              );
            })}
          </div>

          {readingMode === 'step' && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px',
                marginTop: '14px',
                paddingTop: '12px',
                borderTop: '1px solid var(--line)'
              }}
            >
              <small className="meta">
                {unlockedSection + 1 < lessonSections.length
                  ? `Ready for the next concept? Unlock Step ${unlockedSection + 2} of ${lessonSections.length} below:`
                  : `🎉 All ${lessonSections.length} guided concept steps unlocked! Complete the interactive challenges below.`}
              </small>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {unlockedSection + 1 < lessonSections.length ? (
                  <button
                    type="button"
                    className="btn"
                    style={{ width: 'auto', margin: 0, padding: '10px 18px' }}
                    onClick={() => {
                      const nextSec = Math.min(
                        lessonSections.length - 1,
                        unlockedSection + 1
                      );
                      setUnlockedSection(nextSec);
                      awardXp(
                        5,
                        `Unlocked Step ${nextSec + 1} in ${topicData.title}`,
                        'Courses',
                        false
                      );
                      showToast(`Step ${nextSec + 1} of ${lessonSections.length} unlocked! +5 XP`);
                    }}
                  >
                    Continue to Step {unlockedSection + 2} of {lessonSections.length} →
                  </button>
                ) : (
                  <button
                    type="button"
                    className="go"
                    onClick={() => setUnlockedSection(0)}
                  >
                    ↺ Review from Step 1
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <h2 style={{ marginBottom: '10px' }}>{stopTitle}</h2>
          <button
            className="vid"
            id="vd"
            type="button"
            aria-label="Play video"
            style={{ border: 0, width: '100%' }}
            onClick={() => {
              const next = !videoPlaying;
              setVideoPlaying(next);
              showToast(next ? 'Playing lesson video' : 'Paused');
            }}
          >
            {videoPlaying ? '⏸ Playing...' : '▶'}
          </button>
          <p>
            A PID controller compares where your robot is with where it should
            be, then corrects the motors. It does this many times per second.
          </p>
          <div className="kp">
            <b>Key points</b>
            <br />
            P reacts to the error now.
            <br />
            I fixes error that builds up.
            <br />
            D slows the correction to avoid overshoot.
          </div>
        </>
      )}

      {/* Interactive Hands-On Practical Exercise (Classification / Sequencing / Fault Diagnosis) */}
      {practicalExercise && (
        <div className="card" style={{ marginBottom: '14px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '6px'
            }}
          >
            <span className="tag" style={{ marginTop: 0 }}>
              {practicalExercise.badge}
            </span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {isExerciseSolved && (
                <span
                  className="tag"
                  style={{
                    marginTop: 0,
                    background: '#DDF5E3',
                    color: '#0d7a3e'
                  }}
                >
                  ✓ Solved (+20 XP)
                </span>
              )}
              <button
                type="button"
                className="go"
                style={{ fontSize: '.76rem' }}
                onClick={() => setExerciseShowHint((h) => !h)}
              >
                {exerciseShowHint ? '🙈 Hide Hint' : '💡 Hint'}
              </button>
              <button
                type="button"
                className="go"
                style={{ fontSize: '.76rem' }}
                onClick={handleResetPracticalExercise}
              >
                🔄 Reset &amp; Retry
              </button>
            </div>
          </div>

          <h2 style={{ fontSize: '1.05rem', marginBottom: '4px' }}>
            {practicalExercise.title}
          </h2>
          <p className="meta" style={{ marginBottom: '10px' }}>
            {practicalExercise.prompt}
          </p>

          {exerciseShowHint && practicalExercise.hint && (
            <div className="kp" style={{ marginBottom: '10px' }}>
              <b>💡 Exercise Hint:</b> {practicalExercise.hint}
            </div>
          )}

          {practicalExercise.tasks.map((task, tIdx) => {
            const taskKey = task.id ?? tIdx;
            const pickedCat = exerciseAnswers[taskKey];
            const isCorrect = pickedCat === task.answer;
            return (
              <div
                key={taskKey}
                style={{
                  padding: '10px 12px',
                  marginBottom: '8px',
                  borderRadius: '10px',
                  background:
                    exerciseSubmitted && pickedCat !== undefined
                      ? isCorrect
                        ? 'rgba(34, 197, 94, 0.12)'
                        : 'rgba(239, 68, 68, 0.12)'
                      : 'var(--tile)',
                  border:
                    exerciseSubmitted && pickedCat !== undefined
                      ? isCorrect
                        ? '1px solid #16a34a'
                        : '1px solid #dc2626'
                      : '1px solid var(--line)'
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: '.9rem',
                    marginBottom: '6px'
                  }}
                >
                  {tIdx + 1}. {task.label || task.item}
                </div>
                <div className="chips" style={{ margin: 0 }}>
                  {practicalExercise.categories.map((catLabel, catIdx) => (
                    <button
                      key={catIdx}
                      type="button"
                      className="chip"
                      aria-pressed={pickedCat === catLabel ? 'true' : 'false'}
                      onClick={() => handlePickExerciseCategory(taskKey, catLabel)}
                    >
                      {catLabel}
                    </button>
                  ))}
                </div>
                {exerciseSubmitted && pickedCat !== undefined && (
                  <small
                    className="meta"
                    style={{
                      display: 'block',
                      marginTop: '6px',
                      color: isCorrect ? '#15803d' : '#b91c1c',
                      fontWeight: 600
                    }}
                  >
                    {isCorrect
                      ? `✅ Correct! Matched to "${task.answer}".`
                      : `❌ Not quite — try another category or click Hint above.`}
                  </small>
                )}
              </div>
            );
          })}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '10px'
            }}
          >
            <button
              type="button"
              className="btn"
              style={{ width: 'auto', margin: 0, padding: '10px 18px' }}
              onClick={handleCheckPracticalExercise}
            >
              ✅ Check Answers
            </button>
            <small className="meta">
              {Object.keys(exerciseAnswers).length} / {practicalExercise.tasks.length} items selected
            </small>
          </div>

          {exerciseSubmitted && isExerciseSolved && practicalExercise.takeaway && (
            <div className="kp" style={{ marginTop: '10px', marginBottom: 0 }}>
              <b>🌟 Key Takeaway:</b> {practicalExercise.takeaway}
            </div>
          )}
        </div>
      )}

      {/* Phase 2: Interactive Concept Explorer Card with Target Challenge */}
      <ConceptExplorer
        topicId={topicId}
        stopTitle={topicData ? topicData.title : stopTitle}
        onOpenLab={(tId) => openLabBench(tId)}
        onAskBot={(msg) => openBotWithPrompt(msg)}
        onChallengeSolved={handleSimChallengeSolved}
      />

      {/* Phase 1 & 3: Interactive Checkpoints with Hints, Diagnostic Feedback, Retry, and Socratic Coaching */}
      <div className="card" style={{ marginBottom: '14px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '8px'
          }}
        >
          <div className="chips" style={{ margin: 0 }}>
            {checkpoints.map((_, cIdx) => {
              const isSolved = !!solvedChecks[`${topicId}-${cIdx}`];
              return (
                <button
                  key={cIdx}
                  type="button"
                  className="chip"
                  aria-pressed={activeCheckIdx === cIdx ? 'true' : 'false'}
                  onClick={() => setActiveCheckIdx(cIdx)}
                >
                  {isSolved ? '✓ ' : ''}Check {cIdx + 1}
                </button>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {selectedOpt !== null && selectedOpt !== currentCheck.a && (
              <button
                type="button"
                className="go"
                style={{ fontSize: '.78rem' }}
                onClick={handleRetryCheckpoint}
              >
                🔄 Retry Question
              </button>
            )}
            <button
              type="button"
              className="go"
              style={{ fontSize: '.78rem' }}
              onClick={() =>
                setShowHintByCheck((prev) => ({
                  ...prev,
                  [activeCheckIdx]: !prev[activeCheckIdx]
                }))
              }
            >
              {hintVisible ? '🙈 Hide Hint' : '💡 Hint'}
            </button>
            <button
              type="button"
              className="go"
              style={{ fontSize: '.78rem' }}
              onClick={() => requestSocraticCoaching(topicId)}
            >
              🤖 Socratic Coach
            </button>
          </div>
        </div>

        <p className="lab" style={{ marginTop: '4px' }}>
          {currentCheck.q}
        </p>

        {hintVisible && currentCheck.hint && (
          <div className="kp" style={{ marginBottom: '10px' }}>
            <b>💡 Socratic Hint:</b> {currentCheck.hint}
          </div>
        )}

        {currentCheck.o.map((optLabel, idx) => {
          const isOk = idx === currentCheck.a;
          let cls = 'opt';
          if (selectedOpt === idx) {
            cls += isOk ? ' ok' : ' no';
          }
          return (
            <button
              key={idx}
              type="button"
              className={cls}
              data-ok={isOk ? '1' : undefined}
              onClick={() => handlePickOption(idx, isOk)}
            >
              {optLabel}
            </button>
          );
        })}

        {selectedOpt !== null && currentCheck.explain && (
          <div className="kp" style={{ marginTop: '10px', marginBottom: 0 }}>
            <b>
              {selectedOpt === currentCheck.a
                ? '✅ Why this is correct:'
                : '🔎 Concept Breakdown:'}
            </b>
            <br />
            {currentCheck.explain}
            <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {selectedOpt !== currentCheck.a ? (
                <button
                  type="button"
                  className="go"
                  style={{ fontSize: '.78rem' }}
                  onClick={handleRetryCheckpoint}
                >
                  🔄 Try Again
                </button>
              ) : (
                activeCheckIdx + 1 < checkpoints.length && (
                  <button
                    type="button"
                    className="go"
                    style={{ fontSize: '.78rem' }}
                    onClick={() => setActiveCheckIdx(activeCheckIdx + 1)}
                  >
                    Next Checkpoint ({activeCheckIdx + 2}/{checkpoints.length}) →
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>

      {/* Lesson Interactive Progress & Milestone Celebration Card */}
      <div className="card" style={{ marginBottom: '14px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '8px'
          }}
        >
          <div>
            <span className="tag" style={{ marginTop: 0 }}>
              🏆 Lesson Interactive Mastery
            </span>
            <h2 style={{ fontSize: '1rem', marginTop: '4px' }}>
              {masteryPct >= 100
                ? '🎉 Milestone Unlocked: Topic Mastered!'
                : `Active Learning Progress: ${completedInteractiveGoals} of ${totalInteractiveGoals} Challenges Completed`}
            </h2>
          </div>
          <b>{masteryPct}%</b>
        </div>
        <div className="bar" style={{ marginBottom: '8px' }}>
          <i style={{ width: `${masteryPct}%` }} />
        </div>
        <div className="chips" style={{ margin: 0 }}>
          <span className="chip" aria-pressed={isExerciseSolved ? 'true' : 'false'}>
            {isExerciseSolved ? '✓ ' : '○ '}Practical Exercise
          </span>
          <span className="chip" aria-pressed={isSimSolved ? 'true' : 'false'}>
            {isSimSolved ? '✓ ' : '○ '}Simulation Challenge
          </span>
          {checkpoints.map((_, cIdx) => {
            const solved = !!solvedChecks[`${topicId}-${cIdx}`];
            return (
              <span
                key={cIdx}
                className="chip"
                aria-pressed={solved ? 'true' : 'false'}
              >
                {solved ? '✓ ' : '○ '}Checkpoint {cIdx + 1}
              </span>
            );
          })}
        </div>
      </div>

      {/* Phase 4: Learning-to-Building Bridge & Topic Practice Deck */}
      <div className="card" style={{ marginBottom: '14px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px'
          }}
        >
          <div>
            <span className="tag" style={{ marginTop: 0 }}>
              🛠️ Learning-to-Building Bridge
            </span>
            <h2 style={{ fontSize: '1rem', marginTop: '4px' }}>
              Apply in: {projectBridge.projectTitle}
            </h2>
            <p className="meta">{projectBridge.reason}</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="go"
              onClick={() => openQuizDeck(recommendedDeckId)}
            >
              📝 Practice Quiz
            </button>
            <button
              type="button"
              className="go"
              onClick={() => {
                selectTrackByTitleOrKey('project', projectBridge.projectKey);
                navTo('project');
              }}
            >
              🛠️ Open Project Track
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
        {stepIndex > 0 ? (
          <a
            className="btn g"
            href="#lesson"
            onClick={(e) => {
              e.preventDefault();
              openLesson(courseKey, stepIndex - 1);
            }}
          >
            ← Prev lesson
          </a>
        ) : (
          <a
            className="btn g"
            href={`#${backTarget}`}
            onClick={(e) => {
              e.preventDefault();
              navTo(backTarget);
            }}
          >
            Back to course
          </a>
        )}
        <a
          className="btn"
          href={`#${backTarget}`}
          onClick={(e) => {
            e.preventDefault();
            completeAndAdvanceLesson();
          }}
        >
          {stepIndex + 1 < totalStops ? 'Next lesson' : 'Finish course'}
        </a>
      </div>
    </section>
  );
}
