import AssistantKnowledge  from '../models/AssistantKnowledge.js';

export const searchAnswers = async (req, res) => {
  try {
    const { query } = req.body;

    // Simple keyword-based search
    const answers = await AssistantKnowledge.find({
      $or: [
        { question: { $regex: query, $options: 'i' } },
        { keywords: { $in: [query.toLowerCase()] } },
        { answer: { $regex: query, $options: 'i' } },
      ],
      isActive: true,
    });

    res.json({
      query,
      results: answers,
      count: answers.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommonQuestions = async (req, res) => {
  try {
    const questions = await AssistantKnowledge.find({ isActive: true })
      .limit(10)
      .sort({ _id: -1 });

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnswerByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const answers = await AssistantKnowledge.find({
      category,
      isActive: true,
    });

    res.json(answers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
