// Project Blueprints Catalog for Mech Bot
// Powers dynamic Learn Mode vs. Build Mode pathways grounded in AI Mech Lab's course materials.

export const PROJECT_BLUEPRINTS = {
  drone: {
    id: 'drone',
    name: 'a drone',
    target: 'a drone',
    emoji: '🚁',
    keywords: ['drone', 'quadcopter', 'multirotor', 'uav', 'flyer'],
    learnMode: {
      title: 'Learn Mode: how to build a drone',
      subtitle: 'A course MechTrack with step-by-step lessons',
      trackTitle: 'Drone Engineering & Control Foundations',
      description: 'Master the 4 mechatronic pillars, closed-loop stabilization, sensor fusion, and motor control essential for drones.',
      concepts: [
        'The 4 Mechatronic Pillars (Mechanical, Electrical, Software, Control)',
        'Closed-Loop Feedback Control & Disturbance Rejection (PDF Topic 1.2)',
        'Voltage, Current & LiPo Power Budgeting (PDF Topic 2.1)',
        'Analog vs. Digital IMU / Gyroscope Sampling (PDF Topic 3.1)',
        'Electronic Speed Controllers (ESCs) & PWM Motor Drivers (PDF Topic 4.1)'
      ],
      components: [
        'Quadcopter Frame (X or H geometry)',
        '4x Brushless DC Motors (CW & CCW matched)',
        '4x Electronic Speed Controllers (ESCs, 20A–30A)',
        'Flight Controller Board (with 6-axis IMU)',
        '3S / 4S LiPo Battery & Power Distribution Board',
        '2.4 GHz Radio Transmitter & Receiver'
      ],
      tools: [
        'Soldering station and heat-shrink tubing',
        'Precision hex screwdrivers (1.5mm, 2.0mm)',
        'Digital Multimeter for continuity and voltage checks',
        'Safety glasses for bench testing'
      ],
      lessons: [
        {
          title: 'Mechatronics 1.1: What Is Mechatronics? (The 4 Pillars)',
          courseKey: 'mechatronics',
          stepIndex: 0,
          topicId: 'mechatronics-m1-t1.1',
          summary: 'Learn how mechanics, circuits, software, and control loops come together in autonomous machines.'
        },
        {
          title: 'Mechatronics 1.2: Feedback Loops & Closed-Loop Stability',
          courseKey: 'mechatronics',
          stepIndex: 1,
          topicId: 'mechatronics-m1-t1.2',
          summary: 'Why flying drones require real-time feedback loops hundreds of times per second to stay level.'
        },
        {
          title: 'Mechatronics 2.1: Voltage, Current & Resistance (Power)',
          courseKey: 'mechatronics',
          stepIndex: 3,
          topicId: 'mechatronics-m2-t2.1',
          summary: 'Calculate current draw, avoid brownouts, and understand electrical power delivery.'
        },
        {
          title: 'Mechatronics 3.1: Sensors: Analog vs. Digital',
          courseKey: 'mechatronics',
          stepIndex: 7,
          topicId: 'mechatronics-m3-t3.1',
          summary: 'How flight controllers digitize continuous accelerometer and gyroscope motion readings.'
        },
        {
          title: 'Mechatronics 4.1: Actuators & Motor Speed Control',
          courseKey: 'mechatronics',
          stepIndex: 10,
          topicId: 'mechatronics-m4-t4.1',
          summary: 'Driving brushless motors through controller signals and dedicated high-current drivers.'
        }
      ],
      stops: [
        '4 Pillars of Drone Flight',
        'Feedback Loops & Stability',
        'Power & Current Budgeting',
        'Sensor & Gyro Digitization',
        'Motor Drivers & Actuation'
      ]
    },
    buildMode: {
      title: 'Build Mode: build a drone',
      subtitle: 'A project MechTrack with hands-on steps',
      trackTitle: 'Quadcopter Drone Build & Flight Test',
      stages: [
        {
          stepIndex: 0,
          stageTitle: 'Frame & Motor Assembly',
          instructions: 'Assemble the quadcopter frame arms securely. Mount the 4 brushless motors with threadlocker, ensuring correct alternating CW and CCW placement across diagonals.',
          checkpoint: 'Verify all motor shafts spin freely by hand with zero wobble and frame geometry is symmetrical.',
          linkedLesson: 'Mechatronics 1.1: The 4 Pillars',
          courseKey: 'mechatronics',
          lessonStepIndex: 0
        },
        {
          stepIndex: 1,
          stageTitle: 'PDB & ESC Power Wiring',
          instructions: 'Solder the 4 Electronic Speed Controllers to the Power Distribution Board (PDB). Use a multimeter to perform a continuity check between battery positive and ground to verify zero short circuits before plugging in any battery.',
          checkpoint: 'Multimeter continuity check reads open circuit (no beep / infinite resistance) between VCC and GND.',
          linkedLesson: 'Mechatronics 2.1: Circuits & Ohm’s Law',
          courseKey: 'mechatronics',
          lessonStepIndex: 3
        },
        {
          stepIndex: 2,
          stageTitle: 'Flight Controller & IMU Mounting',
          instructions: 'Mount the flight controller centrally on vibration-dampening rubber standoffs with the forward orientation arrow pointing toward the front arms. Connect the 4 ESC signal wires to PWM outputs 1–4.',
          checkpoint: 'Flight controller powers up, IMU self-test passes on a flat level surface, and sensor readings respond accurately.',
          linkedLesson: 'Mechatronics 3.1: Analog vs. Digital Sensors',
          courseKey: 'mechatronics',
          lessonStepIndex: 7
        },
        {
          stepIndex: 3,
          stageTitle: 'Radio Link & Motor Direction Bench Test',
          instructions: 'Bind your radio receiver. WITHOUT PROPELLERS ATTACHED, power up the system and test motor rotation directions using low throttle pulses. Swap any two motor wires on reverse-spinning motors to correct rotation.',
          checkpoint: 'Motor 1 (rear-right) CCW, Motor 2 (front-right) CW, Motor 3 (rear-left) CW, Motor 4 (front-left) CCW. Arm switch immediately cuts motors.',
          linkedLesson: 'Mechatronics 4.1: Actuators & Drivers',
          courseKey: 'mechatronics',
          lessonStepIndex: 10
        },
        {
          stepIndex: 4,
          stageTitle: 'Propeller Installation & Hover Maiden Flight',
          instructions: 'Secure matching CW and CCW propellers with locknuts. Move to a wide open, clear outdoor space. Arm the drone, increase throttle gently, and verify steady hover at 1 meter altitude.',
          checkpoint: 'Drone lifts off vertically, stays level with stick inputs, and lands smoothly upon lowering throttle.',
          linkedLesson: 'Mechatronics 1.2: Real-World Systems',
          courseKey: 'mechatronics',
          lessonStepIndex: 1
        }
      ],
      stops: [
        'Frame & Motor Assembly',
        'PDB & ESC Power Wiring',
        'Flight Controller Mounting',
        'Motor Direction Bench Test',
        'Propeller Setup & Maiden Hover'
      ]
    }
  },

  robot: {
    id: 'robot',
    name: 'an obstacle robot',
    target: 'an obstacle robot',
    emoji: '🤖',
    keywords: ['robot', 'obstacle', 'rover', 'mobile robot', 'car', 'wheeled robot', 'arduino robot'],
    learnMode: {
      title: 'Learn Mode: how to build an obstacle robot',
      subtitle: 'A course MechTrack with step-by-step lessons',
      trackTitle: 'Mobile Robotics & Autonomous Navigation',
      description: 'Learn sensor reading, distance thresholds, motor H-bridges, and decision logic for autonomous robots.',
      concepts: [
        'Ultrasonic Time-of-Flight Distance Measurement (PDF Topic 3.2)',
        'H-Bridge Motor Drivers & Dual DC Gearmotors (PDF Topic 4.1)',
        'Voltage Dividers & Power Distribution (PDF Topic 2.2)',
        'Microcontroller Digital GPIO & PWM Speed Control (PDF Topic 3.3)',
        'Control Logic & Obstacle Avoidance Decisions (PDF AI Topic 2.1)'
      ],
      components: [
        '2WD / 4WD Robot Chassis with DC Gearmotors',
        'L298N or TB6612FNG Dual H-Bridge Motor Driver',
        'HC-SR04 Ultrasonic Distance Sensor',
        'Microcontroller (Arduino Uno / Nano / ESP32)',
        'Battery Holder (4x AA or 2x 18650 Li-Ion)',
        'Front Caster Wheel and Breadboard/Jumper Wires'
      ],
      tools: [
        'Phillips screwdriver',
        'Wire strippers',
        'Multimeter',
        'USB programming cable'
      ],
      lessons: [
        {
          title: 'Mechatronics 1.3: The Mechatronics Design Process',
          courseKey: 'mechatronics',
          stepIndex: 2,
          topicId: 'mechatronics-m1-t1.3',
          summary: 'From requirements to chassis prototyping and integration.'
        },
        {
          title: 'Mechatronics 2.1: Voltage, Current & Resistance',
          courseKey: 'mechatronics',
          stepIndex: 3,
          topicId: 'mechatronics-m2-t2.1',
          summary: 'Sizing battery packs and calculating motor stall current.'
        },
        {
          title: 'Mechatronics 3.2: Common Sensor Types (Ultrasonic)',
          courseKey: 'mechatronics',
          stepIndex: 8,
          topicId: 'mechatronics-m3-t3.2',
          summary: 'Using 40 kHz sound waves to calculate distance: d = (t × 0.0343) / 2.'
        },
        {
          title: 'Mechatronics 4.1: What Is an Actuator? (Motors & H-Bridges)',
          courseKey: 'mechatronics',
          stepIndex: 10,
          topicId: 'mechatronics-m4-t4.1',
          summary: 'H-bridge switching for forward, reverse, and skid-steering turns.'
        },
        {
          title: 'AI 2.1: Python & Control Logic Essentials',
          courseKey: 'ai',
          stepIndex: 3,
          topicId: 'ai-m2-t2.1',
          summary: 'Conditional if/else logic for sensor thresholds and direction decisions.'
        }
      ],
      stops: [
        'Mechatronic Design Process',
        'Power & Motor Current',
        'Ultrasonic Sensor Timing',
        'H-Bridge Motor Control',
        'Control Logic & Obstacle Rules'
      ]
    },
    buildMode: {
      title: 'Build Mode: build an obstacle robot',
      subtitle: 'A project MechTrack with hands-on steps',
      trackTitle: 'Obstacle-Avoiding Robot Build',
      stages: [
        {
          stepIndex: 0,
          stageTitle: 'Chassis & Gearmotor Assembly',
          instructions: 'Attach the DC gearmotors, rubber wheels, and front caster ball to the acrylic/aluminum base plate.',
          checkpoint: 'Wheels rotate freely and chassis sits level on flat ground.',
          linkedLesson: 'Mechatronics 1.3: Design Process',
          courseKey: 'mechatronics',
          lessonStepIndex: 2
        },
        {
          stepIndex: 1,
          stageTitle: 'H-Bridge Driver Wiring',
          instructions: 'Wire motor terminals to H-bridge OUT1–OUT4. Connect IN1–IN4 to microcontroller digital pins and ENA/ENB to PWM pins.',
          checkpoint: 'Test motor spin in software: forward, backward, left spin, right spin.',
          linkedLesson: 'Mechatronics 4.1: Actuator Drivers',
          courseKey: 'mechatronics',
          lessonStepIndex: 10
        },
        {
          stepIndex: 2,
          stageTitle: 'Ultrasonic Sensor Integration',
          instructions: 'Mount the HC-SR04 forward on the front bumper. Connect VCC to 5V, GND to GND, Trig to D9, Echo to D10.',
          checkpoint: 'Serial monitor prints live distance readings accurately between 5 cm and 100 cm.',
          linkedLesson: 'Mechatronics 3.2: Sensor Types',
          courseKey: 'mechatronics',
          lessonStepIndex: 8
        },
        {
          stepIndex: 3,
          stageTitle: 'Avoidance Algorithm Coding',
          instructions: 'Code autonomous logic: Drive forward while distance > 20 cm. If an obstacle is detected within 20 cm, stop, reverse briefly, turn right 90°, and resume.',
          checkpoint: 'Robot reliably turns away from walls and cardboard boxes without collision.',
          linkedLesson: 'AI 2.1: Python & Logic',
          courseKey: 'ai',
          lessonStepIndex: 3
        },
        {
          stepIndex: 4,
          stageTitle: 'Obstacle Course Verification',
          instructions: 'Set up an obstacle trial with 3 barriers. Verify the robot navigates the area smoothly on battery power.',
          checkpoint: 'Continuous autonomous navigation for at least 60 seconds with 0 collisions.',
          linkedLesson: 'Mechatronics 1.2: Real Systems',
          courseKey: 'mechatronics',
          lessonStepIndex: 1
        }
      ],
      stops: [
        'Chassis & Motors',
        'H-Bridge Wiring',
        'Ultrasonic Sensor Mount',
        'Avoidance Logic Code',
        'Obstacle Course Trial'
      ]
    }
  },

  chatbot: {
    id: 'chatbot',
    name: 'an AI chatbot',
    target: 'an AI chatbot',
    emoji: '💬',
    keywords: ['chatbot', 'ai chatbot', 'assistant', 'bot', 'conversational ai', 'nlp'],
    learnMode: {
      title: 'Learn Mode: how to build an AI chatbot',
      subtitle: 'A course MechTrack with step-by-step lessons',
      trackTitle: 'AI Foundations & Conversational Systems',
      description: 'Understand rule-based AI vs. ML vs. Deep Learning, text representation, vector embeddings, and classification confidence.',
      concepts: [
        'Rule-Based AI vs. Machine Learning vs. Deep Learning (PDF Topic 1.1)',
        'Data Bias & Limitation in Training Corpora (PDF Topic 1.3)',
        'Text Vectors & Dot Product Similarity (PDF Topic 3.1)',
        'Probability, Softmax & Prediction Confidence (PDF Topic 3.2)',
        'Multi-Class Intent Classification (PDF Topic 4.3)'
      ],
      components: [
        'Python 3 runtime & virtual environment',
        'Intent training dataset (intents, patterns, responses JSON)',
        'Tokenization & vector embedding model',
        'Classifier engine (linear / neural classifier)',
        'Chat UI or API endpoint'
      ],
      tools: [
        'Python (VS Code / Jupyter / terminal)',
        'NumPy and scikit-learn',
        'JSON data editor'
      ],
      lessons: [
        {
          title: 'AI 1.1: What Is AI, ML, and Deep Learning?',
          courseKey: 'ai',
          stepIndex: 0,
          topicId: 'ai-m1-t1.1',
          summary: 'Rule-based if/else conversational trees vs. probabilistic language models.'
        },
        {
          title: 'AI 1.3: Data Bias, Overfitting & AI Limitations',
          courseKey: 'ai',
          stepIndex: 2,
          topicId: 'ai-m1-t1.3',
          summary: 'Why language models hallucinate or fail when tested on out-of-domain prompts.'
        },
        {
          title: 'AI 2.2: NumPy Array Operations & Matrix Basics',
          courseKey: 'ai',
          stepIndex: 4,
          topicId: 'ai-m2-t2.2',
          summary: 'Representing words and phrases as numerical arrays for mathematical comparison.'
        },
        {
          title: 'AI 3.1: Linear Algebra & Vector Dot Products',
          courseKey: 'ai',
          stepIndex: 5,
          topicId: 'ai-m3-t3.1',
          summary: 'Calculating cosine similarity between user queries and stored intent vectors.'
        },
        {
          title: 'AI 4.3: Classification & Confidence Scoring',
          courseKey: 'ai',
          stepIndex: 9,
          topicId: 'ai-m4-t4.3',
          summary: 'Mapping query embeddings to target intent classes with confidence thresholds.'
        }
      ],
      stops: [
        'AI vs ML vs Deep Learning',
        'Data Bias & Intent Quality',
        'NumPy Arrays for Text',
        'Vector Similarity & Angles',
        'Intent Classification'
      ]
    },
    buildMode: {
      title: 'Build Mode: build an AI chatbot',
      subtitle: 'A project MechTrack with hands-on steps',
      trackTitle: 'Custom AI Chatbot Development',
      stages: [
        {
          stepIndex: 0,
          stageTitle: 'Intent Taxonomy & Corpus Design',
          instructions: 'Draft an intents.json structure with categories (greetings, product info, troubleshooting, fallback) and at least 5 sample user utterances per intent.',
          checkpoint: 'JSON validates cleanly with distinct, non-overlapping intent definitions.',
          linkedLesson: 'AI 1.1: What Is AI?',
          courseKey: 'ai',
          lessonStepIndex: 0
        },
        {
          stepIndex: 1,
          stageTitle: 'Text Preprocessing & Bag-of-Words',
          instructions: 'Write Python functions to clean, lowercase, tokenize words, and transform queries into numerical feature vectors.',
          checkpoint: 'Test tokenization correctly outputs consistent vector representations for sample sentences.',
          linkedLesson: 'AI 2.2: NumPy Basics',
          courseKey: 'ai',
          lessonStepIndex: 4
        },
        {
          stepIndex: 2,
          stageTitle: 'Vector Similarity & Intent Matching',
          instructions: 'Implement dot-product cosine similarity to find the closest matching intent vector from the training corpus.',
          checkpoint: 'Queries with synonyms match the correct intent with similarity score > 0.80.',
          linkedLesson: 'AI 3.1: Vector Dot Products',
          courseKey: 'ai',
          lessonStepIndex: 5
        },
        {
          stepIndex: 3,
          stageTitle: 'Confidence Threshold & Fallback Handling',
          instructions: 'Add safety checks: If highest prediction confidence is < 0.65, trigger a graceful clarification fallback message rather than guessing.',
          checkpoint: 'Gibberish or out-of-scope inputs reliably trigger the fallback handler.',
          linkedLesson: 'AI 4.3: Classification & Confidence',
          courseKey: 'ai',
          lessonStepIndex: 9
        },
        {
          stepIndex: 4,
          stageTitle: 'Interactive Chatbot Demo Session',
          instructions: 'Connect the matcher to a terminal loop or web chat interface and execute a multi-turn conversation trial.',
          checkpoint: 'Demonstrate accurate responses across all core intents with responsive replies.',
          linkedLesson: 'AI 4.4: Capstone Integration',
          courseKey: 'ai',
          lessonStepIndex: 10
        }
      ],
      stops: [
        'Intent Taxonomy & Corpus',
        'Text Tokenization Vectors',
        'Vector Similarity Matching',
        'Confidence & Fallbacks',
        'Interactive Chatbot Demo'
      ]
    }
  },

  temperature: {
    id: 'temperature',
    name: 'a temperature alarm',
    target: 'a temperature alarm',
    emoji: '🌡️',
    keywords: ['temp', 'temperature', 'alarm', 'thermistor', 'thermostat', 'sensor monitor'],
    learnMode: {
      title: 'Learn Mode: how to build a temperature alarm',
      subtitle: 'A course MechTrack with step-by-step lessons',
      trackTitle: 'Sensors, Voltage Dividers & Threshold Alarms',
      description: 'Learn voltage dividers, thermistors, analog-to-digital conversion, and actuator alert triggers.',
      concepts: [
        'Ohm’s Law & Resistor Networks (PDF Topic 2.1)',
        'Thermistors & Voltage Dividers (PDF Topic 2.2 & 3.2)',
        'Microcontroller 10-bit ADC Sampling (PDF Topic 3.1)',
        'Noise Filtering with Multi-Sample Averaging (PDF Topic 3.3)',
        'Driving Buzzers & Status LEDs (PDF Topic 4.1)'
      ],
      components: [
        'NTC Thermistor (10 kΩ)',
        '10 kΩ Fixed Precision Resistor',
        'Microcontroller (Arduino or similar)',
        'Active Piezo Buzzer & Red/Green LEDs',
        'Breadboard and jumper wires'
      ],
      tools: [
        'Multimeter for resistance measurement',
        'USB programming cable'
      ],
      lessons: [
        {
          title: 'Mechatronics 2.1: Voltage, Current, and Resistance',
          courseKey: 'mechatronics',
          stepIndex: 3,
          topicId: 'mechatronics-m2-t2.1',
          summary: 'Ohm’s Law fundamentals and current limiting for indicators.'
        },
        {
          title: 'Mechatronics 2.2: Series vs. Parallel Circuits',
          courseKey: 'mechatronics',
          stepIndex: 4,
          topicId: 'mechatronics-m2-t2.2',
          summary: 'Voltage divider design: Vout = Vin × R2 / (R1 + R2).'
        },
        {
          title: 'Mechatronics 3.1: Analog vs. Digital Sensors',
          courseKey: 'mechatronics',
          stepIndex: 7,
          topicId: 'mechatronics-m3-t3.1',
          summary: 'Mapping continuous 0–5V sensor signals to 10-bit integer steps (0–1023).'
        },
        {
          title: 'Mechatronics 3.3: Reading Sensor Data & Noise Averaging',
          courseKey: 'mechatronics',
          stepIndex: 9,
          topicId: 'mechatronics-m3-t3.3',
          summary: 'Software noise filtering using 16-sample running averages.'
        },
        {
          title: 'Mechatronics 4.1: Actuators, Buzzers & Drivers',
          courseKey: 'mechatronics',
          stepIndex: 10,
          topicId: 'mechatronics-m4-t4.1',
          summary: 'Driving audible buzzers and optical warnings on limit breach.'
        }
      ],
      stops: [
        'Ohm’s Law Essentials',
        'Voltage Divider Circuits',
        'ADC 10-Bit Sampling',
        'Sensor Noise Averaging',
        'Actuators & Alarm Triggers'
      ]
    },
    buildMode: {
      title: 'Build Mode: build a temperature alarm',
      subtitle: 'A project MechTrack with hands-on steps',
      trackTitle: 'Smart Temperature Alarm Build',
      stages: [
        {
          stepIndex: 0,
          stageTitle: 'Thermistor Voltage Divider Wiring',
          instructions: 'Place the 10 kΩ NTC thermistor and 10 kΩ fixed resistor in series across 5V and GND. Connect the midpoint between them to analog pin A0.',
          checkpoint: 'At room temperature (~25°C), multimeter measures ~2.50V at the divider midpoint.',
          linkedLesson: 'Mechatronics 2.2: Voltage Dividers',
          courseKey: 'mechatronics',
          lessonStepIndex: 4
        },
        {
          stepIndex: 1,
          stageTitle: 'ADC Reading & Calibration',
          instructions: 'Write Arduino code to read analogRead(A0) and convert ADC steps (0–1023) into measured temperature in Celsius.',
          checkpoint: 'Serial monitor prints stable room temperature reading around 22°C–25°C.',
          linkedLesson: 'Mechatronics 3.1: Analog vs Digital',
          courseKey: 'mechatronics',
          lessonStepIndex: 7
        },
        {
          stepIndex: 2,
          stageTitle: 'Noise Smoothing Filter',
          instructions: 'Implement a 16-sample running average function to eliminate sensor spikes and electrical jitter.',
          checkpoint: 'Temperature readings fluctuate by no more than ±0.2°C.',
          linkedLesson: 'Mechatronics 3.3: Sensor Averaging',
          courseKey: 'mechatronics',
          lessonStepIndex: 9
        },
        {
          stepIndex: 3,
          stageTitle: 'Buzzer & Alert LED Wiring',
          instructions: 'Connect a piezo buzzer and red warning LED to digital output pins via current-limiting resistors.',
          checkpoint: 'Test tone activates cleanly on manual pin trigger.',
          linkedLesson: 'Mechatronics 4.1: Actuator Outputs',
          courseKey: 'mechatronics',
          lessonStepIndex: 10
        },
        {
          stepIndex: 4,
          stageTitle: 'Thermal Trigger Verification',
          instructions: 'Set trip threshold to 30°C. Touch the thermistor with your fingertips to raise its temperature and verify the buzzer sounds immediately.',
          checkpoint: 'Buzzer sounds when temperature exceeds 30°C and silences when temperature cools down.',
          linkedLesson: 'Mechatronics 1.2: Feedback Systems',
          courseKey: 'mechatronics',
          lessonStepIndex: 1
        }
      ],
      stops: [
        'Voltage Divider Wiring',
        'ADC Calibration',
        'Noise Smoothing Filter',
        'Buzzer & LED Wiring',
        'Thermal Trigger Test'
      ]
    }
  }
};

/**
 * Resolves a blueprint by keyword or dynamically constructs one for arbitrary project requests.
 */
export function getOrGenerateProjectBlueprint(query = '') {
  const q = String(query).toLowerCase().trim();

  // 1. Check known blueprints
  for (const bp of Object.values(PROJECT_BLUEPRINTS)) {
    if (bp.keywords.some((k) => q.includes(k))) {
      return bp;
    }
  }

  // 2. Extract cleaned project name
  let name = q
    .replace(/^(how to build|i want to build|build me|help me build|build|make|create|design)\s*(a|an)?\s*/i, '')
    .replace(/[.?!]+$/, '')
    .trim();

  if (!name || name.length < 2) {
    name = 'custom mechatronic system';
  }

  const capitalized = name.replace(/\b\w/g, (c) => c.toUpperCase());

  // 3. Generate dynamic blueprint leveraging Mechatronics 4 Pillars & Design Process
  return {
    id: 'custom-' + name.replace(/[^a-z0-9]+/g, '-'),
    name: name,
    target: name,
    emoji: '🛠️',
    keywords: [name.toLowerCase()],
    learnMode: {
      title: `Learn Mode: how to build ${name}`,
      subtitle: 'A course MechTrack with step-by-step lessons',
      trackTitle: `${capitalized} Engineering Foundations`,
      description: `Understand the system requirements, power budget, sensors, and actuators needed to build ${name}.`,
      concepts: [
        'The 4 Mechatronic Pillars (Mechanical, Electrical, Software, Control)',
        'The 6-Step Mechatronics Design Process (PDF Topic 1.3)',
        'Voltage, Current & Power Delivery (PDF Topic 2.1)',
        'Sensor Signal Conditioning & Digitization (PDF Topic 3.1)',
        'Actuators, Power Drivers & Feedback Loops (PDF Topic 4.1)'
      ],
      components: [
        `Custom Chassis / Structural Frame for ${name}`,
        'Microcontroller / Processor unit',
        'Dedicated Sensors for feedback monitoring',
        'Actuators (Motors, Servos, or Solenoids)',
        'Regulated Power Supply / Battery source'
      ],
      tools: [
        'Hand tools and fastener set',
        'Digital Multimeter',
        'Soldering and wiring tools',
        'Code development environment'
      ],
      lessons: [
        {
          title: 'Mechatronics 1.1: What Is Mechatronics? (The 4 Pillars)',
          courseKey: 'mechatronics',
          stepIndex: 0,
          topicId: 'mechatronics-m1-t1.1',
          summary: 'Structure your project across mechanical, electrical, software, and control pillars.'
        },
        {
          title: 'Mechatronics 1.3: The 6-Step Design Process',
          courseKey: 'mechatronics',
          stepIndex: 2,
          topicId: 'mechatronics-m1-t1.3',
          summary: 'Follow the engineering design cycle from requirements to working prototype.'
        },
        {
          title: 'Mechatronics 2.1: Voltage, Current, and Resistance',
          courseKey: 'mechatronics',
          stepIndex: 3,
          topicId: 'mechatronics-m2-t2.1',
          summary: 'Calculate electrical loads and select safe power delivery components.'
        },
        {
          title: 'Mechatronics 3.1: Sensors: Analog vs. Digital',
          courseKey: 'mechatronics',
          stepIndex: 7,
          topicId: 'mechatronics-m3-t3.1',
          summary: 'Select and digitize inputs for closed-loop perception.'
        },
        {
          title: 'Mechatronics 4.1: Actuators, Motors & Drivers',
          courseKey: 'mechatronics',
          stepIndex: 10,
          topicId: 'mechatronics-m4-t4.1',
          summary: 'Power high-current actuators through safe driver stages.'
        }
      ],
      stops: [
        'The 4 System Pillars',
        '6-Step Design Process',
        'Power & Circuit Sizing',
        'Sensors & Signal Input',
        'Actuation & Driver Stages'
      ]
    },
    buildMode: {
      title: `Build Mode: build ${name}`,
      subtitle: 'A project MechTrack with hands-on steps',
      trackTitle: `${capitalized} Build & Verification`,
      stages: [
        {
          stepIndex: 0,
          stageTitle: 'System Requirements & Frame Assembly',
          instructions: `Define physical constraints, weight limits, and assemble the primary chassis/enclosure for ${name}.`,
          checkpoint: 'Structure is rigid, stable, and ready to house electronic modules.',
          linkedLesson: 'Mechatronics 1.3: Design Process',
          courseKey: 'mechatronics',
          lessonStepIndex: 2
        },
        {
          stepIndex: 1,
          stageTitle: 'Power Budgeting & Circuit Setup',
          instructions: 'Wire the main power rail and measure voltages with a multimeter before connecting sensitive chips.',
          checkpoint: 'All supply lines read within ±5% of target operating voltage.',
          linkedLesson: 'Mechatronics 2.1: Circuits & Power',
          courseKey: 'mechatronics',
          lessonStepIndex: 3
        },
        {
          stepIndex: 2,
          stageTitle: 'Sensor Interfacing & Sampling',
          instructions: 'Mount feedback sensors and write initial reading routines to log live data.',
          checkpoint: 'Sensors report clear, responsive data through serial output.',
          linkedLesson: 'Mechatronics 3.1: Sensors',
          courseKey: 'mechatronics',
          lessonStepIndex: 7
        },
        {
          stepIndex: 3,
          stageTitle: 'Actuator Integration & Driver Control',
          instructions: 'Connect motors, servos, or drivers to the controller and test actuation commands.',
          checkpoint: 'Actuators respond predictably with smooth motion and zero thermal overload.',
          linkedLesson: 'Mechatronics 4.1: Actuators',
          courseKey: 'mechatronics',
          lessonStepIndex: 10
        },
        {
          stepIndex: 4,
          stageTitle: 'Closed-Loop Tuning & Final Trial',
          instructions: 'Combine sensors and actuators into a closed loop. Execute a comprehensive operational test.',
          checkpoint: 'System completes full operating cycle autonomously.',
          linkedLesson: 'Mechatronics 1.2: Feedback Systems',
          courseKey: 'mechatronics',
          lessonStepIndex: 1
        }
      ],
      stops: [
        'System Design & Chassis',
        'Power Supply Wiring',
        'Sensor Integration',
        'Actuator Hookup',
        'Closed-Loop Trial'
      ]
    }
  };
}
