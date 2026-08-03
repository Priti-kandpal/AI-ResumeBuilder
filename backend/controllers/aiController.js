import axios from "axios";

/*
====================================================
@desc    Generate AI Resume Suggestions
@route   POST /api/ai/suggestions
@access  Private
====================================================
*/

const generateSuggestions = async (req, res) => {
  try {
    const {
      objective,
      skills,
      experience,
      projects
    } = req.body;

    const prompt = `
You are an expert Resume Reviewer.

Analyze the following resume information and provide suggestions.

Career Objective:
${objective || "Not Provided"}

Skills:
${Array.isArray(skills) ? skills.join(", ") : skills || "Not Provided"}

Experience:
${JSON.stringify(experience || [], null, 2)}

Projects:
${JSON.stringify(projects || [], null, 2)}

Return your response in this format:

Career Objective Improvements:
- ...

Skills Improvements:
- ...

Experience Improvements:
- ...

Project Improvements:
- ...

Overall Resume Score:
Score out of 10 with a short explanation.
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are a professional HR recruiter and resume reviewer."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 1200
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return res.status(200).json({
      success: true,
      suggestions: response.data.choices[0].message.content
    });

  } catch (error) {

    console.error(error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to generate AI suggestions."
    });

  }
};

export { generateSuggestions };