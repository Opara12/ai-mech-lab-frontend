// Beginner-Friendly Concept Explorer Catalog for all 22 PDF-supported topics
// Grounded 100% in the uploaded AI Basics (11 PDFs) and Mechatronics (11 PDFs) course materials.

export const AI_EXPLORER_TOPICS = [
  {
    topicId: 'ai-m1-t1.1',
    code: '1.1',
    shortLabel: '1.1 AI vs. ML vs. Deep Learning',
    title: 'How AI, Machine Learning, and Deep Learning Fit Together'
  },
  {
    topicId: 'ai-m1-t1.2',
    code: '1.2',
    shortLabel: '1.2 Predictive Maintenance',
    title: 'Real-World AI: Reactive vs. Scheduled vs. Predictive Maintenance'
  },
  {
    topicId: 'ai-m1-t1.3',
    code: '1.3',
    shortLabel: '1.3 Data Bias & AI Limits',
    title: 'How Skewed Training Data Creates Skewed AI Decisions'
  },
  {
    topicId: 'ai-m2-t2.1',
    code: '2.1',
    shortLabel: '2.1 Python Variables, Loops & Functions',
    title: 'Storing, Looping, and Converting Sensor Data in Python'
  },
  {
    topicId: 'ai-m2-t2.2',
    code: '2.2',
    shortLabel: '2.2 NumPy Array Operations',
    title: 'Converting an Entire Sensor Array at Once with NumPy'
  },
  {
    topicId: 'ai-m3-t3.1',
    code: '3.1',
    shortLabel: '3.1 Vectors, Matrices & Shapes',
    title: 'Sensor Vectors, Data Grids (Matrices), and Shape Matching'
  },
  {
    topicId: 'ai-m3-t3.2',
    code: '3.2',
    shortLabel: '3.2 Probability & Standard Deviation',
    title: 'Handling Uncertainty, Averages (Mean), and Sensor Outliers'
  },
  {
    topicId: 'ai-m4-t4.1',
    code: '4.1',
    shortLabel: '4.1 Supervised vs. Unsupervised',
    title: 'Learning with Labeled Answers vs. Grouping Unlabeled Data'
  },
  {
    topicId: 'ai-m4-t4.2',
    code: '4.2',
    shortLabel: '4.2 Linear Regression Line Fitting',
    title: 'Predicting Motor Temperature from Load with a Straight Line'
  },
  {
    topicId: 'ai-m4-t4.3',
    code: '4.3',
    shortLabel: '4.3 Classification & Confidence',
    title: 'Sorting Healthy vs. Worn Bearings with Probability Scores'
  },
  {
    topicId: 'ai-m4-t4.4',
    code: '4.4',
    shortLabel: '4.4 Capstone: Dual Motor Predictor',
    title: 'Combining Temperature Regression + Failure Classification'
  }
];

export const MECHATRONICS_EXPLORER_TOPICS = [
  {
    topicId: 'mechatronics-m1-t1.1',
    code: '1.1',
    shortLabel: '1.1 The 4 Pillars & Automatic Gate',
    title: 'How Mechanical, Electrical, Software, and Control Work Together'
  },
  {
    topicId: 'mechatronics-m1-t1.2',
    code: '1.2',
    shortLabel: '1.2 Elevator & Drone Feedback',
    title: 'Closed-Loop Feedback in Elevators, CNCs, and Drones'
  },
  {
    topicId: 'mechatronics-m1-t1.3',
    code: '1.3',
    shortLabel: '1.3 The 6-Step Design Process',
    title: 'Designing and Testing a Conveyor-Stop Prototype'
  },
  {
    topicId: 'mechatronics-m2-t2.1',
    code: '2.1',
    shortLabel: '2.1 Ohm’s Law & LED Resistor',
    title: 'Voltage (Push), Current (Flow), Resistance, and Protecting an LED'
  },
  {
    topicId: 'mechatronics-m2-t2.2',
    code: '2.2',
    shortLabel: '2.2 Series vs. Parallel Circuits',
    title: 'Single-Path Series Loops vs. Independent Parallel Branches'
  },
  {
    topicId: 'mechatronics-m2-t2.3',
    code: '2.3',
    shortLabel: '2.3 Essential Circuit Components',
    title: 'How Resistors, Capacitors, Diodes, and Transistors Behave'
  },
  {
    topicId: 'mechatronics-m2-t2.4',
    code: '2.4',
    shortLabel: '2.4 Datasheets & Multimeter Probing',
    title: 'Checking Safe Current Limits and Probing Voltage vs. Current'
  },
  {
    topicId: 'mechatronics-m3-t3.1',
    code: '3.1',
    shortLabel: '3.1 Analog vs. Digital & 10-Bit ADC',
    title: 'Turning a Smooth Sensor Voltage into a Digital Number (0–1023)'
  },
  {
    topicId: 'mechatronics-m3-t3.2',
    code: '3.2',
    shortLabel: '3.2 The 6 Sensor Families',
    title: 'Thermistor Dividers, Ultrasonic Echoes, and Choosing Sensors'
  },
  {
    topicId: 'mechatronics-m3-t3.3',
    code: '3.3',
    shortLabel: '3.3 4-Step Sensor Reading & Noise',
    title: 'Wire, Read, Convert, and Average 16 Readings to Tame Noise'
  },
  {
    topicId: 'mechatronics-m4-t4.1',
    code: '4.1',
    shortLabel: '4.1 Actuators, Drivers & Cooling Fan',
    title: 'Why a Microcontroller Pin Needs a Driver to Spin a 12V Fan'
  }
];

export const CONCEPT_EXPLORER_CATALOG = {
  // ===========================================================================
  // AREA 1: AI CONCEPT EXPLORER (11 PDF TOPICS)
  // ===========================================================================
  'ai-m1-t1.1': {
    area: 'ai',
    areaBadge: '🧠 AI Concept Explorer · Topic 1.1',
    pdfSource: 'AI_Course_Module1_Topic1.1_WhatIsAIMLDL.pdf',
    title: 'AI vs. Machine Learning vs. Deep Learning: How a Computer Learns "Cat"',
    whatLearning:
      'Artificial Intelligence (AI) is the broad goal of making machines act smart. Rule-Based AI follows step-by-step instructions written by a human. Machine Learning (ML) learns patterns from examples instead of fixed rules. Deep Learning (DL) uses a multi-layer neural network to learn directly from raw photos or sound.',
    keyTerms: [
      { term: 'Rule-Based AI', def: 'A program where a human writes every "if this, then that" rule by hand.' },
      { term: 'Machine Learning (ML)', def: 'A system that improves at a task by finding patterns in training examples.' },
      { term: 'Deep Learning (DL)', def: 'A subset of ML using stacked layers of artificial neurons to spot complex patterns in raw images or audio.' }
    ],
    diagramSrc: '/assets/courses/ai/images/m1-t1.1/m1-t1.1-img-03.png',
    diagramCaption: 'From Topic 1.1 PDF: A neural network with an input layer, hidden layers that extract features, and an output layer.',
    whatToDo:
      '1. Make your prediction below about why hand-written rules struggle with cat photos. 2. Switch between Rule-Based AI, Classical ML, and Deep Learning and slide the number of training photos to compare how each method responds. 3. Answer the short knowledge check at the end.',
    prediction: {
      question: 'Before you test: Why is it nearly impossible to write "if/else" rules by hand to recognize every cat in real photos?',
      options: [
        'Because cats appear curled up, in shadows, or from the side, breaking fixed shape rules',
        'Because computers cannot display photos of animals',
        'Because Python does not support if/else statements'
      ],
      answer: 0,
      hint: 'Think about what happens to a rule like "if two pointed ears are visible" when a cat is photographed from behind or in dim light.',
      explanation: 'Exactly! As Topic 1.1 explains, every hand-written rule ("pointed ears, whiskers") has endless real-world exceptions. Machine Learning and Deep Learning solve this by learning directly from thousands of varied cat and non-cat photos.'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: Which statement accurately describes how AI, Machine Learning, and Deep Learning relate to one another?',
      options: [
        'Deep Learning is a specialized type of Machine Learning, and Machine Learning is a subset of AI',
        'Rule-Based chess programs and Deep Learning are the exact same thing',
        'Machine Learning works without any data at all'
      ],
      answer: 0,
      hint: 'Picture three nested circles: the largest outer circle is AI, the middle circle is ML, and the inner circle is DL.',
      explanation: 'Spot on! AI is the broadest umbrella, Machine Learning is the data-driven subset inside AI, and Deep Learning is the multi-layer neural network subset inside Machine Learning.'
    }
  },

  'ai-m1-t1.2': {
    area: 'ai',
    areaBadge: '🧠 AI Concept Explorer · Topic 1.2',
    pdfSource: 'AI_Course_Module1_Topic1.2_RealWorldUseCases.pdf',
    title: 'Real-World AI: Reactive vs. Scheduled vs. Predictive Maintenance',
    whatLearning:
      'In factories and power plants, equipment eventually wears out. Topic 1.2 compares three ways to maintain machines: Reactive (wait until it breaks), Scheduled (replace parts on a fixed calendar whether worn or not), and AI Predictive Maintenance (use vibration and temperature sensor streams to service the machine right before a failure happens).',
    keyTerms: [
      { term: 'Reactive Maintenance', def: 'Fixing a machine only after it breaks down—causing expensive unplanned downtime.' },
      { term: 'Scheduled Maintenance', def: 'Replacing parts on a fixed schedule, which often throws away healthy parts too early.' },
      { term: 'Predictive Maintenance', def: 'Using AI to monitor live sensor data (vibration, heat) and alert engineers when early wear begins.' }
    ],
    diagramSrc: '/assets/courses/ai/images/m1-t1.2/m1-t1.2-img-02.png',
    diagramCaption: 'From Topic 1.2 PDF: Three approaches to maintenance: reactive, scheduled, and predictive.',
    whatToDo:
      '1. Predict which maintenance strategy catches a failing motor bearing earliest without wasting healthy parts. 2. Select Reactive, Scheduled, or Predictive Maintenance in the simulation and increase Motor Vibration & Heat to see what happens.',
    prediction: {
      question: 'Before you test: What happens if a bearing wears out faster than normal under a Scheduled (fixed-calendar) maintenance plan?',
      options: [
        'The machine can still break down before the scheduled service date arrives',
        'The calendar automatically repairs the bearing',
        'Vibration sensors are only used in reactive maintenance'
      ],
      answer: 0,
      hint: 'A calendar does not know how hard the motor worked this week or whether a bearing is starting to rattle early.',
      explanation: 'Correct! Fixed schedules either service machines too late (if wear happens early) or too soon (wasting good parts). Predictive maintenance watches the actual condition of the machine in real time.'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: What do Predictive Maintenance, Generative Design, and Industrial Vision Inspection all have in common in Topic 1.2?',
      options: [
        'They find patterns across sensor or design data at a scale and speed no human could track manually',
        'They replace all sensors with manual clipboards',
        'They only work on office spreadsheets, not physical machines'
      ],
      answer: 0,
      hint: 'Think about why a human cannot watch 10,000 vibration readings per second across 500 factory motors.',
      explanation: 'Correct! In all three engineering use cases, AI processes continuous data streams or thousands of design variations to catch patterns early.'
    }
  },

  'ai-m1-t1.3': {
    area: 'ai',
    areaBadge: '🧠 AI Concept Explorer · Topic 1.3',
    pdfSource: 'AI_Course_Module1_Topic1.3_EthicsAndLimitations.pdf',
    title: 'AI Ethics & Limitations: Why Skewed Data Produces a Skewed Model',
    whatLearning:
      'When a normal program fails, a programmer wrote a bad rule. When a Machine Learning model is unfair or inaccurate, it is usually because its training data was skewed or incomplete! As Topic 1.3 shows (like Amazon’s historical resume screener), an ML model faithfully copies whatever bias exists in its past examples.',
    keyTerms: [
      { term: 'Training Data Bias', def: 'When the examples used to train a model over-represent one group or condition and leave out others.' },
      { term: 'Shortcut Learning', def: 'When an AI latches onto an accidental background clue (like lighting or ruler marks) instead of the real object.' },
      { term: 'Human-in-the-Loop', def: 'Keeping a qualified human reviewer in charge of high-stakes decisions rather than trusting AI blindly.' }
    ],
    diagramSrc: '/assets/courses/ai/images/m1-t1.3/m1-t1.3-img-02.png',
    diagramCaption: 'From Topic 1.3 PDF: Skewed or unbalanced training data produces a skewed model, and a skewed model produces unbalanced outcomes.',
    whatToDo:
      '1. Predict what happens when a model is trained on 90% indoor bright-light images and tested outdoors. 2. Slide the Training Data Balance slider from Skewed (15%) to Balanced (50%) and toggle Human Review to see the effect on fairness and reliability.',
    prediction: {
      question: 'Before you test: Why did the historical resume-screening AI in Topic 1.3 penalize qualified female engineering applicants?',
      options: [
        'Because it was trained on 10 years of past resumes that were mostly from men, so it learned that historical imbalance as its pattern',
        'Because someone typed an explicit rule saying "reject women"',
        'Because neural networks cannot read text files'
      ],
      answer: 0,
      hint: 'Remember: Machine Learning models learn patterns from past data—even patterns we do not want them to copy!',
      explanation: 'Exactly! Nobody wrote a biased rule in the code; the model learned the historical skew in the 10-year dataset. Fixing AI bias requires auditing and balancing the training data.'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: In high-stakes engineering or medical settings, how should AI predictions be used according to Topic 1.3?',
      options: [
        'As decision support checked by a human expert, after auditing the training data for gaps and bias',
        'With zero human oversight because AI is purely mathematical and neutral',
        'By hiding errors whenever the model is less than 100% sure'
      ],
      answer: 0,
      hint: 'Think about whether math alone makes a model fair if the input data itself was lopsided.',
      explanation: 'Right! A model is only as reliable as the data it learned from, so high-stakes systems require diverse training data, testing on edge cases, and human oversight.'
    }
  },

  'ai-m2-t2.1': {
    area: 'ai',
    areaBadge: '🧠 AI Concept Explorer · Topic 2.1',
    pdfSource: 'AI_Course_Module2_Topic2.1_PythonEssentials.pdf',
    title: 'Python Essentials: Variables, Loops & Functions for Sensor Data',
    whatLearning:
      'Topic 2.1 introduces the three building blocks of Python used in every AI script: Variables (labeled boxes that store a number, text, or True/False), Loops (repeating an action across a list of sensor readings without copying code), and Functions (packaging a formula like Celsius-to-Fahrenheit so you can reuse it anytime).',
    keyTerms: [
      { term: 'Variable', def: 'A named label that holds a value, such as sensor_reading = 42.' },
      { term: 'For Loop', def: 'A command that steps through every item in a list one by one.' },
      { term: 'Function (def)', def: 'A reusable block of code that takes an input, runs a calculation, and returns the result.' }
    ],
    diagramSrc: '/assets/courses/ai/images/m2-t2.1/m2-t2.1-img-02.png',
    diagramCaption: 'From Topic 2.1 PDF: Three variables holding three different types of data (integer, text string, and boolean True/False).',
    whatToDo:
      '1. Predict what happens when you assign a new number to an existing variable. 2. Adjust the Celsius temperature slider to feed different values into the Topic 2.1 Python function convert_to_fahrenheit(celsius) and watch how Python computes the output.',
    prediction: {
      question: 'Before you test: If your Python script runs sensor_reading = 42 on line 1, and then sensor_reading = 45 on line 2, what does print(sensor_reading) output?',
      options: [
        '45 (the new value overwrites the old value in the variable)',
        '42 (variables can never change once created)',
        '87 (Python automatically adds them together)'
      ],
      answer: 0,
      hint: 'Think of a variable like a whiteboard label—writing a new value replaces what was written there before.',
      explanation: 'Correct! In Python, assigning a new value to sensor_reading updates the stored value from 42 to 45.'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: Why do AI engineers put formulas like fahrenheit = (celsius * 9/5) + 32 inside a def convert_to_fahrenheit(celsius): function?',
      options: [
        'So they can write and test the logic once, then reuse it on any new sensor reading by calling the function name',
        'Because Python cannot multiply numbers outside a function',
        'To make the computer run slower'
      ],
      answer: 0,
      hint: 'What happens if you copy-paste the same formula 20 times and later need to change it?',
      explanation: 'Exactly! Functions package reusable logic in one place so your code stays clean, readable, and easy to update.'
    }
  },

  'ai-m2-t2.2': {
    area: 'ai',
    areaBadge: '🧠 AI Concept Explorer · Topic 2.2',
    pdfSource: 'AI_Course_Module2_Topic2.2_NumPyBasics.pdf',
    title: 'NumPy Basics: Operating on Entire Sensor Arrays Simultaneously',
    whatLearning:
      'A regular Python list makes you loop through numbers one at a time. Topic 2.2 shows how a NumPy Array (np.array) applies math to every number in the list at the exact same time—and gives you instant summary tools like .shape, .mean() (average), .max(), and .min().',
    keyTerms: [
      { term: 'NumPy Array (np.array)', def: 'A high-speed grid of numbers where one math formula updates every value at once.' },
      { term: 'Array Shape (.shape)', def: 'Tells you the dimensions of your data grid, such as (3, 3) for 3 rows and 3 columns.' },
      { term: 'Vectorized Operation', def: 'Doing math on a whole array in a single line like (readings * 9/5) + 32 without a for-loop.' }
    ],
    diagramSrc: '/assets/courses/ai/images/m2-t2.2/m2-t2.2-img-03.png',
    diagramCaption: 'From Topic 2.2 PDF: One operation applied to every value in the NumPy array simultaneously.',
    whatToDo:
      '1. Predict what (readings * 9/5) + 32 does when readings is a NumPy array of 4 temperatures. 2. Slide the Temperature Calibration Offset and toggle Fahrenheit Conversion on the PDF array [20, 22, 19, 25] to watch all 4 numbers and their .mean(), .min(), and .max() update at once.',
    prediction: {
      question: 'Before you test: In Topic 2.2, if readings = np.array([20, 22, 19, 25]), how many lines of math does it take in NumPy to convert all 4 readings to Fahrenheit?',
      options: [
        'Just one expression: (readings * 9/5) + 32 converts every element at once',
        'Four separate equations, one for each number',
        'NumPy can only convert the first number in an array'
      ],
      answer: 0,
      hint: 'Look at the diagram from Topic 2.2 above—one operation is applied to every box in the array simultaneously.',
      explanation: 'Spot on! With a NumPy array, (readings * 9/5) + 32 converts all 4 temperatures in one step without needing a for-loop or .append().'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: If sensor_grid is a 2D NumPy array with 3 rows of sensors and 3 columns of readings per row, what does sensor_grid.shape return?',
      options: [
        '(3, 3)',
        '9',
        '[42, 45, 41]'
      ],
      answer: 0,
      hint: '.shape always reports (number of rows, number of columns).',
      explanation: 'Correct! In Topic 2.2, a 3-row by 3-column 2D array has .shape equal to (3, 3).'
    }
  },

  'ai-m3-t3.1': {
    area: 'ai',
    areaBadge: '🧠 AI Concept Explorer · Topic 3.1',
    pdfSource: 'AI_Course_Module3_Topic3.1_LinearAlgebraEssentials.pdf',
    title: 'Linear Algebra: Sensor Vectors, Matrices, and Shape Matching',
    whatLearning:
      'In AI, a single snapshot of sensor readings like [22.5°C, 45% humidity, 1013 hPa pressure] is called a Vector—a list of numbers where each position has a fixed meaning. Stacking multiple snapshots creates a Matrix (grid). Topic 3.1 teaches the most important rule in AI math: to multiply two matrices with np.dot(matrix_a, matrix_b), the inner dimensions must match!',
    keyTerms: [
      { term: 'Vector', def: 'A 1D list of numbers where each slot has a specific meaning, e.g. [Temperature, Humidity, Pressure].' },
      { term: 'Matrix', def: 'A 2D table formed by stacking multiple vectors as rows (rows = readings, columns = features).' },
      { term: 'Inner Dimension Rule', def: 'To multiply Matrix A (rows_A, cols_A) by Matrix B (rows_B, cols_B), cols_A MUST equal rows_B.' }
    ],
    diagramSrc: '/assets/courses/ai/images/m3-t3.1/m3-t3.1-img-02.png',
    diagramCaption: 'From Topic 3.1 PDF: A vector—each position carries a specific, consistent meaning (22.5°C, 45%, 1013 hPa).',
    whatToDo:
      '1. Predict when two matrices can be multiplied together. 2. Adjust the Columns of Matrix A and Rows of Matrix B in the simulation until their inner numbers match (e.g. 4 and 4) to make np.dot(matrix_a, matrix_b) succeed!',
    prediction: {
      question: 'Before you test: Suppose Matrix A has shape (3, 4) — 3 sensor snapshots with 4 features each. What must the first dimension (rows) of Matrix B be for np.dot(matrix_a, matrix_b) to work?',
      options: [
        '4 rows — because the inner dimensions (3, 4) and (4, something) must match',
        '3 rows — because the first numbers must match',
        'Any size works in matrix multiplication'
      ],
      answer: 0,
      hint: 'Write the two shapes side by side: (3, 4) × (rows_B, 2). Which two numbers sit next to each other in the middle?',
      explanation: 'Exactly! As Topic 3.1 highlights, the most common error in AI coding is a shape mismatch. A (3, 4) matrix can only multiply a (4, something) matrix.'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: In the vector sensor_reading = np.array([22.5, 45, 1013]) from Topic 3.1, why does the order of the numbers matter?',
      options: [
        'Because the model expects each position to always represent the same feature (Position 0 = Temp, Position 1 = Humidity, Position 2 = Pressure)',
        'Because NumPy automatically sorts vectors from smallest to largest',
        'The order does not matter as long as the three numbers are present'
      ],
      answer: 0,
      hint: 'What would happen if you accidentally put 1013 (air pressure) into Position 0 where the model expects temperature in °C?',
      explanation: 'Correct! Every position in a feature vector has a fixed meaning. Swapping positions feeds air pressure into the temperature slot and ruins the prediction.'
    }
  },

  'ai-m3-t3.2': {
    area: 'ai',
    areaBadge: '🧠 AI Concept Explorer · Topic 3.2',
    pdfSource: 'AI_Course_Module3_Topic3.2_ProbabilityAndStatistics.pdf',
    title: 'Probability & Statistics: Confidence Scores, Mean, and Outliers',
    whatLearning:
      'AI models deal with uncertainty, not 100% certainty. Topic 3.2 explains how models output Probabilities between 0 (impossible) and 1 (certain) that add up to 1.0 (like {"cat": 0.94, "dog": 0.04, "bird": 0.02}), and how Mean (average) and Standard Deviation (spread) help you spot wild sensor spikes before they confuse your model.',
    keyTerms: [
      { term: 'Probability (0 to 1)', def: 'How likely an outcome is: 0 means impossible, 1 means certain, and 0.94 means 94% confident.' },
      { term: 'Mean (.mean())', def: 'The average value of a dataset (sum of all readings divided by how many readings there are).' },
      { term: 'Standard Deviation (.std())', def: 'Measures how spread out the numbers are from the average. Low = tight & consistent; High = wide spread or outlier spike.' }
    ],
    diagramSrc: '/assets/courses/ai/images/m3-t3.2/m3-t3.2-img-03.png',
    diagramCaption: 'From Topic 3.2 PDF: A model assigns a probability to every possible category, then picks the highest.',
    whatToDo:
      '1. Predict what happens to Standard Deviation when one sensor reading spikes to 200. 2. Slide the 6th Sensor Reading in the Topic 3.2 dataset [42, 45, 41, 50, 47, x] between 45 (normal) and 200 (spike) and watch the Mean and Standard Deviation change live!',
    prediction: {
      question: 'Before you test: Look at the Topic 3.2 sensor dataset [42, 45, 41, 50, 47, 200]. Five readings sit near 45, while one reading is 200. What does that 200 do to the Standard Deviation (.std())?',
      options: [
        'It makes the Standard Deviation jump dramatically higher, warning you that the data has a huge spread/outlier',
        'It makes the Standard Deviation drop to 0',
        'Standard deviation ignores numbers larger than 100'
      ],
      answer: 0,
      hint: 'Standard deviation measures how far the numbers spread out from the average.',
      explanation: 'Spot on! Without the 200 spike, the readings [42, 45, 41, 50, 47] have a tiny spread (std ≈ 3.3). When the 6th reading spikes to 200, std jumps over 58—alerting you to a sensor glitch!'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: If an image classifier outputs predictions = {"cat": 0.94, "dog": 0.04, "bird": 0.02}, what do the three probabilities add up to?',
      options: [
        '1.00 (100% total probability across all possible categories)',
        '0.94',
        '3.00'
      ],
      answer: 0,
      hint: 'Add 0.94 + 0.04 + 0.02 together.',
      explanation: 'Correct! Probabilities across all mutually exclusive choices add up to 1.0 (100%), and the model picks "cat" because 0.94 is the highest score.'
    }
  },

  'ai-m4-t4.1': {
    area: 'ai',
    areaBadge: '🧠 AI Concept Explorer · Topic 4.1',
    pdfSource: 'AI_Course_Module4_Topic4.1_SupervisedVsUnsupervised.pdf',
    title: 'Supervised vs. Unsupervised Learning: Do You Have Labels?',
    whatLearning:
      'Topic 4.1 teaches the biggest fork in Machine Learning: Supervised Learning trains on data where every example already has the known right answer attached (a Label, like historical house prices or known machine failures). Unsupervised Learning is used when you have raw data with NO labels at all, and ask the computer to group similar readings into clusters on its own.',
    keyTerms: [
      { term: 'Features (Inputs)', def: 'The measurements you feed into the model, such as house size (sq ft) and number of bedrooms.' },
      { term: 'Label (Target Output)', def: 'The known correct answer paired with each training example, such as the actual sale price ($275,000).' },
      { term: 'Unsupervised Clustering', def: 'Grouping unlabeled sensor readings by similarity to spot unusual behavior when no failure labels exist.' }
    ],
    diagramSrc: '/assets/courses/ai/images/m4-t4.1/m4-t4.1-img-02.png',
    diagramCaption: 'From Topic 4.1 PDF: Features (size, bedrooms) paired with a known label (price) in Supervised Learning.',
    whatToDo:
      '1. Predict whether predicting house prices from labeled sales history is Supervised or Unsupervised. 2. Switch between the Topic 4.1 Supervised House Price Predictor (adjusting sq ft & bedrooms) and Unsupervised Sensor Clustering to compare how they work.',
    prediction: {
      question: 'Before you test: What is the very first question you should ask when looking at a new dataset in Topic 4.1?',
      options: [
        'Does this dataset have known correct answers (labels) attached to each row, or not?',
        'How many colors are in the chart?',
        'Was the data recorded on a Monday or Tuesday?'
      ],
      answer: 0,
      hint: 'If you have labels, a teacher "supervises" the training; if you have no labels, the model explores on its own.',
      explanation: 'Exactly! As Topic 4.1 states: if known answers (labels) are attached, you are in Supervised Learning. If there are no labels at all, you are in Unsupervised Learning.'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: A factory has 50,000 hours of motor vibration logs, but nobody ever wrote down when faults happened (no labels). Which approach from Topic 4.1 can still help?',
      options: [
        'Unsupervised Learning — it groups normal readings into a cluster and flags readings that drift far outside that cluster',
        'Supervised Learning — because Supervised Learning never needs labels',
        'Throw away the sensors because unlabeled data cannot be analyzed'
      ],
      answer: 0,
      hint: 'When labels are too expensive or missing, which type of learning finds natural clusters and anomalies on its own?',
      explanation: 'Correct! Unsupervised learning discovers what "normal" clusters look like and flags unusual readings without needing pre-labeled failure records.'
    }
  },

  'ai-m4-t4.2': {
    area: 'ai',
    areaBadge: '🧠 AI Concept Explorer · Topic 4.2',
    pdfSource: 'AI_Course_Module4_Topic4.2_Regression.pdf',
    title: 'Regression: Fitting a Straight Line to Predict Motor Temperature',
    whatLearning:
      'Regression is supervised learning where the answer is a continuous number along a range (like temperature in °C, watts, or fuel burn). Topic 4.2 shows how linear regression fits a straight line through motor data using the formula: prediction = (slope × input) + intercept.',
    keyTerms: [
      { term: 'Regression', def: 'Predicting a continuous number on a scale (like 54.5°C), rather than a category.' },
      { term: 'Slope', def: 'How much the predicted temperature rises for each 1% increase in motor load.' },
      { term: 'Intercept', def: 'The starting baseline value when the input (motor load) is at zero.' }
    ],
    diagramSrc: '/assets/courses/ai/images/m4-t4.2/m4-t4.2-img-02.png',
    diagramCaption: 'From Topic 4.2 PDF: Motor load (%) vs. temperature (°C), with the best-fit line drawn through the points.',
    whatToDo:
      '1. Predict whether motor temperature rises or falls as load increases in the Topic 4.2 dataset. 2. Adjust the Slope and Baseline Intercept sliders to fit the 5 real PDF data points (Load [20, 40, 60, 80, 100]% → Temp [35, 42, 51, 58, 67]°C) until Average Error drops below 1.0°C!',
    prediction: {
      question: 'Before you test: In the Topic 4.2 dataset, load_percent = [20, 40, 60, 80, 100] and temperature_c = [35, 42, 51, 58, 67]. What does each +20% jump in motor load do to the motor’s temperature?',
      options: [
        'It pushes the temperature up by roughly 8°C (about 0.4°C per 1% of load)',
        'It cools the motor down by 10°C',
        'Temperature stays stuck at 35°C regardless of load'
      ],
      answer: 0,
      hint: 'Compare 20% load (35°C) to 100% load (67°C): the temperature rose by 32°C across an 80% load increase (32 / 80 = 0.4).',
      explanation: 'Spot on! Every 1% increase in load adds about 0.4°C (the slope), starting from a baseline intercept near 26.6°C.'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: Which of these engineering problems is a Regression task according to Topic 4.2?',
      options: [
        'Predicting how many watts a solar panel will output given sunlight intensity and panel temperature',
        'Deciding whether a part on a conveyor belt is "Pass" or "Fail"',
        'Sorting motor faults into "Electrical", "Mechanical", or "Thermal"'
      ],
      answer: 0,
      hint: 'Ask the Topic 4.2 test: Can the answer be any number along a continuous range, including decimals in between?',
      explanation: 'Correct! Solar output in watts is a continuous numerical measurement (Regression), whereas Pass/Fail or fault types are discrete categories (Classification).'
    }
  },

  'ai-m4-t4.3': {
    area: 'ai',
    areaBadge: '🧠 AI Concept Explorer · Topic 4.3',
    pdfSource: 'AI_Course_Module4_Topic4.3_Classification(1).pdf',
    title: 'Classification: Predicting Healthy vs. Worn Bearings with Confidence Scores',
    whatLearning:
      'Classification is the other branch of supervised learning: instead of predicting a number, it predicts a category (like "Healthy" vs. "Worn" bearing). Topic 4.3 shows that a classifier actually calculates a confidence probability first (e.g., 0.92 Worn vs. 0.08 Healthy) from sensor inputs like vibration, temperature, and noise.',
    keyTerms: [
      { term: 'Binary Classification', def: 'Choosing between exactly two categories, such as Healthy vs. Worn or Pass vs. Fail.' },
      { term: 'Multi-Class Classification', def: 'Choosing among three or more categories, such as Electrical, Mechanical, or Thermal fault.' },
      { term: 'Decision Boundary', def: 'The dividing line the model draws between "Healthy" sensor readings and "Worn" sensor readings.' }
    ],
    diagramSrc: '/assets/courses/ai/images/m4-t4.3/m4-t4.3-img-03.png',
    diagramCaption: 'From Topic 4.3 PDF: Sensor readings (vibration, temperature, noise_db) feeding into the classifier to produce a category and confidence score.',
    whatToDo:
      '1. Predict why overall accuracy can be misleading when faults are rare. 2. Slide the Bearing Vibration (mm/s) and Temperature (°C) from the Topic 4.3 code example (vibration = 4.2, temperature = 71) to watch the model’s confidence score cross the decision boundary into "Worn (92% confidence)"!',
    prediction: {
      question: 'Before you test: In Topic 4.3, suppose only 2% of bearings in a factory are actually faulty. If a broken model simply guesses "Healthy" every single time, what is its accuracy—and why is it useless?',
      options: [
        'It gets 98% accuracy, yet misses 100% of the actual faulty bearings it was built to catch!',
        'It gets 0% accuracy',
        'It catches every fault automatically'
      ],
      answer: 0,
      hint: 'If 98 out of 100 bearings are healthy and you always say "Healthy", you are right 98 times out of 100—but what happens to the 2 faulty ones?',
      explanation: 'Exactly! Topic 4.3 emphasizes this crucial lesson: on unbalanced data, raw accuracy can hide the fact that a model is missing the dangerous faults.'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: What is the difference between a model predicting "Worn" with 0.92 (92%) confidence vs. 0.55 (55%) confidence?',
      options: [
        '0.92 is a strong, clear-cut signal, while 0.55 vs. 0.45 is a borderline call sitting right near the dividing line',
        'Both mean the model is 100% certain',
        '0.55 is more confident than 0.92'
      ],
      answer: 0,
      hint: 'How close is 55% to a 50/50 coin flip?',
      explanation: 'Right! Checking the underlying probability tells you whether the sensor reading is deep inside the worn zone (92%) or sitting right on the borderline (55%).'
    }
  },

  'ai-m4-t4.4': {
    area: 'ai',
    areaBadge: '🧠 AI Concept Explorer · Topic 4.4',
    pdfSource: 'AI_Course_Module4_Topic4.4_PredictOutcomeCapstone.pdf',
    title: 'Capstone Explorer: One Motor Dataset, Two Predictions (Temp + Failure Risk)',
    whatLearning:
      'In the Topic 4.4 Capstone Project, you monitor a fleet of industrial motors using three sensor features: runtime_hrs, load_pct, and vibration. You feed those exact same three features into TWO models at once: a LinearRegression model to predict temperature (°C) and a LogisticRegression model to predict the probability of failure within 30 days.',
    keyTerms: [
      { term: 'Shared Input Features (X)', def: 'The three columns [runtime_hrs, load_pct, vibration] used as inputs by both models.' },
      { term: 'Dual Labels (y_temp & y_fail)', def: 'Two different target columns: continuous temperature (°C) for regression and 0/1 failure for classification.' },
      { term: 'Sanity Check (Step 5)', def: 'Comparing the model’s prediction (e.g., 76°C and 89% failure risk) against real-world patterns in your data before acting.' }
    ],
    diagramSrc: '/assets/courses/ai/images/m4-t4.4/m4-t4.4-img-03.png',
    diagramCaption: 'From Topic 4.4 PDF: Three feature columns (runtime_hrs, load_pct, vibration) feeding two separate label columns (temp_c and failed_within_30d).',
    whatToDo:
      '1. Predict why running both regression and classification gives a better picture than running only one. 2. Adjust Runtime Hours, Load %, and Vibration in the simulation to reproduce the Topic 4.4 Capstone motor reading (~76°C predicted temperature and ~89% failure probability)!',
    prediction: {
      question: 'Before you test: In Topic 4.4, why do we train two separate models (one Regression, one Classification) on the same three motor sensor columns?',
      options: [
        'Because Regression tells us HOW HOT the motor will run (~76°C), while Classification tells us THE RISK OF FAILURE within 30 days (~89%)',
        'Because one model deletes the other model’s data',
        'Because LinearRegression can only read one column at a time'
      ],
      answer: 0,
      hint: 'Think about the two different questions a maintenance engineer asks: "What temperature will it reach?" (a number) and "Will it fail soon?" (Yes/No).',
      explanation: 'Exactly! Combining a continuous temperature forecast (~76°C) with a failure probability (~89%) gives engineers both the urgency and the physical context.'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: In Step 5 of the Capstone ("Sanity-check the predictions"), what should you do before trusting a model’s output?',
      options: [
        'Check whether the prediction lines up with the physical patterns in your training data (e.g., high load and high runtime pushing temp into the 70s)',
        'Trust every number blindly because sklearn wrote it',
        'Delete the training data after running fit()'
      ],
      answer: 0,
      hint: 'If a model predicted -40°C for a heavily loaded motor, would you trust it or inspect your data?',
      explanation: 'Spot on! Always hold predictions up against physical reality and the patterns visible in your data before taking action.'
    }
  },

  // ===========================================================================
  // AREA 2: MECHATRONICS CONCEPT EXPLORER (11 PDF TOPICS)
  // ===========================================================================
  'mechatronics-m1-t1.1': {
    area: 'mechatronics',
    areaBadge: '⚙️ Mechatronics Concept Explorer · Topic 1.1',
    pdfSource: 'Mechatronics_Course_Module1_Topic1.1_WhatIsMechatronics.pdf',
    title: 'The Four Pillars of Mechatronics: The Automatic Gate Simulation',
    whatLearning:
      'Topic 1.1 defines Mechatronics as the integration of four pillars: Mechanical (the physical gate arm and hinges), Electrical (the motor, power supply, and sensor wiring), Software (the decision logic that says "open when a car arrives"), and Control (the feedback loop that checks gate angle and stops the motor smoothly when fully open).',
    keyTerms: [
      { term: 'Mechanical Pillar', def: 'The physical structure, gears, hinges, and moving gate arm.' },
      { term: 'Electrical Pillar', def: 'The power source, motor windings, sensor, and wiring that carry energy and signals.' },
      { term: 'Software & Control Pillars', def: 'Software makes decisions ("open now"); Control continuously checks feedback so the gate stops at 90° without slamming.' }
    ],
    diagramSrc: '/assets/courses/mechatronics/images/m1-t1.1/m1-t1.1-img-03.jpg',
    diagramCaption: 'From Topic 1.1 PDF: All four pillars (Mechanical, Electrical, Software, Control) mapped onto one real mechanism.',
    whatToDo:
      '1. Predict what happens to the Automatic Gate in Topic 1.1 if you remove the Control pillar. 2. In the virtual gate simulation below, toggle the 4 Pillars on/off and slide the Approaching Car Distance below 3.0 meters to test the gate!',
    prediction: {
      question: 'Before you test: According to the Automatic Gate example in Topic 1.1, what happens if you build the gate with Mechanical, Electrical, and Software, but leave out the Control pillar?',
      options: [
        'The gate starts opening when a car arrives, but never knows when to stop—driving the motor until something breaks!',
        'The gate works 100% normally without Control',
        'The metal gate arm disappears'
      ],
      answer: 0,
      hint: 'Software says "start opening", but which pillar monitors how far the gate has swung so it stops at the right position?',
      explanation: 'Exact quote from Topic 1.1: "Remove the control pillar specifically, and you’d have a gate that opens but never knows when to stop — it would just keep driving the motor until something broke."'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: Why does Topic 1.1 emphasize learning Mechanical, Electrical, Software, and Control together rather than in isolation?',
      options: [
        'Because real design problems happen at the boundaries where the four pillars meet (like a heavy gate arm overloading a motor or needing slower control)',
        'Because mechatronic systems never use software',
        'So you only ever have to use one pillar'
      ],
      answer: 0,
      hint: 'Can you pick a motor (Electrical) or write control code without knowing how heavy the gate arm (Mechanical) is?',
      explanation: 'Correct! Every choice in one pillar affects the others—mechatronics is the art of designing all four as one connected system.'
    }
  },

  'mechatronics-m1-t1.2': {
    area: 'mechatronics',
    areaBadge: '⚙️ Mechatronics Concept Explorer · Topic 1.2',
    pdfSource: 'Mechatronics_Course_Module1_Topic1.2_RealWorldMechatronicSystems.pdf',
    title: 'Real-World Mechatronic Systems: Elevator & Drone Closed-Loop Control',
    whatLearning:
      'Topic 1.2 explores four real machines—Elevators, CNC Machines, Automotive Stability Control, and Drones. Across every single one, the secret to precision is Closed-Loop Feedback: sensors continuously measure the actual position or tilt, and the controller adjusts the motors until the gap between "where it is" and "where it should be" reaches zero.',
    keyTerms: [
      { term: 'Open-Loop (Blind Timer)', def: 'Running a motor for a fixed time and hoping it lands in the right spot, without checking a sensor.' },
      { term: 'Closed-Loop Feedback', def: 'Measuring the real output (like elevator floor height or drone tilt) and correcting the motor continuously.' },
      { term: 'Disturbance', def: 'An outside force—like 10 heavy passengers stepping into an elevator or a wind gust hitting a drone.' }
    ],
    diagramSrc: '/assets/courses/mechatronics/images/m1-t1.2/m1-t1.2-img-02.jpg',
    diagramCaption: 'From Topic 1.2 PDF: All four pillars mapped onto an elevator system that stops level with the floor regardless of passenger weight.',
    whatToDo:
      '1. Predict why an elevator needs closed-loop position feedback instead of a simple timer. 2. Switch between Open-Loop (Blind Timer) and Closed-Loop (Sensor Feedback) and adjust the Passenger Load / Wind Gust slider to see which mode keeps the elevator level with the floor!',
    prediction: {
      question: 'Before you test: Why does an elevator stop smoothly and level with the floor whether 1 person or 12 people are inside?',
      options: [
        'Because its control pillar uses position and speed feedback to adjust motor effort and braking in real time',
        'Because the hoist motor always runs on a fixed 4.0-second kitchen timer',
        'Because passengers weigh nothing inside an elevator'
      ],
      answer: 0,
      hint: 'If you ran a motor on a fixed timer, a heavy cab would move slower and stop short of the floor!',
      explanation: 'Correct! Closed-loop feedback continuously compares the cab’s actual height against the target floor and adjusts motor torque until it aligns within millimeters.'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: On a quadcopter drone in Topic 1.2, what happens in the milliseconds after a wind gust tilts the frame?',
      options: [
        'Sensors measure the tilt, software decides the response, and the control loop speeds up the dipped rotors to level the drone before the pilot even notices',
        'The pilot has to manually recalculate the voltage of all four motors with a calculator',
        'The drone shuts off all four propellers until the wind stops'
      ],
      answer: 0,
      hint: 'A quadcopter is inherently unstable—its flight controller corrects rotor speeds hundreds of times per second.',
      explanation: 'Spot on! All four pillars work together hundreds of times per second to keep the drone stable in flight.'
    }
  },

  'mechatronics-m1-t1.3': {
    area: 'mechatronics',
    areaBadge: '⚙️ Mechatronics Concept Explorer · Topic 1.3',
    pdfSource: 'Mechatronics_Course_Module1_Topic1.3_TheMechatronicsDesignProcess.pdf',
    title: 'The Mechatronics Design Process: Prototyping a Conveyor-Belt Stopper',
    whatLearning:
      'Topic 1.3 walks through the 6-step engineering design loop: (1) Define the problem (not the parts list), (2) Set constraints, (3) Assign the 4 pillars, (4) Build a rough prototype, (5) Test against your original success criteria, and (6) Iterate by tracing any failure back to the pillar that caused it.',
    keyTerms: [
      { term: 'Problem Statement (Step 1)', def: 'States WHAT must happen, under WHAT conditions, and WHAT counts as success (e.g. "Stop belt within 10 cm of edge").' },
      { term: 'Constraints (Step 2)', def: 'Real-world limits like budget, indoor/dusty environment, or running on a battery for 7 days.' },
      { term: 'Iteration (Step 6)', def: 'Testing the rough prototype, finding which pillar caused a failure (e.g. slow control vs. slipping belt), and fixing it.' }
    ],
    diagramSrc: '/assets/courses/mechatronics/images/m1-t1.3/m1-t1.3-img-03.jpg',
    diagramCaption: 'From Topic 1.3 PDF: The three parts every problem statement needs to answer before choosing components.',
    whatToDo:
      '1. Predict why a problem statement should not start with "Use an ultrasonic sensor and an Arduino". 2. Test the virtual Conveyor-Belt Stopper prototype by adjusting Sensor Trigger Distance and Brake Response so the box stops safely before the edge!',
    prediction: {
      question: 'Before you test: In Step 1 of Topic 1.3, why is "Use an ultrasonic sensor and an Arduino" a component list rather than a good problem statement?',
      options: [
        'Because it locks you into specific parts before you even define what the system needs to achieve or what environment it works in',
        'Because ultrasonic sensors do not exist',
        'Because engineers never use problem statements'
      ],
      answer: 0,
      hint: 'What if the factory is super noisy or dusty where a different sensor works better? Define the goal first!',
      explanation: 'Exactly! A problem statement defines what needs to happen, under what conditions, and what counts as success—leaving you free to pick the best parts for the job.'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: During Step 5 testing of the conveyor belt in Topic 1.3, the belt stops too late and drops the box. How do you fix it in Step 6?',
      options: [
        'Trace the failure back to the responsible pillar (e.g. did the Control loop react too slowly, or did the Mechanical brake slip?) and iterate',
        'Change the success criteria so dropping the box counts as a pass',
        'Skip testing and machine the final aluminum housing immediately'
      ],
      answer: 0,
      hint: 'Look at Step 6 in Topic 1.3: "trace that failure back to a pillar, fix it, test again."',
      explanation: 'Correct! Knowing the four pillars lets you diagnose whether a late stop is a sensing, software, control, or mechanical braking issue.'
    }
  },

  'mechatronics-m2-t2.1': {
    area: 'mechatronics',
    areaBadge: '⚙️ Mechatronics Concept Explorer · Topic 2.1',
    pdfSource: 'Mechatronics_Course_Module2_Topic2.1_VoltageCurrentResistance.pdf',
    title: 'Voltage, Current, Resistance & Sizing a Resistor for an LED',
    whatLearning:
      'Topic 2.1 explains the three core quantities in every circuit: Voltage (V, electrical push), Current (I, electrical flow measured in Amps or milliamps mA), and Resistance (R, restriction to flow in Ohms Ω). They are locked together by Ohm’s Law (V = I × R). You will use the exact worked example from the PDF: sizing a resistor to protect a 2V, 20 mA LED powered by a 5V source!',
    keyTerms: [
      { term: 'Voltage (V — The Push)', def: 'Electrical pressure difference between two points that pushes charge through a loop.' },
      { term: 'Current (I — The Flow)', def: 'How much charge flows per second, measured in Amps (A) or milliamps (1 A = 1,000 mA).' },
      { term: 'Resistance (R — The Restriction)', def: 'Opposition to current flow, measured in Ohms (Ω). Rearranging Ohm’s Law gives R = V / I.' }
    ],
    diagramSrc: '/assets/courses/mechatronics/images/m2-t2.1/m2-t2.1-img-02.jpg',
    diagramCaption: 'From Topic 2.1 PDF: Voltage is always measured as a difference between two points, and current flows only in a closed loop.',
    whatToDo:
      '1. Predict how much voltage the protective resistor must absorb when a 2V LED is connected to a 5V supply. 2. Set the Supply Voltage to 5.0 V and adjust the Resistance slider to 150 Ω (the exact PDF worked example) to achieve a safe 20.0 mA LED current!',
    prediction: {
      question: 'Before you test: In the Topic 2.1 worked example, you power a 2V LED from a 5V supply at 20 mA (0.02 A). How much leftover voltage must the resistor absorb, and what resistor value R = V / I do you need?',
      options: [
        '3V leftover across the resistor → R = 3V / 0.02A = 150 Ω',
        '5V across the resistor → R = 5000 Ω',
        '0V across the resistor → no resistor is needed'
      ],
      answer: 0,
      hint: '5V supply minus 2V used by the LED leaves 3V for the resistor. Now divide 3V by 0.02A!',
      explanation: 'Exact match with Topic 2.1! The resistor absorbs 5V − 2V = 3V, and R = 3V / 0.02A = 150 Ω limits the current to a safe 20 mA.'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: According to Ohm’s Law (I = V / R), what happens to the current (I) if you keep Voltage the same but double the Resistance (R)?',
      options: [
        'Current is cut in half (more restriction means less flow)',
        'Current doubles',
        'Current stays the same'
      ],
      answer: 0,
      hint: 'If you make a water pipe twice as narrow while keeping water pressure the same, does flow increase or decrease?',
      explanation: 'Correct! Increasing resistance restricts the flow, cutting the current in half.'
    }
  },

  'mechatronics-m2-t2.2': {
    area: 'mechatronics',
    areaBadge: '⚙️ Mechatronics Concept Explorer · Topic 2.2',
    pdfSource: 'Mechatronics_Course_Module2_Topic2.2_SeriesVsParallelCircuits.pdf',
    title: 'Series vs. Parallel Circuits: Single Path vs. Independent Branches',
    whatLearning:
      'Topic 2.2 compares the two ways components connect: in a Series circuit, parts sit end-to-end along one single path—the same current flows through every part, voltage splits between them, and if one part fails open, the whole circuit dies. In a Parallel circuit, each part has its own branch across the power source—every branch gets the full source voltage and keeps working even if another branch disconnects!',
    keyTerms: [
      { term: 'Series Circuit', def: 'One single loop. Current is identical everywhere, voltage splits across parts, and R_total = R₁ + R₂.' },
      { term: 'Parallel Circuit', def: 'Separate side-by-side branches. Each branch gets the full supply voltage and operates independently.' },
      { term: 'Open-Circuit Fault', def: 'When a component burns out or unplugs, breaking the path in that branch.' }
    ],
    diagramSrc: '/assets/courses/mechatronics/images/m2-t2.2/m2-t2.2-img-02.jpg',
    diagramCaption: 'From Topic 2.2 PDF: The same current flows through every component along a single series path.',
    whatToDo:
      '1. Predict what happens when one component fails in Series vs. Parallel. 2. Switch between Series and Parallel, adjust R₁ and R₂, and click "Test Component 1 Disconnect Fault" to see why robots wire sensors and controllers in parallel across power rails!',
    prediction: {
      question: 'Before you test: Why do engineers connect a robot’s microcontroller, sensors, and motor driver in Parallel across the power rails instead of in a single Series chain?',
      options: [
        'So every subsystem receives its full rated supply voltage and one part turning off does not cut power to the others',
        'Because parallel circuits use zero current',
        'Because series circuits require more wires than parallel circuits'
      ],
      answer: 0,
      hint: 'In Series, voltage splits up and one broken component stops current everywhere.',
      explanation: 'Exactly! In Parallel, each branch gets the full supply voltage and stays independent if another branch switches off.'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: In a Series circuit powered by a 9V battery with two identical resistors, what do the voltages across the two resistors add up to?',
      options: [
        '9V — voltage splits across series components (4.5V + 4.5V) and always sums back to the source voltage',
        '18V',
        '0V'
      ],
      answer: 0,
      hint: 'Look at the rule from Topic 2.2: "Voltage splits across series components but always sums back to the source voltage."',
      explanation: 'Spot on! In series, the voltage drops across each component always add up to the total source voltage.'
    }
  },

  'mechatronics-m2-t2.3': {
    area: 'mechatronics',
    areaBadge: '⚙️ Mechatronics Concept Explorer · Topic 2.3',
    pdfSource: 'Mechatronics_Course_Module2_Topic2.3_EssentialComponents.pdf',
    title: 'Essential Components: Resistors, Capacitors, Diodes & Transistors',
    whatLearning:
      'Topic 2.3 introduces the four core building blocks of electronics: Resistors (limit current), Capacitors (store and release charge to smooth out voltage dips), Diodes & LEDs (act as one-way valves so current flows only from Anode to Cathode), and Transistors (act as electronic switches where a tiny control signal switches a much larger load current).',
    keyTerms: [
      { term: 'Capacitor', def: 'Acts like a tiny rechargeable reservoir that fills with charge and releases it to smooth voltage dips.' },
      { term: 'Diode / LED', def: 'A one-way valve for current: lets current pass in Forward Bias and blocks it in Reverse Bias.' },
      { term: 'Transistor', def: 'An electronic switch with no moving parts—a small signal on its control leg switches a heavy load on or off.' }
    ],
    diagramSrc: '/assets/courses/mechatronics/images/m2-t2.3/m2-t2.3-img-03.jpg',
    diagramCaption: 'From Topic 2.3 PDF: A capacitor filling with charge, then releasing it back into the circuit to keep voltage steady.',
    whatToDo:
      '1. Predict what happens if a diode is installed backwards. 2. In the component test bench below, toggle Diode Direction (Forward vs. Reverse), Transistor Switch Signal (OFF vs. ON), and Capacitor Smoothing Value to observe how each component behaves!',
    prediction: {
      question: 'Before you test: What happens if you put a Diode (or LED) in backwards (Reverse-Biased) in a low-voltage DC circuit?',
      options: [
        'It acts like a closed one-way valve and blocks current from flowing through the loop',
        'It doubles the current in the circuit',
        'It turns into a capacitor'
      ],
      answer: 0,
      hint: 'Remember: a diode is a one-way valve for electric current.',
      explanation: 'Correct! A diode only conducts when installed in the forward direction (Anode positive, Cathode negative). Installed backwards, it blocks current.'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: Why do engineers place a Capacitor across the power pins near a microcontroller or motor in Topic 2.3?',
      options: [
        'To release stored charge during sudden current spikes so the supply voltage does not dip and reset the controller',
        'To permanently block all DC voltage from reaching the circuit',
        'To emit visible light like an LED'
      ],
      answer: 0,
      hint: 'Think of the capacitor diagram in Topic 2.3: it stores charge and releases it briefly when the supply dips.',
      explanation: 'Right! Decoupling/smoothing capacitors act like local charge reservoirs that keep the voltage rail steady.'
    }
  },

  'mechatronics-m2-t2.4': {
    area: 'mechatronics',
    areaBadge: '⚙️ Mechatronics Concept Explorer · Topic 2.4',
    pdfSource: 'Mechatronics_Course_Module2_Topic2.4_DatasheetsAndMultimeters.pdf',
    title: 'Datasheets & Multimeters: Motor Stall Current vs. Safe Transistor Limits',
    whatLearning:
      'Topic 2.4 teaches how to keep parts from burning up using two tools: (1) Reading a Datasheet’s Absolute Maximum Ratings (always design in the safe zone at roughly half the maximum limit, and check Motor Stall Current when a wheel jams!), and (2) Using a Digital Multimeter (measure Voltage in Parallel across a part, and Current in Series through the meter).',
    keyTerms: [
      { term: 'Absolute Maximum Rating', def: 'The ceiling in a datasheet beyond which a part can be permanently damaged (stay at ≤50% for safety!).' },
      { term: 'Stall Current', def: 'The huge surge of current a DC motor draws when its shaft is jammed and cannot spin.' },
      { term: 'Parallel vs. Series Probing', def: 'Measure Voltage across a component (Parallel); measure Current by breaking the loop so current flows through the meter (Series).' }
    ],
    diagramSrc: '/assets/courses/mechatronics/images/m2-t2.4/m2-t2.4-img-08.jpg',
    diagramCaption: 'From Topic 2.4 PDF: Voltage is measured across a component (parallel). Current is measured through the meter (series).',
    whatToDo:
      '1. Predict what happens in the Topic 2.4 worked example when a motor stalls against an 800 mA transistor. 2. Slide the Motor Mechanical Load from Free Spin (250 mA) to Jammed Stall (1,200 mA) and switch the Multimeter between Voltage (Parallel) and Current (Series)!',
    prediction: {
      question: 'Before you test: In the Topic 2.4 worked example, your transistor’s datasheet lists a maximum current of 800 mA. Your motor draws 250 mA while spinning freely, but 1,200 mA if the wheel gets jammed (stalled). What happens if the wheel jams?',
      options: [
        'The 1,200 mA stall current exceeds the 800 mA absolute maximum rating and destroys the transistor!',
        'The transistor safely ignores any current above 250 mA',
        'Stalled motors draw 0 mA of current'
      ],
      answer: 0,
      hint: 'Compare the 1,200 mA stall current to the transistor’s 800 mA ceiling!',
      explanation: 'Exact match with Topic 2.4! Free-spinning current (250 mA) looks safe, but stall current (1,200 mA) blows past the 800 mA limit. Always size drivers for stall current!'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: How must you connect your multimeter probes when measuring Resistance (Ω) or Continuity on a component?',
      options: [
        'Turn power OFF first, then place the probes across the component',
        'Leave high-voltage power ON and plug the probes into the current jack across the battery',
        'Only measure resistance while the motor is spinning at full speed'
      ],
      answer: 0,
      hint: 'Topic 2.4 safety rule: the meter injects its own tiny test current to measure resistance, so external circuit power must be OFF.',
      explanation: 'Correct! Always power off the circuit before measuring resistance or continuity, and never put a meter in Current mode directly across a voltage source.'
    }
  },

  'mechatronics-m3-t3.1': {
    area: 'mechatronics',
    areaBadge: '⚙️ Mechatronics Concept Explorer · Topic 3.1',
    pdfSource: 'Mechatronics_Course_Module3_Topic3.1_WhatIsASensorAnalogVsDigital.pdf',
    title: 'Sensors, Analog vs. Digital Signals, and the 10-Bit ADC Worked Example',
    whatLearning:
      'A sensor converts a physical measurement (like temperature) into an electrical signal. Analog sensors output a smooth, continuous voltage; Digital sensors output two states (LOW or HIGH). Because a microcontroller only understands numbers, its 10-bit ADC (Analog-to-Digital Converter) slices a 0–5 V range into 1,024 steps (0 to 1,023), where each step is ~4.9 mV.',
    keyTerms: [
      { term: 'Analog vs. Digital Signal', def: 'Analog varies smoothly across any voltage in its range; Digital has only two states: LOW (0) and HIGH (1).' },
      { term: '10-Bit ADC', def: 'Converts a 0–5 V analog voltage into a whole number from 0 to 1,023 (2¹⁰ = 1,024 steps).' },
      { term: 'ADC Resolution Limit', def: 'Because each step is ~4.9 mV wide, the ADC rounds to the nearest step (e.g. 35.0°C reads as step 71 → 34.67°C).' }
    ],
    diagramSrc: '/assets/courses/mechatronics/images/m3-t3.1/m3-t3.1-img-08.png',
    diagramCaption: 'From Topic 3.1 PDF: From sensor (35.0 °C → 0.350 V) to 10-bit ADC (step 71) to code: the reading lands on 34.67 °C because of the resolution limit.',
    whatToDo:
      '1. Predict why the 35.0°C worked example in Topic 3.1 lands on 34.67°C in code. 2. Slide the Room Temperature to 35.0°C in the simulation below to reproduce the exact Topic 3.1 chain: 35.0°C → 0.350 V → ADC Step 71 → 34.67°C!',
    prediction: {
      question: 'Before you test: In Topic 3.1, a temperature sensor outputs 0.350 V at 35.0°C. The 10-bit ADC turns 0.350 V into integer step 71, which converts back to 34.67°C. Why is there a 0.33°C difference?',
      options: [
        'Because the 10-bit ADC can only report whole-number steps (each step is ~4.9 mV or ~0.49°C), not fractions of a step',
        'Because the temperature sensor is broken',
        'Because 35 minus 71 equals 34.67'
      ],
      answer: 0,
      hint: 'Can an integer between 0 and 1,023 store 71.68, or must it round to step 71?',
      explanation: 'Spot on! As Topic 3.1 explains: "That is not a fault. It is the resolution limit at work. Each ADC step here equals about 0.49 °C."'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: How many distinct integer steps does a 10-bit ADC have, and what is the highest number it reports?',
      options: [
        '1,024 levels, numbered from 0 to 1,023',
        '10 levels, numbered 1 to 10',
        '100 levels, numbered 0 to 100'
      ],
      answer: 0,
      hint: '2¹⁰ = 1,024 total values, starting at 0.',
      explanation: 'Correct! A 10-bit ADC reports 1,024 discrete steps numbered 0 through 1,023.'
    }
  },

  'mechatronics-m3-t3.2': {
    area: 'mechatronics',
    areaBadge: '⚙️ Mechatronics Concept Explorer · Topic 3.2',
    pdfSource: 'Mechatronics_Course_Module3_Topic3.2_CommonSensorTypes.pdf',
    title: 'Common Sensor Types: The 6 Families, Voltage Dividers & Ultrasonic Echoes',
    whatLearning:
      'Topic 3.2 organizes hundreds of sensors into Six Families: Temperature, Light, Distance, Motion/Orientation, Position, and Force. It also explains two crucial hardware rules: (1) resistive sensors like thermistors and LDRs need a fixed resistor in a Voltage Divider to turn resistance into a readable voltage, and (2) ultrasonic sensors time a sound echo to measure distance!',
    keyTerms: [
      { term: 'Voltage Divider', def: 'Pairing a resistive sensor (thermistor/LDR) with a fixed resistor so changing resistance produces a changing voltage for the ADC.' },
      { term: 'Ultrasonic Time-of-Flight', def: 'Sending a sound pulse and timing how many microseconds (µs) the echo takes to bounce back.' },
      { term: 'Minimum Range Blind Spot', def: 'Close to an infrared or ultrasonic sensor (under ~2–10 cm), readings can drop or become invalid.' }
    ],
    diagramSrc: '/assets/courses/mechatronics/images/m3-t3.2/m3-t3.2-img-04.jpg',
    diagramCaption: 'From Topic 3.2 PDF: A thermistor in a voltage divider—resistance becomes voltage, and the ADC turns voltage into a number.',
    whatToDo:
      '1. Predict why a thermistor needs a voltage divider. 2. Switch between the Thermistor Voltage Divider and the Ultrasonic Echo Timer in the simulation and adjust the environment slider to see how the microcontroller reads each sensor family!',
    prediction: {
      question: 'Before you test: Why can’t you wire a resistive sensor (like a thermistor or LDR light sensor) directly to an Arduino ADC pin without a second fixed resistor?',
      options: [
        'Because an ADC pin measures Voltage (0–5V), not Resistance (Ω)—a voltage divider turns the resistance change into a voltage change',
        'Because thermistors generate 240V AC power on their own',
        'Because resistors only work in the dark'
      ],
      answer: 0,
      hint: 'Look at the Topic 3.2 caption above: "resistance becomes voltage, and the ADC turns voltage into a number."',
      explanation: 'Exactly! A microcontroller ADC only reads voltage. Pairing the thermistor with a fixed resistor creates a voltage divider whose midpoint voltage shifts smoothly with temperature.'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: According to Topic 3.2, why do you divide by 2 when calculating distance from an ultrasonic sensor’s echo time?',
      options: [
        'Because the sound pulse travels the distance twice—out to the object and back to the sensor (a round trip)',
        'Because sound travels twice as fast in metal',
        'Because the sensor has two power pins'
      ],
      answer: 0,
      hint: 'Think about where the sound wave goes after leaving the sensor and before the echo returns.',
      explanation: 'Correct! The measured time is for the round trip (there and back), so dividing by 2 gives the one-way distance to the object.'
    }
  },

  'mechatronics-m3-t3.3': {
    area: 'mechatronics',
    areaBadge: '⚙️ Mechatronics Concept Explorer · Topic 3.3',
    pdfSource: 'Mechatronics_Course_Module3_Topic3.3_ReadingSensorDataWithAMicrocontroller.pdf',
    title: 'Reading Sensor Data with a Microcontroller: The 4-Step Pattern & Noise Averaging',
    whatLearning:
      'Topic 3.3 shows that reading any sensor on an Arduino follows the same Four-Step Pattern: (1) Wire it (power, signal, ground), (2) Read it (analogRead, digitalRead, or pulseIn), (3) Convert it into physical units (°C or cm), and (4) Check it—including averaging multiple readings (like 16 samples) to smooth out random electrical wobble!',
    keyTerms: [
      { term: 'The 4-Step Pattern', def: '1. Wire it → 2. Read raw value → 3. Convert to real units (°C, cm) → 4. Sanity-check the number.' },
      { term: 'Internal Pull-Up (INPUT_PULLUP)', def: 'Keeps a switch pin steady at HIGH (1) when open and pulls it LOW (0) when pressed, preventing floating noise.' },
      { term: 'Moving / Sample Average', def: 'Adding 16 quick readings together and dividing by 16 to cancel out random high/low noise spikes.' }
    ],
    diagramSrc: '/assets/courses/mechatronics/images/m3-t3.3/m3-t3.3-img-03.jpg',
    diagramCaption: 'From Topic 3.3 PDF: The four steps (Wire, Read, Convert, Check), shown with the LM35 temperature sensor example.',
    whatToDo:
      '1. Predict what happens when a switch pin is left "floating" without a pull-up resistor. 2. In the simulation, slide the Number of Averaged Samples from 1 (raw noisy reading) up to 16 (Topic 3.3 readAverage function) to tame the sensor noise!',
    prediction: {
      question: 'Before you test: What happens in Topic 3.3 when you average 16 sensor readings in a loop instead of trusting a single raw reading?',
      options: [
        'Random high and low noise spikes cancel out, giving a much steadier reading (at the cost of a slightly slower update)',
        'The temperature of the room increases by 16 degrees',
        'The sensor stops using electricity'
      ],
      answer: 0,
      hint: 'Look at Figure 8 in Topic 3.3: "Averaging 16 readings smooths the random wobble, at the cost of a slower response."',
      explanation: 'Spot on! Averaging 16 samples cancels out random electrical jitter so your robot does not twitch on false spikes.'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: When a pushbutton is wired between Pin 2 and Ground (GND) using pinMode(2, INPUT_PULLUP) in Topic 3.3, what does digitalRead(2) return when the button is PRESSED?',
      options: [
        'LOW (0) — pressing the button connects the pin directly to Ground',
        'HIGH (1) — pressing the button connects it to 12V',
        '512'
      ],
      answer: 0,
      hint: 'The internal pull-up holds the pin HIGH when the switch is open; pressing the switch connects the pin to GND.',
      explanation: 'Correct! With INPUT_PULLUP, the pin reads HIGH when open and LOW when pressed.'
    }
  },

  'mechatronics-m4-t4.1': {
    area: 'mechatronics',
    areaBadge: '⚙️ Mechatronics Concept Explorer · Topic 4.1',
    pdfSource: 'Mechatronics_Course_Module4_Topic4.1_WhatIsAnActuator.pdf',
    title: 'What Is an Actuator? The Drive Chain & Temperature-Controlled Fan Simulation',
    whatLearning:
      'An Actuator is the mirror image of a sensor: it converts energy into physical action (motion, force, airflow). Topic 4.1 explains why a microcontroller pin (5V, ~20 mA max) can NEVER power a motor directly (which needs hundreds of milliamps), how the Drive Chain (Controller → Driver/Transistor → Actuator) works, and how PWM (Pulse-Width Modulation) controls motor speed.',
    keyTerms: [
      { term: 'Actuator', def: 'Any component that turns energy into physical motion or action (DC motor, servo, stepper, solenoid).' },
      { term: 'The Drive Chain', def: 'Power Supply + Controller (brains) → Driver/Transistor (muscle switch) → Actuator (motion).' },
      { term: 'PWM Duty Cycle (%)', def: 'Switching power on and off thousands of times per second—50% duty cycle means ON half the time for ~half speed.' },
      { term: 'Flyback Diode', def: 'Protects the driver transistor from the high-voltage spike a spinning motor coil creates when switched off.' }
    ],
    diagramSrc: '/assets/courses/mechatronics/images/m4-t4.1/m4-t4.1-img-08.jpg',
    diagramCaption: 'From Topic 4.1 PDF: The temperature-controlled 12V cooling fan worked example as a block diagram (LM35 → Controller → Transistor Driver → 12V Fan).',
    whatToDo:
      '1. Predict why a 5V, 20 mA Arduino pin cannot drive the 12V, 150 mA fan directly. 2. In the virtual Cooling Fan simulation below, enable the Transistor Driver, raise Box Temperature above 30°C, and adjust the PWM Duty Cycle (%) to control fan speed!',
    prediction: {
      question: 'Before you test: In the Topic 4.1 worked example, the cooling fan needs 150 mA at 12 V, while the controller pin can only supply 20 mA at 5 V. What happens if you connect the fan directly to the controller pin without a driver?',
      options: [
        'The fan needs 7.5× more current and a higher voltage than the pin can provide—it will not spin and can damage the controller pin!',
        'The controller pin automatically boosts itself to 12 V and 150 mA',
        'The fan turns into a temperature sensor'
      ],
      answer: 0,
      hint: 'Compare 20 mA at 5V (what the pin supplies) to 150 mA at 12V (what the fan needs).',
      explanation: 'Exact match with Topic 4.1! The controller pin provides the low-current logic signal, while a Transistor Driver switches the separate 12V, 150 mA power path for the fan.'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: Instead of wasting heat in a giant resistor to slow a DC motor down, how does PWM (Pulse-Width Modulation) control motor speed in Topic 4.1?',
      options: [
        'It switches the full supply voltage ON and OFF very fast; changing the percentage of ON-time (duty cycle) smoothly changes the motor’s speed',
        'It permanently changes the battery chemistry',
        'It physically disconnects the motor’s magnets'
      ],
      answer: 0,
      hint: 'If a switch is ON for 60% of each millisecond and OFF for 40%, the motor sees 60% average power with minimal wasted heat.',
      explanation: 'Correct! PWM varies the duty cycle (0% to 100% ON-time) so the driver transistor is either fully ON or fully OFF, controlling speed efficiently.'
    }
  },

  // Fallback for legacy #lesson default route
  'robotics-pid': {
    area: 'mechatronics',
    areaBadge: '⚙️ Control Loop Explorer · PID Basics',
    pdfSource: 'Mechatronics_Course_Module1_Topic1.2_RealWorldMechatronicSystems.pdf',
    title: 'Closed-Loop PID Control: Balancing Speed, Accuracy, and Smooth Braking',
    whatLearning:
      'A closed-loop PID controller continuously compares where your robot is with where it should be (the error), then combines three adjustments: P (reacts to the current gap), I (eliminates stubborn leftover offset), and D (acts like a shock absorber to prevent overshooting the target).',
    keyTerms: [
      { term: 'P (Proportional)', def: 'Pushes harder when the robot is far from its target line.' },
      { term: 'I (Integral)', def: 'Adds up tiny persistent errors over time until the final gap reaches 0.' },
      { term: 'D (Derivative)', def: 'Slows the correction down as the robot rapidly approaches the target so it does not overshoot.' }
    ],
    diagramSrc: '/assets/courses/mechatronics/images/m4-t4.1/m4-t4.1-img-07.jpg',
    diagramCaption: 'From Course Materials: Open loop sends a command and hopes. Closed loop measures the result and corrects.',
    whatToDo:
      '1. Predict which term acts as a brake to prevent overshoot. 2. Adjust the P, I, and D sliders below until Overshoot is 8% or less and Steady-State Error is 0.0%!',
    prediction: {
      question: 'Before you test: If a robot steers back toward its line too aggressively and swings past it (overshoot), which term acts like a damper/brake to calm the oscillation?',
      options: [
        'D (Derivative) — it reacts to how fast the error is shrinking and slows the correction down near the target',
        'Setting all gains to 0',
        'Removing the position sensor'
      ],
      answer: 0,
      hint: 'Which of the three terms (P, I, or D) slows the correction to avoid overshoot?',
      explanation: 'Correct! Derivative (D) damping acts like a shock absorber as the robot approaches the setpoint.'
    },
    knowledgeCheck: {
      question: 'Knowledge Check: What is the key difference between an open-loop system and a closed-loop system?',
      options: [
        'Closed-loop measures the actual output with a sensor and corrects errors; open-loop sends a command blindly without checking the result',
        'Open-loop uses more sensors than closed-loop',
        'Closed-loop never uses a controller'
      ],
      answer: 0,
      hint: 'Look at the diagram above: "Open loop sends a command and hopes. Closed loop measures the result and corrects."',
      explanation: 'Spot on! Closed-loop feedback is what allows robots, elevators, and drones to adapt to real-world disturbances.'
    }
  }
};
