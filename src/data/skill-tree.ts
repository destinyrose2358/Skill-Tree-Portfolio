import { SkillTree } from "../models/skill-tree";

export const SKILLTREE = new SkillTree()
    .addSkill({
        name: "React",
        description: "Web DOM Framework"
    })
    .addSkill({
        name: "HTML",
        description: "Hyper Text Markup Language"
    })
    .addSkill({
        name: "CSS",
        description: "Cascading Style Sheets"
    })
    .addProject({
        name: "Skill Tree",
        description: "A Skill Tree w/ React Elements",
        url: "",
        status: "wip"
    })
    .addSubSkillTo(
        "React",
        "HTML"
    )
    .addSubSkillTo(
        "React",
        "CSS"
    )
    .addSkillToProject("React", "Skill Tree");
