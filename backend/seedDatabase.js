import mongoose  from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import AssistantKnowledge  from './models/AssistantKnowledge.js';
import TimelineData  from './models/TimelineData.js';
import MisinformationContent  from './models/MisinformationContent.js';

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/electralearn');
    console.log('Connected to MongoDB');

    // Clear existing data
    await AssistantKnowledge.deleteMany({});
    await TimelineData.deleteMany({});
    await MisinformationContent.deleteMany({});

    // Seed Assistant Knowledge
    const knowledgeBase = [
      {
        category: 'Voter Registration',
        question: 'How do I register to vote?',
        answer:
          'You can register to vote at your local election office or online. You need to provide proof of identity and residence. Registration typically closes 30 days before elections.',
        keywords: ['register', 'voter', 'registration', 'how to register'],
        relatedTopics: ['Documents', 'Eligibility'],
        source: 'Election Commission of India',
      },
      {
        category: 'Voting Process',
        question: 'What is NOTA?',
        answer:
          'NOTA stands for "None Of The Above". It allows voters to reject all candidates if they feel none are suitable. NOTA votes are counted but do not impact election results.',
        keywords: ['nota', 'none of the above', 'voting option'],
        relatedTopics: ['Voting Rights', 'Ballot'],
        source: 'Election Commission of India',
      },
      {
        category: 'Voting Process',
        question: 'What documents do I need to vote?',
        answer:
          'You need to carry a valid ID like Voter ID, Aadhar Card, Passport, or Driving License. You can also use other forms of identification approved by the election commission.',
        keywords: ['documents', 'id', 'identification', 'voter id'],
        relatedTopics: ['Voter Registration', 'Voting Day'],
        source: 'Election Commission of India',
      },
      {
        category: 'Code of Conduct',
        question: 'What is the Model Code of Conduct?',
        answer:
          'The Model Code of Conduct is a set of guidelines for political parties and candidates during elections. It ensures fair elections and maintains neutrality of government machinery.',
        keywords: ['code', 'conduct', 'model code', 'guidelines'],
        relatedTopics: ['Election Process', 'Campaign'],
        source: 'Election Commission of India',
      },
      {
        category: 'Voting Process',
        question: 'Can I vote by proxy?',
        answer:
          'In most cases, no. However, persons with disabilities or those unable to reach polling stations may request assistance. The election commission has special provisions for such cases.',
        keywords: ['proxy', 'vote by proxy', 'remote voting'],
        relatedTopics: ['Voting Process', 'Accessibility'],
        source: 'Election Commission of India',
      },
      {
        category: 'Election Process',
        question: 'How does the counting process work?',
        answer:
          'After polls close, ballots are counted at counting centers. Counting is done in rounds, with results declared stage by stage. The process is transparent and observed by representatives of all parties.',
        keywords: ['counting', 'results', 'count ballots'],
        relatedTopics: ['Election Day', 'Results'],
        source: 'Election Commission of India',
      },
      {
        category: 'Eligibility',
        question: 'Who is eligible to vote?',
        answer:
          'To be eligible to vote, you must be a citizen, at least 18 years old, and a resident of your constituency. You should not be disqualified under election laws.',
        keywords: ['eligible', 'eligibility', 'age', 'citizen'],
        relatedTopics: ['Voter Registration', 'Rights'],
        source: 'Election Commission of India',
      },
      {
        category: 'Campaign',
        question: 'What are campaign restrictions?',
        answer:
          'During elections, campaigns must follow the Model Code of Conduct. Activities are limited 48 hours before polling. No religious or communal appeals are allowed.',
        keywords: ['campaign', 'restrictions', 'rules'],
        relatedTopics: ['Code of Conduct', 'Political Parties'],
        source: 'Election Commission of India',
      },
    ];

    await AssistantKnowledge.insertMany(knowledgeBase);
    console.log('Knowledge base seeded');

    // Seed Timeline Data
    const timelineData = [
      {
        stage: 'announcement',
        title: 'Election Announcement',
        description: 'The election is officially announced by the Election Commission.',
        details: [
          {
            heading: 'Election Schedule',
            content: 'The election dates and phases are announced publicly.',
          },
          {
            heading: 'Voter Roll',
            content: 'Voter rolls are prepared and made available for verification.',
          },
        ],
        importance: 'high',
      },
      {
        stage: 'code-of-conduct',
        title: 'Model Code of Conduct',
        description: 'The Model Code of Conduct comes into effect immediately after election announcement.',
        details: [
          {
            heading: 'Party Guidelines',
            content: 'Political parties must follow guidelines on campaigns and behavior.',
          },
          {
            heading: 'Government Neutrality',
            content: 'Government machinery must remain neutral during elections.',
          },
        ],
        importance: 'high',
      },
      {
        stage: 'polling',
        title: 'Polling Day',
        description: 'Citizens vote in designated polling stations across the country.',
        details: [
          {
            heading: 'Voting Hours',
            content: 'Polls are open from 7 AM to 6 PM with security measures.',
          },
          {
            heading: 'Polling Booths',
            content: 'Booths are set up at schools and community centers.',
          },
        ],
        importance: 'high',
      },
      {
        stage: 'counting',
        title: 'Result Counting',
        description: 'Votes are counted and results are declared.',
        details: [
          {
            heading: 'Counting Centers',
            content: 'Results are counted at designated centers with transparency.',
          },
          {
            heading: 'Result Declaration',
            content: 'Winners are declared after all votes are counted.',
          },
        ],
        importance: 'high',
      },
    ];

    await TimelineData.insertMany(timelineData);
    console.log('Timeline data seeded');

    // Seed Misinformation Content
    const misinformationContent = [
      {
        content: 'Voting is only for people over 21 years old.',
        contentType: 'news',
        isReal: false,
        explanation: 'The voting age in most countries is 18 years old.',
        category: 'Age Eligibility',
        difficulty: 'easy',
      },
      {
        content:
          'You can vote multiple times if you have multiple IDs.',
        contentType: 'social-media',
        isReal: false,
        explanation:
          'Each person gets one vote regardless of how many IDs they have. Multiple voting is illegal.',
        category: 'Voting Rights',
        difficulty: 'medium',
      },
      {
        content: 'NOTA votes determine the winner in elections.',
        contentType: 'meme',
        isReal: false,
        explanation:
          'NOTA votes are counted separately but do not affect who wins the election.',
        category: 'Voting Process',
        difficulty: 'medium',
      },
      {
        content: 'The election commission is responsible for ensuring fair elections.',
        contentType: 'news',
        isReal: true,
        explanation: 'The election commission oversees all aspects of elections to ensure fairness.',
        category: 'Election Body',
        difficulty: 'easy',
      },
      {
        content:
          'You must vote for the same party as your family members.',
        contentType: 'social-media',
        isReal: false,
        explanation:
          'Voting is a personal choice. You can vote for anyone you choose.',
        category: 'Voting Freedom',
        difficulty: 'easy',
      },
      {
        content:
          'Elections in India use electronic voting machines to prevent tampering.',
        contentType: 'news',
        isReal: true,
        explanation:
          'Electronic voting machines with security features are used in Indian elections.',
        category: 'Voting Technology',
        difficulty: 'hard',
      },
    ];

    await MisinformationContent.insertMany(misinformationContent);
    console.log('Misinformation content seeded');

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
