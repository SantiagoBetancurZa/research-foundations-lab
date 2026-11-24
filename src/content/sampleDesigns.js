// Example designs prepared in advance for the four cases. The AI Designer shows them when the
// live AI service is not configured, so the feature can always be explored. Same shape as the
// JSON returned by /api/design.
const en = {
  'music-concentration': {
    summary:
      'Some students seem to concentrate less when they read academic texts while listening to music with lyrics. The observation suggests that lyrics may compete with reading for the same verbal attention, which would lower comprehension.',
    method: {
      question:
        'Does listening to music with lyrics while reading lower scores on a short reading-comprehension test compared with reading in silence?',
      hypothesis:
        'If students read with music with lyrics, their average comprehension score will be lower than that of students who read in silence.',
      experiment:
        'Randomly assign 48 students to two groups of 24. Both read the same 800-word text for 15 minutes in the same room and time slot; one group hears songs with lyrics through headphones at a fixed volume, the other wears headphones in silence. Then everyone answers the same 10-item comprehension test.',
      analysis:
        'Compare the mean score and standard deviation of each group, plot the individual scores, and use an independent-samples t-test with an effect size (Cohen’s d) to judge whether the difference is larger than chance variation.',
      conclusion:
        'If the music group scores clearly lower, the hypothesis is supported for short reading tasks; if not, there is no evidence of an effect in this context. Either way, the result applies to this task and population, not to every study situation.',
      communication:
        'Share a short report with a dot plot of the scores, a table of means and standard deviations and the test result, followed by practical advice about study environments.',
      ethics:
        'Ask for informed consent, let students stop at any time, keep the volume at a safe level and store the scores anonymously.',
    },
    concepts: {
      independentVariable: 'Reading condition: music with lyrics vs. silence.',
      dependentVariable: 'Score on the 10-item comprehension test (0–100).',
      controlVariables: 'Same text, time limit, room, time of day, headphones and volume.',
      controlGroup: 'Students who read in silence while wearing headphones.',
      experimentalGroup: 'Students who read while listening to music with lyrics.',
      possibleBias:
        'Students who usually study with music may be less affected; fatigue or prior knowledge of the topic could also change the scores. Random assignment helps balance these factors.',
      correlation:
        'A negative relationship is expected: the presence of lyrics would go with lower comprehension, but only the controlled comparison can show cause and effect.',
    },
  },
  'ai-drafts': {
    summary:
      'Some students write more structured first drafts when an AI assistant helps them organize their ideas, but not all of them feel that they learn more. The observation combines a measurable outcome (draft quality) with a perception (learning), so it suits a mixed-methods study.',
    method: {
      question:
        'Does using an AI assistant during planning improve the structure of a first academic draft, and how do students experience that support?',
      hypothesis:
        'Drafts planned with an AI assistant will score higher on structure and clarity, while students will report mixed feelings about their own learning and autonomy.',
      experiment:
        'Divide 36 students into two equivalent groups with the same topic, length and time. One group may use an AI assistant only for planning; the other plans on paper. Two teachers who do not know the groups grade every draft with the same rubric, and 8 students from each group take part in a short interview.',
      analysis:
        'Compare the average rubric scores with a t-test and an effect size; code the interviews into themes (speed, dependence, confidence) and connect both kinds of evidence in a joint display.',
      conclusion:
        'The study can show whether AI planning improves structure and how students feel about it. A higher score would not prove deeper learning, which should be measured separately.',
      communication:
        'Present a chart of the rubric scores next to short anonymous quotes, and finish with guidelines for responsible AI use in writing courses.',
      ethics:
        'Explain the purpose, obtain consent, make it clear that grades do not depend on the group, and anonymize drafts and interview transcripts.',
    },
    concepts: {
      independentVariable: 'Use of an AI assistant during planning (yes or no).',
      dependentVariable:
        'Rubric score for structure, clarity and coherence, plus the perceived learning described in the interviews.',
      controlVariables: 'Same topic, instructions, length, writing time and rubric.',
      controlGroup: 'Students who plan their draft without AI.',
      experimentalGroup: 'Students who plan their draft with an AI assistant.',
      possibleBias:
        'Prior writing skill, previous experience with AI and graders who know which group a draft comes from. Blind grading and balanced groups reduce these risks.',
      correlation:
        'AI use may go together with better structure, but students who are already organized might use AI more, so the comparison must be controlled.',
    },
  },
  'phone-sleep': {
    summary:
      'Students who use their phones late at night say they sleep worse and feel tired in morning classes. Because a researcher cannot ethically control students’ nights, the observation points to a descriptive, correlational study.',
    method: {
      question:
        'Is there a relationship between the minutes students spend on their phones before sleeping and their self-reported sleep quality?',
      hypothesis:
        'Students who spend more time on their phones in the hour before sleeping will report lower sleep quality.',
      experiment:
        'Survey 64 students from the same cohort for one week. Each morning they record their phone minutes before sleeping (ideally from the phone’s screen-time report) and rate their sleep quality on a scale from 0 to 10.',
      analysis:
        'Draw a scatter plot, calculate Pearson’s correlation coefficient r with its confidence interval, and compare the share of students with fair or poor sleep among heavy and light night-time users.',
      conclusion:
        'A negative correlation would show that more screen time goes with worse sleep, but it would not prove that the phone causes it: stress, workload or caffeine could explain both.',
      communication:
        'Publish a scatter plot with the trend line, a frequency table and a clear warning that correlation does not mean causation, plus sleep-hygiene tips.',
      ethics:
        'Use anonymous answers, ask only for the data that is needed, and share sleep-health resources with every participant.',
    },
    concepts: {
      independentVariable: 'Minutes of phone use before sleeping (observed, not manipulated).',
      dependentVariable: 'Self-reported sleep quality (0–10 scale).',
      controlVariables: 'Same cohort, same week, same survey and the same time of day for answering.',
      controlGroup: 'There is no control group; light users serve as a point of comparison.',
      experimentalGroup: 'There is no experimental group, because the study only observes existing habits.',
      possibleBias:
        'Memory errors, under-reporting of screen time and other habits that affect sleep (stress, caffeine, workload).',
      correlation:
        'A moderate negative correlation is expected: as phone minutes increase, sleep quality tends to decrease.',
    },
  },
  'online-forums': {
    summary:
      'In online courses, some students find the forums very useful while others take little part because they see no clear benefit. Understanding these experiences calls for a qualitative study that listens to how students describe the forums.',
    method: {
      question:
        'How do students with different levels of participation describe the contribution of online forums to their learning?',
      hypothesis:
        'Qualitative studies usually work with guiding assumptions instead of testable hypotheses: students are expected to value forums when the interaction feels safe and meaningful.',
      experiment:
        'Select 16 students from the same course with high, medium and low participation. Hold semi-structured interviews and one focus group with the same guiding questions, and review their participation logs.',
      analysis:
        'Transcribe the conversations, code them line by line, group the codes into themes (clarity, social learning, barriers) and compare the themes of active students and readers.',
      conclusion:
        'The results describe what makes a forum valuable for these students; they are not meant to be generalized statistically, but they can guide better forum design.',
      communication:
        'Write a report organized by themes with anonymous quotes, and include practical recommendations for teachers who moderate forums.',
      ethics:
        'Obtain consent to record, use pseudonyms, and make sure that taking part has no effect on grades.',
    },
    concepts: {
      independentVariable:
        'Not manipulated; the study compares observed participation profiles (active students vs. readers).',
      dependentVariable:
        'How students describe their learning, the usefulness of the forum and their sense of community.',
      controlVariables: 'Same course, cohort, period and interview guide for everyone.',
      controlGroup: 'No control group; the profiles are compared with each other.',
      experimentalGroup: 'No experimental group; the study explores experiences.',
      possibleBias:
        'Social desirability (saying what the teacher wants to hear) and the researcher’s own expectations during coding. A second coder and an audit trail reduce them.',
      correlation:
        'Not the goal: the study looks for meanings and patterns, not numerical relationships.',
    },
  },
};

const SAMPLE_DESIGNS = { en };

export function getSampleDesign(lang, caseId) {
  return (SAMPLE_DESIGNS[lang] ?? SAMPLE_DESIGNS.en)[caseId] ?? SAMPLE_DESIGNS.en[caseId] ?? null;
}
