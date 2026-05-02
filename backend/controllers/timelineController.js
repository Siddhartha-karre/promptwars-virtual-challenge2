import TimelineData  from '../models/TimelineData.js';

export const getAllTimeline = async (req, res) => {
  try {
    const timeline = await TimelineData.find().sort({ date: 1 });
    res.json(timeline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTimelineByStage = async (req, res) => {
  try {
    const { stage } = req.params;

    const data = await TimelineData.findOne({ stage });
    if (!data) {
      return res.status(404).json({ message: 'Stage not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTimelineOverview = async (req, res) => {
  try {
    const stages = ['announcement', 'code-of-conduct', 'polling', 'counting'];
    const overview = await Promise.all(
      stages.map((stage) => TimelineData.findOne({ stage }))
    );

    res.json(overview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
