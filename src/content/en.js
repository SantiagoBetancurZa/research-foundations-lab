// English course content (default language). Keys match the ids in structure.js.
const en = {
  processSteps: {
    observation: {
      title: 'Observation',
      desc: 'Notice a phenomenon in the natural world that sparks curiosity. Example: “The plants on my windowsill grow toward the light.”',
    },
    question: {
      title: 'Question',
      desc: 'Ask a clear, measurable question based on the observation. Example: “Does the color of light affect how fast a plant grows?”',
    },
    'literature-review': {
      title: 'Literature Review',
      desc: 'Explore background, theories and previous studies to understand what is already known about the problem and where the research gap is.',
    },
    objective: {
      title: 'Objective',
      desc: 'Define precisely what the study aims to achieve or test. The objective guides the whole methodological design.',
    },
    hypothesis: {
      title: 'Hypothesis',
      desc: 'Propose a tentative, testable explanation or prediction. Example: “If plants receive blue light, then they will grow faster than under red light.”',
    },
    'methodological-design': {
      title: 'Methodological Design',
      desc: 'Specify the variables, sample, instruments, procedure and analysis plan before carrying out the study.',
    },
    experimentation: {
      title: 'Experimentation',
      desc: 'Design and run controlled tests to support or refute the hypothesis. This involves defining variables and groups.',
    },
    analysis: {
      title: 'Analysis',
      desc: 'Collect the data from the experiment, organize it (charts, tables) and look for mathematical or statistical patterns.',
    },
    conclusion: {
      title: 'Conclusion',
      desc: 'Interpret the data to decide whether it supports or rejects the initial hypothesis, and acknowledge the limitations of the study.',
    },
    communication: {
      title: 'Communication',
      desc: 'Share the results through articles or conferences (peer review) so that others can replicate the study.',
    },
  },

  concepts: {
    'independent-variable': {
      term: 'Independent Variable',
      definition:
        'The condition the researcher deliberately manipulates or changes (e.g., amount of water). It is the cause.',
    },
    'dependent-variable': {
      term: 'Dependent Variable',
      definition:
        'What is measured or observed in response to the changes. Its value depends on the independent variable (e.g., plant height). It is the effect.',
    },
    'control-variables': {
      term: 'Control Variables',
      definition:
        'Factors kept constant so the experiment is fair and only the independent variable can cause the effect.',
    },
    'control-group': {
      term: 'Control Group',
      definition:
        'A group in the experiment that does not receive the treatment or experimental variable. It is the baseline for comparison.',
    },
    bias: {
      term: 'Bias',
      definition:
        'Any systematic factor or preference that pulls the results away from the truth. A good design tries to minimize it.',
    },
    'correlation-causation': {
      term: 'Correlation vs. Causation',
      definition:
        'Two things happening together (correlation) does not mean that one causes the other (causation). A controlled experiment is needed to test causation.',
    },
  },

  researchTypes: {
    quantitative: {
      term: 'Quantitative',
      definition:
        'Based on collecting and analyzing numerical data. It aims to measure phenomena, use statistics and test structured hypotheses.',
    },
    qualitative: {
      term: 'Qualitative',
      definition:
        'Explores meanings, experiences and contexts. It uses non-numerical data (texts, discourse, observations) to understand phenomena in depth.',
    },
    mixed: {
      term: 'Mixed Methods',
      definition:
        'Combines quantitative and qualitative elements in the same study to get a more complete and robust picture of the problem.',
    },
    experimental: {
      term: 'Experimental',
      definition:
        'Deliberately manipulates an independent variable under strictly controlled conditions to observe its effect on a dependent variable.',
    },
    descriptive: {
      term: 'Descriptive or Observational',
      definition:
        'Observes and describes the characteristics of a group, situation or phenomenon without manipulating any variable.',
    },
  },

  instruments: {
    surveys: {
      term: 'Surveys and Questionnaires',
      definition:
        'Series of structured questions designed to collect large volumes of numerical or categorical data quickly.',
    },
    interviews: {
      term: 'Interviews',
      definition:
        'Conversations led by the researcher (structured or open) to explore in depth the answers and perceptions of one person.',
    },
    'focus-groups': {
      term: 'Focus Groups',
      definition:
        'Moderated group discussions that show how participants interact and build collective opinions.',
    },
    'observation-guide': {
      term: 'Observation Guide',
      definition:
        'A structured form or field diary the researcher uses to systematically record what happens in a real setting.',
    },
    'lab-equipment': {
      term: 'Laboratory Equipment',
      definition:
        'Physical and technological instruments (microscopes, sensors, analysis software) used to measure variables with high empirical precision.',
    },
  },

  cases: {
    'music-concentration': {
      area: 'Education',
      method: 'Experimental',
      level: 'Basic',
      title: 'Music with lyrics and concentration',
      hook: 'Great for practicing variables, groups and comparing results in class.',
      scenario:
        'A teacher notices that several students say they study better with music, but during graded reading activities they seem distracted when songs with lyrics are playing.',
      question:
        'Does listening to music with lyrics lower performance on a short reading-comprehension task compared with silence?',
      design:
        'Randomly assign students to two groups, use the same text and the same time limit, and compare the average score of each group.',
      analysis:
        'Calculate averages, spread and a simple comparison between groups to see whether there are consistent differences.',
      variables: {
        independent: 'Study condition: silence or music with lyrics.',
        dependent: 'Score on the reading-comprehension test.',
        control: 'Same classroom, same text, same time limit, same difficulty level and same time of day.',
      },
      instruments: 'Short comprehension test, stopwatch and score sheet.',
      bias: 'Prior music preferences, participant fatigue or initial differences in reading habits.',
      seedObservation:
        'I have noticed that some students seem to concentrate less when they read an academic text with music with lyrics than when they read it in silence.',
    },
    'ai-drafts': {
      area: 'Academic writing',
      method: 'Mixed',
      level: 'Intermediate',
      title: 'AI use and first-draft quality',
      hook: 'Opens a debate on the benefits, limits and biases of technology support in research.',
      scenario:
        'In a university course, some students use AI assistants to organize their ideas before writing, while others prefer to start from scratch.',
      question:
        'Does using an AI assistant improve the initial structure of an academic draft, and how do students perceive that support?',
      design:
        'Compare drafts from two groups with a common rubric, and add short interviews about perceived usefulness, autonomy and confidence.',
      analysis:
        'Cross the numerical rubric results with qualitative testimonies to find patterns of improvement and ethical or methodological tensions.',
      variables: {
        independent: 'Using or not using the AI assistant while planning the text.',
        dependent: 'Draft quality according to a rubric for structure, clarity and coherence.',
        control: 'Same topic, same target length, same writing time and same instructions.',
      },
      instruments:
        'Assessment rubric, semi-structured interview and a short process journal for each student.',
      bias: 'Prior experience with AI, initial differences in writing skill and evaluator bias if the evaluator knows the group.',
      seedObservation:
        'I have observed that some students write more structured drafts when they use an AI assistant to organize their ideas, although not all of them feel that it really improves their learning.',
    },
    'phone-sleep': {
      area: 'Student well-being',
      method: 'Descriptive',
      level: 'Basic',
      title: 'Night-time phone use and sleep quality',
      hook: 'A good example for telling correlation from causation without intervening in behavior.',
      scenario:
        'In a group of university students, people say that those who use their phones late at night arrive at class more tired and less attentive.',
      question:
        'Is there a relationship between phone use before going to sleep and the sleep quality reported by students?',
      design:
        'Apply a survey on night-time habits and a sleep-quality scale to describe trends and possible associations.',
      analysis:
        'Organize frequencies, cross-tabulations and charts to see whether there is a consistent association between both factors.',
      variables: {
        independent: 'Time spent on the phone in the hour before sleeping.',
        dependent: 'Self-reported sleep quality or score on a short scale.',
        control: 'Similar age range, same academic term and data collected in the same week.',
      },
      instruments: 'Online survey, short sleep-quality scale and a data consolidation table.',
      bias: 'Inaccurate answers because of memory, under-reporting of real screen time and other routines that affect rest.',
      seedObservation:
        'I have noticed that several students who use their phones until very late report sleeping worse and feeling more tired during morning classes.',
    },
    'online-forums': {
      area: 'Online education',
      method: 'Qualitative',
      level: 'Intermediate',
      title: 'Forum participation and perceived learning',
      hook: 'Useful for exploring experiences, discourse and interaction dynamics in online environments.',
      scenario:
        'In an online course, some students take an active part in the forums and others only read them. The teacher wants to understand what educational value each group perceives.',
      question:
        'How do students describe the contribution of online forums to their understanding of the course content?',
      design:
        'Hold interviews or focus groups with students at different participation levels and analyze their accounts looking for emerging categories.',
      analysis:
        'Code the answers, identify recurring themes and compare the perceptions of active students and observers.',
      variables: {
        independent: 'Not manipulated; the focus is the observed level of participation.',
        dependent: 'Perceived learning, usefulness and sense of academic community.',
        control: 'Same course, same cohort, same period and equivalent guiding questions for everyone.',
      },
      instruments: 'Semi-structured interviews, focus group and the platform’s participation log.',
      bias: 'Social desirability in the answers, or a biased interpretation by the researcher during coding.',
      seedObservation:
        'I have observed that in online courses some students find the forums very useful for learning, while others participate little because they do not see a clear benefit.',
    },
  },

  articleSections: {
    title: {
      title: 'Title',
      summary: 'Clear, specific and representative of the study.',
      includes:
        'It should anticipate precisely the topic, the central variable or phenomenon and, when it adds clarity, the population or context.',
    },
    abstract: {
      title: 'Abstract',
      summary: 'A brief synthesis of the objective, method, results and conclusions.',
      includes:
        'It can be written as a single block or in a structured form with subheadings, depending on the journal or the academic guidelines.',
    },
    keywords: {
      title: 'Keywords',
      summary: 'Between 3 and 6 terms that make the article easier to index.',
      includes:
        'Choose core concepts of the study, discipline, technique or population, and avoid terms that are too general.',
    },
    introduction: {
      title: 'Introduction',
      summary:
        'Presents the context, the research problem, the state of the art and the objective or hypothesis.',
      includes:
        'This is where you justify why the study matters, what gap it addresses and what specific question it seeks to answer.',
    },
    methods: {
      title: 'Methods',
      summary: 'Describes the design, sample, instruments, procedures and analysis strategy.',
      includes:
        'It should give enough detail for another researcher to understand how the evidence was produced and to judge its rigor.',
    },
    results: {
      title: 'Results',
      summary: 'Presents the findings of the study without extensive interpretation.',
      includes:
        'It relies on tables, figures, percentages, categories or key quotes, depending on the methodological approach.',
    },
    discussion: {
      title: 'Discussion',
      summary: 'Interprets the results, compares them with the literature and examines their implications.',
      includes:
        'This is the place to explain what the findings mean, where they agree or disagree with other studies and what they add to the field.',
    },
    conclusions: {
      title: 'Conclusions',
      summary:
        'Answers the objective of the study and highlights contributions, limitations and possible future lines of work.',
      includes:
        'It does not repeat the whole discussion: it closes the central argument and makes the real value of the work clear.',
    },
    references: {
      title: 'References',
      summary: 'Lists the cited sources in the format required by the discipline or the journal.',
      includes:
        'It can follow styles such as APA, Vancouver or others, but it must always be consistent and traceable.',
    },
  },

  simulator: {
    'music-concentration': {
      objective:
        'Compare reading-comprehension performance between students who read in silence and students who read with music with lyrics.',
      focusLabel: 'Working hypothesis',
      focus:
        'If students read with music with lyrics, then their average score will be lower than in the silent condition.',
      sample: '48 students randomly assigned to a control group and an experimental group.',
      procedure:
        'Both groups read the same text for 15 minutes and then answer a 10-item test.',
      executionLabel: 'Simulate a controlled experiment',
      executionText: 'Applying the reading, the comprehension test and the score record.',
      resultMode: 'comparison',
      metricLabel: 'Average score out of 100',
      bars: [
        { label: 'Control: silence', value: 82, color: 'bg-slate-400' },
        { label: 'Experimental: music with lyrics', value: 68, color: 'bg-indigo-500' },
      ],
      keyInsight:
        'The control group scored 14 points higher than the experimental group, which suggests a negative effect of music with lyrics on this short task.',
      discussion:
        'The findings support the hypothesis and are consistent with the idea that lyrics compete for attention during reading.',
      limitation:
        'The simulation represents a single short session; it cannot tell whether the effect lasts over time.',
      communication:
        'Report it with a bar chart, a score table and a short discussion of attentional distractors.',
    },
    'ai-drafts': {
      objective:
        'Evaluate whether guided AI use improves the quality of a first academic draft, and explore how students perceive that support.',
      focusLabel: 'Working assumption',
      focus:
        'AI support may improve the initial structure of the text, although it does not guarantee more autonomy or deeper arguments.',
      sample: '36 students divided into two equivalent groups with the same writing prompt.',
      procedure:
        'The rubric scores of the first draft are compared, and perceptions are then gathered through short interviews.',
      executionLabel: 'Simulate a mixed-methods study',
      executionText: 'Processing assessment rubrics and qualitative testimonies from the participants.',
      resultMode: 'mixed',
      metricLabel: 'Average rubric score out of 100',
      bars: [
        { label: 'Without AI', value: 72, color: 'bg-slate-400' },
        { label: 'With AI', value: 84, color: 'bg-emerald-500' },
      ],
      secondaryFindings: [
        'The improvement was more visible in organization and initial clarity than in the originality of the arguments.',
        'Most students reported that AI helped them start the draft faster.',
        'Some students also worried about relying too much on external suggestions.',
      ],
      keyInsight:
        'The AI-supported group scored 12 points higher on the first version, but the benefit was concentrated in structure and getting started.',
      discussion:
        'The result suggests methodological value for planning, although autonomous learning still depends on the student’s own judgment.',
      limitation:
        'The simulation only assesses the first draft; it does not measure later revisions or final conceptual depth.',
      communication:
        'Report the rubric chart together with short interview quotes to show the value of the mixed approach.',
    },
    'phone-sleep': {
      objective:
        'Describe the relationship between phone use before sleeping and the sleep quality reported by students.',
      focusLabel: 'Guiding question',
      focus:
        'The goal is to find out whether there is a consistent association, without claiming causation, because nothing is manipulated experimentally.',
      sample:
        '64 students from the same cohort who answered a survey on night-time habits and sleep quality.',
      procedure:
        'Frequencies, cross-tabulations and association patterns between screen time and self-reported rest are consolidated.',
      executionLabel: 'Simulate a descriptive study',
      executionText: 'Consolidating surveys, frequency tables and association patterns.',
      resultMode: 'association',
      stats: [
        { label: 'Use > 60 min before sleeping', value: '62%' },
        { label: 'Fair or poor sleep', value: '58%' },
        { label: 'Observed pattern', value: 'Moderate positive association' },
      ],
      keyInsight:
        'The longer the night-time phone use, the worse the sleep quality reported by a large part of the group.',
      discussion:
        'The pattern is consistent with the sleep-hygiene literature, but it is still a correlation, not proof of causation.',
      limitation:
        'The data are self-reported and may be affected by memory, subjective perception or other night-time habits.',
      communication:
        'Present it with frequency tables, a comparison chart and an explicit warning about correlation versus causation.',
    },
    'online-forums': {
      objective:
        'Understand how students perceive the contribution of online forums to their learning and what barriers to participation they recognize.',
      focusLabel: 'Analytical focus',
      focus:
        'The aim is to identify emerging categories about usefulness, academic community and obstacles to participation.',
      sample: '16 students selected with different levels of participation in the same online course.',
      procedure:
        'Interviews and participation logs are analyzed to identify recurring themes and contrasts between profiles.',
      executionLabel: 'Simulate a qualitative study',
      executionText: 'Coding interviews, focus-group notes and the course participation logs.',
      resultMode: 'themes',
      themes: [
        {
          title: 'Conceptual clarity',
          detail:
            'Students feel that writing in the forum forces them to organize their ideas and review the content more carefully.',
        },
        {
          title: 'Social learning',
          detail:
            'Reading other people’s answers broadens perspectives and reveals questions they had not asked themselves.',
        },
        {
          title: 'Barriers to participation',
          detail:
            'Fear of being wrong, a feeling of public exposure and lack of time to contribute calmly come up.',
        },
      ],
      keyInsight:
        'The educational value of the forum depends less on the number of messages and more on the quality of the interaction and on feeling safe to participate.',
      discussion:
        'The findings show that the forum works as a space for building knowledge together, but it needs teacher mediation and rules that build trust.',
      limitation:
        'The simulation is based on a single cohort and cannot be generalized to all online courses.',
      communication:
        'The best output is a report organized by categories, with verbatim quotes and a final synthesis of the educational implications.',
    },
  },
};

export default en;
