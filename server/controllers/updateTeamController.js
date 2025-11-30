import projectModel from "../models/projectModel.js";

const addTeamMember = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    if (!projectId) {
      return res.status(400).json({ message: "projectId is required" });
    }

    // Find project and add user to team (avoid duplicates)
    const project = await projectModel.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if user is already in team
    if (project.team.some((id) => String(id) === String(userId))) {
      return res.status(400).json({ message: "User is already in the team" });
    }

    // Add user to team
    project.team.push(userId);
    await project.save();

    // Populate and return updated team
    const updated = await projectModel.findById(projectId).populate({
      path: "team",
      select: "firstname lastname email department photo",
    });

    res.status(200).json({
      message: "Member added to team",
      team: updated.team,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default addTeamMember;
