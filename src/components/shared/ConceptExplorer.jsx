import React, { useState, useEffect } from 'react';
import { CONCEPT_EXPLORER_CATALOG } from '../../data/conceptExplorerCatalog';

// Deterministic per-question option order so the correct answer is not always first.
// Uses the original option indices, so answer checking is unchanged.
const optionOrder = (count, seedText) => {
  let h = 0;
  for (let i = 0; i < seedText.length; i += 1) h = (h * 31 + seedText.charCodeAt(i)) >>> 0;
  const shift = count > 0 ? h % count : 0;
  return Array.from({ length: count }, (_, i) => (i + shift) % count);
};

export default function ConceptExplorer({
  topicId,
  stopTitle,
  courseKey,
  onOpenLab,
  onAskBot,
  onChallengeSolved
}) {
  // Resolve the catalog entry for the current topic (defaulting to robotics-pid or mechatronics-m1-t1.1)
  const resolvedId =
    topicId && CONCEPT_EXPLORER_CATALOG[topicId]
      ? topicId
      : courseKey === 'ai'
      ? 'ai-m1-t1.1'
      : courseKey === 'mechatronics'
      ? 'mechatronics-m1-t1.1'
      : 'robotics-pid';

  const entry =
    CONCEPT_EXPLORER_CATALOG[resolvedId] ||
    CONCEPT_EXPLORER_CATALOG['mechatronics-m1-t1.1'];

  // Step 1 (Prediction) & Step 3 (Knowledge Check) interactive state
  const [predPicked, setPredPicked] = useState(null);
  const [predShowHint, setPredShowHint] = useState(false);
  const [kcPicked, setKcPicked] = useState(null);
  const [kcShowHint, setKcShowHint] = useState(false);
  const [showTerms, setShowTerms] = useState(true);

  // ===========================================================================
  // Simulation States for AI Concept Explorers (11 Topics)
  // ===========================================================================
  // ai-m1-t1.1: AI vs ML vs DL
  const [aiApproach, setAiApproach] = useState('rules'); // 'rules' | 'ml' | 'dl'
  const [trainingPhotos, setTrainingPhotos] = useState(500);

  // ai-m1-t1.2: Predictive Maintenance
  const [maintStrategy, setMaintStrategy] = useState('scheduled'); // 'reactive' | 'scheduled' | 'predictive'
  const [bearingVibration, setBearingVibration] = useState(2.5);

  // ai-m1-t1.3: Data Bias & Ethics
  const [dataBalancePct, setDataBalancePct] = useState(15); // 10% (skewed) to 50% (balanced)
  const [humanAuditOn, setHumanAuditOn] = useState(false);

  // ai-m2-t2.1: Python Variables, Loops & Functions
  const [pyCelsius, setPyCelsius] = useState(20);
  const [pyRunBatchLoop, setPyRunBatchLoop] = useState(false);

  // ai-m2-t2.2: NumPy Array Operations
  const [npOffset, setNpOffset] = useState(0);
  const [npConvertF, setNpConvertF] = useState(false);

  // ai-m3-t3.1: Linear Algebra Vectors & Matrix Shapes
  const [matACols, setMatACols] = useState(3);
  const [matBRows, setMatBRows] = useState(4);

  // ai-m3-t3.2: Probability, Mean & Standard Deviation
  const [sixthReading, setSixthReading] = useState(200);

  // ai-m4-t4.1: Supervised vs Unsupervised
  const [learnMode, setLearnMode] = useState('supervised'); // 'supervised' | 'unsupervised'
  const [houseSqft, setHouseSqft] = useState(1400);
  const [houseBeds, setHouseBeds] = useState(3);

  // ai-m4-t4.2: Regression (Motor Load vs Temp)
  const [regSlope, setRegSlope] = useState(0.25);
  const [regIntercept, setRegIntercept] = useState(30.0);

  // ai-m4-t4.3: Classification (Bearing Healthy vs Worn)
  const [clsVib, setClsVib] = useState(2.2);
  const [clsTemp, setClsTemp] = useState(55);

  // ai-m4-t4.4: Capstone Dual Model
  const [capRuntime, setCapRuntime] = useState(200);
  const [capLoad, setCapLoad] = useState(60);
  const [capVib, setCapVib] = useState(2.5);

  // ===========================================================================
  // Simulation States for Mechatronics Concept Explorers (11 Topics + PID)
  // ===========================================================================
  // mechatronics-m1-t1.1: 4 Pillars & Automatic Gate
  const [pillars, setPillars] = useState({
    mechanical: true,
    electrical: true,
    software: true,
    control: false
  });
  const [carDistanceM, setCarDistanceM] = useState(4.0);

  // mechatronics-m1-t1.2: Elevator & Drone Closed-Loop Feedback
  const [loopType, setLoopType] = useState('open'); // 'open' | 'closed'
  const [passengerCount, setPassengerCount] = useState(8);

  // mechatronics-m1-t1.3: 6-Step Design Process (Conveyor Stopper)
  const [triggerDistCm, setTriggerDistCm] = useState(12);
  const [beltSpeedCms, setBeltSpeedCms] = useState(30);

  // mechatronics-m2-t2.1: Ohm's Law & Sizing LED Resistor
  const [voltage, setVoltage] = useState(5.0);
  const [resistance, setResistance] = useState(300);

  // mechatronics-m2-t2.2: Series vs Parallel Circuits
  const [circuitMode, setCircuitMode] = useState('series'); // 'series' | 'parallel'
  const [r1, setR1] = useState(200);
  const [r2, setR2] = useState(200);
  const [part1Disconnected, setPart1Disconnected] = useState(false);

  // mechatronics-m2-t2.3: Essential Components
  const [diodeForward, setDiodeForward] = useState(false);
  const [transistorOn, setTransistorOn] = useState(true);
  const [capUf, setCapUf] = useState(100);

  // mechatronics-m2-t2.4: Datasheets & Multimeter Probing
  const [motorLoadPct, setMotorLoadPct] = useState(20); // 0% (250mA) to 100% stall (1200mA)
  const [transistorRatingMa, setTransistorRatingMa] = useState(800); // 800 or 2000
  const [dmmMode, setDmmMode] = useState('voltage'); // 'voltage' | 'current'

  // mechatronics-m3-t3.1: Analog vs Digital & 10-Bit ADC
  const [roomTempC, setRoomTempC] = useState(25.0);

  // mechatronics-m3-t3.2: Common Sensor Types (Thermistor Divider & Ultrasonic)
  const [sensorFamilyMode, setSensorFamilyMode] = useState('thermistor'); // 'thermistor' | 'ultrasonic'
  const [thermistorOhms, setThermistorOhms] = useState(20000);
  const [echoUs, setEchoUs] = useState(1500);

  // mechatronics-m3-t3.3: 4-Step Sensor Reading & 16-Sample Averaging
  const [avgSampleCount, setAvgSampleCount] = useState(1);
  const [noiseLevelPct, setNoiseLevelPct] = useState(50);

  // mechatronics-m4-t4.1: Actuators, Drive Chain & Cooling Fan
  const [driverConnected, setDriverConnected] = useState(false);
  const [boxTempC, setBoxTempC] = useState(26);
  const [pwmDuty, setPwmDuty] = useState(50);

  // robotics-pid: PID Controller
  const [kp, setKp] = useState(80);
  const [ki, setKi] = useState(5);
  const [kd, setKd] = useState(10);

  // Track solved simulation challenges per topic
  const [solvedMap, setSolvedMap] = useState({});

  const resetCurrentExplorer = () => {
    setPredPicked(null);
    setPredShowHint(false);
    setKcPicked(null);
    setKcShowHint(false);

    setAiApproach('rules');
    setTrainingPhotos(500);
    setMaintStrategy('scheduled');
    setBearingVibration(2.5);
    setDataBalancePct(15);
    setHumanAuditOn(false);
    setPyCelsius(20);
    setPyRunBatchLoop(false);
    setNpOffset(0);
    setNpConvertF(false);
    setMatACols(3);
    setMatBRows(4);
    setSixthReading(200);
    setLearnMode('supervised');
    setHouseSqft(1400);
    setHouseBeds(3);
    setRegSlope(0.25);
    setRegIntercept(30.0);
    setClsVib(2.2);
    setClsTemp(55);
    setCapRuntime(200);
    setCapLoad(60);
    setCapVib(2.5);

    setPillars({ mechanical: true, electrical: true, software: true, control: false });
    setCarDistanceM(4.0);
    setLoopType('open');
    setPassengerCount(8);
    setTriggerDistCm(12);
    setBeltSpeedCms(30);
    setVoltage(5.0);
    setResistance(300);
    setCircuitMode('series');
    setR1(200);
    setR2(200);
    setPart1Disconnected(false);
    setDiodeForward(false);
    setTransistorOn(true);
    setCapUf(100);
    setMotorLoadPct(20);
    setTransistorRatingMa(800);
    setDmmMode('voltage');
    setRoomTempC(25.0);
    setSensorFamilyMode('thermistor');
    setThermistorOhms(10000);
    setEchoUs(1500);
    setAvgSampleCount(1);
    setNoiseLevelPct(50);
    setDriverConnected(false);
    setBoxTempC(26);
    setPwmDuty(50);
    setKp(80);
    setKi(5);
    setKd(10);
  };

  useEffect(() => {
    setPredPicked(null);
    setPredShowHint(false);
    setKcPicked(null);
    setKcShowHint(false);
  }, [resolvedId]);

  // ===========================================================================
  // Evaluate Target Simulation Challenge & Live Results per Topic
  // ===========================================================================
  const simResult = (() => {
    switch (resolvedId) {
      case 'ai-m1-t1.1': {
        const acc =
          aiApproach === 'rules'
            ? 48
            : aiApproach === 'ml'
            ? Math.min(84, Math.round(55 + trainingPhotos * 0.006))
            : Math.min(97, Math.round(62 + trainingPhotos * 0.0085));
        const done = aiApproach === 'dl' && trainingPhotos >= 3000;
        return {
          goal: 'Switch to "Deep Learning (Neural Network)" and slide Training Photos to at least 3,000 so the model learns to recognize angled/shadowed cats (≥88% accuracy).',
          done,
          successMsg: `Target achieved! With ${trainingPhotos.toLocaleString()} photos, the Deep Learning neural network reaches ${acc}% accuracy by learning visual features automatically.`,
          whatHappened: `Approach: ${
            aiApproach === 'rules'
              ? 'Rule-Based (Hand-Written Rules)'
              : aiApproach === 'ml'
              ? 'Classical Machine Learning'
              : 'Deep Learning (Multi-Layer Neural Network)'
          } · Training Data: ${trainingPhotos.toLocaleString()} photos → Test Accuracy on Tricky Cat Photos: ${acc}%`,
          whyHappened:
            aiApproach === 'rules'
              ? 'Notice that adding more photos does NOT improve Rule-Based AI (stuck at 48%) because it only follows fixed human rules and ignores training data!'
              : aiApproach === 'ml'
              ? 'Classical ML improves as you add examples, but plateaus around 84% on raw images because it relies on simpler surface patterns.'
              : 'Deep Learning passes raw pixels through hidden layers (edges → shapes → cat features), climbing to high accuracy as you feed it thousands of examples.'
        };
      }

      case 'ai-m1-t1.2': {
        const isWorn = bearingVibration >= 4.5;
        const isBroken = bearingVibration >= 7.5;
        const done = maintStrategy === 'predictive' && bearingVibration >= 4.5 && bearingVibration < 7.5;
        let outcome = '';
        if (maintStrategy === 'reactive') {
          outcome = isBroken
            ? '💥 Emergency Breakdown! Line stopped for 12 hours.'
            : '⏳ Running blindly until something breaks...';
        } else if (maintStrategy === 'scheduled') {
          outcome = isBroken
            ? '💥 Bearing failed BEFORE the monthly calendar service date!'
            : bearingVibration < 2.5
            ? '💸 Replaced a healthy bearing on calendar day—wasted part!'
            : '📅 Waiting for fixed calendar date...';
        } else {
          outcome = isWorn
            ? '✅ AI Alert Triggered Early! Bearing serviced during a 20-minute planned pause.'
            : '🟢 AI monitoring vibration & temp streams: Bearing healthy.';
        }
        return {
          goal: 'Select "AI Predictive Maintenance" and slide Bearing Vibration between 4.5 and 7.0 mm/s to catch early wear before a breakdown!',
          done,
          successMsg: `Target achieved! At ${bearingVibration.toFixed(1)} mm/s vibration, Predictive Maintenance flags early bearing wear before catastrophic failure.`,
          whatHappened: `Strategy: ${maintStrategy.toUpperCase()} · Live Vibration: ${bearingVibration.toFixed(1)} mm/s → ${outcome}`,
          whyHappened:
            maintStrategy === 'predictive'
              ? 'Predictive Maintenance compares live vibration and temperature streams against learned failure patterns, alerting engineers as soon as abnormal wear starts.'
              : 'Reactive waits for a costly crash, while Scheduled maintenance follows a blind calendar that either wastes healthy parts or misses sudden wear.'
        };
      }

      case 'ai-m1-t1.3': {
        const fairnessScore = Math.min(
          100,
          Math.round(dataBalancePct * 1.6 + (humanAuditOn ? 20 : 0))
        );
        const done = dataBalancePct >= 45 && humanAuditOn;
        return {
          goal: 'Slide Training Data Balance to at least 45% (even representation) AND turn ON "Human Expert Audit" to achieve ≥92% model fairness.',
          done,
          successMsg: `Target achieved! Balanced training data (${dataBalancePct}%) + Human Audit reaches a ${fairnessScore}% fairness & reliability score.`,
          whatHappened: `Under-Represented Group in Training Data: ${dataBalancePct}% · Human Audit: ${
            humanAuditOn ? 'ON' : 'OFF'
          } → Model Reliability Across All Groups: ${fairnessScore}%`,
          whyHappened:
            dataBalancePct < 35
              ? 'Because the training data is heavily skewed toward one group, the model learns that lopsided pattern and makes unfair errors on under-represented cases.'
              : 'Balancing the training examples and keeping a human reviewer in the loop prevents historical skew from turning into automated bias.'
        };
      }

      case 'ai-m2-t2.1': {
        const fahr = (pyCelsius * 9) / 5 + 32;
        const sampleList = [42, 45, 41, 50, 47];
        const convertedList = sampleList.map((c) => ((c * 9) / 5 + 32).toFixed(1));
        const done = pyCelsius === 25 && pyRunBatchLoop;
        return {
          goal: 'Slide Input Variable celsius to 25°C AND turn ON "Run for-loop on 5 Sensor Readings" to execute both the function and loop!',
          done,
          successMsg:
            'Target achieved! convert_to_fahrenheit(25) returned 77.0°F and the for-loop converted all 5 sensor readings automatically.',
          whatHappened: `Variable celsius = ${pyCelsius}°C → Function returns ${fahr.toFixed(1)}°F${
            pyRunBatchLoop
              ? ` | Loop over [42, 45, 41, 50, 47]°C → [${convertedList.join(', ')}]°F`
              : ''
          }`,
          whyHappened:
            'The variable stores the input number, the function convert_to_fahrenheit(celsius) runs (celsius * 9/5) + 32, and the for-loop repeats that function across every item in the list without duplicating code.'
        };
      }

      case 'ai-m2-t2.2': {
        const baseArr = [20, 22, 19, 25];
        const calibrated = baseArr.map((v) => v + npOffset);
        const finalArr = npConvertF
          ? calibrated.map((c) => Number(((c * 9) / 5 + 32).toFixed(1)))
          : calibrated;
        const meanVal = (
          finalArr.reduce((a, b) => a + b, 0) / finalArr.length
        ).toFixed(1);
        const minVal = Math.min(...finalArr).toFixed(1);
        const maxVal = Math.max(...finalArr).toFixed(1);
        const done = npConvertF && npOffset === 0;
        return {
          goal: 'Set Calibration Offset to 0°C and click "Apply (readings * 9/5) + 32" to convert the entire NumPy array [20, 22, 19, 25]°C to Fahrenheit at once!',
          done,
          successMsg: `Target achieved! NumPy converted all 4 numbers simultaneously to [${finalArr.join(', ')}]°F with .mean() = ${meanVal}°F.`,
          whatHappened: `np.array([${finalArr.join(', ')}]) ${
            npConvertF ? '°F' : '°C'
          } · .shape = (4,) · .mean() = ${meanVal} · .min() = ${minVal} · .max() = ${maxVal}`,
          whyHappened:
            'Unlike a regular Python list that requires a loop, a NumPy array applies your math formula to every element simultaneously in one step.'
        };
      }

      case 'ai-m3-t3.1': {
        const matches = matACols === matBRows;
        const done = matACols === 4 && matBRows === 4;
        return {
          goal: 'Set Matrix A Columns to 4 and Matrix B Rows to 4 so their inner dimensions match: (3, 4) × (4, 2) → (3, 2).',
          done,
          successMsg:
            'Target achieved! Inner dimensions match (4 == 4), so np.dot(matrix_a, matrix_b) succeeds and outputs a (3, 2) matrix.',
          whatHappened: matches
            ? `✅ Shape Match! Matrix A (3, ${matACols}) × Matrix B (${matBRows}, 2) → Output Matrix Shape = (3, 2)`
            : `❌ Shape Error! Cannot multiply Matrix A (3, ${matACols}) by Matrix B (${matBRows}, 2) because ${matACols} ≠ ${matBRows}.`,
          whyHappened: matches
            ? `Because each of the 3 rows in Matrix A has ${matACols} numbers, and each column in Matrix B also has ${matBRows} numbers, their products pair up cleanly.`
            : `In matrix multiplication, the columns of the first matrix (${matACols}) must equal the rows of the second matrix (${matBRows}). Adjust the sliders so both equal 4!`
        };
      }

      case 'ai-m3-t3.2': {
        const arr = [42, 45, 41, 50, 47, sixthReading];
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const std = Math.sqrt(
          arr.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / arr.length
        );
        const done = sixthReading >= 42 && sixthReading <= 48;
        return {
          goal: 'The 6th reading is currently a spike at 200! Slide the 6th Sensor Reading down between 42 and 48 to see Standard Deviation (.std()) drop below 3.5.',
          done,
          successMsg: `Target achieved! With the 6th reading at ${sixthReading}, data.std() dropped to ${std.toFixed(2)} (tight, consistent sensor data).`,
          whatHappened: `Dataset: [42, 45, 41, 50, 47, ${sixthReading}] → Average data.mean() = ${mean.toFixed(1)} · Spread data.std() = ${std.toFixed(2)}`,
          whyHappened:
            sixthReading > 80
              ? `That single outlier (${sixthReading}) pulls the average up to ${mean.toFixed(1)} and inflates Standard Deviation to ${std.toFixed(1)}—warning you to inspect the sensor before training a model!`
              : `All 6 readings now sit close together near ${mean.toFixed(1)}, resulting in a low Standard Deviation (${std.toFixed(2)}) that indicates clean, consistent measurements.`
        };
      }

      case 'ai-m4-t4.1': {
        const predPrice = Math.round(55000 + houseSqft * 115 + houseBeds * 12000);
        const done = learnMode === 'supervised' && houseSqft === 1600 && houseBeds === 3;
        return {
          goal: 'In "Supervised Learning (Labeled)" mode, set House Size to 1,600 sq ft and Bedrooms to 3 to reproduce the Topic 4.1 example (~$275,000)!',
          done,
          successMsg: `Target achieved! With features [1600 sq ft, 3 bedrooms], the supervised model predicts $${predPrice.toLocaleString()}.`,
          whatHappened:
            learnMode === 'supervised'
              ? `Supervised Mode (Uses Labeled Sales Data): Features [${houseSqft} sq ft, ${houseBeds} bedrooms] → Predicted Label = $${predPrice.toLocaleString()}`
              : 'Unsupervised Mode (No Labels): Grouped 500 unlabeled machine sensor logs into 3 natural clusters + flagged 2 unusual outlier readings.',
          whyHappened:
            learnMode === 'supervised'
              ? 'Because past house sales included known prices (labels), the model learned how much each square foot and bedroom adds to the price.'
              : 'When no failure labels exist, Unsupervised Learning groups similar sensor readings together so you can spot readings that drift away from normal clusters.'
        };
      }

      case 'ai-m4-t4.2': {
        const pts = [
          [20, 35],
          [40, 42],
          [60, 51],
          [80, 58],
          [100, 67]
        ];
        const avgAbsErr =
          pts.reduce(
            (acc, [x, y]) => acc + Math.abs(y - (regSlope * x + regIntercept)),
            0
          ) / pts.length;
        const predAt70 = regSlope * 70 + regIntercept;
        const done = avgAbsErr <= 0.9;
        return {
          goal: 'Adjust Slope (try ~0.40) and Baseline Intercept (try ~26.5°C) to fit the Topic 4.2 motor dataset until Average Error is 0.9°C or less!',
          done,
          successMsg: `Target achieved! Line Temp = (${regSlope.toFixed(2)} × Load) + ${regIntercept.toFixed(1)} fits the motor data with only ${avgAbsErr.toFixed(2)}°C average error!`,
          whatHappened: `Formula: Temp = (${regSlope.toFixed(2)} × Load%) + ${regIntercept.toFixed(1)} · Average Error across 5 points: ${avgAbsErr.toFixed(2)}°C · Predicted Temp at 70% Load: ${predAt70.toFixed(1)}°C`,
          whyHappened:
            avgAbsErr <= 0.9
              ? 'Your straight line passes right through the middle of the 5 motor readings! Each 1% of load adds ~0.4°C above the ~26.5°C baseline.'
              : 'Your line is still tilted or shifted away from the actual motor readings ([20%→35°C] up to [100%→67°C]). Adjust Slope toward 0.40 and Intercept toward 26.5!'
        };
      }

      case 'ai-m4-t4.3': {
        const logit = (clsVib - 3.2) * 1.4 + (clsTemp - 62) * 0.12;
        const wornProb = Math.min(0.99, Math.max(0.01, 1 / (1 + Math.exp(-logit))));
        const wornPct = Math.round(wornProb * 100);
        const label = wornProb >= 0.5 ? 'WORN BEARING' : 'HEALTHY BEARING';
        const done = Math.abs(clsVib - 4.2) < 0.05 && clsTemp === 71;
        return {
          goal: 'Set Vibration to 4.2 mm/s and Temperature to 71°C (the exact Topic 4.3 PDF example) to see the classifier output "WORN BEARING (~92% confidence)"!',
          done,
          successMsg: `Target achieved! At vibration = 4.2 and temperature = 71°C, the classifier predicts ${label} with ${wornPct}% confidence.`,
          whatHappened: `Inputs: Vibration = ${clsVib.toFixed(1)} mm/s, Temp = ${clsTemp}°C → Probabilities: Worn = ${wornPct}%, Healthy = ${100 - wornPct}% → Decision: ${label}`,
          whyHappened:
            wornPct >= 75
              ? 'Both vibration and temperature sit well inside the worn-bearing region across the decision boundary, giving a high-confidence alert.'
              : wornPct >= 45 && wornPct <= 60
              ? 'The readings sit right near the decision boundary (~50/50)—as Topic 4.3 notes, a 55% call deserves a closer look!'
              : 'Low vibration and moderate temperature sit safely inside the Healthy cluster.'
        };
      }

      case 'ai-m4-t4.4': {
        const predTemp = Math.round(28 + capRuntime * 0.055 + capLoad * 0.25 + capVib * 2.2);
        const failLogit = (capRuntime - 260) * 0.012 + (capLoad - 65) * 0.045 + (capVib - 3.0) * 0.85;
        const failProb = Math.min(98, Math.max(2, Math.round((1 / (1 + Math.exp(-failLogit))) * 100)));
        const done = predTemp >= 74 && predTemp <= 79 && failProb >= 84;
        return {
          goal: 'Slide Runtime to ~380 hrs, Load to ~85%, and Vibration to ~4.2 mm/s to reproduce the Topic 4.4 Capstone dual output (~76°C Temp + ≥84% Failure Risk)!',
          done,
          successMsg: `Target achieved! Model 1 (Regression) predicts ${predTemp}°C and Model 2 (Classification) predicts ${failProb}% failure probability within 30 days.`,
          whatHappened: `Model 1 (Regression): Predicted Motor Temp = ${predTemp}°C | Model 2 (Classification): 30-Day Failure Risk = ${failProb}% (${
            failProb >= 50 ? 'FAIL WARNING' : 'NORMAL'
          })`,
          whyHappened:
            'The exact same 3 sensor columns (runtime_hrs, load_pct, vibration) feed two separate models simultaneously—giving you both a continuous temperature forecast and a categorical failure probability.'
        };
      }

      // =======================================================================
      // MECHATRONICS CONCEPT EXPLORERS (11 TOPICS + PID)
      // =======================================================================
      case 'mechatronics-m1-t1.1': {
        const allFour =
          pillars.mechanical &&
          pillars.electrical &&
          pillars.software &&
          pillars.control;
        const carNear = carDistanceM <= 2.5;
        const done = allFour && carNear;
        let gateStatus = '';
        if (!pillars.mechanical) {
          gateStatus = '❌ No Mechanical Pillar: There is no physical gate arm or hinge to move!';
        } else if (!pillars.electrical) {
          gateStatus = '❌ No Electrical Pillar: Motor and sensor have no power or wiring!';
        } else if (!pillars.software) {
          gateStatus = '❌ No Software Pillar: Sensor sees the car, but no program tells the gate to open!';
        } else if (!pillars.control) {
          gateStatus = carNear
            ? '⚠️ Missing Control Pillar: Gate starts opening, but NEVER knows when to stop—motor keeps driving until it jams!'
            : '⚠️ Missing Control Pillar: Gate has no position feedback loop.';
        } else {
          gateStatus = carNear
            ? '✅ All 4 Pillars Active: Car detected at ≤2.5 m → Gate opens smoothly and stops at exactly 90°!'
            : '🟢 All 4 Pillars Active: Gate closed and waiting for a car to approach within 2.5 m.';
        }
        return {
          goal: 'Turn ON all 4 Pillars (especially Control!) and slide Car Distance to 2.5 m or closer so the automatic gate opens and stops safely at 90°.',
          done,
          successMsg:
            'Target achieved! With all 4 pillars connected and the car at ≤2.5 m, the gate opens and uses Control feedback to stop cleanly at 90°.',
          whatHappened: `Car Distance: ${carDistanceM.toFixed(1)} m → ${gateStatus}`,
          whyHappened:
            !pillars.control
              ? 'Just like the Topic 1.1 PDF example: without the Control pillar checking the gate’s angle, the motor spins blindly and never knows when the gate is fully open!'
              : 'Mechanical provides the arm, Electrical powers the motor/sensor, Software decides when to open, and Control checks position feedback to stop at 90°.'
        };
      }

      case 'mechatronics-m1-t1.2': {
        const floorErrorCm =
          loopType === 'open' ? Number(((passengerCount - 2) * 3.5).toFixed(1)) : 0.0;
        const done = loopType === 'closed' && passengerCount >= 8;
        return {
          goal: 'Switch to "Closed-Loop (Position Sensor Feedback)" and set Passengers to 8 or more to see the elevator stop level with the floor (0.0 cm error)!',
          done,
          successMsg: `Target achieved! Even with ${passengerCount} passengers, Closed-Loop feedback brings the elevator cab to 0.0 cm floor error.`,
          whatHappened: `Mode: ${
            loopType === 'open' ? 'Open-Loop (Fixed Timer)' : 'Closed-Loop (Sensor Feedback)'
          } · Load: ${passengerCount} passengers → Floor Alignment Error: ${
            floorErrorCm === 0 ? '0.0 cm (Level with floor!)' : `${floorErrorCm > 0 ? '-' : '+'}${Math.abs(floorErrorCm)} cm off-level!`
          }`,
          whyHappened:
            loopType === 'open'
              ? `An open-loop timer runs the motor for a fixed time without checking where the cab is—so ${passengerCount} heavy passengers make it stop ${Math.abs(floorErrorCm)} cm off-level!`
              : 'Closed-loop control continuously measures the cab’s real position and adjusts motor effort until the gap between cab and floor is 0.0 cm.'
        };
      }

      case 'mechatronics-m1-t1.3': {
        // Braking distance increases with belt speed: brakeDist = beltSpeedCms * 0.25
        const brakeDistanceCm = Number((beltSpeedCms * 0.25).toFixed(1));
        const finalMarginCm = Number((triggerDistCm - brakeDistanceCm).toFixed(1));
        const done = finalMarginCm >= 10.0 && beltSpeedCms >= 25;
        return {
          goal: 'Step 1 Success Criterion: Stop the box at least 10.0 cm before the edge while running at ≥25 cm/s! Increase Sensor Trigger Distance to achieve this.',
          done,
          successMsg: `Target achieved! Triggering at ${triggerDistCm} cm stops the box ${finalMarginCm} cm before the edge (meeting the ≥10 cm success criterion).`,
          whatHappened: `Trigger Distance: ${triggerDistCm} cm · Belt Speed: ${beltSpeedCms} cm/s (Braking Slide = ${brakeDistanceCm} cm) → Box Stops: ${
            finalMarginCm <= 0
              ? `💥 ${Math.abs(finalMarginCm).toFixed(1)} cm PAST THE EDGE (Failed!)`
              : `${finalMarginCm.toFixed(1)} cm before edge (${finalMarginCm >= 10 ? '✅ PASS ≥10 cm' : '⚠️ Too close <10 cm'})`
          }`,
          whyHappened:
            finalMarginCm < 10
              ? 'In Step 5 testing, the belt momentum carried the box too close to the edge. In Step 6 (Iterate), increase the sensor trigger distance or reduce belt speed!'
              : 'By defining a clear numeric target (≥10 cm margin) in Step 1 and adjusting the sensing/control trigger in Step 6, your prototype passes verification.'
        };
      }

      case 'mechatronics-m2-t2.1': {
        const ledVf = 2.0;
        const resistorV = Math.max(0, voltage - ledVf);
        const currentMa = (resistorV / resistance) * 1000;
        const done = voltage === 5.0 && resistance === 150;
        const status =
          currentMa > 25
            ? '⚠️ Too much current (>25 mA) — LED will overheat and burn out!'
            : currentMa >= 15
            ? '✅ Ideal LED brightness (15–22 mA safe zone)'
            : 'ℹ️ Low current (<15 mA) — LED is dim';
        return {
          goal: 'Reproduce the Topic 2.1 PDF worked example: set Supply Voltage to 5.0 V and Resistor to 150 Ω to get exactly 20.0 mA of LED current!',
          done,
          successMsg:
            'Target achieved! 5.0 V supply − 2.0 V LED = 3.0 V across the 150 Ω resistor → I = 3.0 V / 150 Ω = 20.0 mA!',
          whatHappened: `Leftover Voltage across Resistor: ${voltage.toFixed(1)}V − 2.0V = ${resistorV.toFixed(1)} V · Current I = ${resistorV.toFixed(1)}V / ${resistance}Ω = ${currentMa.toFixed(1)} mA · ${status}`,
          whyHappened:
            'The LED uses 2.0 V, leaving the rest of the supply voltage across the resistor. By Ohm’s Law (I = V / R), a larger resistor restricts current flow, while 150 Ω at 5 V gives the exact 20 mA target.'
        };
      }

      case 'mechatronics-m2-t2.2': {
        const vs = 9.0;
        let desc = '';
        if (circuitMode === 'series') {
          if (part1Disconnected) {
            desc = '❌ Component 1 Disconnected → Series loop is broken! Current = 0.0 mA everywhere (Component 2 also goes DEAD).';
          } else {
            const req = r1 + r2;
            const iMa = (vs / req) * 1000;
            const v1 = vs * (r1 / req);
            const v2 = vs * (r2 / req);
            desc = `Series Loop Active: Same current I = ${iMa.toFixed(1)} mA through both · Voltage splits: V₁ = ${v1.toFixed(1)} V + V₂ = ${v2.toFixed(1)} V = 9.0 V`;
          }
        } else {
          const i1Ma = part1Disconnected ? 0 : (vs / r1) * 1000;
          const i2Ma = (vs / r2) * 1000;
          desc = part1Disconnected
            ? `✅ Component 1 Disconnected in Parallel → Branch 1 = 0 mA, Trick: Branch 2 STILL gets full 9.0 V and runs at ${i2Ma.toFixed(1)} mA!`
            : `Parallel Branches Active: Both get full 9.0 V · Branch 1 = ${i1Ma.toFixed(1)} mA, Branch 2 = ${i2Ma.toFixed(1)} mA`;
        }
        const done = circuitMode === 'parallel' && part1Disconnected;
        return {
          goal: 'Switch to "Parallel Branches" and turn ON "Simulate Component 1 Failure" to prove that Component 2 keeps running!',
          done,
          successMsg:
            'Target achieved! In Parallel, each component has its own direct path to the 9V supply, so Branch 2 stays on even when Branch 1 opens.',
          whatHappened: desc,
          whyHappened:
            circuitMode === 'series'
              ? 'In a Series circuit there is only one path for current—if any component fails open, current stops everywhere.'
              : 'In a Parallel circuit, every branch connects independently across the power rails, receiving the full voltage even if another branch disconnects.'
        };
      }

      case 'mechatronics-m2-t2.3': {
        const conducts = diodeForward && transistorOn;
        const rippleMv = conducts ? Math.round(1200 / Math.max(10, capUf)) : 0;
        const done = diodeForward && transistorOn && capUf >= 220;
        return {
          goal: 'Set Diode to "Forward Bias (Allows Flow)", Transistor Switch to "ON (5V Base Signal)", and Smoothing Capacitor to at least 220 µF!',
          done,
          successMsg: `Target achieved! Current flows through the forward-biased diode and switched transistor, while the ${capUf} µF capacitor smooths voltage ripple down to ${rippleMv} mV.`,
          whatHappened: !diodeForward
            ? '🛑 Diode is Reverse-Biased (Backwards): One-way valve is CLOSED → 0 mA current flows!'
            : !transistorOn
            ? '⏸️ Transistor Base is 0V (OFF): Electronic switch is OPEN → Load is off.'
            : `✅ Circuit Active! Current flows cleanly · Smoothing Capacitor (${capUf} µF) keeps voltage ripple down to ${rippleMv} mV.`,
          whyHappened:
            'The diode enforces one-way flow, the transistor acts as an electronic switch controlled by a small signal, and the capacitor stores charge to smooth out voltage dips.'
        };
      }

      case 'mechatronics-m2-t2.4': {
        // Motor current goes from 250 mA at 0% load up to 1200 mA at 100% stall
        const motorCurrentMa = Math.round(250 + (motorLoadPct / 100) * 950);
        const overloaded = motorCurrentMa > transistorRatingMa;
        const safeZone = motorCurrentMa <= transistorRatingMa * 0.5;
        const done =
          motorLoadPct === 100 &&
          transistorRatingMa === 2000 &&
          dmmMode === 'current';
        return {
          goal: 'Switch Multimeter to "Measure Current (In Series)", slide Motor Load to 100% Jammed Stall (1,200 mA), and upgrade to the "2,000 mA Heavy-Duty Transistor"!',
          done,
          successMsg:
            'Target achieved! Your series ammeter reads the 1,200 mA stall surge, and the 2,000 mA transistor survives it without burning out!',
          whatHappened: `Motor Current: ${motorCurrentMa} mA (${
            motorLoadPct === 100 ? 'STALLED!' : 'Running'
          }) vs. Transistor Max Rating: ${transistorRatingMa} mA → ${
            overloaded
              ? '🔥 DANGER: Current exceeds datasheet maximum! Transistor destroyed!'
              : safeZone
              ? '✅ Safe Zone (≤50% of datasheet max rating)'
              : '⚠️ Above 50% margin, but below absolute max ceiling'
          } | Multimeter (${dmmMode === 'voltage' ? 'Parallel Voltmeter' : 'Series Ammeter'}): ${
            dmmMode === 'voltage' ? '12.0 V across motor' : `${motorCurrentMa} mA through loop`
          }`,
          whyHappened:
            'As Topic 2.4 shows, a motor that draws only 250 mA while spinning freely can surge to 1,200 mA when stalled—destroying an 800 mA transistor unless you check stall current on the datasheet!'
        };
      }

      case 'mechatronics-m3-t3.1': {
        // 10 mV per °C sensor -> V = temp * 0.010
        const sensorVolts = roomTempC * 0.01;
        // 10-bit ADC step in Topic 3.1 worked example: round((V / 5.0) * 1024) -> at 0.350 V gives 71
        const adcStep = Math.floor((sensorVolts / 5.0) * 1024 + 0.0001);
        const reconstructedVolts = (adcStep * 5.0) / 1024;
        const reportedTempC = reconstructedVolts / 0.01;
        const done = Math.abs(roomTempC - 35.0) < 0.05;
        return {
          goal: 'Set Room Temperature to exactly 35.0 °C to reproduce the Topic 3.1 PDF worked example (0.350 V → ADC Step 71 → 34.67 °C)!',
          done,
          successMsg:
            'Target achieved! At 35.0 °C (0.350 V), the 10-bit ADC outputs step 71, which converts back to 34.67 °C due to the ~0.49 °C step size.',
          whatHappened: `Actual Temp: ${roomTempC.toFixed(1)} °C → Sensor Analog Output: ${sensorVolts.toFixed(3)} V → 10-Bit ADC Step: ${adcStep} / 1023 → Code Calculates: ${reportedTempC.toFixed(2)} °C`,
          whyHappened:
            'Because a 10-bit ADC divides 0–5 V into 1,024 whole-number steps (~4.88 mV per step), any voltage between steps rounds to the nearest whole integer—explaining why 35.0 °C lands on 34.67 °C!'
        };
      }

      case 'mechatronics-m3-t3.2': {
        const dividerVolts = (5.0 * 10000) / (thermistorOhms + 10000);
        const dividerAdc = Math.round((dividerVolts / 5.0) * 1023);
        const distanceCm = (echoUs * 0.0343) / 2;
        const done =
          (sensorFamilyMode === 'ultrasonic' && distanceCm <= 18) ||
          (sensorFamilyMode === 'thermistor' && thermistorOhms === 10000);
        return {
          goal: 'Switch to "Ultrasonic Distance (Echo Timer)" and slide Echo Time down so the obstacle is closer than 18.0 cm (or match the Thermistor to 10,000 Ω for a 2.50 V midpoint)!',
          done,
          successMsg:
            sensorFamilyMode === 'ultrasonic'
              ? `Target achieved! At ${echoUs} µs round-trip echo time, the obstacle distance is ${distanceCm.toFixed(1)} cm.`
              : 'Target achieved! When the thermistor equals the 10 kΩ fixed resistor, the voltage divider outputs exactly 2.50 V (ADC 512).',
          whatHappened:
            sensorFamilyMode === 'thermistor'
              ? `Thermistor Resistance: ${thermistorOhms.toLocaleString()} Ω + 10,000 Ω Fixed Resistor → Midpoint Voltage = ${dividerVolts.toFixed(2)} V (ADC = ${dividerAdc})`
              : `Ultrasonic Echo Round-Trip: ${echoUs} µs → One-Way Distance = (0.0343 × ${echoUs}) / 2 = ${distanceCm.toFixed(1)} cm`,
          whyHappened:
            sensorFamilyMode === 'thermistor'
              ? 'The fixed resistor forms a Voltage Divider with the thermistor, converting changing resistance (Ω) into a changing voltage (0–5 V) that the ADC pin can read.'
              : 'The ultrasonic sensor times how long the sound pulse takes to travel to the object and bounce back, then divides by 2 for the one-way distance.'
        };
      }

      case 'mechatronics-m3-t3.3': {
        // Noise wobble shrinks by 1 / sqrt(avgSampleCount)
        const rawWobbleC = Number(((noiseLevelPct / 100) * 2.4).toFixed(2));
        const smoothedWobbleC = Number(
          (rawWobbleC / Math.sqrt(avgSampleCount)).toFixed(2)
        );
        const done = avgSampleCount === 16;
        return {
          goal: 'Slide "Number of Averaged Readings" up to 16 (matching Topic 3.3’s readAverage(A0, 16) function) to smooth out the sensor wobble!',
          done,
          successMsg: `Target achieved! Averaging 16 readings cuts the random temperature wobble from ±${rawWobbleC}°C down to just ±${smoothedWobbleC}°C.`,
          whatHappened: `True Temp: 25.0 °C · Raw Single-Sample Wobble: ±${rawWobbleC} °C → After Averaging ${avgSampleCount} Sample(s): ±${smoothedWobbleC} °C Wobble`,
          whyHappened:
            avgSampleCount === 1
              ? 'With only 1 sample, every random electrical spike on the wire jumps straight into your temperature variable.'
              : `By adding ${avgSampleCount} quick readings together and dividing by ${avgSampleCount}, random high and low spikes cancel each other out!`
        };
      }

      case 'mechatronics-m4-t4.1': {
        const shouldSpin = boxTempC >= 30;
        const fanRpm =
          driverConnected && shouldSpin ? Math.round((pwmDuty / 100) * 2400) : 0;
        const done = driverConnected && boxTempC >= 32 && pwmDuty >= 75;
        return {
          goal: 'In the Topic 4.1 Cooling Fan simulation: (1) Connect the Transistor Driver, (2) Raise Box Temperature ≥ 32°C, and (3) Set PWM Duty Cycle ≥ 75%!',
          done,
          successMsg: `Target achieved! At ${boxTempC}°C, the controller signals the Transistor Driver at ${pwmDuty}% PWM to spin the 12V, 150 mA fan at ${fanRpm} RPM!`,
          whatHappened: !driverConnected
            ? '❌ Direct Pin Connection (No Driver): A 5V, 20 mA controller pin CANNOT power the 12V, 150 mA fan (0 RPM — pin overload risk!).'
            : !shouldSpin
            ? `🟢 Driver Connected · Box Temp is ${boxTempC}°C (< 30°C threshold) → Fan stays OFF to save power.`
            : `✅ Cooling Fan Active! Temp = ${boxTempC}°C (≥ 30°C) · PWM Duty = ${pwmDuty}% → 12V Fan spinning at ${fanRpm} RPM!`,
          whyHappened: !driverConnected
            ? 'As Topic 4.1 explains, the fan needs 7.5× more current (150 mA) and a higher voltage (12 V) than a controller pin can supply. You must place a Driver/Transistor between the controller and the motor!'
            : 'The LM35 sensor measures box heat, the controller outputs a low-current PWM signal, and the transistor driver switches the 12V, 150 mA power path for the fan.'
        };
      }

      default: {
        const riseTime = Math.max(0.15, 1.8 - kp * 0.014).toFixed(2);
        const overshoot = Math.max(0, Math.round(kp * 0.65 + ki * 0.5 - kd * 0.85));
        const ssError = Number(Math.max(0, 12 - ki * 0.6 - kp * 0.08).toFixed(1));
        const done = overshoot <= 8 && ssError === 0;
        return {
          goal: 'Tune P, I, and D sliders so Overshoot is 8% or less and Steady-State Error reaches 0.0%.',
          done,
          successMsg: `Target achieved! With P=${kp}, I=${ki}, D=${kd}, the robot reaches target in ${riseTime}s with ${overshoot}% overshoot and 0.0% error.`,
          whatHappened: `Rise Time ≈ ${riseTime}s · Overshoot ≈ ${overshoot}% · Steady-State Error ≈ ${ssError}%`,
          whyHappened:
            overshoot > 15
              ? 'Proportional (P) push is strong relative to Derivative (D) braking, causing the robot to swing past the target line. Increase D to dampen overshoot!'
              : 'P provides fast response, I eliminates leftover steady-state offset, and D brakes smoothly as the robot nears the target.'
        };
      }
    }
  })();

  const isSimDone = !!(solvedMap[resolvedId] || simResult.done);
  const isPredDone = predPicked === entry.prediction?.answer;
  const isKcDone = kcPicked === entry.knowledgeCheck?.answer;
  const stepsCompletedCount =
    (isPredDone ? 1 : 0) + (isSimDone ? 1 : 0) + (isKcDone ? 1 : 0);

  useEffect(() => {
    if (simResult.done && !solvedMap[resolvedId]) {
      setSolvedMap((prev) => ({ ...prev, [resolvedId]: true }));
      if (typeof onChallengeSolved === 'function') {
        onChallengeSolved(resolvedId);
      }
    }
  }, [simResult.done, resolvedId, solvedMap, onChallengeSolved]);

  return (
    <div className="card" style={{ marginBottom: '14px', borderColor: 'var(--blue)' }}>
      {/* Explorer Header */}
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
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="tag" style={{ background: 'var(--blue)', color: '#fff', marginTop: 0 }}>
            ⚡ Interactive Concept Explorer
          </span>
          <span className="tag" style={{ marginTop: 0 }}>
            {entry.areaBadge}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="chip"
            style={{ fontSize: '.76rem', padding: '5px 10px' }}
            onClick={resetCurrentExplorer}
          >
            🔄 Reset Activity
          </button>
          {onOpenLab && (
            <button
              type="button"
              className="go"
              style={{ fontSize: '.76rem', padding: '6px 10px' }}
              onClick={() => onOpenLab(resolvedId)}
            >
              🔬 Open in Explorer Hub
            </button>
          )}
          {onAskBot && (
            <button
              type="button"
              className="chip"
              style={{ fontSize: '.76rem', padding: '5px 10px' }}
              onClick={() =>
                onAskBot(`Explain ${entry.title} in simple beginner terms`)
              }
            >
              🤖 Ask Coach
            </button>
          )}
        </div>
      </div>

      {/* Activity 3-Step Progress Bar */}
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
          <b>Explorer Progress: {stepsCompletedCount} of 3 steps completed</b> (1. Predict → 2. Experiment → 3. Knowledge Check)
        </small>
        <small className="meta">Source PDF: {entry.pdfSource}</small>
      </div>
      <div className="bar" style={{ marginBottom: '12px' }}>
        <i style={{ width: `${Math.round((stepsCompletedCount / 3) * 100)}%` }} />
      </div>

      <h2 style={{ fontSize: '1.12rem', marginBottom: '10px' }}>
        {entry.title || stopTitle}
      </h2>

      {/* =====================================================================
          QUESTION 1: WHAT AM I LEARNING? (+ Course PDF Diagram & Beginner Terms)
          ===================================================================== */}
      <div
        style={{
          padding: '12px',
          borderRadius: '12px',
          background: 'var(--tile)',
          marginBottom: '12px'
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
          <span className="tag" style={{ marginTop: 0 }}>
            📖 1. What am I learning?
          </span>
          {entry.keyTerms && entry.keyTerms.length > 0 && (
            <button
              type="button"
              className="go"
              style={{ fontSize: '.74rem', padding: '4px 8px' }}
              onClick={() => setShowTerms((s) => !s)}
            >
              {showTerms ? '🙈 Hide Term Guide' : '📘 Show Beginner Term Guide'}
            </button>
          )}
        </div>

        <p style={{ margin: '4px 0 10px', lineHeight: 1.55 }}>
          {entry.whatLearning}
        </p>

        {/* Beginner Glossary for First-Time Technical Terms */}
        {showTerms && entry.keyTerms && entry.keyTerms.length > 0 && (
          <div
            style={{
              display: 'grid',
              gap: '6px',
              marginBottom: '10px',
              padding: '8px 10px',
              borderRadius: '8px',
              background: 'var(--card)',
              border: '1px solid var(--line)'
            }}
          >
            <small className="meta" style={{ fontWeight: 700 }}>
              📘 First-Time Term Guide (Plain-English Definitions):
            </small>
            {entry.keyTerms.map((kt, idx) => (
              <div key={idx} style={{ fontSize: '.86rem', lineHeight: 1.4 }}>
                <b>• {kt.term}:</b> {kt.def}
              </div>
            ))}
          </div>
        )}

        {/* Authentic Course PDF Diagram */}
        {entry.diagramSrc && (
          <figure className="lesson-figure" style={{ margin: '8px 0 0' }}>
            <img
              src={entry.diagramSrc}
              alt={entry.diagramCaption || entry.title}
              loading="lazy"
              style={{ maxHeight: '220px', objectFit: 'contain', margin: '0 auto' }}
            />
            {entry.diagramCaption && (
              <figcaption>{entry.diagramCaption}</figcaption>
            )}
          </figure>
        )}
      </div>

      {/* =====================================================================
          QUESTION 2: WHAT SHOULD I DO? (Step 1: Predict + Step 2: Simulate)
          ===================================================================== */}
      <div
        style={{
          padding: '12px',
          borderRadius: '12px',
          border: '1px solid var(--line)',
          marginBottom: '12px'
        }}
      >
        <span className="tag" style={{ marginTop: 0 }}>
          🧭 2. What should I do?
        </span>
        <p className="meta" style={{ margin: '6px 0 10px' }}>
          {entry.whatToDo}
        </p>

        {/* STEP 1: MAKE A PREDICTION FIRST */}
        {entry.prediction && (
          <div
            style={{
              padding: '10px 12px',
              borderRadius: '10px',
              background: 'var(--tile)',
              marginBottom: '12px'
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
              <b style={{ fontSize: '.92rem' }}>
                {isPredDone ? '✅ ' : '🤔 '}Step 1 of 3 — Make a Prediction Before Testing:
              </b>
              <div style={{ display: 'flex', gap: '6px' }}>
                {predPicked !== null && predPicked !== entry.prediction.answer && (
                  <button
                    type="button"
                    className="go"
                    style={{ fontSize: '.74rem', padding: '4px 8px' }}
                    onClick={() => setPredPicked(null)}
                  >
                    🔄 Try Again
                  </button>
                )}
                <button
                  type="button"
                  className="go"
                  style={{ fontSize: '.74rem', padding: '4px 8px' }}
                  onClick={() => setPredShowHint((h) => !h)}
                >
                  {predShowHint ? '🙈 Hide Hint' : '💡 Hint'}
                </button>
              </div>
            </div>

            <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: '.92rem' }}>
              {entry.prediction.question}
            </p>

            {predShowHint && (
              <div className="kp" style={{ marginBottom: '8px' }}>
                <b>💡 Hint:</b> {entry.prediction.hint}
              </div>
            )}

            {optionOrder(entry.prediction.options.length, `${resolvedId}-pred`).map((idx) => {
              const optText = entry.prediction.options[idx];
              const isOk = idx === entry.prediction.answer;
              let cls = 'opt';
              if (predPicked === idx) {
                cls += isOk ? ' ok' : ' no';
              }
              return (
                <button
                  key={idx}
                  type="button"
                  className={cls}
                  onClick={() => setPredPicked(idx)}
                >
                  {optText}
                </button>
              );
            })}

            {predPicked !== null && (
              <div className="kp" style={{ marginTop: '8px', marginBottom: 0 }}>
                <b>
                  {predPicked === entry.prediction.answer
                    ? '✅ Great prediction!'
                    : '🔎 Not quite — here is what to look for in the simulation below:'}
                </b>{' '}
                {entry.prediction.explanation}
              </div>
            )}
          </div>
        )}

        {/* STEP 2: INTERACTIVE SIMULATION CONTROLS */}
        <div
          style={{
            padding: '10px 12px',
            borderRadius: '10px',
            background: 'var(--card)',
            border: '1px solid var(--line)'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: '8px'
            }}
          >
            <b style={{ fontSize: '.92rem' }}>
              {isSimDone ? '✅ ' : '🎛️ '}Step 2 of 3 — Experiment with the Controls:
            </b>
            <span className="tag" style={{ marginTop: 0, fontSize: '.72rem' }}>
              🧪 Interactive Simulation (Virtual Model — Not Physical Hardware)
            </span>
          </div>

          {/* Target Challenge Goal Banner */}
          <div
            className="kp"
            style={{
              marginTop: 0,
              marginBottom: '10px',
              borderLeftColor: isSimDone ? '#199E52' : 'var(--blue)'
            }}
          >
            <b>
              {isSimDone
                ? '✅ Practical Challenge Solved (+20 XP):'
                : '🎯 Hands-On Target Challenge:'}
            </b>{' '}
            {isSimDone ? simResult.successMsg : simResult.goal}
          </div>

          {/* --- TOPIC-SPECIFIC CONTROLS --- */}

          {/* AI 1.1: AI vs ML vs DL */}
          {resolvedId === 'ai-m1-t1.1' && (
            <div>
              <p className="meta" style={{ marginBottom: '6px' }}>
                Select an approach and adjust how many example cat photos are provided:
              </p>
              <div className="chips" style={{ marginBottom: '8px' }}>
                {[
                  { id: 'rules', label: '1. Rule-Based AI (Hand-Written Rules)' },
                  { id: 'ml', label: '2. Classical Machine Learning' },
                  { id: 'dl', label: '3. Deep Learning (Neural Network)' }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className="chip"
                    aria-pressed={aiApproach === m.id ? 'true' : 'false'}
                    onClick={() => setAiApproach(m.id)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              <label className="fl2">
                Number of Training Cat Photos: <b>{trainingPhotos.toLocaleString()} photos</b>
              </label>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={trainingPhotos}
                aria-label="Number of training photos"
                onChange={(e) => setTrainingPhotos(Number(e.target.value))}
              />
            </div>
          )}

          {/* AI 1.2: Predictive Maintenance */}
          {resolvedId === 'ai-m1-t1.2' && (
            <div>
              <p className="meta" style={{ marginBottom: '6px' }}>
                Choose a factory maintenance strategy and adjust the motor bearing’s vibration sensor reading:
              </p>
              <div className="chips" style={{ marginBottom: '8px' }}>
                {[
                  { id: 'reactive', label: 'Reactive (Wait for Breakdown)' },
                  { id: 'scheduled', label: 'Scheduled (Fixed Calendar)' },
                  { id: 'predictive', label: 'AI Predictive Maintenance (Sensor Stream)' }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className="chip"
                    aria-pressed={maintStrategy === m.id ? 'true' : 'false'}
                    onClick={() => setMaintStrategy(m.id)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              <label className="fl2">
                Simulated Bearing Vibration Sensor: <b>{bearingVibration.toFixed(1)} mm/s</b> (Normal &lt; 3.5 · Early Wear ≥ 4.5 · Breakdown ≥ 7.5)
              </label>
              <input
                type="range"
                min="1.0"
                max="9.0"
                step="0.5"
                value={bearingVibration}
                aria-label="Bearing vibration sensor reading"
                onChange={(e) => setBearingVibration(Number(e.target.value))}
              />
            </div>
          )}

          {/* AI 1.3: Data Bias & Ethics */}
          {resolvedId === 'ai-m1-t1.3' && (
            <div>
              <label className="fl2">
                Training Data Balance (Share of Under-Represented Examples): <b>{dataBalancePct}%</b> ({dataBalancePct < 30 ? 'Heavily Skewed' : 'Balanced Representation'})
              </label>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={dataBalancePct}
                aria-label="Training data balance percentage"
                onChange={(e) => setDataBalancePct(Number(e.target.value))}
              />
              <div className="chips" style={{ marginTop: '8px', marginBottom: 0 }}>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={!humanAuditOn ? 'true' : 'false'}
                  onClick={() => setHumanAuditOn(false)}
                >
                  Human Expert Audit: OFF (Unchecked Automation)
                </button>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={humanAuditOn ? 'true' : 'false'}
                  onClick={() => setHumanAuditOn(true)}
                >
                  ✅ Human Expert Audit: ON (Bias &amp; Safety Review)
                </button>
              </div>
            </div>
          )}

          {/* AI 2.1: Python Variables, Loops & Functions */}
          {resolvedId === 'ai-m2-t2.1' && (
            <div>
              <label className="fl2">
                Python Variable `celsius` passed into `convert_to_fahrenheit(celsius)`: <b>{pyCelsius}°C</b>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={pyCelsius}
                aria-label="Celsius input variable"
                onChange={(e) => setPyCelsius(Number(e.target.value))}
              />
              <div className="chips" style={{ marginTop: '8px', marginBottom: 0 }}>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={pyRunBatchLoop ? 'true' : 'false'}
                  onClick={() => setPyRunBatchLoop((b) => !b)}
                >
                  {pyRunBatchLoop
                    ? '✓ Running `for reading in [42, 45, 41, 50, 47]:` Loop'
                    : '▶ Run `for` Loop on 5 Sensor Readings'}
                </button>
              </div>
            </div>
          )}

          {/* AI 2.2: NumPy Basics */}
          {resolvedId === 'ai-m2-t2.2' && (
            <div>
              <label className="fl2">
                Add Calibration Offset to Entire Array `readings = np.array([20, 22, 19, 25])`: <b>{npOffset >= 0 ? `+${npOffset}` : npOffset}°C</b>
              </label>
              <input
                type="range"
                min="-5"
                max="10"
                step="1"
                value={npOffset}
                aria-label="NumPy array calibration offset"
                onChange={(e) => setNpOffset(Number(e.target.value))}
              />
              <div className="chips" style={{ marginTop: '8px', marginBottom: 0 }}>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={!npConvertF ? 'true' : 'false'}
                  onClick={() => setNpConvertF(false)}
                >
                  Keep in Celsius (°C)
                </button>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={npConvertF ? 'true' : 'false'}
                  onClick={() => setNpConvertF(true)}
                >
                  ⚡ Apply `(readings * 9/5) + 32` to All Values at Once (°F)
                </button>
              </div>
            </div>
          )}

          {/* AI 3.1: Linear Algebra Shapes */}
          {resolvedId === 'ai-m3-t3.1' && (
            <div>
              <p className="meta" style={{ marginBottom: '6px' }}>
                Test `np.dot(matrix_a, matrix_b)`: Matrix A has 3 rows, and Matrix B has 2 columns. Match the inner numbers!
              </p>
              <label className="fl2">
                Matrix A Columns — `matrix_a.shape = (3, {matACols})`: <b>{matACols} columns</b>
              </label>
              <input
                type="range"
                min="1"
                max="6"
                step="1"
                value={matACols}
                aria-label="Matrix A columns"
                onChange={(e) => setMatACols(Number(e.target.value))}
              />
              <label className="fl2">
                Matrix B Rows — `matrix_b.shape = ({matBRows}, 2)`: <b>{matBRows} rows</b>
              </label>
              <input
                type="range"
                min="1"
                max="6"
                step="1"
                value={matBRows}
                aria-label="Matrix B rows"
                onChange={(e) => setMatBRows(Number(e.target.value))}
              />
            </div>
          )}

          {/* AI 3.2: Probability & Standard Deviation */}
          {resolvedId === 'ai-m3-t3.2' && (
            <div>
              <label className="fl2">
                Adjust the 6th Sensor Reading in `data = np.array([42, 45, 41, 50, 47, {sixthReading}])`: <b>{sixthReading}</b>
              </label>
              <input
                type="range"
                min="40"
                max="200"
                step="2"
                value={sixthReading}
                aria-label="Sixth sensor reading value"
                onChange={(e) => setSixthReading(Number(e.target.value))}
              />
              <div className="chips" style={{ marginTop: '6px', marginBottom: 0 }}>
                <button
                  type="button"
                  className="chip"
                  onClick={() => setSixthReading(200)}
                >
                  Spike Outlier (200)
                </button>
                <button
                  type="button"
                  className="chip"
                  onClick={() => setSixthReading(45)}
                >
                  Normal Reading (45)
                </button>
              </div>
            </div>
          )}

          {/* AI 4.1: Supervised vs Unsupervised */}
          {resolvedId === 'ai-m4-t4.1' && (
            <div>
              <div className="chips" style={{ marginBottom: '8px' }}>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={learnMode === 'supervised' ? 'true' : 'false'}
                  onClick={() => setLearnMode('supervised')}
                >
                  🏷️ Supervised Learning (Has Known Labels)
                </button>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={learnMode === 'unsupervised' ? 'true' : 'false'}
                  onClick={() => setLearnMode('unsupervised')}
                >
                  🔍 Unsupervised Learning (No Labels — Find Clusters)
                </button>
              </div>
              <label className="fl2">
                Feature 1 — House Size (`size_sqft`): <b>{houseSqft} sq ft</b> (PDF Example: 1600)
              </label>
              <input
                type="range"
                min="1000"
                max="2400"
                step="100"
                value={houseSqft}
                aria-label="House size in square feet"
                onChange={(e) => setHouseSqft(Number(e.target.value))}
              />
              <label className="fl2">
                Feature 2 — Number of Bedrooms (`bedrooms`): <b>{houseBeds} bedrooms</b> (PDF Example: 3)
              </label>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={houseBeds}
                aria-label="Number of bedrooms"
                onChange={(e) => setHouseBeds(Number(e.target.value))}
              />
            </div>
          )}

          {/* AI 4.2: Regression */}
          {resolvedId === 'ai-m4-t4.2' && (
            <div>
              <p className="meta" style={{ marginBottom: '6px' }}>
                Topic 4.2 Motor Data: Load `[20, 40, 60, 80, 100]%` → Actual Temp `[35, 42, 51, 58, 67]°C`
              </p>
              <label className="fl2">
                Line Slope (°C added per 1% motor load): <b>{regSlope.toFixed(2)}</b> (Best fit ≈ 0.40)
              </label>
              <input
                type="range"
                min="0.10"
                max="0.60"
                step="0.05"
                value={regSlope}
                aria-label="Regression line slope"
                onChange={(e) => setRegSlope(Number(e.target.value))}
              />
              <label className="fl2">
                Baseline Intercept (Temp at 0% load): <b>{regIntercept.toFixed(1)}°C</b> (Best fit ≈ 26.5°C)
              </label>
              <input
                type="range"
                min="20.0"
                max="34.0"
                step="0.5"
                value={regIntercept}
                aria-label="Regression line intercept"
                onChange={(e) => setRegIntercept(Number(e.target.value))}
              />
            </div>
          )}

          {/* AI 4.3: Classification */}
          {resolvedId === 'ai-m4-t4.3' && (
            <div>
              <label className="fl2">
                Feature 1 — Bearing Vibration (`vibration`): <b>{clsVib.toFixed(1)} mm/s</b> (PDF Example: 4.2)
              </label>
              <input
                type="range"
                min="1.0"
                max="6.0"
                step="0.2"
                value={clsVib}
                aria-label="Bearing vibration input"
                onChange={(e) => setClsVib(Number(e.target.value))}
              />
              <label className="fl2">
                Feature 2 — Bearing Temperature (`temperature`): <b>{clsTemp}°C</b> (PDF Example: 71°C)
              </label>
              <input
                type="range"
                min="45"
                max="85"
                step="2"
                value={clsTemp}
                aria-label="Bearing temperature input"
                onChange={(e) => setClsTemp(Number(e.target.value))}
              />
            </div>
          )}

          {/* AI 4.4: Capstone Dual Predictor */}
          {resolvedId === 'ai-m4-t4.4' && (
            <div>
              <label className="fl2">
                Feature 1 — Runtime Since Service (`runtime_hrs`): <b>{capRuntime} hrs</b>
              </label>
              <input
                type="range"
                min="50"
                max="450"
                step="10"
                value={capRuntime}
                aria-label="Motor runtime hours"
                onChange={(e) => setCapRuntime(Number(e.target.value))}
              />
              <label className="fl2">
                Feature 2 — Average Motor Load (`load_pct`): <b>{capLoad}%</b>
              </label>
              <input
                type="range"
                min="30"
                max="95"
                step="5"
                value={capLoad}
                aria-label="Motor load percentage"
                onChange={(e) => setCapLoad(Number(e.target.value))}
              />
              <label className="fl2">
                Feature 3 — Vibration Level (`vibration`): <b>{capVib.toFixed(1)} mm/s</b>
              </label>
              <input
                type="range"
                min="1.0"
                max="5.5"
                step="0.3"
                value={capVib}
                aria-label="Motor vibration level"
                onChange={(e) => setCapVib(Number(e.target.value))}
              />
            </div>
          )}

          {/* MECHATRONICS 1.1: 4 Pillars & Automatic Gate */}
          {resolvedId === 'mechatronics-m1-t1.1' && (
            <div>
              <p className="meta" style={{ marginBottom: '6px' }}>
                Click to connect or disconnect each of the 4 Mechatronics Pillars on the Automatic Gate:
              </p>
              <div className="chips" style={{ marginBottom: '8px' }}>
                {[
                  { k: 'mechanical', label: '1. Mechanical (Gate Arm & Hinges)' },
                  { k: 'electrical', label: '2. Electrical (Motor & Power)' },
                  { k: 'software', label: '3. Software (Open Logic)' },
                  { k: 'control', label: '4. Control (Stop-Angle Feedback)' }
                ].map((p) => (
                  <button
                    key={p.k}
                    type="button"
                    className="chip"
                    aria-pressed={pillars[p.k] ? 'true' : 'false'}
                    onClick={() =>
                      setPillars((prev) => ({ ...prev, [p.k]: !prev[p.k] }))
                    }
                  >
                    {pillars[p.k] ? '✓ ' : '✗ '}
                    {p.label}
                  </button>
                ))}
              </div>
              <label className="fl2">
                Approaching Car Distance to Gate Sensor: <b>{carDistanceM.toFixed(1)} m</b> (Opens at ≤ 2.5 m)
              </label>
              <input
                type="range"
                min="0.5"
                max="6.0"
                step="0.5"
                value={carDistanceM}
                aria-label="Approaching car distance in meters"
                onChange={(e) => setCarDistanceM(Number(e.target.value))}
              />
            </div>
          )}

          {/* MECHATRONICS 1.2: Elevator & Drone Closed-Loop Feedback */}
          {resolvedId === 'mechatronics-m1-t1.2' && (
            <div>
              <div className="chips" style={{ marginBottom: '8px' }}>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={loopType === 'open' ? 'true' : 'false'}
                  onClick={() => setLoopType('open')}
                >
                  ⏱️ Open-Loop (Blind Timer — No Sensor Check)
                </button>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={loopType === 'closed' ? 'true' : 'false'}
                  onClick={() => setLoopType('closed')}
                >
                  🔄 Closed-Loop (Position Sensor Feedback)
                </button>
              </div>
              <label className="fl2">
                Passengers Inside Elevator Cab (Weight Disturbance): <b>{passengerCount} passengers</b>
              </label>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={passengerCount}
                aria-label="Number of elevator passengers"
                onChange={(e) => setPassengerCount(Number(e.target.value))}
              />
            </div>
          )}

          {/* MECHATRONICS 1.3: 6-Step Design Process */}
          {resolvedId === 'mechatronics-m1-t1.3' && (
            <div>
              <label className="fl2">
                Sensor Trigger Distance Before Belt Edge: <b>{triggerDistCm} cm</b>
              </label>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={triggerDistCm}
                aria-label="Sensor trigger distance cm"
                onChange={(e) => setTriggerDistCm(Number(e.target.value))}
              />
              <label className="fl2">
                Conveyor Belt Speed: <b>{beltSpeedCms} cm/s</b>
              </label>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={beltSpeedCms}
                aria-label="Conveyor belt speed cm per second"
                onChange={(e) => setBeltSpeedCms(Number(e.target.value))}
              />
            </div>
          )}

          {/* MECHATRONICS 2.1: Ohm's Law & Sizing LED Resistor */}
          {resolvedId === 'mechatronics-m2-t2.1' && (
            <div>
              <label className="fl2">
                Supply Voltage (V — The Electrical Push): <b>{voltage.toFixed(1)} V</b> (PDF Example: 5.0 V)
              </label>
              <input
                type="range"
                min="3.0"
                max="12.0"
                step="0.5"
                value={voltage}
                aria-label="Supply Voltage"
                onChange={(e) => setVoltage(Number(e.target.value))}
              />
              <label className="fl2">
                Protective Resistor (R — The Restriction): <b>{resistance} Ω</b> (PDF Example: 150 Ω)
              </label>
              <input
                type="range"
                min="50"
                max="600"
                step="25"
                value={resistance}
                aria-label="Protective Resistance Ohms"
                onChange={(e) => setResistance(Number(e.target.value))}
              />
            </div>
          )}

          {/* MECHATRONICS 2.2: Series vs Parallel */}
          {resolvedId === 'mechatronics-m2-t2.2' && (
            <div>
              <div className="chips" style={{ marginBottom: '8px' }}>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={circuitMode === 'series' ? 'true' : 'false'}
                  onClick={() => setCircuitMode('series')}
                >
                  🔗 Series Circuit (Single Loop)
                </button>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={circuitMode === 'parallel' ? 'true' : 'false'}
                  onClick={() => setCircuitMode('parallel')}
                >
                  🔀 Parallel Circuit (Independent Branches)
                </button>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={part1Disconnected ? 'true' : 'false'}
                  onClick={() => setPart1Disconnected((d) => !d)}
                >
                  {part1Disconnected
                    ? '⚡ Restore Component 1'
                    : '🧪 Simulate Component 1 Failure (Open Fault)'}
                </button>
              </div>
              <label className="fl2">
                Component 1 Resistance (R₁): <b>{r1} Ω</b>
              </label>
              <input
                type="range"
                min="100"
                max="600"
                step="50"
                value={r1}
                aria-label="Component 1 resistance"
                onChange={(e) => setR1(Number(e.target.value))}
              />
              <label className="fl2">
                Component 2 Resistance (R₂): <b>{r2} Ω</b>
              </label>
              <input
                type="range"
                min="100"
                max="600"
                step="50"
                value={r2}
                aria-label="Component 2 resistance"
                onChange={(e) => setR2(Number(e.target.value))}
              />
            </div>
          )}

          {/* MECHATRONICS 2.3: Essential Components */}
          {resolvedId === 'mechatronics-m2-t2.3' && (
            <div>
              <div className="chips" style={{ marginBottom: '8px' }}>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={diodeForward ? 'true' : 'false'}
                  onClick={() => setDiodeForward((f) => !f)}
                >
                  {diodeForward
                    ? '✓ Diode: Forward-Biased (One-Way Valve OPEN)'
                    : '✗ Diode: Reverse-Biased (Installed Backwards — BLOCKED)'}
                </button>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={transistorOn ? 'true' : 'false'}
                  onClick={() => setTransistorOn((t) => !t)}
                >
                  {transistorOn
                    ? '✓ Transistor Switch: ON (5V Signal)'
                    : '✗ Transistor Switch: OFF (0V Signal)'}
                </button>
              </div>
              <label className="fl2">
                Smoothing Capacitor Size (Stores &amp; Releases Charge): <b>{capUf} µF</b>
              </label>
              <input
                type="range"
                min="10"
                max="470"
                step="10"
                value={capUf}
                aria-label="Smoothing capacitor microfarads"
                onChange={(e) => setCapUf(Number(e.target.value))}
              />
            </div>
          )}

          {/* MECHATRONICS 2.4: Datasheets & Multimeter Probing */}
          {resolvedId === 'mechatronics-m2-t2.4' && (
            <div>
              <div className="chips" style={{ marginBottom: '8px' }}>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={transistorRatingMa === 800 ? 'true' : 'false'}
                  onClick={() => setTransistorRatingMa(800)}
                >
                  Small Transistor (800 mA Datasheet Max)
                </button>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={transistorRatingMa === 2000 ? 'true' : 'false'}
                  onClick={() => setTransistorRatingMa(2000)}
                >
                  ✅ Heavy-Duty Transistor (2,000 mA Datasheet Max)
                </button>
              </div>
              <div className="chips" style={{ marginBottom: '8px' }}>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={dmmMode === 'voltage' ? 'true' : 'false'}
                  onClick={() => setDmmMode('voltage')}
                >
                  📟 Multimeter: Measure Voltage (In Parallel)
                </button>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={dmmMode === 'current' ? 'true' : 'false'}
                  onClick={() => setDmmMode('current')}
                >
                  📟 Multimeter: Measure Current (In Series)
                </button>
              </div>
              <label className="fl2">
                Mechanical Load on Motor Shaft: <b>{motorLoadPct}%</b> ({motorLoadPct === 100 ? 'Jammed / Stalled = 1,200 mA!' : 'Free / Normal Running'})
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={motorLoadPct}
                aria-label="Motor mechanical load percentage"
                onChange={(e) => setMotorLoadPct(Number(e.target.value))}
              />
            </div>
          )}

          {/* MECHATRONICS 3.1: Analog vs Digital & 10-Bit ADC */}
          {resolvedId === 'mechatronics-m3-t3.1' && (
            <div>
              <label className="fl2">
                Actual Room Temperature on 10 mV/°C Sensor: <b>{roomTempC.toFixed(1)} °C</b> (Topic 3.1 Worked Example = 35.0 °C)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="0.5"
                value={roomTempC}
                aria-label="Actual room temperature Celsius"
                onChange={(e) => setRoomTempC(Number(e.target.value))}
              />
              <div className="chips" style={{ marginTop: '6px', marginBottom: 0 }}>
                <button
                  type="button"
                  className="chip"
                  onClick={() => setRoomTempC(35.0)}
                >
                  🎯 Jump to PDF Worked Example (35.0 °C)
                </button>
              </div>
            </div>
          )}

          {/* MECHATRONICS 3.2: Common Sensor Types */}
          {resolvedId === 'mechatronics-m3-t3.2' && (
            <div>
              <div className="chips" style={{ marginBottom: '8px' }}>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={sensorFamilyMode === 'thermistor' ? 'true' : 'false'}
                  onClick={() => setSensorFamilyMode('thermistor')}
                >
                  🌡️ Thermistor in Voltage Divider (10 kΩ Fixed Resistor)
                </button>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={sensorFamilyMode === 'ultrasonic' ? 'true' : 'false'}
                  onClick={() => setSensorFamilyMode('ultrasonic')}
                >
                  📡 Ultrasonic Distance Sensor (Echo Timer)
                </button>
              </div>
              {sensorFamilyMode === 'thermistor' ? (
                <>
                  <label className="fl2">
                    Thermistor Resistance (Changes with Temperature): <b>{thermistorOhms.toLocaleString()} Ω</b>
                  </label>
                  <input
                    type="range"
                    min="2000"
                    max="30000"
                    step="1000"
                    value={thermistorOhms}
                    aria-label="Thermistor resistance in ohms"
                    onChange={(e) => setThermistorOhms(Number(e.target.value))}
                  />
                </>
              ) : (
                <>
                  <label className="fl2">
                    Round-Trip Echo Time (`pulseIn` microseconds): <b>{echoUs} µs</b>
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="6000"
                    step="100"
                    value={echoUs}
                    aria-label="Ultrasonic echo duration in microseconds"
                    onChange={(e) => setEchoUs(Number(e.target.value))}
                  />
                </>
              )}
            </div>
          )}

          {/* MECHATRONICS 3.3: 4-Step Reading & 16-Sample Averaging */}
          {resolvedId === 'mechatronics-m3-t3.3' && (
            <div>
              <label className="fl2">
                Number of Samples Averaged in Code (`readAverage(A0, samples)`): <b>{avgSampleCount} sample(s)</b> (PDF Example: 16)
              </label>
              <input
                type="range"
                min="1"
                max="16"
                step="1"
                value={avgSampleCount}
                aria-label="Number of averaged sensor samples"
                onChange={(e) => setAvgSampleCount(Number(e.target.value))}
              />
              <label className="fl2">
                Simulated Electrical Wire Noise Level: <b>{noiseLevelPct}%</b>
              </label>
              <input
                type="range"
                min="10"
                max="80"
                step="10"
                value={noiseLevelPct}
                aria-label="Simulated noise percentage"
                onChange={(e) => setNoiseLevelPct(Number(e.target.value))}
              />
            </div>
          )}

          {/* MECHATRONICS 4.1: Actuators, Drive Chain & Cooling Fan */}
          {resolvedId === 'mechatronics-m4-t4.1' && (
            <div>
              <div className="chips" style={{ marginBottom: '8px' }}>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={!driverConnected ? 'true' : 'false'}
                  onClick={() => setDriverConnected(false)}
                >
                  ❌ Wire 12V Fan Directly to 5V Pin (No Driver)
                </button>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={driverConnected ? 'true' : 'false'}
                  onClick={() => setDriverConnected(true)}
                >
                  ✅ Use Drive Chain: Pin → Transistor Driver + Flyback Diode → 12V Fan
                </button>
              </div>
              <label className="fl2">
                Enclosure Temperature (Measured by LM35 Sensor): <b>{boxTempC} °C</b> (Fan turns ON at ≥ 30 °C)
              </label>
              <input
                type="range"
                min="20"
                max="50"
                step="2"
                value={boxTempC}
                aria-label="Enclosure temperature Celsius"
                onChange={(e) => setBoxTempC(Number(e.target.value))}
              />
              <label className="fl2">
                PWM Speed Duty Cycle (% of time 12V switch is ON): <b>{pwmDuty}%</b>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={pwmDuty}
                aria-label="PWM speed duty cycle percentage"
                onChange={(e) => setPwmDuty(Number(e.target.value))}
              />
            </div>
          )}

          {/* LEGACY FALLBACK: PID Controller */}
          {resolvedId === 'robotics-pid' && (
            <div>
              <label className="fl2">
                P (Proportional Push on Current Error): <b>{kp}</b>
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={kp}
                aria-label="Proportional gain Kp"
                onChange={(e) => setKp(Number(e.target.value))}
              />
              <label className="fl2">
                I (Integral Correction for Steady Offset): <b>{ki}</b>
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={ki}
                aria-label="Integral gain Ki"
                onChange={(e) => setKi(Number(e.target.value))}
              />
              <label className="fl2">
                D (Derivative Braking to Prevent Overshoot): <b>{kd}</b>
              </label>
              <input
                type="range"
                min="0"
                max="80"
                value={kd}
                aria-label="Derivative gain Kd"
                onChange={(e) => setKd(Number(e.target.value))}
              />
            </div>
          )}
        </div>
      </div>

      {/* =====================================================================
          QUESTION 3: WHAT HAPPENS WHEN I INTERACT WITH IT? (Live Result)
          ===================================================================== */}
      <div
        style={{
          padding: '12px',
          borderRadius: '12px',
          background: 'var(--tile)',
          marginBottom: '12px'
        }}
      >
        <span className="tag" style={{ marginTop: 0 }}>
          👀 3. What happens when I interact with it? (Simulated Output)
        </span>
        <div className="out" role="status" style={{ marginTop: '8px', marginBottom: 0 }}>
          {simResult.whatHappened}
        </div>
      </div>

      {/* =====================================================================
          QUESTION 4: WHY DID THAT HAPPEN? (+ Step 3: Short Knowledge Check)
          ===================================================================== */}
      <div
        style={{
          padding: '12px',
          borderRadius: '12px',
          border: '1px solid var(--line)'
        }}
      >
        <span className="tag" style={{ marginTop: 0 }}>
          💡 4. Why did that happen?
        </span>
        <div className="kp" style={{ marginTop: '8px', marginBottom: '12px' }}>
          <b>Plain-English Breakdown:</b> {simResult.whyHappened}
        </div>

        {/* STEP 3: SHORT KNOWLEDGE CHECK */}
        {entry.knowledgeCheck && (
          <div
            style={{
              padding: '10px 12px',
              borderRadius: '10px',
              background: 'var(--tile)'
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
              <b style={{ fontSize: '.92rem' }}>
                {isKcDone ? '✅ ' : '🎓 '}Step 3 of 3 — Short Knowledge Check:
              </b>
              <div style={{ display: 'flex', gap: '6px' }}>
                {kcPicked !== null && kcPicked !== entry.knowledgeCheck.answer && (
                  <button
                    type="button"
                    className="go"
                    style={{ fontSize: '.74rem', padding: '4px 8px' }}
                    onClick={() => setKcPicked(null)}
                  >
                    🔄 Try Again
                  </button>
                )}
                <button
                  type="button"
                  className="go"
                  style={{ fontSize: '.74rem', padding: '4px 8px' }}
                  onClick={() => setKcShowHint((h) => !h)}
                >
                  {kcShowHint ? '🙈 Hide Hint' : '💡 Hint'}
                </button>
              </div>
            </div>

            <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: '.92rem' }}>
              {entry.knowledgeCheck.question}
            </p>

            {kcShowHint && (
              <div className="kp" style={{ marginBottom: '8px' }}>
                <b>💡 Hint:</b> {entry.knowledgeCheck.hint}
              </div>
            )}

            {optionOrder(entry.knowledgeCheck.options.length, `${resolvedId}-kc`).map((idx) => {
              const optText = entry.knowledgeCheck.options[idx];
              const isOk = idx === entry.knowledgeCheck.answer;
              let cls = 'opt';
              if (kcPicked === idx) {
                cls += isOk ? ' ok' : ' no';
              }
              return (
                <button
                  key={idx}
                  type="button"
                  className={cls}
                  onClick={() => setKcPicked(idx)}
                >
                  {optText}
                </button>
              );
            })}

            {kcPicked !== null && (
              <div className="kp" style={{ marginTop: '8px', marginBottom: 0 }}>
                <b>
                  {kcPicked === entry.knowledgeCheck.answer
                    ? '🎉 Correct! Concept Mastered:'
                    : '🔎 Let’s review why:'}
                </b>{' '}
                {entry.knowledgeCheck.explanation}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
